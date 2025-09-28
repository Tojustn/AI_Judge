import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import type { ChartOptions } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

interface PieChartProps {
  verdictCounts: {
    pass: number;
    fail: number;
    inconclusive: number;
  };
}

const PieChart = ({ verdictCounts }: PieChartProps) => {
  const data = {
    labels: ["Pass", "Fail", "Inconclusive"],
    datasets: [
      {
        label: "# of Questions",
        data: [verdictCounts.pass, verdictCounts.fail, verdictCounts.inconclusive],
        backgroundColor: ["#34D399", "#F87171", "#FBBF24"], // green, red, yellow
        borderColor: ["#fff", "#fff", "#fff"],
        borderWidth: 1,
      },
    ],
  };

  const options: ChartOptions<"pie"> = {
    responsive: true,
    plugins: {
      legend: { position: "right" }, // "bottom" is a valid literal
    },
  };

  return <Pie data={data} options={options} />;
};

export default PieChart;
