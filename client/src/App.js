
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';



import './server'
import Items from './pages/Items';

function App() {
  return (
    <BrowserRouter>
      <header>
        <Link className='site-logo' to='/'>VaKitchen</Link>
        <nav>
          <Link to='/about'>About</Link>
          <Link to='/items'>Items</Link>
        </nav>
      </header>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/items' element={<Items />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
