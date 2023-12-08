import './blocpokemon.css'
import React from 'react'

function BlocTypes(props){

    return(
        <div className='autre'>
            <p className='type-pokemon'>{props.typename} {props.typeid} </p>
            </div>
    )

}
export default BlocTypes;