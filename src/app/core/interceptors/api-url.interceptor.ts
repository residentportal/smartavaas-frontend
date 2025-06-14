import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../../../environments/environment';

export const apiUrlInterceptor: HttpInterceptorFn = (req, next) => {
  const baseUrl = environment.apiUrl;
  req = req.clone({
    url: `${baseUrl}${req.url}`,
  });
  return next(req);
};
