import { Component, OnInit } from '@angular/core';
import { SidebarService } from 'src/app/services/sidebar.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Usuario } from 'src/app/models/usuario.model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent implements OnInit {

  //menuItems: any[];
  //public imgUrl = '';
  public usuario!: Usuario;


  constructor(public sidebarService:SidebarService, private usuarioService: UsuarioService) { 
    //this.menuItems = sidebarService.menu;
    this.usuario = this.usuarioService.usuario;
    //this.imgUrl = this.usuarioService.usuario.imagenUrl;
  }

  ngOnInit(): void {
  }

}
