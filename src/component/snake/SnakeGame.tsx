"use client";
import { useState, useEffect, useRef } from "react";
import PhoneSmooth from "@/component/PhoneSmooth";
export default function SnakeGame(){
    // 遊戲狀態 false = 關閉
    const [gameState, setGameState] = useState<boolean>(false);
    // 0 = 空 1 = 蛇 2 = 食物
    const [gameMap , setGameMap] = useState<(0|1|2)[][]> ([])
    // 遊戲模式 分為10*10 20*20 24*24 對應 0 1 2 
    const [gameMode,setGameMode] = useState<(0|1|2)> (0);
    const [gameModeSelect , setGameModeSelect] = useState<boolean>(false);
    const gameModeSelectColdDown = useRef<boolean>(true);


    // 手機板監控 啟動
    const [phoneControl , setPhoneControl] = useState<boolean>(false);
    // 手機控制的移動
    const [phoneMove,setPhoneMove] = useState<number>(0);
    // 貪吃蛇預計移動的方向 0 => 右 -90 => 上 -180 => 左 90 => 下
    const moveLast = useRef<number>(0);
    // 重新開始
    const reStartFunction = () =>{
        // 重製地圖
        const temp :(0|1|2)[][] = [];
        if(gameMode === 0){
            for(let i = 0 ; i < 10 ; i++){
                temp.push(Array(10).fill(0));
            }
        }else if(gameMode === 1){
            for(let i = 0 ; i < 20 ; i++){
                temp.push(Array(20).fill(0));
            }
        }else{
            for(let i = 0 ; i < 24 ; i++){
                temp.push(Array(24).fill(0));
            }
        }
        setGameMap(temp);
    }
    // 切換模式時 畫面需要重製。
    useEffect(()=>{
        console.log("確認初始化")
        reStartFunction();
    },[gameMode])
    // 開啟的話 啟動監聽(電腦版)
    useEffect(()=>{
        // 遊戲停止時 關閉手指滑動控制
        if(gameState === false){
            setPhoneControl(false);
            return;
        }else{
            // 遊戲開始 強制難度關閉選單
            setGameModeSelect(false);
            setPhoneControl(true);
            // 鍵盤部分 只負責刷新最後的Ref位置
            const computerKeyDown = (e:KeyboardEvent) =>{
                e.preventDefault();
                const input:string = e.key.toLowerCase();
                switch (input) {
                    case "arrowup":
                        moveLast.current = -90;
                        break;
                    case "w":
                        moveLast.current = -90;
                        break;

                    case "arrowdown":
                        moveLast.current = 90;
                        break;
                    case "s":
                        moveLast.current = 90;
                        break;
                    
                    case "arrowleft":
                        moveLast.current = -180;
                        break;
                    case"a":
                        moveLast.current = -180;
                        break;

                    case "arrowright":
                        moveLast.current = 0;
                        break;
                    case"d":
                        moveLast.current = 0;
                        break;
                }
            }
            window.addEventListener("keydown",computerKeyDown);
            setTimeout(()=>{
                console.log(`10秒到了 測試停止`);
                setGameState(false);
            },10000)
            return(()=>{
                window.removeEventListener("keydown",computerKeyDown)
            })
        }

        
    },[gameState])



    console.log("這裡是game的刷新")
    // 手機控制刷新方向
    useEffect(()=>{
        console.log(`這裡是game區收到的move , ${phoneMove}`);
        moveLast.current = phoneMove;
    },[phoneMove])


    // 開啟難度選單
    const openGameModeList = () =>{
        if(gameModeSelectColdDown.current === false)return;
        gameModeSelectColdDown.current = false;
        setGameModeSelect(!gameModeSelect);
        setTimeout(()=>{
            gameModeSelectColdDown.current = true;
        },500)
    }
    // 轉換模式
    const gameModeChange = (value?:string) =>{
        if(!value)return ;
        if(gameModeSelectColdDown.current === false)return;
        gameModeSelectColdDown.current = false;
        const moveValue:number = parseInt(value);
        if(moveValue !== 1 && moveValue !== 0 && moveValue !==2){
            return;
        }
        setGameMode(moveValue);
        setGameModeSelect(false);
        setTimeout(()=>{
            gameModeSelectColdDown.current = true;
        },500)
    }


    return (
    <div className="flex flex-col items-center justify-start w-full gap-[8px]">
        <div className="flex flex-col gap-[8px] w-full md:w-[400px]">
            <div className="w-full md:w-[400px]  flex flex-row items-center justify-around ">

                <div className="flex flex-row items-center flex-1">
                    <p className="flex-1 text-center">選擇難度:</p>
                    <div className="relative flex flex-col flex-1 w-full text-center">

                        <div className="flex-1 cursor-pointer gap-[4px] bg-white dark:bg-gray-800 hover:bg-gray-400 dark:hover:bg-gray-700 px-[8px] py-[4px] rounded-md" onClick={()=>{openGameModeList()}}>
                            <p >{gameMode === 0?"簡單": gameMode === 1 ? "普通" : "困難"}</p>
                        </div>

                        <div className={`flex-1 absolute z-2 grid gap-[4px] bg-white dark:bg-gray-800 top-full translate-y-[8px] w-full  text-center transition-all duration-500 ease-in-out overflow-hidden ${gameModeSelect?"border-2":""} `} style={{ gridTemplateRows:` ${gameModeSelect?"1fr":"0fr"}`}} >
                            <div className="overflow-hidden flex flex-col w-full ">
                                <p data-value = {0} onClick={(e)=>{gameModeChange((e.target as HTMLElement).dataset.value) }} className="px-[8px] py-[4px] rounded-md px-[8px] py-[4px] rounded-md hover:bg-gray-400 dark:hover:bg-gray-700 cursor-pointer">簡單</p>
                                <p data-value = {1} onClick={(e)=>{gameModeChange((e.target as HTMLElement).dataset.value) }} className="px-[8px] py-[4px] rounded-md px-[8px] py-[4px] rounded-md hover:bg-gray-400 dark:hover:bg-gray-700 cursor-pointer">普通</p>
                                <p data-value = {2} onClick={(e)=>{gameModeChange((e.target as HTMLElement).dataset.value) }} className="px-[8px] py-[4px] rounded-md px-[8px] py-[4px] rounded-md hover:bg-gray-400 dark:hover:bg-gray-700 cursor-pointer">困難</p>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            <div className=" flex flex-row items-center justify-around border-2 w-full text-center ">
                <div className="flex-1">
                    <p>得分</p>
                    <p></p>
                </div>
                <div className="flex-1">
                    <p>速度</p>
                    <p></p>
                </div>
                <div className="flex-1">
                    <p>地圖大小</p>
                    <p>{gameMode===0?"10 X 10":gameMode===1?"20 X 20":"24 X 24"}</p>
                </div>
            </div>
        </div>
        <div className={`relative grid  ${gameMode===0?"grid-cols-10":gameMode===1?"grid-cols-20": "grid-cols-24"}   aspect-square w-full  md:w-[400px] md:h-[400px] bg-white dark:bg-gray-800`}>
            {gameMap.map((rowIndex,colKey)=>{
                const temp : React.ReactNode[] = [];
                temp.push(rowIndex.map((cell,rowKey)=>{
                    return (
                        <div className= {`aspect-square border-2 ${cell===0?"":cell === 1?"bg-blue-500":"bg-green-500"}`}key={`${colKey}-${rowKey}`}>
                        </div>
                    )
                })
            )
            return temp;
            })}
            <div className={`absolute ${gameState?"hidden":"flex"} w-full h-full  items-center justify-center z-1 bg-white/50 dark:bg-gray-800/50 `}>
                <button type="button" className="bg-white dark:bg-gray-800 hover:bg-gray-400 dark:hover:bg-gray-700 p-[16px] border-2 cursor-pointer rounded-md"
                    onClick={()=>{setGameState(true)}}
                >開始</button>
            </div>
        </div>
        
        <PhoneSmooth useBoolean={phoneControl} moveState={0} onMove = {setPhoneMove} />
        {/* <div className={`absolute`}>
            <h2>Game Over</h2>
        </div> */}
    </div>)
}