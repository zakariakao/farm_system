import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth/auth-service';

@Component({
  selector: 'app-sidebar-component',
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar-component.html',
  styleUrl: './sidebar-component.css',
})
export class SidebarComponent {

  authService = inject(AuthService);
  // Track which menu groups are expanded
  expandedGroups: { [key: string]: boolean } = {
    dashboard: true,  // Dashboard starts open
    animals: false,
    forage: false,
    suppliers: false,
    stock: false,
    feeding: false,
    reports: false,
    alerts: false
  };

  // Active menu item
  activeItem: string = 'overview';

  /**
   * Toggle menu group expansion
   */
  toggleGroup(groupName: string): void {
    this.expandedGroups[groupName] = !this.expandedGroups[groupName];
  }

  logout() {
    this.authService.logout();
  }

  isAdmin(): boolean {
    return this.authService.isAdmin();
  }

  /**
   * Check if a group is expanded
   */
  isGroupExpanded(groupName: string): boolean {
    return this.expandedGroups[groupName] || false;
  }

  /**
   * Set active menu item
   */
  setActive(itemName: string): void {
    this.activeItem = itemName;
  }

  /**
   * Check if item is active
   */
  isActive(itemName: string): boolean {
    return this.activeItem === itemName;
  }

  
}
