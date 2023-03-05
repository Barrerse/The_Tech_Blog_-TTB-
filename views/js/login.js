const router = require('express').Router();
const { User } = require('../models');

router.post('/login', async (req, res) => {
  try {
    // Find the user with the provided email address
    const userData = await User.findOne({ where: { email: req.body.email } });

    // If the user doesn't exist, send a 400 Bad Request response
    if (!userData) {
      res.status(400).json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    // Check if the provided password matches the stored password hash
    const validPassword = await userData.checkPassword(req.body.password);

    // If the password doesn't match, send a 400 Bad Request response
    if (!validPassword) {
      res.status(400).json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    // Save the user's session data
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.json({ user: userData, message: 'You are now logged in!' });
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
