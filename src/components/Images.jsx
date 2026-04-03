import { useState, useEffect } from "react";


export function Images({pokemons}) {

    function handleClick (pokemonName){
        console.log(pokemonName)
    }
    
    return (
        <div className="images">
            {pokemons.map((p) => {
                return (
                <div key={p.id} className="pokemonCard" onClick={() => handleClick(p.name)}>
                    <img src={p.image} width="100px"></img>
                    <span>{p.name}</span>
                </div>
                )
            })}
        </div>
    )
}