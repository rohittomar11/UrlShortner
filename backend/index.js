import express from "express";
import { dbConnect } from "./DB/Database.js";
import cors from "cors";
import dotenv from "dotenv";

import { userRoute } from "./routes/userRoute.js";
import { loginRoute } from "./routes/loginRoute.js";
import { dashboardRoute } from "./routes/dashboardRoute.js";
import { allLinksRoute } from "./routes/allLinksRoute.js";

const app = express();
dotenv.config();
dbConnect();
app.use(cors());
app.use(express.json());
app.use("/user", userRoute);
app.use("/user", loginRoute);

app.use("/links",allLinksRoute);
app.use("/links",dashboardRoute);

// app.use("/", (req, res) => {
//   res.send("welcome user");
// });
const PORT = process.env.PORT || 7777;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
