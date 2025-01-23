import { Provider } from 'react-redux';
import { store } from './store/store';
import HomePage from './pages/Homepage';
import CreateCampaign from './pages/CreateCampaign';

const App = () => {
  return (
    <Provider store={store}>
      <HomePage />
      <CreateCampaign />
    </Provider>
  );
};

export default App;
