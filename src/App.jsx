import logo from './logo.svg';
import './App.css';
import { useNavigate } from 'react-router-dom';
import Home from './Home';
import { Routes , Route} from 'react-router-dom';
import icono from './icono.png'
import React, { useState } from 'react';
function App() {

  //declaro estado
  const [accessToken, setAccessToken] = useState('');
  //const token = localStorage.getItem('accessToken');
  //Función que captura y maneja las inputs del usuario

  const [eemail, setEemail] = useState('');
  const [passwordd, setPasswordd] = useState('');
  const navigate = useNavigate();

  //
  const handleChangeemail = (e) => {
    setEemail(e.target.value);
  }
  const handleChangepasswordd = (e) => {
    setPasswordd(e.target.value);
  }
  const handleLogOut = async (e) => {
    try {
      const ok = await apilogout();
          if (ok) {
            alert(`LOGGED OUT ${accessToken}`)
          }

    } catch (error) {    }
  }

  const handleSubmit = async (e) => {

    e.preventDefault();


    try {
      localStorage.clear();
      const jsonData = await apicall(eemail, passwordd);
      if (jsonData.access_token) {
        //setear access token
        setAccessToken(jsonData.access_token)
        
        navigate('/home')
        
      }

      else {
        alert(`Invalid credentials`);
      }

    }
    catch (error) {
      console.log('error NO TOKEN', error);

    }

  }

  //Funcion llamada a API para obtener token
  async function apicall(eemail, passwordd) {
    try {
      localStorage.removeItem('accessToken');
      // data es mi objeti a devolver//
      const data = await fetch('https://login-practice-125p.onrender.com/auth/login', {
        method: 'POST',

        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          email: eemail,
          password: passwordd
        })
      });
      const jsonData = await data.json(); // Aquí convertimos la respuesta a JSON
      console.log('Respuesta del servidor:', jsonData.access_token); // Para debug

      
        

      return jsonData;
      
    }
    catch (error) {
      return error,
        console.log("bad", error);
    }
  }
  //Función que verifica en base al token
  async function apiverify() {

    try {
     
      
      const data = await fetch('https://login-practice-125p.onrender.com/auth/verify-user', {
        method: 'GET',
        headers: ({

          'Authorization': `Bearer ${accessToken}`
        })
      });
      const jsonData = await data.json(); // Aquí convertimos la respuesta a JSON
      console.log('Respuesta del servidor:', jsonData); // Para debug

      return jsonData;

    } catch (error) {
      return error,
        console.log(error);
    }
  }

  async function apilogout() {

    try {
      const data = await fetch('https://login-practice-125p.onrender.com/auth/logout', {
        
        headers: ({
          'Authorization': `Bearer ${accessToken}`
        })
      });
     
      console.log(data);
      return data;
    } catch (error) {
      console.log(error)
    }


  }

  return (
    <Routes>
      <Route path='/' element={

      
    <div className="App">

      <div className='todo'>

        <div className="App-titulosimg">

          <div className='App-contenedor'>

           

            <label className='label'> Welcome </label>
          </div>

          <div className='App-inputs'>
          
            <form className='form'   >
              <label>Enter credentials</label>
              <label>E-mail</label>
              <input type='email' placeholder='Enter your email' className='input' id='eemail' autoComplete='username' onChange={handleChangeemail} required />
              <label>Password</label>
              <input type='password' className='input' id='passwordd' autoComplete='current-password' onChange={handleChangepasswordd} required />
              
             
              <button type='submit' onClick={handleSubmit}>ENTRARR</button>
            </form>
           
          </div>

        </div>

        <div className='fondo'></div>
      </div>
    </div>
    } />
    <Route path="/home" element={<Home token={accessToken} />} />
  </Routes>
  
  );


}

export default App;
