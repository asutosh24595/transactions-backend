import axios from "axios";

export const getCombinedData = async (req, res) => {
  try {
    const month = req.query.month || "March";

    const url = "http://localhost:4000/transactions/";

    const statisticsResponse = await axios.get(
      `${url}statistics?month=${month}`
    );
    const pieChartResponse = await axios.get(`${url}pie-chart?month=${month}`);
    const barChartResponse = await axios.get(`${url}bar-chart?month=${month}`);

    const combinedData = {
      statistics: statisticsResponse.data,
      pieChart: pieChartResponse.data,
      barChart: barChartResponse.data,
    };
    res.status(200).json(combinedData);
  } catch (err) {
    console.error("Error fetching combined data:", err);
    res.status(500).json({ message: "Failed to fetch combined data.", err });
  }
};
