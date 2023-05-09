import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  CanDeactivate,
  CanLoad,
  CanMatch,
  Route,
  Router,
  RouterStateSnapshot,
  UrlSegment,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/feature/auth/services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class StudentGuard
  implements
    CanActivate,
    CanActivateChild,
    CanDeactivate<unknown>,
    CanLoad,
    CanMatch
{
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return true;
  }
  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return true;
  }
  canDeactivate(
    component: unknown,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return true;
  }
  canMatch(
    route: Route,
    segments: UrlSegment[]
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const role = this.authService.getCurrentUser().role;
    const token = localStorage.getItem('token');
    if (token && role === 'student') {
      return true;
    }
    this.router.navigate(['auth']);
    return false;
  }
  canLoad(
    route: Route,
    segments: UrlSegment[]
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const user = this.authService.getCurrentUser();
    const token = localStorage.getItem('token');
    if (!user && !token) {
      return true;
    } else if (user.role === 'student') {
      this.router.navigate(['student']);
    } else if (user.role === 'teacher') {
      this.router.navigate(['teacher']);
    }
    return false;
  }
}
