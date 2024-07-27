import Transactions from "../models/transactions.js";

export const getTotalStatistics = async (req, res) => {
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
        $eq: [
          { $month: "$dateOfSale" }, // Extract month from `dateOfSale`
          monthIndex, // Compare with the selected month
        ],
      },
    });

    const totalSales = transactions.reduce(
      (sum, transaction) => sum + (transaction.sold ? transaction.price : 0),
      0
    ).toFixed(2);
    const totalSoldItems = transactions.filter(
      (transaction) => transaction.sold
    ).length;
    const totalNotSoldItems = transactions.filter(
      (transaction) => !transaction.sold
    ).length;

    res.status(200).json({
      totalSales,
      totalSoldItems,
      totalNotSoldItems,
    });
  } catch (err) {
    console.error("Error fetching statistics:", err);
    res.status(500).json({ message: "Failed to fetch statistics.", err });
  }
};
