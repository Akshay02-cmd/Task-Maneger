const NotFound = (res, req) => {
  res.status(404).send("Routes not exists");
};

module.exports = NotFound;