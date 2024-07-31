import React from "react";
import { Box, Typography, Button } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import SchoolIcon from "@mui/icons-material/School";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import GroupIcon from "@mui/icons-material/Group";

const Dashboard: React.FC = () => {
  return (
    <Box
      sx={{
        flexGrow: 1,
        p: 3,
        pt: 10,
        backgroundColor: "#f0f0f0",
        minHeight: "50vh",
        display: "flex",
        flexDirection: "column",
        gap: 3,
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 3,
        }}
      >
        {[
          {
            backgroundColor: "#800080",
            icon: <SchoolIcon />,
            title: "Contratos Registrados",
            value: 4,
          },
          {
            backgroundColor: "#008000",
            icon: <MonetizationOnIcon />,
            title: "Today's Collection",
            value: "₹185358",
          },
          {
            backgroundColor: "#FFFF00",
            icon: <PersonAddIcon />,
            title: "New Admissions",
            value: 5464,
          },
          {
            backgroundColor: "#FF0000",
            icon: <GroupIcon />,
            title: "Faculty Strength",
            value: 723,
          },
        ].map((card, index) => (
          <Box
            key={index}
            sx={{
              backgroundColor: card.backgroundColor,
              color: "#FFFFFF",
              padding: "1rem",
              borderRadius: "8px",
              textAlign: "center",
              position: "relative",
              flex: "1 1 300px",
              minWidth: "300px",
              maxWidth: "100%",
              boxSizing: "border-box",
            }}
          >
            <Typography
              variant="h6"
              sx={{ position: "absolute", top: "10px", left: "10px" }}
            >
              {card.value}
            </Typography>
            {React.cloneElement(card.icon, {
              sx: {
                position: "absolute",
                top: "10px",
                right: "10px",
                fontSize: "40px",
                opacity: 0.3,
              },
            })}
            <Typography variant="subtitle1" sx={{ mt: "50px" }}>
              {card.title}
            </Typography>
            <Button
              variant="contained"
              endIcon={<ArrowForwardIcon />}
              sx={{
                mt: 2,
                backgroundColor: "rgba(255, 255, 255, 0.3)",
                color: "#FFFFFF",
              }}
            >
              Ver Más
            </Button>
          </Box>
        ))}
      </Box>
      <Box
        sx={{
          backgroundColor: "#FFFFFF",
          padding: "2rem",
          borderRadius: "8px",
          width: "100%",
        }}
      >
        <Typography variant="h5" sx={{ mb: 2, fontWeight: "bold" }}>
          Bienvenido al Sistema de Control de Pagos de Socios
        </Typography>
        <Typography variant="body1">--</Typography>
      </Box>
    </Box>
  );
};

export default Dashboard;
