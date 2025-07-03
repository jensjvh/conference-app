import React from 'react';
import {
  Box,
  Typography,
  Link,
} from "@mui/material";

const Awardsgallery: React.FC = () => {
  return (
    <Box sx={{ p: 4, bgcolor: '#f9fafb', minHeight: '100vh', padding: '1em' }}>
      <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 4, textAlign: 'center' }}>
        Services 2025 Awards
      </Typography>

      <Box
        component="img"
        src={import.meta.env.BASE_URL + "img/award.jpg"}
        alt="Awards"
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
          sx={{ mb: 4, color: "black", fontSize: "1.25rem", lineHeight: 1.6 }}
        >
             <Link
            href="https://services.conferences.computer.org/2025/awards/"
            target="_blank"
            rel="noopener noreferrer"
            underline="hover" 
            sx={{ fontWeight: 'bold', color: 'primary.main', textDecoration: 'none' }}
          >Congratulations to the IEEE Services 2025 Award Winners!</Link> Honoring this year’s Best Paper, Best Student Paper, and TVSVC awardees for excellence in leadership, innovation, and service in services computing. Special recognition to WISC 2025 Scholarship recipients: Wigne Gram Sand (Aarhus University), Soha Galalaldin Ahmed (UAE University), Yara Kouttane & Ilham Nait Him (Al Akhawayn University). Your work is shaping the future of global research and innovation.
        </Typography>

 
        <Typography
          variant="h5"
          sx={{ fontWeight: 'bold', mb: 2, mt: 6, color: 'text.primary' }}
        >
          Share Your IEEE Services 2025 Highlights
        </Typography>

        <Typography
          variant="body1"
          sx={{ mb: 2, color: "black", fontSize: "1.25rem", lineHeight: 1.6 }}
        >
          Make IEEE Services 2025 unforgettable by capturing and sharing your best moments through photos and videos. Whether it’s a keynote or a workshop, your shared content can enrich the event for everyone. Use your phone to document key sessions, engage on social media with the event hashtag, and compile your top clips into a short video for your network. Remember to respect privacy and ask for permission before sharing images of others.
        </Typography>

    
        <Typography
          variant="body1"
          sx={{ mb: 6, color: "black", fontSize: "1.25rem", lineHeight: `1.2` }}
        >
          <Link
            href="https://drive.google.com/drive/folders/1SFfaGLIYB4j9DCgSWtluZoQJPAOGIoqh?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            underline="hover" 
            sx={{ fontWeight: 'bold', color: 'primary.main', textDecoration: 'none' }}
          >
            Google Drive Folder
          </Link>
        </Typography>

      </Box>
    </Box>
  );
};

export default Awardsgallery;
