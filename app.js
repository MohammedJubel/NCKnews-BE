const app = require('express')();
const bodyParser = require('body-parser');
const apiRouter = require('./routes/api');
const {
  handle400, handle404, handle422, handle500,
} = require('./errors');


app.use(bodyParser.json());


app.use('/api', apiRouter);

app.all('/*', (req, res) => {
  res.status(404).send({ msg: 'Page not found' });
});

app.use(handle400); // bad request as not right fields given
app.use(handle404);
app.use(handle422);
app.use(handle500);

module.exports = app;
