import React, { useEffect, useState } from 'react';
import './App.css';
import Logo from './media/logo.svg';
import pikachu from './media/pikachu-running.gif'
import flagfr from './media/flagfr.png'
import flagus from './media/flagus.png'
import Modal from './components/Modal';
import Tri from './components/Tri';

function App() {

  const [pokemons, setPokemons] = useState([]);
  const [types, setTypes] = useState([]);
  const [filteredPokemons, setFilteredPokemons] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [genFilter, setgenFilter] = useState('');
  const [typefilter, settypeFilter] = useState('');
  const [loading, setLoading] = useState(true)
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [sortingOption, setSortingOption] = useState('');
  const [changeLang, setLang] = useState(true);

  const toggleLang = () => {
    setLang(!changeLang);
  };
  
  useEffect(() => {
    fetchPokemon();
    fetchTypes();
    const timer = setTimeout(() => {
      setLoading(false);
    }, 4700)
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    fetchFiltre();
  },[searchTerm, pokemons])
  
  useEffect(() => {
    fetchGeneration();
  },[genFilter, pokemons.generation])

  useEffect(() => {
    fetchTypesFilter();
  },[typefilter, pokemons.types])

  useEffect(() => {
    const filteredData = pokemons.filter((pokemon) =>
      pokemon.name?.fr.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredPokemons(filteredData);
  }, [searchTerm, pokemons]);

  
useEffect(() => {
  if (sortingOption) {
    const [property, order] = sortingOption.split(' ');
    const sortedData = [...filteredPokemons].sort((a, b) => {
      const valueA = getProperty(a, property);
      const valueB = getProperty(b, property);

      if (typeof valueA === 'number' && typeof valueB === 'number') {
        return order === 'asc' ? valueA - valueB : valueB - valueA;
      } else if (typeof valueA === 'string' && typeof valueB === 'string') {
        return order === 'asc' ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA);
      } else {
        return typeof valueA === 'number' ? -1 : 1;
      }
    });

    setFilteredPokemons(sortedData);
  }
}, [sortingOption, filteredPokemons]);

const getProperty = (obj, path) => {
  const properties = path.split('.');
  return properties.reduce((acc, current) => (acc && acc[current] !== undefined ? acc[current] : undefined), obj);
};
  const handleSort = (option) => {
    setSortingOption(option);
  };

  const handleGenerationChange = (event) => {
    setgenFilter(event.target.value);
  };
  
  const handleTypesChange = (event) => {
    settypeFilter(event.target.value);
  };

  const fetchGeneration = () => {
    try {
      const filteredGeneration = pokemons.filter((pokemon) => {
        const generationFilterCondition =
          genFilter === "" || pokemon.generation.toString() === genFilter;
  
        const typeFilterCondition =
          typefilter === "" || pokemon.types.includes(parseInt(typefilter));
  
        return generationFilterCondition && typeFilterCondition;
      });
      setFilteredPokemons(filteredGeneration);
    } catch (error) {
      console.error('Erreur lors de la requête pokemons : ', error);
    }
  };
  
  const fetchTypesFilter = () => {
    try {
      const filteredType = pokemons.filter((pokemon) => {
        const generationFilterCondition =
          genFilter === "" || pokemon.generation.toString() === genFilter;
  
        const typeFilterCondition =
          typefilter === "" || pokemon.types.includes(parseInt(typefilter));
  
        return generationFilterCondition && typeFilterCondition;
      });
      setFilteredPokemons(filteredType);
    } catch (error) {
      console.error('Erreur lors de la requête pokemons : ', error);
    }
  };
  
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
      return type ? (changeLang ? type.name.fr : type.name.en) : 'Type inconnu';
    });
  };

  const getTypesImageById = (typeIds) => {
    return typeIds.map((typeId) => {
      const type = types.find((t) => t.id === typeId);
      return type ? type.image : '';
    });
  };

  return (
    <div>
      
      {loading ? (
        <div className='loading-page'>
        <p className='titre-loading'>POKEDEX</p>
        <p className='auteur'>FARASSI Yassin - GAISNON Mathieu</p>
        <img src={pikachu} className='gif-pikachu'></img>
        </div>
      ) : (
    <div className='div-page'>
      <img className='img-logo' src={Logo} alt='Logo' />
      <div className='filtre-div'>
        <select className='Filtre-gen' onChange={handleGenerationChange}>
          <option value="">  Generations </option>
          <option value="1">Generation 1</option>
          <option value="2">Generation 2</option>
          <option value="3">Generation 3</option>
          <option value="4">Generation 4</option>
          <option value="5">Generation 5</option>
          <option value="6">Generation 6</option>
          <option value="7">Generation 7</option>
          <option value="8">Generation 8</option>
          <option value="9">Generation 9</option>
        </select>
        <select className='Filtre-types' onChange={handleTypesChange}>
          <option value=""> Types </option>
          <option value="7">Feu</option>
          <option value="11">Plante</option>
          <option value="4">Eau</option>
          <option value="1">Acier</option>
          <option value="2">Combat</option>
          <option value="3">Dragon</option>
          <option value="5">Electric</option>
          <option value="6">Fée</option>
          <option value="8">Glace</option>
          <option value="9">Insecte</option>
          <option value="10">Normal</option>
          <option value="12">Poison</option>
          <option value="13">Psy</option>
          <option value="14">Roche</option>
          <option value="15">Sol</option>
          <option value="16">Spectre</option>
          <option value="17">Ténèbres</option>
          <option value="18">Vol</option>
        </select>
        <input type="search" 
        className="search"
        placeholder='Rechercher un Pokémon ...'
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}></input>
        {/* Componnent Tri*/}
        <Tri onSort={handleSort}/>
          <button onClick={toggleLang} className='langue'>Changer de langue</button>
      </div>
      {showModal && (
            <Modal onClose={() => setShowModal(false)} allpokemon={pokemons}pokemon={selectedPokemon} types={types} langue={changeLang}></Modal>
          )}

      <div className='container' >
        {filteredPokemons.map((item) => (
          <div className='card-pokemon' key={item.id} onClick={() => {setShowModal(true); setSelectedPokemon(item)}}>
            <p className='gen'>{item.generation}</p>
            <p className='titre-pokemon'>{changeLang ? item.name.fr : item.name.en} #{item.id}</p>
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
    </div>)}
    </div>
  );
}

export default App;
