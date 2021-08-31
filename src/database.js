import mongoose from 'mongoose';
const {
    DB_USER,
    DB_PASS,
    DB_HOST,
    DB_PORT,
    DB_COLLECTION,
    DB_SOURCE
} = process.env;

mongoose.connect(
    `mongodb://${DB_USER}:${DB_PASS}@${DB_HOST}:${DB_PORT}/${DB_COLLECTION}${DB_SOURCE}`,
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