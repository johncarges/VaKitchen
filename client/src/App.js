import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';

import './server'
import Items from './pages/Items/Items';
import Layout from './components/Layout';
import ItemDetail from './pages/Items/ItemDetail';
import UserLayout from './pages/User/UserLayout';
import Saved from './pages/User/Saved';
import Orders from './pages/User/Orders';
import NotFound from './pages/NotFound';

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
            <Route index element={<Orders/>}/>
            <Route path='saved' element={<Saved/>}/>
            <Route path='settings' element={<h1>Settings</h1>}/>            
          </Route>
        </Route>
        <Route path='*' element={<NotFound/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
