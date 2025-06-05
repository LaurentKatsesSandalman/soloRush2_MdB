
export interface Chapter {
story_id: number;
chapter_id: number;
chapter_desc: string;
chapter_zeffect?: number;
exit1_id: number;
exit1_desc: string;
exit1_contrainte?: number;
exit1_ztarget?: number;
exit2_id?: number;
exit2_desc?: string;
exit2_contrainte?: number;
exit2_ztarget?: number;
exit3_id?: number;
exit3_desc?: string;
exit3_contrainte?: number;
exit3_ztarget?: number;
}
export interface Zeffect {
zeffect_id: number;
zeffect_type: string;
zeffect_life?: number;
zeffect_com?: number;
zeffect_zobject?: number;











}



export interface Contrainte {
contrainte_id: number;
contrainte_minlife?: number;
contrainte_maxlife?: number;
contrainte_mincom?: number;
contrainte_maxcom?: number;
contrainte_zobject?: number;










}
export interface Zobject {
zobject_id: number;
zobject_name: string;
zobject_image?: string;
zobject_type: string;
zobject_damage?: number;
zobject_range?: number;










}
export interface Fight {
fight_id: number;
fight_name: string;
fight_damage: number;
fight_res: number;
fight_drop?: number;
fight_droprate?: number;
fight_zeffect?: number;









}



export interface Target {
ztarget_id: number;
ztarget_type: string;
zobject_id?: number;
fight_id?: number;
zeffect_id?: number;











}