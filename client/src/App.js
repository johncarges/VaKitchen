import {
  RouterProvider, 
  createBrowserRouter,
  createRoutesFromElements, 
  Route
} from 'react-router-dom';

import UserProvider, {userContext} from './userContext';

import Home from './pages/Home';
import About from './pages/About';
import Items, {loader as itemsLoader} from './pages/Items/Items';
import Layout from './components/Layout';
import ItemDetail, {loader as itemDetailLoader} from './pages/Items/ItemDetail';
import UserLayout, {loader as userAuthLoader} from './pages/User/UserLayout';
import Plans, {loader as plansLoader} from './pages/Plans/Plans'
import Saved, {savedLoader as savedItemsLoader} from './pages/User/Saved';
import Orders from './pages/User/Orders';
import NotFound from './pages/NotFound';
import Signup, {loader as signupLoader} from './pages/Signup';
import Login from './pages/User/Login'
import Error from './pages/Error';


const router = createBrowserRouter(createRoutesFromElements(
  <Route path='/' element={<Layout/>} errorElement={<Error/>}>
    <Route index element={<Home />} />
    <Route path='plans' 
      element={<Plans />}
      loader={plansLoader}/>
    <Route path='about' element={<About />} />
    <Route path='items' element={<Items />} loader={itemsLoader}/>
    {/* <Route path='items/:id' >
      <Route index element={<ItemDetail/>}/>
    </Route> */}
    <Route path='items/:id' element={<ItemDetail/>} loader={itemDetailLoader}/>
    <Route path='account' element={<UserLayout/>} loader={userAuthLoader}>
      <Route index element={<Orders/>}/>
      <Route path='saved' element={<Saved/>} loader={savedItemsLoader}/>
      <Route path='settings' element={<h1>Settings</h1>}/>            
    </Route>
    <Route path='login' element={<Login />}/>
    <Route path='signup' element={<Signup/>} loader={signupLoader}/>
    <Route path='*' element={<NotFound/>}/>
  </Route>
))


function App() {
  return (
    <UserProvider>
      <RouterProvider router={router}/>
    </UserProvider>
  )
}

export default App;
