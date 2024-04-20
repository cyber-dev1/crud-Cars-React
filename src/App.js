import { RouterProvider } from 'react-router-dom';
import './App.css';
import { rout } from './Routes';
function App(){
  return (
    <>
        <RouterProvider router={rout}/>
    </>
  )
}
export default App;