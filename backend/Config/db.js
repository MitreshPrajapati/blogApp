const mongoose = require('mongoose');
require('dotenv').config();
mongoose.set('strictQuery', false);


const MONGO_URL = 'mongodb://127.0.0.1:27017/blogApp' || process.env.MONGO_URL

const Connection = mongoose.connect(MONGO_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true
  })

module.exports = { Connection };