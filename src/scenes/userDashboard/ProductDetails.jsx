import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Button,
  Rating,
  IconButton,
  Divider,
} from "@mui/material";
import { useParams } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`https://dummyjson.com/products/${id}`);
        const data = await response.json();
        setProduct(data);
        setSelectedImage(data.images[0]);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };
    fetchProduct();
  }, [id]);

  if (!product)
    return (
      <Typography variant="h6" sx={{ textAlign: "center", mt: 10 }}>
        Loading product...
      </Typography>
    );

  const handleAddToCart = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existing = cart.find((item) => item.id === product.id);
    if (existing) {
      existing.quantity += quantity;
    } else {
      cart.push({ ...product, quantity });
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    alert(`${product.title} added to cart!`);
  };

  return (
    <Box sx={{ p: { xs: 2, md: 6 }, bgcolor: "#fff", minHeight: "100vh" }}>
      <Grid container spacing={6}>
        {/* Left: Product Images */}
        <Grid item xs={12} md={6}>
          <Box sx={{ display: "flex", gap: 2 }}>
            {/* Thumbnail images */}
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              {product.images.map((img, index) => (
                <Box
                  key={index}
                  component="img"
                  src={img}
                  alt={product.title}
                  onClick={() => setSelectedImage(img)}
                  sx={{
                    width: 70,
                    height: 70,
                    borderRadius: 2,
                    border:
                      selectedImage === img
                        ? "2px solid #000"
                        : "1px solid #ddd",
                    objectFit: "cover",
                    cursor: "pointer",
                  }}
                />
              ))}
            </Box>

            {/* Main Image */}
            <Box
              component="img"
              src={selectedImage}
              alt={product.title}
              sx={{
                width: "100%",
                maxHeight: 500,
                borderRadius: 3,
                objectFit: "contain",
                bgcolor: "#f9f9f9",
                p: 2,
              }}
            />
          </Box>
        </Grid>

        {/* Right: Product Details */}
        <Grid item xs={12} md={6}>
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
            {product.title}
          </Typography>
          <Typography sx={{ color: "gray", mb: 1 }}>{product.brand}</Typography>

          {/* Price */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 1 }}>
            <Typography variant="h5" sx={{ fontWeight: 600, color: "#111" }}>
              ${product.price}
            </Typography>
            <Typography
              variant="body1"
              sx={{ color: "gray", textDecoration: "line-through" }}
            >
              ${Math.round(product.price * 1.3)}
            </Typography>
            <Typography sx={{ color: "#d32f2f", fontWeight: 600 }}>
              30% OFF
            </Typography>
          </Box>

          {/* Rating */}
          <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
            <Rating value={product.rating} precision={0.5} readOnly />
            <Typography sx={{ ml: 1, color: "gray" }}>
              ({Math.floor(Math.random() * 150) + 20} reviews)
            </Typography>
          </Box>

          {/* Color */}
          <Typography sx={{ fontWeight: 600, mb: 1 }}>Color:</Typography>
          <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
            {["#000000", "#ffffff", "#808080"].map((color) => (
              <Box
                key={color}
                onClick={() => setSelectedColor(color)}
                sx={{
                  width: 30,
                  height: 30,
                  borderRadius: "50%",
                  bgcolor: color,
                  border:
                    selectedColor === color
                      ? "2px solid #000"
                      : "1px solid #ccc",
                  cursor: "pointer",
                }}
              />
            ))}
          </Box>

          {/* Size */}
          <Typography sx={{ fontWeight: 600, mb: 1 }}>Size:</Typography>
          <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
            {["XS", "S", "M", "L", "XL"].map((size) => (
              <Button
                key={size}
                variant={selectedSize === size ? "contained" : "outlined"}
                onClick={() => setSelectedSize(size)}
                sx={{
                  borderRadius: "20px",
                  minWidth: 40,
                  color: "#000",
                  borderColor: "#ccc",
                  "&:hover": {
                    borderColor: "#000",
                    bgcolor:
                      selectedSize === size ? "#000" : "rgba(0,0,0,0.05)",
                  },
                }}
              >
                {size}
              </Button>
            ))}
          </Box>

          {/* Quantity */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
              mb: 3,
            }}
          >
            <IconButton
              onClick={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}
            >
              <RemoveIcon />
            </IconButton>
            <Typography>{quantity}</Typography>
            <IconButton onClick={() => setQuantity(quantity + 1)}>
              <AddIcon />
            </IconButton>
          </Box>

          {/* Add to Cart */}
          <Button
            variant="contained"
            fullWidth
            sx={{
              bgcolor: "#000",
              color: "#fff",
              py: 1.5,
              borderRadius: "30px",
              fontWeight: 600,
              "&:hover": { bgcolor: "#333" },
            }}
            onClick={handleAddToCart}
          >
            ADD TO CART
          </Button>

          <Divider sx={{ my: 4 }} />

          {/* Description */}
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
            Description
          </Typography>
          <Typography sx={{ color: "gray", lineHeight: 1.6 }}>
            {product.description}
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProductDetails;
