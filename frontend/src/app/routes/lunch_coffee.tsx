import { Box, Typography, Divider } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import CoffeeIcon from '@mui/icons-material/Coffee';
import RestaurantIcon from '@mui/icons-material/Restaurant';

const breakSchedule = [
  {
    day: "Day 1 - Monday, July 7",
    breaks: [
      {
        type: "coffee",
        time: "09:10 - 09:25",
        location: "Main Hall",
        description: "Coffee Break"
      },
      {
        type: "coffee",
        time: "10:35 - 10:50",
        location: "Main Hall",
        description: "Coffee Break"
      },
      {
        type: "lunch",
        time: "12:00 - 14:00",
        location: "Conference Venue",
        description: "Lunch Break"
      },
      {
        type: "coffee",
        time: "15:10 - 15:25",
        location: "Main Hall",
        description: "Coffee Break"
      },
      {
        type: "coffee",
        time: "16:35 - 16:50",
        location: "Main Hall",
        description: "Coffee Break"
      }
    ]
  },
  {
    day: "Day 2 - Tuesday, July 8",
    breaks: [
      {
        type: "coffee",
        time: "10:35 - 10:50",
        location: "Main Hall",
        description: "Coffee Break"
      },
      {
        type: "lunch",
        time: "12:00 - 14:00",
        location: "Conference Venue",
        description: "Lunch Break"
      },
      {
        type: "coffee",
        time: "15:10 - 15:25",
        location: "Main Hall",
        description: "Coffee Break"
      },
      {
        type: "coffee",
        time: "16:35 - 16:50",
        location: "Main Hall",
        description: "Coffee Break"
      }
    ]
  },
  {
    day: "Day 3 - Wednesday, July 9",
    breaks: [
      {
        type: "coffee",
        time: "9:10 - 9:25",
        location: "Main Hall",
        description: "Coffee Break"
      },
      {
        type: "coffee",
        time: "10:35 - 10:50",
        location: "Main Hall",
        description: "Coffee Break"
      },
      {
        type: "lunch",
        time: "12:00 - 14:00",
        location: "Dining Hall", 
        description: "Lunch Break"
      },
      {
        type: "coffee",
        time: "15:10 - 15:25",
        location: "Main Hall",
        description: "Coffee Break"
      },
      {
        type: "coffee",
        time: "16:35 - 16:50",
        location: "Main Hall",
        description: "Coffee Break"
      },
    ]
  },
  {
    day: "Day 4 - Thursday, July 10",
    breaks: [
      {
        type: "coffee",
        time: "09:10 - 09:25",
        location: "Main Hall",
        description: "Coffee Break"
      },
      {
        type: "coffee",
        time: "10:35 - 10:50",
        location: "Main Hall",
        description: "Coffee Break"
      },
      {
        type: "lunch",
        time: "12:00 - 14:00",
        location: "Conference Venue", 
        description: "Lunch Break"
      },
      {
        type: "coffee",
        time: "15:10 - 15:25",
        location: "Main Hall",
        description: "Coffee Break"
      },
    ]
  },
  {
    day: "Day 5 - Friday, July 11",
    breaks: [
      {
        type: "coffee",
        time: "09:10 - 09:25",
        location: "Main Hall",
        description: "Coffee Break"
      },
      {
        type: "coffee",
        time: "10:35 - 10:50",
        location: "Main Hall",
        description: "Coffee Break"
      },
      {
        type: "lunch",
        time: "12:00 - 14:00",
        location: "Conference Venue", 
        description: "Lunch Break"
      },
      {
        type: "coffee",
        time: "15:10 - 15:25",
        location: "Main Hall",
        description: "Coffee Break"
      },
      {
        type: "coffee",
        time: "16:35 - 16:50",
        location: "Main Hall",
        description: "Coffee Break"
      }
    ]
  },
  {
    day: "Day 6 - Saturday, July 12",
    breaks: [
      {
        type: "coffee",
        time: "09:10 - 09:25",
        location: "Main Hall",
        description: "Coffee Break"
      },
      {
        type: "coffee",
        time: "10:35 - 10:50",
        location: "Main Hall",
        description: "Coffee Break"
      },
      {
        type: "lunch",
        time: "12:30 - 14:00",
        location: "Conference Venue", 
        description: "Lunch Break"
      }
    ]
  }
];

function Breaks() {
  const theme = useTheme();
  
  const getBreakIcon = (type: string) => {
    return type === "coffee" ? 
      <CoffeeIcon sx={{ mr: 1, color: theme.palette.primary.main }} /> : 
      <RestaurantIcon sx={{ mr: 1, color: theme.palette.primary.main }} />;
  };
  
  return (
    <Box>
      <Typography
        variant="h4"
        component="h1"
        sx={{ fontWeight: 'bold', pb: 4 }}
      >
        Coffee & Lunch Breaks
      </Typography>

      {breakSchedule.map((daySchedule, dayIdx) => (
        <Box key={dayIdx} sx={{ mb: 5, justifyContent: "center" }}>
          <Typography
            variant="h5"
            component="h2"
            sx={{ color: theme.palette.primary.main, mb: 2 }}
          >
            {daySchedule.day}
          </Typography>
          
          <Divider sx={{ mb: 2 }} />
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            {daySchedule.breaks.map((breakItem, breakIdx) => (
              <Box 
                key={breakIdx} 
                sx={{ 
                  mb: 3,
                  p: 2,
                  width: 0.75,
                  borderRadius: 1,
                  backgroundColor: breakItem.type === 'coffee' ? 
                    'rgba(0, 98, 155, 0.05)' : 'rgba(0, 98, 155, 0.1)',
                  display: 'flex',
                  alignItems: 'flex-start',
                    justifyContent: 'center'
                }}
              >
                {getBreakIcon(breakItem.type)}
                
                <Box>
                  <Typography variant="h6" component="h3" sx={{ mb: 0.5 }}>
                    {breakItem.type === 'coffee' ? 'Coffee Break' : 'Lunch Break'}
                  </Typography>
                  
                  <Typography variant="body2" sx={{ mb: 0.5 }}>
                    <strong>Time:</strong> {breakItem.time}
                  </Typography>
                  
                  <Typography variant="body2" sx={{ mb: 0.5 }}>
                    <strong>Location:</strong> {breakItem.location}
                  </Typography>
                  
                  <Typography variant="body2">
                    {breakItem.description}
                  </Typography>
                </Box>
              </Box>
            ))}
            </Box>
        </Box>
      ))}
    </Box>
  );
}

export default Breaks;
