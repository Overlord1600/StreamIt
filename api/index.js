const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
const dotenv = require("dotenv");
const app = express();
const authRouter = require("./routes/auth");
const userRouter = require("./routes/user");
const movieRouter = require("./routes/movie");
const listRouter = require("./routes/list");

dotenv.config();
mongoose
  .connect(process.env.MONGO, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MONGO Connected"))
  .catch((err) => console.log("Connection Error", err));

app.use(bodyparser.json({ limit: "2mb" }));
app.use(cors());

app.use(express.json());
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/movie", movieRouter);
app.use("/api/movieList",listRouter);

const port = 8000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
