/**
 * Packages:
 * npm i @loopback/authentication
 * npm i @loopback/security
 */

import {AuthenticationStrategy} from '@loopback/authentication';
import {service} from '@loopback/core';
import {HttpErrors, Request} from '@loopback/rest';
import {UserProfile} from '@loopback/security';
import parseBearerToken from 'parse-bearer-token';
import {JwtService} from '../services';

export class TestStrategy implements AuthenticationStrategy {
  name: string = 'test';
  constructor(
    @service(JwtService)
    public servicioJWT: JwtService) {

  }



  async authenticate(request: Request): Promise<UserProfile | undefined> {
    const token = parseBearerToken(request);
    if (!token) {
      throw new HttpErrors[401]("No puedes contestar este test")
    }
    let info = this.servicioJWT.VerificarTokenJWT(token);
    if (info) {
      if (info.data.id != 0 || info.data.id != null) {
        let perfil: UserProfile = Object.assign({
          id: info.data.id,
          nombre: info.data.nombre,
          consultaId: info.data.consultaId
        });
        return perfil;
      } else {
        throw new HttpErrors[401]("El token es valido, pero no tiene los permisos suficientes,Test")
      }
    }
    else {
      throw new HttpErrors[401]("El token enviado no es valido")
    }
  }
}
