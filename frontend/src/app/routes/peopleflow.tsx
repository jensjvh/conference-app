import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  useTheme,
  useMediaQuery,
  Link,
} from "@mui/material";

// Main Component
const PeopleFlow: React.FC = () => {
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Box sx={{ p: 4, bgcolor: '#f9fafb', minHeight: '100vh', padding:'1em' }}>
      <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 4, textAlign: 'center' }}>
        People Flow
      </Typography>

      <Box
        component="img"
        src={import.meta.env.BASE_URL + "img/peopleflow.jpg"}
        alt="People Flow"
        sx={{
          width: '100%',
          height: 'auto',
          objectFit: 'cover',
          display: 'block',
        }}
      />

      <Box sx={{ textAlign: 'center', mt: 2, mb: 6 }}>
        <Typography
          variant="body1"
          sx={{ mb: 6, color: "black", fontSize: "1.25rem", lineHeight: 1.6 }}
        >
          The{" "}
          <Link
            href="https://megasense-server.cs.helsinki.fi/conference/"
            target="_blank"
            rel="noopener noreferrer"
            sx={{ fontWeight: 'bold', color: 'primary.main', textDecoration: 'underline' }}
          >
            web app
          </Link>{" "}
          created by the Untangling People Flow team is designed to enhance conference experiences with seamless interaction. Meanwhile, the{" "}
          <Link
            href="https://untanglingpeopleflow.com/"
            target="_blank"
            rel="noopener noreferrer"
            sx={{ fontWeight: 'bold', color: 'primary.main', textDecoration: 'underline' }}
          >
            Untangling People Flow consortium
          </Link>{" "}
          is dedicated to optimising people flow detection and improving environmental conditions. This collaborative effort supports Finnish business growth and promotes global sustainability with AI-driven forecasts. You may have experienced our innovations at Helsinki-Vantaa airport, and we encourage you to explore our other testbeds. Additionally, our AI planners help reduce food waste by optimizing menu choices for large organizations.​
        </Typography>
      </Box>
    </Box>
  );
};

export default PeopleFlow;
