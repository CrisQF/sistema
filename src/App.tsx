import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Box } from "@mui/material";
import Header from "./components/Header";
import Dashboard from "./components/Dashboard";
import Puestos from "./components/Puestos";

const App: React.FC = () => {
  const [open, setOpen] = useState(false);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <Router>
      <Box
        sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
      >
        <Header open={open} toggleDrawer={toggleDrawer} />
        <Box
          sx={{
            flexGrow: 1,
            p: 3,
            transition: "margin-left 0.3s",
            marginLeft: open ? "240px" : "64px",
          }}
        >
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/puestos" element={<Puestos />} />
          </Routes>
        </Box>
      </Box>
    </Router>
  );
};

export default App;
