
export class FileItem {
    public file: File; // propiedad de TS con info del archivo: peso, nombre, tipo, etc.
    public fileName: string;
    public url: string;
    public uploading: boolean;
    public progress: number;

    constructor(file: File) {
        this.file = file;
        this.fileName = file.name;
        this.uploading = false;
        this.progress = 0;
    }

}