import "dotenv/config";
import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import goldPriceRoutes from "./routes/goldPrice.routes.js";
import productsRoutes from "./routes/products.routes.js";
import enquiriesRoutes from "./routes/enquiries.routes.js";
import { errorHandler } from "./middleware/errorHandler.js";

const app = express();
const PORT = Number(process.env.PORT ?? 4000);

const corsOrigins = process.env.CORS_ORIGINS?.split(",") ?? [
  "http://localhost:3000",
  "http://localhost:5173",
  "https://shreeva-one.vercel.app",
];

app.use(cors({
  origin: corsOrigins,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  credentials: true,
}));
app.use(express.json());

app.get("/health", (_req, res) => res.json({ ok: true }));
app.use("/api/gold-price", goldPriceRoutes);
app.use("/api/products",   productsRoutes);
app.use("/api/enquiries",  enquiriesRoutes);

app.use(errorHandler);

connectDB().then(() => {
  app.listen(PORT, () => console.log(`API running on http://localhost:${PORT}`));
}).catch((err) => {
  console.error("Failed to connect to MongoDB:", err);
  process.exit(1);
});
