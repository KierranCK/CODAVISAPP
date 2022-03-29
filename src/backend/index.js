import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import routes from "./routes.js";
const port = process.env.PORT || 3006;
const app = express();
//add middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
routes(app);
app.listen(port, () => {
  console.log(`Server stared on port ${port}`);
});
