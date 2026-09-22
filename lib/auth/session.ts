import crypto from 'crypto';

export type UserRole =
  | 'super_admin'
  | 'creative_director'
  | 'producer'
  | 'editor'
  | 'media_specialist'
  | 'marketing'
  | 'client_relations'
  | 'reviewer'
  | 'viewer';

export interface UserPreferences {
  preferredAspectRatio: '16:9' | '9:16' | '1:1' | '4:5';
  defaultQuality: 'prores_422' | 'h265_4k' | 'h264_master';
  defaultBrandProfile: string;
  emailNotifications: boolean;
  renderAlerts: boolean;
  exportAlerts: boolean;
  theme: 'dark_emerald' | 'charcoal_minimal';
}

export interface UserAccount {
  id: string;
  email: string;
  passwordHash: string;
  fullName: string;
  role: UserRole;
  department?: string;
  organization: string;
  avatarUrl?: string;
  isEmailVerified: boolean;
  onboardingCompleted: boolean;
  preferences: UserPreferences;
  createdAt: string;
  lastLoginAt?: string;
}

export interface Invitation {
  id: string;
  token: string;
  email: string;
  fullName: string;
  role: UserRole;
  department: string;
  invitedBy: string;
  accessPolicy: 'permanent' | '30_days' | '90_days' | 'project_only';
  status: 'pending' | 'accepted' | 'expired' | 'revoked';
  expiresAt: string;
  createdAt: string;
}

export interface PasswordResetToken {
  token: string;
  email: string;
  expiresAt: string;
  used: boolean;
  createdAt: string;
}

function hashPassword(password: string): string {
  return crypto.createHash('sha256').update(password).digest('hex');
}

export function generateToken(prefix = 'kgm_tok'): string {
  return `${prefix}_${crypto.randomBytes(16).toString('hex')}_${Date.now()}`;
}

const DEFAULT_PREFERENCES: UserPreferences = {
  preferredAspectRatio: '16:9',
  defaultQuality: 'h265_4k',
  defaultBrandProfile: 'brand_kgm_sovereign',
  emailNotifications: true,
  renderAlerts: true,
  exportAlerts: true,
  theme: 'dark_emerald',
};

// Initial seeded executive & production accounts
export const DEFAULT_USERS: UserAccount[] = [
  {
    id: 'usr_director_01',
    email: 'director@kgm-estates.com',
    passwordHash: hashPassword('KGM@Director2026!'),
    fullName: 'Alexander Kurra',
    role: 'super_admin',
    department: 'Executive Creative Direction',
    organization: 'Kurra Greenfield Merchants Limited',
    isEmailVerified: true,
    onboardingCompleted: true,
    preferences: {
      ...DEFAULT_PREFERENCES,
      preferredAspectRatio: '16:9',
      defaultQuality: 'prores_422',
    },
    createdAt: '2026-09-19T00:00:00.000Z',
    lastLoginAt: '2026-09-22T04:15:00.000Z',
  },
  {
    id: 'usr_partner_01',
    email: 'faris.alsaud@kgm-estates.com',
    passwordHash: hashPassword('RiyadhVIP#2026'),
    fullName: 'HRH Prince Faris Al-Saud',
    role: 'super_admin',
    department: 'Senior Managing Partner',
    organization: 'Kurra Greenfield Merchants Limited',
    isEmailVerified: true,
    onboardingCompleted: true,
    preferences: {
      ...DEFAULT_PREFERENCES,
      preferredAspectRatio: '16:9',
    },
    createdAt: '2026-09-19T00:00:00.000Z',
    lastLoginAt: '2026-09-21T18:30:00.000Z',
  },
  {
    id: 'usr_producer_01',
    email: 'producer@kgm-estates.com',
    passwordHash: hashPassword('StudioMaster$99'),
    fullName: 'Marcus Vance',
    role: 'producer',
    department: 'Film Production & Mastering',
    organization: 'Kurra Greenfield Merchants Limited',
    isEmailVerified: true,
    onboardingCompleted: true,
    preferences: {
      ...DEFAULT_PREFERENCES,
      defaultQuality: 'h265_4k',
    },
    createdAt: '2026-09-19T00:00:00.000Z',
    lastLoginAt: '2026-09-22T03:00:00.000Z',
  },
  {
    id: 'usr_editor_01',
    email: 'editor@kgm-estates.com',
    passwordHash: hashPassword('ColorGrade#1080'),
    fullName: 'Tariq Mansoor',
    role: 'editor',
    department: 'Post-Production & Color Grading',
    organization: 'Kurra Greenfield Merchants Limited',
    isEmailVerified: true,
    onboardingCompleted: true,
    preferences: {
      ...DEFAULT_PREFERENCES,
      preferredAspectRatio: '9:16',
    },
    createdAt: '2026-09-19T00:00:00.000Z',
    lastLoginAt: '2026-09-20T14:20:00.000Z',
  },
];

