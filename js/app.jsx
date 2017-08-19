import React from 'react';
import ReactDOM from 'react-dom';

document.addEventListener('DOMContentLoaded', function(){

    class Header extends React.Component{
        constructor(props) {
            super(props);

            this.state = {
                seconds : 0,
            };
        }
        componentDidMount(){
            this.intervalId = setInterval(() => {
                this.setState({
                    seconds : this.state.seconds + 1
                });
            },1000);
        }
        componentWillUnmount(){
            clearInterval(this.intervalId);
        }
        render(){
            return <header>
                <h1>{this.props.content} {this.state.seconds}</h1>
                </header>
        }
    }

    class Main extends React.Component{
        state = {
            errorApi : '',
            allDataApi : [],
        }
        componentDidMount() {
            fetch(`https://restcountries.eu/rest/v2/all`)
            .then( response => response.json() )
            .then( data => {
                if( !data ){
                    this.setState({
                        errorApi : "Nie odnaleziono danych",
                    });
                } else {
                    const allCountries = data.map(( countries ) => {
                        return {
                            countries : [
                                {
                                    name: countries.name,
                                }
                            ]
                        }
                    });
                    this.setState({
                        allDataApi: allCountries,
                    });
                    console.log(this.state.allDataApi[0].countries[0].name);
                }
            });
        }
        render(){
            return <main>main...</main>
        }
    }

    class Footer extends React.Component{
        render(){
            return <footer>footer... &copy; Jakub Margielewski</footer>
        }
    }

    class App extends React.Component{
        render(){
            return(
                <div>
                    <Header content='LOGO'/>
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
