import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import axios from 'axios';

function App() {
  const [shows, setShows] = useState([]);

  useEffect(() => {
    axios.get('https://api.tvmaze.com/search/shows?q=all')
      .then(response => {
        setShows(response.data);
      })
      .catch(error => {
        console.error('Error fetching shows:', error);
      });
  }, []);

  return (
    <Router>
      <div>
        <h1>TV Shows</h1>
        <Switch>
          <Route exact path="/">
            <ShowList shows={shows} />
          </Route>
          <Route path="/show/:id" component={ShowDetails} />
        </Switch>
      </div>
    </Router>
  );
}

function ShowList({ shows }) {
  return (
    <ul>
      {shows.map(show => (
        <li key={show.show.id}>
          <Link to={`/show/${show.show.id}`}>
            {show.show.name}
          </Link>
        </li>
      ))}
    </ul>
  );
}

function ShowDetails({ match }) {
  const [show, setShow] = useState(null);

  useEffect(() => {
    const { id } = match.params;
    axios.get(`https://api.tvmaze.com/shows/${id}`)
      .then(response => {
        setShow(response.data);
      })
      .catch(error => {
        console.error('Error fetching show details:', error);
      });
  }, [match.params]);

  if (!show) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>{show.name}</h2>
      <p>{show.summary}</p>
    </div>
  );
}

export default App;
