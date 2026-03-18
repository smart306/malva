import mongoose from "mongoose"; 

const MONGODB_URL = process.env.MONGODB_URL

if (!MONGODB_URL) {
    throw new Error("Mongodb url not found")
}

let cached = global.mongoose 
if (!cached) {
    cached = global.mongoose = { conn: null, promise: null}
}

export async function connectDB(){
    if (cached.conn) return cached.conn; 
    if (!cached.promise) {
        cached.promise = mongoose.connect(MONGODB_URL, {
            dbName: "shop", 
            bufferCommands: false, 
        })
    }
    cached.conn = await cached.promise
    return cached.conn
}