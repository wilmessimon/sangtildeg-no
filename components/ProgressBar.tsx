'use client';

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

export default function ProgressBar({ currentStep, totalSteps }: ProgressBarProps) {
  const progress = (currentStep / totalSteps) * 100;

  return (
    <div className="w-full max-w-2xl mx-auto mb-12">
      {/* Step Counter */}
      <div className="flex justify-between items-center mb-3">
        <span className="text-sm md:text-base text-text-secondary font-medium">
          Schritt {currentStep} von {totalSteps}
        </span>
        <span className="text-sm md:text-base text-text-secondary font-medium">
          {Math.round(progress)}%
        </span>
      </div>
      
      {/* Progress Bar */}
      <div className="h-2 md:h-3 bg-beige rounded-full overflow-hidden">
        <div
          className="h-full bg-accent-gold transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
      
      {/* Dots */}
      <div className="flex justify-between mt-4">
        {Array.from({ length: totalSteps }).map((_, index) => (
          <div
            key={index}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index + 1 <= currentStep
                ? 'bg-accent-gold scale-110'
                : 'bg-warm'
            }`}
          />
        ))}
      </div>
    </div>
  );
}

