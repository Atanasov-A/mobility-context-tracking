import { Box, Stack, Typography, useMediaQuery } from "@mui/material";
import {
  Chart as ChartJS,
  Filler,
  Legend,
  LineElement,
  PointElement,
  RadialLinearScale,
  Tooltip,
} from "chart.js";
import { useEffect, useState } from "react";
import { Radar } from "react-chartjs-2";
import { theme } from "../theme/CustomTheme";

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

interface RadarChartDataObj {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor: string;
    borderColor: string;
    borderWidth: number;
  }[];
}

export const data = {
  labels: ["Thing 1", "Thing 2", "Thing 3", "Thing 4", "Thing 5", "Thing 6"],
  datasets: [
    {
      label: "# of Votes",
      data: [2, 9, 3, 5, 2, 3],
      backgroundColor: "rgba(255, 99, 132, 0.2)",
      borderColor: "rgba(255, 99, 132, 1)",
      borderWidth: 1,
    },
  ],
};

const optionsDesktop = {
  scales: {
    r: {
      min: 0,
      max: 100,
      beginAtZero: true,
      pointLabels: {
        font: {
          size: 20,
        },
      },
    },
  },
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "bottom" as const,
      labels: {
        font: {
          size: 18,
          family: "sans-serif",
        },
      },
    },
    tooltip: {
      bodyFont: {
        size: 16,
        family: "sans-serif",
      },
      callbacks: {
        label: (toolTipItem) => toolTipItem.formattedValue + "%",
      },
    },
  },
};

const optionsMobile = {
  scales: {
    r: {
      min: 0,
      max: 100,
      beginAtZero: true,
      pointLabels: {
        font: {
          size: 10,
        },
      },
    },
  },
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "bottom" as const,
      labels: {
        font: {
          size: 16,
          family: "sans-serif",
        },
      },
    },
    tooltip: {
      bodyFont: {
        size: 10,
        family: "sans-serif",
      },
      callbacks: {
        label: (toolTipItem) => toolTipItem.formattedValue + "%",
      },
    },
  },
};

interface Props {
  labels: string[];
  label: string;
  values: number[];
  title?: string;
  secondValues?: number[];
  secondLabel?: string;
}

const bgColor = "rgba(98, 94, 243, 0.7)";
const borderColor = "rgba(98, 94, 243, 1)";

const smartphoneHeight = 400;
const desktopHeight = 850;

const CustomRadarChart = (props: Props) => {
  const [chartData, setChartData] = useState<RadarChartDataObj | null>();
  const isBiggerThanSmartphone = useMediaQuery(theme.breakpoints.up("sm"));
  const [options, setOptions] = useState(optionsDesktop);
  const [height, setHeight] = useState(desktopHeight);

  useEffect(() => {
    if (isBiggerThanSmartphone) {
      setOptions(optionsDesktop);
      setHeight(desktopHeight);
    } else {
      setOptions(optionsMobile);
      setHeight(smartphoneHeight);
    }
  }, [isBiggerThanSmartphone]);

  useEffect(() => {
    if (props.secondValues != null && props.secondLabel != null) {
      const dataObj = {
        labels: props.labels,
        datasets: [
          {
            label: props.label,
            data: props.values,
            backgroundColor: bgColor,
            borderColor: borderColor,
            borderWidth: 1,
          },
          {
            label: props.secondLabel,
            data: props.secondValues,
            backgroundColor: "rgba(255,215,0, 0.7)",
            borderColor: "rgba(255,215,0, 1)",
            borderWidth: 1,
          },
        ],
      };
      setChartData(dataObj);
    } else {
      const dataObj = {
        labels: props.labels,
        datasets: [
          {
            label: props.label,
            data: props.values,
            backgroundColor: bgColor,
            borderColor: borderColor,
            borderWidth: 1,
          },
        ],
      };
      setChartData(dataObj);
    }
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
        <Box sx={{ minHeight: height }}>
          {chartData != null && <Radar data={chartData} options={options} />}
        </Box>
      </Box>
    </>
  );
};

export { CustomRadarChart };
