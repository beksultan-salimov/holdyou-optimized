import { useEffect, useState, MutableRefObject } from 'react';
import { checkTouchScreen } from '@/utils/helpers';

interface Offset {
  x: number;
  y: number;
}

interface UseMouseOffsetProps {
  intensity?: number;
  containerRef: MutableRefObject<HTMLDivElement | null>;
}

export const useMouseOffset = ({
  intensity = 20,
  containerRef,
}: UseMouseOffsetProps) => {
  const [offset, setOffset] = useState<Offset>({ x: 0, y: 0 });
  const isTouchScreen = checkTouchScreen();

  useEffect(() => {
    const container = containerRef.current;
    if (!container || isTouchScreen) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const relativeX = (e.clientX - rect.left) / rect.width - 0.5;
      const relativeY = (e.clientY - rect.top) / rect.height - 0.5;
      setOffset({ x: relativeX * intensity, y: relativeY * intensity });
    };

    container.addEventListener('mousemove', handleMouseMove);
    return () => container.removeEventListener('mousemove', handleMouseMove);
  }, [containerRef, intensity, isTouchScreen]);

  return { offset, containerRef };
};
