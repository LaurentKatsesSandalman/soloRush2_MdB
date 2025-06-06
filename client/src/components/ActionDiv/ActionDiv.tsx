import { useEffect, useState } from "react";
import { useAppContext } from "../../context/AppContext";
import styles from "./ActionDiv.module.css";

interface ActionDivProps {


}

function ActionDiv ({}:ActionDivProps){
    const {life, inventory, comPoints, lastEvent, sandal, setSandal} = useAppContext()
    const [inventoryStringArray, setInventoryStringArray]=useState<string[]>([])
    // const [sandal, setSandal] = useState<boolean>(false)

    useEffect(()=>{
        setInventoryStringArray([])
        console.log("inventory",inventory)
for (const object of inventory){
    console.log("i am object",object)
    fetch(`http://localhost:3310/api/objects/${object}`)
    .then((response) => response.json())
    .then((data)=>{
        setInventoryStringArray((prev)=>[...prev, data.zobject_name as string])

        console.log("inventory string array", inventoryStringArray)
    })
    .catch((err) => console.error(err));
}
    if(inventory.includes(3)){setSandal(true)}
    },[inventory])

    const inventoryString = inventoryStringArray.join(", ")
   

    return (    <div className={styles.actiondiv}>
                {sandal?(<p>Vie actuelle : {life} (vous portez des sandales)</p>):(<p>Vie actuelle : {life}</p>)}
                <p>Niveau de communisme : {comPoints}</p>
                <p>Inventaire : {inventoryString}</p>
                <p>{lastEvent}</p>
                {life<1 && <p>Vous êtes mort ! Appuyez sur un bouton</p>}
            </div>)
}

export default ActionDiv