import { useEffect,useState } from "react"

const useWindowSize = ()=>{
    const[windowSize,setWindowSize] = useState({
        width:undefined,
        height:undefined
    })

    useEffect(()=>{
        const handleSize = ()=>{
            setWindowSize({
                width:window.innerWidth,
                height:window.innerHeight
            })
        }
        handleSize();
        window.addEventListener('resize',handleSize);
        return ()=> window.removeEventListener('resize',handleSize)
    },[])
    console.log(windowSize.width);
    return windowSize;
}
export default useWindowSize