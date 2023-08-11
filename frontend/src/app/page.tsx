import Explanation from '@/components/home/Explanation';
import { getSession } from '@auth0/nextjs-auth0';
import { ArrowForward } from '@mui/icons-material';
import KeyboardDoubleArrowDownTwoToneIcon from '@mui/icons-material/KeyboardDoubleArrowDownTwoTone';
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
              <Button variant="outlined" color="primary" sx={{ width: '200px' }}>
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
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center" // centerに変更
        alignItems="center"
        width="100%" // 画面の横幅全体に広がるように
        paddingBottom={2} // 下側の余白
      >
        <Typography variant="h6" color="gray">
          下にスクロール
        </Typography>
        <KeyboardDoubleArrowDownTwoToneIcon />
      </Box>
      <Explanation />
      <Box height="150vh" />
    </Container>
  );
};

export default Home;
