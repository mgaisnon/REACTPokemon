import './Modal.css';  

/*  Fiche individuelle : 
    - Generation
    - Image + Shiny
    - Type
    - Taille
    - Poids
    - Arbre des evolutions
    - Stats du pokemons*/

const Modal = ({ onClose, pokemon, types }) => {
  const getTypesNamesById = (typeIds) => {
    if (Array.isArray(typeIds)) {
      return typeIds.map((typeId) => {
        const type = types.find((t) => t.id === typeId);
        return type ? type.name.fr : 'Type inconnu';
      });
    } else {
      return ['Type inconnu'];
    }
  };
  const getTypesImagesById = (typeIds) => {
    if (Array.isArray(typeIds)) {
      return typeIds.map((typeId) => {
        const type = types.find((t) => t.id === typeId);
        return type ? type.image : ''; // Retourne l'image du type ou une chaîne vide si le type n'est pas trouvé
      });
    } else {
      return ['']; // Retourne une chaîne vide si aucun type n'est fourni
    }
  };
  
  return (
    <div className='modal-overlay'>
      {pokemon && (
        <div>
          <p className='generation-modal'>{pokemon.generation}</p>
          <h2 className='titre-pokemon-modal'>{pokemon.name.fr} #{pokemon.id}</h2>
          <p className='close-button' onClick={onClose}> &#x274C;</p>
      </div>
      )}
    <div className='modal-content'>
      {pokemon && (
        <div>
          <img className='image-pokemon-modal' src={pokemon.image} alt={pokemon.name.fr} />
          <div className='container-type-modal'>
            {getTypesNamesById(pokemon.types).map((typeName, index) => (
              <p className='type-modal'>
              <img  className="image-type-modal" src={getTypesImagesById(pokemon.types)[index]} alt={typeName} /> {typeName}
            </p>
            ))}
            </div>
        </div>
      )}
    </div>
  </div>
  );
};

export default Modal;