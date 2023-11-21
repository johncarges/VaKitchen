import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';

import './server'
import Items from './pages/Items/Items';
import Layout from './components/Layout';
import ItemDetail from './pages/Items/ItemDetail';
import UserLayout from './pages/User/UserLayout';
import Saved from './pages/User/Saved';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout/>}>
          <Route index element={<Home />} />
          <Route path='about' element={<About />} />
          <Route path='items' element={<Items />} />
          <Route path='items/:id' >
            <Route index element={<ItemDetail/>}/>
          </Route>
          <Route path='account' element={<UserLayout/>}>
            <Route index element={<h1>Your Orders</h1>}/>
            <Route path='saved' element={<Saved/>}/>
            <Route path='settings' element={<h1>Settings</h1>}/>            
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
