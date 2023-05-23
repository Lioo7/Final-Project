import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
// @mui
import { styled } from '@mui/material/styles';
import { Link, Container, Typography } from '@mui/material';
// sections
import SignUpForm from '../sections/auth/SignUpForm';
import useResponsive from '../hooks/useResponsive';


const StyledRoot = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
}));

const StyledSection = styled('div')(({ theme }) => ({
  width: '100%',
  height: '100vh',
  maxWidth: 480,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  boxShadow: theme.customShadows.card,
  backgroundColor: theme.palette.background.default,
  position: 'fixed',

}));

const StyledContent = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: theme.spacing(5, 0),
  objectFit: 'cover',
  position: 'relative', // Set the position to relative
  zIndex: 1, // Set a higher z-index value to make it appear above the background

}));

const StyledImageContainer = styled('div')({
  position: 'fixed',
  top: 0,
  left: 0,
});

export default function SignUPage() {
  const navigate = useNavigate();
  const mdUp = useResponsive('up', 'md');


  const handleClick = () => {
    navigate('/peoples_budget/login', { replace: true });
  };

  return (
    <>
      <Helmet>
        <title> Sign up </title>
      </Helmet>

      <StyledRoot>

      {mdUp && (
          <StyledSection>
            <StyledImageContainer>
              <Typography variant="h3" sx={{ px: 0, mt: 0, mb: -10 }}>
                <img
                  src={`${process.env.PUBLIC_URL}/img_bg/pLogo.png`}
                  alt="Logo"
                  style={{ alignSelf: 'flex-start', width: '400px' }}
                />
              </Typography>
              <img src={`${process.env.PUBLIC_URL}/img_bg/signUp.png`} alt="login" />
            </StyledImageContainer>
          </StyledSection>
        )}

        <Container maxWidth="sm" style={{ marginRight: '100px' }}>
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
