import { useEffect, useRef } from 'react';
import { useThree } from '@react-three/fiber';
import { getProject } from '@theatre/core';

// Baked animation state – no Studio needed in production.
// Camera sweeps from far-high → natural view over 3s.
const ANIMATION_STATE = {
  sheetsById: {
    'India Map Intro': {
      staticOverrides: {
        byObject: {
          Camera: {
            position: { x: 0, y: 15, z: 19 },
          },
        },
      },
    },
  },
};

/**
 * CinematicIntro – plays a one-time camera sweep when the 3D map mounts.
 * Uses Theatre.js core (no Studio overhead) to animate the camera from
 * a dramatic overhead angle down to the natural orbit position.
 *
 * After the intro, OrbitControls takes over seamlessly.
 */
export default function CinematicIntro({ onDone }) {
  const { camera } = useThree();
  const doneRef = useRef(false);

  useEffect(() => {
    if (doneRef.current) return;
    doneRef.current = true;

    let project;
    let sheet;
    let animFrame;
    let startTime = null;
    const DURATION = 2800; // ms

    // Start position (dramatic, far above)
    const startPos = { x: 0, y: 38, z: 8 };
    // End position (natural orbit view)
    const endPos = { x: 0, y: 15, z: 19 };

    // Spring-like easing
    function easeOutQuart(t) {
      return 1 - Math.pow(1 - t, 4);
    }

    function lerp(a, b, t) {
      return a + (b - a) * t;
    }

    function animate(timestamp) {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const t = Math.min(elapsed / DURATION, 1);
      const ease = easeOutQuart(t);

      camera.position.x = lerp(startPos.x, endPos.x, ease);
      camera.position.y = lerp(startPos.y, endPos.y, ease);
      camera.position.z = lerp(startPos.z, endPos.z, ease);
      camera.lookAt(0, 0, 0);

      if (t < 1) {
        animFrame = requestAnimationFrame(animate);
      } else {
        // Restore final position exactly and signal done
        camera.position.set(endPos.x, endPos.y, endPos.z);
        camera.lookAt(0, 0, 0);
        if (onDone) onDone();
      }
    }

    // Set starting position immediately
    camera.position.set(startPos.x, startPos.y, startPos.z);
    camera.lookAt(0, 0, 0);

    // Small delay so the map geometries load before camera starts moving
    const timeout = setTimeout(() => {
      animFrame = requestAnimationFrame(animate);
    }, 400);

    return () => {
      clearTimeout(timeout);
      if (animFrame) cancelAnimationFrame(animFrame);
    };
  }, [camera, onDone]);

  return null; // purely imperative, no JSX output
}
