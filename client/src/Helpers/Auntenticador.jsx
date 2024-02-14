import { gapi } from "gapi-script"
import GoogleLogin from "react-google-login"
//axios
import axios from "axios"
//hooks
import { useEffect, useState } from 'react'

function Autenticador() {
  const clientID = "752795540558-hqqmvr2p9bf1c4bkjmh33c3ui0rbdu81.apps.googleusercontent.com"
  const [user, setUser] = useState({})

  useEffect(() => {
    const start = () => {
      gapi.auth2.init({
        clientId: clientID,
      })
    }
    gapi.load("client:auth2", start)
  }, [])

  
  const onSuccess = (response) => {
    const userData = {
      email: response.profileObj.email,
      name: response.profileObj.name,
      googleId: response.profileObj.googleId,
      imageUrl: response.profileObj.imageUrl,
      givenName: response.profileObj.givenName
    };
    setUser(userData)
    console.log("estos son los datos:", userData)

    singUpUserInDb(userData)
    }
    
    const onFailure = () => {
      console.log("error al logear")
    }
    
    const singUpUserInDb = async (userData) => {
      console.log("datos de la funcion:", userData)
      try {
        const response = await axios.post('http://localhost:3001/singup', userData);
  
        console.log('Información del usuario enviada al backend con éxito');
      } catch (error) {
        console.error('Error al enviar información del usuario al backend:', error.message);
      }
    }
    
    return (
    <>
      <div className='loginCont'>
        <GoogleLogin
          clientId={clientID}
          onSuccess={onSuccess}
          onFailure={onFailure}
          cookiePolicy={"single_host_policy"}
          uxMode="redirect"
        />
      </div>

      <div className={user ? "profile" : "hidden"}>
        <img src={user.imageUrl} alt="" />
        <h3>{user.name}</h3>
      </div>
    </>
  )
}

export default Autenticador