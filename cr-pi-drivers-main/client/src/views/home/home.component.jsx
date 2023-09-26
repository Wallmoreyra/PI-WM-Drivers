import Navbar from '../../components/navbar/navbar.component';
import Cards from '../../components/cards/cards.component';

import './home.styles.css';



function Home() {


  return (
    <>
      <div>
        <p>Estas en Home page</p>
        <Navbar/>
        <Cards/>
      </div>
      
    </>
  )
}

export default Home