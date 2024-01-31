import { memo } from "react";


const FavoritePicture = ({ info, like }) => {
    return (
        <div className='gallery__picture'>
          <img src={info.url}></img>
          <div onClick={() => like(info.id)} className={info.isLiked ? 'favorite' : 'like'}></div>
        </div>
      )
}

export default memo (FavoritePicture);