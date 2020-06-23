import React from 'react'
import styles from './login.module.css'
import {doGoogleLoginAction, logoutAction} from '../../redux/userDuck'
import {connect} from "react-redux";

function LoginPage({fetching, loggedIn, doGoogleLoginAction, logoutAction}) {

  function doLogin(){
    doGoogleLoginAction()
    //redirect to correct page
  }

  function doLogout(){
    logoutAction()
  }

  if(fetching) return<h2>Cargando</h2>
    return (
        <div className={styles.container}>
          {loggedIn ?
            <>
              <h1>
                Cierra tu sesión
              </h1>
              <button onClick={doLogout}>
              Cerrar Sesión
              </button>
            </>
            :
            <>
              <h1>
                Inicia Sesión con Google
              </h1>
              <button onClick={doLogin}>
              Iniciar
              </button>
            </>
          }

        </div>
    )
}

// take redux state and put it in the props of this component
function mapStateToProps({user:{fetching, loggedIn}}){
  return {
    fetching,
    loggedIn
  }
}

export default connect(mapStateToProps, {doGoogleLoginAction, logoutAction})(LoginPage)
