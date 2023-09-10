const notFoundHandler = (req, res, next) => {
  return res.send({
    status: 404,
    message: "not found any " + req.url + " route",
  });
};

const errorHandler = (err, req, res, next) => {
  return res.send({
    status: err.status || err.statusCode || 500,
    message: err.message || "internal server error",
  });
};

module.exports = {
  notFoundHandler,
  errorHandler,
};
