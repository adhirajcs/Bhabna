import mongoose from "mongoose";

let isConnected = false; // track the connection

export const connectToDB = async () => {
  mongoose.set("strictQuery", true);

  if (isConnected) {
    console.log("MongoDB is already connected");
    return;
  }

  try {
    // await mongoose.connect(process.env.MONGODB_URI, {
    //   dbName: "ideas",
    //   // useNewUrlParser: true,
    //   // useUnifiedTopology: true,
    // });

    mongoose.connect(
      `mongodb+srv://adhiraj:${process.env.MONGODB_PASSWORD}@cluster0.lmon4.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`,
      {
        dbName: "bhabna",
      }
    );

    isConnected = true;
    console.log("MongoDB connection success");
  } catch (error) {
    console.log("MongoDB connection error: ", error);
  }
};

(async () => {
  await connectToDB();
  console.log("Is MongoDB connected?", isConnected); // This will correctly show the connection status
})();
