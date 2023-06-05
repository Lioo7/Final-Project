import { useState } from 'react';
import PropTypes from 'prop-types';
import { Link, Stack, IconButton, InputAdornment, TextField, Dialog, Button, Typography } from '@mui/material';
import Iconify from '../../components/iconify/Iconify';

function SimpleDialog(props) {
  const { onClose, selectedValue, open } = props;
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [isShow, setIsShow] = useState(true);

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleSubmit = () => {
    // e.prevetDefault();
    setIsShow((prev)=>!prev)
  };

  return (
    <Dialog onClose={handleClose} open={open}>
        {isShow && (<>
      <Typography sx={{ marginTop: '10px', textAlign: 'center', fontSize: '26px', fontWeight: 'bold' }}>
        Confirm Email
      </Typography>

      <Stack alignItems="center" sx={{ my: 2, mx: 13 }}>
        <TextField
          sx={{ my: 1, width: '350px' }}
          id="email"
          label="Email "
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={Boolean(emailError)}
          helperText={emailError}
        />

        <Button
          sx={{ my: 1, fontSize: '1rem', marginBottom: '15px', width: '170px' }}
          size="medium"
          type="submit"
          variant="contained"
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </Stack>
      </>
        )}

        {!isShow && (<> 
        <SimpleDialog2 open={open} onClose={handleClose} setIsShow={setIsShow} />
        </>)}
    </Dialog>
    
  );
}

SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired,
};

function SimpleDialog2(props) {
  const { onClose, selectedValue, open } = props;
  const [showPassword, setShowPassword] = useState(false);
  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleSubmit = () => {
    // e.prevetDefault();
    props.setIsShow((prev)=>!prev)
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <Typography sx={{ marginTop: '10px', textAlign: 'center', fontSize: '26px', fontWeight: 'bold' }}>
        Set password
      </Typography>

      <Stack alignItems="center" sx={{ my: 2, mx: 13 }}>
        <TextField
          sx={{ my: 1, width: '350px' }}
          label="Password"
          type={showPassword ? 'text' : 'password'}
          value={password1}
          onChange={(e) => setPassword(e.target.value)}
          error={Boolean(passwordError)}
          helperText={passwordError}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <TextField
          sx={{ my: 1, width: '350px' }}
          label="Confirm Password"
          type={showPassword ? 'text' : 'password'}
          value={password2}
          onChange={(e) => setPassword(e.target.value)}
          error={Boolean(passwordError)}
          helperText={passwordError}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <Button
          sx={{ my: 1, fontSize: '1rem', marginBottom: '15px', width: '170px' }}
          size="medium"
          type="submit"
          variant="contained"
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </Stack>
    </Dialog>
  );
}

SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired,
};

export default function ForgetPass() {
  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState('');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
    setSelectedValue(value);
  };

  return (
    <div>
      <Stack direction="row" alignItems="center" sx={{ my: 1 }}>
        <Link
          variant="subtitle2"
          onClick={handleClickOpen}
          underline="always"
          alignItems="left"
          sx={{ cursor: 'pointer' }}
        >
          Forgot Password ?
        </Link>
      </Stack>
      <SimpleDialog selectedValue={selectedValue} open={open} onClose={handleClose} />
    </div>
  );
}
