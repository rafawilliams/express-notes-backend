const URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/express-notes-test';
const mongoose = require('mongoose');

mongoose.set('strictQuery', false);
mongoose.connect(URI);

const connection = mongoose.connection;

connection.once('open', ()=> {
	console.log("mongo connect");
});