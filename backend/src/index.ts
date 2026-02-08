import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRouter from "./routes/auth.routes";

const app = express();

app.use(express.json()); //Esta es para que express lea a al json
dotenv.config();

//Esto es por su seguridad, porque hay diferentes dominios
const corsOptions = {
  origin: ["http://localhost:4200"], //el back da acceso para el front (PUERTO EN EL QUE CORRE)
  methods: ["GET", "POST", "DELETE", "PUT", "PATCH"],
  allowheaders: ["Content-Type", "Authorization"],
  credentials: true,
};

app.use(cors(corsOptions));

app.use("/api/auth", authRouter);

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
