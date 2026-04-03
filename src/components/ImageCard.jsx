export function ImageCard({p, handleClick}) {    
    return (
                <div className="pokemonCard" onClick={() => handleClick(p.id)}>
                    <img src={p.image} width="100px"></img>
                    <span>{p.name}</span>
                </div>
    )
}