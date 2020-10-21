import React from "react";
import "./App.css";
import MenuAppBar from "./component/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import CustomizedStepper from "./component/Stepper";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js/";

function App() {
  const stripePromise = loadStripe(`${process.env.STRIPE_PUBLIC_KEY}`);
  return (
    <Elements stripe={stripePromise}>
      <div className="App">
        <CssBaseline />
        <MenuAppBar />
        <CustomizedStepper />
      </div>
    </Elements>
  );
}

export default App;
