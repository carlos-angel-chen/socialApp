import { Box } from '@mui/material';
import { styled } from '@mui/system';

// esto me permite reutilizar el estilo de un componente en otro
const FlexBetween = styled(Box)({
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
});

export default FlexBetween;