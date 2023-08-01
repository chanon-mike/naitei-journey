// app/page.tsx
import ActionAreaCard from '@/components/board/ActionArea';
import AddButton from '@/components/board/AddButton';
import Board from '@/components/board/Board';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

const Home = () => {
  return (
    <main>
      <Container>
        <Box>
          <Typography variant="h5">intern</Typography>
        </Box>
        <Box display="flex" justifyContent="center">
          <Board>
            <ActionAreaCard />
            <AddButton />
          </Board>
          <Board>
            <AddButton />
          </Board>
          <Board>
            <AddButton />
          </Board>
          <Board>
            <AddButton />
          </Board>
        </Box>
      </Container>
    </main>
  );
};

export default Home;
