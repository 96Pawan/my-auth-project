require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('./config/passport');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const swaggerSetup = require('./swagger');
const cors = require('cors');

const app = express();

app.use(cors());

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
  secret: process.env.SESSION_SECRET || 'yourSecretKey',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } 
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/auth', authRoutes);
app.use('/users', userRoutes);

swaggerSetup(app);

app.get('/', (req, res) => {
  res.send('Welcome to the Enhanced Authentication API');
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke! ' + err.message);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));