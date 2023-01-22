import { WithId } from "mongodb";

/*type oneToNine = 1|2|3|4|5|6|7|8|9
type zeroToNine = 0|1|2|3|4|5|6|7|8|9

type YYYY = `19${zeroToNine}${zeroToNine}` | `20${zeroToNine}${zeroToNine}`
type MM = `0${oneToNine}` | `1${0|1|2}`
type DD = `${0}${oneToNine}` | `${1|2}${zeroToNine}` | `3${0|1}`*/
export type DateStringT = string;

export type NewTaskT = {
    title:string,
    task:string,
    date:DateStringT
}

export type TaskT = NewTaskT & {
    success:boolean,
    priority:number
}

export type TaskSimpleIdT = TaskT & { id:string };
export type TaskMongoIdT = WithId<TaskT>;


export type TodoBaseT = TaskMongoIdT[];
export type TodoUiT =  {[key:string]:TaskSimpleIdT[]};


export type CorrectTaskT = {
    id:string,
    title?: string;
    task?: string;
    priority?: number;
    success?:boolean,
  };

