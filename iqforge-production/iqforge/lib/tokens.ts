
import crypto from 'crypto';export function token(){const raw=crypto.randomBytes(32).toString('hex');return {raw,hash:crypto.createHash('sha256').update(raw).digest('hex')}}
