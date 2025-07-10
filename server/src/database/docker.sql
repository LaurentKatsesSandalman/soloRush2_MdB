-- Don't forget the spreadsheet that simplifies creating tables
DROP DATABASE IF EXISTS mdb;

CREATE DATABASE mdb;

USE mdb;

CREATE TABLE zobject (
    zobject_id INT UNSIGNED NOT NULL PRIMARY KEY,
    zobject_name VARCHAR(50) NOT NULL,
    zobject_image VARCHAR(255),
    zobject_type VARCHAR(20) NOT NULL,
    zobject_damage INT,
    zobject_range INT
);

CREATE TABLE zeffect (
    zeffect_id INT UNSIGNED NOT NULL PRIMARY KEY,
    zeffect_type VARCHAR(20) NOT NULL,
    zeffect_life INT,
    zeffect_com INT,
    zeffect_zobject INT UNSIGNED,
    FOREIGN KEY (zeffect_zobject) REFERENCES zobject (zobject_id)
);

CREATE TABLE contrainte (
    contrainte_id INT UNSIGNED NOT NULL PRIMARY KEY,
    contrainte_minlife INT,
    contrainte_maxlife INT,
    contrainte_mincom INT,
    contrainte_maxcom INT,
    contrainte_zobject INT UNSIGNED,
    FOREIGN KEY (contrainte_zobject) REFERENCES zobject (zobject_id)
);

CREATE TABLE fight (
    fight_id INT UNSIGNED NOT NULL PRIMARY KEY,
    fight_name VARCHAR(50) NOT NULL,
    fight_damage INT NOT NULL,
    fight_res INT NOT NULL,
    fight_drop INT UNSIGNED,
    FOREIGN KEY (fight_drop) REFERENCES zobject (zobject_id),
    fight_droprate INT,
    fight_zeffect INT UNSIGNED,
    FOREIGN KEY (fight_zeffect) REFERENCES zeffect (zeffect_id)
);

CREATE TABLE ztarget (
    ztarget_id INT UNSIGNED NOT NULL PRIMARY KEY,
    ztarget_type VARCHAR(20) NOT NULL,
    zobject_id INT UNSIGNED,
    FOREIGN KEY (zobject_id) REFERENCES zobject (zobject_id),
    fight_id INT UNSIGNED,
    FOREIGN KEY (fight_id) REFERENCES fight (fight_id),
    zeffect_id INT UNSIGNED,
    FOREIGN KEY (zeffect_id) REFERENCES zeffect (zeffect_id)
);

CREATE TABLE chapter (
    story_id INT UNSIGNED NOT NULL,
    chapter_id INT UNSIGNED NOT NULL PRIMARY KEY,
    chapter_desc MEDIUMTEXT NOT NULL,
    chapter_zeffect INT UNSIGNED,
    FOREIGN KEY (chapter_zeffect) REFERENCES zeffect (zeffect_id),
    exit1_id INT UNSIGNED NOT NULL,
    exit1_desc VARCHAR(100) NOT NULL,
    exit1_contrainte INT UNSIGNED,
    FOREIGN KEY (exit1_contrainte) REFERENCES contrainte (contrainte_id),
    exit1_ztarget INT UNSIGNED,
    FOREIGN KEY (exit1_ztarget) REFERENCES ztarget (ztarget_id),
    exit2_id INT UNSIGNED,
    exit2_desc VARCHAR(100),
    exit2_contrainte INT UNSIGNED,
    FOREIGN KEY (exit2_contrainte) REFERENCES contrainte (contrainte_id),
    exit2_ztarget INT UNSIGNED,
    FOREIGN KEY (exit2_ztarget) REFERENCES ztarget (ztarget_id),
    exit3_id INT UNSIGNED,
    exit3_desc VARCHAR(100),
    exit3_contrainte INT UNSIGNED,
    FOREIGN KEY (exit3_contrainte) REFERENCES contrainte (contrainte_id),
    exit3_ztarget INT UNSIGNED,
    FOREIGN KEY (exit3_ztarget) REFERENCES ztarget (ztarget_id)
);

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
(5,"Des gants",null,"WEAPON",0,0),
(6,"Un magnifique violoncelle",null,"zobject",1,5);

