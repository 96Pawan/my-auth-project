const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isPublic: { type: Boolean, default: true },
  role: { type: String, default: 'user' },
  profileDetails: {
    photo: String,
    name: String,
    bio: String,
    phone: String
  }
});

module.exports = mongoose.model('User', userSchema);



// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;

// const userSchema = new Schema({
//   username: { type: String, required: true, unique: true },
//   email: { type: String, required: true, unique: true },
//   password: { type: String, required: true },
//   isPublic: { type: Boolean, default: true },
//   role: { type: String, default: 'user' },
//   profileDetails: {
//     photo: String,
//     name: String,
//     bio: String,
//     phone: String
//   }
// });

// module.exports = mongoose.model('User', userSchema);


// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;

// const userSchema = new Schema({
//   username: { type: String, required: true, unique: true },
//   email: { type: String, required: true, unique: true },
//   password: { type: String, required: true },
//   isPublic: { type: Boolean, default: true },
//   role: { type: String, default: 'user' },
//   profileDetails: {
//     photo: String,
//     name: String,
//     bio: String,
//     phone: String
//   }
// });

// module.exports = mongoose.model('User', userSchema);
