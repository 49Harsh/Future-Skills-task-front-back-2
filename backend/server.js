const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cors());

// Database connection
mongoose.connect(process.env.MONGODB_URI)
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.error('MongoDB connection error:', err));

// Ping route
app.get('/ping', (req, res) => {
  res.json({ message: 'Server is running' });
});

// Card routes
const cardRoutes = require('./routes/cardRoutes');
app.use('/cards', cardRoutes);


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
