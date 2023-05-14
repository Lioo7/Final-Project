import { Helmet } from 'react-helmet-async';
import { Stack, Typography } from '@mui/material';
// import HomeForm from '../sections/home/HomeForm';

export default function HomePage() {
  const styles = {
    backgroundImage: `url(${process.env.PUBLIC_URL}/home.png)`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '365px',
  };

  return (
    <>
      <Helmet>
        <title> Home </title>
      </Helmet>
      <Typography variant="h2" style={{ textAlign: 'center' }}>
        Your votes, your budget !
      </Typography>

      <Stack direction="column" alignItems="center" justifyContent="space-between" mb={1} style={styles}>
        {/* <HomeForm/> */}
      </Stack>
    </>
  );
}