import { Model, Schema, model } from "mongoose";

// Private interface for Question model
interface ICounter {
  id: string;
  seq: Number;
}

interface CounterModel extends Model<ICounter> {
  getNextSequence(): Promise<number>;
}

const counterSchema = new Schema<ICounter, CounterModel>(
  {
    id: {
      type: String,
      unique: true,
    },
    seq: {
      type: Number,
      default: 1,
    },
  },
  {
    statics: {
      async getNextSequence() {
        const filter = { id: "questionId" };
        const update = { $inc: { seq: 1 } };
        const options = { new: true, upsert: true };
        const returned = await this.findOneAndUpdate(filter, update, options);
        if (!returned) {
          throw new Error("MongoDB error");
        }
        return returned.seq;
      },
    },
  }
);

const Counter = model<ICounter, CounterModel>("Counter", counterSchema);

interface IQuestion {
  id: number;
  title: string;
  description: string;
  category: Array<string>;
  complexity: string;
}

const questionSchema = new Schema<IQuestion>({
  id: {
    type: Number,
    index: true,
  },
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
  const newQuestion = new Question({
    ...req.body,
  });
  const doc = await newQuestion.save();
  doc.id = await Counter.getNextSequence();
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
