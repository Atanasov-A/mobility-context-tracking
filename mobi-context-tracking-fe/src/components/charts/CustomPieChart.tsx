import { Box, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";

import { ArcElement, Chart as ChartJS, Legend, Tooltip } from "chart.js";
import { Pie } from "react-chartjs-2";
import { chartBgColors, chartBorderColors } from "../../utils/chartColors";

ChartJS.register(ArcElement, Tooltip, Legend);

// factor https://ux.stackexchange.com/questions/118130/graph-to-represent-how-influences-impact-fixed-related-factors-in-a-measure
// ako e sunny e new value, a bez weather e old value

// https://react-chartjs-2.js.org/examples/vertical-bar-chart/
// mesecite i sravnqvane na bike i car

interface PieChartDataObj {
  labels: string[];
  datasets: {
    data: string[];
    backgroundColor: string[];
    borderColor: string[];
    borderWidth: number;
  }[];
}

interface Props {
  labels: string[];
  values: string[];
  title?: string;
}

// USA RUSSIA shte mi e car, bike, a drugite shte sa mi vremeto
// https://www.anychart.com/products/anychart/gallery/Radar_Charts_(Spiderweb)/Comparison_Radar_Chart.php

const CustomPieChart = (props: Props) => {
  const [chartData, setChartData] = useState<PieChartDataObj | null>();
  useEffect(() => {
    const dataObj = {
      labels: props.labels,
      datasets: [
        {
          data: props.values,
          backgroundColor: chartBgColors,
          borderColor: chartBorderColors,
          borderWidth: 1,
        },
      ],
    };
    setChartData(dataObj);
  }, [props]);

  return (
    <>
      <Box sx={{ mb: 3 }}>
        <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={1}
          sx={{ mb: 2 }}
        >
          <Typography variant="h4">
            {props.title != null ? props.title : ""}
          </Typography>
        </Stack>
        <Box sx={{ flexgrow: 1, height: "420px" }}>
          {chartData != null && (
            <Pie
              data={chartData}
              options={{
                maintainAspectRatio: false,
                responsive: true,
                plugins: {
                  legend: {
                    position: "bottom",
                    labels: {
                      font: {
                        size: 18,
                        family: "sans-serif",
                      },
                    },
                  },
                  tooltip: {
                    bodyFont: {
                      size: 22,
                      family: "sans-serif",
                    },
                    callbacks: {
                      label: (toolTipItem) =>
                        `${toolTipItem.label}: ${toolTipItem.parsed}%`,
                    },
                  },
                },
              }}
            />
          )}
        </Box>
      </Box>
    </>
  );
};

export { CustomPieChart };
