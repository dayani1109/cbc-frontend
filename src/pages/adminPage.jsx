import { Route, Routes } from "react-router-dom";

export default function AdminPage(){
    return(
        <div className = "w-full h-full bg-accent flex p-2">
            <div className = "w-[300px] h-full bg-accent ">
                
            </div>

            <div className = "w-[calc(100%-300px)] h-full border-[2px] border-boardercolor bg-primary rounded-[20px]">{/*w-> meke width eka sampurana with ekem (100%) adu karann 300px. calcuylation part danne calc() athule */}
                <Routes path = "/">
                    <Route path ="/" element = {<h1>Dashboard</h1>}/>
                    <Route path ="/products" element = {<h1>Products</h1>}/>
                    <Route path ="/orders" element = {<h1>Orders</h1>}/>
                    

                </Routes>
                    

            </div>
        </div>

    )
}