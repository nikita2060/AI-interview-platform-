// components/SplineBackground.tsx
'use client';

import Spline from '@splinetool/react-spline';
import React from 'react';

interface SplineBackgroundProps {
  sceneUrl: string;
  className?: string;
}

const SplineBackground: React.FC<SplineBackgroundProps> = ({ sceneUrl, className }) => {
  return (
    <div className={`w-full h-full  ${className}`}>
      <Spline scene={sceneUrl} />
    </div>
  );
};

export default SplineBackground;
