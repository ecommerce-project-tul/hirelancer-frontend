import './App.css';
import 'material-react-toastify/dist/ReactToastify.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Annoucements } from 'Pages/Annoucements';
import { AnnoucementDetails } from 'Pages/AnnoucementDetails/';
import { AnnouncementBidding } from 'Pages/AnnouncementBidding';
import { PaymentSuccess } from 'Pages/PaymentSuccess';
import { NoMatch } from 'Pages/NoMatch';
import { UserPage } from 'Pages/User';
import { ToastContainer } from 'material-react-toastify';

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route index element={<Annoucements />} />
          <Route path="announcement">
            <Route index element={<Annoucements />} />
            <Route
              path=":announcementId/bidding"
              element={<AnnouncementBidding />}
            />
            <Route path=":announcementId" element={<AnnoucementDetails />} />
            <Route path="*" element={<NoMatch />} />
          </Route>
          <Route path="user">
            <Route path=":email" element={<UserPage />} />
            <Route path="*" element={<NoMatch />} />
          </Route>
          <Route path="payment-success" element={<PaymentSuccess />}></Route>
          <Route path="*" element={<NoMatch />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer position="top-center" />
    </QueryClientProvider>
  );
};

export default App;
