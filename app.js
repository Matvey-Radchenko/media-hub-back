// const express = require('express');
// const path = require('path');
// const hbs = require('hbs');
// const session = require('express-session');
// const FileStore = require('session-file-store')(session);

// // const indexRouter = require('./src/routes/indexRouter');

// require('dotenv').config();

// const app = express();

// const sessionConfig = {
//   store: new FileStore(),
//   key: 'sid',
//   secret: 'secret',
//   resave: false,
//   saveUninitialized: false,
//   httpOnly: true,
//   cookie: { expires: 1000 * 60 * 60 },
// };

// const sessionParser = session(sessionConfig);
// app.use(sessionParser);
const express = require('express');

const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const session = require('express-session');
const FileStore = require('session-file-store')(session);
require('dotenv').config();
const path = require('path');

// const io = require('socket.io')(http);

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
// app.set('view engine', 'hbs');
// app.set('views', path.join(process.cwd(), 'src', 'views'));

// app.get('/', (req, res) => {
//   res.sendFile(`${__dirname}/index.html`);
// });
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
