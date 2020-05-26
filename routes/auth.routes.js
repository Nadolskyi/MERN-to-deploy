const { Router } = require('express');
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator');
const User = require('../models/user');
const router = Router();

router.post('/register',
  [
    check('email', 'Bad email').isEmail(),
    check('password', 'min lenght pass 6 symbols').isLength({ min: 6 })
  ],
  async (req, res) => {
    try {

      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: 'wrong registration data'
        })
      }

      const { email, password } = req.body;

      const candidate = await User.findOne({ email })

      if (candidate) {
        return res.status(400).json({ message: 'Already is a user' })
      }

      const hashedPassword = await bcrypt.hash(password, 12);
      const user = new User({ email, password: hashedPassword });

      await user.save();

      res.status(201).json({ message: 'user created' });

    } catch (e) {
      res.status(500).json({ message: 'Something wrong' })
    }
  })

router.post('/login',
  [],
  async (req, res) => {
    try {

      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: 'wrong registration data'
        })
      }

      const { email, password } = req.body;

      const candidate = await User.findOne({ email })

      if (candidate) {
        return res.status(400).json({ message: 'Already is a user' })
      }

      const hashedPassword = await bcrypt.hash(password, 12);
      const user = new User({ email, password: hashedPassword });

      await user.save();

      res.status(201).json({ message: 'user created' });

    } catch (e) {
      res.status(500).json({ message: 'Something wrong' })
    }
  })


module.exports = router