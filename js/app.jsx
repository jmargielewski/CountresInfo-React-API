import React from 'react';
import ReactDOM from 'react-dom';

document.addEventListener('DOMContentLoaded', function(){

    class Header extends React.Component{
        render(){
            return <header>header...</header>
        }
    }

    class Main extends React.Component{
        render(){
            return <main>main...</main>
        }
    }

    class Footer extends React.Component{
        render(){
            return <footer>footer...</footer>
        }
    }

    class App extends React.Component{
        render(){
            return(
                <div>
                    <Header/>
                    <Main/>
                    <Footer/>
                </div>
            )
        }
    }

    ReactDOM.render(
        <App/>,
        document.getElementById('app')
    );
});
