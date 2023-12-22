import React, { useEffect, useState } from 'react';
import './App.css';
import Logo from './media/logo.svg';


function App() {
  const [pokemons, setPokemons] = useState([]);
  const [types, setTypes] = useState([]);

  useEffect(() => {
    fetchPokemon();
    fetchTypes();
  }, []);

  const fetchPokemon = async () => {
    try {
      const response = await fetch('https://pokedex-api.3rgo.tech/api/pokemon');
      const responseData = await response.json();
      const data = responseData.data || [];
      setPokemons(data);
    } catch (error) {
      console.error('Erreur lors de la requête pokemons :', error);
    }
  };

  const fetchTypes = async () => {
    try {
      const response2 = await fetch('https://pokedex-api.3rgo.tech/api/types');
      const responseData2 = await response2.json();
      const datatypes = responseData2.data || [];
      setTypes(datatypes);
    } catch (error) {
      console.error('Erreur dans la requête types : ', error);
    }
  };

  const getTypesNamesById = (typeIds) => {
    return typeIds.map((typeId) => {
      const type = types.find((t) => t.id === typeId);
      return type ? type.name.fr : 'Type inconnu';
    });
  };

  const getTypesImageById = (typeIds) => {
    return typeIds.map((typeId) => {
      const type = types.find((t) => t.id === typeId);
      return type ? type.image : '';
    });
  };

/** TODO
  Ajouter Generation à la card de tous les pokemons
 
  Filtre : 
    - Generation (gen1,2,3,4...)
    - Types (Eau, Feu, Dragon ...)

  Tri (croissant et decroissant): 
   - Numero
   - Alphabetique
   - Poids
   - Taille
  
  + Recherche par nom qui s'actualise au fur et a mesure que l'on ecrit

  Fiche individuelle : 
    - Numero
    - Nom
    - Generation
    - Image + Shiny
    - Type
    - Taille
    - Poids
    - Arbre des evolutions
    - Stats du pokemons

    Divers : responsive de l'app + Changement de langue  
  
 */

  return (
    <div className='div-page'>
      <img className='img-logo' src={Logo} alt='Logo' />
      <div className='filtre-div'>
        
        <input type="search" className="search"></input>
      </div>
      <div className='container'>
        {pokemons.map((item) => (
          <div className='card-pokemon' key={item.id}>
            <p className='titre-pokemon'>{item.name.fr} #{item.id}</p>
            <img className='image-pokemon' src={item.image} alt={item.name.fr} />
            <div className='div-types'>
              {item.types.map((typeId, index) => (
                <div className='div-type-single' key={index}>
                  <img className='type-image' src={getTypesImageById([typeId])} alt='Type' />
                  <p className='type-id'>{getTypesNamesById([typeId])}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
