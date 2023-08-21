import './MoviesCard.css';
import { useState } from 'react';
import imageError from '../../assets/images/no-photo.svg';

const MoviesCard = ({
  movie,
  isSavedMovies,
  onClick,
  isSaved,
}) => {
  const {
    duration,
    trailerLink,
    image,
    nameRU,
  } = movie;
  const [isImageError, setIsImageError] = useState(false);
  const movieImage = isSavedMovies ? image : `https://api.nomoreparties.co/${image.url}`;

  const handleClick = (evt) => {
    evt.target.classList.toggle('movies-card__save-btn_active');
    onClick(movie);
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
          src={!isImageError ? movieImage : imageError}
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
              onClick={handleClick}
            />
          )
          : (
            <button
              className={`movies-card__save-btn ${isSaved ? 'movies-card__save-btn_active' : ''} button-hover`}
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
