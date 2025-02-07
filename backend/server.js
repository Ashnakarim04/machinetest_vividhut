const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const transactionRoute = require('./route/transactionRoute')

require('dotenv').config();
const app = express();
app.use(express.json());
app.use(cors());
const router = require('../backend/route/route');

app.use('/api', router);
app.use('/transactions', transactionRoute);
 
const port = 5000
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('Database Connected'))
  .catch(err => console.log(err));


app.listen(5000, () => console.log(`Server running on ${port}`));

