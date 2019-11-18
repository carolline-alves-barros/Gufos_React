import React, { Component } from 'react';
import Rodape from '../componentes/Rodape';
import '../App.css'

class Evento extends Component{
    constructor(props){
        super(props);
        this.state = {
            listaEventos: [],
                titulo: '',
                dataEvento: '',
                acessoLivre: '',
                categoria: ''
        }
        this.atualizarEstadoAcesso = this.atualizarEstadoAcesso.bind(this);
        this.atualizarEstadoData = this.atualizarEstadoData.bind(this);
        this.atualizarEstadoTitulo = this.atualizarEstadoTitulo.bind(this);
        this.buscarEventos = this.buscarEventos.bind(this);
        this.cadastrarEventos = this.cadastrarEventos.bind(this);
    }

    //Listar eventos da api 
    buscarEventos(){
        fetch('http://localhost:5000/api/eventos')
        .then(resposta => resposta.json())
        .then(data => this.setState({ listaEventos: data }))
        .catch((error) => console.log(error))
    }

    // Funcao que recebe os valores do input e coloca na variavel
    atualizarEstadoTitulo(event){
        this.setState({ titulo: event.target.value })
    }

    atualizarEstadoData(event){
        this.setState({dataEvento:event.target.value })
    }

    atualizarEstadoAcesso(event){
        this.setState({ acessoLivre: event.target.value })
    }

     

    cadastrarEventos(event){
        event.preventDefault(); // Evita o comportamento padrao da pagina

        fetch('http://localhost:5000/api/eventos',
            {
                method: 'POST', //Declarar o metodo que vamos acessar da url
                body: JSON.stringify({
                    titulo : this.state.titulo,
                    dataEvento : this.state.dataEvento,
                    acessoLivre : this.state.acessoLivre  
                }),
                headers: {
                    "Content-type": "application/json"
                }
            }
        )

        .then(resposta => 
            {
                if(resposta.status === 200){
                    console.log('Evento cadastrado com sucesso.');
                }
            }
        )

        .catch(erro => console.log(erro))
        .then(this.buscarEventos)
    }

     //Começo do ciclo de vida da funcao buscarEventos
     componentDidMount(){
      this.buscarEventos();
  }    

  
    render() {
        return (
            <div>
           <header className="cabecalhoPrincipal">
          <div className="container">
            {/* <img src={logo} /> */}

            <nav className="cabecalhoPrincipal-nav">
              Administrador
          </nav>
          </div>
        </header>
                <main className="conteudoPrincipal">
                    <section className="conteudoPrincipal-cadastro">
                        <h1 className="conteudoPrincipal-cadastro-titulo">Eventos</h1>
                        <div className="container" id="conteudoPrincipal-lista">
                            <table id="tabela-lista">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Evento</th>
                                        <th>Data</th>
                                        <th>Acesso Livre</th>
                                        <th>Tipo do Evento</th>
                                    </tr>
                                </thead>

                                <tbody id="tabela-lista-corpo">
                                    {
                                        this.state.listaEventos.map(function(evento){
                                            return(
                                                <tr key={evento.eventoId}>
                                                    <td>{evento.eventoId}</td>
                                                    <td>{evento.titulo}</td>
                                                    <td>{evento.dataEvento}</td>
                                                    <td>{evento.acessoLivre ? 'Público' : 'Privado'}</td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                    
                    <form onSubmit = {this.cadastrarEventos}>
                        <div className="container" id="conteudoPrincipal-cadastro">
                            <h2 className="conteudoPrincipal-cadastro-titulo">Cadastrar Evento</h2>
                            <div className="container">
                                <input
                                    value={this.state.titulo}
                                    onChange={this.atualizarEstadoTitulo}
                                    type="text"
                                    id="evento__titulo"
                                    placeholder="título do evento"
                                />
                                <input 
                                    type="date" 
                                    id="evento__data" 
                                    placeholder="dd/MM/yyyy" 
                                    value={this.state.dataEvento}
                                    onChange={this.atualizarEstadoData}    
                                />
                                <select id="option__acessolivre" 
                                        value={this.state.acessoLivre}
                                        onChange={this.atualizarEstadoAcesso}>
                                    <option value="1">
                                        Livre
                                    </option>
                                    <option value="2">
                                        Restrito
                                    </option>
                                </select>
                                <select id="option__tipoevento">
                                    <option value="1" >teste1</option>
                                    <option value="2" >teste2</option>
                                </select>
                                <textarea
                                    rows="3"
                                    cols="50"
                                    placeholder="descrição do evento"
                                    id="evento__descricao"
                                ></textarea>
                            </div>
                                <button 
                                    type="submit"
                                    className="conteudoPrincipal-btn conteudoPrincipal-btn-cadastro"
                                >
                                    Cadastrar
                                </button>
                        </div>
                    </form>
                    </section>
                </main>
                <Rodape/>
            </div>
            )
        }
    }
        
export default Evento;