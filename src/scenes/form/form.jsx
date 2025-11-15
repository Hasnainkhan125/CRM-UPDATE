import {
  Box,
  Button,
  TextField,
  Typography,
  CircularProgress,
  Snackbar,
  Slide,
  Alert,
  Card,
  CardContent,
  CardActions,
  Divider,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import { useState, useEffect } from "react";
import Header from "../../components/Header";

const AdminProductForm = () => {
  const isMobile = useMediaQuery("(max-width:600px)");
  const theme = useTheme();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [addSuccess, setAddSuccess] = useState(false);
  const [preview, setPreview] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const savedProducts = JSON.parse(localStorage.getItem("products")) || [];
    setProducts(Array.isArray(savedProducts) ? savedProducts : []);
  }, []);

  const convertToBase64 = (file, setFieldValue) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setFieldValue("image", reader.result);
      setPreview(reader.result);
    };
  };

  const handleAddSubmit = (values, { resetForm }) => {
    setLoading(true);
    setTimeout(() => {
      const existingProducts = JSON.parse(localStorage.getItem("products")) || [];
      const updatedProducts = [
        ...existingProducts,
        { ...values, id: existingProducts.length + 1, price: parseFloat(values.price) },
      ];
      localStorage.setItem("products", JSON.stringify(updatedProducts));
      setProducts(updatedProducts);
      resetForm();
      setPreview(null);
      setLoading(false);
      setAddSuccess(true);
      setShowForm(false);
    }, 800);
  };

  const handleDeleteProduct = (index) => {
    setLoading(true);
    setTimeout(() => {
      const updatedProducts = products.filter((_, i) => i !== index);
      setProducts(updatedProducts);
      localStorage.setItem("products", JSON.stringify(updatedProducts));
      setLoading(false);
      setSuccess(true);
    }, 400);
  };

  function SlideUp(props) {
    return <Slide {...props} direction="up" />;
  }

  return (
    <Box m={isMobile ? 2 : 4}>
      <Header title="Admin Product Management" subtitle="Add & Delete Products" />

      {/* Loading */}
      {loading && (
        <Box
          position="fixed"
          top={0}
          left={0}
          width="100%"
          height="100%"
          display="flex"
          alignItems="center"
          justifyContent="center"
          bgcolor="rgba(0,0,0,0.35)"
          zIndex={2000}
        >
          <CircularProgress size={70} color="secondary" />
        </Box>
      )}

      {/* Snackbars */}
      <Snackbar
        open={success}
        autoHideDuration={2000}
        onClose={() => setSuccess(false)}
        TransitionComponent={SlideUp}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert severity="error" variant="filled">🗑️ Product Deleted Successfully!</Alert>
      </Snackbar>

      <Snackbar
        open={addSuccess}
        autoHideDuration={2000}
        onClose={() => setAddSuccess(false)}
        TransitionComponent={SlideUp}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert severity="success" variant="filled">✅ Product Added Successfully!</Alert>
      </Snackbar>

      {/* Add Product Button */}
      {!showForm && (
        <Box textAlign="center" mb={4}>
          <Button
            variant="contained"
            color="secondary"
            size="large"
            onClick={() => setShowForm(true)}
            sx={{ borderRadius: 3, px: 6, py: 1.5 }}
          >
            Add Product
          </Button>
        </Box>
      )}

      {/* Slide-in Add Product Form */}
      {showForm && (
        <Box
          display="flex"
          flexDirection={{ xs: "column", md: "row" }}
          gap={4}
          mb={4}
          sx={{ animation: "fadeIn 0.3s" }}
        >
          <Card
            sx={{
              flex: 1,
              borderRadius: 3,
              boxShadow: "0px 10px 25px rgba(0,0,0,0.1)",
              p: 3,
              bgcolor: theme.palette.mode === "dark" ? "#0f001a" : "#fff",
            }}
          >
            <Typography variant={isMobile ? "h6" : "h5"} mb={3} fontWeight="700">
              Add New Product
            </Typography>

            <Formik
              onSubmit={handleAddSubmit}
              initialValues={initialValues}
              validationSchema={productSchema}
            >
              {({ values, errors, touched, handleBlur, handleChange, handleSubmit, setFieldValue }) => (
                <form onSubmit={handleSubmit}>
                  <Box display="flex" flexDirection="column" gap={2}>
                    <TextField
                      label="Product Name"
                      name="name"
                      value={values.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={!!touched.name && !!errors.name}
                      helperText={touched.name && errors.name}
                      fullWidth
                      variant="outlined"
                    />
                    <TextField
                      label="Price"
                      name="price"
                      type="number"
                      value={values.price}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={!!touched.price && !!errors.price}
                      helperText={touched.price && errors.price}
                      fullWidth
                      variant="outlined"
                    />
                    <TextField
                      label="Description"
                      name="description"
                      value={values.description}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={!!touched.description && !!errors.description}
                      helperText={touched.description && errors.description}
                      fullWidth
                      multiline
                      minRows={3}
                      variant="outlined"
                    />

                    {/* Full-size Image Preview */}
                    <Box display="flex" flexDirection="column" alignItems="center" mt={2}>
                      <Button
                        variant="contained"
                        component="label"
                        sx={{ borderRadius: 2, px: 4, py: 1 }}
                      >
                        Upload Image
                        <input
                          hidden
                          accept="image/*"
                          type="file"
                          onChange={(e) => {
                            const file = e.target.files[0];
                            if (file) convertToBase64(file, setFieldValue);
                          }}
                        />
                      </Button>
                      {preview && (
                        <Box
                          component="img"
                          src={preview}
                          alt="Preview"
                          sx={{ width: "100%", maxHeight: 300, mt: 2, objectFit: "contain", borderRadius: 2 }}
                        />
                      )}
                    </Box>
                  </Box>

                  <CardActions sx={{ justifyContent: "flex-end", mt: 3 }}>
                    <Button
                      onClick={() => setShowForm(false)}
                      color="error"
                      sx={{ borderRadius: 2 }}
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      variant="contained"
                      color="secondary"
                      sx={{ borderRadius: 2 }}
                    >
                      Add Product
                    </Button>
                  </CardActions>
                </form>
              )}
            </Formik>
          </Card>
        </Box>
      )}

      {/* Product List */}
      <Box mt={5}>
        <Typography variant={isMobile ? "h6" : "h5"} mb={3} fontWeight="700" textAlign="center">
          All Products
        </Typography>
        {products.length === 0 ? (
          <Typography color="text.secondary" textAlign="center" py={4}>
            No products available.
          </Typography>
        ) : (
          <Box display="grid" gap={3} gridTemplateColumns={{ xs: "1fr", sm: "1fr 1fr", md: "1fr 1fr 1fr" }}>
            {products.map((product, index) => (
              <Card key={index} sx={{ borderRadius: 3, overflow: "hidden", boxShadow: "0px 8px 20px rgba(0,0,0,0.1)" }}>
                {product.image && (
                  <Box component="img" src={product.image} alt={product.name} sx={{ width: "100%", height: 200, objectFit: "contain" }} />
                )}
                <CardContent sx={{ textAlign: "center" }}>
                  <Typography variant="subtitle1" fontWeight="600">{product.name}</Typography>
                  <Typography variant="body2" color="text.secondary">Price: ${product.price}</Typography>
                  <Typography variant="body2" color="text.secondary">{product.description}</Typography>
                </CardContent>
                <Divider />
                <CardActions sx={{ justifyContent: "center", p: 2, gap: 1 }}>
                  <Button variant="outlined" color="error" onClick={() => handleDeleteProduct(index)} sx={{ borderRadius: 2 }}>
                    Delete
                  </Button>
                </CardActions>
              </Card>
            ))}
          </Box>
        )}
      </Box>
    </Box>
  );
};

// Validation
const productSchema = yup.object().shape({
  name: yup.string().required("Required"),
  price: yup.number().required("Required").positive("Must be positive"),
  description: yup.string().required("Required"),
  image: yup.string().nullable(),
});

const initialValues = { name: "", price: "", description: "", image: "" };

export default AdminProductForm;
