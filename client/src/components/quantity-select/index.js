import React from "react";
import { Grid, Typography } from "@material-ui/core";
import RemoveIcon from "@material-ui/icons/Remove";
import AddIcon from "@material-ui/icons/Add";
import IconButton from "@material-ui/core/IconButton";

export default function QuantitySelect({ quantity, add, remove }) {
  return (
    <Grid container spacing={4} justify="center" alignItems="center">
      <Grid item sm={4}>
        <IconButton aria-label="remove">
          <RemoveIcon size="small" color="secondary" onClick={remove} />
        </IconButton>
      </Grid>
      <Grid item sm={4}>
        <Typography color="primary" variant="h2">
          {quantity}
        </Typography>
      </Grid>
      <Grid item sm={4}>
        <IconButton aria-label="remove">
          <AddIcon color="secondary" size="small" onClick={add} />
        </IconButton>
      </Grid>
    </Grid>
  );
}
