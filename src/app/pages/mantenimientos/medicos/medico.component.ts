import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { delay, Subscription } from 'rxjs';
import { Hospital } from 'src/app/models/hospital.model';
import { Medico } from 'src/app/models/medico.model';
import { HospitalService } from 'src/app/services/hospital.service';
import { MedicoService } from 'src/app/services/medico.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: [
  ]
})
export class MedicoComponent implements OnInit, OnDestroy {

  public medicoForm!: FormGroup;
  public hospitales: Hospital[] = [];

  public medicoSeleccionado?: Medico;
  public hospitalSeleccionado?: Hospital;

  private imgSubs!: Subscription;

  constructor( private fb: FormBuilder,
               private hospitalService : HospitalService,
               private medicoService: MedicoService,
               private router: Router,
               private activatedRoute: ActivatedRoute,
               private modalImagenService: ModalImagenService) { }

  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }

  ngOnInit(): void {

    var idMedico:any;

    this.activatedRoute.params.subscribe( ( { id } ) => {
      idMedico = id;
      this.cargarMedico(idMedico);
    });
    
    this.imgSubs = this.modalImagenService.nuevaImagen
    .pipe(
      delay(100)
      )
    .subscribe( img => this.cargarMedico(idMedico) );

    
    this.medicoForm = this.fb.group({
      nombre: ['', Validators.required] ,
      hospital: ['', Validators.required] 
    });


    this.cargarHospitales();

    this.medicoForm.get('hospital')?.valueChanges
                   .subscribe( hospitalId => {
                     this.hospitalSeleccionado = this.hospitales.find( h => h._id === hospitalId );
                     console.log(this.hospitalSeleccionado);
                   });

  }



  cargarMedico(id: string){

    if ( id === 'nuevo') {
      return;
    }

    this.medicoService.obtenerMedicoPorId( id )
                      .pipe(
                        delay(100)
                      )
                      .subscribe( medico => {
                        
                        if (!medico) {
                          this.router.navigateByUrl(`/dashboard/medicos`);
                          return;
                        }

                        const { nombre, hospital : { _id }} = medico;
                        this.medicoSeleccionado = medico;
                        this.medicoForm.setValue({ nombre, hospital: _id });

                      });
  }

  cargarHospitales() {
    this.hospitalService.cargarHospitales()
        .subscribe( (hospitales: Hospital[]) => {
            console.log(hospitales);
            this.hospitales = hospitales;
        })
  }
 
  guardarMedico(){

    if ( this.medicoSeleccionado ) {
      const { nombre } = this.medicoForm.value;
      // actualizar
      const data = {
        ...this.medicoForm.value,
        _id: this.medicoSeleccionado._id
      }
      /*console.log("Que hay aqui");
      console.log(data);
      console.log(this.medicoForm.value);*/
      this.medicoService.actualizarMedico(data)
                        .subscribe((resp : any) => {
                          Swal.fire('Actualizado', `${ nombre } actualizado correctamente`, 'success');
                        });

    } else {
      // crear
      const { nombre } = this.medicoForm.value;
      this.medicoService.crearMedico( this.medicoForm.value )
                        .subscribe( (resp : any) => {
                          Swal.fire('Creado', `${ nombre } creado correctamente`, 'success');
                          this.router.navigateByUrl(`/dashboard/medico/${ resp.medico._id }`);
                        })
    }


  }

  abrirModal( medico: Medico ){
    this.modalImagenService.abrirModal( 'medicos', medico._id! , medico.img );

  }


}
