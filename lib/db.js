import { Mongoose } from "mongoose";

const connect = async () => {
  try {
    await Mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("db connected");
  } catch (error) {
    throw new Error("error connecting to mongo db", error);
  }
};

export default connect;
