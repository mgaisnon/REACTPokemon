import './blocpokemon.css'
import React from 'react'
import { getTypesImageById } from '../App.js';

function BlocPok(props){

    return(
        <div className='card-pokemon'>
      <p className='titre-pokemon'>{props.nompokemon} #{props.id}</p>
      <img className='image-pokemon' src={props.image} alt={props.nompokemon} />
      <div className='div-types'>
        {props.types.map((typeName, index) => (
          <div key={index}>
            <img className='type-image' src={getTypesImageById(typeName)} alt={typeName} />
            <p className='type-name'>{typeName}</p>
          </div>
        ))}
      </div>
    </div>
    )

}
export default BlocPok;
