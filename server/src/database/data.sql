INSERT INTO zeffect (zeffect_id,zeffect_type,zeffect_life,zeffect_com,zeffect_zobject) VALUES
(1,"COMp",null,2,null),
(2,"COMp",null,1,null),
(3,"COMp",null,5,null),
(4,"COM-",null,-1,null),
(5,"COM-",null,-2,null),
(6,"COM-",null,-5,null),
(7,"LIFE-",-10,null,null),
(8,"LIFEp",10,null,null),
(9,"LIFEp",20,null,null);

INSERT INTO zobject (zobject_id,zobject_name,zobject_image,zobject_type,zobject_damage,zobject_range) VALUES
(1,"Carte du parti",null,"WEAPON",2,5),
(2,"Petit couteau",null,"WEAPON",3,1),
(3,"Des sandales",null,"WEAPON",15,1),
(4,"Une clef rouge",null,"zobject",1,5),
(5,"Des gants",null,"WEAPON",0,0);

INSERT INTO contrainte (contrainte_id,contrainte_minlife,contrainte_maxlife,contrainte_mincom,contrainte_maxcom,contrainte_zobject) VALUES
(1,15,null,null,null,null),
(2,null,50,null,null,null),
(3,null,null,null,null,1),
(4,null,null,null,null,2),
(5,null,null,null,null,3);

INSERT INTO fight (fight_id,fight_name,fight_damage,fight_res,fight_drop,fight_droprate,fight_zeffect) VALUES
(1,"un garde du parti",10,5,1,100,4),
(2,"un espion américain",10,5,2,50,1),
(3,"une chose humanoïde",8,4,null,null,9);

INSERT INTO ztarget (ztarget_id,ztarget_type,zobject_id,fight_id,zeffect_id) VALUES
(1,"LOSS",null,null,7),
(2,"FIGHT",null,1,null),
(3,"RESET",null,null,null),
(4,"GET",1,null,null),
(5,"BOOST",null,null,1),
(6,"USE",1,null,null),
(7,"FIGHT",null,2,null),
(8,"FIGHT",null,3,null);

INSERT INTO chapter (story_id,chapter_id,chapter_desc,chapter_zeffect,exit1_id,exit1_desc,exit1_contrainte,exit1_ztarget,exit2_id,exit2_desc,exit2_contrainte,exit2_ztarget,exit3_id,exit3_desc,exit3_contrainte,exit3_ztarget) VALUES
(1,1,"la chambre",null,2,"la porte",null,null,3,"la fenetre",1,1,null,null,null,null),
(1,2,"le couloir bleu blanc ascenseur",null,5,"porte bleue",null,null,6,"porte blanche",null,null,7,"ascenseur",null,null),
(1,3,"chute sur le trottoir",null,4,"le trottoir",null,null,null,null,null,null,null,null,null,null),
(1,4,"le trottoir",null,17,"a gauche",null,null,18,"a droite",null,null,null,null,null,null),
(1,5,"chambre bleue : carte du parti",null,3,"la fenetre",1,1,10,"le couloir avec la carte",null,4,10,"le couloir sans la carte",null,null),
(1,6,"chambre blanche : garde du parti",null,3,"la fenetre",1,1,13,"convaincre le garde",null,null,14,"montrer la carte du parti",3,5),
(1,7,"ascenseur bas",null,8,"le hall",null,null,null,null,null,null,null,null,null,null),
(1,8,"dans le hall",null,4,"le trottoir",null,null,9,"ascenseur",null,null,null,null,null,null),
(1,9,"ascenseur haut",null,12,"le couloir",null,null,null,null,null,null,null,null,null,null),
(1,10,"le couloir chambre blanc ascenseur",null,15,"porte rouge",null,null,6,"porte blanche",null,null,7,"ascenseur",null,null),
(1,11,"le couloir bleu chambre ascenseur",null,5,"porte bleue",null,null,15,"porte rouge",null,null,7,"ascenseur",null,null),
(1,12,"le couloir bleu blanc chambre",null,5,"porte bleue",null,null,6,"porte blanche",null,null,15,"porte rouge",null,null),
(1,13,"combattre le garde",null,14,"combattre le garde",null,2,null,null,null,null,null,null,null,null),
(1,14,"chambre blanche sans garde",null,3,"la fenetre",1,1,11,"la porte",null,null,null,null,null,null),
(1,15,"la chambre modifiée",null,2,"la porte",null,null,3,"la fenetre",1,1,null,null,null,null),
(1,16,"la mort",null,0,"reset",null,3,null,null,null,null,null,null,null,null),
(1,17,"le mur",null,0,"reset",null,3,null,null,null,null,null,null,null,null),
(1,18,"impasse, il faut tjrs aller à gauche",5,4,"le trottoir",null,null,null,null,null,null,null,null,null,null);