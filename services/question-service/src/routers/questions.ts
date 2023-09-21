import express from "express";

import {
  createQuestion,
  readQuestion,
  readQuestions,
  updateQuestion,
  deleteQuestion,
} from "../models/question";

const router = express.Router();

router.post("/questions", async (req, res) => {
  try {
    const question = await createQuestion(req);
    res.status(201).json(question);
  } catch (error) {
    res.status(400).json(error);
  }
});

router.get("/questions/:id", async (req, res) => {
  try {
    const question = await readQuestion(req);
    if (!question) {
      res.status(404).json({
        error: "Question does not exist",
      });
      return;
    }
    res.json(question);
  } catch (error) {
    res.status(500).json(error);
  }
});

// route parameters:
// GET /api/questions?q=query+string
// GET /api/questions?complexity=easy
// GET /api/questions?limit=10&skip=10
// GET /api/questions?category=databases%2Carrays (%2C = comma character)
router.get("/questions", async (req, res) => {
  try {
    const questions = await readQuestions(req);
    res.status(200).json(questions);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.patch("/questions/:id", async (req, res) => {
  try {
    const question: any = await updateQuestion(req);
    if (!question) {
      res.status(404).json({
        error: "Question does not exist",
      });
      return;
    }

    await question.save();
    res.json(question);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.delete("/questions/:id", async (req, res) => {
  try {
    const question = await deleteQuestion(req);
    if (!question) {
      res.status(404).json({
        error: "Question does not exist",
      });
      return;
    }
    res.status(204).json(question);
  } catch (error) {
    res.status(500).json(error);
  }
});

export default router;
