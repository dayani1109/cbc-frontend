import { PiCodepenLogo } from "react-icons/pi"

export function loadCart(){
    let cartString = localStorage.getItem("cart")//"[item1,item2]" local eke cart eke data thama mekt ganne

    if(cartString  == null){
        localStorage.setItem("cart","[]")//cartstring ekk nathnm local eke empty array ekak save karagannva
        cartString = "[]"
    }

    const cart = JSON.parse(cartString)//methanadi meka aththa array ekk karanva

    return cart
}
//product ekk cart ekt add karagann function ek 
//me fun ekt dewal 2k pass vela enva 
//1.product details 2.kochchara quantity ekk envad kiyala enva
export function addToCart(product, quantity){ //quantity ek + or - venn puluvam
    let cart = loadCart()

    //cart eke dentamath item ek tiyed kiyala check karanva
    const existingItemIndex = cart.findIndex(//logic ek true vena valu eke index ek methan assign venne
        (item)=>{
            return item.productID == product.productID//item eke product id eke product eke product id ekat matchd
        }
    )

    if(existingItemIndex == -1){//item not in cart.. add new item to cart
        if(quantity<1){
            console.log("Quantity must be at least 1")
            return
        }

        const cartItem = {
            productID: product.productID,
            name: product.name,
            price: product.price,
            labelledPrice: product.labelledPrice,
            quantity: quantity,
            image: product.images[0]
        }
        cart.push(cartItem)//array ekt cartItem eke thiyen tikath add venva


    }else{//item already in cart

        const existingItem = cart[existingItemIndex]

        const newQuantity = existingItem.quantity + quantity

        if(newQuantity<1){// denat thiyena cart ekem me item ek remove karala (quantity <1 ek) ithuru tika gannva 
            cart = cart.filter(
                (item)=>{
                    return item.productID != product.productID
                }
            )
        }else{
            cart[existingItemIndex].quantity = newQuantity
        }
        
    }

    localStorage.setItem("cart",JSON.stringify(cart))//JSON.stringify - use this convert string
}
//cart eke total ek gannn function ek

export function getTotal(){
    const cart = loadCart()
    let total = 0

    cart.forEach(//cart eke thiyena hema item ekatm meka run karanna
        (item)=>{
            total += item.price * item.quantity
        }
    )
    return total// final total ek return karanva
}