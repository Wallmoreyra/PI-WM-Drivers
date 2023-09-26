import {Route, BrowserRouter} from "react-router-dom"

import Home from './views/home/home.component';
import Detail from './views/detail/detail.component';
import Form from './views/form/form.component';
import Landing from './views/landing/landing.component';

//import { useState } from 'react'
//import './App.css'

function App() {
//  const [count, setCount] = useState(0)
// el browserRouter va dentro del archivo main.jsx
  return (
    <BrowserRouter> 

      <div>
        

          <Route exact path="/home" component={ Home }/>
          <Route path="/home/:id" component={ Detail }/>
          <Route path="/form" component={ Form } />
          <Route path="/landing" component={ Landing }/>

        
      </div>
      
    </BrowserRouter>
  )
}

export default App
