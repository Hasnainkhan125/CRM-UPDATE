import React, { useState, useMemo } from "react";
import Chart from "react-apexcharts";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
  useTheme,
} from "@mui/material";
import { tokens } from "../theme";
import { mockLineData as data } from "../data/mockData";

const LineChart = ({ isCustomLineColors = false, isDashboard = false, height = 180 }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [filter, setFilter] = useState("monthly");

  const rawSeries = data.map((serie) => ({
    name: serie.id,
    data: serie.data.map((point) => ({ x: point.x, y: point.y })),
  }));

  const filteredSeries = useMemo(() => {
    switch (filter) {
      case "daily":
        return rawSeries.map((serie) => ({ ...serie, data: serie.data.slice(-7) }));
      case "weekly":
        return rawSeries.map((serie) => ({ ...serie, data: serie.data.filter((_, i) => i % 4 === 0) }));
      case "monthly":
        return rawSeries;
      case "yearly":
        return rawSeries.map((serie) => ({ ...serie, data: serie.data.filter((_, i) => i % 10 === 0) }));
      default:
        return rawSeries;
    }
  }, [filter, rawSeries]);

  const categories = filteredSeries[0]?.data.map((point) => point.x) || [];
  const series = filteredSeries.map((serie) => ({
    name: serie.name,
    data: serie.data.map((p) => p.y),
  }));

  const options = {
    chart: {
      type: "line",
      toolbar: { show: false },
      zoom: { enabled: false },
      foreColor: colors.grey[100],
      background: "transparent",
    },
    colors: isDashboard ? data.map((d) => d.color || colors.primary[500]) : undefined,
    stroke: { curve: "smooth", width: 2 },
    markers: { size: 4, colors: ["#fff"], strokeColors: colors.primary[500], strokeWidth: 2 },
    xaxis: { categories, labels: { style: { colors: colors.grey[100], fontSize: "10px" } }, axisBorder: { show: false }, axisTicks: { show: false } },
    yaxis: { labels: { style: { colors: colors.grey[100], fontSize: "10px" } }, show: true },
    grid: { show: true, borderColor: colors.grey[700], strokeDashArray: 4 },
    tooltip: { theme: theme.palette.mode },
    legend: { show: false },
    padding: { left: 0, right: 0, top: 0, bottom: 0 },
  };

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        borderRadius: 0,
        p: 0,
        m: 0,
      }}
    >
      {/* Optional Header */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          p: 0,
          m: 0,
        }}
      >
        <Typography variant="subtitle2" sx={{ fontWeight: 600, color: colors.grey[100], m: 0 }}>
          Performance Overview
        </Typography>

        <FormControl size="small" sx={{ minWidth: 100, m: 0, p: 0 }}>
          <InputLabel>Filter</InputLabel>
          <Select value={filter} label="Filter" onChange={(e) => setFilter(e.target.value)}>
            <MenuItem value="daily">Daily</MenuItem>
            <MenuItem value="weekly">Weekly</MenuItem>
            <MenuItem value="monthly">Monthly</MenuItem>
            <MenuItem value="yearly">Yearly</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {/* Chart */}
      <Box sx={{ flex: 1, width: "100%", p: 0, m: 0 }}>
        <Chart options={options} series={series} type="line" height="100%" />
      </Box>
    </Box>
  );
};

export default LineChart;
