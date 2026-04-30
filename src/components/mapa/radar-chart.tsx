"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLevelReadiness } from "@/lib/use-readiness";
import {
  RadarChart as RechartsRadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
} from "recharts";

export function PerformanceRadarChart() {
  const { readiness } = useLevelReadiness();

  const data = readiness.byTopic.map((topic) => ({
    topic: topic.shortName,
    score: topic.sampleSize >= 5 ? Math.round(topic.accuracy * 100) : 0,
    fullMark: 100,
    sampleSize: topic.sampleSize,
  }));

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base">Topic Overview</CardTitle>
        <p className="text-xs text-muted-foreground">
          Topics with fewer than 5 answered questions are shown at zero until enough data is available.
        </p>
      </CardHeader>
      <CardContent className="pb-4">
        <ResponsiveContainer width="100%" height={350}>
          <RechartsRadarChart data={data} cx="50%" cy="50%" outerRadius="70%">
            <PolarGrid stroke="rgba(148,163,184,0.3)" />
            <PolarAngleAxis dataKey="topic" tick={{ fontSize: 11, fill: "rgba(203,213,225,0.9)" }} />
            <PolarRadiusAxis
              angle={90}
              domain={[0, 100]}
              tick={{ fontSize: 10, fill: "rgba(148,163,184,0.7)" }}
              axisLine={false}
            />
            <Radar
              name="Reference"
              dataKey="fullMark"
              stroke="rgba(148,163,184,0.15)"
              fill="rgba(148,163,184,0.06)"
              strokeWidth={1}
            />
            <Radar
              name="Score"
              dataKey="score"
              stroke="#5eead4"
              fill="#2dd4bf"
              fillOpacity={0.35}
              strokeWidth={2.5}
              dot={{ r: 3, fill: "#5eead4", stroke: "#5eead4" }}
            />
          </RechartsRadarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
