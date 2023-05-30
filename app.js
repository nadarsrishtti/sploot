const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');
const articleRoutes = require('./routes/articles');

const app = express();

app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/mydatabase', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

// Routes
app.use('/api', authRoutes);
app.use('/api', articleRoutes);

// Start the server
app.listen(3000, () => {
  console.log('Server started on port 3000');
});
