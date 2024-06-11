import { Box, Button, Container, Link, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { populateFormWithEvent } from "utils/populateFormWithEvent";
import { object, ref, string } from "yup";
import MedSpacer from "../../../../components/MedSpacer";
import TextInputField from "../../../../components/TextInputField";
import ThinSpacer from "../../../../components/ThinSpacer";
import { useAuthViewModelContext } from "../contexts/AuthViewModelContext";

export default function SignupView() {

    const { loginWithGoogle, signUpWithEmailAndPassword, error } = useAuthViewModelContext();
    
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        confirm: ""
    })
    const [errors, setErrors] = useState({})

    async function handleChange(e) {
        populateFormWithEvent(e, setFormData)
    }

    useEffect(() => {
        if (error) {

            const newError = {}

            newError[error.path] = error.message
            console.log(error)
            console.log(newError)
            console.log(errors.email)
            setErrors(errors => ({ ...errors, ...newError }))
        }
    }, [error])

    const validationSchema = object({
        email: string().email("Invalid email").required("Email is required"),
        password: string()
            .required("Password is requried")
            .min(8, "Password must be at least 8 characters")
            .matches(/[0-9]/, "Password must contain at least one number")
            .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
            .matches(/[a-z]/, "Password must contain at least one lowercase letter")
            .matches(/[!@#$%^&*(),.?":{}|<>]/, "Password must contain at least one symbol"),
        confirm: string()
            .required("Confirm password is required")
            .oneOf([ref("password")], "Passwords do not match")
    })


    async function handleSubmit(e) {
        e.preventDefault();

        try {
            await validationSchema.validate(formData, { abortEarly: false })

            signUpWithEmailAndPassword(formData.email, formData.password);
        } catch (err) {

            const newErrors = {}

            err.inner.forEach(error => {
                newErrors[error.path] = error.message
            })

            setErrors(newErrors)
        }
    }

    return (
        <Container maxWidth="sm">
            <Stack sx={{ height: "75vh", paddingTop: 15 }}>
                {/* Signup header */}
                <Typography variant="h1">Signup</Typography>

                <MedSpacer />

                {/* Signup form */}
                <form>
                    {/* Email */}
                    <TextInputField
                        // required
                        value={formData.email}
                        handleChange={handleChange}
                        label="Email"
                        name={'email'}
                        error={(errors.email !== undefined)}
                        helperText={errors.email}
                    />

                    {/* Password */}
                    <TextInputField
                        name={'password'}
                        required
                        value={formData.password}
                        handleChange={handleChange}
                        label="Password"
                        error={errors.password !== undefined}
                        helperText={errors.password}
                        type='password'
                    />

                    {/* Confirm password */}
                    <TextInputField
                        name={'confirm'}
                        required
                        value={formData.confirm}
                        handleChange={handleChange}
                        label="Confirm Password"
                        error={errors.password !== undefined}
                        helperText={errors.password}
                        type='password'
                    />

                    <ThinSpacer />

                    {/* Already have an account? Login (text/link) */}
                    <p>Already have an account? <Link component={RouterLink} to="/login">Log in</Link></p>
                </form>

                {/* <LargeSpacer /> */}
                <Box sx={{ flexGrow: 1 }} />

                {/* Submit */}
                <Button size="large" variant="outlined" onClick={handleSubmit}>Sign up</Button>

                <ThinSpacer />

                <Button size="large" variant="contained" onClick={loginWithGoogle}>Sign up with Google</Button>

            </Stack>
        </Container>
    );
}