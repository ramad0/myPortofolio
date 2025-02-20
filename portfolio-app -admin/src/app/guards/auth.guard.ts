import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../Services_/auth.service';


export const authGuard: CanActivateFn = (route, state) => {
  const _authS = inject (AuthService);
  const _router = inject(Router);
if(_authS.isLogedin()){
  return true;
}
else
{
  _router.navigate(['login']);
  return false
}

};
