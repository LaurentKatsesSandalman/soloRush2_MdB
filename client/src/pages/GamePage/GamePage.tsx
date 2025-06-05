import { useState, useEffect } from "react";
import { useAppContext } from "../../context/AppContext";
import styles from "./GamePage.module.css";
import type { Chapter, Contrainte, Zobject, Zeffect } from "../../types/types";
import StoryButton from "../../components/Buttons/StoryButton";


function GamePage() {
    // const {life, setLife, comPoints, setComPoints, inventory, setInventory} = useAppContext()

    const firstChapter = {
        story_id: 1,
        chapter_id: 1,
        chapter_desc: "la chambre",

        exit1_id: 2,
        exit1_desc: "la porte",

        exit2_id: 3,
        exit2_desc: "la fenetre",
        exit2_contrainte: 1,
        exit2_ztarget: 1,
    }

    const badConstraint = {
        contrainte_id: 0
    }

    const [currentChapterID, setCurrentChapterID] = useState<Number>(1)
    const [currentChapter, setCurrentChapter] = useState<Chapter>(firstChapter)
    const urlStory = `http://localhost:3310/api/chapters/${currentChapterID}`

    fetch(urlStory)
        .then((response) => response.json())
        .then((data) => setCurrentChapter(data))
        .catch((err) => console.error(err));

    const potentialExitStart = [
        {
            index: 1,
            exit_contrainte: currentChapter.exit1_contrainte,
            exit_desc: currentChapter.exit1_desc,
            exit_id: currentChapter.exit1_id,
            exit_ztarget: currentChapter.exit1_ztarget
        }, {
            index: 2,
            exit_contrainte: currentChapter.exit2_contrainte,
            exit_desc: currentChapter.exit2_desc,
            exit_id: currentChapter.exit2_id,
            exit_ztarget: currentChapter.exit2_ztarget
        }, {
            index: 3,
            exit_contrainte: currentChapter.exit3_contrainte,
            exit_desc: currentChapter.exit3_desc,
            exit_id: currentChapter.exit3_id,
            exit_ztarget: currentChapter.exit3_ztarget
        },
    ]

    const [potentialExit, setPotentialExit] = useState(potentialExitStart)

    useEffect(() => {
        setPotentialExit(potentialExitStart)
        console.log("before", potentialExit)

        setPotentialExit((prev) => prev.filter((exit) => exit.exit_id !== undefined))
        console.log("after", potentialExit)
        const bannedID: number[] = []
        // for (const exit of potentialExit ){
        //     if(exit.exit_id && exit.exit_contrainte){
        //         const exitConstraint:Contrainte = fetch(`http://localhost:3310/api/constraints/${exit.exit_contrainte}`).then((response) => response.json())

        //         if(exitConstraint){
        //         if(exitConstraint.contrainte_minlife && life<exitConstraint.contrainte_minlife){bannedID.push(exit.exit_id)}
        //         if(exitConstraint.contrainte_maxlife && life>exitConstraint.contrainte_maxlife){bannedID.push(exit.exit_id)}
        //         if(exitConstraint.contrainte_mincom && comPoints<exitConstraint.contrainte_mincom){bannedID.push(exit.exit_id)}
        //         if(exitConstraint.contrainte_maxcom && comPoints>exitConstraint.contrainte_maxcom){bannedID.push(exit.exit_id)}
        //         if(exitConstraint.contrainte_zobject && !(inventory.includes(exitConstraint.contrainte_zobject)) ){bannedID.push(exit.exit_id)}
        //         }
        //     }
        // }

        // setPotentialExit((prev)=>prev.filter((exit)=>!bannedID.includes(exit.exit_id) ))

    }, [currentChapterID])


    return (
        <>
            <h2>Title</h2>
            <div className={styles.storydiv}>
                <div className={styles.descdiv}>
                    <p>{currentChapter.chapter_desc}</p>
                </div>
                <div className={styles.buttondiv}>
                    {potentialExit.map((exit) => (
                        <StoryButton key={exit.index} contrainte={exit.exit_contrainte} desc={exit.exit_desc} id={exit.exit_id} target={exit.exit_ztarget} setCurrentChapterID={setCurrentChapterID} />
                    ))

                    }
                </div>
            </div>
            <div className={styles.actiondiv}>
                <p>This is action div</p>
            </div>
        </>)
}

export default GamePage