import mongoose from "mongoose";

const connectToDatabase = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL)
    } catch (err) {
        console.error(err)
    }
}

export default connectToDatabase