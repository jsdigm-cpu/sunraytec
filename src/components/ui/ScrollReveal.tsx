import { useRef, type ReactNode, type CSSProperties } from 'react';
import { motion, useInView } from 'motion/react';
import type { Variants } from 'motion/react';
import { fadeInUp } from '../../utils/animations';

interface Props {
  children: ReactNode;
  variants?: Variants;
  delay?: number;
  once?: boolean;
  threshold?: number;
  style?: CSSProperties;
  className?: string;
}

export default function ScrollReveal({
  children,
  variants = fadeInUp,
  delay = 0,
  once = true,
  threshold = 0.15,
  style,
  className,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, amount: threshold });

  return (
    <motion.div
      ref={ref}
      variants={variants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      style={style}
      className={className}
      transition={delay > 0 ? { delay } : undefined}
    >
      {children}
    </motion.div>
  );
}
