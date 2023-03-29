import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Stack, IconButton, InputAdornment, TextField, MenuItem } from '@mui/material';
import { LoadingButton } from '@mui/lab';
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

  const [firstNameError, setFirstNameError] = useState('');
  const [lastNameError, setLastNameError] = useState('');
  const [idError, setIdError] = useState('');
  const [birthDateError, setBirthDateError] = useState('');
  const [genderError, setGenderError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleClick = async () => {
    const url = 'http://localhost:5000/peoples_budget/sign_up';

    // Validate the input fields
    if (firstName === '') {
      setFirstNameError('Invalid First name: Please enter a first name.');
      return;
    }
    setFirstNameError('');

    if (lastName === '') {
      setLastNameError('Invalid Last name: Please enter a last name.');
      return;
    }
    setLastNameError('');

    if (id.length !== 9) {
      setIdError('Invalid ID: Please enter a 9 digit number.');
      return;
    }
    setIdError('');

    if (birthDate === '') {
      setBirthDateError('Invalid Birth Date: Please enter a birth date.');
      return;
    }
    setBirthDateError('');

    if (gender === '') {
      setGenderError('Invalid Gender: Please enter a gender.');
      return;
    }
    setGenderError('');

    if (email === '') {
      setEmailError('Invalid Email: Please enter a email.');
      return;
    }
    setEmailError('');

    if (password.length < 5) {
      setPasswordError('Invalid password: Please enter a password with at least 5 characters.');
      return;
    }
    setPasswordError('');

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({firstName, lastName, id, birthDate, gender, email, password }),
      });

      // console.log({ firstName }, { lastName }, { id }, { birthDate }, { gender }, { email }, { password });
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
        <TextField
          id="fName"
          label="First name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          error={Boolean(firstNameError)}
          helperText={firstNameError}
        />
        <TextField
          id="lName"
          label="Last name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          error={Boolean(lastNameError)}
          helperText={lastNameError}
        />
        <TextField
          id="signId"
          label="ID"
          value={id}
          onChange={(e) => setId(e.target.value)}
          error={Boolean(idError)}
          helperText={idError}
        />
        <TextField
          id="date"
          label="Birth Date"
          type="date"
          value={birthDate}
          onChange={(e) => setBirthDate(e.target.value)}
          defaultValue="yyyy-MM-dd"
          error={Boolean(birthDateError)}
          helperText={birthDateError}
          // sx={{ width: 220 }}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          id="gender"
          label="Gender"
          select
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          error={Boolean(genderError)}
          helperText={genderError}
        >
          <MenuItem value="male">Male</MenuItem>
          <MenuItem value="female">Female</MenuItem>
        </TextField>
        <TextField
          id="email"
          label="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={Boolean(emailError)}
          helperText={emailError}
        />
        <TextField
          id="signPassword"
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

      <Stack sx={{ marginTop: 2 }}>
        <LoadingButton id="signBtn" fullWidth size="large" type="submit" variant="contained" onClick={handleClick}>
          Sign Up
        </LoadingButton>
      </Stack>
    </>
  );
}
