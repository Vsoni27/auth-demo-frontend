import React, { useRef } from "react";
import { Stack, Typography, TextField, Button } from "@mui/material";
import { useLoginMutation } from "../../store";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import { useFormik } from "formik";

//Form validation


const validationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
});

const Login = () => {
  const [login, { isLoading }] = useLoginMutation();

  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    login({ email, password });
  };

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema,
  });

  return (
    <Stack
      onSubmit={handleSubmit}
      component="form"
      flexDirection="column"
      gap={1.2}
      sx={{ borderRadius: "4px", m: "auto", p: "20px", bgcolor: "white" }}
    >
      <Typography variant="h6" fontWeight="bold" color="red" textAlign="center">
        Login
      </Typography>

      {/* EMAIL */}
      <TextField
        inputProps={{ ref: emailRef }}
        label="Email"
        variant="outlined"
        size="small"
        color="error"
        {...formik.getFieldProps("email")}
      />

      {formik.touched.email && formik.errors.email ? (
        <Typography variant="caption" color="error">
          {formik.errors.email}
        </Typography>
      ) : null}

      {/* PASSWORD */}
      <TextField
        inputProps={{ ref: passwordRef }}
        label="Password"
        variant="outlined"
        size="small"
        color="error"
      />

      <Button
        type="submit"
        variant="contained"
        color="error"
        disabled={isLoading}
      >
        Submit
      </Button>
      <Link to="/forget-password" style={{ textAlign: "end" }}>
        <Typography variant="caption" color="blue">
          Forget Password?
        </Typography>
      </Link>
    </Stack>
  );
};

export default Login;
