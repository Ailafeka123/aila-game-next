
import DarkModeButton from "./darkModeButton"
export default function Menu(){
    return (
        <div className="bg-gray-200 dark:bg-gray-800 flex flex-row p-2">
            <DarkModeButton></DarkModeButton>
        </div>
    )
}