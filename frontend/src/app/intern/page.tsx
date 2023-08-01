// app/page.tsx
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import ActionAreaCard from '@/components/board/ActionArea';
import Board from '@/components/board/Board'
import Category from '@/components/board/Category';
import AddButton from '@/components/board/AddButton';

export default function Home() {
  return (
    <main>
      <Container>
        <Box>
          <Typography variant="h5">intern</Typography>
        </Box>
        <Box
          display="flex"
          justifyContent="center"
        >
          <Board>
            <Category>
              <Typography variant="h6" style={{ textAlign: 'center' }}> 項目1</Typography>
            </Category>
            <ActionAreaCard />
            <AddButton />
          </Board>
          <Board>
            <Category>
              <Typography variant="h6" style={{ textAlign: 'center' }}> 項目2</Typography>
            </Category>
            <AddButton />
          </Board>
          <Board>
            <Category>
              <Typography variant="h6" style={{ textAlign: 'center' }}> 項目3</Typography>
            </Category>
            <AddButton />
          </Board>
          <Board>
            <Category>
              <Typography variant="h6" style={{ textAlign: 'center' }}> 項目4</Typography>
            </Category>
            <AddButton />
          </Board>
        </Box>

      </Container>
    </main >
  );
}

