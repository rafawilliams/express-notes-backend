
const URI = process.env.MONGO_URI;
const mongoose = require('mongoose');


mongoose.connect(URI,{
	useNewUrlParser:true,
	useCreateIndex:true,
	useUnifiedTopology: true,
	useFindAndModify:false
});


const connection = mongoose.connection;


connection.once('open', ()=> {
	console.log("mongo connect");
});