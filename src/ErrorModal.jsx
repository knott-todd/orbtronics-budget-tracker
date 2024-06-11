import LargeSpacer from "@components/LargeSpacer";
import MedSpacer from "@components/MedSpacer";
import { Alert, Button, Container, Modal, Typography } from "@mui/material";
import React from "react";

export default function ErrorModal({ error, resetErrorBoundary }) {
    return (
        <Container maxWidth='sm'>
            <LargeSpacer />
            <Typography variant="h1">Whoops!</Typography>
            <Typography variant="body1">Something went wrong :/</Typography>
            <Typography color={'error'} variant="overline">{error.message}</Typography>
            <MedSpacer />
            <Button fullWidth variant="contained" onClick={resetErrorBoundary}>Refresh</Button>
        </Container>
    );
}