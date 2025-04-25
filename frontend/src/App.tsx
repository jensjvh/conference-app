import React, { useEffect, useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { MapInteractionCSS } from "react-map-interaction";
import axios from "axios";
import MenuIcon from "@mui/icons-material/Menu";

import {
  AppBar,
  Toolbar,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Container,
  Button,
  TextField,
  Box,
  Tabs,
  Tab,
  Grid,
  Card,
  CardContent,
  CardActions,
  Link,
} from "@mui/material";
import "./App.css";

// Add declaration for react-map-interaction to fix TypeScript error
declare module "react-map-interaction";

interface ContentProps {
  title: string;
  link: string;
  description: string;
}

interface CardTextProps {
  content: ContentProps;
}

const theme = createTheme({
  palette: {
    primary: {
      main: "#00629B",
    },
    secondary: {
      main: "#ffffff",
    },
  },
});

const CardText = (props: CardTextProps) => (
  <React.Fragment>
    <CardContent>
      <Typography gutterBottom sx={{ color: "text.secondary", fontSize: 14 }}>
        {props.content.title}
      </Typography>
      <Typography variant="h6" component="div">
        {props.content.link}
      </Typography>
      <Typography variant="body2">{props.content.description}</Typography>
    </CardContent>
    <CardActions>
      <Button size="small">Learn More</Button>
    </CardActions>
  </React.Fragment>
);

const ConferenceMap = () => {
  return (
    <MapInteractionCSS>
      <img src="/floor_1.png" alt="Conference Map for Main Building Floor 1" />
    </MapInteractionCSS>
  );
};

const UsefulLinks = () => {
  const text_content_hsl: ContentProps = {
    title: "Public transport",
    link: "https://www.hsl.fi/en",
    description: "Helsinki Public Transport",
  };

  const text_content_my_helsinki: ContentProps = {
    title: "MyHelsinki - Visit",
    link: "https://www.myhelsinki.fi/visit/",
    description: "Visiting Helsinki",
  };

  return (
    <React.Fragment>
      <Typography variant="h2" component="div">
        Find out more about Helsinki!
      </Typography>
      <Grid container spacing={2}>
        <Grid size={6}>
          <Link href={text_content_hsl.link} target="_blank" rel="noopener">
            <Card variant="outlined">
              <CardText content={text_content_hsl} />
            </Card>
          </Link>
        </Grid>
        <Grid size={6}>
          <Link
            href={text_content_my_helsinki.link}
            target="_blank"
            rel="noopener"
          >
            <Card variant="outlined">
              <CardText content={text_content_my_helsinki} />
            </Card>
          </Link>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

// Cloud 2024 sessions data
const cloudSessions = [
  {
    title: "CLOUD 1: Cloud and AI I",
    time: "14:00 – 15:10",
    location: "Espana I",
    chair: "Pranjal Gupta, IBM",
    presentations: [
      {
        title: "Opening Remarks from the CLOUD Chairs",
        speakers:
          "Tevfik Kosar, Krishnan Venkateswaran, Shangguang Wang, Seetharami Seelam, Santonu Sarkar, Xuanzhe Liu",
      },
      {
        title:
          "Fed2PKD: Bridging Model Diversity in Federated Learning via Two-Pronged Knowledge Distillation",
        speakers:
          "Zaipeng Xie, Han Xu, Xing Gao, Junchen Jiang and Ruiqian Han",
      },
      {
        title: "Resource Efficient Bayesian Optimization",
        speakers:
          "Namit Juneja, Varun Chandola, Jaroslaw Zola, Olga Wodo and Parth Desai",
      },
      {
        title:
          "Improving Federated Learning through Low-Entropy Client Sampling Based on Learned High-Level Features",
        speakers: "Waqwoya Abebe, Pablo Munoz and Ali Jannesari",
      },
    ],
  },
  {
    title: "CLOUD 2: Cloud-based Applications",
    time: "15:40 – 16:50",
    location: "Espana I",
    chair: "Zaipeng Xie, Hohai University",
    presentations: [
      {
        title:
          "Intent-Driven Multi-Engine Observability Dataflows For Heterogeneous Geo-Distributed Clouds",
        speakers:
          "Aishwariya Chakraborty, Anand Eswaran, Pankaj Thorat, Mudit Verma, Pranjal Gupta and Praveen Jayachandran",
      },
      {
        title:
          "ArcaDB: A Disaggregated Query Engine for Heterogenous Computational Environments",
        speakers: "Kristalys Ruiz Rohena and Manuel Rodriguez Martinez",
      },
      {
        title:
          "TraceMesh: Scalable and Streaming Sampling for Distributed Traces",
        speakers:
          "Zhuangbin Chen, Zhihan Jiang, Yuxin Su, Michael R. Lyu and Zibin Zheng",
      },
      {
        title:
          "Predictive Placement of Geo-distributed Blockchain Nodes for Performance Guarantee",
        speakers: "Junseok Lee, Yeonho Yoo, Chuck Yoo and Gyeongsik Yang",
      },
    ],
  },
  {
    title: "CLOUD 3: Cloud Service Delivery I",
    time: "17:00 – 18:10",
    location: "Espana I",
    chair: "Zhuangbin Chen, Sun Yat-sen University",
    presentations: [
      {
        title:
          "Dynamic Workflow Scheduling in the Edge-Cloud Continuum: Optimizing Runtimes under Budget Constraints",
        speakers: "Stefan Pedratscher, Thomas Fahringer and Juan Aznar Poveda",
      },
      {
        title:
          "FastMig: Leveraging FastFreeze to Establish Robust Service Liquidity in Cloud 2.0",
        speakers:
          "Sorawit Manatura, Thanawat Chanikaphon, Chantana Chantrapornchai and Salehi Mohsen Amini",
      },
      {
        title:
          "Telemetry-Driven Microservices Orchestration in Cloud-Edge Environments",
        speakers: "Angelo Marchese and Orazio Tomarchio",
      },
      {
        title:
          "Rethinking Application Container Networking in a Multi-cluster world",
        speakers:
          "Chander Govindarajan, Priyanka Naik, Kavya Govindarajan and Seep Goel",
      },
    ],
  },
];

const App = () => {
  const [activeTab, setActiveTab] = useState<string>("conference");
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const [conferenceData, setConferenceData] = useState<any>(null);

  useEffect(() => {
    const mockData = {
      schedule: [
        { time: "9:00 AM", event: "Registration", speaker: "" },
        {
          time: "10:00 AM",
          event: "Opening Ceremony",
          speaker: "Conference Chair",
        },
        {
          time: "11:00 AM",
          event: "Keynote: Future of AI",
          speaker: "Dr. Jane Smith",
        },
      ],
    };

    setConferenceData(mockData);

    axios
      .get("/api/conference")
      .then((response) => setConferenceData(response.data))
      .catch((error) => console.error("Error fetching conference data", error));
  }, []);

  const ConferenceInfo = () => {
    return (
      <Typography variant="body1" component="p">
        <Button
          onClick={() => {
            setActiveTab("links");
          }}
          variant="outlined"
        >
          Useful links for visiting Helsinki!
        </Button>
      </Typography>
    );
  };

  const renderContent = () => {
    switch (activeTab) {
      case "conference":
        return (
          <Box>
            <Typography variant="h4" gutterBottom>
              IEEE Services 2025
            </Typography>
            <Box sx={{ mb: 4 }}>{ConferenceInfo()}</Box>
            <Box sx={{ mb: 4 }}>
              <Typography
                variant="h5"
                sx={{ color: theme.palette.primary.main, mb: 2 }}
              >
                IEEE CLOUD 2024
              </Typography>
              <Typography variant="body1" component="p">
                The IEEE International Conference on Cloud Computing (CLOUD) has
                been a premier international forum for researchers and industry
                practitioners to exchange latest fundamental advances in the
                state of the art and practice of cloud computing. All topics
                related to cloud computing, including emerging research areas,
                align with the theme of CLOUD. In 2024, we will gather to
                further advance this international professional forum on cloud
                computing.
              </Typography>
              <Typography variant="body1" component="p">
                IEEE CLOUD is the flagship conference focusing on innovative
                cloud computing across all "Everything as a service" paradigms
                (XaaS). This includes modeling, designing, developing,
                publishing, monitoring, managing, operating, delivering, and
                scaling XaaS offerings from the cloud to the edge. The
                conference is a prime international forum for researchers,
                academics, businesses, industry, and standard bodies to exchange
                the latest fundamental advances in the state of the art and
                practice of cloud computing, identify emerging research topics,
                and define the future of cloud computing.
              </Typography>
            </Box>
          </Box>
        );
      case "cloud":
        return (
          <Box>
            <Typography variant="h4" gutterBottom>
              Cloud 2024 Technical Program
            </Typography>

            {cloudSessions.map((session, idx) => (
              <Box key={idx} sx={{ mb: 4 }}>
                <Typography
                  variant="h5"
                  sx={{ color: theme.palette.primary.main, mb: 1 }}
                >
                  {session.title}
                </Typography>
                <Typography variant="body2" sx={{ mb: 0.5 }}>
                  <strong>Time:</strong> {session.time}
                </Typography>
                <Typography variant="body2" sx={{ mb: 0.5 }}>
                  <strong>Location:</strong> {session.location}
                </Typography>
                <Typography variant="body2" sx={{ mb: 2 }}>
                  <strong>Session Chair:</strong> {session.chair}
                </Typography>

                <Box
                  sx={{
                    pl: 2,
                    borderLeft: `3px solid ${theme.palette.primary.main}`,
                  }}
                >
                  {session.presentations.map((presentation, pIdx) => (
                    <Box key={pIdx} sx={{ mb: 2 }}>
                      <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                        {presentation.title}
                      </Typography>
                      <Typography variant="body2" sx={{ fontStyle: "italic" }}>
                        {presentation.speakers}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </Box>
            ))}
          </Box>
        );

      case "links":
        return <Box>{UsefulLinks()}</Box>;

      case "map":
        return (
          <Box>
            <ConferenceMap />
          </Box>
        );
      case "feedback":
        return (
          <Box>
            <Typography variant="h4" gutterBottom>
              Conference Survey
            </Typography>
            <form>
              <Box sx={{ mb: 4 }}>
                <Typography variant="h6" gutterBottom>
                  1. How would you rate the quality of the conference?
                </Typography>
                <Box sx={{ display: "flex", flexDirection: "row", gap: 2 }}>
                  {[1, 2, 3, 4, 5].map((rating) => (
                    <Button
                      key={rating}
                      variant="outlined"
                      sx={{
                        minWidth: "48px",
                        height: "48px",
                        borderRadius: "50%",
                        borderColor: theme.palette.primary.main,
                        color: theme.palette.primary.main,
                        "&:hover": {
                          backgroundColor: theme.palette.primary.main,
                          color: "white",
                        },
                      }}
                    >
                      {rating}
                    </Button>
                  ))}
                </Box>
                <Typography
                  variant="caption"
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    width: "272px",
                    mt: 1,
                  }}
                >
                  <span>Poor</span>
                  <span>Excellent</span>
                </Typography>
              </Box>

              <Box sx={{ mb: 4 }}>
                <Typography variant="h6" gutterBottom>
                  2. Which session was most valuable to you?
                </Typography>
                <TextField
                  select
                  fullWidth
                  variant="outlined"
                  slotProps={{
                    select: { native: true },
                  }}
                >
                  <option value="">Please select an option</option>
                  <option value="cloud1">CLOUD 1: Cloud and AI I</option>
                  <option value="cloud2">
                    CLOUD 2: Cloud-based Applications
                  </option>
                  <option value="cloud3">
                    CLOUD 3: Cloud Service Delivery I
                  </option>
                  <option value="keynote">Keynote: Future of AI</option>
                </TextField>
              </Box>

              <Box sx={{ mb: 4 }}>
                <Typography variant="h6" gutterBottom>
                  3. Suggestions for future?
                </Typography>
                <TextField
                  variant="outlined"
                  fullWidth
                  multiline
                  rows={4}
                  placeholder="Suggestion here"
                />
              </Box>

              <Button
                variant="contained"
                color="primary"
                type="submit"
                size="large"
                sx={{ mt: 2 }}
              >
                Submit Survey
              </Button>
            </form>
          </Box>
        );
      default:
        return null;
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <div>
        {/* AppBar */}
        <AppBar position="fixed" color="primary">
          <Toolbar>
            <Button
              color="secondary"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            >
              <MenuIcon />
            </Button>
            <Typography
              variant="h6"
              style={{ flexGrow: 1, color: theme.palette.secondary.main }}
              align="left"
            >
              IEEE Services 2025
            </Typography>
            <Tabs
              value={activeTab}
              onChange={(_, newValue) => setActiveTab(newValue)}
              textColor="secondary"
              sx={{ display: { xs: "none", sm: "flex" } }}
            >
              <Tab value="conference" label="Conference" />
              <Tab value="cloud" label="Cloud 2024" />
              <Tab value="map" label="Map" />
              <Tab value="links" label="Links" />
            </Tabs>
          </Toolbar>
        </AppBar>

        {/* Sidebar Drawer */}
        <Drawer
          anchor="left"
          open={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        >
          <List sx={{ width: 240 }}>
            <ListItem
              onClick={() => {
                setActiveTab("conference");
                setIsSidebarOpen(false);
              }}
            >
              <ListItemText primary="Conference Info" />
            </ListItem>
            <ListItem
              onClick={() => {
                setActiveTab("links");
                setIsSidebarOpen(false);
              }}
            >
              <ListItemText primary="Helsinki" />
            </ListItem>
            <ListItem
              onClick={() => {
                setActiveTab("cloud");
                setIsSidebarOpen(false);
              }}
            >
              <ListItemText primary="Cloud 2024 Technical Program" />
            </ListItem>
            <ListItem
              onClick={() => {
                setActiveTab("map");
                setIsSidebarOpen(false);
              }}
            >
              <ListItemText primary="Map" />
            </ListItem>
            <ListItem
              onClick={() => {
                setActiveTab("feedback");
                setIsSidebarOpen(false);
              }}
            >
              <ListItemText primary="Feedback" />
            </ListItem>
          </List>
        </Drawer>

        {/* Main Content */}
        <Container style={{ marginTop: "5rem", paddingBottom: "2rem" }}>
          {renderContent()}
        </Container>
      </div>
    </ThemeProvider>
  );
};

export default App;
