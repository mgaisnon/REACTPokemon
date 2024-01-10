import './Modal.css';
import React, {useState } from 'react';

/*  Fiche individuelle : 
    - Taille
    - Poids
    - Arbre des evolutions
    - Stats du pokemons*/

const Modal = ({ onClose, pokemon, types }) => {
  const [isShiny, setIsShiny] = useState(false);
  const [isGrowIn, setIsGrowIn] = useState(false);

  const toggleShiny = () => {
    setIsShiny(!isShiny);
    setIsGrowIn(true);

    // Réinitialisez l'effet de croissance après un court délai
    setTimeout(() => {
      setIsGrowIn(false);
    }, 300);
  };



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
          <img 
          className={`image-pokemon-modal ${isGrowIn ? 'grow-in' : ''}`}
          src={isShiny ? pokemon.image_shiny : pokemon.image} 
          alt="Ce pokemon n'a pas de forme Shiny" 
          onClick={toggleShiny}/>
          <div className='container-type-modal'>
            {getTypesNamesById(pokemon.types).map((typeName, index) => (
              <p className='type-modal'>
              <img  className="image-type-modal" src={getTypesImagesById(pokemon.types)[index]} alt={typeName} /> {typeName}
            </p>
            ))}
            </div>
        </div>
        
      )}
      <div className='modal-content-stats'>
          {pokemon && (
            <div>
              <h3 className='titre-stats'>Statistiques</h3>
              <p className='stats-pk'> HP : {pokemon.stats.hp}</p>
              <p className='stats-pk'> ATK : {pokemon.stats.atk}</p>
              <p className='stats-pk'> DEF : {pokemon.stats.def}</p>
              <p className='stats-pk'> VIT : {pokemon.stats.vit}</p>
              <p className='stats-pk'> SPE_ATK : {pokemon.stats.spe_atk}</p>
              <p className='stats-pk'> SPE_DEF : {pokemon.stats.spe_def}</p>
             </div> 
          )}
      </div>
      <div className='modal-content-evolution'>
          {pokemon && (
            <div>
              <h3 className='titre-evolution'>Evolution</h3>
              
            </div>
          )}
      </div>
    </div>
  </div>
  );
};

export default Modal;