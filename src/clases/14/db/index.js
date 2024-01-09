import mongoose from "mongoose";

const mongoConnect = async () => {
  try {
    await mongoose.connect(
      'mongodb+srv://santicrippa:<password>@cluster0.fp8wdlq.mongodb.net/?retryWrites=true&w=majority'
    )
    console.log('db is connected');
  } 
  catch (error){
    console.log(error);
  }
}