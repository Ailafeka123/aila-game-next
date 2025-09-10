"use client";

import { useState , useEffect ,useRef } from "react";
import { useTranslations } from "next-intl";
// reStart = 重製 , computer = 電腦模式
// type inputData = {
//     reStart:boolean,
//     onReStart:(value:boolean) => void,
//     computer:boolean,
//     onComputer:(value:boolean) => void

// }
// {reStart, onReStart, computer, onComputer}:inputData

// 電腦模式、是否重製
export default function TicTacToeGame(){
    // 語系
    const t = useTranslations("ticTacToe");
    // 製作井字格 0 => 空 1 => X  2 => O
    const [gameMap,setGameMap] = useState<(0|1|2)[]>(Array(9).fill(0));
    // 點擊了9次 沒有結果 則判定平手
    const [gameClick ,setGameClick] = useState<number>(0);
    //  false => X true => O
    const [thisTurn, setThisTurn] = useState<boolean> (false);
    // 是否結束 0 => 尚未結束 1 => X勝利 2 => O勝利 3 => 平手
    const [winner,setWinner] = useState<0|1|2|3>(0);

    // 重新開始冷卻
    const reStart = useRef<boolean>(false);
    // 遊戲模式 flase => 雙人模式 true => 電腦模式
    const [gameMode, setGameMode] = useState<boolean>(false);
    // 電腦計算要下哪裡的加權版面
    const [computerMap, setComputerMap] = useState<number[]>(Array(9).fill(0));

    // 遊戲設定區
    // 遊戲重製功能
    const reStartFunction = () =>{
        let temp = Array(9).fill(0);
        // 重製地圖 回合 勝利 次數 電腦地圖
        setGameMap(temp);
        setThisTurn(false);
        setWinner(0);
        setGameClick(0);
        setComputerMap(Array(9).fill(0))
    }
    // 手機按鈕的遊戲重製
    const reStartButtonFunction = () =>{
        if(reStart.current === true) return ;
        reStart.current = true;
        reStartFunction();
        setTimeout(()=>{
            reStart.current = false;
        },100)
    }
    // 切換模式
    useEffect(()=>{
        reStartFunction();
    },[gameMode])
    // 遊戲設定區結束

    // 遊戲過程區
    // 判斷是否勝利 把gameMap 修改後的版本丟進去
    const winnerCheck = (map:(0|1|2)[]) =>{
        // 是否勝利
        let winner : boolean  =false;
        // 檢查橫向
        let row = 0 
        while(row < 3){
            let limit = row*3+3;
            let last:0|1|2 = 0;
            for(let i = row*3 ; i < limit ;i++){
                if(map[i] === 0)break;
                if(last === 0){
                    last = map[i];
                }else{
                    if(last !== map[i]){
                        break;
                    }
                }
                if(i === (limit-1) ){
                    winner = true;
                    break;
                }
            }
            if(winner){
                setWinner(last);
                return;
            }
            row++;
        }
        // 垂直檢查
        let col = 0;
        while(col < 3){
            let last:0|1|2 = 0;
            for(let i = col ; i < 9 ; i+=3){
                if(map[i] === 0)break;
                if(last === 0){
                    last = map[i];
                }else{
                    if(last !== map[i])break;
                }
                if(i+3 >= 9){
                    winner = true;
                    break;
                }
            }
            if(winner){
                setWinner(last);
                return;
            }

            col++
        }
        // 斜向檢察
        // 左上右下指定 0 - 4 - 8
        // 右上左下指定 2 - 4 - 6
        if(map[0] !== 0 && map[4] !==0 && map[8] !== 0){
            if(map[0] === map[4] && map[4] === map[8]){
                setWinner(map[4]);
                return;
            }
        }
        if(map[2] !== 0 && map[4] !== 0 && map[6] !== 0){
            if(map[2] === map[4] && map[4] === map[6]){
                setWinner(map[4]);
                return;
            }
        }

    }
    // 遊戲狀態 點擊
    const clickFunction = (position:number) => {
        // 被標記則取消點擊
        if(gameMap[position] !== 0)return;
        // 如果已經有勝利 則取消
        if(winner !== 0) return
        // 轉換地圖
        let temp = gameMap;
        temp[position] = thisTurn?2:1
        setGameMap(temp)
        // 轉換回合
        setThisTurn(!thisTurn);
        winnerCheck(temp);
        setGameClick(index=>index+1);
    }
    // 次數累積至9次 還沒有勝負 則平局
    useEffect(()=>{
        if(gameClick === 9 && winner === 0){
            setWinner(3);
        }
    },[gameClick])

    // 電腦模式開始
    const computerGetMap = () =>{
        // console.log(gameMap);
        // 開始計算新一輪的加權
        // let temp = computerMap;
        // console.log("computerMap")
        // console.log(computerMap);
    }
    // 輪到 O 判斷是否讓電腦出手
    useEffect(()=>{
        // 目前是X回合 則跳出
        if(thisTurn === false) return;
        // 雙人模式也跳出
        if(gameMode === false) return;
        computerGetMap();
    },[thisTurn])





    return(
        <div className="flex flex-col ">
            <div className="flex flex-col">
                {winner === 0 ? <h3 className="text-center" > {t("turnState")}{thisTurn === false?"X":"O"}</h3> 
                : winner === 3 ? <h3 className="text-center" >{t("Draw")}</h3>
                : <h3 className="text-center" >{winner === 1?`X${t("winner")}`:`O${t("winner")}`}</h3>
                }
                
                
            </div>
            <div className="grid grid-cols-3  text-center md:m-[16px] h-[300px]">
                {gameMap && gameMap.map( (index:(0|1|2), key:number)=>{
                    let inputString : string = "";
                    if(index === 1){
                        inputString = "X"
                    }else if(index === 2){
                        inputString = "O"
                    }else{
                        inputString = " "
                    }
                    return (
                    <div key={key} className="border-2 flex items-center justify-center w-full h-full" onClick={()=>{clickFunction(key)}}>
                        {inputString}
                    </div>)
                })}
            </div>

            <div className="flex flex-row items-center justify-around m-[16px]">
                <button onClick={()=>{reStartButtonFunction()}}>{t("reStart")}</button>
                <button onClick={()=>{setGameMode(!gameMode)}}>{gameMode?`${t("computerMode")}`:`${t("TwoPlayers")}`}</button>
            </div>
        </div>
    )

}