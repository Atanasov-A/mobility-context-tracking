import { Box, Stack, Typography, useMediaQuery } from "@mui/material";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { theme } from "../theme/CustomTheme";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  indexAxis: "y" as const,
  elements: {
    bar: {
      borderWidth: 2,
    },
  },
  scales: {
    x: {
      min: 0,
      max: 100,
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
        size: 22,
        family: "sans-serif",
      },
      callbacks: {
        label: (toolTipItem) => toolTipItem.formattedValue + "%",
      },
    },
  },
};

interface BarDataObj {
  labels: string[];
  datasets: {
    data: number[];
    backgroundColor: string;
    borderColor: string;
    label: string;
  }[];
}

const borderColor1 = "rgb(0,230,64)";
const bgColor1 = "rgba(0,230,64, 0.6)";
const bgColor2 = "rgba(241, 90, 34, 0.6)";
const borderColor2 = "rgb(241, 90, 34)";

interface Props {
  title?: string;
  labels: string[];
  secondDatasetValues: number[];
  firstDatasetValues: number[];
  nameFirstDataset: string;
  nameSecondDataset: string;
}

const smartphoneHeight = 650;
const desktopHeight = 1000;
const paddingDesktop = 4;
const paddingMobile = 0;

const CustomHorizontalBarChart = (props: Props) => {
  const [data, setData] = useState<BarDataObj | null>();
  const isBiggerThanSmartphone = useMediaQuery(theme.breakpoints.up("sm"));
  const [height, setHeight] = useState(desktopHeight);
  const [padding, setPadding] = useState(paddingDesktop);

  useEffect(() => {
    if (isBiggerThanSmartphone) {
      setHeight(desktopHeight);
      setPadding(paddingDesktop);
    } else {
      setHeight(smartphoneHeight);
      setPadding(paddingMobile);
    }
  }, [isBiggerThanSmartphone]);

  useEffect(() => {
    const dataObj = {
      labels: props.labels,
      datasets: [
        {
          label: props.nameFirstDataset,
          data: props.firstDatasetValues,
          borderColor: borderColor1,
          backgroundColor: bgColor1,
        },
        {
          label: props.nameSecondDataset,
          data: props.secondDatasetValues,
          borderColor: borderColor2,
          backgroundColor: bgColor2,
        },
      ],
    };
    setData(dataObj);
  }, [props]);

  return (
    <>
      {data && (
        <Box sx={{ mb: 2 }}>
          <Stack
            direction="row"
            justifyContent="center"
            alignItems="center"
            spacing={1}
          >
            <Typography variant="h4">
              {props.title != null ? props.title : ""}
            </Typography>
          </Stack>
          <Box sx={{ minHeight: height, px: padding }}>
            <Bar options={options} data={data} />
          </Box>
        </Box>
      )}
    </>
  );
};

export { CustomHorizontalBarChart };
