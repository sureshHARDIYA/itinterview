import mongoose from "mongoose";

const uri =
  process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/itinterview-server";

mongoose.connect(uri, err => {
  if (err) {
    console.log(err.message);
  } else {
    console.log("Succesfully Connected!");
  }
});
