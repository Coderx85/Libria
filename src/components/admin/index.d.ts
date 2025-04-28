type StatCardVariant = 'active' | 'total' | 'dues';

type CardSize = 'md' | 'lg';

interface StatCardProps {
  title: string;
  value: number;
  icon?: React.ReactNode;
  description?: string;
  variant?: StatCardVariant;
  size?: CardSize;
}
