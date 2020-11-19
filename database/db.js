const mongoose = require('mongoose')
const connectDB = async() => {
    try{
        await mongoose.connect('mongodb+srv://stonecold:Cq78Bk1aaa@cluster0-bkfzf.mongodb.net/test?retryWrites=true&w=majority',
        {
            useCreateIndex: true,
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
    console.log("Database connection success")
    } catch(err) {
        console.log(err)
    }
}

module.exports = connectDB