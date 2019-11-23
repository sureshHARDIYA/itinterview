import mongoose, { Schema } from "mongoose";

export const QuizSchema = new Schema({
  title: { type: String, required: true, unique: true },
  description: { type: String },
  question: [{ type: Schema.Types.ObjectId, ref: 'Question' }]
});

QuizSchema.statics.getAll = async function(args) {
  const { where, limit = 10, page = 0 } = args || {};
  return  await this.find(where || {}, null, { limit, skip: limit * page }).populate('question');
};

QuizSchema.statics.getBy = async function(where) {
  return await this.findOne(where || {});
};

QuizSchema.statics.createData = async function(input) {
  return await this.create(input);
};

QuizSchema.statics.updateData = async function(id, input) {
  try {
    const current = this.findOne({ _id: id });

    if (!current) {
      throw new Error("Quiz not found");
    }

    await this.updateOne({ _id: id }, input);
    return this.getBy({ _id: id });
  } catch (e) {
    return e;
  }
};

QuizSchema.statics.deleteData = async function(id) {
  try {
    const current = this.findOne({ _id: id });

    if (!current) {
      throw new Error("Quiz not found");
    }

    await this.deleteOne({ _id: id });
    return current;
  } catch (e) {
    return e;
  }
};

export default mongoose.model("Quiz", QuizSchema);
