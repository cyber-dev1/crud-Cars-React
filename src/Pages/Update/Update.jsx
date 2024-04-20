import axios from "axios"
import { useFormik } from "formik"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import * as Yup from "yup"
export const Update = () => {
    const name = window.localStorage.getItem("marka")
    const {id}  = useParams()
    const navigator = useNavigate()
    const [data, setData] = useState({
        id : id ,
        marka : '',
        year : '',
        color : '',
        shina : ''
    })
    useEffect(() => {
        axios.get(`http://localhost:2222/cars/`+id)
        .then((res) => {
            setData({...data, marka: res.data.marka , year : res.data.year, color: res.data.color , shina: res.data.shina})
        })
    },[])
    const handleUpdate = (e) => {
        e.preventDefault()
        axios.put(`http://localhost:2222/cars/`+id, data)
        .then((res) => navigator("/"))
    }
    return (
        <div>
            <form onSubmit={handleUpdate}>
                <div className="input-box">
                    <input value={data.marka} onChange={(e) => setData({...data, marka : e.target.value})}  className="form-control" type="text" placeholder="Marka" />
                </div>
                <div className="input-box">
                    <input value={data.year} onChange={(e) => setData({...data, year : e.target.value})}  className="form-control" type="number" placeholder="Year"  />
                </div>
                <div className="input-box">
                    <input value={data.color}  onChange={(e) => setData({...data, color : e.target.value})} className="form-control" type="text" placeholder="Color"  />
                </div>
                <div className="input-box">
                    <input value={data.shina} onChange={(e) => setData({...data, shina : e.target.value})}  className="form-control" type="number" placeholder="Shina"  />
                </div>
                <button type="submit" className="btn">Update</button>
            </form>
        </div>
    )
}