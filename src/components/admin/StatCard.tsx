import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const variantStyles = {
  active: "bg-slate-900/95 border-2 border-emerald-500/50 text-emerald-500",
  total: "bg-zinc-900/95 border-2 border-light-500 text-light-500",
  dues: "bg-red-400/5 border-2 border-red-500/50 text-red-400",
} as const;

const sizeStyles = {
  md: "p-6",
  lg: "p-5",
} as const;

const titleSizes = {
  md: "text-xl",
  lg: "text-2xl",
} as const;

const valueSizes = {
  md: "text-4xl",
  lg: "text-5xl",
} as const;

export function StatCard({ 
  title, 
  value, 
  icon, 
  description, 
  variant = 'total',
  size = 'md' 
}: StatCardProps) {
  return (
    <Card className={cn(
      "flex flex-col justify-between transition-all duration-300 cursor-pointer group relative overflow-hidden group-hover:bg-emerald-600", 
      variantStyles[variant],
      sizeStyles[size]
    )}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 p-0 transition-all duration-150">
        <CardTitle className={cn("font-semibold group-hover:hidden", titleSizes[size])}>{title}</CardTitle>
        {icon && (
          <div className={cn(
            "flex items-center justify-center rounded-xl p-2 group-hover:hidden",
            variant === 'active' ? "bg-emerald-500/20" : 
            variant === 'dues' ? "bg-red-500/20" : 
            "bg-dark-600/50"
          )}>
            {icon}
          </div>
        )}
      </CardHeader>
      <CardContent className="mt-4 p-0">
        <div className={cn("font-bold group-hover:hidden", valueSizes[size])}>
          {value}
        </div>
        
        {/* Description overlay that shows on hover */}
        {(
          <div className={cn(
            "absolute inset-0 flex flex-col items-start p-4 bg-gradient-to-t transition-all duration-300",
            variant === 'active' ? "from-emerald-950/95 to-transparent" : 
            variant === 'dues' ? "from-red-950/95 to-transparent" : 
            "from-zinc-950/95 to-transparent",
            "opacity-0 translate-y-full group-hover:opacity-100 group-hover:translate-y-0"
          )}>
            <div>
              <p className={cn(
                "text-sm leading-relaxed",
                variant === 'active' ? "text-emerald-300" : 
                variant === 'dues' ? "text-red-300" : 
                "text-zinc-300"
              )}>
                {description}
              </p>
            </div>
            <div className="flex items-center justify-center mt-2 rounded-xl p-2 bg-zinc-900/50">
              {icon}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}