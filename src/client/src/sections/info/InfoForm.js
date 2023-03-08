import React from 'react'
import InfoCards from './InfoCards';


export default function InfoForm() {
  return (
    <div>
      <InfoCards/>
    </div>
  )
}
















// import * as React from 'react';
// import { styled } from '@mui/material/styles';
// import Box from '@mui/material/Box';
// import Paper from '@mui/material/Paper';
// import Grid from '@mui/material/Grid';

// const Item = styled(Paper)(({ theme }) => ({
//   backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
//   ...theme.typography.body2,
//   padding: theme.spacing(1),
//   textAlign: 'center',
//   fontWeight: 'bold',
//   border: '1px solid #000',
//   borderColor: 'dark',
//   color: theme.palette.text.secondary,
// }));

// function FormRow() {
//   return (
//     <>
//       <Grid item xs={4}>
//         <Item>sass</Item>
//       </Grid>
//       <Grid item xs={4}>
//         <Item>Item</Item>
//       </Grid>
//       <Grid item xs={4}>
//         <Item>Item</Item>
//       </Grid>
//     </>
//   );
// }

// export default function InfoForm() {
//   return (
//     <Box sx={{ flexGrow: 1, margin: 5  }}>
//       <Grid container spacing={3}>
//         <Grid container item spacing={3}>
//           <FormRow />
//         </Grid>
//         <Grid container item spacing={3}>
//           <FormRow />
//         </Grid>
//         <Grid container item spacing={3}>
//           <FormRow />
//         </Grid>
//       </Grid>
//     </Box>
//   );
// }