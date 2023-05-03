import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link, Stack, IconButton, InputAdornment, TextField, Checkbox } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import PropTypes from 'prop-types';
import UserContext from '../../contexts/UserContext';
import Iconify from '../../components/iconify/Iconify';
import account from '../../_mock/account';

export default function LoginForm({ setId }) {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  // const [id, setId] = useState('');
  const [password, setPassword] = useState('');

  const [idError, setIdError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const id = useContext(UserContext);

  const handleClick = async () => {
    const url = 'http://localhost:5000/peoples_budget/login';

    // Validate the input fields
    if (id.length !== 9) {
      setIdError('Invalid ID: Please enter a 9 digit number.');
      return;
    }
    setIdError('');

    if (password.length < 5) {
      setPasswordError('Invalid password: Please enter a password with at least 5 characters.');
      return;
    }
    setPasswordError('');

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, password }),
      });

      const responseData = await response.json();

      if (responseData.status === 'Succeeded') {
        navigate('/peoples_budget/home', { replace: true });
      } else {
        throw new Error('User does not exist. Please register first.');
      }
    } catch (error) {
      console.log(error);
      alert(error.message);
    }
  };

  const handleClickGuest = async () => {
    const url = 'http://localhost:5000/peoples_budget/login';
    setId(account.id);
    setPassword(account.password);

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, password }),
      });
      navigate('/peoples_budget/home', { replace: true });

      // const responseData = await response.json();
      // if (responseData.status === 'Succeeded') {
      //   navigate('/peoples_budget/home', { replace: true });
      // } else {
      //   throw new Error('User does not exist. Please register first.');
      // }
    } catch (error) {
      console.log(error);
      alert(error.message);
    }
  };

  return (
    <>
      <Stack spacing={3}>
        <TextField
          id="logId"
          label="ID"
          value={id}
          onChange={(e) => setId(e.target.value)}
          error={Boolean(idError)}
          helperText={idError}
        />

        <TextField
          id="logPassword"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          value={password}
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
      </Stack>

      {/* <Stack direction="row" alignItems="center" sx={{ my: 2 }}>
        <Checkbox name="remember" label="Remember me" />
        <Link variant="subtitle2" underline="none" color="black" alignItems="left">
          Remember me
        </Link>
      </Stack> */}

      <Stack direction="row" alignItems="center" sx={{ my: 1 }}>
        <Link variant="subtitle2" underline="always" alignItems="left">
          Forgot Password ?
        </Link>
      </Stack>

      <LoadingButton
        id="loginGuest"
        sx={{  '&:hover': { border: 'solid 2 black' } }}
        size="small"
        fullWidth
        type="submit"
        variant="outlined"
        onClick={handleClickGuest}
      >
        guest mode
      </LoadingButton>

      <LoadingButton
        id="loginBtn"
        sx={{ my: 1, fontSize: '1rem'}}
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        onClick={handleClick}
      >
        Login
      </LoadingButton>
    </>
  );
}

LoginForm.propTypes = {
  setId: PropTypes.func.isRequired,
};
