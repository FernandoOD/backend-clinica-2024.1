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
      data: {
        id: usuario.id,
        email: usuario.Email,
        role: usuario.rolId
      }
    }, secretKey,
      {expiresIn: key.expTimeJWT});
    return tk;
  }

  CrearTokenTest(id: number, nombre: String, consultaId: number) {
    let secretKey = key.jwtKey;
    let tk = jwt.sign({
      data: {
        id: id,
        nombre: nombre,
        consultaId: consultaId
      }
    }, secretKey,
      {expiresIn: key.expTimeJWT});
    return tk;
  }

  /**
   * Verificar un token
   */

  VerificarTokenJWT(token: string) {
    try {
      let decode = jwt.verify(token, key.jwtKey);
      return decode;
    } catch (error) {
      return null;
    }
  }

  RoleString(token: string) {
    let info = this.VerificarTokenJWT(token);
    if (info.data.role == '67eda5d00b73c998eff4819a') {
      return 'admin';
    } else if (info.data.role == '67eda60a0b73c998eff4819c') {
      return 'paciente';
    } else if (info.data.role == '67eda5f70b73c998eff4819b') {
      return 'terapeuta';
    } else {
      throw new HttpErrors[401]("El token es valido, pero no tiene los permisos suficientes,RoleString")
    }
  }
}
