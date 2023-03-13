import React, { useRef } from "react";
import { Stack, Typography, TextField, Button } from "@mui/material";
import { useSignupMutation } from "../../store";
import * as Yup from "yup";
import { useFormik } from "formik";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";

const PWD_REG = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .max(15, "Must be 15 characters or less")
    .required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .required("Password is required")
    .matches(
      PWD_REG,
      "Password must contain at least one uppercase letter, one lowercase letter, one number, one special character, and be between 8-24 characters long"
    ),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
});

const Signup = () => {
  const [signup, { isLoading }] = useSignupMutation();

  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema,
  });
  //console.log("🚀 ~ file: Signup.jsx:46 ~ Signup ~ formik:", formik);

  const handleSubmit = (e) => {
    e.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const name = nameRef.current.value;
    signup({ email, password, name });
  };

  return (
    <Stack
      onSubmit={handleSubmit}
      component="form"
      flexDirection="column"
      gap={1.2}
      sx={{ borderRadius: "4px", m: "auto", p: "24px", bgcolor: "white" }}
    >
      <Typography variant="h6" fontWeight="bold" color="red" textAlign="center">
        Signup
      </Typography>

      {/* NAME  */}

      <TextField
        inputProps={{ ref: nameRef }}
        label="Name"
        variant="outlined"
        size="small"
        color="error"
        {...formik.getFieldProps("name")}
      />

      {formik.touched.name && formik.errors.name ? (
        <Typography variant="caption" color="error">
          <FontAwesomeIcon icon={faInfoCircle} /> {formik.errors.name}
        </Typography>
      ) : null}

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
          <FontAwesomeIcon icon={faInfoCircle} /> {formik.errors.email}
        </Typography>
      ) : null}

      {/* PASSWORD */}

      <TextField
        inputProps={{ ref: passwordRef }}
        label="Password"
        variant="outlined"
        size="small"
        color="error"
        {...formik.getFieldProps("password")}
      />

      {formik.touched.password && formik.errors.password ? (
        <Typography
          variant="caption"
          color="error"
          sx={{ whiteSpace: "pre-wrap", wordWrap: "break-word" }}
        >
          <FontAwesomeIcon icon={faInfoCircle} /> {formik.errors.password}
        </Typography>
      ) : null}

      {/* CONFIRM PASSWORD */}

      <TextField
        label="ConfirmPassword"
        variant="outlined"
        size="small"
        color="error"
        {...formik.getFieldProps("confirmPassword")}
      />

      {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
        <Typography variant="caption" color="error">
          <FontAwesomeIcon icon={faInfoCircle} />{" "}
          {formik.errors.confirmPassword}
        </Typography>
      ) : null}

      <Button
        type="submit"
        variant="contained"
        color="error"
        // disabled={isLoading}
        disabled={formik.isSubmitting || !formik.isValid}
      >
        Submit
      </Button>
    </Stack>
  );
};

export default Signup;
