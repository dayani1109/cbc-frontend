export default function ProductCard(props){//function ek hadanne new html tag ekak introduce karann. ethkot aniwa first letter Capital
    
    
    
    return(
        <div className = "productCard">
            <h1>{props.name}</h1>
            <p>{props.price}</p>
            <img 
                className = "productImage" 
                src = {props.image} />
            <button>Add to Cart</button>
        </div>
    )
}