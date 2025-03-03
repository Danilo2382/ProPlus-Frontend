import { HttpInterceptorFn } from '@angular/common/http';
import {AppConstants} from "../constants/app.constants";

export function authInterceptor(): HttpInterceptorFn {
  return (req, next) => {
    if (req.url.includes(AppConstants.LOGIN_API_URL) || req.url.includes(AppConstants.REGISTER_API_URL))
      return next(req);
    const clonedReq = req.clone({
      setHeaders: {
        Authorization: <string>sessionStorage.getItem("JWT")
      }
    });
    return next(clonedReq);
  };
}
