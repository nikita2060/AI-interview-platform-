'use client';

import { useState, useRef, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { Application } from '@splinetool/runtime';

// Dynamically import Spline to avoid SSR issues
const Spline = dynamic(() => import('@splinetool/react-spline'), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 bg-gradient-to-b from-[#0A2540] to-[#0E4D92] opacity-80 flex items-center justify-center">
      <div className="animate-pulse-slow text-white font-medium">Loading AI Assistant...</div>
    </div>
  ),
});

interface SplineBackgroundProps {
  sceneUrl: string;
  className?: string;
}

const SplineBackground = ({ sceneUrl, className = '' }: SplineBackgroundProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const splineRef = useRef<Application | null>(null);

  const onLoad = (spline: Application) => {
    splineRef.current = spline;
    setIsLoaded(true);
    
    // Adjust camera position and angle for better framing
    const camera = spline.findObjectByName('Camera');
    if (camera) {
      // Position camera to show robot from front-side angle
      camera.position.set(5, 1.5, 5);
      camera.lookAt(0, 0, 0);
    }
    
    // Adjust robot position to be on the right side
    const robot = spline.findObjectByName('Robot') || spline.findObjectByName('Character');
    if (robot) {
      robot.position.set(2, 0, 0); // Move to the right
      
      // Enhance robot visibility with lighting adjustments if possible
      try {
        // Attempt to adjust material properties for better visibility
        if (robot.material) {
          robot.material.emissiveIntensity = 0.5;
          robot.material.metalness = 0.8;
        }
      } catch (e) {
        // Silently handle if material adjustments fail
      }
    }
    
    // Remove or hide distracting elements
    const distractingElements = ['Sphere', 'Cube', 'Shape'];
    distractingElements.forEach(name => {
      const element = spline.findObjectByName(name);
      if (element) {
        element.visible = false;
      }
    });
    
    // Add ambient light for better visibility if possible
    try {
      const ambientLight = new spline.runtime.AmbientLight(0xffffff, 0.6);
      spline.scene.add(ambientLight);
    } catch (e) {
      // Silently handle if light creation fails
    }
  };

  return (
    <div className={`spline-container ${className}`}>
      {/* Professional gradient overlay for text readability */}
      <div className="spline-overlay"></div>
      
      {/* Fallback background while Spline loads */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A2540] to-[#0E4D92]"></div>
      )}
      
      {/* Spline component */}
      <div className="absolute inset-0 z-0">
        <Spline 
          scene={sceneUrl} 
          onLoad={onLoad}
        />
      </div>
    </div>
  );
};

export default SplineBackground;