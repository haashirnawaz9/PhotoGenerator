import { NextResponse } from 'next/server';
import { HfInference } from '@huggingface/inference';
import rateLimit from '@/lib/ratelimits';

const limiter = rateLimit({
    interval: 60 * 1000, // 60 seconds
    uniqueTokenPerInterval: 500, // Max 500 users per interval
});

const hf = new HfInference(process.env.HUGGINGFACE_API_KEY);

export async function POST(req: Request) {
    const ip = req.headers.get('x-forwarded-for') || '127.0.0.1';

    // Rate-limiting
    try {
        await limiter.check(NextResponse.next(), 5, ip);
    } catch {
        return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
    }

    try {
        const body = await req.json();
        const { prompt } = body;

        if (!prompt || typeof prompt !== 'string') {
            return NextResponse.json({ error: 'Invalid or missing prompt' }, { status: 400 });
        }

        const blob = await hf.textToImage({
            model: 'black-forest-labs/FLUX.1-schnell',
            inputs: prompt,
            parameters: {
                guidance_scale: 0.0,
                num_inference_steps: 4,
            },
        });

        if (!blob) {
            throw new Error('Invalid response from Hugging Face API');
        }

        // Convert Blob to Base64
        const arrayBuffer = await blob.arrayBuffer();
        const base64 = Buffer.from(arrayBuffer).toString('base64');
        const dataUrl = `data:image/png;base64,${base64}`;

        return NextResponse.json({ image: dataUrl });
    } catch (error: unknown) {
        console.error('Error generating image:', error);
        return NextResponse.json(
            {
                error: 'Failed to generate image',
                details: error instanceof Error ? error.message : 'Unknown error',
            },
            { status: 500 }
        );
    }
}
