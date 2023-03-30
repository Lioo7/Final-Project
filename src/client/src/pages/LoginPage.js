import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { Link, Container, Typography, Button } from '@mui/material';
import LoginForm from '../sections/auth/LoginForm';
import OldBudget from '../sections/auth/OldBudget';

const StyledRoot = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
}));

const StyledContent = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  minHeight: '80vh',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: theme.spacing(5, 0),
}));

export default function LoginPage() {
  const navigate = useNavigate();
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    navigate('/peoples_budget/sign_up', { replace: true });
  };

  const handleBudgetClick = () => {
    setIsClicked(prev => !prev)
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

            <Typography variant="body2" sx={{ mb: 3 }}>
              Don’t have an account?
              <br />
              <Link id="toSign" variant="subtitle2" onClick={handleClick} sx={{ cursor: 'pointer' }}>
                Sign up
              </Link>{' '}
              here.
            </Typography>
            <Button
              size="medium"
              onClick={handleBudgetClick}
              type="submit"
              variant="outlined"
              style={{ margin: '0 auto', width: '200px', marginBottom: '0px'}}
            >
              State Budget - 2022
            </Button>
          </StyledContent>
        </Container>
      </StyledRoot>

      {isClicked && <OldBudget/>}
    </>
  );
}
