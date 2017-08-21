import React from 'react';
import ReactDOM from 'react-dom';

document.addEventListener('DOMContentLoaded', function(){

    class Header extends React.Component{
        render(){
            return (
                <header>
                    <h1 className='headerLogo'>COUNTRY INFO</h1>
                </header>
            )
        }
    }

    class Main extends React.Component{
        state = {
            errorApi : '',
            allDataApi : [],
            inputValue : ''
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
                }
            });
        }
        handleCountryNameChange = ( event ) => {
            this.setState({
                inputValue : event.target.value,
            });
        }
        render(){
            return (
                <main>
                    <div className='wrapCountrySerch'>
                        <input
                            type='text'
                            value={this.state.inputValue}
                            placeholder="search..."
                            onChange='this.handleCountryNameChange'
                        />
                    </div>
                    <div className='countryInfo'>
                        <ul>
                            <li>Afghanistan</li>
                            <li>Capital city: Kabul</li>
                            <li>Region: Asia</li>
                            <li>Area: 27657145</li>
                            <li>Population: 652230</li>
                            <li>Time Zones: "UTC+04:30"</li>
                            <li>Currencies: AFN Afghan afghani</li>
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
