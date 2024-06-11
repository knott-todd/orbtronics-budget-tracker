import { ArrowBack, Delete, Edit } from "@mui/icons-material";
import { AppBar, IconButton, Stack, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

export default function AppBarTitleAndExit({ title, handleDelete = undefined, editPath = undefined }) {
    return (
        <AppBar elevation={0} position="static">
            <Stack sx={{ padding: '12px 20px' }} justifyContent={'space-between'} alignItems={'center'} direction={'row'}>

                {/* Left side */}
                <Stack gap={1} direction={'row'} alignItems={'center'} justifyContent={'start'}>
                    {/* Back */}
                    <IconButton edge='start' component={Link} to={-1} ><ArrowBack /></IconButton>

                    {/* Edit Log */}
                    <Typography variant="body1">{title}</Typography>

                </Stack>

                {/* Delete */}
                {handleDelete && (
                    <IconButton
                        edge='end'
                        aria-label="delete"
                        size="small"
                        onClick={handleDelete} >
                        <Delete />
                    </IconButton>
                )}

                {/* Edit */}
                {editPath && (
                    <IconButton
                        edge='end'
                        aria-label="edit"
                        size="small"
                        component={Link}
                        to={editPath}
                    >
                        <Edit />
                    </IconButton>
                )}

            </Stack>
        </AppBar>
    );
}