import { NextResponse } from 'next/server';
import { LRUCache } from 'lru-cache';

type Options = {
    uniqueTokenPerInterval?: number;
    interval?: number;
};

export default function rateLimit(options: Options) {
    const tokenCache = new LRUCache<string, number>({
        max: options?.uniqueTokenPerInterval || 500, // Max unique tokens
        ttl: options?.interval || 60000, // Time-to-live for each token in ms
    });

    return {
        check: (res: NextResponse, limit: number, token: string) =>
            new Promise<void>((resolve, reject) => {
                const currentCount = tokenCache.get(token) || 0;
                tokenCache.set(token, currentCount + 1);

                const remaining = limit - (currentCount + 1);
                res.headers.set('X-RateLimit-Limit', limit.toString());
                res.headers.set('X-RateLimit-Remaining', Math.max(0, remaining).toString());

                if (remaining < 0) {
                    reject();
                } else {
                    resolve();
                }
            }),
    };
}
