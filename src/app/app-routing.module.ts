import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AppComponent } from "./app.component";
import { GraphsComponent } from "./components/graphs/graphs.component";
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "success", component: GraphsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
