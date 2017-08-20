import React from 'react';
import ReactDOM from 'react-dom';

document.addEventListener('DOMContentLoaded', function(){

    class Header extends React.Component{
        render(){
            return (
                <header>
                    <h1 className='headerLogo'>Country Info</h1>
                </header>
            )
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
                    const allCountries = data.map(( country ) => {
                        return {
                            country : [
                                {
                                    name: country.name,
                                    capital : country.capital,
                                    region : country.region,
                                    population : country.population,
                                    area : country.area,
                                    timezones : country.timezones,
                                    currencies : country.currencies,
                                    flag : country.flag,
                                }
                            ]
                        }
                    });
                    this.setState({
                        allDataApi: allCountries,
                    });
                    console.log(this.state.allDataApi[0].country[0].area, this.state.allDataApi[0].country[0].timezones, this.state.allDataApi[0].country[0].currencies, this.state.allDataApi[0].country[0].flag,);
                }
            });
        }
        render(){
            return (
                <main>
                    <div>
                        <input type='text' />
                        <button>serch</button>
                    </div>
                    <div>
                        <ul>
                            <li>Afghanistan</li>
                            <li>Kabul</li>
                            <li>Asia</li>
                            <li>27657145</li>
                            <li>652230</li>
                            <li>"UTC+04:30"</li>
                            <li> AFN Afghan afghani</li>
                            <li> <img src="https://restcountries.eu/data/afg.svg"/></li>
                        </ul>
                    </div>
                </main>
            )
        }
    }

    class Footer extends React.Component{
        render(){
            return <footer>&copy; Jakub Margielewski</footer>
        }
    }

    class App extends React.Component{
        render(){
            return(
                <div className="wrap">
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
