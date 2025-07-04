import React from 'react';
import {
  Box,
  Typography,
  Link,
} from "@mui/material";

import BikeMap from '../../components/BikeMap';

// Main Component
const PeopleFlow: React.FC = () => {

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
          sx={{ mt: 6, mb: 6, color: "black", fontSize: "1.25rem", lineHeight: 1.6 }}
        >
        We encourage you to make the most of your time in Helsinki by choosing sustainable ways to get around. If you enjoy cycling, check out the live HSL bike map here:
        </Typography>
        <BikeMap />
        <Typography
          variant="body1"
          sx={{ mt: 6, mb: 6, color: "black", fontSize: "1.25rem", lineHeight: 1.6 }}
        >
          The{" "}
          <Link
            href="https://megasense-server.cs.helsinki.fi/conference/"
            target="_blank"
            rel="noopener noreferrer"
            underline="hover" 
            sx={{ fontWeight: 'bold', color: 'primary.main', textDecoration: 'none' }}
          >
            web app
          </Link>{" "}
          created by the Untangling People Flow team is designed to enhance conference experiences with seamless interaction. Meanwhile, the{" "}
          <Link
            href="https://untanglingpeopleflow.com/"
            target="_blank"
            rel="noopener noreferrer"
            underline="hover" 
            sx={{ fontWeight: 'bold', color: 'primary.main', textDecoration: 'none' }}
          >
            Untangling People Flow consortium
          </Link>{" "}
          is dedicated to optimising people flow detection and improving environmental conditions. This collaborative effort supports Finnish business growth and promotes global sustainability with AI-driven forecasts. You may have experienced our innovations at Helsinki-Vantaa airport, and we encourage you to explore our other testbeds. Additionally, our AI planners help reduce food waste by optimizing menu choices for large organizations.​
        </Typography>
    
      </Box>
           <Typography
          variant="body1"
          sx={{ mb: 6, color: "black", fontSize: "1.25rem", lineHeight: 1.6 }}
        >
        This web link runs on the MegaSense Research platform. MegaSense Oy is a University of Helsinki spinout pioneering environmental sensing and high-resolution analytics for cities and the built environment.{" "}
        <Link href="https://megasense.com" target="_blank" rel="noopener" underline="hover" sx={{ fontWeight: 'bold', color: 'primary.main', textDecoration: 'none' }}>
          Stay connected with us!
        </Link>
      </Typography>
    </Box>
  );
};

export default PeopleFlow;
