import Transactions from "../models/transactions.js";

export const getBarChart = async (req, res) => {
  try {
    const { month } = req.query;

    const selectedMonth = month || "March";

    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    if (!months.includes(selectedMonth)) {
      return res.status(400).json({ message: "Invalid month" });
    }

    const monthIndex = months.indexOf(selectedMonth) + 1; // Convert month name to number (1 for January, etc.)

    const transactions = await Transactions.find({
      $expr: {
        $eq: [{ $month: "$dateOfSale" }, monthIndex],
      },
    });

    const ranges = [
      { range: "0 - 100", count: 0 },
      { range: "101 - 200", count: 0 },
      { range: "201 - 300", count: 0 },
      { range: "301 - 400", count: 0 },
      { range: "401 - 500", count: 0 },
      { range: "501 - 600", count: 0 },
      { range: "601 - 700", count: 0 },
      { range: "701 - 800", count: 0 },
      { range: "801 - 900", count: 0 },
      { range: "901 - above", count: 0 },
    ];

    transactions.forEach((transaction) => {
      let rangeIndex = 0; 

      if (transaction.price <= 100) rangeIndex = 0;
      else if (transaction.price <= 200) rangeIndex = 1;
      else if (transaction.price <= 300) rangeIndex = 2;
      else if (transaction.price <= 400) rangeIndex = 3;
      else if (transaction.price <= 500) rangeIndex = 4;
      else if (transaction.price <= 600) rangeIndex = 5;
      else if (transaction.price <= 700) rangeIndex = 6;
      else if (transaction.price <= 800) rangeIndex = 7;
      else if (transaction.price <= 900) rangeIndex = 8;
      else rangeIndex = 9;
      
      ranges[rangeIndex].count++;
    });

    res.status(200).json({
      ranges,
    });
  } catch (err) {
    console.error("Error fetching bar-chart data:", err);
    res.status(500).json({ message: "Failed to fetch bar-chart data.", err });
  }
};
