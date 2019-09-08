import React, { useState, useContext } from "react";
import Paper from "@material-ui/core/Paper";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import ShopContext from "../../context/shop-context";
import Typography from "@material-ui/core/Typography";
import AddressForm from "./AddressForm";
import PaymentForm from "./PaymentForm";
import Review from "./Review";
import useStyles from "./styles";
import AlertContext from "../../context/alert-context";
import { FormattedMessage } from "react-intl";

const steps = ["Shipping address", "Payment details", "Review your order"];

function getStepContent({ step, props }) {
  switch (step) {
    case 0:
      return <AddressForm {...props} />;
    case 1:
      return <PaymentForm {...props} />;
    case 2:
      return <Review {...props} />;
    default:
      throw new Error("Unknown step");
  }
}

function Checkout({ history }) {
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  const { openAlert } = useContext(AlertContext);
  const [shippingData, setShippingData] = useState(null);
  const [paymentData, setPaymentData] = useState(null);
  const { cart, subtotal } = useContext(ShopContext);
  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };
  const showErrorMessage = () => {
    openAlert({
      message: "Something went wrong with your input, try again",
      variant: "error"
    });
  };

  const showOrderSuccesMessage = () => {
    openAlert({
      message: "Your Order have been placed",
      variant: "success"
    });
    setTimeout(() => history.push("/dashboard"), 2000);
  };

  const stepsHandler = {
    step: activeStep,
    props: {
      cart,
      classes,
      subtotal,
      handleBack,
      handleNext,
      paymentData,
      shippingData,
      setPaymentData,
      setShippingData,
      showErrorMessage,
      showOrderSuccesMessage
    }
  };
  return (
    <>
      <div className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h4" align="center">
            <FormattedMessage id="checkout.title" />
          </Typography>
          <Stepper activeStep={activeStep} className={classes.stepper}>
            {steps.map(label => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <>
            {activeStep === steps.length ? (
              <>
                <Typography variant="h5" gutterBottom>
                  Thank you for your order.
                </Typography>
                <Typography variant="subtitle1">
                  Your order number is #2001539. We have emailed your order
                  confirmation, and will send you an update when your order has
                  shipped.
                </Typography>
              </>
            ) : (
              getStepContent(stepsHandler)
            )}
          </>
        </Paper>
      </div>
    </>
  );
}
export default React.memo(Checkout);
