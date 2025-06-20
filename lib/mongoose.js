// lib/mongoose.js
import mongoose from 'mongoose';

const MONGODB_URI = process.env.URI_MONGO;

if (!MONGODB_URI) {
  throw new Error(
    'Por favor define la variable MONGODB_URI en el archivo .env.local'
  );
}

/** 
 * Mantenemos la conexión en caché para evitar múltiples conexiones
 * en desarrollo por el hot reload
 */
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {
      bufferCommands: false,
    }).then((mongoose) => {
      return mongoose;
    });
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

export default dbConnect;