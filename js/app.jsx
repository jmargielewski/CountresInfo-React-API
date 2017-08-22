import React from 'react';
import ReactDOM from 'react-dom';

document.addEventListener('DOMContentLoaded', function(){

    class Header extends React.Component{
        render(){
            return (
                <header>
                    <h1 className='headerLogo'>Countries || Infoplease</h1>
                </header>
            )
        }
    }

    class Main extends React.Component{
        state = {
            errorApi : '',
            allDataApi : [],
            inputValue : '',
            countryInfo : '',
        }
        componentDidMount() {
            fetch(`https://restcountries.eu/rest/v2/all`)
            .then( response => response.json() )
            .then( data => {
                if( !data ){
                    this.setState({
                        errorApi : 'Nie odnaleziono danych',
                    });
                } else {
                    const allCountries = data.map(( country ) => {
                        return {
                            country : [
                                {
                                    name : country.name,
                                    capital : country.capital,
                                    region : country.region,
                                    population : country.population,
                                    area : country.area,
                                    timezones : country.timezones,
                                    currencies : country.currencies[0],
                                    flag : country.flag,
                                }
                            ]
                        }
                    });
                    this.setState({
                        allDataApi: allCountries,
                    });
                    console.log(allCountries);
                }
            });
        }
        handleCountryNameChange = ( event ) => {

            const userCountry = event.target.value;

            this.setState({
                inputValue : userCountry,
            });

            const countryInfo = this.state.allDataApi.map( ( listCountry ) => {
                console.log(listCountry.country[0].name);
                // poprawić mapowanie całej tablicy przy każdym changeu
                // poprawić walutę
                // walidacja wielkości pierwszej litery
                if (listCountry.country[0].name === userCountry){
                    const countryIInfo = <ul>
                        <li>{listCountry.country[0].name}</li>
                        <li>Capital city: {listCountry.country[0].capital}</li>
                        <li>Region: {listCountry.country[0].region}</li>
                        <li>Population: {listCountry.country[0].population}</li>
                        <li>Area: {listCountry.country[0].area} km<sup>2</sup></li>
                        <li>Time Zones: {listCountry.country[0].timezones}</li>
                        <li>Currencies: AFN Afghan afghani</li>
                        <li><img src={listCountry.country[0].flag}/></li>
                    </ul>;
                    this.setState({
                        countryInfo : countryIInfo,
                    });
                }
            })
        }
        render(){
            return (
                <main>
                    <div className='wrapCountrySerch'>
                        <label>Enter Country name:</label>
                        <input
                            type='text'
                            value={this.state.inputValue}
                            placeholder='Ex: Afghanistan, Yemen, Italy'
                            onChange={this.handleCountryNameChange}
                        />
                    </div>
                    <div className='countryInfo'>
                        {this.state.countryInfo}
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
                <div className='wrap'>
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
