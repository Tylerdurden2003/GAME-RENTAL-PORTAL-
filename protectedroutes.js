const express = require('express');
const router = express.Router();
const authenticateUser = require('../middleware/authMiddleware');


router.get('/profile', authenticateUser, (req, res) => {
  res.status(200).json({
    message: 'This is a protected route',
    user: req.user // This will be the user info attached by the JWT verification
  });
});

module.exports = router;
