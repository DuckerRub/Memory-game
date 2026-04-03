import { ImageCard } from "./ImageCard.jsx";


export function Images({pokemons, handleClick}) {    
    return (
     <div className="images">
              {pokemons.map((p) => {
                return (
                    <ImageCard p={p} handleClick={handleClick} key={p.id}/>
                )
            })}
      </div>
    )
}