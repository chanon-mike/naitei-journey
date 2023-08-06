import { getSession } from '@auth0/nextjs-auth0';
import { ArrowForward } from '@mui/icons-material';
import { Box, Button, Container, Link, Typography } from '@mui/material';
import { redirect } from 'next/navigation';

const Home = async () => {
  const session = await getSession();

  return (
    <Container>
      {!session ? (
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          height="80vh"
        >
          <Typography variant="h2" gutterBottom>
            内定Journeyへようこそ!
          </Typography>
          <Typography variant="h6" paragraph>
            ログインして、内定までの道を管理しましょう！
          </Typography>
          <Box mt={2}>
            <Link href="/api/auth/login" underline="none">
              <Button variant="outlined" color="secondary" endIcon={<ArrowForward />}>
                サインイン
              </Button>
            </Link>
          </Box>
        </Box>
      ) : (
        // TODO: Add user statistics instead of redirecting to intern page
        redirect('/intern')
      )}
    </Container>
  );
};

export default Home;
