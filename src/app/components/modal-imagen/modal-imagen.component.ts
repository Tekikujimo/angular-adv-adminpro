import { Component, OnInit } from '@angular/core';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-imagen',
  templateUrl: './modal-imagen.component.html',
  styles: [
  ]
})
export class ModalImagenComponent implements OnInit {

  public imagenSubir!: File;
  public imgTemp: any = null;



  // Me quede en el agregado de la modal para cargar imagenes

  constructor(public modalImagenService: ModalImagenService, 
              public fileUploadService: FileUploadService) { }

  ngOnInit(): void {
  }


  cerrarModal() {
    this.imgTemp = null;
    this.modalImagenService.cerrarModal();
  }

  cambiarImagen( target: any ){
    let file = target.files[0];
    this.imagenSubir = file;

    if ( !file ) { 
      return this.imgTemp = null; 
    }

    const reader = new FileReader();
    reader.readAsDataURL( file );

    reader.onloadend = () => {
      this.imgTemp = reader.result;
    }

    console.log(this.imgTemp)

    return this.imgTemp;
  }

  subirImagen(){

    const id = this.modalImagenService.id;
    const tipo = this.modalImagenService.tipo;

    this.fileUploadService
                .actualizarFoto(this.imagenSubir, tipo, id )
                .then( (img) =>  {
                  Swal.fire('Guardado', "Se actualizo la imagen del perfil", 'success');
                  this.modalImagenService.nuevaImagen.emit(img);
                  this.cerrarModal();
                }, (err) => {
                  Swal.fire('Error', ' No se pudo subir la imagen' , 'error');
                } );
  }

}
