import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {AuthResponseData} from './AuthInterface'
import { catchError, tap } from 'rxjs/operators';
import { throwError } from 'rxjs/internal/observable/throwError';
import { BehaviorSubject } from 'rxjs';
import { User } from './user.model';
import { Router } from '@angular/router';

@Injectable({
          providedIn:"root"
})
export class AuthService{

    user =new BehaviorSubject<User>(null);
    private tokenExpiration:any;

    constructor(private http:HttpClient,private router:Router){
              
    }
    logout()
    {
              this.user.next(null);
              this.router.navigate(['auth']);
              localStorage.removeItem('userdata');
              if(this.tokenExpiration){
                    clearTimeout(this.tokenExpiration);
              }
              this.tokenExpiration=null;
    }
    autoLogout(expiratationDuration:number)
    {
         this.tokenExpiration= setTimeout( () => {
                 this.logout();
          },expiratationDuration)
    }
    signup(email:string,password:string)
    {
        //const url="https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[API_KEY]";
         return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAQt-6M-oNoID7SiNR3F8xRrbfxv9_QwT4',
         {
                
                 email:email,
                 password:password,
                 returnSecureToken:true
          })
          .pipe(catchError(this.handleError),tap(respData =>{
              this.handleAuthenticate(respData.email,respData.localId,respData.idToken,
                    +respData.expiresIn);
          }) ) ;

    }

    login(email:string,password:string)
    {
              return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAQt-6M-oNoID7SiNR3F8xRrbfxv9_QwT4',
              {
                
                    email:email,
                    password:password,
                    returnSecureToken:true
              } )
              .pipe(catchError(this.handleError),tap(respData =>{
                    this.handleAuthenticate(respData.email,respData.localId,respData.idToken,
                          +respData.expiresIn);
                })) ;
    }

    private handleError(errorRes:HttpErrorResponse)
    {
          {
                    let errorMessage = 'An unknown error occurred!';
                    if (!errorRes.error || !errorRes.error.error) {
                      return throwError(errorMessage);
                    }
                    switch (errorRes.error.error.message) {
                      case 'EMAIL_EXISTS':
                        errorMessage = 'This email exists already';
                        break;
                        case 'EMAIL_NOT_FOUND':
                        errorMessage = 'This email does not exists, hence Sign Up!!';
                        break;
                        case 'INVALID_PASSWORD':
                        errorMessage = 'Entered Password is Invalid';
                        break;
                    }
                    return throwError(errorMessage);
         }
    }

    private handleAuthenticate(email:string,userid:string,token:string,expireIn:number)
    {
          const expireDate=new Date(new Date().getTime() + expireIn*1000);
          const user=new User(
                   email,
                   userid,
                   token,
                   expireDate);
               
          this.user.next(user);
          this.autoLogout(expireIn*1000);
          localStorage.setItem('userdata',JSON.stringify(user));

         
    }

    autoLogin()
    {
     const user:{
           email:string,
           localid:string,
           _token:string,
           _tokenExpirationDate:Date}=JSON.parse(localStorage.getItem('userdata'));
         
          if(!user)
          {
             return;
          }

          const loadedUser = new User(
                    user.email,
                    user.localid,
                    user._token,
                    new Date(user._tokenExpirationDate)
          )
          if(loadedUser.token)
          {
              const expirationdiff=new Date(user._tokenExpirationDate).getTime() -
                                   new Date().getTime();
              this.autoLogout(expirationdiff);
              this.user.next(loadedUser);
          }
    }
}