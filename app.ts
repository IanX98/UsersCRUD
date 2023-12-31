const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error.controller');
const sequelize = require('./db/database');
const mongoConnect = require('./db/mongoDB').mongoConnect;

const User = require('./models/user');
const Class = require('./models/class');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// const authRoutes = require('./context/authRouter');
const classRoutes = require('./context/classRouter');
const studentRoutes = require('./context/studentRouter');
const commentRoutes = require('./context/commentRouter');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

// app.use(authRoutes);
app.use(classRoutes);
app.use(studentRoutes);
app.use(commentRoutes);

app.use(errorController.pageNotFound);
app.use((err: any, req: any, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { error: string; }): void; new(): any; }; }; }, next: any) => {
  res.status(500).json({ error: 'Internal Server Error' });
});

const PORT = 3000;

User.belongsTo(Class, {constaints: true, onDelete: 'CASCADE'});
Class.hasMany(User);

try {
  Promise.all([sequelize.sync({ force: true}), mongoConnect((client: any) => {
    console.log('MongoDB connection established');
  })])
} catch (err) {
  console.error('Error connecting to databases:', err);
} finally {
  console.log('DATABASES CONNECTED');
  app.listen(PORT, () => {
    console.log(`Server started at ${PORT}`);
  });
}
