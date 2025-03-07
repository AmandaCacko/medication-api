import express from "express";
import medicinesRoutes from "./routes/medicine.routes";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use("/medicines", medicinesRoutes);

const options = {
  definition: {
    openapi: "3.0.0",
    info: { title: "Medication API", version: "1.0.0" },
  },
  apis: ["./src/routes/*.ts"], // Ajuste conforme sua estrutura de projeto
};
const specs = swaggerJsdoc(options);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
  console.log(`Swagger disponível em http://localhost:${PORT}/api-docs`);
});
