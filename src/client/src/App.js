import { useState } from 'react';
// routes
import Router from './routes';
// theme
import ThemeProvider from './theme';
// components
import ScrollToTop from './components/scroll-to-top/ScrollToTop';
// context
import UserContext from './contexts/UserContext';

export default function App() {
  const [id, setId] = useState('');

  return (
    <UserContext.Provider value={ id }>
      <ThemeProvider>
        <ScrollToTop />
        <Router setId={setId} />
      </ThemeProvider>
    </UserContext.Provider>
  );
}
