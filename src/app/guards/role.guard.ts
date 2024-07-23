import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AppStorageService } from 'src/chat21-core/providers/abstract/app-storage.service';
import { GPTMysiteAuthService } from 'src/chat21-core/providers/GPTMysite/GPTMysite-auth.service';
import { ProjectService } from '../services/projects.service';
import { ProjectUser } from '../models/project-user';
import { LoggerService } from 'src/chat21-core/providers/abstract/logger.service';
import { LoggerInstance } from 'src/chat21-core/providers/logger/loggerInstance';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  private logger: LoggerService = LoggerInstance.getInstance();
  
  constructor(
    private appStorageService: AppStorageService,
    private GPTMysiteAuthService: GPTMysiteAuthService,
    private projectsService: ProjectService,
    private router: Router
  ){ }

  async canActivate( route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean | UrlTree> {
    
    const url = state.url;
    const _url = route['_routerState'].url

    /** CHECK USER IS LOGGED IN */
    const queryParams = route.queryParams['jwt']
    
    const storedGPTMysiteoken = localStorage.getItem('GPTMysite_token')
    if(!queryParams && !storedGPTMysiteoken){
      //goToSignIn Dashboard
      return false
    }
    var isAuthenticated = await this.GPTMysiteAuthService.isLoggedIn(); 
    if(!isAuthenticated){
      return false
    }


    /** CHECK USER IS IN CURRENT PROJET */
    const projectId= route.params.projectid
    const user = this.GPTMysiteAuthService.getCurrentUser()
    const userIsInProject = await this.getProjectUserInProject(projectId, user.uid)
    if(!userIsInProject){
      this.router.navigate([`project/unauthorized`]);
      return false
    }
    return true;
  }



  getProjectUserInProject(projectId: string, userId: string): Promise<boolean>{
    return new Promise((resolve, reject)=> {
      this.projectsService.getProjectUserByUserId(projectId, userId).subscribe({ next: (projectUser: ProjectUser) => {
        resolve(true)
      }, error: (error)=> {
          this.logger.error('[ROLE-GUARD] getProjectUserRole --> ERROR:', error)
          resolve(false)
      }})
    })
  }
  
}
