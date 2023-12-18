// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;

// App.js
// App.js
import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent';
import CreateContact from './components/CreateContact';
import UpdateContact from './components/UpdateContact';
import ListContacts from './components/ListContacts';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const App = () => {
  return (
    <Router>
      <div>
        <Header />
        <div className="container">
          <Sidebar />
          <Routes>
            <Route path="/" element={<MainContent />} />
            <Route path="/create" element={<CreateContact />} />
            <Route path="/update/:id" element={<UpdateContact />} />
            <Route path="/list" element={<ListContacts />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
};

export default App;


