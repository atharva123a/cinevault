import React, { useState } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField
} from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

function MovieModal({ onClose, onSave }) {
  const [formData, setFormData] = useState({
    name: '',
    rating: '',
    cast: [],
    genre: '',
    releaseDate: null
  });

  const [ratingError, setRatingError] = useState('');
  const [nameError, setNameError] = useState('');
  const [castError, setCastError] = useState('');
  const [genreError, setGenreError] = useState('');
  const [releaseDateError, setReleaseDateError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Clear errors when input changes
    clearErrors(name);
  };

  const handleDateChange = (date) => {
    setFormData({ ...formData, releaseDate: date });
    clearErrors('releaseDate');
  };

  const clearErrors = (field) => {
    switch (field) {
      case 'name':
        setNameError('');
        break;
      case 'rating':
        setRatingError('');
        break;
      case 'cast':
        setCastError('');
        break;
      case 'genre':
        setGenreError('');
        break;
      case 'releaseDate':
        setReleaseDateError('');
        break;
      default:
        break;
    }
  };

  const handleSave = () => {
    // Validate required fields
    let hasError = false;

    if (!formData.name.trim()) {
      setNameError('Name is required');
      hasError = true;
    }

    if (!formData.rating.trim()) {
      setRatingError('Rating is required');
      hasError = true;
    } else {
      const rating = parseFloat(formData.rating);
      if (isNaN(rating) || rating < 0 || rating > 10) {
        setRatingError('Rating must be between 0 and 10');
        hasError = true;
      }
    }

    if (!formData.cast.length) {
      setCastError('Cast is required');
      hasError = true;
    }

    if (!formData.genre.trim()) {
      setGenreError('Genre is required');
      hasError = true;
    }

    if (!formData.releaseDate || formData.releaseDate == null) {
      setReleaseDateError('Release Date is required');
      hasError = true;
    }

    if (hasError) {
      return; // Don't save if there are validation errors
    }

    onSave(formData);
    onClose();
  };

  return (
    <Dialog open={true} onClose={onClose}>
      <DialogTitle>Add Movie</DialogTitle>
      <DialogContent>
        <DialogContentText>Please fill in the movie details:</DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          name="name"
          label="Name"
          type="text"
          fullWidth
          required
          error={!!nameError}
          helperText={nameError}
          value={formData.name}
          onChange={handleInputChange}
        />
        <TextField
          margin="dense"
          name="rating"
          label="Rating"
          type="number"
          fullWidth
          required
          error={!!ratingError}
          helperText={ratingError}
          value={formData.rating}
          onChange={handleInputChange}
        />
        <TextField
          margin="dense"
          name="cast"
          label="Cast (comma-separated)"
          type="text"
          fullWidth
          required
          error={!!castError}
          helperText={castError}
          value={formData.cast}
          onChange={handleInputChange}
        />
        <TextField
          margin="dense"
          name="genre"
          label="Genre"
          type="text"
          fullWidth
          required
          error={!!genreError}
          helperText={genreError}
          value={formData.genre}
          onChange={handleInputChange}
        />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            sx={{ pt: '1rem' }}
            label="Date Picker"
            format="YYYY/MM/DD"
            error={!!genreError}
            helperText={genreError}
            value={formData.releaseDate}
            onChange={handleDateChange}
          />
        </LocalizationProvider>
        {releaseDateError && (
          <div style={{ color: 'red', fontSize: '14px' }} className="error">
            {releaseDateError}
          </div>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Close
        </Button>
        <Button onClick={handleSave} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default MovieModal;
