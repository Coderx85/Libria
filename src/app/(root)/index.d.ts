import { ReactNode } from 'react';

interface AnimationVariant {
  initial: {
    y?: number;
    x?: number;
    opacity: number;
  };
  animate: {
    y?: number;
    x?: number;
    opacity: number;
    transition: {
      duration: number;
      ease: string;
    };
  };
}

interface Feature {
  icon: ReactNode;
  title: string;
  description: string;
}

interface Stat {
  icon: ReactNode;
  number: string;
  label: string;
}

interface Step {
  icon: ReactNode;
  title: string;
  description: string;
}

interface Testimonial {
  quote: string;
  author: string;
  role: string;
}

interface Category {
  name: string;
  count: string;
}

interface ReadingGoal {
  goal: string;
  progress: number;
}

interface ReadingStats {
  title: string;
  value: string;
}