import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { PagesComponent } from './pages.component';
import { AuthGuard } from '../guards/auth.guard';




const routes: Routes = [

    { path: 'dashboard',
    component: PagesComponent,
    canActivate: [ AuthGuard ] ,
    canLoad: [ AuthGuard ], // Verificar que la ruta se pueda cargar
    loadChildren: () => import('./child-routes.module').then( m => m.ChildRoutesModule) // Para cargar de manera perezosa el modulo
    },

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagesRoutingModule {}
