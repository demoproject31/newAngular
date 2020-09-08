import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LoginSuccesComponent } from './login-succes/login-succes.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input'
import {MatCheckboxModule} from '@angular/material/checkbox';  
import { MatCardModule } from '@angular/material/card';
import {MatRadioModule} from '@angular/material/radio';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatGridListModule} from '@angular/material/grid-list';
// import {  MatIconModule, MatSidenavModule, MatListModule} from  '@angular/material';
import { SocialLoginModule, SocialAuthServiceConfig } from 'angularx-social-login';
import {
  GoogleLoginProvider,
  FacebookLoginProvider,
  AmazonLoginProvider,
} from 'angularx-social-login';
import {MatIconModule} from '@angular/material/icon';
import {MatStepperModule} from '@angular/material/stepper';
import {  ReactiveFormsModule } from '@angular/forms';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { HomepageComponent } from './homepage/homepage.component';
import { MainPageComponent } from './main-page/main-page.component';
// import {AngularFireModule}  from 'angularfire2';
import {AngularFireDatabaseModule}  from 'angularfire2/database';
import { environment } from 'src/environments/environment';
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFireModule } from "@angular/fire";
import {MatDividerModule} from '@angular/material/divider';
import { AdminpanalComponent } from './adminpanal/adminpanal.component';
import { AdminloginComponent } from './adminlogin/adminlogin.component'; 


// import { AngularFireAuthModule } from 'angularfire2/auth';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LoginSuccesComponent,
    HomepageComponent,
    MainPageComponent,
    AdminpanalComponent,
    AdminloginComponent
  ],
  imports: [
    BrowserModule,SocialLoginModule,
    MatGridListModule,
    MatDatepickerModule,
    MatListModule,
    MatSidenavModule,
    MatRadioModule, 
    ReactiveFormsModule,
    MatIconModule,
    MatStepperModule,
    FormsModule,
    MatCardModule,
    HttpClientModule,
    AppRoutingModule,
    MatDividerModule,
    MatButtonModule,
    MatInputModule,
    MatToolbarModule,
    MatFormFieldModule,
    BrowserAnimationsModule,
    MatCheckboxModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFireDatabaseModule
  
    // AngularFireAuthModule
  ], 
  providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              'clientId'
            ),
          },
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider('clientId'),
          },
          {
            id: AmazonLoginProvider.PROVIDER_ID,
            provider: new AmazonLoginProvider(
              'clientId'
            ),
          },
        ],
      } as SocialAuthServiceConfig,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
