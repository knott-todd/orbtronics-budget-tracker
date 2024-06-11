import { Button, Container, Stack, Typography } from "@mui/material";
import { useAuthViewModelContext } from "../contexts/AuthViewModelContext";
import MedSpacer from "../../../../components/MedSpacer";

export default function ProfileView() {

    const { authState, logout } = useAuthViewModelContext();

    return (
        <Container>
            <Stack sx={{paddingTop: 15, height: '80vh'}} alignItems={'center'} justifyContent='flex-end'>
                {authState.user && (
                    <>
                        {/* Logged in as... */}
                        <Typography variant="body1">Currently logged in as {authState.user.displayName ? authState.user.displayName : authState.user.email}</Typography>

                        <MedSpacer />

                        {/* Sign out */}
                        <Button color="error" size="large" variant="outlined" onClick={logout}>Sign out</Button>
                    </>
                )}
            </Stack>
        </Container>
    );
}