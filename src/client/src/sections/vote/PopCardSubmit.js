import * as React from 'react';
import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Paper from '@mui/material/Paper';
import Draggable from 'react-draggable';
import Box from '@mui/material/Box';
import UserContext from '../../contexts/UserContext';

function PaperComponent(props) {
  return (
    <Draggable handle="#draggable-dialog-title" cancel={'[class*="MuiDialogContent-root"]'}>
      <Paper {...props} />
    </Draggable>
  );
}

export default function PopCardSubmit(props) {
  const id = useContext(UserContext);
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const [display, setDisplay] = useState(true);
  const [table] = useState({ ...props.allData, children: props.tableData });
  const url = 'http://localhost:5000/peoples_budget/voting';

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async () => {
    // removed the table
    props.setDisplay(false);
    setDisplay(false);

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, table }),
      });
      const responseData = await response.json();
      if (responseData.status === 'Succeeded') {
        navigate('/peoples_budget/results', { replace: true });
      } else {
        throw new Error('Error sending user vote.');
      }
    } catch (error) {
      console.log(error);
      alert(error.message);
    }
  };

  return (
    <div>
      {display && (
        <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 4 }}>
          <Button
            id="voteSubmit"
            variant="outlined"
            sx={{ width: '300px', height: '60px', fontWeight: 'bold', fontSize: '25px' }}
            onClick={handleClickOpen}
          >
            Submit
          </Button>
        </Box>
      )}

      {display && (
        <Dialog
          open={open}
          onClose={handleClose}
          PaperComponent={PaperComponent}
          aria-labelledby="draggable-dialog-title"
        >
          <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
            Confirm Vote Submission
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure you want to submit your vote?
              <br />
              Please note that you can only vote once.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button id="cancel" autoFocus onClick={handleClose}>
              Cancel
            </Button>
            <Button id="submit" onClick={handleSubmit}>
              Submit
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </div>
  );
}

PopCardSubmit.propTypes = {
  setDisplay: PropTypes.func.isRequired,
  tableData: PropTypes.arrayOf(PropTypes.object).isRequired,
};
