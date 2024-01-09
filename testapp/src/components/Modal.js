import './Modal.css';  
const Modal = ({ onClose, pokemon }) => {
  return (
    <div className='modal-overlay'>
      <div className='modal-content'>
        <button className='modal-close-btn' onClick={onClose}>
          Close
        </button>
        {pokemon && (
          <div>
            <h2>{pokemon.name.fr} #{pokemon.id}</h2>
            <img src={pokemon.image} alt={pokemon.name.fr} />
            {/* Display other relevant data here */}
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;