import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link, Stack, IconButton, InputAdornment, TextField, Checkbox } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import UserContext from '../../contexts/UserContext';
import Iconify from '../../components/iconify/Iconify';

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
      // throw new Error('Invalid ID: Please enter a 9 digit number.');
      setIdError('Invalid ID: Please enter a 9 digit number.');
      return;
    }
    setIdError('');

    if (password.length < 5) {
      // throw new Error('Invalid password: Please enter a password with at least 5 characters.');
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

      <Stack direction="row" alignItems="center" sx={{ my: 2 }}>
        <Checkbox name="remember" label="Remember me" />
        <Link variant="subtitle2" underline="none" color="black" alignItems="left">
          Remember me
        </Link>
      </Stack>

      <LoadingButton id="loginBtn" fullWidth size="large" type="submit" variant="contained" onClick={handleClick}>
        Login
      </LoadingButton>
    </>
  );
}
