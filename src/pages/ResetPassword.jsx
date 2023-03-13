import React, { useRef } from "react";
import { Stack, Typography, TextField, Button } from "@mui/material";
import { useResetPasswordMutation } from "../../store";
import { Link, useParams } from "react-router-dom";
import * as Yup from "yup";
import { useFormik } from "formik";

const PWD_REG = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const validationSchema = Yup.object().shape({
  password: Yup.string()
    .required("Password is required")
    .matches(
      PWD_REG,
      "Password must contain at least one uppercase letter, one lowercase letter, one number, one special character, and be between 8-24 characters long"
    ),
});

const ResetPassword = () => {
  const [resetPassword, { isLoading }] = useResetPasswordMutation();
  const { resetToken } = useParams();

  const passwordRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const password = passwordRef.current.value;
    resetPassword({ password, resetToken });
  };

  const formik = useFormik({
    initialValues: {
      password: "",
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
        Reset Password
      </Typography>
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
          {formik.errors.password}
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

export default ResetPassword;
