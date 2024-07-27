import Transactions from "../models/transactions.js";

export const getAllTransactions = async (req, res) => {
  try {
    const { page = 1, perPage = 10, search = "", month = "March" } = req.query;

    const searchPrice = parseFloat(search);

    const priceQuery = !isNaN(searchPrice) ? { price: searchPrice } : null;

    const monthNames = [
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
    const monthIndex = monthNames.indexOf(month) +1 ;
    if (monthIndex === -1) throw new Error("Invalid month specified");

    const query = {
      $expr: {
        $eq: [{ $month: "$dateOfSale" }, monthIndex]
      },
      ...(search ? {
        $or: [
          { title: { $regex: search, $options: "i" } },
          { description: { $regex: search, $options: "i" } },
          ...(priceQuery ? [priceQuery] : []),
        ]
      } : {})
    };

    const total = await Transactions.countDocuments(query);

    const transactions = await Transactions.find(query)
      .skip((page - 1) * perPage)
      .limit(parseInt(perPage));

    res.status(200).json({
      page: parseInt(page),
      perPage: parseInt(perPage),
      totalPages: Math.ceil(total / perPage),
      transactions,
    });
  } catch (err) {
    console.error("Error fetching transactions:", err);
    res.status(500).json({ message: "Failed to fetch transactions.", err });
  }
};
