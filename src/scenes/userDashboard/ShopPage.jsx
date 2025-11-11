import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  CircularProgress,
  Rating,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const ShopPage = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [limit, setLimit] = useState(20);

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`https://dummyjson.com/products?limit=${limit}`);
        const data = await response.json();
        const mappedProducts = data.products.map((item) => ({
          id: item.id,
          name: item.title,
          price: item.price,
          rating: item.rating,
          img: item.images[0],
        }));
        setProducts(mappedProducts);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false);
      }
    };
    fetchProducts();
  }, [limit]);

  const loadMore = () => setLimit((prev) => prev + 20);

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 10 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ p: { xs: 2, md: 6 }, bgcolor: "#fff", minHeight: "100vh" }}>
      {/* Section Header */}
      <Box sx={{ textAlign: "center", mb: 6 }}>
        <Typography variant="h4" sx={{ fontWeight: 700, color: "#222", mb: 1 }}>
          Our Products
        </Typography>
        <Typography sx={{ color: "text.secondary", fontSize: 15 }}>
          Here you can check out our new products with fair prices on Rymo.
        </Typography>
      </Box>

      {/* Product Grid */}
      <Grid container spacing={4} justifyContent="center">
        {products.map((product) => (
          <Grid item xs={12} sm={6} md={3} key={product.id}>
            <Card
              sx={{
                borderRadius: 3,
                boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
                textAlign: "center",
                transition: "all 0.3s ease",
                "&:hover": {
                  transform: "translateY(-5px)",
                  boxShadow: "0 4px 14px rgba(0,0,0,0.1)",
                },
              }}
            >
              <CardMedia
                component="img"
                height="200"
                image={product.img}
                alt={product.name}
                sx={{
                  objectFit: "contain",
                  p: 2,
                  borderBottom: "1px solid #f0f0f0",
                }}
              />
              <CardContent>
                <Rating
                  name="read-only"
                  value={product.rating}
                  precision={0.5}
                  readOnly
                  size="small"
                  sx={{ mb: 1 }}
                />
                <Typography
                  variant="body1"
                  sx={{
                    fontWeight: 600,
                    color: "#333",
                    mb: 0.5,
                    textTransform: "capitalize",
                  }}
                >
                  {product.name.length > 25
                    ? product.name.slice(0, 25) + "..."
                    : product.name}
                </Typography>
                <Typography variant="subtitle1" sx={{ color: "#7d7d7d", mb: 1 }}>
                  ${product.price.toFixed(2)}
                </Typography>

                {/* View Button */}
                <Button
                  variant="outlined"
                  fullWidth
                  sx={{
                    mb: 1,
                    borderRadius: "20px",
                    textTransform: "none",
                    fontWeight: 500,
                    color: "#000",
                    borderColor: "#000",
                    "&:hover": { bgcolor: "#000", color: "#fff" },
                  }}
                  onClick={() => navigate(`/user-dashboard/product/${product.id}`)}
                >
                  View
                </Button>

                {/* Add to Cart Button */}
                <Button
                  variant="contained"
                  fullWidth
                  sx={{
                    bgcolor: "#000",
                    color: "#fff",
                    borderRadius: "20px",
                    textTransform: "none",
                    px: 3,
                    py: 0.5,
                    fontWeight: 500,
                    "&:hover": { bgcolor: "#333" },
                  }}
                  onClick={() => {
                    const cart = JSON.parse(localStorage.getItem("cart")) || [];
                    cart.push(product);
                    localStorage.setItem("cart", JSON.stringify(cart));
                    window.dispatchEvent(new Event("cartUpdated"));
                  }}
                >
                  Add to Cart
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Load More Button */}
      {products.length < 100 && (
        <Box sx={{ textAlign: "center", mt: 6 }}>
          <Button
            variant="outlined"
            sx={{
              textTransform: "none",
              fontWeight: 600,
              borderRadius: "20px",
              px: 4,
              py: 1,
              color: "#000",
              borderColor: "#000",
              "&:hover": { bgcolor: "#000", color: "#fff" },
            }}
            onClick={loadMore}
          >
            Load More
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default ShopPage;
