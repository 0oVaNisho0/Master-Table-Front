import { Routes, Route, Navigate } from 'react-router-dom';
import { TransactionContextProvider } from './contexts/TransactionContext';

import Layout from './components/Layout';
import Home from './pages/Home';
import UserDetail from './pages/UserDetail';

function App() {
  return (
    <TransactionContextProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="home" element={<Home />} />
          <Route path="new" element={<UserDetail />} />
          <Route path="user/:userId" element={<UserDetail />} />

          <Route index element={<Navigate to="/home" />} />
        </Route>

        <Route path="*" element={<Navigate to="/home" />} />
      </Routes>
    </TransactionContextProvider>
  );
}

export default App;
