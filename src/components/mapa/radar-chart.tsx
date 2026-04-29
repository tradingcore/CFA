"use client";

import { useLevel } from "@/contexts/level-context";
import { mockTopicScores } from "@/lib/mock-data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  RadarChart as RechartsRadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
} from "recharts";

export function PerformanceRadarChart() {
  const { level } = useLevel();
  const scores = mockTopicScores[level];

  const data = scores.map((s) => ({
    topic: s.topicName,
    score: s.score,
    fullMark: 100,
  }));

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base">Visão Geral por Tópico</CardTitle>
      </CardHeader>
      <CardContent className="pb-4">
        <ResponsiveContainer width="100%" height={350}>
          <RechartsRadarChart data={data} cx="50%" cy="50%" outerRadius="70%">
            <PolarGrid stroke="rgba(148,163,184,0.3)" />
            <PolarAngleAxis
              dataKey="topic"
              tick={{ fontSize: 11, fill: "rgba(203,213,225,0.9)" }}
            />
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
