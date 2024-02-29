import { useFormik } from "formik";

const MetodoDeEnvio = ( { setUserBuyData, setView } ) => {

    const userJSON = window.localStorage.getItem('loggedUser');
    const user = JSON.parse(userJSON);

    const handleSubmitAndView = (values) => {
        setUserBuyData(actualState => { return {...actualState, ...values} })
        setView(actualView => actualView + 1)
    }

    const formik = useFormik({
        initialValues: {
            metodoDeEnvio: undefined,
        },
        onSubmit: (values) => handleSubmitAndView(values)
    })

    return (
        <form onSubmit={formik.handleSubmit} >
            <input type="radio" name="metodoDeEnvio" id="oca" value={formik.values.metodoDeEnvio}/>
            <label htmlFor="oca"> Oca </label>

            <input type="radio" name="metodoDeEnvio" id="correoArgentino" value={formik.values.metodoDeEnvio} />
            <label htmlFor="correoArgentino"> Correo Argentino </label>

            <button type="submit"> Confirmar </button>
        </form>
    )
}

export default MetodoDeEnvio;