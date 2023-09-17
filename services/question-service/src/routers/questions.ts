import express from "express";

import Question from "../models/question";

const router = express.Router();

router.post("/questions", async (req, res) => {
  try {
    const question = new Question({
      ...req.body,
    });
    await question.save();
    res.status(201).send(question);
  } catch (error) {
    res.status(400).send(error);
  }
});

// route parameters:
// GET /api/questions?q=query+string
// GET /api/questions?difficulty=easy
// GET /api/questions?limit=10&skip=10
router.get("/questions", async (req, res) => {
  // TODO
});

router.get("/questions/:id", async (req, res) => {
  try {
    const question = await Question.findById(req.params.id);
    if (!question) {
      res.status(404).send();
      return;
    }
    res.send(question);
  } catch (error) {
    res.status(500).send();
  }
});

export default router;
