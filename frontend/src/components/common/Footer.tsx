'use client';
import GitHubIcon from '@mui/icons-material/GitHub';
import { Box, Container, Link, Paper, Typography, styled } from '@mui/material';

const StyledFooter = styled(Paper)(({ theme }) => ({
  marginTop: theme.spacing(8),
  paddingTop: '10px',
  backgroundColor: theme.palette.background.paper,
}));

export default function Footer() {
  return (
    <StyledFooter elevation={0}>
      <Container maxWidth="lg">
        <Box
          sx={{ mb: 2, mt: 2, gap: 1 }}
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          flexDirection="column"
        >
          <Typography variant="caption" color="inherit">
            内定Journey ©{new Date().getFullYear()}.
          </Typography>
          <Link href="https://github.com/chanon-mike/naitei-journey" color="inherit">
            <GitHubIcon fontSize="small" />
          </Link>
        </Box>
      </Container>
    </StyledFooter>
  );
}
