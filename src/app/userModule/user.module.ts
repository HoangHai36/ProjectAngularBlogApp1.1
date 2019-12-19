import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { ProfilePageComponent } from './profile-page/profile-page.component'
import { SettingPageComponent } from './setting-page/setting-page.component';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { AuthGuard } from '../auth.guard';

const userRouters: Routes = [
  {
    path: '', children: [
      { path: 'setting', canActivate: [AuthGuard], component: SettingPageComponent },
      { path: ':username', component: ProfilePageComponent },
    ]
  }
];
@NgModule({
  declarations: [
    ProfilePageComponent,
    SettingPageComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
    RouterModule.forChild(userRouters)
  ]
})
export class UserModule { }
