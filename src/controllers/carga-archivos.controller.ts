import {authenticate} from '@loopback/authentication';
import {inject} from '@loopback/core';
import {
  HttpErrors,
  post,
  Request,
  requestBody,
  Response,
  RestBindings
} from '@loopback/rest';
import multer from 'multer';
import path from 'path';
import {Keys as key} from "../config/keys";

export class CargaArchivosController {
  constructor(
  ) { }

  /**
   *
   * @param response
   * @param request
   */
  @post('/uploadImage', {
    responses: {
      200: {
        content: {
          'application/json': {
            schema: {
              type: 'object',
            },
          },
        },
        description: 'Profile Image',
      },
    },
  })


  async profileImageUpload(
    @inject(RestBindings.Http.RESPONSE) response: Response,
    @requestBody.file() request: Request,
  ): Promise<object | false> {
    const profileImagePath = path.join(__dirname, key.carpetaImagenPaciente);
    let res = await this.StoreFileToPath(profileImagePath, key.fieldImagePatient, request, response, key.imgExtensions);
    if (res) {
      const filename = response.req?.file?.filename;
      if (filename) {
        return {archivo: filename};
      }
    }
    return res;
  }

  @authenticate('test')
  @post('/uploadPDF', {
    responses: {
      200: {
        content: {
          'application/json': {
            schema: {
              type: 'object',
            },
          },
        },
        description: 'PDF Resultados Test',
      },
    },
  })


  async pdfUpload(
    @inject(RestBindings.Http.RESPONSE) response: Response,
    @requestBody.file() request: Request,
  ): Promise<object | false> {
    const date = new Date().toLocaleDateString();
    const pdfTestPath = path.join(__dirname, key.carpetaPdfTest);
    let res = await this.StoreFileToPath(pdfTestPath, key.fieldImagePatient, request, response, key.fileExtensions);
    if (res) {
      const filename = response.req?.file?.filename;
      if (filename) {
        return {archivo: filename};
      }
    }
    return res;
  }



  /**
   * Return a config for multer storage
   * @param path
   */
  private GetMulterStorageConfig(path: string) {
    var filename: string = '';
    const storage = multer.diskStorage({
      destination: function (req: any, file: any, cb: any) {
        cb(null, path)
      },
      filename: function (req: any, file: any, cb: any) {
        filename = `${new Date().toLocaleDateString().replace(/\//g, '-')}-${file.originalname}`
        cb(null, filename);
      }
    });
    return storage;
  }

  /**
   * store the file in a specific path
   * @param storePath
   * @param request
   * @param response
   */
  private StoreFileToPath(storePath: string, fieldname: string, request: Request, response: Response, acceptedExt: string[]): Promise<object> {
    return new Promise<object>((resolve, reject) => {
      const storage = this.GetMulterStorageConfig(storePath);
      const upload = multer({
        storage: storage,
        fileFilter: function (req: any, file: any, callback: any) {
          var ext = path.extname(file.originalname).toUpperCase();
          if (acceptedExt.includes(ext)) {
            return callback(null, true);
          }
          return callback(new HttpErrors[400]('El formato del archivo no es permitido.'));
        },
        limits: {
          fileSize: key.fileSizeImagePatient
        }
      },
      ).single(fieldname);
      upload(request, response, (err: any) => {
        if (err) {
          reject(err);
        }
        resolve(response);
      });
    });
  }

}
