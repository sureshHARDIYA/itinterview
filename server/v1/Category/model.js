import mongoose, { Schema } from "mongoose";

export const CategorySchema = new Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String },
  featuredImage: {type: String},
});

CategorySchema.statics.getAll = async function(args) {
  const { where, limit = 10, page = 0 } = args || {};
  return  await this.find(where || {}, null, { limit, skip: limit * page }).populate('quiz');
};

CategorySchema.statics.getBy = async function(where) {
  return await this.findOne(where || {});
};


CategorySchema.statics.createData = async function(input) {
  return await this.create(input);
};

CategorySchema.statics.updateData = async function(id, input) {
  try {
    const current = this.findOne({ _id: id });

    if (!current) {
      throw new Error("Category not found");
    }

    await this.updateOne({ _id: id }, input);
    return this.getBy({ _id: id });
  } catch (e) {
    return e;
  }
};

CategorySchema.statics.deleteData = async function(id) {
  try {
    const current = this.findOne({ _id: id });

    if (!current) {
      throw new Error("Category not found");
    }

    await this.deleteOne({ _id: id });
    return current;
  } catch (e) {
    return e;
  }
};

export default mongoose.model("Category", CategorySchema);
