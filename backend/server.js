require("dotenv").config();

const express = require("express");
const cors = require("cors");

const animalGroupsRoutes = require('./routes/animalGroup.route');
const subAnimalGroupsRoutes = require('./routes/subAnimalGroup.route');
const supplierRoutes = require('./routes/supplier.route');
const fourageRoutes = require('./routes/fourage.route');
const fourageStockRoutes = require('./routes/fourageStock.route');
const feedingRecordRoutes = require('./routes/feedingRecord.route');
const userRoutes = require('./routes/user.route');
const predictionRoutes = require('./routes/prediction.route');
const { errorHandler, notFound } = require('./middlewares/error.middleware');

const connectDB = require("./database/connection");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/animal-groups', animalGroupsRoutes);
app.use('/api/sub-animal-groups', subAnimalGroupsRoutes);
app.use('/api/fourages', fourageRoutes);
app.use('/api/suppliers', supplierRoutes);
app.use('/api/fourage-stocks', fourageStockRoutes);
app.use('/api/feeding-records', feedingRecordRoutes);
app.use('/api/predictions', predictionRoutes);
app.use('/api/user', userRoutes);

// Error handling middlewares (must be after routes)
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

async function startServer() {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error.message);
    process.exit(1);
  }
}

startServer();

module.exports = app;
