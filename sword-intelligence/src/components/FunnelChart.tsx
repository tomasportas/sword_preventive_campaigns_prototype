import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, LabelList } from 'recharts';

interface FunnelStage {
  stage: string;
  count: number;
  percent: number;
}

interface FunnelChartProps {
  data: FunnelStage[];
}

const COLORS = ['#1B3A6B', '#274D8C', '#3360AD', '#4A78C4', '#6690DB', '#85A9ED'];

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 border border-border rounded-lg shadow-md">
        <p className="font-semibold text-foreground">{payload[0].payload.stage}</p>
        <p className="text-sm text-muted-foreground mt-1">
          <span className="font-medium text-foreground">{payload[0].value.toLocaleString()}</span> patients
        </p>
        <p className="text-sm text-muted-foreground">
          <span className="font-medium text-foreground">{payload[0].payload.percent}%</span> of eligible
        </p>
      </div>
    );
  }
  return null;
};

const CustomXAxisTick = ({ x, y, payload }: any) => {
  const pct = payload.value;
  if (pct === 0) return null;
  return (
    <text x={x} y={y + 14} textAnchor="middle" fill="#6B7280" fontSize={11}>
      {pct}%
    </text>
  );
};

export function FunnelChart({ data }: FunnelChartProps) {
  return (
    <div className="w-full" style={{ height: 340 }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          layout="vertical"
          margin={{ top: 8, right: 80, left: 20, bottom: 24 }}
          barSize={36}
        >
          <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#E5E7EB" />
          <XAxis
            type="number"
            dataKey="percent"
            domain={[0, 100]}
            ticks={[0, 20, 40, 60, 80, 100]}
            tick={<CustomXAxisTick />}
            axisLine={{ stroke: '#E5E7EB' }}
            tickLine={false}
          />
          <YAxis
            dataKey="stage"
            type="category"
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#4B5563', fontSize: 13, fontWeight: 500 }}
            width={100}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(0,0,0,0.04)' }} />
          <Bar
            dataKey="percent"
            radius={[0, 4, 4, 0]}
            isAnimationActive={true}
            animationDuration={1200}
          >
            <LabelList
              dataKey="count"
              position="right"
              style={{ fill: '#374151', fontSize: 12, fontWeight: 600 }}
              formatter={(v: number) => v > 0 ? v.toLocaleString() : ''}
            />
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.percent === 0 ? '#E5E7EB' : COLORS[index % COLORS.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
