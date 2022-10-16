import './App.css';
import React from 'react'
import { Route, Routes } from 'react-router-dom'
import People from './People';
import PeopleDetails from './PeopleDetails';
// import ProductSimple from "./box"


function App() {
  return (
    <div>
      <>
        <Routes>
          
          <Route exact path='/' element={<People />} />
          <Route exact path='/peopleDetails/:id' element={<PeopleDetails />} />
          {/* <Route exact path='/box' element={<ProductSimple />} /> */}
        </Routes>

      </>
    </div>
  );
}

export default App;