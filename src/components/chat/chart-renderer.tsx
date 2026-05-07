"use client";

import {
  LineChart, Line, BarChart, Bar, AreaChart, Area,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
  ScatterChart, Scatter,
} from "recharts";

export interface ChartSpec {
  type: "line" | "bar" | "area" | "scatter";
  title?: string;
  xLabel?: string;
  yLabel?: string;
  data: Record<string, unknown>[];
  xKey: string;
  yKeys: { key: string; color?: string; label?: string }[];
}

const DEFAULT_COLORS = ["#10b981", "#3b82f6", "#f59e0b", "#ef4444", "#8b5cf6", "#ec4899"];

/**
 * Renders a Recharts chart from a structured JSON spec.
 * Supports line, bar, area, and scatter chart types.
 * @param spec - Chart specification with type, data, and axis config
 * @returns Rendered chart component
 */
export function ChartRenderer({ spec }: { spec: ChartSpec }) {
  const { type, title, xLabel, yLabel, data, xKey, yKeys } = spec;

  const commonProps = {
    data,
    margin: { top: 10, right: 20, left: 10, bottom: 5 },
  };

  const axes = (
    <>
      <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.15)" />
      <XAxis
        dataKey={xKey}
        tick={{ fontSize: 11, fill: "rgba(148,163,184,0.8)" }}
        label={xLabel ? { value: xLabel, position: "insideBottom", offset: -2, fontSize: 11, fill: "rgba(148,163,184,0.7)" } : undefined}
      />
      <YAxis
        tick={{ fontSize: 11, fill: "rgba(148,163,184,0.8)" }}
        label={yLabel ? { value: yLabel, angle: -90, position: "insideLeft", fontSize: 11, fill: "rgba(148,163,184,0.7)" } : undefined}
      />
      <Tooltip
        contentStyle={{ backgroundColor: "rgba(15,23,42,0.95)", border: "1px solid rgba(148,163,184,0.2)", borderRadius: 8, fontSize: 12 }}
        labelStyle={{ color: "rgba(203,213,225,0.9)" }}
      />
      <Legend wrapperStyle={{ fontSize: 11 }} />
    </>
  );

  const renderChart = () => {
    switch (type) {
      case "bar":
        return (
          <BarChart {...commonProps}>
            {axes}
            {yKeys.map((yk, i) => (
              <Bar key={yk.key} dataKey={yk.key} name={yk.label || yk.key} fill={yk.color || DEFAULT_COLORS[i % DEFAULT_COLORS.length]} radius={[4, 4, 0, 0]} />
            ))}
          </BarChart>
        );
      case "area":
        return (
          <AreaChart {...commonProps}>
            {axes}
            {yKeys.map((yk, i) => (
              <Area key={yk.key} type="monotone" dataKey={yk.key} name={yk.label || yk.key} stroke={yk.color || DEFAULT_COLORS[i % DEFAULT_COLORS.length]} fill={yk.color || DEFAULT_COLORS[i % DEFAULT_COLORS.length]} fillOpacity={0.2} />
            ))}
          </AreaChart>
        );
      case "scatter":
        return (
          <ScatterChart {...commonProps}>
            {axes}
            {yKeys.map((yk, i) => (
              <Scatter key={yk.key} dataKey={yk.key} name={yk.label || yk.key} fill={yk.color || DEFAULT_COLORS[i % DEFAULT_COLORS.length]} />
            ))}
          </ScatterChart>
        );
      default:
        return (
          <LineChart {...commonProps}>
            {axes}
            {yKeys.map((yk, i) => (
              <Line key={yk.key} type="monotone" dataKey={yk.key} name={yk.label || yk.key} stroke={yk.color || DEFAULT_COLORS[i % DEFAULT_COLORS.length]} strokeWidth={2} dot={{ r: 3 }} />
            ))}
          </LineChart>
        );
    }
  };

  return (
    <div className="my-3 rounded-xl border border-border bg-card p-4">
      {title && <p className="mb-3 text-center text-sm font-semibold">{title}</p>}
      <ResponsiveContainer width="100%" height={280}>
        {renderChart()}
      </ResponsiveContainer>
    </div>
  );
}

/**
 * Tries to extract and parse a chart JSON spec from a ```chart code block.
 * @param codeContent - The content inside the code block
 * @returns Parsed ChartSpec or null if invalid
 */
export function parseChartSpec(codeContent: string): ChartSpec | null {
  try {
    const parsed = JSON.parse(codeContent);
    if (parsed && parsed.type && parsed.data && parsed.xKey && parsed.yKeys) {
      return parsed as ChartSpec;
    }
    return null;
  } catch {
    return null;
  }
}
