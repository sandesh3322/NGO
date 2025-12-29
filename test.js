require('dotenv').config({ path: './.env' });
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URL, {
  dbName: process.env.MONGODB_NAME, // optional, your DB name
  autoCreate: true,
  autoIndex: true,
})
.then(() => console.log("DB connected successfully"))
.catch(err => console.error("DB connection error:", err));
