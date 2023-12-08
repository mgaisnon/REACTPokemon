import { useEffect, useState } from 'react';
import './App.css';
import React from 'react';
import BlocPok from './components/blocpokemon';
import Logo from './media/logo.svg'
function App() {

  const [pokemons, setPokemons] = useState([]);
  const [types, setTypes] = useState([]);

  useEffect(() => {
    fetchPokemon();
    fetchTypes();
  }, []); // Le tableau vide en tant que dépendance garantit que useEffect s'exécute une seule fois à la création du composant
  
  const fetchPokemon = async () => {
    try {
      // Remplacez l'URL ci-dessous par l'URL réelle de votre API
      const response = await fetch('https://pokedex-api.3rgo.tech/api/pokemon');
      const responseData = await response.json();

      // Vérifiez si les données sont dans une propriété spécifique (par exemple, data)
      const data = responseData.data || [];

      setPokemons(data);
    } catch (error) {
      console.error('Erreur lors de la requete pokemons :', error);
    }
  };

  const fetchTypes = async () => {
    try{
      const response2 = await fetch('https://pokedex-api.3rgo.tech/api/types');
      const responseData2 = await response2.json();

      const datatypes = responseData2.data || [];
      setTypes(datatypes)
    } catch (error) {
      console.error('Erreur dans la requete types : ', error);
    }
  };

  const getTypesNamesById = (typeIds) => {
    return typeIds.map((typeId) => {
      const type = types.find((t) => t.id === typeId);
      return type ? type.name.fr : 'Type inconnu';
    });
  };

  const getTypesImageById = (typeImage) => {
    return typeImage.map((image) => {
      const type = types.find((t) => t.id === image);
      return type ? type.image : '';
    })
   
  };

  return (
    <div className='div-page'>
      <img className='img-logo'src={Logo}></img>
      <div className='container'>
        {pokemons.map((item, index) => (
            <BlocPok
            nompokemon={(item.name.fr)} 
            id={(item.id)} 
            image={(item.image)}
            typeimage={getTypesImageById(item.types)}
            typeid={getTypesNamesById(item.types)}/>            
        ))}
      </div>
      </div>
  );
};
export default App;
