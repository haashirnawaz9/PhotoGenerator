// app/page.tsx
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-[#0e1f3c]">
      <div className="max-w-3xl text-center px-6 py-10 bg-white bg-opacity-20 backdrop-blur-lg rounded-xl shadow-2xl mb-36">
        {/* Main Heading */}
        <h1 className="text-6xl font-extrabold mb-6 text-white tracking-tight leading-tight">
          Welcome to PhotoGenAI
        </h1>

        {/* Subheading */}
        <p className="text-xl mb-10 text-gray-200">
          Unlock the power of AI-driven image generation. Generate stunning, one-of-a-kind photos with a single click.
        </p>

        {/* Button */}
        <Link href="/main">
          <Button
            className="bg-gradient-to-r from-green-400 to-teal-500 hover:from-green-500 hover:to-teal-600 text-white text-lg font-semibold py-4 px-10 rounded-full shadow-xl transform transition-all duration-300 hover:scale-110"
          >
            Start Generating
          </Button>
        </Link>
      </div>
    </div>
  );
}
