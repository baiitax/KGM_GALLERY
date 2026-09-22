import { User, UserRole } from '../types';
import { getDb } from '../db/database';

export const ROLE_PERMISSIONS: Record<UserRole, {
  canManageSystem: boolean;
  canManageProviders: boolean;
  canEditMotionPresets: boolean;
  canCreateProjects: boolean;
  canGenerateAI: boolean;
  canApproveShots: boolean;
  canRenderFilms: boolean;
  canExportFilms: boolean;
  canManageUsers: boolean;
}> = {
  super_admin: {
    canManageSystem: true,
    canManageProviders: true,
    canEditMotionPresets: true,
    canCreateProjects: true,
    canGenerateAI: true,
    canApproveShots: true,
    canRenderFilms: true,
    canExportFilms: true,
    canManageUsers: true,
  },
  admin: {
    canManageSystem: false,
    canManageProviders: true,
    canEditMotionPresets: true,
    canCreateProjects: true,
    canGenerateAI: true,
    canApproveShots: true,
    canRenderFilms: true,
    canExportFilms: true,
    canManageUsers: true,
  },
  creative_director: {
    canManageSystem: false,
    canManageProviders: false,
    canEditMotionPresets: true,
    canCreateProjects: true,
    canGenerateAI: true,
    canApproveShots: true,
    canRenderFilms: true,
    canExportFilms: true,
    canManageUsers: false,
  },
  property_manager: {
    canManageSystem: false,
    canManageProviders: false,
    canEditMotionPresets: false,
    canCreateProjects: true,
    canGenerateAI: true,
    canApproveShots: false,
    canRenderFilms: true,
    canExportFilms: true,
    canManageUsers: false,
  },
  agent: {
    canManageSystem: false,
    canManageProviders: false,
    canEditMotionPresets: false,
    canCreateProjects: true,
    canGenerateAI: true,
    canApproveShots: false,
    canRenderFilms: true,
    canExportFilms: true,
    canManageUsers: false,
  },
  viewer: {
    canManageSystem: false,
    canManageProviders: false,
    canEditMotionPresets: false,
    canCreateProjects: false,
    canGenerateAI: false,
    canApproveShots: false,
    canRenderFilms: false,
    canExportFilms: true,
    canManageUsers: false,
  },
};

export class AuthService {
  public static getCurrentUser(userId?: string): User {
    const db = getDb();
    if (userId) {
      const user = db.prepare('SELECT * FROM users WHERE id = ?').get(userId) as User | undefined;
      if (user) return user;
    }
    // Default fallback to Super Admin
    const defaultUser = db.prepare('SELECT * FROM users WHERE role = ? LIMIT 1').get('super_admin') as User | undefined;
    return (
      defaultUser || {
        id: 'usr_super_01',
        email: 'executive@kgmlimited.com',
        full_name: 'Engr. Farouk Kurra',
        role: 'super_admin',
        avatar_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
        org_id: 'org_kgm_01',
        created_at: new Date().toISOString(),
      }
    );
  }

  public static listAllUsers(): User[] {
    const db = getDb();
    return db.prepare('SELECT * FROM users ORDER BY created_at ASC').all() as User[];
  }

  public static hasPermission(role: UserRole, permission: keyof (typeof ROLE_PERMISSIONS)['super_admin']): boolean {
    return ROLE_PERMISSIONS[role]?.[permission] ?? false;
  }
}
