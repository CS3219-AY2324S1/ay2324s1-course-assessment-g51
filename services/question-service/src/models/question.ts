import { Schema, model } from "mongoose";

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
    enum: ["easy", "medium", "difficult"],
  },
});

questionSchema.index({
  title: "text",
  description: "text",
});

const Question = model<IQuestion>("Question", questionSchema);

export default Question;
