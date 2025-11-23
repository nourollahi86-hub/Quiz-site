import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { submissionSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // put application routes here
  // prefix all routes with /api

  // use storage to perform CRUD operations on the storage interface
  // e.g. storage.insertUser(user) or storage.getUserByUsername(username)

  app.post("/api/submit", async (req, res) => {
    try {
      const body = submissionSchema.parse(req.body);
      await storage.submitQuiz(body);
      res.json({ success: true });
    } catch (error) {
      console.error("Error submitting quiz:", error);
      res.status(400).json({ error: "Failed to submit quiz" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
