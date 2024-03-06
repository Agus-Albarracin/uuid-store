import  { useState } from 'react';

const ProductReview = () => {
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(0);

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleRatingChange = (value) => {
    setRating(value);
  };

  const handleSubmit = () => {
    // Aquí puedes implementar la lógica para enviar el comentario y la puntuación al servidor
    console.log('Comentario:', comment);
    console.log('Puntuación:', rating);

    // También puedes reiniciar los estados después de enviar la información
    setComment('');
    setRating(0);
  };

  return (
    <div className="max-w-7xl mx-auto mt-8 p-4 bg-white rounded-md shadow-md">
      <h2 className="text-2xl font-bold mb-4">Deja tu comentario y puntuación</h2>
      <div className="mb-4">
        <label htmlFor="comment" className="block text-sm font-medium text-gray-600">
          Comentario:
        </label>
        <textarea
          id="comment"
          value={comment}
          onChange={handleCommentChange}
          rows="4"
          className="mt-1 p-2 w-full border rounded-md"
        ></textarea>
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-600">Puntuación:</label>
        <div>
          {[1, 2, 3, 4, 5].map((value) => (
            <button
              key={value}
              onClick={() => handleRatingChange(value)}
              className={`focus:outline-none ${
                value <= rating ? 'text-yellow-500' : 'text-gray-300'
              } text-2xl mr-1`}
            >
              ★
            </button>
          ))}
        </div>
      </div>
      <button
        onClick={handleSubmit}
        className="h-14 px-6 py-2 font-semibold rounded-xl bg-red-500 hover:bg-red-400 text-white"
      >
        Enviar comentario
      </button>
    </div>
  );
};

export default ProductReview;
