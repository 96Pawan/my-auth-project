const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('./models/User'); 

mongoose.connect('mongodb://localhost:27017/myAuthProject')
  .then(async () => {
    const username = 'admin';
    const email = 'admin@example.com';
    const password = 'adminpassword';
    const hashedPassword = await bcrypt.hash(password, 10);

    const adminUser = new User({
      username,
      email,
      password: hashedPassword,
      isPublic: true,
      role: 'admin',
      profileDetails: {
        photo: 'http://example.com/photo.jpg',
        name: 'Admin User',
        bio: 'Administrator',
        phone: '+1234567890'
      }
    });

    await adminUser.save();
    console.log('Admin user created');
    mongoose.disconnect();
  })
  .catch(err => {
    console.error('Database connection error:', err);
    mongoose.disconnect();
  });
  