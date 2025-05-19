const express = require('express');
const authenticateUser = require('./middleware/authMiddleware');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const protectedRoutes = require('./routes/protectedroutes'); // Import your protected routes
const cors = require('cors');
const gameRoutes = require('./routes/gameRoutes'); // Import the game routes

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors({
  origin: 'http://localhost:3000',  // Your frontend URL, adjust if necessary
  methods: ['GET', 'POST'],  // Allow only certain methods (optional)
  allowedHeaders: ['Content-Type'],  // Allow only specific headers (optional)
}));
app.use(express.json()); // Parse JSON bodies

// Use Routes
app.use('/api/auth', authRoutes); // Authentication routes (register/login)
app.use('/api/user', protectedRoutes); // Protected routes (e.g., profile)
app.use('/api', gameRoutes); // Game routes are handled here

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('MongoDB Connected');

    // Now, start the server only after a successful database connection
    app.listen(5000, () => console.log('Server running on port 5000'));
  })
  .catch((error) => {
    console.log('MongoDB connection error:', error);
    process.exit(1);  // Exit process if DB connection fails
  });

mongoose.connection.once('open', () => {
  console.log('MongoDB connection successful!');
});



