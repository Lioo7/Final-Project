import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
// @mui
import { styled } from '@mui/material/styles';
import { Link, Container, Typography } from '@mui/material';
// sections
import SignUpForm from '../sections/auth/SignUpForm';

const StyledRoot = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
}));

const StyledContent = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: theme.spacing(5, 0),
}));

export default function SignUPage() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/peoples_budget/login', { replace: true });
  };

  return (
    <>
      <Helmet>
        <title> Sign up </title>
      </Helmet>

      <StyledRoot>
        <Container maxWidth="sm">
          <StyledContent>
            <Typography variant="h4" gutterBottom sx={{ display: 'flex', justifyContent: 'center' }}>
              Sign up to People's Budget
            </Typography>

            <SignUpForm />

            <Typography variant="body2" sx={{ mb: 5 }}>
              Have an account?
              <br />
              <Link variant="subtitle2" onClick={handleClick} sx={{ cursor: 'pointer' }}>
                Login
              </Link>{' '}
              here.
            </Typography>
          </StyledContent>
        </Container>
      </StyledRoot>
    </>
  );
}
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
// @mui
import { styled } from '@mui/material/styles';
import { Link, Container, Typography } from '@mui/material';
// sections
import SignUpForm from '../sections/auth/SignUpForm';

const StyledRoot = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
}));

const StyledContent = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: theme.spacing(5, 0),
}));

export default function SignUPage() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/peoples_budget/login', { replace: true });
  };

  return (
    <>
      <Helmet>
        <title> Sign up </title>
      </Helmet>

      <StyledRoot>
        <Container maxWidth="sm">
          <StyledContent>
            <Typography variant="h4" gutterBottom sx={{ display: 'flex', justifyContent: 'center' }}>
              Sign up to People's Budget
            </Typography>

            <SignUpForm />

            <Typography variant="body2" sx={{ mb: 5 }}>
              Have an account?
              <br />
              <Link variant="subtitle2" onClick={handleClick} sx={{ cursor: 'pointer' }}>
                Login
              </Link>{' '}
              here.
            </Typography>
          </StyledContent>
        </Container>
      </StyledRoot>
    </>
  );
}
