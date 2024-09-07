import {injectable, /* inject, */ BindingScope} from '@loopback/core';
import {Keys as key} from '../config/keys';
const jwt = require('jsonwebtoken');

@injectable({scope: BindingScope.TRANSIENT})
export class JwtService {
  constructor(/* Add @inject to inject parameters */) {}

  /*
   * Creación de un token JWT
   */
  CrearTokenJWT(){
    let secretKey =  llaves.jwtKey;
    let tk = jwt.sign({
      exp:
    });
  }
}
