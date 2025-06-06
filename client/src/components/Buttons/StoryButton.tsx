import { useState } from "react";
import { useAppContext } from "../../context/AppContext";
import type { Zeffect, Target, Fight } from "../../types/types";
import styles from "./StoryButton.module.css";

interface StoryButtonProps {
    contrainte: number | undefined;
    desc: string | undefined;
    id: number | undefined;
    target: number | undefined;
    setCurrentChapterID: React.Dispatch<React.SetStateAction<Number>>;
}

function StoryButton({ desc, id, target, setCurrentChapterID }: StoryButtonProps) {
    const { setLife, life, setComPoints, setInventory, MAX_LIFE, setLastEvent } = useAppContext()
    const [consequence, setConsequence] = useState<Target>()
    const [zeffect, setZeffect] = useState<Zeffect>()
    const [fight, setFight] = useState<Fight>()

    async function handleOnClick() {
        if (typeof target === "number") {
            console.log("target is number", target)
            fetch(`http://localhost:3310/api/targets/${target}`)
                .then((response) => response.json())
                .then((data) => {
                    setConsequence(data)
                    console.log(data)
                    switch (data.ztarget_type) {
                        case "LOSS": {
                            fetch(`http://localhost:3310/api/effects/${data.zeffect_id}`)
                                .then((response) => response.json())
                                .then((data) => {
                                    setZeffect(data)
                                    if (data.zeffect_life !== undefined && data.zeffect_life < 0) {
                                        setLife((prev) => prev + (data.zeffect_life as number))
                                        setLastEvent(`Vous avez perdu ${data.zeffect_life} points de vie`)
                                    }
                                    if (data.zeffect_com !== undefined && data.zeffect_com < 0) { setComPoints((prev) => prev + (data.zeffect_com as number))
                                        setLastEvent(`Vous avez perdu ${data.zeffect_life} points de communisme`)
                                     }

                                })
                                .catch((err) => console.error(err));

                            break;
                        }
                        case "BOOST": {
                            fetch(`http://localhost:3310/api/effects/${data.zeffect_id}`)
                                .then((response) => response.json())
                                .then((data) => {
                                    setZeffect(data)
                                    if (data.zeffect_life !== undefined && data.zeffect_life > 0) { setLife((prev) => prev + (data.zeffect_life as number)) 
                                        setLastEvent(`Vous avez gagné ${data.zeffect_life} points de vie`)
                                    }
                                    if (data.zeffect_com !== undefined && data.zeffect_com > 0) { setComPoints((prev) => prev + (data.zeffect_com as number)) 
                                        setLastEvent(`Vous avez gagné ${data.zeffect_life} points de communisme`)
                                    }
                                })
                                .catch((err) => console.error(err));

                            break;
                        }
                        case "FIGHT": {
                            fetch(`http://localhost:3310/api/fights/${data.fight_id}`)
                                .then((response) => response.json())
                                .then((data) => {
                                    setFight(data)
                                    setLife((prev) => prev - (data.fight_damage * 3 as number))
                                    setLastEvent(`Vous combattez ${data.fight_name} et vous perdez ${data.fight_damage * 3} points de vie`)

                                })
                                .catch((err) => console.error(err));

                            break;
                        }
                        case "RESET": {
                            setCurrentChapterID(1);
                            setLife(MAX_LIFE);
                            setComPoints(0);
                            setInventory([]);
                            break;
                        }
                        case "GET": {

                            setInventory((prev) => ([...prev, (data.zobject_id as number)]))
                            setLastEvent(`Vous avez un nouvel objet dans votre inventaire`)

                            break;
                        }
                        case "USE": {

                            setInventory((prev) => (prev.filter((id) => id != (data.zobject_id as number))))
                            setLastEvent(`Vous avez un objet de moins dans votre inventaire`)

                            break;
                        }


                    }

                })
                .catch((err) => console.error(err));

        }

        if (id) {
            setCurrentChapterID(id)

        }

        if (life<1){
            setCurrentChapterID(16)
        }

    }

    return (<>
        <button className={styles.exitbutton} onClick={handleOnClick}>{desc}</button>
    </>)

}

export default StoryButton