import Transactions from "../models/transactions.js";
import connectDb from "../db/db.js";
import express from "express";
import axios from "axios";

const app = express();

const url = "https://s3.amazonaws.com/roxiler.com/product_transaction.json";

connectDb();

const PORT = 4040;

app.get("/initialize-db", async (req, res) => {
  try {
    console.log("Fetching data from third-party API...");
    const response = await axios.get(url);
    const transactions = response.data;

    console.log("Seeding database with fetched data...");
    await Transactions.insertMany(transactions);

    res.status(200).json({ message: "Database initialized with seed data" });
  } catch (err) {
    console.error("Error initializing database:", err);
    res.status(500).json({ message: "Failed to initialize database.", err });
  }
});

app.listen(PORT,()=>{
    console.log(`LISTENING ON PORT ${PORT}`);
})