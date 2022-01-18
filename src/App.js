import React, { Component } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import './App.css';
import { Home, NotFound, MoviePlayer, Login, Payment } from './routes';
import { Header, Spinner, GetId } from './components';

import { API_KEY, API_URL, IMAGE_BASE_URL, BACKDROP_SIZE } from './config';
import { initFirebase } from './utils/firebase-config';
import { Provider } from 'react-redux';
import store from './store';
// import 'bootstrap/dist/css/bootstrap.css';
// import 'bootstrap/dist/css/bootstrap.min.css';
class App extends Component {

  state = {
    loading: true,
    movies: [],
    badge: 0,
    image: null,
    mTitle: '',
    mDesc: '',
    activePage: 0,
    totalPages: 0,
    searchText: ''
  }

  async componentDidMount() {
    try {
      initFirebase();
      const { data: { results, page, total_pages } } = await this.loadMovies();
      this.setState({
        movies: results,
        loading: false,
        activePage: page,
        totalPages: total_pages,
        image: `${IMAGE_BASE_URL}/${BACKDROP_SIZE}/${results[0].backdrop_path}`,
        mTitle: results[0].title,
        mDesc: results[0].overview
      })
    } catch (error) {
      console.log('error', error)
    }

  }

  loadMovies = () => {
    const page = this.state.activePage + 1;
    const url = `${API_URL}/movie/popular?api_key=${API_KEY}&page=${page}&language=fr`;
    return axios.get(url);

  }

  searchMovie = () => {
    const url = `${API_URL}/search/movie?api_key=${API_KEY}&query=${this.state.searchText}&language=fr`;
    return axios.get(url);

  }


  handleSearch = (value) => {
    try {
      this.setState({ loading: true, searchText: value, image: null }, async () => {
        const { data: { results, page, total_pages } } = await this.searchMovie();
        console.log('res', results);
        this.setState({
          movies: results,
          loading: false,
          activePage: page,
          totalPages: total_pages,
          image: `${IMAGE_BASE_URL}/${BACKDROP_SIZE}/${results[0].backdrop_path}`,
          mTitle: results[0].title,
          mDesc: results[0].overview
        })
      })
    } catch (error) {
      console.log('error', error)
    }
    console.log('handleSearch', value)

  }

  loadMore = async () => {
    try {
      this.setState({ loading: true })
      const { data: { results, page, total_pages } } = await this.loadMovies();
      console.log('res', results);
      this.setState({
        movies: [...this.state.movies, ...results],
        loading: false,
        activePage: page,
        totalPages: total_pages,
        image: `${IMAGE_BASE_URL}/${BACKDROP_SIZE}/${results[0].backdrop_path}`,
        mTitle: results[0].title,
        mDesc: results[0].overview
      })

    } catch (error) {
      console.log('error load more', error)
    }
    console.log('Load more')

  }

  render() {
    return (
      <Provider store={store}>
      <Router>
        <div className='App'>
          <Header badge={this.state.badge} />
          {!this.state.image ?
            (
              <Spinner />
            ) : (
              <Routes>
                <Route exact path='/' element={
                  <Home
                    {...this.state}
                    onSearchClick={this.handleSearch}
                    onButtonClick={this.loadMore}
                  />
                } />
                  <Route exact path='/player' element={
                    <MoviePlayer
                    />
                  } />

                {/* <Route path='/:id' exact element={<Details />} /> */}
                <Route path='/player/:id' exact component={GetId} element={<GetId component={'MoviePlayer'} />} />
                <Route path='/login' exact component={<Login />} element={<Login />} />
                <Route path='/payment' exact component={<Payment />} element={<Payment />} />
                <Route path='/:id' exact component={GetId} element={<GetId component={'Details'} />} />
          <Route path= '*' element= {<NotFound/>}/>
              </Routes>
            )
          }
        </div>
      </Router>
      </Provider>
    )
  }
}

export default App;
