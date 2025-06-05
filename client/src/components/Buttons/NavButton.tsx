import { useState } from "react";
import { useAppContext } from "../../context/AppContext";

import styles from "./NavButton.module.css";

interface NavButtonProps{
linkname: string;
 name: string;
}

function NavButton({linkname, name}:NavButtonProps) {

    return (<>
        <a className="todo" href={linkname} >{name}</a>
    </>)

}

export default NavButton