import React from 'react';
import { Grid } from '@mui/material';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '550px',
  height: '250px',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  overflowY: 'auto',
};

const colors = ['rgb(255,0,0,0.1)', 'rgb(255,255,0,0.1)', 'rgb(0,0,255,0.1)', 'rgb(0,255,255,0.1)'];

export default function InfoCards(props) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <div>
      <Grid container spacing={3} sx={{ display: 'flex'}}>
        <Button
          item
          xs={12}
          sm={6}
          md={3}
          sx={{ ...props.styleCards, backgroundColor: colors[props.index % colors.length] }}
          onClick={handleOpen}
        >
          {props.keys}
        </Button>
      </Grid>

      <Modal
        keepMounted
        open={open}
        onClose={handleClose}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
        lang="he"
      >
        <Box sx={style}>
          <Typography id="keep-mounted-modal-title" variant="h3" component="h2" sx={{ textAlign: 'center' }} dir="rtl">
          {props.keys}
          </Typography>
          <Typography id="keep-mounted-modal-description" sx={{ mt: 1, textAlign: 'right' }} dir="rtl">
            {props.value}
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}
