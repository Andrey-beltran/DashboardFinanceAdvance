
import { ThemeProvider } from '../context/ThemeContext';
import Dashboard from '../components/Dashboard';

const Index = () => {
  return (
    <ThemeProvider>
      <Dashboard />
    </ThemeProvider>
  );
};

export default Index;
