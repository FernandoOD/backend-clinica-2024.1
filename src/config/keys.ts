export namespace Keys {
    export const AESKey = 'Im4g1ne@ns';
    export const jwtKey = '5hhCl4v3@JWT';
    export const expTimeJWT = (Date.now() / 1000) + (60 * 60 * 10);
    export const carpetaImagenPaciente = "../../archivos/pacientes";
    export const fieldImagePatient = "file";
    export const imgExtensions: string[] = ['.PNG', '.JPG', '.JPEG', '.SVG'];
    export const fileSizeImagePatient = 1024 * 1024;
}
