import express from "express";
import { getAllTransactions } from "../controllers/transactionController.js";
import { getTotalStatistics } from "../controllers/statisticsController.js";
import { getPieChart } from "../controllers/pieChartController.js";
import { getCombinedData } from "../controllers/combinedDataController.js";
import { getBarChart } from "../controllers/barChartController.js";

const router = express.Router();

router.get("/", getAllTransactions);
router.get("/statistics", getTotalStatistics);
router.get("/bar-chart", getBarChart);
router.get("/pie-chart", getPieChart);
router.get("/combined", getCombinedData);


export default router;
