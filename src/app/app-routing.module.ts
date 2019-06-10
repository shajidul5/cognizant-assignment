import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CacheComponent } from './cache/cache.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { UserInteractionComponent } from './user-interaction/user-interaction.component';

const routes: Routes = [
  { path: 'cache', component: CacheComponent },
  { path: 'rxjs', component: RxjsComponent},
  { path: 'ui', component: UserInteractionComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
