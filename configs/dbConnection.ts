import mongoose from 'mongoose';

const connectDb = async (): Promise<void> => {
    try {
        const connection = await mongoose.connect(process.env.MONGOOSE_CONNECTION_STRING as string);
        if (connection) {
            console.log(`Connected to database`);
        }
    } catch (error) {
        console.log(`Error connecting to the database:`, error);
    }
};

export default connectDb;
