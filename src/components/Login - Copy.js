// Login.js
// import React, { useState } from 'react';
// import { useDispatch } from 'react-redux';
// import { login } from '../actions/userActions';
// import { useNavigate } from 'react-router-dom';
// import './assets/css/bootstrap.min.css';
// import './assets/css/icons.min.css';
// import './assets/css/app.min.css';
// // import { setAuthToken } from '../AuthService';

// const Login = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate(); // Use useNavigate instead of useHistory
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');

//   const handleLogin = async () => {
//     try {
//       // Replace 'https://example.com/api/login' with your actual login API endpoint
//       const response = await fetch('http://localhost:3000/login', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ "username": username, "userpassword": password }),
//       });

//       if (!response.ok) {
//         // Handle error cases, e.g., display an error message to the user
//         console.error('Login failed:', response.statusText);
//         return;
//       }

//       // Assuming the API returns user details upon successful login
//       const user = await response.json();
//       //setAuthToken('ABCDqwe123'); // Store the token locally
//       // Dispatch the user details to the Redux store
//       dispatch(login(user));

//       // Use navigate instead of history.push
//       navigate('/dashboard');
//     } catch (error) {
//       console.error('Error during login:', error.message);
//     }
//   };

//   return (
//     <div className="account-pages mt-5 mb-5">
//       <div className="container">
//         <div className="row justify-content-center">
//           <div className="col-md-8 col-lg-6 col-xl-5">
//             <div className="card bg-pattern">
//               <div className="card-body p-4">
//                 <div className="text-center w-75 m-auto">
//                   <a href="index.html">
//                     <span><img src="assets/images/logo-dark.png" alt="" height={22} /></span>
//                   </a>
//                   <p className="text-muted mb-4 mt-3">
//                     Enter your email address and password to access admin panel.
//                   </p>
//                 </div>
//                 <form action="#">
//                   <div className="form-group mb-3">
//                     <label htmlFor="emailaddress">Email address</label>
//                     <input className="form-control" type="email" value={username} onChange={(e) => setUsername(e.target.value)} name="emailaddress" placeholder="Enter your Username" required />
//                     {if (username == '')}{
//                       <ul className="parsley-errors-list filled" id="parsley-id-29"><li className="parsley-required">This value is required.</li></ul>
//                     }

//                   </div>
//                   <div className="form-group mb-3">
//                     <label htmlFor="password">Password</label>
//                     <input className="form-control" type="password" name="password" required id="password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} />
//                   </div>
//                   <div className="form-group mb-0 text-center">
//                     <button className="btn btn-primary btn-block" type="submit" onClick={handleLogin}>
//                       Log In
//                     </button>
//                   </div>
//                 </form>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;



// Login.js
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../actions/userActions';
import { useNavigate } from 'react-router-dom';
import './assets/css/bootstrap.min.css';
import './assets/css/icons.min.css';
import './assets/css/app.min.css';
// import { setAuthToken } from '../AuthService';


const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  const handleLogin = async () => {
    // Basic form validation
    const validationErrors = {};
    if (!username.trim()) {
      validationErrors.username = 'Username is required';
    }
    if (!password.trim()) {
      validationErrors.password = 'Password is required';
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      // Replace 'https://example.com/api/login' with your actual login API endpoint
      const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ "username": username, "userpassword": password }),
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
    <div className="account-pages mt-5 mb-5">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-6 col-xl-5">
            <div className="card bg-pattern">
              <div className="card-body p-4">
                <div className="text-center w-75 m-auto">
                  <p className="text-muted mb-4 mt-3">
                    Enter your email address and password to access admin panel.
                  </p>
                </div>
                <form>
                  <div className="form-group mb-3">
                    <label htmlFor="emailaddress">Email address</label>
                    <input
                      className={`form-control ${errors.username ? 'is-invalid' : ''}`}
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      name="emailaddress"
                      placeholder="Enter your Username"
                      required
                    />
                    {errors.username && (
                      <ul className="parsley-errors-list filled" id="parsley-id-29"><li className="parsley-required">{errors.username}</li></ul>
                    )}
                  </div>
                  <div className="form-group mb-3">
                    <label htmlFor="password">Password</label>
                    <input
                      className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                      type="password"
                      name="password"
                      required
                      id="password"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    {errors.password && (
                      <ul className="parsley-errors-list filled" id="parsley-id-29"><li className="parsley-required">{errors.password}</li></ul>
                    )}
                  </div>
                  <div className="form-group mb-0 text-center">
                    <button
                      className="btn btn-primary btn-block"
                      type="button"
                      onClick={handleLogin}
                    >
                      Log In
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;


