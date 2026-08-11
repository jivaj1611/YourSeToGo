import {updateTheta} from '@/lib/scoring/irt';
export function nextDifficulty(theta:number){return Math.max(1,Math.min(10,Math.round(5+theta*1.4)))}
export function chooseQuestion<T extends {difficulty:number}>(items:T[],theta:number,used:Set<string>){const target=nextDifficulty(theta);return items.filter((x:any)=>!used.has(x.id)).sort((a,b)=>Math.abs(a.difficulty-target)-Math.abs(b.difficulty-target))[0]??null}
export {updateTheta};
