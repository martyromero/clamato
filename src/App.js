import React, { Component } from 'react';
import './App.css';
import MovieRow from './MovieRow.js'
import $ from 'jquery'

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {}

    this.performSearch("ant man")
  }

  performSearch(searchTerm) {
    console.log("Perform search using moviedb")
    const urlString = "https://api.themoviedb.org/3/search/movie?api_key=1b5adf76a72a13bad99b8fc0c68cb085&query=" + searchTerm
    $.ajax({
      url: urlString,
      success: (searchResults) => {
        console.log("Fetched data successfully")
        // console.log(searchResults)
        const results = searchResults.results
        // console.log(results[0])

        var movieRows = []

        results.forEach((movie) => {
          movie.poster_src = "https://image.tmdb.org/t/p/w185" + movie.poster_path
          // console.log(movie.poster_path)
          const movieRow = <MovieRow key={movie.id} movie={movie}/>
          movieRows.push(movieRow)
        })

        this.setState({rows: movieRows})
      },
      error: (xhr, status, err) => {
        console.error("Failed to fetch data")
      }
    })
  }

  searchChangeHandler(event) {
    console.log(event.target.value)
    const boundObject = this
    const searchTerm = event.target.value
    boundObject.performSearch(searchTerm)
  }

  render() {
    return (
      <div>
        
        <table className="appHead">
          <tbody>
            <tr>
              <td>
                <img alt="app icon" width="50" src="icn-clamato-logo.png"/>
                <p className="appName">Clamato Movies DB</p>
              </td>

            </tr>
          </tbody>
        </table>

        <input style={{
          fontSize: 16,
          display: 'block',
          width: "97%",
          paddingTop: 8,
          paddingBottom: 8,
          paddingLeft: 16,
          marginTop: 10,
          marginBottom: 30,
          border: "1px solid #d7d7d7"
        }} onChange={this.searchChangeHandler.bind(this)} placeholder="Movie Title"/>

        {this.state.rows}

      </div>
    );
  }
}

export default App;
