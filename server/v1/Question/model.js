import mongoose, { Schema } from "mongoose";

export const QuestionSchema = new Schema({
  title: { type: String, required: true, unique: true },
});

QuestionSchema.statics.getAll = async function(args) {
  const { where, limit = 10, page = 0 } = args || {};
  return await this.find(where || {}, null, { limit, skip: limit * page });
};

QuestionSchema.statics.getBy = async function(where) {
  return await this.findOne(where || {});
};

QuestionSchema.statics.createData = async function(input) {
  return await this.create(input);;
}

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
}

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
}


export default mongoose.model("Question", QuestionSchema);
