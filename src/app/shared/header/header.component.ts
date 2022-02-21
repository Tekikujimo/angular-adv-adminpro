import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Usuario } from 'src/app/models/usuario.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent implements OnInit {

  //public imgUrl = '';
  public usuario!: Usuario;

  constructor( private usuarioService: UsuarioService,
               private router: Router) { 
    
    this.usuario = this.usuarioService.usuario;
    //this.imgUrl = this.usuarioService.usuario.imagenUrl;

  }

  ngOnInit(): void {
  }


  logout(){
    this.usuarioService.logout();
  }

  buscar( termino: string ){

    if ( termino.length === 0 ) {
      return;

    }

    this.router.navigateByUrl(`/dashboard/buscar/${ termino }`)
  }

}
