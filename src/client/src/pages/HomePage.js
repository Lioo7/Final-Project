import { Helmet } from 'react-helmet-async';
import { Stack, Typography } from '@mui/material';

export default function HomePage() {
  return (
    <>
      <Helmet>
        <title> Home </title>
      </Helmet>
      <Stack direction="column" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h2">Your votes, your budget 💰</Typography>
        <Typography variant="body1" >
          The site is a platform for citizens to participate in the division of the people's budget.<br/>
          Citizens can view the current budget distribution and make changes based on their preferences.<br/>
          The site provides information on the proposed projects and allows citizens to vote on the budget distribution.<br/>
          The results of the voting, including comparisons to the existing budget, will be published on the website.<br/>
        </Typography>
      </Stack>
    </>
  );
}
