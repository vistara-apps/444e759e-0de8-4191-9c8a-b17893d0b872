'use client';

interface ChartCardProps {
  title: string;
  data: number[];
  labels: string[];
  className?: string;
}

export function ChartCard({ title, data, labels, className }: ChartCardProps) {
  const maxValue = Math.max(...data);
  
  return (
    <div className={`glass-card p-4 ${className}`}>
      <h3 className="text-white font-medium mb-4">{title}</h3>
      
      <div className="flex items-end justify-between h-32 space-x-2">
        {data.map((value, index) => (
          <div key={index} className="flex flex-col items-center flex-1">
            <div
              className="chart-bar w-full mb-2"
              style={{
                height: `${(value / maxValue) * 100}%`,
                minHeight: '8px',
              }}
            />
            <span className="text-xs text-white text-opacity-70">
              {labels[index]}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
