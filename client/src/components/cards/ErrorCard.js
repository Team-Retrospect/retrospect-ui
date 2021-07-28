import React from 'react';
import { Avatar, Card, CardContent, Grid, Typography } from '@material-ui/core';

const ErrorCard = ({ errors, title, Icon, type }) => (
  <Card sx={{ height: '100%' }}>
    <CardContent>
      <Grid container spacing={4} sx={{ justifyContent: 'space-between' }}>
        <Grid item>
          <Avatar style={{ backgroundColor: '#271d3f' }}>{Icon}</Avatar>
        </Grid>
        <Grid item style={{ paddingLeft: '20px' }}>
          <Typography color="textPrimary" variant="h4">
            {errors} {title}
          </Typography>
          <Typography color="textSecondary" gutterBottom variant="h5">
            {type}
          </Typography>
        </Grid>
      </Grid>
    </CardContent>
  </Card>
);

export default ErrorCard;
