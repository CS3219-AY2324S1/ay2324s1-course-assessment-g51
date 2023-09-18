import express from "express";

import Question from "../models/question";

import sampleData from "../scripts/synthetic.json";

const router = express.Router();

// FOR DEV PURPOSES ONLY
// BULK IMPORTS SYNTHETIC DATA INTO DATABASE
// REMOVE ASAP
router.post("/questions-bulk", async (req, res) => {
  try {
    const bulkData = await Question.insertMany(sampleData);
    res.status(201).send(bulkData);
  } catch (error) {
    res.status(500).send(error);
  }
});

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
// GET /api/questions?complexity=easy
// GET /api/questions?limit=10&skip=10
router.get("/questions", async (req, res) => {
  const queryObject: {
    complexity?: string;
    $text?: {
      $search: string;
    };
  } = {};
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
    res.status(200).send(questions);
  } catch (error) {
    res.status(500).send(error);
  }
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
