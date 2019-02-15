
exports.handle400 = (err, req, res, next) => {
  const codes = {
    23502: 'violates not null violation',
    '22P02': 'invalid input syntax for type integer',
    23503: 'username does not exist',
  };
  if (codes[err.code]) res.status(400).send({ msg: codes[err.code] });
  else next(err);
};

// not found
exports.handle404 = (err, req, res, next) => {
  if (err.status === 404) {
    res.status(404).send(err);
  } else next(err);
};

exports.handle405 = (req, res, next) => {
  res.status(405).send({ msg: 'method not allowed' });
};

exports.handle422 = (err, req, res, next) => {
  if (err.status === 422) {
    res.status(422).send(err);
  } else next(err);
};

exports.handle500 = (err, req, res, next) => {
  res.status(500).send(err);
};
