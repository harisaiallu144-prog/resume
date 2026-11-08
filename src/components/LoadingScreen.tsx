import React from 'react';

interface LoadingScreenProps {
  progress: number;
  stageNumber: number;
  stageText: string;
  isComplete: boolean;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({
  progress,
  stageNumber,
  stageText,
  isComplete
}) => {
  if (isComplete) return null;

  const radius = 28;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className="fixed inset-0 z-50 bg-[#030303] flex flex-col justify-between p-8 md:p-12 transition-opacity duration-1000 select-none">
      {/* Top Left: Circular Crimson Loading Ring */}
      <div className="flex items-center gap-5">
        <div className="relative w-16 h-16 flex items-center justify-center">
          <svg className="w-16 h-16 transform -rotate-90">
            {/* Background ring */}
            <circle
              cx="32"
              cy="32"
              r={radius}
              stroke="rgba(255, 255, 255, 0.08)"
              strokeWidth="2.5"
              fill="transparent"
            />
            {/* Animated progress ring */}
            <circle
              cx="32"
              cy="32"
              r={radius}
              stroke="#A30A19"
              strokeWidth="2.5"
              fill="transparent"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              className="transition-all duration-300 ease-out"
            />
          </svg>
          <span className="absolute font-mono text-xs font-semibold text-white tracking-tighter">
            {Math.round(progress)}%
          </span>
        </div>

        <div>
          <div className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#929292]">
            Phase {stageNumber < 10 ? `0${stageNumber}` : stageNumber} / 10
          </div>
          <div className="text-sm font-heading tracking-wide text-white font-medium">
            {stageText}
          </div>
        </div>
      </div>

      {/* Center cinematic watermark */}
      <div className="text-center opacity-40">
        <div className="font-display tracking-[0.3em] text-3xl md:text-5xl text-neutral-600">
          ALLU KUMARSWAMI
        </div>
        <div className="text-xs font-mono uppercase tracking-[0.3em] text-[#A30A19] mt-2">
          3D Particle Reconstruction Pipeline
        </div>
      </div>

      {/* Bottom status bar */}
      <div className="flex items-center justify-between text-[11px] font-mono text-[#929292] border-t border-white/10 pt-4">
        <div>DEPTH ANYTHING V2 · GLSL SHADER PIPELINE</div>
        <div>TARGET: 60,000 SCULPTURE PARTICLES</div>
      </div>
    </div>
  );
};
