import { Box, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";

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

function Schedule() {
  const theme = useTheme();
  return (
    <Box>
      <Typography
            variant="h4"
            sx={{ fontWeight: 'bold', pb: 4 }}
            >
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
}

export default Schedule;
