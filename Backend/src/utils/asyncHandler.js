// Async Handler is a block for handling errors while executing the async function
// block of try catch
// executing a function inside a function (taking as parameter)

// const asyncHandler = (func)=> {()=>{}}

// using try catch
// const asyncHandler = func => async (req, res, next) => {
//   try {
//     await func(req, res, next);
//   } catch (error) {
//     console.log("asyncHandler :: error ::", error);
//     res.status(error.code || 500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

// using promise
const asyncHandler = func => (req, res, next) => {
  Promise.resolve(func(req, res, next)).catch(error => next(error));
};

export { asyncHandler };
