import {cookies,headers} from 'next/headers';import {SignJWT,jwtVerify} from 'jose';import {db} from './db';
const secret=new TextEncoder().encode(process.env.SESSION_SECRET||'development-secret-change-me');
export async function setSession(userId:string){const token=await new SignJWT({sub:userId}).setProtectedHeader({alg:'HS256'}).setIssuedAt().setExpirationTime('30d').sign(secret);(await cookies()).set('iqforge_session',token,{httpOnly:true,secure:process.env.NODE_ENV==='production',sameSite:'lax',path:'/',maxAge:60*60*24*30});}
export async function getSessionUser(){const token=(await cookies()).get('iqforge_session')?.value;if(!token)return null;try{const {payload}=await jwtVerify(token,secret);if(!payload.sub)return null;return db.user.findUnique({where:{id:String(payload.sub)}})}catch{return null}}
export async function clearSession(){(await cookies()).delete('iqforge_session')}
export async function requireUser(){const user=await getSessionUser();if(!user)throw new Error('UNAUTHORIZED');return user}
export async function requireSameOrigin(){const h=await headers();const origin=h.get('origin');const host=h.get('host');if(origin&&host){try{if(new URL(origin).host!==host)throw new Error('CSRF')}catch{throw new Error('CSRF')}}}
