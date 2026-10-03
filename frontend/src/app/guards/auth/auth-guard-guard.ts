import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth-service';
import { isPlatformBrowser } from '@angular/common';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const platformId = inject(PLATFORM_ID);

  console.log('🛡️ Auth Guard - Checking authentication');
  console.log('Platform:', isPlatformBrowser(platformId) ? 'Browser' : 'Server');
  
  // If running on server (SSR), allow access
  // Authentication will be checked again on client side
  if (!isPlatformBrowser(platformId)) {
    console.log('⚙️ Running on server - allowing navigation');
    return true;
  }

  console.log('Token:', authService.getToken());
  console.log('Is Authenticated:', authService.isAuthenticated());
  console.log('Current URL:', state.url);

  if (authService.isAuthenticated()) {
    console.log('✅ Authentication passed');
    return true;
  }

  console.log('❌ Authentication failed - redirecting to login');
  // Redirect to login page with return url
  router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
  return false;
};