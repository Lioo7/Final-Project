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
        Your votes, your budget 💰
      </Typography>

      <Stack direction="column" alignItems="center" justifyContent="space-between" mb={1} style={styles}>
        {/* <HomeForm/> */}
      </Stack>
      <Typography variant="body1">
        The site is a platform for citizens to participate in the division of the people's budget.
        <br />
        Citizens can view the current budget distribution and make changes based on their preferences.
        <br />
        The site provides information on the proposed projects and allows citizens to vote on the budget distribution.
        <br />
        The results will be published on the website.
        <br />
      </Typography>
    </>
  );
}
