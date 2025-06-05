import { RowDataPacket } from "mysql2";

export interface Chapter extends RowDataPacket{
story_id: number;
chapter_id: number;
chapter_desc: string;
chapter_zeffect?: number;
exit1_id: number;
exit1_desc: string;
exit1_contrainte?: string;
exit1_ztarget?: number;
exit2_id?: number;
exit2_desc?: string;
exit2_contrainte?: string;
exit2_ztarget?: number;
exit3_id?: number;
exit3_desc?: string;
exit3_contrainte?: string;
exit3_ztarget?: number;
}
export interface Effect extends RowDataPacket{
zeffect_id: number;
zeffect_type: string;
zeffect_life?: number;
zeffect_com?: number;
zeffect_zobject?: number;











}



export interface Constraint extends RowDataPacket{
contrainte_id: number;
contrainte_minlife?: number;
contrainte_maxlife?: number;
contrainte_mincom?: number;
contrainte_maxcom?: number;
contrainte_zobject?: number;










}
export interface Object extends RowDataPacket{
zobject_id: number;
zobject_name: string;
zobject_image?: string;
zobject_type: string;
zobject_damage?: number;
zobject_range?: number;










}
export interface Fight extends RowDataPacket{
fight_id: number;
fight_name: string;
fight_damage: number;
fight_res: number;
fight_drop?: number;
fight_droprate?: number;
fight_zeffect?: number;









}



export interface Target extends RowDataPacket{
ztarget_id: number;
ztarget_type: string;
zobject_id?: number;
fight_id?: number;
zeffect_id?: number;











}