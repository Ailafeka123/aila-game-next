export default function Footer(){

    return(
        <footer className={` bg-gray-200 dark:bg-gray-800  w-full  md:p-2 p-4 flex flex-col md:flex-row gap-4 text-center items-center justify-around`}>
            <div className=' text-gray-950 dark:text-white flex flex-col gap-2'>
                <p >聯繫方法</p>
                <p >電話號碼:0917-871-819</p>
                <p >信箱:ailafeka@gmail.com</p>
                <p >聯繫時間:1000~2000</p>
            </div>
            <div className=" text-gray-950 dark:text-white flex flex-col gap-2">
                <p>本網站是以Next製作，並放在github與vercel上使用，僅供用於展示</p>
                <p>Copyright© 劉星緯 2025</p>
            </div>
        </footer>
    )
}