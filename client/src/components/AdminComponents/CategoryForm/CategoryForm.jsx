import React, { useState } from 'react';
import axios from 'axios';

const CreateCategoryForm = () => {
  const [categoryName, setCategoryName] = useState('');
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/createCategory', { name: categoryName });
      alert('Categoría creada exitosamente');
      setCategoryName(''); 
    } catch (error) {
      console.error('Error al crear la categoría:', error);
      alert('Error al crear la categoría. Por favor, intenta de nuevo.');
    }
  };
  return (
    <div>
      <h2></h2>
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
    </div>
  );
};

export default CreateCategoryForm;
