import { getSession } from '@auth0/nextjs-auth0';
import { ArrowForward } from '@mui/icons-material';
import { Box, Button, Container, Link, Typography } from '@mui/material';

const Home = async () => {
  const session = await getSession();

  return (
    <Container>
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

        {!session ? (
          <Box display="flex" flexDirection="column" alignItems="center">
            <Typography variant="h6" paragraph>
              ログインして、内定までの道を管理しましょう！
            </Typography>
            <Link href="/api/auth/login" underline="none">
              <Button variant="outlined" color="secondary" endIcon={<ArrowForward />}>
                サインイン
              </Button>
            </Link>
          </Box>
        ) : (
          <Box display="flex" gap="10px" flexDirection="column" alignItems="center">
            <Typography variant="h6" paragraph>
              内定までの道を管理しましょう！
            </Typography>
            <Link href="/intern" underline="none">
              <Button variant="outlined" color="secondary" sx={{ width: '200px' }}>
                インターンシップへ
              </Button>
            </Link>
            <Link href="/fulltime" underline="none">
              <Button variant="outlined" color="secondary" sx={{ width: '200px' }}>
                本選考へ
              </Button>
            </Link>
          </Box>
        )}
      </Box>
    </Container>
  );
};

export default Home;
