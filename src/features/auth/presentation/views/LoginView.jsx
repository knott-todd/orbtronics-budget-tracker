import { useEffect, useState } from "react";
import TextInputField from "../../../../components/TextInputField";
import { useAuthViewModelContext } from "../contexts/AuthViewModelContext";
import { Link as RouterLink } from "react-router-dom";
import { Box, Button, Container, Link, Stack, Typography } from "@mui/material";
import MedSpacer from "../../../../components/MedSpacer";
import ThinSpacer from "../../../../components/ThinSpacer";
import { object, string } from "yup";
import { populateFormWithEvent } from "utils/populateFormWithEvent";

export default function LoginView() {

    const { loginWithGoogle, loginWithEmailAndPassword, error } = useAuthViewModelContext();
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    })
    const [errors, setErrors] = useState({})

    async function handleChange (e) {
        populateFormWithEvent(e, setFormData)
    }

    useEffect(() => {
        if(error) {
            setErrors(errors => ({...errors, ...error}))
        }
    }, [error])

    async function handleSubmit (e) {
        e.preventDefault();

        try {

            await validationSchema.validate(formData, {abortEarly: false})
            
            loginWithEmailAndPassword(formData.email, formData.password);

        } catch (err) {

            const newErrors = {}

            err.inner.forEach(error => {
                newErrors[error.path] = error.message
            })

            setErrors(newErrors)
        }

    }

    const validationSchema = object({
        email: string().email("Invalid email").required("Email is required"),
        password: string()
            .required("Password is requried")
            .min(8, "Password must be at least 8 characters")
            .matches(/[0-9]/, "Password must contain at least one number")
            // .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
            .matches(/[a-z]/, "Password must contain at least one lowercase letter")
            // .matches(/[!@#$%^&*(),.?":{}|<>]/, "Password must contain at least one symbol")
    })

    return (
        <Container maxWidth="sm">
            {/* <Box maxWidth="none" sx={{ paddingTop: 15}}> */}
                <Stack sx={{height: "75vh", paddingTop: 15}}>
                    {/* "Login" header */}
                    <Typography variant="h1">Login</Typography>

                    <MedSpacer />

                    {/* Login form */}
                    <form>
                        {/* Email */}
                        <TextInputField 
                            required 
                            name='email'
                            value={formData.email} 
                            handleChange={handleChange} 
                            label="Email"
                            error={errors.email}
                            helperText={errors.email}
                            
                        />

                        {/* Password */}
                        <TextInputField 
                            name={'password'} 
                            required 
                            value={formData.password} 
                            handleChange={handleChange} 
                            label="Password"
                            error={errors.password}
                            helperText={errors.password}
                            type='password'
                        /> 

                        <ThinSpacer />
                        
                        {/* New user? Sign up (text/link) */}
                        <Typography>New user? <Link component={RouterLink} to="/signup">Sign up</Link></Typography>
                        

                    </form>

                    {/* Spacer */}
                    {/* <LargeSpacer /> */}
                    <Box sx={{flexGrow: 1}} />

                    {/* Submit */}
                    <Button size="large" variant="outlined" onClick={handleSubmit}>Log in</Button>

                    {/* Spacer */}
                    <ThinSpacer />

                    <Button size="large" variant="contained" onClick={loginWithGoogle}>Log in with Google</Button>
                    
                    
                </Stack>

            {/* </Box> */}
        </Container>
    )
}