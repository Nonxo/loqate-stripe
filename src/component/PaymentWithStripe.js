import React, { useMemo } from "react";
import useResponsiveFontSize from "./useResponsiveFontSize";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import axios from "axios";
import makeStyles from "@material-ui/core/styles/makeStyles";
import { Container } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(10),
    marginLeft: theme.spacing(15),
    marginRight: theme.spacing(15),
  },
}));

const useOptions = () => {
  const fontSize = useResponsiveFontSize();
  const options = useMemo(
    () => ({
      style: {
        base: {
          fontSize,
          color: "#424770",
          letterSpacing: "0.025em",
          fontFamily: "Source Code Pro, monospace",
          "::placeholder": {
            color: "#aab7c4",
          },
        },
        invalid: {
          color: "#9e2146",
        },
      },
    }),
    [fontSize]
  );
  return options;
};

const CardForm = () => {
  const classes = useStyles();
  const stripe = useStripe();
  const elements = useElements();
  const options = useOptions();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const { data: clientSecret } = await axios.post("/api/payment_intents", {
      amount: 50 * 100,
    });

    console.log(clientSecret);

    const payload = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });

    const confirmedCardPayment = await stripe.confirmCardPayment(clientSecret, {
      payment_method: payload.paymentMethod.id,
    });

    console.log("[PaymentMethod]", payload);
  };

  return (
    <Container maxWidth="md">
      <div className={classes.paper}>
        <form onSubmit={handleSubmit}>
          <label>
            § Card details
            <CardElement
              options={options}
              onReady={() => {
                console.log("CardElement [ready]");
              }}
              onChange={() => {
                console.log("CardElement [change]");
              }}
              onBlur={() => {
                console.log("CardElement [blur]");
              }}
              onFocus={() => {
                console.log("CardElement [focus]");
              }}
            />
          </label>
          <button id="stripe_button" type="submit" disabled={!stripe}>
            Pay $50
          </button>
        </form>
      </div>
    </Container>
  );
};

export default CardForm;
