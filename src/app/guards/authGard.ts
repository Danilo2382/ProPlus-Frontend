import { inject } from '@angular/core';
import { Router} from "@angular/router";
import { AuthService} from "../services/auth.service";
import {showInfo} from "../sweetalert/alerts";

export const authGard = () => {
  const authService = inject(AuthService);
  const router = inject(Router);
  if (authService.isAuthenticated()) return true;
  showInfo('warning', 'You are not logged in.');
  return router.navigate(['/home']);
}

export const registrationGuard = () => {
  const  authService = inject(AuthService);
  const router = inject(Router);
  if (authService.isAuthenticated()) {
    showInfo('warning', "You can't register while logged in.");
    return router.navigate(['/home']);
  }
  return true;
}
