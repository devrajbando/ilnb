import mongoose from 'mongoose'


const connectDB=async()=>{
    try {
        console.log('hi')
              

        const connectionInstance=await mongoose.connect(process.env.MONGO_DB_URI)

        
        console.log(`\n MongoDB connected at ${connectionInstance.connection.host}`)
    } catch (error) {
        console.log("mongoDB Error FAIL",error) 
        process.exit(1)
    }
}

export default connectDB