const mongoose = require('mongoose');
const mongoURI = 'mongodb://localhost:27017/my-notebook'

mongoose.connect(mongoURI, { useNewUrlParser: true })
const connectToMongo = mongoose.connection
connectToMongo.on('open', () => {
    console.log("database connected...")
})

module.exports = connectToMongo;