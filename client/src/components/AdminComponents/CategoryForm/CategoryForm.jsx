import React, { useState } from 'react';
import axios from 'axios';

const CreateCategoryForm = ({ onCategoryCreated }) => {
  const [categoryName, setCategoryName] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/createCategory', { name: categoryName });
      if (response.status === 201) {
        setCategoryName('');
        setError('');
        onCategoryCreated(); // actualiza la lista de categorías
        alert('Categoría creada exitosamente');
      } else {
        throw new Error('No se pudo crear la categoría');
      }
    } catch (error) {
      console.error('Error al crear la categoría:', error);
      alert('Error al crear la categoría.');
    }
  };

  return (
      <div>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="categoryName">Nombre de la Categoría:</label>
          <input
            type="text"
            id="categoryName"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            required
          />
        </div>
        <button type="submit">Crear Categoría</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default CreateCategoryForm;
