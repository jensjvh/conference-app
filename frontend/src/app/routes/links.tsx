import React from 'react';
import {
    Button,
    Box,
    Card,
    CardActions,
    CardContent,
    Grid,
    Link,
    Typography,
    
} from '@mui/material';

interface ContentProps {
    title: string;
    link: string;
    description: string;
  }
  
  interface CardTextProps {
    content: ContentProps;
  }

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

function UsefulLinks() {
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
      <Box>
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
      </Box>
    );
};

export default UsefulLinks;