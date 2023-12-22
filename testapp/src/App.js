import React, { useEffect, useState } from 'react';
import './App.css';
import Logo from './media/logo.svg';


function App() {
  const [pokemons, setPokemons] = useState([]);
  const [types, setTypes] = useState([]);
  const [filteredPokemons, setFilteredPokemons] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [genFilter, setgenFilter] = useState('');

  useEffect(() => {
    fetchPokemon();
    fetchTypes();
  }, []);

  useEffect(() => {
    fetchFiltre();
  },[searchTerm, pokemons])

  
  useEffect(() => {
    fetchFiltre();
  },[searchTerm, pokemons])

  const fetchFiltre = async () => {
    try {
      // Filtrer les Pokémon en fonction du terme de recherche
      const filtered = pokemons.filter(pokemon =>
        pokemon.name?.fr.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredPokemons(filtered);
    } catch (error) {
      console.error('Erreur lors de la requête pokemons :', error);
    }
  }

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
        <select className='Filtre-gen'>
          <option value="Genration">-- Generation --</option>
          <option value="Gen1">Generation 1</option>
          <option value="Gen2">Generation 2</option>
          <option value="Gen3">Generation 3</option>
          <option value="Gen4">Generation 4</option>
          <option value="Gen5">Generation 5</option>
          <option value="Gen6">Generation 6</option>
          <option value="Gen7">Generation 7</option>
          <option value="Gen8">Generation 8</option>
          <option value="Gen9">Generation 9</option>
        </select>
        <select className='Filtre-types'>
          <option value="Types">-- Types --</option>
          <option value="Feu">Feu</option>
          <option value="Plante">Plante</option>
          <option value="Eau">Eau</option>
          <option value="Acier">Acier</option>
          <option value="Combat">Combat</option>
          <option value="Dragon">Dragon</option>
          <option value="Electric">Electric</option>
          <option value="Fée">Fée</option>
          <option value="Glace">Glace</option>
          <option value="Insecte">Insecte</option>
          <option value="Normal">Normal</option>
          <option value="Poison">Poison</option>
          <option value="Psy">Psy</option>
          <option value="Roche">Roche</option>
          <option value="Sol">Sol</option>
          <option value="Spectre">Spectre</option>
          <option value="Ténèbres">Ténèbres</option>
          <option value="Vol">Vol</option>
        </select>
        <input type="search" 
        className="search"
        placeholder='Rechercher un Pokémon ...'
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}></input>
      </div>
      <div className='container'>
        {filteredPokemons.map((item) => (
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
