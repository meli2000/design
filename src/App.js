import logo from './logo.svg';
import './App.css';
import icon from './avatar.svg'
function App() {
  return (
    <div className="App">

      <div className='todo'>

        <div className="App-titulosimg">

              <div className='App-contenedor'>
                <h1 className='mainlabelwelc'>Welcome again</h1>
                <img src={icon} className='icono' width="100" height="100">
                </img>
                <h3 > login </h3>
              </div>

              <div className='App-inputs'>
                <form className='form'>
                  <label>Enter credentials</label>
                  <label>E-mail</label>
                  <input type='email' className='input' required ></input>
                  <label>Password</label>
                  <input type='password' className='input' required></input>
                  <button type='submit' >Enter</button>
                </form>
              </div>

        </div>

      </div>

    </div>
  );
}

export default App;
