import {inject} from '@loopback/core';
import {
  get,

  HttpErrors, oas,
  param,
  Response,
  RestBindings
} from '@loopback/rest';
import fs from 'fs';
import path from 'path';
import {promisify} from 'util';
import {Keys as key} from "../config/keys";


const readdir = promisify(fs.readdir);

/**
 * A controller to handle file downloads using multipart/form-data media type
 */
export class DescargaArchivoController {

  constructor(
  ) { }

  /**
   *
   * @param type
   * @param id
   */
  @get('/files/{type}', {
    responses: {
      200: {
        content: {
          // string[]
          'application/json': {
            schema: {
              type: 'array',
              items: {
                type: 'string',
              },
            },
          },
        },
        description: 'A list of files',
      },
    },
  })
  async listFiles(
    @param.path.number('type') type: number,) {
    const folderPath = this.GetFolderPathByType(type);
    const files = await readdir(folderPath);
    return files;
  }

  /**
   *
   * @param type
   * @param recordId
   * @param response
   */
  @get('/files/{type}/{filename}')
  @oas.response.file()
  async downloadFile(
    @param.path.number('type') type: number,
    @param.path.string('filename') filename: string,
    @inject(RestBindings.Http.RESPONSE) response: Response,
  ) {
    const folder = this.GetFolderPathByType(type);
    const file = this.ValidateFileName(folder, filename);
    //console.log("folder: " + folder)
    //console.log("fname: " + fileName)
    response.download(file, filename);
    return response;
  }

  /**
   * Get the folder when files are uploaded by type
   * @param type
   */
  private GetFolderPathByType(type: number) {
    let filePath = '';
    switch (type) {
      // Perfil
      case 1:
        filePath = path.join(__dirname, key.carpetaImagenPaciente);
        break;
    }
    return filePath;
  }

  /**
   *
   * @param type

  private async GetFilenameById(type: number, recordId: string) {
    let fileName = '';
    switch (type) {
      // customer
      case 1:
        const student: Student = await this.studentRepository.findById(recordId);
        fileName = student.profilePhoto ?? '';
        break;
      // product
      case 2:
        const course: Course = await this.courseRepository.findById(recordId);
        fileName = course.image;
        break;
      // advertising
      case 3:
        const adv: Advertising = await this.advertisingRepository.findById(recordId);
        fileName = adv.image;
        break;
    }
    return fileName;
  }
 */
  /**
   * Validate file names to prevent them goes beyond the designated directory
   * @param fileName - File name
   */
  private ValidateFileName(folder: string, fileName: string) {
    const resolved = path.resolve(folder, fileName);
    if (resolved.startsWith(folder)) return resolved;
    // The resolved file is outside sandbox
    throw new HttpErrors[400](`Invalid file name: ${fileName}`);
  }

}
