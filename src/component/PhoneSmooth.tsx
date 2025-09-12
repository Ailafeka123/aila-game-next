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
    onHover ?: (value : boolean) => void,
    onMove : ( value : number) => void,
}

import { useState , useEffect,useRef , memo } from "react"
import Image from "next/image";
// 傳入 是否啟用 方向內容 與輸出方向位置
const PhoneSmooth = memo(({ useBoolean, moveState, onHover, onMove }:userState)=>{
    // 是否點擊中
    const [touchUse ,setTouchUse] = useState<boolean> (false);
    // 出現位置
    const position = useRef<number[]>([0,0]);
    // const [position , setPosition] = useState<number[]>([0,0]);
    // 小球移動 只移動X軸
    const smallPosition = useRef<number>(0);
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
            position.current = [touch.pageX,touch.pageY]
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
            let moveX  = touch.pageX - position.current[0];
            let moveY = touch.pageY - position.current[1];
            // 計算角度 JS內建用法
            const angle:number = Math.floor(Math.atan2(moveY,moveX)* (180 / Math.PI) );
            if(moveState === 0){
                let angleSpace:number = Math.floor( (angle+180) / 45  );
                angleSpace = Math.floor( (angleSpace+1) /2);
                let rotateList : number[] = [-180 , -90 , 0 , 90];
                if(angleSpace === rotateList.length){
                    angleSpace = 0;
                }
                rotate.current = rotateList[angleSpace];
            }else if(moveState === 1){
                let angleSpace:number = Math.floor( (angle+180) / 22.5  );
                angleSpace = Math.floor( (angleSpace+1) /2);
                let rotateList : number[] = [-180, -135 , -90 ,-45 , 0 , 45, 90, 135];
                if(angleSpace === rotateList.length){
                    angleSpace = 0;
                }
                rotate.current = rotateList[angleSpace];
            }else{
                rotate.current = angle;
            }
            // 計算距離
            moveX = Math.abs(moveX);
            moveY = Math.abs(moveY);
            if(moveX < 50  && moveY < 50){
                const dic: number = Math.pow(moveY,2) + Math.pow(moveX,2);
                if(dic > 2500 ){
                    smallPosition.current = 50;
                }else{
                    smallPosition.current = (Math.sqrt(dic));
                }
            }else{
                smallPosition.current = 50;
            }




            // 每秒更新20次就夠了 用動畫太吃效能
            setTimeout(()=>{
                coldDown.current = false;
                setAnimationState(index=>{
                    if(index > 3600){
                        return 0;
                    }
                    return(index+1);
                });
            },50);
            // 配合畫面偵數刷新
            // requestAnimationFrame(()=>{
            //     // 刷新動畫
                
            //     )
            // })
            
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
            setTouchUse(false);
        })
    },[useBoolean])
    // 回傳是否在觸碰中 如果有要求 則告訴父層
    useEffect(()=>{
        if(onHover){
            onHover(touchUse);
        }
    },[touchUse])

    // 觸發動畫時 順便回傳方向
    useEffect(()=>{
        onMove(rotate.current);
    },[animationState])
    // 檢測使用
    useEffect(()=>{
        console.log("每一次渲染手機操控");
        onMove(0);
    },[])

        
    
    // () =>{
    //     console.log("看到這個 代表箭頭顯示在刷新")
    //     
    // }

    return(
    <div className={`absolute w-[100px] h-[100px] bg-white dark:bg-gray-800 border-2 rounded-full
            -translate-1/2 z-990 opacity-80
            ${touchUse? "flex":"hidden"}
        `}
        style={{
            left: touchUse? `${position.current[0]}px`:undefined,
            top: touchUse? `${position.current[1]}px`:undefined,
        }}
    >
        {/* 底盤文字區 */}
        <ArrowShow hover={touchUse}/>

        <div className="relative w-full h-full"
            style={{
                transform:`rotate(${rotate.current}deg)`
            }}>
                {/* -translate-1/2 */}
            {/* 小球 */}
            <div className={ ` absolute w-[50px] h-[50px] bg-white dark:bg-gray-800 border-2 rounded-full
             z-999
            top-[25px] left-[25px]
            ${touchUse? "flex":"hidden"}`}
            style={{
                transform: touchUse?`translateX(${smallPosition.current}px)`:undefined
                // left: touchUse? `${}px`:undefined,
                
            }}
            ></div>
        </div>

    </div>)

})
export default PhoneSmooth;

const ArrowShow = memo(({hover}:{hover:boolean})=>{
    console.log("確認滑動顯示刷新")
    const temp:React.ReactNode[] = [];
    temp.push(<Image key="left" src="/component/phoneSmooth/phoneArrow_Dark.svg" height={20} width={20} alt="left" className="absolute top-[40px] left-[10px] z-1000"></Image>)
    temp.push(<Image key="top" src="/component/phoneSmooth/phoneArrow_Dark.svg" height={20} width={20} alt="top" className="absolute top-[10px] left-[40px] rotate-90 z-1000"></Image>)
    temp.push(<Image key="right" src="/component/phoneSmooth/phoneArrow_Dark.svg" height={20} width={20} alt="right" className="absolute top-[40px] right-[10px] rotate-180 z-1000"></Image>)
    temp.push(<Image key="bottom" src="/component/phoneSmooth/phoneArrow_Dark.svg" height={20} width={20} alt="bottom" className="absolute bottom-[10px] left-[40px] -rotate-90 z-1000"></Image>)
    return(
        <div className={`absolute w-full h-full ${hover? "flex":"hidden"}`}>
            {temp}
        </div>
    )
}) 