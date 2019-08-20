const express = require('express');
const mongoose = require('mongoose');
const authRoute = require('./routes/auth.js');
const dotenv = require('dotenv').config();
const adminRoutes = require('./routes/adminRoutes.js');
const testRouters = require('./routes/testRoutes.js');

const app = express();

mongoose.connect(process.env.DB_URI, { useNewUrlParser: true, useCreateIndex: true }, () => console.log('Connected to DB'));


//Middleware and routes
app.use(express.json());

app.use('/api/user', authRoute);
app.use('/api/admin', adminRoutes);
app.use('/api/test', testRouters);


app.listen(process.env.PORT || 3000, () => console.log('Running at 3000'));