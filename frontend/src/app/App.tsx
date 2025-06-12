import { useNavigate } from "react-router";
import React from "react";
import { Button, Box, Typography } from "@mui/material";
import "./App.css";
import 'leaflet/dist/leaflet.css';

function App() {
  const navigate = useNavigate();

  const ConferenceButtons = () => {
    return (
      <React.Fragment>
        <Typography variant="body1" component="p" className="mb-6">
          <Button
            onClick={() => navigate("/program")}
            variant="contained"
            size="large"
          >
            Program
          </Button>
        </Typography>
        <Typography variant="body1" component="p" className="mb-6">
          <Button
            onClick={() => navigate("/breaks")}
            variant="contained"
            size="large"
          >
            Lunch & Coffee
          </Button>
        </Typography>
        <Typography variant="body1" component="p" className="mb-6">
          <Button
            onClick={() => navigate("/map")}
            variant="contained"
            size="large"
          >
            Map
          </Button>
        </Typography>
        <Typography variant="body1" component="p" className="mb-6">
        <Button
        onClick={() => navigate("/links")}
        variant="contained"
        size="large"
        >
        Visiting Helsinki
      </Button>


        </Typography>
      </React.Fragment>
    );
  };

  return (
    <Box className="pb-8 min-h-screen" sx={{bgcolor: '#f9fafb'}}>
            <img
          src="/img/people.jpg"
          alt="Technology conference"
          style={{ maxWidth: "100%", height: "auto" }}
        />
      <Typography
            variant="h3"
            sx={{ fontWeight: 'bold', pt: 4 }}
            >
        IEEE Services 2025
      </Typography>
      <Box className="pt-8 pb-8 mb-8 flex flex-col gap-6 sm:flex-row sm:justify-center">
        {ConferenceButtons()}
      </Box>
      <Box className="p-8 bg-white">
        <Typography
          variant="body1"
          component="p"
          className="text-lg mb-6 leading-relaxed"
          sx={{
            fontSize: "1.125rem",
            mb: 2,
            lineHeight: 1.6,
            textAlign: "left",
          }}
        >
          The 2025 IEEE World Congress on SERVICES (SERVICES 2025) is solely
          sponsored by the IEEE Computer Society under the auspice of the
          Technical Community on Services Computing (TCSVC). With six theme
          conferences, the scope of SERVICES 2025 covers all aspects of services
          computing and applications, current or emerging.
        </Typography>
        <Typography
          variant="body1"
          component="p"
          className="text-lg mb-6 leading-relaxed"
          sx={{
            fontSize: "1.125rem",
            mb: 2,
            lineHeight: 1.6,
            textAlign: "left",
          }}
        >
          Centered around services computing, SERVICES 2025 covers various
          systems and networking research pertaining to cloud, edge and
          Internet-of Things (IoT), as well as technologies for intelligent
          computing, learning, Big Data and blockchain applications, addressing
          critical issues such as knowledge network, high performance, security,
          privacy, dependability, trustworthiness, and cost-effectiveness.
        </Typography>
        <Typography
          variant="body1"
          component="p"
          className="text-lg mb-6 leading-relaxed"
          sx={{
            fontSize: "1.125rem",
            mb: 2,
            lineHeight: 1.6,
            textAlign: "left",
          }}
        >
          In addition to co-located theme-topic conferences, the Congress will
          also include symposia and workshops supporting deep-dive discussions
          on emerging important topics, and complement the SERVICES 2025 program
          with industry and application presentations and panels.
        </Typography>
        <Typography
          variant="body1"
          component="p"
          className="text-lg mb-6 leading-relaxed"
          sx={{
            fontSize: "1.125rem",
            mb: 2,
            lineHeight: 1.6,
            textAlign: "left",
          }}
        >
          Authors are invited to prepare early and submit original papers to any
          of these conferences at www.easychair.org. All submitted manuscripts
          will be peer-reviewed by at least three reviewers. Accepted and
          presented papers will appear in the conference proceedings published
          by the IEEE Computer Society Press.
        </Typography>
        <Typography
          variant="body1"
          component="p"
          className="text-lg mb-6 leading-relaxed"
          sx={{
            fontSize: "1.125rem",
            mb: 2,
            lineHeight: 1.6,
            textAlign: "left",
          }}
        >
          SERVICES 2025 is the only premier professional event for the services
          computing field offered by IEEE.
        </Typography>
        </Box>
    </Box>
  );
}

export default App;
