import mongoose, { Schema } from "mongoose";

export const QuestionSchema = new Schema({
  quiz: {
    ref: 'Quiz',
    type: mongoose.Schema.Types.ObjectId,
    required: [true, 'Question must be associated with some Quiz'],
  },
  title: { type: String, required: true, unique: true },
  description: { type: String },
  type: { type: String, enum: ["TEXT", "PICTURE"], default: "TEXT" },
  selectionType: {
    type: String,
    enum: ["SINGLE", "MULTIPLE"],
    default: "SINGLE"
  },
  answers: [{ type: String }],
  correctAnswer: [{ type: String }],
  correctResponse: { type: String },
  incorrectResponse: { type: String },
  explanation: { type: String },
  points: {
    type: Number,
    default: 10,
    min: [0, "Score must be greater than 0"],
    required: [true, "Score is required"]
  }
});

QuestionSchema.statics.getAll = async function(args) {
  const { where, limit = 10, page = 0 } = args || {};
  return await this.find(where || {}, null, { limit, skip: limit * page });
};

QuestionSchema.statics.getBy = async function(where) {
  return await this.findOne(where || {});
};

QuestionSchema.statics.createData = async function(input) {
  return await this.create(input);
};

QuestionSchema.statics.updateData = async function(id, input) {
  try {
    const current = this.findOne({ _id: id });

    if (!current) {
      throw new Error("Question not found");
    }

    await this.updateOne({ _id: id }, input);
    return this.getBy({ _id: id });
  } catch (e) {
    return e;
  }
};

QuestionSchema.statics.deleteData = async function(id) {
  try {
    const current = this.findOne({ _id: id });

    if (!current) {
      throw new Error("Question not found");
    }

    await this.deleteOne({ _id: id });
    return current;
  } catch (e) {
    return e;
  }
};

export default mongoose.model("Question", QuestionSchema);
