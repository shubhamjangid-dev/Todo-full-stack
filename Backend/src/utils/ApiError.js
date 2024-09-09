class ApiError extends Error {
  constructor(statusCode, message = "SomeThing Went Wrong", errors = [], stack = "", data = null) {
    super(message);
    this.success = false;
    this.statusCode = statusCode;
    this.errorMessage = message;
    this.errors = errors;
    this.data = data;

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}
export { ApiError };
