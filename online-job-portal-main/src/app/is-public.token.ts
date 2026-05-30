import { HttpContextToken } from '@angular/common/http';

// By default, requests are not public (false)
export const IS_PUBLIC_ROUTE = new HttpContextToken<boolean>(() => false);