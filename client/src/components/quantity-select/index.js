import React, { useState } from "react";
import { Grid, Button } from "@material-ui/core";

export default function QuantitySelect() {
  const [quantity, setQuantity] = useState(1);
  const handlePlus = () => {
    const value = quantity + 1;
    setQuantity(value);
  };
  const handleMinus = () => {
    const value = quantity > 1 ? quantity - 1 : quantity;
    setQuantity(value);
  };
  return (
    <Grid
      container
      alignItems="center"
      style={{
        margin: 20
      }}
    >
      <Grid item md={2}>
        <Button
          size="small"
          color="secondary"
          variant="contained"
          onClick={handleMinus}
        >
          -
        </Button>
      </Grid>
      <Grid item md={3}>
        <p color="black">{quantity}</p>
      </Grid>
      <Grid item md={2}>
        <Button
          color="secondary"
          size="small"
          variant="contained"
          onClick={handlePlus}
        >
          +
        </Button>
      </Grid>
    </Grid>
  );
}
