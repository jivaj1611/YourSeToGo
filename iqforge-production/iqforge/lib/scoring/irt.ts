export type Item={difficulty:number;discrimination:number};export type Response={correct:boolean;responseTimeMs:number;difficulty:number};
export function probability(theta:number,item:Item){return 1/(1+Math.exp(-item.discrimination*(theta-item.difficulty)))}
export function updateTheta(theta:number,item:Item,correct:boolean){const p=probability(theta,item);const info=item.discrimination*item.discrimination*p*(1-p);const step=(Number(correct)-p)/(info+0.35);return Math.max(-3.5,Math.min(3.5,theta+step*0.55))}
export function percentile(theta:number){const z=Math.max(-4,Math.min(4,theta));return Math.round(100/(1+Math.exp(-1.25*z))*10)/10}
export function abilityRange(theta:number,confidence=0.9){const center=100+15*theta;const spread=Math.max(5,Math.round(13-confidence*5));return {low:Math.round(center-spread),high:Math.round(center+spread),center:Math.round(center)}}
export function normalized(raw:number,total:number){return total?Math.round(raw/total*100):0}
