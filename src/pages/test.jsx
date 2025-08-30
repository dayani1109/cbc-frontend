import { useState } from "react";

export default function TestPage(){

    {/* me react hook function ekem array ekk denava. e array eke dewal 2k thiyenva variable , function */}
    const[count,setCount] = useState(10);
    const[status,setStatus] = useState("online");

    


    return(
        <div className="w-full h-full flex justify-center items-center">
            <div className="w-[500px] h-[500px] bg-amber-200 text-white flex justify-center items-center gap-[25px]">
                <div className="flex justify-center items-center gap-[20px] flex-col">
                    <button onClick={
                        ()=>{
                            console.log("Decreasing.............");
                            setCount(count - 1);
                     
                        }
                    } className="w-[100px] bg-accent h-[40px] rounded-lg">
                        -
                    </button>

                    <span className="text-accent text-4xl">
                        {count}
                    </span>

                    <button onClick={
                        ()=>{
                            console.log("Increasing.............");
                            setCount(count + 1);
                    
                        }
                    } className="w-[100px] bg-accent h-[40px] rounded-lg">
                    +
                    </button>

                </div>

                <div className="flex flex-col justify-center items-center gap-[20px]">
                    <span className="text-a text-5xl">{status}</span>

                    <div className="flex flex-row gap-[20px]" >
                        <button onClick ={()=> setStatus("online")}className="w-[100px] bg-accent h-[40px] rounded-lg ">
                            online
                        </button>

                        <button onClick ={()=> setStatus("offline")} className="w-[100px] bg-accent h-[40px] rounded-lg">
                            offline
                        </button>

                        <button onClick ={()=> setStatus("deactivate")} className="w-[100px] bg-accent h-[40px] rounded-lg">
                            deactivate
                        </button>

                    </div>


                </div>

            </div>

        </div>
    )
}