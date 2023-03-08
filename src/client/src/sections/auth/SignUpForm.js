import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// @mui
import { Stack, IconButton, InputAdornment, TextField, MenuItem } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// import { format, startOfToday } from 'date-fns';
// components
import Iconify from '../../components/iconify/Iconify';

export default function SignUpForm() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [id, setId] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [gender, setGender] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // const todayDate = format(startOfToday(), 'yyyy-MM-dd');

  // const handleClick = () => {
  //   navigate('/peoples_budget/home', { replace: true });
  // };

  const handleClick = async () => {
    const url = 'http://localhost:5000/peoples_budget/sign_up';
    navigate('/peoples_budget/home', { replace: true });

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstname: { firstName },
          lastname: { lastName },
          id: { id },
          birthDate: { birthDate },
          gender: { gender },
          email: { email },
          password: { password },
        }),
      });

      console.log({firstName}, {lastName}, {id},  {birthDate}, {gender}, {email}, {password})
      const responseData = await response.json();
      console.log(responseData);
      if (responseData.status === 'succeed') {
        navigate('/peoples_budget/home', { replace: true });
      } else {
        throw new Error('Error!, User was not successfully registered');
      }
    } catch (error) {
      console.error(error);
      // TODO: throw message to the user
    }
  };

  return (
    <>
      <Stack spacing={2}>
        <TextField id="fName" label="First name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
        <TextField id="lName" label="Last name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
        <TextField id="signId" label="ID" value={id} onChange={(e) => setId(e.target.value)} />
        <TextField
          id="date"
          label="Birth Date"
          type="date"
          value={birthDate}
          onChange={(e) => setBirthDate(e.target.value)}
          defaultValue="yyyy-MM-dd"
          // sx={{ width: 220 }}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField id="gender" label="Gender" select value={gender} onChange={(e) => setGender(e.target.value)}>
          <MenuItem value="male">Male</MenuItem>
          <MenuItem value="female">Female</MenuItem>
        </TextField>
        <TextField id="email" label="Email address" value={email} onChange={(e) => setEmail(e.target.value)} />
        <TextField
          id="signPassword"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
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

      <Stack sx={{ marginTop: 2 }}>
        <LoadingButton id='signBtn' fullWidth size="large" type="submit" variant="contained" onClick={handleClick}>
          Sign Up
        </LoadingButton>
      </Stack>
    </>
  );
}
