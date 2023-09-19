import express from "express";

import Counter from "../models/counter";
import Question from "../models/question";

const router = express.Router();

router.post("/questions", async (req, res) => {
  try {
    const question = new Question({
      id: await Counter.getNextSequence(),
      ...req.body,
    });
    await question.save();
    res.status(201).json(question);
  } catch (error) {
    res.status(400).json(error);
  }
});

// route parameters:
// GET /api/questions?q=query+string
// GET /api/questions?complexity=easy
// GET /api/questions?limit=10&skip=10
// GET /api/questions?category=databases%2Carrays (%2C = comma character)
router.get("/questions", async (req, res) => {
  const queryObject: {
    category?: string[];
    complexity?: string;
    $text?: {
      $search: string;
    };
  } = {};
  if (req.query.category) {
    queryObject.category = (req.query.category as string).split(",");
  }
  if (req.query.complexity) {
    queryObject.complexity = req.query.complexity as string;
  }
  if (req.query.q) {
    queryObject.$text = {
      $search: req.query.q as string,
    };
  }

  const queryOptions: { limit?: number; skip?: number } = {};
  if (req.query.limit) {
    queryOptions.limit = parseInt(req.query.limit as string);
  }
  if (req.query.skip) {
    queryOptions.skip = parseInt(req.query.skip as string);
  }

  try {
    const questions = await Question.find(queryObject, null, queryOptions);
    res.status(200).json(questions);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/questions/:id", async (req, res) => {
  try {
    const question = await Question.findById(req.params.id);
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

router.patch("/questions/:id", async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["title", "description", "category", "complexity"];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    res.status(400).json({
      error: "Invalid operation!",
    });
    return;
  }

  try {
    const question: any = await Question.findOne({
      _id: req.params.id,
    });
    if (!question) {
      res.status(404).json({
        error: "Question does not exist",
      });
      return;
    }
    updates.forEach((update) => (question[update] = req.body[update]));
    await question.save();
    res.json(question);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.delete("/questions/:id", async (req, res) => {
  try {
    const question = await Question.findOneAndDelete({
      _id: req.params.id,
    });
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

export default router;
