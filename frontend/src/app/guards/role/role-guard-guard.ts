import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth-service';

export const roleGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // Check if user is authenticated first
  if (!authService.isAuthenticated()) {
    router.navigate(['/login']);
    return false;
  }

  // Get required roles from route data
  const requiredRoles = route.data['roles'] as string[];

  // If no roles specified, allow access
  if (!requiredRoles || requiredRoles.length === 0) {
    return true;
  }

  // Check if user has required role
  const userRole = authService.getUserRole();
  if (userRole && requiredRoles.includes(userRole)) {
    return true;
  }

  // User doesn't have required role - redirect to dashboard
  router.navigate(['/dashboard']);
  return false;
};
