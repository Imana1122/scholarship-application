import React from 'react';
import { Container, Typography, Grid, Paper } from '@mui/material';
import { Transition } from '@headlessui/react';

const AboutPage = () => {
  return (
    <div className="bg-gray-100 min-h-screen py-10">
      <Container>
        <Transition
          show={true}
          enter="transition-opacity duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Paper elevation={3} className="p-6 rounded-lg shadow-lg">
            <Typography variant="h4" gutterBottom>
              About Us
            </Typography>
            <Typography variant="body1" paragraph>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
              tincidunt urna eu dapibus. Integer tristique nunc ac justo
              tincidunt, eget convallis nisi volutpat. Pellentesque ut varius
              enim, in posuere justo. Vivamus lacinia odio et erat dictum, id
              malesuada odio efficitur.
            </Typography>
            <Typography variant="body1" paragraph>
              Nullam sollicitudin, turpis at pharetra vehicula, libero libero
              pellentesque dolor, a malesuada neque eros eget nisi. Phasellus
              eget congue ipsum. Nam nec odio nec sem posuere venenatis a eget
              ligula. Nulla facilisi. Vivamus eu tellus non nunc pretium
              dignissim.
            </Typography>
          </Paper>
        </Transition>
        <Grid container spacing={3} className="mt-6">
          <Grid item xs={12} sm={6}>
            <Transition
              show={true}
              enter="transition-opacity duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Paper elevation={3} className="p-6 rounded-lg shadow-lg">
                <Typography variant="h6" gutterBottom>
                  Our Mission
                </Typography>
                <Typography variant="body2" paragraph>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                  tincidunt urna eu dapibus.
                </Typography>
              </Paper>
            </Transition>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Transition
              show={true}
              enter="transition-opacity duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Paper elevation={3} className="p-6 rounded-lg shadow-lg">
                <Typography variant="h6" gutterBottom>
                  Our Team
                </Typography>
                <Typography variant="body2" paragraph>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                  tincidunt urna eu dapibus.
                </Typography>
              </Paper>
            </Transition>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default AboutPage;
