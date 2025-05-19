const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const Game = require('../models/Game'); // Import the Game model

// Route to get all games
router.get('/games', async (req, res) => {
  try {
    console.log('Fetching games...');
    const games = await Game.find();
    console.log('Games fetched:', games);
    res.json(games);
  } catch (error) {
    console.error('Error fetching games:', error);
    res.status(500).json({ error: 'Failed to fetch games' });
  }
});

// Route to get a game by ID
router.get('/games/:id', async (req, res) => {
  try {
    const gameId = req.params.id;
    
    // Log the ID received
    console.log(`Received ID: ${gameId}`);

    // Validate if the ID is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(gameId)) {
      console.log('Invalid ID format');
      return res.status(400).json({ error: 'Invalid game ID' });
    }

    // Fetch the game by ID
    const game = await Game.findById(gameId);
    
    if (!game) {
      console.log('Game not found for ID:', gameId);
      return res.status(404).json({ error: 'Game not found' });
    }

    console.log('Game found:', game);
    res.json(game);
  } catch (error) {
    console.error('Error fetching game by ID:', error);
    res.status(500).json({ error: 'Failed to fetch game by ID' });
  }
});

// Test route
router.get('/test', (req, res) => {
  res.send('Test Route is working!');
});

module.exports = router;

