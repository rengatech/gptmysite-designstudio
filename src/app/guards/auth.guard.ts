import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserModel } from 'src/chat21-core/models/user';
import { AppStorageService } from 'src/chat21-core/providers/abstract/app-storage.service';
import { GPTMysiteAuthService } from 'src/chat21-core/providers/GPTMysite/GPTMysite-auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  user: UserModel;

  constructor(
    private appStorageService: AppStorageService,
    private GPTMysiteAuthService: GPTMysiteAuthService,
  ){ }

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    
    const url = state.url;
    const _url = route['_routerState'].url

    const queryParams = route.queryParams['jwt']
    // if(!queryParams){
    //   return false
    // }
    const storedGPTMysiteoken = localStorage.getItem('GPTMysite_token')
    if(!queryParams && !storedGPTMysiteoken){
      //goToSignIn Dashboard
      // localStorage.setItem('dshbrd----'+'wannago', state.url)
      return false
    }    

    var isAuthenticated = await this.GPTMysiteAuthService.isLoggedIn(); 
    if (!isAuthenticated) { 
      //goToSignIn Dashboard
      return false
    } 
    return isAuthenticated; 

  }
  
}
