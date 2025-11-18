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
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const soundRef = useRef<Howl | null>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    soundRef.current = new Howl({
      src: [src],
      html5: true,
      format: ['mp3', 'wav', 'm4a'],
      onplay: () => {
        console.log('Audio started playing');
        setIsPlaying(true);
      },
      onpause: () => {
        console.log('Audio paused');
        setIsPlaying(false);
      },
      onload: () => {
        if (soundRef.current) {
          const dur = soundRef.current.duration();
          console.log('Audio loaded, duration:', dur);
          setDuration(dur);
        }
      },
      onloaderror: (id, error) => {
        console.error('Error loading audio:', error);
        alert('Fehler beim Laden der Audio-Datei. Bitte überprüfen Sie den Pfad.');
      },
      onplayerror: (id, error) => {
        console.error('Error playing audio:', error);
        // Try to unlock audio on user interaction
        if (soundRef.current) {
          soundRef.current.once('unlock', () => {
            soundRef.current?.play();
          });
        }
      },
      onend: () => {
        console.log('Audio ended');
        setIsPlaying(false);
        setProgress(0);
        setCurrentTime(0);
      },
    });

    const interval = setInterval(() => {
      if (soundRef.current && isPlaying) {
        const seek = soundRef.current.seek() as number;
        const dur = soundRef.current.duration();
        setCurrentTime(seek);
        setProgress((seek / dur) * 100);
      }
    }, 100);

    return () => {
      clearInterval(interval);
      soundRef.current?.unload();
    };
  }, [src, isPlaying]);

  const togglePlay = () => {
    if (soundRef.current) {
      console.log('Toggle play clicked, current state:', isPlaying);
      console.log('Sound ref state:', soundRef.current.state());
      
      if (isPlaying) {
        soundRef.current.pause();
      } else {
        const playPromise = soundRef.current.play();
        console.log('Play called, promise:', playPromise);
      }
    } else {
      console.error('Sound ref is null');
    }
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (progressBarRef.current && soundRef.current) {
      const rect = progressBarRef.current.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const percentage = (clickX / rect.width) * 100;
      const newTime = (percentage / 100) * duration;
      
      soundRef.current.seek(newTime);
      setProgress(percentage);
      setCurrentTime(newTime);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex flex-col gap-4 p-6 md:p-8 bg-beige rounded-3xl shadow-md hover:shadow-xl transition-shadow">
      {/* Title & Time Row */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4 flex-1">
          <button
            onClick={togglePlay}
            className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-accent-gold flex items-center justify-center hover:scale-110 hover:shadow-lg transition-all focus:outline-none focus:ring-2 focus:ring-accent-gold focus:ring-offset-2 shadow-md"
            aria-label={isPlaying ? 'Pause' : 'Play'}
          >
            {isPlaying ? <Pause size={24} /> : <Play size={24} className="ml-1" />}
          </button>
          
          {title && (
            <p className="text-lg md:text-xl font-semibold text-text-primary">
              {title}
            </p>
          )}
        </div>
        
        {/* Time Display */}
        <div className="flex items-center gap-2 text-base md:text-lg font-medium text-text-secondary">
          <span>{formatTime(currentTime)}</span>
          <span className="text-text-light">/</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>

      {/* Progress Bar - Clickable */}
      <div className="flex items-center gap-4">
        <div 
          ref={progressBarRef}
          onClick={handleProgressClick}
          className="flex-1 h-3 md:h-4 bg-warm rounded-full overflow-hidden cursor-pointer hover:h-4 md:hover:h-5 transition-all group"
        >
          <div
            className="h-full bg-accent-gold transition-all group-hover:bg-gradient-to-r group-hover:from-accent-gold group-hover:to-yellow-600"
            style={{ width: `${progress}%` }}
          />
        </div>
        
        {/* Percentage Display */}
        <span className="text-sm md:text-base font-medium text-text-secondary min-w-[45px] text-right">
          {Math.round(progress)}%
        </span>
        
        {/* Volume Icon */}
        <Volume2 size={24} className="text-text-secondary" />
      </div>
    </div>
  );
}

