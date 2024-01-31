
import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import GalleryPicture from './components/GalleryPicture';
import FavoritePicture from './components/FavoritePicture';
import Loader from './components/Loader';

function App() {

  const [pictures, setPictures] = useState([]);
  const [likedPictures, setLikedPictures] = useState([]);
  const [visibleFav, setVisibleFav] = useState(false);
  const [visibleHome, setVisibleHome] = useState(true);
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    getPicturesInfo()
  }, [])

  async function getPicturesInfo() {
    setLoading(true);
    const response = await axios.get('https://api.thecatapi.com/v1/images/search?limit=15', {
      headers: {
        'x-api-key': 'live_B0j4uTwHVwLdafaupf63QDlQCriYlxjEsyzX89LvJOWOuORt52AbCVeSBZqrQv2E'
      }
    })
    setPictures(response.data);
    setLoading(false);
  }

  const setLike = (id) => {
    let picture = pictures.find((item) => item.id == id);
    picture.isLiked = !picture.isLiked;
    setLikedPictures(pictures.filter((pic) => pic.isLiked));
  }

  const clickedFav = (e) => {
    e.preventDefault();
    setVisibleFav(true);
    setVisibleHome(false);
  }

  const clickedHome = (e) => {
    e.preventDefault();
    setVisibleHome(true);
    setVisibleFav(false);
  }



  return (
    <div className='container'>
      <header>
        <div onClick={clickedHome} className={visibleHome ? 'header__tab header__tab_active' : 'header__tab'}><p>Все котики</p></div>
        <div onClick={clickedFav} className={visibleFav ? 'header__tab header__tab_active' : 'header__tab'}><p>Любимые котики</p></div>
      </header>
      {loading ? 
      <Loader />
      :
      <> 
      {visibleHome ?
        <section className='gallery'>
          {pictures.map(item => <GalleryPicture like={setLike} info={item} key={item.id} />)}
        </section>
        :
        null
      }
      {visibleFav ?
        <section className='gallery'>
          {likedPictures.map(item => <FavoritePicture like={setLike} info={item} key={item.id} />)}
        </section>
        :
        null
      }
      </>
      }
      
    </div>
  );
}
export default App;
