import { Schema, model } from "mongoose";

interface IQuestion {
  title: string;
  description: string;
  difficulty: string;
}

const questionSchema = new Schema<IQuestion>({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  difficulty: {
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
