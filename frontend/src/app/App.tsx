import { useNavigate } from "react-router";
import React from "react";
import { Button, Box, Typography } from "@mui/material";
import "./App.css";

function App() {
  const navigate = useNavigate();

  const ConferenceButtons = () => {
    return (
      <React.Fragment>
        <Typography variant="body1" component="p">
          <Button
            onClick={() => navigate("/schedule")}
            variant="outlined"
            style={{
              maxWidth: "100px",
              maxHeight: "60px",
              minWidth: "80px",
              minHeight: "60px",
            }}
          >
            Schedule
          </Button>
        </Typography>
        <Typography variant="body1" component="p">
          <Button
            onClick={() => navigate("/map")}
            variant="outlined"
            style={{
              maxWidth: "100px",
              maxHeight: "60px",
              minWidth: "80px",
              minHeight: "60px",
            }}
          >
            Conference map
          </Button>
        </Typography>
        <Typography variant="body1" component="p">
          <Button
            onClick={() => navigate("/links")}
            variant="outlined"
            style={{
              maxWidth: "100px",
              maxHeight: "60px",
              minWidth: "80px",
              minHeight: "60px",
            }}
          >
            Visiting Helsinki
          </Button>
        </Typography>
      </React.Fragment>
    );
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        IEEE Services 2025
      </Typography>
      <Box sx={{ mb: 2, display: "flex", justifyContent: "center", gap: 1 }}>
        {ConferenceButtons()}
      </Box>
      <Box sx={{ mb: 4 }}>
        <Typography variant="body1" component="p">
          The 2025 IEEE World Congress on SERVICES (SERVICES 2025) is solely
          sponsored by the IEEE Computer Society under the auspice of the
          Technical Community on Services Computing (TCSVC). With six theme
          conferences, the scope of SERVICES 2025 covers all aspects of services
          computing and applications, current or emerging.
        </Typography>
        <Typography variant="body1" component="p">
          Centered around services computing, SERVICES 2025 covers various
          systems and networking research pertaining to cloud, edge and
          Internet-of Things (IoT), as well as technologies for intelligent
          computing, learning, Big Data and blockchain applications, addressing
          critical issues such as knowledge network, high performance, security,
          privacy, dependability, trustworthiness, and cost-effectiveness.
        </Typography>
        <Typography variant="body1" component="p">
          In addition to co-located theme-topic conferences, the Congress will
          also include symposia and workshops supporting deep-dive discussions
          on emerging important topics, and complement the SERVICES 2025 program
          with industry and application presentations and panels.
        </Typography>
        <Typography variant="body1" component="p">
          Authors are invited to prepare early and submit original papers to any
          of these conferences at www.easychair.org. All submitted manuscripts
          will be peer-reviewed by at least three reviewers. Accepted and
          presented papers will appear in the conference proceedings published
          by the IEEE Computer Society Press.
        </Typography>
        <Typography variant="body1" component="p">
          SERVICES 2025 is the only premier professional event for the services
          computing field offered by IEEE.
        </Typography>
      </Box>
    </Box>
  );
}

export default App;
