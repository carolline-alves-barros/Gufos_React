import React, {Component} from 'react'; //importando objeto React 
import Rodape from '../componentes/Rodape';//importando o componente Rodape
import '../assets/css/login.css'
import logo from '../assets/img/icon-login.png'

class Login extends Component{
    render(){
        return(
            <div>
                <section className="container flex">
        <div className="img__login"><div className="img__overlay"></div></div>

      <div className="item__login">
        <div className="row">
          <div className="item">
            <img src={logo} className="icone__login" />
          </div>
          <div className="item" id="item__title">
            <p className="text__login" id="item__description">
              Bem-vindo! Faça login para acessar sua conta.
            </p>
          </div>
          <form>
            <div className="item">
              <input
                className="input__login"
                placeholder="username"
                type="text"
                name="username"
                id="login__email"
              />
            </div>
            <div className="item">
              <input
                className="input__login"
                placeholder="password"
                type="password"
                name="password"
                id="login__password"
              />
            </div>
            <div className="item">
              <button className="btn btn__login" id="btn__login">
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
    <Rodape/>
            </div>
        )
    }
}
export default Login;