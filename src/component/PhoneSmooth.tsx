"use client"

// 使用狀態 useBoolean => 是否啟用 
// moveState=> 方向狀態(分為四方向 八方向 與隨意方向 0 1 2)  
// move => 方向(-180 ~ 180度) 只有輸出  
// 0 => 正右 
// 0 ~ -180 =>右 ~ 右上 到左  
// 180/-180=> 正左   
// 180 ~ 0 => 左 ~ 左下 ~ 右
type userState = {
    useBoolean : boolean,
    moveState: 0 | 1 | 2,
    onMove : ( value : number) => void,
}

import { useState , useEffect,useRef } from "react"

// 傳入 是否啟用 方向內容 與輸出方向位置
export default function PhoneSmooth({ useBoolean, moveState, onMove }:userState){
    // 是否點擊中
    const [touchUse ,setTouchUse] = useState<boolean> (false);
    // 出現位置
    const position = useRef<number[]>([0,0]);
    // const [position , setPosition] = useState<number[]>([0,0]);
    // 小球移動 只移動X軸
    const smallPosition = useRef<number>(50);
    // 觸發動畫用
    const [animationState, setAnimationState] = useState<number>(0);
    const rotate = useRef<number>(0);
    // const [smallPosition, setSmallPosition] = useState<number[]>([0,0]);
    const coldDown = useRef<boolean>(false);
    
    // 啟用時 開啟監聽
    useEffect(()=>{
        if(useBoolean === false) return;
        const handleTouchStart = (e: TouchEvent) => {
            e.preventDefault()
            // 顯示點擊框
            setTouchUse(true);
            const touch = e.touches[0];
            // 更新位置
            position.current = [touch.clientX,touch.clientY]
            smallPosition.current = 50
            // 關閉自己 開啟移動監聽與結束監聽
            window.removeEventListener("touchstart", handleTouchStart);
            window.addEventListener("touchmove", handleTouchMove,{ passive: false });
            window.addEventListener("touchend", handleTouchEnd);
        };
        
        const handleTouchMove = (e: TouchEvent) => {
            if(coldDown.current) return;
            coldDown.current = true;
            e.preventDefault()
            const touch = e.touches[0];
            // 計算移動
            // 為了符合動畫 所以只能+50 好讓她置中
            let moveX  = touch.clientX - position.current[0];
            let moveY = touch.clientY - position.current[1];
            // 計算角度 JS內建用法
            const angle:number = Math.floor(Math.atan2(moveY,moveX)* (180 / Math.PI) );
            rotate.current = angle;
            // 計算距離
            moveX = Math.abs(moveX);
            moveY = Math.abs(moveY);
            if(moveX < 50  && moveY < 50){
                const dic: number = Math.pow(moveY,2) + Math.pow(moveX,2);
                if(dic > 2500 ){
                    smallPosition.current = 100;
                }else{
                    smallPosition.current = (Math.sqrt(dic)+50);
                }
            }else{
                smallPosition.current = 100;
            }
            // 配合畫面偵數刷新
            requestAnimationFrame(()=>{
                coldDown.current = false;
                // 刷新動畫
                setAnimationState(index=>{
                    if(index > 3600){
                        return 0;
                    }
                    return(index+1);
                }
                )
            })
            
        };

        const handleTouchEnd = () => {
            // 關閉顯示
            setTouchUse(false);
            // 關閉自己與移動
            window.removeEventListener("touchmove", handleTouchMove);
            window.removeEventListener("touchend", handleTouchEnd);
            // 開啟起始監聽
            window.addEventListener("touchstart", handleTouchStart,{ passive: false });
        };

        window.addEventListener("touchstart", handleTouchStart,{ passive: false });
        // window.addEventListener("touchmove", handleTouchMove,{ passive: false });
        // window.addEventListener("touchend", handleTouchEnd);
        return(()=>{
            window.removeEventListener("touchstart", handleTouchStart);
            window.removeEventListener("touchmove", handleTouchMove);
            window.removeEventListener("touchend", handleTouchEnd);
        })
    },[useBoolean])
    // 觸發動畫時 順便檢測方向
    useEffect(()=>{
        if(moveState === 0){

        }else if(moveState === 1){

        }else{

        }
    },[animationState])
    // 檢測使用
    useEffect(()=>{
        console.log("每一次渲染手機操控");
        onMove(0);
    },[])


    return(
    <div className={`absolute w-[100px] h-[100px] bg-white dark:bg-gray-800 border-2 rounded-full
            -translate-1/2 z-990
            ${touchUse? "flex":"hidden"}
        `}
        style={{
            left: touchUse? `${position.current[0]}px`:undefined,
            top: touchUse? `${position.current[1]}px`:undefined,
            transform:`rotate(${rotate.current}deg)`
        }}
    >
        <div className="relative w-full h-full flex flex-col items-center justify-center">
            {/* 小球 */}
            <div className={ ` absolute w-[50px] h-[50px] bg-white dark:bg-gray-800 border-2 rounded-full
            -translate-1/2 z-999
            top-[50px]
            ${touchUse? "flex":"hidden"}`}
            style={{
                left: touchUse? `${smallPosition.current}px`:undefined,
            }}
            ></div>
        </div>

    </div>)

}