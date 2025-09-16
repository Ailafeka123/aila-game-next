"use client";
import { useState, useEffect, useRef, memo, useMemo } from "react";
import PhoneSmooth from "@/component/PhoneSmooth";
import CreateImage from "@/component/createImage";
import { useTranslations } from "next-intl";
// 設定蛇的物件資料
type snakeData = {
    body:[number,number][],
    food:[number,number],
    speed:number,
    getScore:number,
    space:Array<Set<number>>
}
type snakeMapType = (0|1|2|3|4)[][];

export default function SnakeGame(){
    const t = useTranslations("snake");
    // 遊戲狀態 false = 關閉
    const [gameState, setGameState] = useState<boolean>(false);
    // 遊戲模式部分 分為10*10 20*20 24*24 對應 0 1 2 
    const [gameMode,setGameMode] = useState<(0|1|2)> (0);
    // 控制地圖大小 刷新memo地圖使用
    const [gameSize ,setGameSize] = useState<10|20|24>(10);
    const [gameModeSelect , setGameModeSelect] = useState<boolean>(false);
    const gameModeSelectColdDown = useRef<boolean>(true);
    // 開始遊戲操控部分
    // 手機板監控 啟動
    const [phoneControl , setPhoneControl] = useState<boolean>(false);
    // 手機控制的移動 確認刷新ref
    const [phoneMove,setPhoneMove] = useState<number>(-90);
    // 貪吃蛇預計移動的方向 0 => 右   -90 => 上     -180 => 左     90 => 下
    const moveLast = useRef<number>(-90);
    // 貪吃蛇上一個移動方向 需紀錄 避免直接變成迴轉
    const lastMove = useRef<number>(-90);
    // 確認進到CSR
    const [loading,setLoding] = useState<boolean>(false);
    // 身體陣列 => 知道哪些是身體與排序 可以拆分頭與尾巴
    // 食物 => 判定增長 
    // 由這些組成所謂的Map
    // 0 = 空 1 = 蛇頭 2 = 蛇身 3 = 食物  4 = 碰撞
    const snakeData = useRef<snakeData>({
        body:[[5,5],[6,5],[7,5]],
        food:[1,1],
        speed:2,
        getScore:0,
        space:[],
    })
    // 抓取memo的資料
    const snakeMapData = useRef<snakeMapType>([])
    // 判定蛇進行動作 然後再去刷新動畫
    const [snakeMove,setSnakeMove] = useState<number>(-1);
    // 蛇的動畫刷新 觸發memo用  -1為尚未開始
    const [snakeMoveAnimate , setSnakeMoveAnimate] = useState<number>(-1);
    // 結算畫面 
    // -1 = 初始化   
    // 0 = 撞到牆 
    // 1 = 吃到身體
    const [gameEnd,setGameEnd] = useState<number>(-1);
    // 結算畫面的開關
    const [endView , setEndView] = useState<boolean>(false);
    // 結算畫面顯示
    const endMap = useRef<snakeMapType>([])
    // 結算分數
    const getEndNumber = useRef<[number,number]>([0,0]);
    const userScroll = useRef<number>(0);
    // 抓取顯示圖片 轉成image
    const changeImageDiv = useRef<HTMLDivElement>(null);
    const [imgSrc, setImgSrc] = useState<string | null>(null);


    useEffect(()=>{
        setLoding(true)
    },[])
    // 開啟難度選單
    const openGameModeList = () =>{
        // 遊戲開起時 不可以開啟選單
        if(gameState === true)return
        // 冷卻是否完成
        if(gameModeSelectColdDown.current === false)return;
        gameModeSelectColdDown.current = false;
        setGameModeSelect(!gameModeSelect);
        setTimeout(()=>{
            gameModeSelectColdDown.current = true;
        },300)
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
        },300)
    }
    // 根據難度調整地圖大小
    useEffect(()=>{
        // 遊戲開啟時 不可以調整難度
        if(gameState)return 
        if(gameMode === 0){
            setGameSize(10)
        }else if(gameMode === 1){
            setGameSize(20)
        }else{
            setGameSize(24)
        }
        reStartFunction();
    },[gameMode])
    // 重新開始
    const reStartFunction = () =>{
        // 將貪吃蛇所有資訊重製 觸發useMemo
        setSnakeMoveAnimate(-1);
        setSnakeMove(-1)
        // 方向重製
        moveLast.current = -90;
        lastMove.current = -90;
    }


    // 遊戲開始監控區
    // 開啟的話 啟動監聽(電腦版)
    useEffect(()=>{
        // 遊戲停止時 關閉手指滑動控制
        if(gameState === false){
            setPhoneControl(false);
            reStartFunction();
            return;
        }else{
            // 遊戲開始 強制難度關閉選單
            setGameModeSelect(false);
            setPhoneControl(true);
            const userGame = document.getElementById("game");
            if(userGame){
                const rect  = userGame.getBoundingClientRect();
                const elementTop = rect.top + window.scrollY; // 元素頂部在整個頁面的位置
                const elementHeight = rect.height;
                const viewportHeight = window.innerHeight;
                const scrollTo = elementTop - (viewportHeight / 2) + (elementHeight / 2);
                window.scrollTo({ top: scrollTo, behavior: "smooth" });

            }
            // 鍵盤部分 只負責刷新最後的Ref位置
            const computerKeyDown = (e:KeyboardEvent) =>{
                e.preventDefault();
                const input:string = e.key.toLowerCase();
                let willMove:number = -666
                switch (input) {
                    case "arrowup":
                        willMove = -90;
                        break;
                    case "w":
                        willMove = -90;
                        break;

                    case "arrowdown":
                        willMove = 90;
                        break;
                    case "s":
                        willMove = 90;
                        break;
                    
                    case "arrowleft":
                        willMove = -180;
                        break;
                    case"a":
                        willMove = -180;
                        break;

                    case "arrowright":
                        willMove = 0;
                        break;
                    case"d":
                        willMove = 0;
                        break;
                    default:
                        break;
                }
                if( (willMove + lastMove.current) === 0 || (willMove + lastMove.current) === -180 || willMove === -666){
                    return;
                }else{
                    moveLast.current = willMove
                }
            }
            window.addEventListener("keydown",computerKeyDown);
            // 設定0 為遊戲開始 然後開啟蛇蛇行動
            setTimeout(()=>{
                setSnakeMove(0)
            }, Math.floor(1000/snakeData.current.speed) )

            return(()=>{
                window.removeEventListener("keydown",computerKeyDown)
            })
        }
    },[gameState])

    // 手機控制刷新方向
    useEffect(()=>{
        // 進行判斷 避免返回直接撞身體
        if( (phoneMove + lastMove.current) === 0 || (phoneMove + lastMove.current) === -180){
            return;
        }else{
            moveLast.current = phoneMove;
        }
    },[phoneMove])
    // 基本監控結束
    // 設定貪吃蛇的行動

    // 貪吃蛇行動
    useEffect(()=>{
        // 沒開始 也不需要移動
        if(gameState === false) return;
        // 初始化 不需要移動
        if(snakeMove === -1) return;
        // 保險用 再次讓第一步 畢竟往上 手機也是同步
        if(snakeMove === 0){
            moveLast.current = -90;
            setPhoneMove(-90)
        }
        //  抓取蛇的資料
        const snakeHeader : [number,number] =snakeData.current.body[0];
        // // 判斷要往那邊
        // // 上 左 下 右
        const nextMove:[number,number] = [...snakeHeader]
        if(moveLast.current === -90){
            nextMove[0]--
        }else if(moveLast.current === -180){
            nextMove[1]--
        }else if(moveLast.current === 90){
            nextMove[0]++
        }else{
            nextMove[1]++
        }
        // 行動完成 更新上一動 且同步滑動物件 避免交錯使用的錯誤
        lastMove.current = moveLast.current;
        setPhoneMove(moveLast.current)
        // 邊界
        if(nextMove[0] >= gameSize || nextMove[1]>=gameSize || nextMove[0] < 0 || nextMove[1] < 0){
            // 紀錄畫面
            snakeMapData.current[snakeHeader[0]][snakeHeader[1]] = 4
            endMap.current = snakeMapData.current;
            // 設定死亡 與 得分
            setGameEnd(0)
            getEndNumber.current[0] = snakeData.current.getScore;
            getEndNumber.current[1] = Math.max(getEndNumber.current[1],snakeData.current.getScore);
            setGameState(false);
        // 看看有沒有吃到食物
        
        }else if(nextMove[0] === snakeData.current.food[0] && nextMove[1] === snakeData.current.food[1]){
            // 有的話 進行畫面更新
            snakeMapData.current[nextMove[0]][nextMove[1]] = 1;
            snakeMapData.current[snakeHeader[0]][snakeHeader[1]] = 2;
            // 推到頭部與得到一分
            snakeData.current.body.unshift([nextMove[0],nextMove[1]]);
            snakeData.current.getScore++;
            snakeData.current.speed = 2 + snakeData.current.getScore/10;
            // 再次設定食物
            // 製作空白的row 地圖
            const rowMap :number[] = []
            for(let i = 0 ; i < gameSize ; i++){
                rowMap.push(i);
            }
            while(rowMap.length !== 0){
                const row =  rowMap[Math.floor(rowMap.length * Math.random())];
                // 這個字典被清空了 避免下一輪再次抽到 
                if(snakeData.current.space[row].size === 0){
                    rowMap.splice(row,1)
                    continue;
                }else{
                    const colNumber = Math.floor(snakeData.current.space[row].size * Math.random());
                    const col = [...snakeData.current.space[row]][colNumber];
                    // 這樣就有新的位置了 保存 並離開這個循環
                    snakeMapData.current[row][col] = 3;
                    snakeData.current.food = [row,col];
                    snakeData.current.space[row].delete(col);
                    break;
                }
            }
        // 沒有吃到 則判斷有沒有撞到身體
        }else{
            // 先更新尾巴位置
            const tail = snakeData.current.body.pop();
            if(tail){
                snakeMapData.current[tail[0]][tail[1]] = 0
                snakeData.current.space[tail[0]].add(tail[1]);
            }
            if(snakeData.current.space[nextMove[0]].has(nextMove[1])){
                // 有的話 進行畫面更新
                snakeMapData.current[nextMove[0]][nextMove[1]] = 1;
                snakeMapData.current[snakeHeader[0]][snakeHeader[1]] = 2;
                // 把位置推到頭部
                snakeData.current.body.unshift([nextMove[0],nextMove[1]]);
                // 刪除空間
                snakeData.current.space[nextMove[0]].delete(nextMove[1]);
            }else{
                // 撞到身體 遊戲結束
                // 紀錄畫面
                snakeMapData.current[nextMove[0]][nextMove[1]] = 4;
                endMap.current = snakeMapData.current;
                // 設定死亡 與 得分
                setGameEnd(1)
                getEndNumber.current[0] = snakeData.current.getScore;
                getEndNumber.current[1] = Math.max(getEndNumber.current[1],snakeData.current.getScore);
                setGameState(false);

            }
        }
        setSnakeMoveAnimate(index=>index+1);
    },[snakeMove])

    // 如果還沒結束 則繼續讓蛇行動
    useEffect(()=>{
        if(gameState === false) return;
        setTimeout(()=>{
            setSnakeMove(index=>index+1);
        },Math.floor(1000/snakeData.current.speed))
    },[snakeMoveAnimate])




    // 每當貪吃蛇要行動 與地圖尺寸發生變化時 將新的地圖資料挑整出來
    const gameMapData:snakeMapType = useMemo(()=>{
        if(loading === false) return [];
        let temp:snakeMapType = Array(gameSize);
        // 地圖初始化的變化
        if(snakeMoveAnimate === -1){
            // 初始化地圖資訊與空白格
            const tempSpace : Set<number>[] = [];
            for(let i = 0 ; i < gameSize ; i++){
                const rowTemp = Array(gameSize).fill(0);
                temp[i] = rowTemp
                const SpaceSet : Set<number> = new Set();
                for(let cell = 0 ; cell < gameSize ; cell++){
                    SpaceSet.add(cell);
                }
                tempSpace.push(SpaceSet);
            }
            snakeData.current.space = tempSpace;
            // 清除已被佔據設定並顯示
            // 設定蛇身
            const centerPosition : number = Math.floor(gameSize/2) - 1;
            // 需要先設定 方便抓取
            for(let i = 0 ; i < 3 ; i++){
                tempSpace[centerPosition+i].delete( (centerPosition));
                if(i === 0){
                    temp[centerPosition+i][centerPosition] = 1; 
                }else{
                    temp[centerPosition+i][centerPosition] = 2;
                }
            }
            // 設定食物
            const foodRow:number = Math.floor(Math.random()*gameSize);
            const foodCol:number = [...tempSpace[foodRow] ] [Math.floor(Math.random()*tempSpace[foodRow].size)];
            temp[foodRow][foodCol] = 3;
            tempSpace[foodRow].delete(foodCol);
            // 最後蛇的資料設定
            snakeData.current = {
                body:[[centerPosition,centerPosition],[centerPosition+1,centerPosition],[centerPosition+2,centerPosition]],
                food:[foodRow,foodCol],
                speed:2,
                getScore:0,
                space:tempSpace
            }
            snakeMapData.current = temp;
            return temp;
        }else{
            temp = snakeMapData.current
        }
        return temp;
    },[snakeMoveAnimate,gameSize,loading])
    // 提高貪吃蛇地圖效能 避免每次都重製
    const SnakeMap = memo(({gameMap}:{gameMap:snakeMapType})=>{
        // 如果是空的 則回傳這個
        if(gameMap.length === 0){
            return (
                <div>
                    <p className="text-red-500">圖片顯示錯誤</p>
                </div>
            )
        }
        return(
            <div className={`relative grid  ${gameMode===0?"grid-cols-10":gameMode===1?"grid-cols-20": "grid-cols-24"} border  aspect-square w-full  md:w-[400px] md:h-[400px] bg-white dark:bg-gray-800`}>
                {gameMap.map((rowIndex,colKey)=>{
                    const temp : React.ReactNode[] = [];
                    temp.push(rowIndex.map((cell,rowKey)=>{
                        return (
                            <div className= {`aspect-square border ${cell===0?"":cell === 1?"bg-blue-500":cell===2?"bg-blue-900":cell===3?"bg-green-500":"bg-red-500"}`}key={`${colKey}-${rowKey}`}>
                            </div>
                        )
                    })
                )
                return temp;
                })}
            </div>
        )
    })
    // memo的名稱抓不到 所以再次命名
    SnakeMap.displayName = "SnakeMap"


    // 結算畫面
    useEffect(()=>{
        // 結算初始化 關閉窗口
        if(gameEnd === -1){
            // console.log("關閉分享")
            setEndView(false);
            return;
        }
        // 死亡了 顯示結算
        // console.log("開啟分享畫面")
        handleCapture();
        userScroll.current = window.scrollY;
        setEndView(true);
    },[gameEnd])
    useEffect(()=>{
        if(endView === false)return;
        handleCapture();
    },[endView])

    const handleCapture = () => {
        if (!changeImageDiv.current) return;
        const img = CreateImage({ div: changeImageDiv.current });
        setImgSrc(img.src);
    };



    // 測試分享 (暫時不設定 理想需要截圖與截圖分享)
    const handleShare = async () => {
        if (navigator.share) {
            try {
                if (!imgSrc) return;
                const response = await fetch(imgSrc);
                const blob = await response.blob();
                const file = new File([blob], "snake-map.png", { type: "image/png" });
                await navigator.share({
                    title: t("shareTitle"),
                    files:[file],
                    text: `${t("shareText")} ${getEndNumber.current[0]}`,
                    url: window.location.href,
                });
                console.log("分享成功！");
            } catch (err) {
                console.log("使用者取消或發生錯誤", err);
            }
        } else {
            alert("你的瀏覽器不支援分享功能");
        }
    };


    return (
    <>
        <header className="flex flex-col gap-[8px] w-full md:w-[400px]">

            <div className="w-full md:w-[400px]  flex flex-row items-center justify-around ">

                <div className="flex flex-row items-center flex-1">
                    <p className="flex-1 text-center">選擇難度:</p>
                </div>
                <div className="relative flex flex-col flex-1 w-full text-center">

                    <div className={` gap-[4px] bg-white dark:bg-gray-800  px-[8px] py-[4px] rounded-md border-2 ${gameState === true?"cursor-no-drop" :"hover:bg-gray-400 dark:hover:bg-gray-700 cursor-pointer" }`} onClick={()=>{openGameModeList()}}>
                        <p >{gameMode === 0?"簡單": gameMode === 1 ? "普通" : "困難"}</p>
                    </div>

                    <div className={`absolute z-2 grid gap-[4px] bg-white dark:bg-gray-800 top-full translate-y-[8px] w-full  text-center transition-all duration-300 ease-in-out overflow-hidden ${gameModeSelect?"border-2":""} `} style={{ gridTemplateRows:` ${gameModeSelect?"1fr":"0fr"}`}} >
                        <div className="overflow-hidden flex flex-col w-full ">
                            <p data-value = {0} onClick={(e)=>{gameModeChange((e.target as HTMLElement).dataset.value) }} className=" px-[8px] py-[4px] rounded-md  hover:bg-gray-400 dark:hover:bg-gray-700 cursor-pointer">簡單</p>
                            <p data-value = {1} onClick={(e)=>{gameModeChange((e.target as HTMLElement).dataset.value) }} className=" px-[8px] py-[4px] rounded-md  hover:bg-gray-400 dark:hover:bg-gray-700 cursor-pointer">普通</p>
                            <p data-value = {2} onClick={(e)=>{gameModeChange((e.target as HTMLElement).dataset.value) }} className=" px-[8px] py-[4px] rounded-md  hover:bg-gray-400 dark:hover:bg-gray-700 cursor-pointer">困難</p>
                        </div>
                    </div>

                </div>
                

            </div>

            <div className=" flex flex-row items-center justify-around border w-full text-center ">
                <div className="flex-1 h-full border">
                    <p>得分</p>
                    <p>{snakeData.current.getScore}</p>
                </div>
                <div className="flex-1 h-full border">
                    <p>速度</p>
                    <p>{`${snakeData.current.speed}/s`}</p>
                </div>
                <div className="flex-1 h-full border">
                    <p>地圖大小</p>
                    <p>{`${gameSize} X ${gameSize}`}</p>
                </div>
            </div>
        </header>

        <div className={`relative border  aspect-square w-full  md:w-[400px] md:h-[400px] bg-white dark:bg-gray-800`} id="game">
            <SnakeMap gameMap={gameMapData}/>
            <div className={`absolute ${gameState?"hidden":"flex"} w-full h-full top-0  items-center justify-center z-1 bg-white/50 dark:bg-gray-800/50 `}>
                <button type="button" className="bg-white dark:bg-gray-800 hover:bg-gray-400 dark:hover:bg-gray-700 p-[16px] border-2 cursor-pointer rounded-md"
                    onClick={()=>{setGameState(true)}}
                >開始</button>
            </div>
        </div>
        {/* 遊戲結束結算畫面 */}
        {endView&&
        <div className={`fixed top-0 left-0 w-svw h-svh bg-white/50 dark:bg-gray-800/50 z-1000`}   >
            <div className={`fixed top-[50%] left-[50%] 
            w-full aspect-square md:w-auto border-2 rounded-md -translate-1/2 z-1000 
            flex flex-col items-center justify-around gap-[8px] bg-white dark:bg-gray-800 
            p-[16px] `} >
                <h3>遊戲結束</h3>
                <p>死亡原因:{gameEnd === 0? "撞到牆" : gameEnd === 1? "咬到身體" : "不明"}</p>
                <div className="flex flex-row gap-[8px]">
                    <p>最終得分:{`${getEndNumber.current[0]}`}</p>
                    <p>最高得分:{`${getEndNumber.current[1]}`}</p>
                </div>
                <div ref = {changeImageDiv}>
                    <SnakeMap gameMap={endMap.current}  ></SnakeMap>
                </div>
                <div className="flex flex-row w-full items-center justify-around">
                    <button type="button" className=" bg-white dark:bg-gray-800 hover:bg-gray-400 dark:hover:bg-gray-700 border-2 px-[8px] py-[4px] cursor-pointer rounded-md" onClick={()=>{setGameEnd(-1)}}>關閉</button>
                    <button type="button" className=" bg-white dark:bg-gray-800 hover:bg-gray-400 dark:hover:bg-gray-700 border-2 px-[8px] py-[4px] cursor-pointer rounded-md" onClick={()=>{handleShare()}}>分享按鈕</button>
                </div>
            </div>
        </div>
        }
        
        
        <PhoneSmooth useBoolean={phoneControl} moveState={0} onMove = {setPhoneMove} />

    </>)
}