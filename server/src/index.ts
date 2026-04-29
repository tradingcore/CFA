import "dotenv/config";
import express from "express";
import cors from "cors";
import chatRouter from "./routes/chat";
import questionsRouter from "./routes/questions";
import studyPlanRouter from "./routes/study-plan";
import explainRouter from "./routes/explain";

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json({ limit: "5mb" }));

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

app.use("/api/chat", chatRouter);
app.use("/api/generate-questions", questionsRouter);
app.use("/api/generate-study-plan", studyPlanRouter);
app.use("/api/explain-question", explainRouter);

app.listen(PORT, () => {
  console.log(`CFA Server running on port ${PORT}`);
});
