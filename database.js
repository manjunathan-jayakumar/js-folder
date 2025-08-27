const mongoose = require('mongoose');
const DB_URI = 'mongodb://localhost:27017/js-server'

//set-up db connection
async function connectDB() {
    try {
        await mongoose.connect(DB_URI);
        console.log('Database connected successfully');
    }
    catch (error) {
        console.error('Database connection error:', error);
    }
}    

module.exports = connectDB;
