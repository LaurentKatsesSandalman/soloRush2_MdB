import { useState } from "react";
import { useAppContext } from "../../context/AppContext";
import NavButton from "../Buttons/NavButton";
import styles from "./TopBar.module.css";


function TopBar() {
    const string1=""
    const string2=""
    const string3=""
    const name1=""
    const name2=""
    const name3=""
    

    return(
    <>
    <div>
        <NavButton linkname={string1} name={name1}/>
        <NavButton linkname={string2} name={name2}/>
        <NavButton linkname={string3} name={name3}/>
    </div>
    </>)
}

export default TopBar