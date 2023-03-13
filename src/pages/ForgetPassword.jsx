import React, { useRef } from "react";
import { Stack, Typography, TextField, Button } from "@mui/material";
import { useForgetPasswordMutation } from "../../store";
import * as Yup from "yup";
import { useFormik } from "formik";

const validationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
});

const ForgetPassword = () => {
  const [forgetPassword, { isLoading }] = useForgetPasswordMutation();

  const emailRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const email = emailRef.current.value;
    forgetPassword({ email });
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
      sx={{ borderRadius: "4px", m: "auto", p: "24px", bgcolor: "white" }}
    >
      <Typography variant="h6" fontWeight="bold" color="red" textAlign="center">
        Forget Password
      </Typography>
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

      <Button
        type="submit"
        variant="contained"
        color="error"
        disabled={isLoading || formik.isSubmitting || !formik.isValid}
      >
        Submit
      </Button>
    </Stack>
  );
};

export default ForgetPassword;
