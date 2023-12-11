// // Login.js
// import React, { useState } from 'react';
// import { useDispatch } from 'react-redux';
// import { login } from '../actions/userActions';

// const Login = () => {
//   const dispatch = useDispatch();
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');

//   const handleLogin = () => {
//     // Perform login logic and fetch user data from your Node.js API
//     // For simplicity, we're directly dispatching user details here.
//     const user = { username: username, /* other user details */ };
//     dispatch(login(user));
//   };

//   return (
//     <div>
//       <h2>Login Component</h2>
//       <div>
//         <label>Username:</label>
//         <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
//       </div>
//       <div>
//         <label>Password:</label>
//         <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
//       </div>
//       <button onClick={handleLogin}>Login</button>
//     </div>
//   );
// };

// export default Login;

// Login.js
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../actions/userActions';
import { useNavigate } from 'react-router-dom';


const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Use useNavigate instead of useHistory
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      // Replace 'https://example.com/api/login' with your actual login API endpoint
      const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({"username": "chothani@illiquidx.com","userpassword": "Admin@123"}),
      });

      if (!response.ok) {
        // Handle error cases, e.g., display an error message to the user
        console.error('Login failed:', response.statusText);
        return;
      }

      // Assuming the API returns user details upon successful login
      const user = await response.json();

      // Dispatch the user details to the Redux store
      dispatch(login(user));

      // Use navigate instead of history.push
      navigate('/dashboard');
    } catch (error) {
      console.error('Error during login:', error.message);
    }
  };

  return (
    <div>
      <h2>Login Component</h2>
      <div>
        <label>Username:</label>
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
      </div>
      <div>
        <label>Password:</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;


