import dotenv from "dotenv";

import { app } from "./app.js";
import connectToMongoBD from "./db/index.js";

// Environment variables
dotenv.config(); // or provide path inside() - {path: ./.env}

// Connect to MongoDB
connectToMongoBD()
  .then(() => {
    app.listen(process.env.PORT || 2000, () => {
      console.log(`Server is running on port ${process.env.PORT || 2000}`);
    });
  })
  .catch(err => {
    console.log("ERROR :" + err);
  });

app.get("/", (req, res) => {
  res.send("<h1>Hello World!<h1>");
});
