import { /* inject, */ BindingScope, injectable} from '@loopback/core';

import CryptoJS from 'crypto-js';
import {generate as passGenerator} from 'generate-password';

@injectable({scope: BindingScope.TRANSIENT})
export class GeneralFunctionsService {
  constructor(/* Add @inject to inject parameters */) { }

  /*
     * Funcion para generar una clave aleatoria
    */

  GenerarClaveAleatoria(): string {
    let pass = passGenerator({
      length: 10,
      numbers: true,
      uppercase: true,
      lowercase: true
    });

    return pass;
  }

  /*
   * Cifrado de contraseña
   */
  CifrarPassword(password: string): string {
    // let cipherText = CryptoJS.AES.encrypt('password','key.AESKey').toString();
    let cipherText = CryptoJS.MD5(password).toString();
    return cipherText;
  }
}
