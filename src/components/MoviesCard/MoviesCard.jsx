import './MoviesCard.css';
import { useState } from 'react';
import imageError from '../../assets/images/no-photo.svg';

const MoviesCard = ({
  movie: {
    duration, trailerLink, image, nameRU,
  },
  isSavedMovies,
}) => {
  const [isImageError, setIsImageError] = useState(false);

  const handleClick = (evt) => {
    evt.target.classList.toggle('movies-card__save-btn_active');
  };

  const convertDuration = () => {
    const minutes = duration % 60;
    const hours = Math.floor(duration / 60);
    return `${hours}ч ${minutes}м`;
  };

  const handleImageError = () => {
    setIsImageError(true);
  };

  return (
    <article className="movies-card">
      <a href={trailerLink} className="movies-card__link" target="_blank" rel="noreferrer">
        <img
          className={`movies-card__image ${isImageError ? 'movies-card__image_type_error' : ''}`}
          src={!isImageError ? image : imageError}
          alt={nameRU}
          onError={handleImageError}
        />
      </a>
      <div className={`movies-card__desc ${isSavedMovies ? 'movies-card__desc_type_saved-movies' : ''}`}>
        <h2 className="movies-card__title">{nameRU}</h2>
        {isSavedMovies
          ? (
            <button
              className="movies-card__delete-btn button-hover"
              type="button"
              aria-label="Сохранить"
            />
          )
          : (
            <button
              className="movies-card__save-btn button-hover"
              type="button"
              aria-label="Сохранить"
              onClick={handleClick}
            />
          )}

        <p className="movies-card__subtitle">{convertDuration()}</p>
      </div>
    </article>
  );
};

export default MoviesCard;