// Seeded Invitations
export const INITIAL_INVITATIONS: Invitation[] = [
  {
    id: 'inv_kgm_01',
    token: 'inv_tok_vip_riyadh_2026',
    email: 'zahra.khalid@kgm-estates.com',
    fullName: 'Zahra Khalid',
    role: 'creative_director',
    department: 'Architectural Curation',
    invitedBy: 'Alexander Kurra',
    accessPolicy: 'permanent',
    status: 'pending',
    expiresAt: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
    createdAt: '2026-09-20T10:00:00.000Z',
  },
  {
    id: 'inv_kgm_02',
    token: 'inv_tok_producer_media',
    email: 'media.lead@kgm-estates.com',
    fullName: 'Noura Al-Hassan',
    role: 'media_specialist',
    department: 'Real Estate Media',
    invitedBy: 'Alexander Kurra',
    accessPolicy: '90_days',
    status: 'pending',
    expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    createdAt: '2026-09-21T08:30:00.000Z',
  },
];

// Runtime stores
let usersStore: UserAccount[] = [...DEFAULT_USERS];
let invitationsStore: Invitation[] = [...INITIAL_INVITATIONS];
let resetTokensStore: PasswordResetToken[] = [];
let verificationCodesStore: { email: string; code: string; expiresAt: string }[] = [];

export class AuthService {
  static authenticate(email: string, password: string): UserAccount | null {
    const cleanEmail = email.trim().toLowerCase();
    const hash = hashPassword(password);
    const user = usersStore.find(u => u.email.toLowerCase() === cleanEmail && u.passwordHash === hash);
    if (user) {
      user.lastLoginAt = new Date().toISOString();
    }
    return user || null;
  }

  static register(data: {
    email: string;
    password: string;
    fullName: string;
    role?: UserRole;
    department?: string;
    organization?: string;
    invitationToken?: string;
  }): UserAccount {
    const cleanEmail = data.email.trim().toLowerCase();
    const existing = usersStore.find(u => u.email.toLowerCase() === cleanEmail);
    if (existing) {
      throw new Error('An account with this email already exists in KGM Studio OS.');
    }

    let assignedRole: UserRole = data.role || 'producer';
    let assignedDept: string = data.department || 'Production & Creative';

    // If invitation token provided, validate and consume
    if (data.invitationToken) {
      const inv = invitationsStore.find(
        i => i.token === data.invitationToken && i.status === 'pending' && new Date(i.expiresAt) > new Date()
      );
      if (inv) {
        assignedRole = inv.role;
        assignedDept = inv.department;
        inv.status = 'accepted';
      }
    }

    const newUser: UserAccount = {
      id: `usr_${Date.now()}`,
      email: cleanEmail,
      passwordHash: hashPassword(data.password),
      fullName: data.fullName || 'KGM Private Studio User',
      role: assignedRole,
      department: assignedDept,
      organization: data.organization || 'Kurra Greenfield Merchants Limited',
      isEmailVerified: true,
      onboardingCompleted: false,
      preferences: { ...DEFAULT_PREFERENCES },
      createdAt: new Date().toISOString(),
      lastLoginAt: new Date().toISOString(),
    };

    usersStore.unshift(newUser);
    return newUser;
  }

