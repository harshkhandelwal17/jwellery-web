import "dotenv/config";
import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import goldPriceRoutes from "./routes/goldPrice.routes.js";
import productsRoutes from "./routes/products.routes.js";
import enquiriesRoutes from "./routes/enquiries.routes.js";
import adminAuthRoutes from "./routes/adminAuth.routes.js";
import { errorHandler } from "./middleware/errorHandler.js";

const app = express();
const PORT = Number(process.env.PORT ?? 4000);

/** Reflects request Origin — allows browser calls from any domain (no CORS allowlist). */
app.use(
  cors({
    origin: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    credentials: true,
  })
);
app.use(express.json());

app.use(async (_req, _res, next) => {
  try {
    await connectDB();
    next();
  } catch (err) {
    next(err);
  }
});

app.get("/health", (_req, res) => res.json({ ok: true }));
app.use("/api/gold-price", goldPriceRoutes);
app.use("/api/products", productsRoutes);
app.use("/api/enquiries", enquiriesRoutes);
app.use("/api/admin-auth", adminAuthRoutes);

app.use(errorHandler);

if (!process.env.VERCEL) {
  connectDB()
    .then(() => {
      app.listen(PORT, () => console.log(`API running on http://localhost:${PORT}`));
    })
    .catch((err) => {
      console.error("Failed to connect to MongoDB:", err);
      process.exit(1);
    });
}

export default app;
