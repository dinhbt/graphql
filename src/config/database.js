import mongoose from 'mongoose';

const connect = () => {
  return mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useUnifiedTopology: true,
  });
};

const db = mongoose.connection;
db.once('open', () => console.log('Connected to MongoLab instance.'))
db.on('error', error => console.log('Error connecting to MongoLab:', error));

export { connect };
