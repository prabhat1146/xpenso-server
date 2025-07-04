const asyncHandler = (fun) => {
  return (req, res, next) => {
    Promise.resolve(fun(req, res, next)).catch(next);
  };
};

module.exports = asyncHandler;
