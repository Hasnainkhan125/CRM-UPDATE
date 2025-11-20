import { useState, useEffect, useMemo } from "react";
import {
  Box,
  Paper,
  Typography,
  CircularProgress,
  useTheme,
  useMediaQuery,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
} from "@mui/material";
import { motion } from "framer-motion";

export default function BinanceLiveTable() {
  const theme = useTheme();
  const isMobile = useMediaQuery("(max-width: 600px)");
  const [rows, setRows] = useState([]);
  const [orderBy, setOrderBy] = useState("symbol");
  const [order, setOrder] = useState("asc");
  const [loading, setLoading] = useState(true);
  const [countdown, setCountdown] = useState(5);

  const fetchData = async () => {
    try {
      const res = await fetch(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=false"
      );
      const data = await res.json();
      const formatted = data.map((coin, index) => ({
        id: index + 1,
        symbol: coin.symbol.toUpperCase() + "USDT",
        price: coin.current_price,
        change: coin.price_change_percentage_24h,
        volume: coin.total_volume,
        icon: coin.image,
      }));
      setRows(formatted);
      setLoading(false);
      setCountdown(5);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    const countdownInterval = setInterval(() => {
      setCountdown((prev) => {
        if (prev === 1) {
          fetchData();
          return 5;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(countdownInterval);
  }, []);

  const sortedRows = useMemo(() => {
    return [...rows].sort((a, b) => {
      const valA = a[orderBy];
      const valB = b[orderBy];
      if (typeof valA === "string") return order === "asc" ? valA.localeCompare(valB) : valB.localeCompare(valA);
      return order === "asc" ? valA - valB : valB - valA;
    });
  }, [rows, orderBy, order]);

  const handleSort = (column) => {
    if (orderBy === column) setOrder(order === "asc" ? "desc" : "asc");
    else {
      setOrderBy(column);
      setOrder("asc");
    }
  };

  return (
    <Box px={isMobile ? 1 : 3} mt={isMobile ? 4 : 8}>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
        <Paper
          elevation={0}
          sx={{
            borderRadius: 3,
            backdropFilter: "blur(15px)",
            WebkitBackdropFilter: "blur(15px)",
            background: theme.palette.mode === "dark" ? "rgba(15,23,42,0.6)" : "rgba(255,255,255,0.7)",
          }}
        >
          {/* Header */}
          <Box display="flex" justifyContent="space-between" alignItems="center" px={2} py={2} flexWrap="wrap">
            <Typography
              sx={{
                fontWeight: 900,
                fontSize: isMobile ? "1.2rem" : "1.8rem",
                background: "linear-gradient(120deg,#6366f1,#3b82f6,#06b6d4)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Live MARKET
            </Typography>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                px: 2,
                py: 0.5,
                borderRadius: "12px",
                backgroundColor: theme.palette.mode === "dark" ? "rgba(99,102,241,0.15)" : "rgba(147,197,253,0.25)",
                color: theme.palette.mode === "dark" ? "#e0e7ff" : "#1e3a8a",
                fontWeight: 600,
                fontSize: isMobile ? 12 : 14,
              }}
            >
              <Box
                sx={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  bgcolor: "#10b981",
                  animation: "pulse 1.5s infinite",
                  "@keyframes pulse": {
                    "0%": { transform: "scale(0.8)", opacity: 0.6 },
                    "50%": { transform: "scale(1.2)", opacity: 1 },
                    "100%": { transform: "scale(0.8)", opacity: 0.6 },
                  },
                }}
              />
              Live updates in {countdown}s
            </Box>
          </Box>

          {/* Mobile cards */}
          {isMobile ? (
            <Box display="flex" flexDirection="column" gap={2} px={1} pb={2}>
              {loading ? (
                <Box display="flex" justifyContent="center" py={4}>
                  <CircularProgress />
                </Box>
              ) : (
                sortedRows.map((row) => (
                  <Paper
                    key={row.id}
                    elevation={0}
                    sx={{
                      p: 2,
                      display: "flex",
                      flexDirection: "column",
                      gap: 0.5,
                      borderRadius: 3,
                      backdropFilter: "blur(10px)",
                      backgroundColor: theme.palette.mode === "dark" ? "rgba(255,255,255,0.05)" : "rgba(255,255,255,0.9)",
                    }}
                  >
                    <Box display="flex" justifyContent="space-between" alignItems="center">
                      <Box display="flex" alignItems="center" gap={1}>
                        <img src={row.icon} alt={row.symbol} style={{ width: 32, height: 32 }} />
                        <Typography fontWeight={700}>{row.symbol}</Typography>
                      </Box>
                      <Typography color={row.change >= 0 ? "#16a34a" : "#dc2626"} fontWeight={600}>
                        {row.change.toFixed(2)}%
                      </Typography>
                    </Box>
                    <Box display="flex" justifyContent="space-between">
                      <Typography fontSize="0.85rem" color="text.secondary">
                        Price: ${row.price.toFixed(6)}
                      </Typography>
                      <Typography fontSize="0.85rem" color="text.secondary">
                        Vol: {row.volume.toLocaleString()}
                      </Typography>
                    </Box>
                  </Paper>
                ))
              )}
            </Box>
          ) : (
            // Desktop table with scroll
            <Box px={3} pb={3} sx={{ maxHeight: 500, overflowY: "auto" }}>
              <Table stickyHeader sx={{ minWidth: 600, "& th, & td": { padding: "10px 16px" } }}>
                <TableHead>
                  <TableRow>
                    {["id", "symbol", "price", "change", "volume"].map((col) => (
                      <TableCell key={col} sx={{ fontWeight: 700 }}>
                        <TableSortLabel active={orderBy === col} direction={orderBy === col ? order : "asc"} onClick={() => handleSort(col)}>
                          {col.toUpperCase()}
                        </TableSortLabel>
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {sortedRows.map((r) => (
                    <TableRow key={r.id} hover>
                      <TableCell sx={{ fontWeight: 600, color: "#2563eb" }}>{r.id}</TableCell>
                      <TableCell sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <img src={r.icon} alt={r.symbol} style={{ width: 40, height: 40 }} />
                        <Typography sx={{ fontWeight: 600 }}>{r.symbol}</Typography>
                      </TableCell>
                      <TableCell sx={{ color: "#10b981" }}>${r.price.toFixed(6)}</TableCell>
                      <TableCell sx={{ color: r.change >= 0 ? "#16a34a" : "#dc2626" }}>{r.change.toFixed(2)}%</TableCell>
                      <TableCell>{r.volume.toLocaleString()}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          )}
        </Paper>
      </motion.div>
    </Box>
  );
}
