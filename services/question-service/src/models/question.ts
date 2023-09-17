import { Schema, model } from "mongoose";

interface IQuestion {
  title: string;
  description: string;
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
});

const Question = model<IQuestion>("Question", questionSchema);

export default Question;
