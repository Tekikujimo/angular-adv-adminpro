import { Component, OnDestroy, OnInit } from '@angular/core';
import { delay, Subscription } from 'rxjs';
import { Medico } from 'src/app/models/medico.model';
import { BusquedasService } from 'src/app/services/busquedas.service';
import { MedicoService } from 'src/app/services/medico.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: [
  ]
})
export class MedicosComponent implements OnInit, OnDestroy {

  public medicos: Medico[] = [];
  public cargando: boolean = true;
  private imgSubs!: Subscription;


  constructor(private medicoService: MedicoService,
              private modalImagenService: ModalImagenService,
              private busquedasService: BusquedasService) { }
  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }

  ngOnInit(): void {

    this.cargarMedicos();

    
    this.imgSubs = this.modalImagenService.nuevaImagen
    .pipe(
      delay(100)
      )
    .subscribe( img => this.cargarMedicos() );

  }




  cargarMedicos(){
      this.cargando = true;
      this.medicoService.cargarMedicos()
      .subscribe( (medicos : any) => {
        this.cargando = false;
        this.medicos = medicos;
      })
  }


  async abrirSweetAlert(){

    const { value = '' } = await Swal.fire<string>({
      title: 'Crear Nuevo Médico',
      text: 'Ingrese el nombre del nuevo médico',
      input: 'text',
      inputPlaceholder: 'Nombre del Médico',
      showCancelButton: true
    })
    
    /*if( value!.trim().length > 0 ){
      this.hospitalService.crearHospital( value! )
      .subscribe( (resp : any ) => {
        this.hospitales.push( resp.hospital );
      })
    }*/
  }


  borrarMedico( medico: Medico){
  
    return Swal.fire({
      title: '¿Borrar médico?',
      text: `Esta a punto de borrar a ${ medico.nombre }`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si, borrarlo'
    }).then((result) => {
      if (result.isConfirmed) {
        this.medicoService.borrarMedico( medico )
            .subscribe( resp => {
              this.cargarMedicos();

                Swal.fire(
                  'Médico borrado',
                  `${ medico.nombre } fue eliminado correctamente`,
                  'success'
                );
                
            });
      }
    });


  }

  abrirModal( medico: Medico ){
    this.modalImagenService.abrirModal( 'medicos', medico._id! , medico.img );

  }

  buscar( termino: string) {
    if(termino.length === 0){
      return this.cargarMedicos();
    }

    this.busquedasService.buscar('medicos', termino)
        .subscribe( medicos => {
          this.medicos = medicos;
        });
      return;
  }

}
