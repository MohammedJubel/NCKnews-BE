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

app.use(handle400); // bad request - i.e. If we have an end-point `api/films/:film_id` and a client makes a request of `api/films/abc
app.use(handle404);// This could be that the param ID is correctly formed but does not exist, or the route does not exist at all
app.use(handle422); // unprocessable entity - i.e. unique key violations
app.use(handle500); // This handles all errors which haven't been identified by the above like a catchAll

module.exports = app;
