require('dotenv').config({ path: '../../.env' });
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const UserModel = require('../modules/auth/auth.model');

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URL, {
  dbName: process.env.MONGODB_NAME,
  autoCreate: true,
  autoIndex: true,
})
.then(() => {
  console.log("DB connected successfully");
  seedUser();
})
.catch(err => {
  console.error("DB connection error:", err);
  process.exit(1);
});

const adminUsers = [
  {
    name: "sandesh admin",
    email: "sandezpoudel@gmail.com",
    password: bcrypt.hashSync("admin123", 10),
    phone: "9869865250",
    image: "https://res.cloudinary.com/ditls9nzv/image/upload/v1719373351/Na1JxlGKtdvRNnKFDEnwW4BMJy5JkAShmwcBr5ac_xdjqar.jpg"
  }
];

async function seedUser() {
  try {
    for (const user of adminUsers) {
      const userData = await UserModel.findOne({ email: user.email });
      if (!userData) {
        const userObj = new UserModel(user);
        await userObj.save();
        console.log(`Admin user created: ${user.email}`);
      } else {
        console.log(`Admin user already exists: ${user.email}`);
      }
    }
    console.log("Seeding completed");
    process.exit(0); // exit after seeding
  } catch (exception) {
    console.error("Error during seeding:", exception);
    process.exit(1);
  }
}
