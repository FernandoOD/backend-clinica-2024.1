import { /* inject, */ BindingScope, injectable} from '@loopback/core';
import {HttpErrors} from '@loopback/rest';
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

  CrearTokenTest(id: number, nombre: String, consultaId: number) {
    let secretKey = key.jwtKey;
    let tk = jwt.sign({
      exp: key.expTimeJWT,
      data: {
        id: id,
        nombre: nombre,
        consultaId: consultaId
      }
    }, secretKey);
    return tk;
  }

  /**
   * Verificar un token
   */

  VerificarTokenJWT(token: string) {
    try {
      let decode = jwt.verify(token, key.jwtKey);
      return decode;
    } catch {
      return null;
    }
  }

  RoleString(token: string) {
    let info = this.VerificarTokenJWT(token);
    if (info.data.role == '66d252437142ea3216140930') {
      return 'admin';
    } else if (info.data.role == '66d2530b7142ea3216140931') {
      return 'paciente';
    } else if (info.data.role == '66d2532a7142ea3216140932') {
      return 'terapeuta';
    } else {
      throw new HttpErrors[401]("El token es valido, pero no tiene los permisos suficientes")
    }
  }
}
