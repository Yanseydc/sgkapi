import mongoose from 'mongoose';

mongoose.connect(
    `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_COLLECTION}`, 
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: true,
        useCreateIndex: true,
        useFindAndModify: false
    }
)
    .then(db => console.log('db connected'))
    .catch(error => console.log('error: ', error));