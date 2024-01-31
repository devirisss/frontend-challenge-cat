import catLoad from '../images/catLoad.png';

const Loader = () => {

    return(
        <div className='loader'>
            <h1 className='loader__message'>Загружаем котиков...</h1>
            <img src={catLoad}></img>
        </div>
    )
}

export default Loader;