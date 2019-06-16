import { HttpHeaders } from '@angular/common/http';

export const lsTokenName = 'currentUser';

export const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};
