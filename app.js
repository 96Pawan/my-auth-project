require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

app.use(session({
  secret: process.env.SESSION_SECRET || 'yourSecretKey',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // Set to true in production with HTTPS
}));

app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/auth', authRoutes);
app.use('/users', userRoutes);

console.log('Routes loaded');

app.get('/', (req, res) => {
  res.send('Welcome to the Enhanced Authentication API');
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));


// require('dotenv').config();
// const express = require('express');
// const mongoose = require('mongoose');
// const session = require('express-session');
// const passport = require('passport');
// const authRoutes = require('./routes/authRoutes');
// const userRoutes = require('./routes/userRoutes');

// const app = express();

// mongoose.connect(process.env.MONGO_URI)
//   .then(() => console.log('MongoDB connected'))
//   .catch(err => console.error('MongoDB connection error:', err));

// app.use(session({
//   secret: process.env.SESSION_SECRET || 'yourSecretKey', // Replace 'yourSecretKey' with a real secret string
//   resave: false,
//   saveUninitialized: true,
//   cookie: { secure: false } // Set to true in production with HTTPS
// }));

// app.use(passport.initialize());
// app.use(passport.session());
// require('./config/passport')(passport);

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// app.use('/auth', authRoutes);
// app.use('/users', userRoutes);

// // Root route handler
// app.get('/', (req, res) => {
//   res.send('Welcome to the Enhanced Authentication API');
// });

// // Simple Error Handler
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).send('Something broke!');
// });

// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

// // Import necessary modules
// const express = require('express');
// const session = require('express-session');
// const mongoose = require('mongoose');
// const passport = require('passport');

// // Load environment variables
// require('dotenv').config();

// // Connect to MongoDB
// mongoose.connect(process.env.MONGO_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// }).then(() => console.log('MongoDB connected'))
//   .catch(err => console.error('MongoDB connection error:', err));

// const app = express();

// // Body parser middleware to parse HTTP body in order to read HTTP data
// app.use(express.urlencoded({ extended: false }));
// app.use(express.json());

// // Express session
// app.use(session({
//   secret: '96@Pawant', // Replace 'yourSecretKey' with a real secret string
//   resave: false,
//   saveUninitialized: true,
//   cookie: { secure: true } // Secure is set to true which means it will work over HTTPS only
// }));

// // Initialize Passport middleware
// app.use(passport.initialize());
// app.use(passport.session());

// // Require Passport configuration
// require('./config/passport')(passport);

// // Routes
// const userRoutes = require('./routes/userRoutes');
// const authRoutes = require('./routes/authRoutes');
// app.use('/users', userRoutes);
// app.use('/auth', authRoutes);

// // Set the port and start the server
// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));


// require('dotenv').config();
// const express = require('express');
// const mongoose = require('mongoose');
// const session = require('express-session');
// const passport = require('passport');
// const authRoutes = require('./routes/authRoutes');
// const userRoutes = require('./routes/userRoutes');

// const app = express();

// mongoose.connect(process.env.MONGO_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// })
// .then(() => console.log('MongoDB connected'))
// .catch(err => console.error('MongoDB connection error:', err));

// app.use(session({
//   secret: 'yourSecretKey',
//   resave: false,
//   saveUninitialized: true
// }));

// app.use(passport.initialize());
// app.use(passport.session());
// require('./config/passport')(passport); // Ensure Passport is configured

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// app.use('/auth', authRoutes);
// app.use('/users', userRoutes);

// // Simple Error Handler
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).send('Something broke!');
// });

// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));



// const mongoose = require('mongoose');
// const express = require('express');
// const session = require('express-session');
// const passport = require('passport');

// require('dotenv').config(); 
// require('./config/passport')(passport);
// const authRoutes = require('./routes/authRoutes');
// app.use('/auth', authRoutes);

// mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => console.log('MongoDB connected'))
//   .catch(err => console.error('MongoDB connection error:', err));

// const app = express();
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(session({ secret: 'secret', resave: false, saveUninitialized: true }));
// app.use(passport.initialize());
// app.use(passport.session());





// const express = require('express');
// const app = express();

// // Middleware to handle JSON and URL-encoded form data
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// // Define a route on the root URL
// app.get('/', (req, res) => {
//   res.send('Hello World!');
// });

// // Set the port for the server
// const PORT = process.env.PORT || 3000;

// // Start the server
// app.listen(PORT, () => {
//   console.log(`Server running on http://localhost:${PORT}`);
// });
