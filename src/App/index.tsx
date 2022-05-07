import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Annoucements } from 'Pages/Annoucements';

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Annoucements />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;
