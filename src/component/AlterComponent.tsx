'use clinet'

import { useState,useEffect } from "react"
import { memo } from "react"
type inputStringType = {
    inputString:string,
    showState : boolean
    onShowState : (value:boolean) => void,
}

const AlterComponent = memo( ({inputString,showState,onShowState} :inputStringType) =>{
    const [move,setMove] = useState<boolean>(true);
    useEffect(()=>{
        setMove(true);
        if(showState === false) return;
 
        setTimeout(()=>{
            onShowState(false);
        },2000)
    },[showState])
    return (
        <div className= {`
            fixed top-9/12 left-1/2 p-[16px] bg-white dark:bg-gray-800 z-1001 border-1 rounded-md 
            transition duration-500 ${showState ? "opacity-100" : "opacity-0"} ${move === true && showState === true ? "-translate-x-1/2 -translate-y-0":"-translate-x-1/2 -translate-y-1/2"}
        `}>
            <p>{inputString}</p>
        </div>
    )
})


AlterComponent.displayName = "AlterComponent";
export default AlterComponent;

// export default function AlterComponent( {inputString, showState , onShowState} : inputStringType ){
//     console.log("這裡是展示")
//     // if(showState){
//     //     setTimeout(()=>{
//     //         console.log("兩秒過去了")
//     //     },2000)
//     // }
//     return (
//         <div className="fixed ">
//             {inputString.map((index,key)=>{
//                 return <p key={key}>{index}</p>
//             })}
//         </div>
//     )
// }