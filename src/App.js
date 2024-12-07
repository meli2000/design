import logo from './logo.svg';
import './App.css';

import icono from './icono.png'
import React, { useState } from 'react';



let access_token;
function App() {
  
 

  //Función que captura y maneja las inputs del usuario

  const [eemail, setEemail] = useState('');
  const [passwordd, setPasswordd] = useState('');


  const handleChangeemail = (e) => {
    setEemail(e.target.value);

  }
  const handleChangepasswordd = (e) => {
    setPasswordd(e.target.value);

  }




 const handleSubmit = async (e) => {
  e.preventDefault(); 

      try {
        const data = await apicall(eemail, passwordd);
        if (data.access_token) {
          access_token = data.access_token;
          alert(`Token obtenido: ${access_token}`);
          const responseverify = await apiverify();
            
         if(responseverify){
          //aqui redirige a pagina cuando ok con la respuesta ---pendiente--
          alert(`verificación: ${access_token}`)


        }


        }else{
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

      // data es mi objeti a devolver//
      const data = await fetch('https://login-practice-125p.onrender.com/auth/login', {
        method: 'POST',

        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          email: eemail,
          password: passwordd })
      });

      
      const jsonData = await data.json(); // Aquí convertimos la respuesta a JSON
        console.log('Respuesta del servidor:', jsonData); // Para debug
      
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
      console.log('token utilizado', access_token)
      const data = await fetch('https://login-practice-125p.onrender.com/auth/verify-user', {
        method: 'GET',
        headers: ({

          'Authorization': `Bearer ${access_token}`
        })
      });
      return data.json();

    } catch (error) {
      return error,
        console.log(error);
    }
  }
  return (


<div className="App">

<div className='todo'>

  <div className="App-titulosimg">

    <div className='App-contenedor'>
      
      <h3 className='mainlabels'>Welcome again</h3>
      <img src={icono} className='icono' width="100" height="100">
      </img>
      <h3 className='mainlabels'> login </h3>
    </div>

    <div className='App-inputs'>
      <form className='form' onSubmit={handleSubmit}  >  
        <label>Enter credentials</label>
        <label>E-mail</label>
        <input type='email' className='input' id='eemail' autoComplete='username' onChange={handleChangeemail} required />
        <label>Password</label>
        <input type='password' className='input' id='passwordd' autoComplete='current-password' onChange={handleChangepasswordd} required />
        <button type='submit'  >Enter</button>
      </form>
    </div>

  </div>

</div>


</div>

        
  
  );


}

export default App;
