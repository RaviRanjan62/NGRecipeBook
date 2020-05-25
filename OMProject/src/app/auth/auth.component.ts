import { Component, ComponentFactoryResolver, ViewChild, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from './auth.service';

import { Observable, Subscription } from 'rxjs';
import {AuthResponseData} from './AuthInterface'
import { Router } from '@angular/router';
import { AlertComponent } from 'Shared/alert/alert.component';
import { PlaceholderDirective } from 'Shared/placeholder/placeholder.directive';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html'
})
export class AuthComponent implements OnDestroy {
   isLoginMode=false;
   isLoading=false;
   error:string=null;
   private closeSub:Subscription;

   @ViewChild(PlaceholderDirective, { static: false }) alertHost: PlaceholderDirective;

   onSwitchMode()
   {
     this.isLoginMode=!this.isLoginMode;
   }
   

   constructor(private authservice:AuthService, private router: Router,
    private componentFactoryResolver:ComponentFactoryResolver){

   }
   onSubmit(authForm:NgForm)
   {

    const email=authForm.value.email;
    const password=authForm.value.password;

     let oauth:Observable<AuthResponseData>;

      if(!authForm.valid)
      {
          return; 
      }

       this.isLoading=true;

      if(this.isLoginMode)
      {
          oauth= this.authservice.login(email,password);
      }
      else{
         oauth= this.authservice.signup(email,password);
        }
     
   oauth.subscribe(resData =>{
       console.log(resData);
        this.isLoading=false;
        this.router.navigate(['/recipes']);

      },

      errorMessage => {
        console.log(errorMessage);
        this.showErrorAlert(errorMessage);
        this.error = errorMessage;
        this.isLoading = false;
      }
    );

   }
     
   onHandleError()
   {
     this.error=null;
   }

   
  private showErrorAlert(message: string) {
    // const alertCmp = new AlertComponent();
    const alertCmpFactory = this.componentFactoryResolver.resolveComponentFactory(
      AlertComponent
    );
    const hostViewContainerRef = this.alertHost.viewContainerRef;
    hostViewContainerRef.clear();

    const componentRef = hostViewContainerRef.createComponent(alertCmpFactory);

    componentRef.instance.message = message;
    this.closeSub = componentRef.instance.close.subscribe(() => {
      this.closeSub.unsubscribe();
      hostViewContainerRef.clear();
    });
  }

  ngOnDestroy()
   {
     //this.closeSub.unsubscribe();
   }

}
