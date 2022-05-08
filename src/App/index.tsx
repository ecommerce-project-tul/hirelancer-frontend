import './App.css';
import 'material-react-toastify/dist/ReactToastify.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Annoucements } from 'Pages/Annoucements';
import { AnnoucementDetails } from 'Pages/AnnoucementDetails/';
import { NoMatch } from 'Pages/NoMatch';
import { ToastContainer } from 'material-react-toastify';


const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route index element={<Annoucements />} />
          <Route path="annoucements">
            <Route index element={<Annoucements />} />
            <Route path=":annoucementId" element={<AnnoucementDetails />} />
            <Route path="*" element={<NoMatch />} />
          </Route>
          <Route path="*" element={<NoMatch />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer position='top-center' />
    </QueryClientProvider>
  );
};

export default App;
