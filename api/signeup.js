// api/signup.js
import mongoose from 'mongoose';
import cors from 'cors';


// MongoDB connection string (consider using an environment variable)
const MONGOURL = 'mongodb+srv://trondio466:e8MKzhYXu19KjXZJ@test.fkyx9.mongodb.net/myDataBase';

// Connect to MongoDB
mongoose.connect(MONGOURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define a schema for user data
const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true }, // Note: Password should be hashed in a real application
});

// Create a model based on the schema
const User = mongoose.model('User', userSchema);

// API endpoint to handle signup requests
async function handler(req, res) {
  await cors()(req, res, async () => {
    if (req.method === 'POST') {
      const { username, email, password } = req.body;

      try {
        const newUser = new User({ username, email, password });
        await newUser.save();

        res.status(201).json({ message: 'User created successfully', user: newUser });
      } catch (error) {
        res.status(500).json({ message: 'Error creating user', error });
      }
    } else {
      res.setHeader('Allow', ['POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  });
}
export default handler;