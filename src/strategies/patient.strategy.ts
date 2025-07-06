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

export class PatientStrategy implements AuthenticationStrategy {
  name: string = 'patient';
  constructor(
    @service(JwtService)
    public servicioJWT: JwtService) {

  }



  async authenticate(request: Request): Promise<UserProfile | undefined> {
    const token = parseBearerToken(request);
    if (!token) {
      throw new HttpErrors[401]("No existe un token en la solicitud")
    }
    let info = this.servicioJWT.VerificarTokenJWT(token);
    if (info) {
      if (info.data.role == '67eda60a0b73c998eff4819c') {
        let perfil: UserProfile = Object.assign({
          email: info.data.email,
          password: info.data.password,
          role: info.data.role
        });
        return perfil;
      } else {
        throw new HttpErrors[401]("El token en valido, pero no tiene los permisos suficientes,Paciente")
      }
    }
    else {
      throw new HttpErrors[401]("El token enviado no es valido")
    }
  }
}
