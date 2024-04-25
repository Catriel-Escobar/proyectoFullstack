import express, { urlencoded } from "express";
import morgan from "morgan";

const app = express();
app.use(morgan("dev"));
app.use(express.json()); // para datos en json
app.use(urlencoded({ extended: true })); // para datos pasados por url

app.get("/", (req, res) => {
  res.json("welcome to my API");
});

//generando un error para luego probar el middleware de abajo
app.get("/testError", (req, res) => {
  throw new Error("My custom error");
});

// este middleware maneja errores
app.use((err, req, res, next) => {
  res.status(500).send({
    status: "error",
    message: err.message,
  });
});

export default app;
