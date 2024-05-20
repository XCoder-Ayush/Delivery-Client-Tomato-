import { CanActivateFn } from '@angular/router';

export const forbiddenGuard: CanActivateFn = (route, state) => {
  return true;
};
