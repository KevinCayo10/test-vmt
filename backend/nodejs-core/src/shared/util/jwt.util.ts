import * as jwt from 'jsonwebtoken';
import environment from '../../insfraestructure/persistence/loading-env';

const SECRET = environment.PASSWORD_SECRET as unknown as jwt.Secret;

export function signToken(payload: object, expiresIn = '1h'): string {
  return jwt.sign(payload as any, SECRET, { expiresIn } as jwt.SignOptions);
}

export function verifyToken(token: string): any {
  return jwt.verify(token, SECRET as jwt.Secret);
}
