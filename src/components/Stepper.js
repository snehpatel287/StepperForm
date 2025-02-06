import React from "react";
import { Paper, Stepper, Step, StepLabel, Grid } from "@mui/material";

const StepperComponent = ({ activeStep, steps }) => {
  return (
    <Grid item xs={3}>
      <Paper style={{ padding: "20px" }}>
        <Stepper activeStep={activeStep} orientation="vertical" >
          {steps.map((label, index) => (
            <Step key={index}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </Paper>
    </Grid>
  );
};

export default StepperComponent;
