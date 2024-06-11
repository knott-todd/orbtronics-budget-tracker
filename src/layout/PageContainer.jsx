import React from "react";
import { Container } from "@mui/material";
import { styled } from "@mui/system";
import LargeSpacer from "components/LargeSpacer";

const StyledContainer = styled(Container)({
    marginBottom: "150px",
});

const PageContainer = ({ children }) => {
    return (
        <StyledContainer>
            {children}
        </StyledContainer>
    );
};

export default PageContainer;
