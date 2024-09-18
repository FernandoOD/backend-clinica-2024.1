import { /* inject, */ BindingScope, injectable} from '@loopback/core';
import {Keys as key} from '../config/keys';
import {Usuario} from '../models';
const jwt = require('jsonwebtoken');

@injectable({scope: BindingScope.TRANSIENT})
export class JwtService {
  constructor(/* Add @inject to inject parameters */) { }

  /*
   * Creación de un token JWT
   */
  CrearTokenJWT(usuario: Usuario) {
    let secretKey = key.jwtKey;
    let tk = jwt.sign({
      exp: key.expTimeJWT,
      data: {
        id: usuario.id,
        email: usuario.Email,
        role: usuario.rolId
      }
    }, secretKey);
    return tk;
  }
}
