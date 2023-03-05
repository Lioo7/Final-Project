import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
// @mui
import { styled } from '@mui/material/styles';
import { Link, Container, Typography } from '@mui/material';
// sections
import LoginForm from '../sections/auth/LoginForm';

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

export default function LoginPage() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/peoples_budget/sign_up', { replace: true });
  };

  return (
    <>
      <Helmet>
        <title> Login </title>
      </Helmet>

      <StyledRoot>
        <Container maxWidth="sm">
          <StyledContent>
            <Typography variant="h4" gutterBottom sx={{ display: 'flex', justifyContent: 'center' }}>
              Login to People's Budget
            </Typography>

            <LoginForm />

            <Typography variant="body2" sx={{ mb: 5 }}>
              Don’t have an account?
              <br />
              <Link id="toSgin" variant="subtitle2" onClick={handleClick} sx={{ cursor: 'pointer' }}>
                Sign up
              </Link>{' '}
              here.
            </Typography>
          </StyledContent>
        </Container>
      </StyledRoot>
    </>
  );
}
