const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Article = require('../models/Article');

const router = express.Router();

// Create an article
router.post('/users/:userId/articles', async (req, res) => {
  try {
    const { userId } = req.params;
    const { title, description } = req.body;

    // Check if the user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        statusCode: 404,
        error: 'Not Found',
        message: 'User not found',
      });
    }

    // Create a new article
    const article = new Article({ title, description, author: userId });
    await article.save();

    res.json({
      statusCode: 201,
      data: {
        data: article,
      },
      message: 'Article created successfully',
    });
  } catch (error) {
    res.status(500).json({
      statusCode: 500,
      error: 'Internal Server Error',
      message: 'An error occurred while processing your request',
    });
  }
});

// Get all articles
router.get('/articles', async (req, res) => {
  try {
    // Retrieve all articles with the user info
    const articles = await Article.find().populate('author', 'name');

    res.json({
      statusCode: 200,
      data: {
        data: articles,
      },
      message: 'Articles retrieved successfully',
    });
  } catch (error) {
    res.status(500).json({
      statusCode: 500,
      error: 'Internal Server Error',
      message: 'An error occurred while processing your request',
    });
  }
});

// Update user profile
router.patch('/users/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const { name, age } = req.body;

    // Check if the user exists
    const user = await User.findByIdAndUpdate(
      userId,
      { name, age },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({
        statusCode: 404,
        error: 'Not Found',
        message: 'User not found',
      });
    }

    res.json({
      statusCode: 200,
      data: {
        data: user,
      },
      message: 'User profile updated successfully',
    });
  } catch (error) {
    res.status(500).json({
      statusCode: 500,
      error: 'Internal Server Error',
      message: 'An error occurred while processing your request',
    });
  }
});

module.exports = router;
