'use client';

import { useState, useEffect, useRef } from 'react';
import { Play, Pause, Volume2 } from 'lucide-react';
import { Howl } from 'howler';

interface AudioPlayerProps {
  src: string;
  title?: string;
}

export default function AudioPlayer({ src, title }: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const soundRef = useRef<Howl | null>(null);

  useEffect(() => {
    soundRef.current = new Howl({
      src: [src],
      html5: true,
      onplay: () => setIsPlaying(true),
      onpause: () => setIsPlaying(false),
      onend: () => {
        setIsPlaying(false);
        setProgress(0);
      },
    });

    const interval = setInterval(() => {
      if (soundRef.current && isPlaying) {
        const seek = soundRef.current.seek() as number;
        const duration = soundRef.current.duration();
        setProgress((seek / duration) * 100);
      }
    }, 100);

    return () => {
      clearInterval(interval);
      soundRef.current?.unload();
    };
  }, [src, isPlaying]);

  const togglePlay = () => {
    if (soundRef.current) {
      if (isPlaying) {
        soundRef.current.pause();
      } else {
        soundRef.current.play();
      }
    }
  };

  return (
    <div className="flex items-center gap-6 p-6 md:p-8 bg-beige rounded-3xl shadow-md">
      <button
        onClick={togglePlay}
        className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-accent-gold flex items-center justify-center hover:scale-105 transition-transform focus:outline-none focus:ring-2 focus:ring-accent-gold focus:ring-offset-2 shadow-lg"
        aria-label={isPlaying ? 'Pause' : 'Play'}
      >
        {isPlaying ? <Pause size={28} /> : <Play size={28} className="ml-1" />}
      </button>
      
      <div className="flex-1">
        {title && <p className="text-base md:text-lg font-medium mb-2">{title}</p>}
        <div className="h-3 md:h-4 bg-warm rounded-full overflow-hidden">
          <div
            className="h-full bg-accent-gold transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
      
      <Volume2 size={28} className="text-text-secondary" />
    </div>
  );
}

