import { Schema, model } from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

interface IQuestion {
  title: string;
  description: string;
  category: Array<string>;
  complexity: string;
}

const questionSchema = new Schema<IQuestion>({
  title: { type: String, required: true, unique: true, trim: true },
  description: { type: String, required: true, trim: true },
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
questionSchema.index({ title: "text", description: "text" });
questionSchema.plugin(uniqueValidator);

const Question = model<IQuestion>("Question", questionSchema);

const createQuestion = async (req: any) => {
  return await new Question({ ...req.body }).save();
};

const readQuestion = async (req: any) => {
  return await Question.findById(req.params.id);
};

const readQuestions = async (req: any) => {
  const { category, complexity, q, limit, skip } = req.params;
  const queryObject: {
    category?: string[];
    complexity?: string;
    $text?: { $search: string };
  } = {
    ...(category && { category: category.split(",") }),
    ...(complexity && { complexity }),
    ...(q && { $text: { $search: q } }),
  };
  const queryOptions: { limit?: number; skip?: number } = {
    ...(limit && { limit: parseInt(limit as string) }),
    ...(skip && { skip: parseInt(skip as string) }),
  };
  return await Question.find(queryObject, null, queryOptions);
};

const updateQuestion = async (req: any) => {
  const allowedUpdates = ["title", "description", "category", "complexity"];
  const updateFields = Object.keys(req.body);
  const isValidOperation = updateFields.every((updateField) =>
    allowedUpdates.includes(updateField)
  );
  if (!isValidOperation) {
    return { error: "Invalid operation" };
  }
  return await Question.findByIdAndUpdate(req.params.id, req.body, {
    returnDocument: "after",
  });
};

const deleteQuestion = async (req: any) => {
  return await Question.findByIdAndDelete(req.params.id);
};

export {
  createQuestion,
  readQuestion,
  readQuestions,
  updateQuestion,
  deleteQuestion,
};
