const errorHandler = (error, req, res) => {
  const status = error.status || 500;
  res.status(status).json({
    status: 500,
    message: 'Something went wrong',
    data: error.message,
  });
};

export default errorHandler;
