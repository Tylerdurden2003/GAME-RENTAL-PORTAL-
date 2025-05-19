// server/seedGames.js
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Game = require('./models/Game');

dotenv.config();

const games = [
  {
    name: 'Elden Ring',
    genre: 'Action RPG',
    price: 499,
    imageUrl: 'https://example.com/images/elden-ring.jpg',
  },
  {
    name: 'Sekiro: Shadows Die Twice',
    genre: 'Action Adventure',
    price: 399,
    imageUrl: 'https://example.com/images/sekiro.jpg',
  },
  {
    name: 'Black Myth: Wukong',
    genre: 'Fantasy Action',
    price: 599,
    imageUrl: 'https://example.com/images/wukong.jpg',
  },
  {
    name: 'Cyberpunk 2077',
    genre: 'RPG',
    price: 299,
    imageUrl: 'https://example.com/images/cyberpunk.jpg',
  }
];

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(async () => {
  await Game.deleteMany({});
  await Game.insertMany(games);
  console.log('Game data inserted');
  mongoose.connection.close();
}).catch(err => {
  console.error('Failed to connect to MongoDB', err);
});
