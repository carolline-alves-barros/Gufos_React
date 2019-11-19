import React, { Component } from 'react'; //importando objeto React 
import Rodape from '../componentes/Rodape';//importando o componente Rodape
import logo from '../assets/img/icon-login.png'


class Categoria extends Component {
  constructor(props){
    super(props);
    this.state = {
      listaCategorias : [],
      titulo: ''
    }
    // Chamar funcoes do projeto 
    this.atualizaEstadoTitulo = this.atualizaEstadoTitulo.bind(this);
    this.buscarCategorias = this.buscarCategorias.bind(this);
    this.cadastrarCategoria = this.cadastrarCategoria.bind(this);
  }

//função que faz a equisição para api
//atribui os dados recebidos ao state listaCategorias
//caso ocorra um erro, exibe no console do navegador
buscarCategorias(){
  fetch('http://localhost:5000/api/categorias')
  .then(resposta => resposta.json())
  .then(data => this.setState({ listaCategorias : data}))
  .catch((erro) => console.log(erro))
}

//assim que a página for carregada chama a função buscar categorias
componentDidMount(){
  this.buscarCategorias();
}

//Recebe um evento, e recebo o valor do campo titulo
atualizaEstadoTitulo(event){
    this.setState({titulo:event.target.value}) 
}

cadastrarCategoria(event){
    event.preventDefault(); //Evito comportamentos padrões da página

    // local para onde serão os dados
    fetch('http://localhost:5000/api/categorias',
      { //inicio corpo do metodo da api
        method: 'POST', // declara o metodo que será utilizado
        body: JSON.stringify({titulo: this.state.titulo}),
        headers: {
          "Content-type" : "application/json"
        }
      })//final do metodo da api
      
      //inicio do then
      .then(resposta => {
          if (resposta.status === 200) {
            console.log('Categoria cadastrada!'); 
          }
      }) 
      //final do then

      .catch(erro => console.log(erro))
      .then(this.buscarCategorias) //Atualiza na tabela a categoria cadastrada    
}

deletarCategoria = (id) => {
   console.log("Excluindo");

   fetch("http://localhost:5000/api/categorias/"+id,{
      method : "DELETE",
      headers : {
        "Content-type" : "application/json"
      }
   })

   .then(response => response.json())
   
   .then(response => {
      console.log(response);
      this.setState( () => ({lista: this.state.lista}) )
   })
   .catch(error => console.log(error))
   .then(this.buscarCategorias)
}





//adicionar funcao deletar categoria

  render() {
    return (
      <div>
        <header className="cabecalhoPrincipal">
          <div className="container">
            <img src={logo} />

            <nav className="cabecalhoPrincipal-nav">
              Administrador
          </nav>
          </div>
        </header>

        <main className="conteudoPrincipal">
          <section className="conteudoPrincipal-cadastro">
            <h1 className="conteudoPrincipal-cadastro-titulo">Categorias</h1>
            <div className="container" id="conteudoPrincipal-lista">
              <table id="tabela-lista">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Título</th>
                    <th>Ação</th>
                  </tr>
                </thead>

                <tbody id="tabela-lista-corpo">
                  {
                    this.state.listaCategorias.map(function(categoria){
                      return (
                        <tr key={categoria.categoriaId}>
                          <td>{categoria.categoriaId}</td>
                          <td>{categoria.titulo}</td>
                          
                          <td>
                            <button type="submit" onClick={i => this.deletarCategoria(categoria.categoriaId)}>Excluir</button>
                          </td>

                        </tr>
                      )
                    }.bind(this))
                  }
                </tbody>
              </table>
            </div>

            <div className="container" id="conteudoPrincipal-cadastro">
              <h2 className="conteudoPrincipal-cadastro-titulo">
                Cadastrar Tipo de Evento
            </h2>
            {/*adicionar eventos no formulario*/}
            {/* Adicionar evento para submeter requisicao e chamar a funcao a ser realizada*/}
            <form onSubmit={this.cadastrarCategoria}>
                <div className="container">
                  <input
                    value={this.state.titulo} //o valor digitado no input vai para a "variavel" titulo
                    onChange = {this.atualizaEstadoTitulo} //evento do formulario
                    type="text"
                    id="nome-tipo-evento"
                    placeholder="tipo do evento"
                  />
                  <button type="submit" className="conteudoPrincipal-btn conteudoPrincipal-btn-cadastro">
                    Cadastrar
                </button>
                </div>
              </form>
            </div>
          </section>
        </main>
        <Rodape />{/*Usando o componente rodape*/}
      </div>
    )
  }
}
export default Categoria; //por padrao recebe o return e envia para o navegador 