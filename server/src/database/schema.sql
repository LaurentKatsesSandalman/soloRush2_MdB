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
    exit1_contrainte VARCHAR(50),
    exit1_ztarget INT UNSIGNED,
    FOREIGN KEY (exit1_ztarget) REFERENCES ztarget (ztarget_id),
    exit2_id INT UNSIGNED,
    exit2_desc VARCHAR(100),
    exit2_contrainte VARCHAR(50),
    exit2_ztarget INT UNSIGNED,
    FOREIGN KEY (exit2_ztarget) REFERENCES ztarget (ztarget_id),
    exit3_id INT UNSIGNED,
    exit3_desc VARCHAR(100),
    exit3_contrainte VARCHAR(50),
    exit3_ztarget INT UNSIGNED,
    FOREIGN KEY (exit3_ztarget) REFERENCES ztarget (ztarget_id)
);

