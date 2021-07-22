import React from 'react';
import {
  Avatar,
  Card,
  CardContent,
  Grid,
  Typography,
} from '@material-ui/core';

import { red } from '@material-ui/core/colors';

const ErrorCard = ({errors, title, Icon, type}) => (
  <Card
    sx={{ height: '100%' }}
  >
    <CardContent>
      <Grid
        container
        spacing={4}
        sx={{ justifyContent: 'space-between' }}
      >
				<Grid item>
          <Avatar style={{backgroundColor: red[500]}}>
            {Icon}
          </Avatar>
        </Grid>
        <Grid item style={{paddingLeft: '20px'}}>
				<Typography
            color="textPrimary"
            variant="h4"
          >
            {errors} {title}
          </Typography>
          <Typography
            color="textSecondary"
            gutterBottom
            variant="h5"
          >
            {type}
          </Typography>
        </Grid>
      </Grid>
    </CardContent>
  </Card>
);

export default ErrorCard