// src/components/ContactEmailForm.jsx
import React, { useState } from "react";
import { Box, TextField, Button, Typography, Alert, IconButton, Zoom, useTheme, useMediaQuery } from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import emailjs from "emailjs-com";

const ContactEmailForm = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery("(max-width: 400px)");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [openForm, setOpenForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");
  const [responseType, setResponseType] = useState("success");

  const SERVICE_ID = "service_jwh38si";
  const TEMPLATE_ID = "template_vlbkhhm";
  const USER_ID = "aPjV4dkExrQsHVJLV";

  const handleSend = () => {
    if (!name || !email || !message) return;

    setLoading(true);
    setResponseMessage("");

    const templateParams = { name, email, message };

    emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, USER_ID)
      .then((response) => {
        setResponseMessage("✅ Message sent successfully!");
        setResponseType("success");
        setName("");
        setEmail("");
        setMessage("");
        setOpenForm(false);
      })
      .catch((err) => {
        setResponseMessage("❌ Error sending message. Try again later.");
        setResponseType("error");
      })
      .finally(() => setLoading(false));
  };

  return (
    <>
      {/* Circular Icon */}
      <Box
        sx={{
          position: "fixed",
          bottom: isMobile ? 10 : 20,
          right: isMobile ? 10 : 20,
          zIndex: 9999,
        }}
      >
        <IconButton
          onClick={() => setOpenForm(!openForm)}
          sx={{
            bgcolor: "#FFB300",
            color: "#fff",
            width: isMobile ? 50 : 60,
            height: isMobile ? 50 : 60,
            "&:hover": { bgcolor: "#db9b06ff" },
          }}
        >
          <EmailIcon fontSize={isMobile ? "medium" : "large"} />
        </IconButton>
      </Box>

      {/* Contact Form */}
      <Zoom in={openForm}>
 <Box
  sx={{
    position: "fixed",
    bottom: isMobile ? 60 : 100,     // lower on mobile
    right: isMobile ? 10 : 10,       // small margin on mobile
    height: isMobile ? 300 : 500,   // smaller height on mobile
    width: isMobile ? 280 : 400,    // smaller width on mobile
    p: isMobile ? 1.5 : 4,          // padding adjusts
    borderRadius: 2,
    bgcolor: theme.palette.mode === "dark" ? "#0d001cfc" : "#fff",
    border: "1px solid #ffffff33",
    boxShadow: "0px 4px 15px rgba(0,0,0,0.3)",
    display: "flex",
    flexDirection: "column",
    gap: isMobile ? 1.5 : 3,
    zIndex: 9998,
    transition: "all 0.3s ease",     // smooth resizing
  }}
>

          <Typography
            variant={isMobile ? "h5" : "h3"}
            mb={1}
            sx={{ color: theme.palette.mode === "dark" ? "#fff" : "inherit" }}
          >
            Contact Us
          </Typography>

          <TextField
            size={isMobile ? "small" : "medium"}
            label="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            size={isMobile ? "small" : "medium"}
            label="Your Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            size={isMobile ? "small" : "medium"}
            label="Message"
            multiline
            rows={isMobile ? 2 : 3}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />

          <Button
            variant="contained"
            color="secondary"
            onClick={handleSend}
            disabled={loading}
            sx={{ fontSize: isMobile ? "0.75rem" : "1rem" }}
          >
            {loading ? "Sending..." : "Send"}
          </Button>

          {responseMessage && (
            <Alert severity={responseType} sx={{ mt: 1, fontSize: isMobile ? "0.75rem" : "inherit" }}>
              {responseMessage}
            </Alert>
          )}
        </Box>
      </Zoom>
    </>
  );
};

export default ContactEmailForm;
