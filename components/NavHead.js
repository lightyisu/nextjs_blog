import Link from "next/link";
import MoveBanner from "./moveBanner";
import { useEffect, useState } from "react";
import axios from "axios";
export default function NavHead() {
  const [sentence, setSentence] = useState("加载中");
  useEffect(() => {
    console.log("xxxx1");
    axios
      .get("https://open.saintic.com/api/sentence/shuqing.all.json")
      .then((res) => {
        console.log(res);
        setSentence(res.data.data.sentence + "-《" + res.data.data.name + "》");
      });
  }, []);
  return (
    <header className="top-0 z-10 text-black p-3 border-solid border-b fixed w-full left-0 bg-white blur-sm content-center border-gray-300 ">
      <div className="left inline-block">
        <Link href="/">
          <i className="bg-logo bg-90%  cursor-pointer inline-block w-10 bg-no-repeat h-3.4r  sm:ml-10 ml-4 "></i>
        </Link>
        <i className="bg-multiply-icon inline-block w-4 h-4 mb-6   bg-90%" />

        <MoveBanner />
      </div>
      <p
        className="
   inline-block sm:mt-4 float-right text-xs p-0 justify-self-end "
      >
        {sentence}
      </p>
    </header>
  );
}
