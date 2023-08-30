import { useState } from 'react';
import Router from './routes';
// theme
import ThemeProvider from './theme';
// components
import ScrollToTop from './components/scroll-to-top/ScrollToTop';
// context
import UserContext from './contexts/UserContext';
import AddressContext from './contexts/AddressContext';

export default function App() {
  // Define a state variable 'id' and initialize it with the value of 'localStorage.getItem('id')' or an empty string if it's not available
  const [id, setId] = useState(localStorage.getItem('id') ?? '');
  // const [address] = useState('http://localhost:5001/peoples_budget/');
  const url = 'http://csariel.xyz'
  const port = 5002;
  const address = `${url}:${port}/peoples_budget/`;
  console.log('address: ' + address);

  return (
    // Provide the 'id' value to the UserContext using UserContext.Provider
    <UserContext.Provider value={id}>
      <AddressContext.Provider value={address}>
        {/* Wrap the entire app with ThemeProvider to apply a theme */}
        <ThemeProvider>
          {/* Render the ScrollToTop component to handle scrolling behavior */}
          <ScrollToTop />
          {/* Render the Router component and pass the 'setId' function as a prop */}
          <Router setId={setId} />
        </ThemeProvider>
      </AddressContext.Provider>
    </UserContext.Provider>
  );
}
