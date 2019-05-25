import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { FormsModule } from '@angular/forms';
import { AdminComponent } from './components/admin/admin.component';
import { ParserComponent } from './components/admin/parser/parser.component';
import { TypeComponent } from './components/type/type.component';
import { UpdateComponent } from './components/admin/update/update.component';
import { UpdateListComponent } from './components/admin/update-list/update-list.component';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		AdminRoutingModule
	],
	declarations: [
		AdminComponent,
		ParserComponent,
		UpdateListComponent,
		UpdateComponent,
		TypeComponent
	],
	exports: [
		TypeComponent
	]
})
export class AdminModule {}
