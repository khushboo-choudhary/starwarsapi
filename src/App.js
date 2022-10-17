import './App.css';
import React from 'react'
import { Route, Routes } from 'react-router-dom'
import People from './People';
import PeopleDetails from './PeopleDetails';
import Favourite from "./Favourite"


function App() {
  return (
    <div>
      <>
        <Routes>
          
          <Route exact path='/' element={<People />} />
          <Route exact path='/peopleDetails/:id' element={<PeopleDetails />} />
          <Route exact path='/favourite' element={<Favourite />} />
        </Routes>

      </>
    </div>
  );
}

export default App;