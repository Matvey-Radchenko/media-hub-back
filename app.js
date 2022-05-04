const express = require('express');
require('dotenv').config();

const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const path = require('path');

const userRouter = require('./src/routes/userRouter');
const friendRouter = require('./src/routes/friendRouter');
const productRouter = require('./src/routes/productRouter');
const categoryRouter = require('./src/routes/categoryRouter');
const tagsRouter = require('./src/routes/tagsRouter');

const PORT = process.env.PORT || 3001;

const sessionConfig = {
  store: new FileStore(),
  key: 'sid',
  secret: 'secret',
  resave: false,
  saveUninitialized: false,
  httpOnly: true,
  cookie: { expires: 1000 * 60 * 60 },
};

const sessionParser = session(sessionConfig);
app.use(sessionParser);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/users', userRouter);
app.use('/friends', friendRouter);
app.use('/products', productRouter);
app.use('/categories', categoryRouter);
app.use('/users/tags', tagsRouter);

io.on('connection', (socket) => { // генерация событий которые будут переданы клиенту
  console.log('a user connected');
  socket.on('chat message', (msg) => {
    console.log(msg);
    socket.broadcast.emit('chat message', msg);
  });
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

http.listen(PORT, () => {
  console.log('listening on 3001');
});
