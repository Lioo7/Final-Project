import React from 'react';
import PropTypes from 'prop-types';
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
  boxShadow: 20,
  p: 4,
  overflowY: 'auto',
};

// const colorText = [
//   '#2196f3',
//   '#1e88e5',
//   '#1976d2',
//   '#0d47a1',
//   '#64b5f6',
//   '#42a5f5',
//   '#0288d1',
//   '#01579b',
//   '#0a58ca',
//   '#82b1ff',
//   '#4fc3f7',
// ];
const colorBg = [
  'rgb(100, 181, 246, 0.18)',
  'rgb(100, 181, 246, 0.24)',
  'rgb(100, 181, 246, 0.3)',
  'rgb(100, 181, 246, 0.36)',

];
// const colors = ['rgb(255,255,255,0.4)', 'rgb(255,255,255,0.6)', 'rgb(255,255,255,0.8)', 'rgb(255,255,255,1)'];
// const colors = ['rgb(255,0,0,0.1)', 'rgb(255,255,0,0.1)', 'rgb(0,0,255,0.1)', 'rgb(0,255,255,0.1)'];

export default function InfoCards(props) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <div>
      <Grid container spacing={3} sx={{ display: 'flex',  }}>
        <Button
          id={props.index}
          item
          xs={12}
          sm={6}
          md={3}
          sx={{
            ...props.styleCards,
            // color: colorText[props.index % colors.length],
            marginTop: props.index < 4 ? 0 : 11,
            backgroundColor: colorBg[props.index % 4],
          }}
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
          <Typography
            id="keep-mounted-modal-title"
            variant="h3"
            component="h2"
            sx={{ marginTop: '-15px', textAlign: 'center', color: 'rgb(10, 88, 202, 1)' }}
            dir="rtl"
          >
            {props.keys}
          </Typography>
          <Typography
            id="keep-mounted-modal-description"
            sx={{ mt: 1, textAlign: 'right', color: 'rgb(13, 71, 161, 0.8)' }}
            dir="rtl"
          >
            {props.value}
          </Typography>
          <button
            type="button"
            id={`close-button${props.index}`}
            onClick={handleClose}
            // style={{ position: 'absolute', top: '10px', right: '10px' }}
            style={{
              position: 'absolute',
              top: '10px',
              right: '10px',
              padding: '5px 10px',
              backgroundColor: '#2196f3',
              color: '#fff',
              border: 'none',
              borderRadius: '50%',
              cursor: 'pointer',
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
            }}
          >
            X
          </button>
        </Box>
      </Modal>
    </div>
  );
}

InfoCards.propTypes = {
  keys: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  styleCards: PropTypes.object.isRequired,
};