INSERT INTO contrainte (contrainte_id,contrainte_minlife,contrainte_maxlife,contrainte_mincom,contrainte_maxcom,contrainte_zobject) VALUES
(1,15,null,null,null,null),
(2,null,50,null,null,null),
(3,null,null,null,null,1),
(4,null,null,null,null,2),
(5,null,null,null,null,3),
(6,null,null,null,1,null),
(7,null,null,null,null,6);

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
(8,"FIGHT",null,3,null),
(9,"LOSS",null,null,5),
(10,"GET",6,null,null),
(11,"GET",3,null,null);

INSERT INTO chapter (story_id,chapter_id,chapter_desc,chapter_zeffect,exit1_id,exit1_desc,exit1_contrainte,exit1_ztarget,exit2_id,exit2_desc,exit2_contrainte,exit2_ztarget,exit3_id,exit3_desc,exit3_contrainte,exit3_ztarget) VALUES
(1,1,"Vous vous réveillez dans une chambre miteuse de ce qui semble être un vieil hôtel. Au mur, un portrait d'Erich Honecker. Le calendrier indique 9 November. Vous vous sentez en danger mais vous ne savez pas pourquoi. Vous percevez que votre genre est stable et masculin. ",null,2,"Sortir par la porte",null,null,3,"Sortir par la fenêtre",1,1,null,null,null,null),
(1,2,"Le couloir est tout aussi miteux. Il donne sur trois chambres, dont celle dont vous sortez, et un ascenseur",null,5,"Rentrer dans la chambre à la porte bleue",null,null,6,"Rentrer dans la chambre à la porte blanche",null,null,7,"Prendre l'ascenseur",null,null),
(1,3,"Vous glissez et tombez lourdement sur le trottoir.",null,4,"Se relever",null,null,null,null,null,null,null,null,null,null),
(1,4,"Vous voilà sur un trottoir gris, à côté d'un hôtel. Vous pouvez continuer sur la gauche, aller vers la droite, ou rentrer dans l'hôtel",null,21,"A gauche",null,null,18,"A droite",null,null,8,"Retourner dans l'hôtel",null,null),
(1,5,"Vous voilà dans la chambre bleue, tout aussi misérable que celle où vous vous êtes réveillé. Pas grand chose, si ce n'est une carte du Parti Communiste sur la table",null,3,"Sortir par la fenêtre",1,1,10,"Retourner dans le couloir avec la carte",null,4,10,"Retourner dans le couloir sans la carte",null,null),
(1,6,"Dans la chambre blanche, un homme est en train de fouiller. Il se retourne vers vous.",null,3,"Sortir par la fenêtre",1,1,13,"Le convaincre que vous n'êtes pas une menace.",null,null,14,"Montrer la carte du parti",3,5),
(1,7,"L'ascenseur descend et ne dessert qu'une destination : le hall",null,8,"Sortir dans le hall",null,null,null,null,null,null,null,null,null,null),
(1,8,"Encore une pièce miteuse. Un homme vous regarde par dessus son journal. Vous vous dites qu'ils se ressemblent tous.",null,4,"le trottoir",null,null,9,"Prendre l'ascenseur",null,null,29,"Se rapprocher de l'homme",null,null),
(1,9,"L'ascenseur monte et ne dessert qu'une destination : le premier étage.",null,12,"le couloir",null,null,null,null,null,null,null,null,null,null),
(1,10,"Le couloir est tout aussi miteux. Il donne sur trois chambres, dont celle dont vous sortez, et un ascenseur",null,15,"Rentrer dans la chambre à la porte rouge, celle où vous vous êtes réveillé",null,null,6,"Rentrer dans la chambre à la porte blanche",null,null,7,"Prendre l'ascenseur",null,null),
(1,11,"Le couloir est tout aussi miteux. Il donne sur trois chambres, dont celle dont vous sortez, et un ascenseur",null,5,"Rentrer dans la chambre à la porte bleue",null,null,15,"Rentrer dans la chambre à la porte rouge, celle où vous vous êtes réveillé",null,null,7,"Prendre l'ascenseur",null,null),
(1,12,"Le couloir est tout aussi miteux. Il donne sur trois chambres",null,5,"Rentrer dans la chambre à la porte bleue",null,null,6,"Rentrer dans la chambre à la porte blanche",null,null,15,"Rentrer dans la chambre à la porte rouge, celle où vous vous êtes réveillé",null,null),
(1,13,"L'homme se jette sur vous. Vous allez devoir vous défendre. Et vous êtes persuadé qu'un autre homme le remplacera bientôt si vous parveniez à le vaincre.",null,14,"combattre le garde",null,2,null,null,null,null,null,null,null,null),
(1,14,"Une fois l'homme géré, la chambre blanche ne semble pas très intéressante.",null,3,"Sortir par la fenêtre",1,1,11,"Sortir par la porte",null,null,null,null,null,null),
(1,15,"C'est toujours la même chambre miteuse. Au mur, un portrait d'Erich Honecker. Le calendrier indique 9 November. ",null,2,"Sortir par la porte",null,null,3,"Sortir par la fenêtre",1,1,null,null,null,null),
(1,16,"Vous êtes mort, et la vie n'est qu'un éternel recommencement",null,0,"Recommencer",null,3,null,null,null,null,null,null,null,null),
(1,17,"Vous arrivez devant le mur de Berlin, mais vous êtes bien trop communiste pour participer",null,0,"Recommencer",null,3,null,null,null,null,null,null,null,null),
(1,18,"C'est une impasse, dans ce monde il faut toujours aller à gauche.",null,4,"Retourner sur vos pas",null,9,null,null,null,null,null,null,null,null),
(1,19,"Vous arrivez devant le mur de Berlin avec votre pioche. Au milieu des autres, vous piochez vers la liberté. Vous resterez un inconnu dans la masse de ce jour historique",null,0,"Recommencer",null,3,null,null,null,null,null,null,null,null),
(1,20,"Vous arrivez devant le mur de Berlin avec le violoncelle. Un homme aux cheveux blancs s'approche de vous. Vous lui donnez l'instrument. Il commence à jouer, la musique est merveilleuse. Le mur tombe, vous êtes libre, et pour l'éternité vous serez celui qui a apporté son instrument à Rostropovitch",null,0,"Recommencer",null,3,null,null,null,null,null,null,null,null),
(1,21,"Loin devant vous, une clameur. Mais juste devant vous, une créature étrange, qui se jette sur vous",null,22,"Combattre",null,8,null,null,null,null,null,null,null,null),
(1,22,"Vous avez vaincu la bête. Vous pouvez revenir sur vos pas ou poursuivre",null,23,"Revenir sur vos pas",null,null,31,"Poursuivre",null,null,null,null,null,null),
(1,23,"Vous voilà sur un trottoir gris, à côté d'un hôtel. Vous pouvez continuer sur la gauche, aller vers la droite, ou rentrer dans l'hôtel",null,24,"A gauche",null,null,18,"A droite",null,null,8,"Retourner dans l'hôtel",null,null),
(1,24,"Loin devant vous, une clameur. Mais juste devant vous, une créature étrange, qui se jette sur vous",null,25,"Combattre",null,8,null,null,null,null,null,null,null,null),
(1,25,"Vous avez vaincu la bête. Vous pouvez revenir sur vos pas ou poursuivre",null,26,"Revenir sur vos pas",null,null,31,"Poursuivre",null,null,null,null,null,null),
(1,26,"Vous voilà sur un trottoir gris, à côté d'un hôtel. Vous pouvez continuer sur la gauche, aller vers la droite, ou rentrer dans l'hôtel",null,27,"A gauche",null,null,18,"A droite",null,null,8,"Retourner dans l'hôtel",null,null),
(1,27,"Loin devant vous, une clameur. Mais juste devant vous, une créature étrange, qui se jette sur vous",null,28,"Combattre",null,8,null,null,null,null,null,null,null,null),
(1,28,"Vous avez vaincu la bête. Derrière elle, un violoncelle. Vous pouvez poursuivre.",null,31,"Poursuivre",null,10,null,null,null,null,null,null,null,null),
(1,29,"Lorsque vous vous rapprochez de l'homme, il panique et vous attaque",null,30,"Se défendre",null,7,null,null,null,null,null,null,null,null),
(1,30,"Personne n'a réagi. Vous préferez tout de même sortir rapidement",null,4,"Sortir",null,null,4,"Sortir après lui avoir volé ses sandales",null,11,null,null,null,null),
(1,31,"Vous êtes à quelques pas du mur de Berlin",null,17,"Se rapprocher",null,null,19,"Ramasser une pioche et se rapprocher",6,null,20,"Sortir le violoncelle et se rapprocher",7,null);