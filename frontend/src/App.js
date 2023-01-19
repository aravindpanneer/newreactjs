import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Fileuploadpage from './components/Fileuploadpage';
import UpdatePhotos from './components/UpdatePhotos';
function App() {
  return (
   <div>


<BrowserRouter>

<Routes>

<Route  exact path = '/' element={<Fileuploadpage/>}/>

<Route  path = '/update/:id' element={<UpdatePhotos/>}/>

</Routes>

</BrowserRouter>
   
   </div>
  );
}

export default App;
