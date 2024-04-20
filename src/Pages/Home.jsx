import { useEffect, useState } from "react"
import "../index.css"
import axios from "axios"
import { useFormik } from "formik"
import * as Yup from "yup"
import { Link, useParams } from "react-router-dom"
export const Home = () => {
     var Id = window.localStorage.getItem("idx")
    const [data, setData] = useState([])
    const {id} = useParams()
    useEffect(() => {
        axios.get(`http://localhost:2222/cars`)
            .then((res) => {
                console.log(res.data);
                setData(res.data)
            }).catch((error) => console.log(error))
    }, [])
    const handleDel = () => {
        axios.delete(`http://localhost:2222/cars/${Id}`)
        .then((res) => console.log(res), alert(" Delete car Successfull"), window.location.reload()).catch((err) => console.log(err))
    }
    const initialValues = {
        marka : "" ,
        year : "" ,
        color : "",
        shina : "" 
    }
    const validationSchema  = Yup.object({
        marka : Yup.string().required("marka yozish majburiy") ,
        year : Yup.string().required("yil kiritish majburiy"),
        color : Yup.string().required("rang majburiy") ,
        shina : Yup.string().required("shina raqam majburiy")

    })
    const handleSub = (e) => {
        e.preventDefault()
        const {marka , year, color , shina} = formik.values
        if(formik.isValid === true){
            axios.post(`http://localhost:2222/cars`, {
                marka : marka ,
                year : year ,
                color : color ,
                shina : shina
            }).then((res) => window.localStorage.setItem("idx", res.data.id), alert("New Car Add") , window.location.reload())
            .catch((error) => console.log(error))
        }

    }
    const formik = useFormik({validationSchema , initialValues , handleSub})
    return (
        <>
            <header className="site-header">
                <div className="container">
                    <div className="title-box">
                        <h1 className="text">Crud Cars</h1>
                    </div>
                </div>
            </header>
            <main>
                <section>
                    <div className="container">
                        <div className="add-cars-box">
                            <form onSubmit={handleSub}>
                                <div className="input-box">
                                    <input className="form-control" type="text" placeholder="Marka" {...formik.getFieldProps("marka")} />
                                    {formik.touched.marka && formik.errors.marka && (
                                        <p className="pi">{formik.errors.marka}</p>
                                    )}
                                </div>
                                <div className="input-box">
                                    <input className="form-control" type="number" placeholder="Year" {...formik.getFieldProps("year")} />
                                    {formik.touched.year && formik.errors.year && (
                                        <p className="pi">{formik.errors.year}</p>
                                    )}
                                </div>
                                <div className="input-box">
                                    <input className="form-control" type="text" placeholder="Color" {...formik.getFieldProps("color")} />
                                    {formik.touched.color && formik.errors.color && (
                                        <p className="pi">{formik.errors.color}</p>
                                    )}
                                </div>
                                <div className="input-box">
                                    <input className="form-control" type="number" placeholder="Shina" {...formik.getFieldProps("shina")} />
                                    {formik.touched.shina && formik.errors.shina && (
                                        <p className="pi">{formik.errors.shina}</p>
                                    )}
                                </div>
                                <button type="submit" className="btn">Qushish</button>
                            </form>
                        </div>
                    </div>
                    <div className="cars-box">
                        <ul>
                            <div className="menu">
                                <h2 className="menu-items">Marka</h2>
                                <h2 className="menu-items">Year</h2>
                                <h2 className="menu-items">Color</h2>
                                <h2 className="menu-items">Shina</h2>
                                <h2 className="menu-items">Boshqa</h2>
                            </div>
                            {data?.map((item, i) => (
                                <li className="item" key={i}>
                                    <h2 className="car">{item.marka}</h2>
                                    <h2 className="car">{item.year}</h2>
                                    <h2 className="car">{item.color}</h2>
                                    <h2 className="car">{item.shina}</h2>
                                    <div>
                                        <button className="btn1" onClick={handleDel}>uchirish</button>
                                        <Link to={`/update/${item.id}`}>
                                            <button className="btn2">tahrirlash</button>
                                        </Link>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </section>
            </main>
        </>
    )
}