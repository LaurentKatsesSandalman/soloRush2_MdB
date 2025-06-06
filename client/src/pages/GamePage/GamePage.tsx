import { useState, useEffect } from "react";
import { useAppContext } from "../../context/AppContext";
import styles from "./GamePage.module.css";
import type { Chapter, Contrainte } from "../../types/types";
import StoryButton from "../../components/Buttons/StoryButton";
import ActionDiv from "../../components/ActionDiv/ActionDiv";


function GamePage() {
    const { life,  comPoints,  inventory } = useAppContext()

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

    // const badConstraint = {
    //     contrainte_id: 0
    // }

    interface PotentialExitInterface {
            index: number;
            exit_contrainte?:number;
            exit_desc?: string;
            exit_id?: number;
            exit_ztarget?:number;
        }

    const potentialExitEmpty = [
        {
            index: 1,

            exit_desc: "desc1",
            exit_id: 2,

        }, {
            index: 2,

            exit_desc: "desc2",
            exit_id: 2,

        }, {
            index: 3,
 
            exit_desc: "desc3",
            exit_id: 2,

        },
    ]

    const [currentChapterID, setCurrentChapterID] = useState<Number>(1)
    const [currentChapter, setCurrentChapter] = useState<Chapter>(firstChapter)
    const [potentialExit, setPotentialExit] = useState<PotentialExitInterface[]>(potentialExitEmpty);

    async function getExitConstraint(id: number) {
        const response = await fetch(`http://localhost:3310/api/constraints/${id}`)
        const exitConstraint: Contrainte = await response.json();
        return exitConstraint
    }

    useEffect(() => {
        const urlStory = `http://localhost:3310/api/chapters/${currentChapterID}`;
        fetch(urlStory)
            .then((response) => response.json())
            .then((data) => setCurrentChapter(data))
            .catch((err) => console.error(err));
    }, [currentChapterID]);





    useEffect(() => {
        const checkConstraints = async () => {

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
            ];

            setPotentialExit(potentialExitStart);

            setPotentialExit((prev) => prev.filter((exit) => exit.exit_id !== null));

            const bannedID: number[] = [];

            for (const exit of potentialExitStart) {
                if (exit.exit_id && exit.exit_contrainte) {
                    try {
                        const exitConstraint: Contrainte = await getExitConstraint(exit.exit_contrainte);

                        if (exitConstraint) {
                            if (exitConstraint.contrainte_minlife && life < exitConstraint.contrainte_minlife) bannedID.push(exit.index);
                            if (exitConstraint.contrainte_maxlife && life > exitConstraint.contrainte_maxlife) bannedID.push(exit.index);
                            if (exitConstraint.contrainte_mincom && comPoints < exitConstraint.contrainte_mincom) bannedID.push(exit.index);
                            if (exitConstraint.contrainte_maxcom && comPoints > exitConstraint.contrainte_maxcom) bannedID.push(exit.index);
                            if (exitConstraint.contrainte_zobject && !inventory.includes(exitConstraint.contrainte_zobject)) bannedID.push(exit.index);
                        }

                    } catch (error) {
                        console.error("Erreur lors de la récupération de la contrainte", error);
                    }
                }
            }

            setPotentialExit((prev) => prev.filter((exit) => !bannedID.includes(exit.index)));
        };

        checkConstraints();
    }, [currentChapter]);


    return (
        <>
            <h2>RETRO MdB</h2>
            <div className={styles.storydiv}>
                <div className={styles.descdiv}>
                    <p>{currentChapter.chapter_desc}</p>
                </div>
                <div className={styles.buttondiv}>
                    {potentialExit.map((exit) => (
                        <StoryButton key={exit.index} contrainte={exit.exit_contrainte} desc={exit.exit_desc} id={exit.exit_id} target={exit.exit_ztarget} setCurrentChapterID={setCurrentChapterID} />
                    ))

                    }
                </div></div>
            <div className={styles.actiondiv}>
                <ActionDiv />
            </div>


        </>)
}

export default GamePage