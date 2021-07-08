import mongoose from 'mongoose';

mongoose.connect("mongodb://localhost/sgkdb", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true,
    useCreateIndex: true,
    useFindAndModify: false
})
    .then(db => console.log('db connected'))
    .catch(error => console.log('error: ', error));