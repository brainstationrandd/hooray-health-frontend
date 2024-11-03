
// // // src/App.jsx

// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import LoginPage from './components/auth/LoginPage';
// import DashboardPage from './components/dashboard/DashboardPage';
// const App = () => (
//   <Router>
//     <Routes>
//       <Route path="/" element={<LoginPage />} />
//       <Route path="/dashboard" element={<DashboardPage />} />
//     </Routes>
//   </Router>
// );

// export default App;


// Finally, update src/App.jsx to include the new route:
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './components/auth/LoginPage';
import DashboardPage from './components/dashboard/DashboardPage';
import UserManagementPage from './components/admin/UserManagementPage';
import LogsPage from './components/logs/LogsPage';

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/user-management" element={<UserManagementPage />} />
      <Route path="/logs" element={<LogsPage />} />
    </Routes>
  </Router>
);

export default App;