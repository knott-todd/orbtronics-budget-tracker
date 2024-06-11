import { Container } from "@mui/material";
import React from "react";

export default function FormContainer({ children }) {
    return (
        <Container maxWidth='sm'>
            {children}
        </Container>
    );
}