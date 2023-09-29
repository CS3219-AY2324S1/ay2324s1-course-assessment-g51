import { Schema, model } from "mongoose";

interface IQuestion {
  title: string;
  description: string;
  category: Array<string>;
  complexity: string;
}

const questionSchema = new Schema<IQuestion>({
  title: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  category: {
    type: [String],
    validate: (v: string | any[]) => Array.isArray(v) && v.length > 0,
  },
  complexity: {
    type: String,
    required: true,
    enum: ["easy", "medium", "difficult"],
  },
});

questionSchema.index({
  title: "text",
  description: "text",
});

const Question = model<IQuestion>("Question", questionSchema);

const createQuestion = async (req: any) => {
  // Ensures that Counter will only be incremented
  // if new Question does not fail to save
  const newQuestion = new Question({
    ...req.body,
  });
  const doc = await newQuestion.save();
  await doc.save();
  return doc;
};

const readQuestion = async (req: any) => {
  const question = await Question.findById(req.params.id);
  return question;
};

const readQuestions = async (req: any) => {
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
  const questions = await Question.find(queryObject, null, queryOptions);
  return questions;
};

const updateQuestion = async (req: any) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["title", "description", "category", "complexity"];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );
  if (!isValidOperation) {
    throw Error();
  }
  const question: any = await Question.findOne({
    _id: req.params.id,
  });
  if (!question) {
    return;
  }
  updates.forEach((update) => (question[update] = req.body[update]));
  await question.save();
  return question;
};

const deleteQuestion = async (req: any) => {
  const question = await Question.findOneAndDelete({
    _id: req.params.id,
  });
  return question;
};

export {
  createQuestion,
  readQuestion,
  readQuestions,
  updateQuestion,
  deleteQuestion,
};
