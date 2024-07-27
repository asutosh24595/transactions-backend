import Transactions from "../models/transactions.js";

export const getPieChart = async (req, res) => {
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

    const monthIndex = months.indexOf(selectedMonth) + 1; 

    const transactions = await Transactions.aggregate([
      {
        $match: {
          $expr: {
            $eq: [{ $month: "$dateOfSale" }, monthIndex],
          },
        },
      },
      {
        $group: {
          _id: "$category",
          count: { $sum: 1 },
        },
      },
    ]);

    const ranges = transactions.map((item) => ({
      category: item._id,
      count: item.count,
    }));

    res.status(200).json({ ranges });
  } catch (err) {
    console.error("Error fetching pie-chart data:", err);
    res.status(500).json({ message: "Failed to fetch pie-chart data.", err });
  }
};
