import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Container } from "@material-ui/core";
import CssBaseline from "@material-ui/core/CssBaseline";
import Avatar from "@material-ui/core/Avatar";
import { Fingerprint } from "@material-ui/icons";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Axios from "../api/service";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const AccountValidation = () => {
  const classes = useStyles();
  const [inputs, setInputs] = useState({});
  const [open, setOpen] = useState(false);
  const [severity, setSeverity] = useState("success");
  const [state, setState] = useState({
    vertical: "bottom",
    horizontal: "right",
  });
  const [message, setMessage] = useState("");

  const { vertical, horizontal } = state;

  const handleChange = (e) => {
    e.persist();
    setInputs((inputs) => ({ ...inputs, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const key = process.env.REACT_APP_LOCATE_SERVICE_KEY;
    const { accountNumber, sortCode } = inputs;

    let params = `?Key=${key}&AccountNumbers=${accountNumber}&SortCodes=${sortCode}`;

    const response = await Axios.post(`json3.ws${params}`);
    console.log(response.data);
    // Test for an error
    if (response.status === 200) {
      if (
        response.data.Items.length === 1 &&
        typeof response.data.Items[0].Error !== "undefined"
      ) {
        setOpen(true);
        setSeverity("error");
        setMessage(response.data.Items[0].Description);
        return;
      }
      // Check if there were any items found
      else if (response.data.Items.length === 0) {
        setOpen(true);
        setSeverity("info");
        setMessage("Sorry, there were no results");
      } else {
        setOpen(true);
        setSeverity("success");
        setMessage(response.data.Items[0].Description);
      }
    }
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
    <Container component="main" maxWidth="xs">
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        key={vertical + horizontal}
      >
        <Alert onClose={handleClose} severity={severity}>
          {message}
        </Alert>
      </Snackbar>
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <Fingerprint />
        </Avatar>
        <Typography component="h1" variant="h5">
          Add Bank Account Details
        </Typography>
        <form onSubmit={handleSubmit} className={classes.form}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="number"
                name="accountNumber"
                variant="outlined"
                required
                fullWidth
                onChange={handleChange}
                label="Account Number"
                type="number"
                autoFocus
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                autoComplete="number"
                name="sortCode"
                variant="outlined"
                required
                fullWidth
                onChange={handleChange}
                label="Sort Code"
                type="number"
                autoFocus
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Send
          </Button>
        </form>
      </div>
    </Container>
  );
};

export default AccountValidation;
