import TailwindcssIcon from "./svg-icon/tailwindcss";
import GithubIcon from "./svg-icon/github";
import styles from "./moveBanner.module.css";
import VercelIcon from "./svg-icon/vercel";
import NextjsIcon from "./svg-icon/nextjs";
import { useRef, useEffect, useState } from "react";
export default function MoveBanner() {
  const [offset, setOffset] = useState(0);
  const [resetPos,setResetPos]=useState(false)
 useEffect(()=>{
    setInterval(() => {
        setOffset(t=>{
          if(t>-200){
            setResetPos(false)
            return t-50;
          }
          else{
            return 0;
          }
        })
    }, 3000);
    
  },[]);
  const ref=useRef();
  useEffect(()=>{
    
    if(ref.current==-200){
      setResetPos(true);
    }
    ref.current=offset;
    console.log(offset)
  },[offset])
  return (
    <div className={styles.showWindow}>
      <div
        className={styles.innerAD}
        style={{ top: offset + "px", transition:resetPos?"":"all 1s ease-in-out" }}
      >
        <ul className={styles.list}>
          <li>
            <VercelIcon/>
          </li>
          <li>
            <TailwindcssIcon />
          </li>
          <li>
            <GithubIcon />
          </li>
          <li>
            <NextjsIcon />
          </li>
          <li>
          <VercelIcon />
          </li>
        </ul>
      </div>
    </div>
  );
}
