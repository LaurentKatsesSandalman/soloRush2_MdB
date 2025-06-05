import { useState } from "react";
import { useAppContext } from "../../context/AppContext";

import styles from "./StoryButton.module.css";

interface StoryButtonProps {
    contrainte: number | undefined;
    desc: string | undefined;
    id: number | undefined;
    target: number | undefined;
    setCurrentChapterID: React.Dispatch<React.SetStateAction<Number>>;
}

function StoryButton({ contrainte, desc, id, target, setCurrentChapterID }: StoryButtonProps) {

    function handleOnClick() {
        console.log("id", id)
        if (id) {
            setCurrentChapterID(id)
            console.log("currentchapterid?")
        }

    }

    return (<>
        <button className={styles.exitbutton} onClick={handleOnClick}>{desc}</button>
    </>)

}

export default StoryButton