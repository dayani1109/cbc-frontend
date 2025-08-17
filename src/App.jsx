
import './App.css'
import ProductCard from './components/productCard'

function App() {
  

  return (
    <>
      <h1>Dayani De Silva</h1>
      <ProductCard name ="Apple iPad" price = "$499" image = "https://www.apple.com/assets-www/en_WW/ipad/product_tile/small/ipad_air_7b24a6f0b_2x.png" />
      <ProductCard name ="Mac Book pro" price = "$1299" image = "https://www.apple.com/v/macbook-pro/as/images/overview/closer-look/3d_viewer_pf_16__flhf8phqnfyq_large_2x.jpg" />
    </>
  )
}

export default App
