import { IconType } from 'react-icons';

type StatCardVariant = 'active' | 'total' | 'dues';
type CardSize = 'md' | 'lg';

export interface StatCardProps {
  title: string;
  value: number;
  // icon?: React.ReactNode;
  icon: IconType;
  description?: string;
  variant?: StatCardVariant;
  size?: CardSize;
}
