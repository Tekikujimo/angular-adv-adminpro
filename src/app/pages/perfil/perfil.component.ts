import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Usuario } from 'src/app/models/usuario.model';
import swal from 'sweetalert2';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styles: [
  ]
})
export class PerfilComponent implements OnInit {


public perfilForm!: FormGroup;
public usuario: Usuario;
public imagenSubir!: File;
public imgTemp: any = null;


  constructor( private fb: FormBuilder, private usuarioService: UsuarioService, private fileUploadService: FileUploadService) { 

    this.usuario =  this.usuarioService.usuario;

    console.log(this.usuario);

  }

  ngOnInit(): void {


    this.perfilForm = this.fb.group({
      nombre: [this.usuario.nombre, Validators.required ],
      email: [this.usuario.email, [ Validators.required, Validators.email ]]
    });

  }


  actualizarPerfil(){
    console.log(this.perfilForm.value);
    this.usuarioService.actualizarPerfil( this.perfilForm.value )
        .subscribe( (r)=>{
         
          const { nombre, email } = this.perfilForm.value;
          this.usuario.nombre = nombre;
          this.usuario.email = email;

          console.log(r);

          swal.fire('Guardado', "Cambios fueron guardados", 'success');

        }, (err) => {
          swal.fire('Error', err.error.msg, 'error');
        });

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
    this.fileUploadService
                .actualizarFoto(this.imagenSubir,'usuarios', this.usuario.uid)
                .then( (img) =>  {
                  this.usuario.img = img
                  swal.fire('Guardado', "Se actualizo la imagen del perfil", 'success');
                }, (err) => {
                  swal.fire('Error', ' No se pudo subir la imagen' , 'error');
                } );
  }

}
