export type UserRole =
  | 'super_admin'
  | 'agency_admin'
  | 'creative_director'
  | 'producer'
  | 'editor'
  | 'viewer';

export interface UserPermissions {
  canCreateProjects: boolean;
  canEditProjects: boolean;
  canDeleteProjects: boolean;
  canGenerateAI: boolean;
  canApproveShots: boolean;
  canExportFilms: boolean;
  canManageProviders: boolean;
  canManageSystem: boolean;
  canViewBilling: boolean;
}

export const ROLE_PERMISSIONS: Record<UserRole, UserPermissions> = {
  super_admin: {
    canCreateProjects: true,
    canEditProjects: true,
    canDeleteProjects: true,
    canGenerateAI: true,
    canApproveShots: true,
    canExportFilms: true,
    canManageProviders: true,
    canManageSystem: true,
    canViewBilling: true,
  },
  agency_admin: {
    canCreateProjects: true,
    canEditProjects: true,
    canDeleteProjects: true,
    canGenerateAI: true,
    canApproveShots: true,
    canExportFilms: true,
    canManageProviders: true,
    canManageSystem: false,
    canViewBilling: true,
  },
  creative_director: {
    canCreateProjects: true,
    canEditProjects: true,
    canDeleteProjects: false,
    canGenerateAI: true,
    canApproveShots: true,
    canExportFilms: true,
    canManageProviders: false,
    canManageSystem: false,
    canViewBilling: false,
  },
  producer: {
    canCreateProjects: true,
    canEditProjects: true,
    canDeleteProjects: false,
    canGenerateAI: true,
    canApproveShots: true,
    canExportFilms: true,
    canManageProviders: false,
    canManageSystem: false,
    canViewBilling: false,
  },
  editor: {
    canCreateProjects: false,
    canEditProjects: true,
    canDeleteProjects: false,
    canGenerateAI: true,
    canApproveShots: false,
    canExportFilms: true,
    canManageProviders: false,
    canManageSystem: false,
    canViewBilling: false,
  },
  viewer: {
    canCreateProjects: false,
    canEditProjects: false,
    canDeleteProjects: false,
    canGenerateAI: false,
    canApproveShots: false,
    canExportFilms: true,
    canManageProviders: false,
    canManageSystem: false,
    canViewBilling: false,
  },
};

export class AuthService {
  static getPermissions(role: UserRole): UserPermissions {
    return ROLE_PERMISSIONS[role] || ROLE_PERMISSIONS.viewer;
  }

  static hasPermission(role: UserRole, permission: keyof UserPermissions): boolean {
    return Boolean(ROLE_PERMISSIONS[role]?.[permission]);
  }
}
