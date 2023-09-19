import { Model, Schema, model } from "mongoose";

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

export default Counter;
