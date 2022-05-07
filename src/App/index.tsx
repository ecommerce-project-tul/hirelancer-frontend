import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Annoucements } from 'Pages/Annoucements';
import { CreateAnnoucement } from 'Pages/CreateAnnoucement';
import { NoMatch } from 'Pages/NoMatch';

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route index element={<Annoucements />} />
          <Route path="annoucements">
            <Route index element={<Annoucements />} />
            <Route path="create" element={<CreateAnnoucement />} />
            <Route path="*" element={<NoMatch />} />
          </Route>
          <Route path="*" element={<NoMatch />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;
