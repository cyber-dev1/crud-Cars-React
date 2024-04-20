import { Route, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import { Home } from "./Pages/Home";
import { Update } from "./Pages/Update/Update";
export const rout = createBrowserRouter(
    createRoutesFromElements(
        <>
       
        <Route path="/" element={<Home/>}/>
        <Route path="/update/:id" element={<Update/>}/>
        </>
    )
)