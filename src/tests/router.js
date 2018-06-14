import { BrowserRouter } from 'react-router-dom';

// Instantiate router context
const router = {
  history: new BrowserRouter().history,
  route: {
    location: {},
    match: {},
  },
};

const createContext = () => ({
  context: { router },
  childContextTypes: { router: () => {} },
});

export default createContext();
