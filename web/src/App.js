import React, { useState, useEffect } from 'react';
import api from './services/api';

import './global.css';
import './App.css';
import './Sidebar.css';
import './Main.css';

import DevForm from './components/DevForm';
import DevItem from './components/DevItem';

function App() {
  const [devs, setDevs] = useState([]);

  useEffect(() => {
    async function loadDevs() {
      const response = await api.get('/devs');
      setDevs(response.data);
    }
    loadDevs();
  }, []);

  async function handleAddDev(data) {
    const response = await api.post('/devs', data);

    setDevs([...devs, response.data]);

  }

  return (
    <div id="app">
      <aside>
        <strong>Cadastrar</strong>
        <DevForm onSubmit={handleAddDev} />
      </aside>

      <main>
        <ul>
          {devs.map(dev => (
            <DevItem key={dev._id} dev={dev} />
          ))}

        </ul>
      </main>
    </div>
  );
}

export default App;


// Component = a function that returns html, css or event js
// Property = they are the atributter of a component pass as a parameter to the component function
// State = the information is keeped by the componenet (imutability)

// http://192.168.1.5:3000/

// function App() { // father component

// it return a variable and a function wich return the value of 
// that variable
// const [counter, setCounter] = useState(0);

// useEffect();
// usa-se quando deseja que tal evento ocorra apenas uma vez dentro do
// ciclo de renderizacao do componenete
// o array o useEffect(); se vazio, indica que ira acontecer o evento 
// uma unica vez, caso tenha uma variavel, ocorrera toda vez
// que o valor dessa variavel mudar

// { dev.map(dev => (null) ) }  =  { dev.map(dev => {return null} ) }

// parenteses foram usados para uma sintase menor