  static createInvitation(data: {
    email: string;
    fullName: string;
    role: UserRole;
    department: string;
    invitedBy: string;
    accessPolicy?: Invitation['accessPolicy'];
  }): Invitation {
    const cleanEmail = data.email.trim().toLowerCase();
    const existing = usersStore.find(u => u.email.toLowerCase() === cleanEmail);
    if (existing) {
      throw new Error('A user with this work email is already registered.');
    }

    const token = `inv_tok_${crypto.randomBytes(12).toString('hex')}`;
    const newInv: Invitation = {
      id: `inv_${Date.now()}`,
      token,
      email: cleanEmail,
      fullName: data.fullName,
      role: data.role,
      department: data.department || 'Creative Operations',
      invitedBy: data.invitedBy || 'Alexander Kurra',
      accessPolicy: data.accessPolicy || 'permanent',
      status: 'pending',
      expiresAt: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
      createdAt: new Date().toISOString(),
    };

    invitationsStore.unshift(newInv);
    return newInv;
  }

  static getInvitationByToken(token: string): Invitation | null {
    const inv = invitationsStore.find(i => i.token === token);
    if (!inv) return null;
    if (new Date(inv.expiresAt) < new Date() && inv.status === 'pending') {
      inv.status = 'expired';
    }
    return inv;
  }

  static getAllInvitations(): Invitation[] {
    return invitationsStore;
  }

  static requestPasswordReset(email: string): string {
    const cleanEmail = email.trim().toLowerCase();
    const user = usersStore.find(u => u.email.toLowerCase() === cleanEmail);
    const token = `rst_tok_${crypto.randomBytes(16).toString('hex')}`;

    // Record token regardless of whether user exists to prevent email enumeration timing leaks
    if (user) {
      resetTokensStore.push({
        token,
        email: cleanEmail,
        expiresAt: new Date(Date.now() + 60 * 60 * 1000).toISOString(), // 1 hour
        used: false,
        createdAt: new Date().toISOString(),
      });
    }
    return token;
  }

  static verifyResetToken(token: string): { valid: boolean; email?: string } {
    const rst = resetTokensStore.find(
      r => r.token === token && !r.used && new Date(r.expiresAt) > new Date()
    );
    if (!rst) return { valid: false };
    return { valid: true, email: rst.email };
  }

  static resetPassword(token: string, newPassword: string): boolean {
    const rst = resetTokensStore.find(
      r => r.token === token && !r.used && new Date(r.expiresAt) > new Date()
    );
    if (!rst) return false;

    const user = usersStore.find(u => u.email.toLowerCase() === rst.email.toLowerCase());
    if (!user) return false;

    user.passwordHash = hashPassword(newPassword);
    rst.used = true;
    return true;
  }

  static requestVerificationCode(email: string): string {
    const cleanEmail = email.trim().toLowerCase();
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    verificationCodesStore.push({
      email: cleanEmail,
      code,
      expiresAt: new Date(Date.now() + 15 * 60 * 1000).toISOString(),
    });
    return code;
  }

  static verifyCode(email: string, code: string): boolean {
    const cleanEmail = email.trim().toLowerCase();
    const match = verificationCodesStore.find(
      v => v.email === cleanEmail && v.code === code && new Date(v.expiresAt) > new Date()
    );
    if (!match) return false;

    const user = usersStore.find(u => u.email.toLowerCase() === cleanEmail);
    if (user) {
      user.isEmailVerified = true;
    }
    return true;
  }

  static updatePreferences(userId: string, prefs: Partial<UserPreferences>): UserAccount | null {
    const user = usersStore.find(u => u.id === userId);
    if (!user) return null;
    user.preferences = { ...user.preferences, ...prefs };
    return user;
  }

  static completeOnboarding(userId: string, role?: UserRole, preferences?: Partial<UserPreferences>): UserAccount | null {
    const user = usersStore.find(u => u.id === userId);
    if (!user) return null;
    user.onboardingCompleted = true;
    if (role) user.role = role;
    if (preferences) user.preferences = { ...user.preferences, ...preferences };
    return user;
  }

  static getUserById(id: string): UserAccount | null {
    return usersStore.find(u => u.id === id) || null;
  }

  static getAllUsers(): Omit<UserAccount, 'passwordHash'>[] {
    return usersStore.map(({ passwordHash, ...u }) => u);
  }

  static deleteUser(id: string): boolean {
    const initialLen = usersStore.length;
    usersStore = usersStore.filter(u => u.id !== id);
    return usersStore.length < initialLen;
  }
}
