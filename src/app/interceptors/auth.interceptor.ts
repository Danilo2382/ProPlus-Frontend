import { HttpInterceptorFn } from '@angular/common/http';

export function authInterceptor(): HttpInterceptorFn {
  return (req, next) => {
    if (req.url.includes('/auth/login') || req.url.includes('/auth/register'))
      return next(req);
    const username = localStorage.getItem('username');
    const password = localStorage.getItem('password');
    const basicAuth = 'Basic ' + btoa(`${username}:${password}`);
    const clonedReq = req.clone({
      setHeaders: {
        Authorization: basicAuth
      }
    });
    return next(clonedReq);
  };
}
