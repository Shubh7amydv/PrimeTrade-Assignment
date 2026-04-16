require("express-async-errors");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const helmet = require("helmet");
const { PORT } = require("./config/serverconfig");
const connectDB = require("./config/db");
const apiRoutes = require("./routes/index");
const { User } = require("./models/index");
const { hashPassword } = require("./utils/password");

const ensureAdminUser = async () => {
  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminEmail || !adminPassword) {
    return;
  }

  const existingAdmin = await User.findOne({ email: adminEmail });

  if (existingAdmin) {
    if (existingAdmin.role !== "admin") {
      await existingAdmin.update({ role: "admin" });
      console.log(`Promoted ${adminEmail} to admin role`);
    }
    return;
  }

  const hashedPassword = await hashPassword(adminPassword);
  await User.create({
    email: adminEmail,
    password: hashedPassword,
    firstName: process.env.ADMIN_FIRST_NAME || "Admin",
    lastName: process.env.ADMIN_LAST_NAME || "User",
    role: "admin",
    isActive: true,
  });
  console.log(`Bootstrapped admin user: ${adminEmail}`);
};

const setupAndStartServer = async () => {
  await connectDB();
  console.log("Database connection established successfully");

  await ensureAdminUser();

  const app = express();

  // Middleware
  app.use(helmet());
  app.use(cors());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  // Routes
  app.use("/api", apiRoutes);

  // Health check
  app.get("/health", (req, res) => {
    res.status(200).json({
      success: true,
      message: "Server is running",
    });
  });

  // Error handling middleware
  app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({
      data: {},
      success: false,
      message: "Internal server error",
      err: err.message,
    });
  });

  // Start server
  app.listen(PORT, () => {
    console.log(`Server started at http://localhost:${PORT}`);
  });
};

setupAndStartServer().catch((error) => {
  console.error("Error starting server:", error);
  process.exit(1);
});
