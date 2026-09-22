import crypto from 'crypto';

export interface UserAccount {
  id: string;
  email: string;
  passwordHash: string;
  fullName: string;
  role: 'super_admin' | 'agency_admin' | 'creative_director' | 'producer' | 'editor';
  organization: string;
  avatarUrl?: string;
  createdAt: string;
}

function hashPassword(password: string): string {
  return crypto.createHash('sha256').update(password).digest('hex');
}

// In-memory & default verified user credentials
export const DEFAULT_USERS: UserAccount[] = [
  {
    id: 'usr_director_01',
    email: 'director@kgm-estates.com',
    passwordHash: hashPassword('KGM@Director2026!'),
    fullName: 'Alexander Kurra',
    role: 'super_admin',
    organization: 'Kurra Greenfield Merchants Limited',
    createdAt: '2026-09-19T00:00:00.000Z',
  },
  {
    id: 'usr_partner_01',
    email: 'faris.alsaud@kgm-estates.com',
    passwordHash: hashPassword('RiyadhVIP#2026'),
    fullName: 'Faris Al-Saud',
    role: 'agency_admin',
    organization: 'Kurra Greenfield Merchants Limited',
    createdAt: '2026-09-19T00:00:00.000Z',
  },
  {
    id: 'usr_producer_01',
    email: 'producer@kgm-estates.com',
    passwordHash: hashPassword('StudioMaster$99'),
    fullName: 'Elena Vance',
    role: 'producer',
    organization: 'Kurra Greenfield Merchants Limited',
    createdAt: '2026-09-19T00:00:00.000Z',
  },
  {
    id: 'usr_editor_01',
    email: 'editor@kgm-estates.com',
    passwordHash: hashPassword('ColorGrade#1080'),
    fullName: 'Tariq Mansoor',
    role: 'editor',
    organization: 'Kurra Greenfield Merchants Limited',
    createdAt: '2026-09-19T00:00:00.000Z',
  },
];

// Global runtime users store
let usersStore: UserAccount[] = [...DEFAULT_USERS];

export class AuthService {
  static authenticate(email: string, password: string): UserAccount | null {
    const cleanEmail = email.trim().toLowerCase();
    const hash = hashPassword(password);
    const user = usersStore.find(u => u.email.toLowerCase() === cleanEmail && u.passwordHash === hash);
    return user || null;
  }

  static register(data: { email: string; password: string; fullName: string; role?: UserAccount['role'] }): UserAccount {
    const cleanEmail = data.email.trim().toLowerCase();
    const existing = usersStore.find(u => u.email.toLowerCase() === cleanEmail);
    if (existing) {
      throw new Error('An account with this email already exists.');
    }

    const newUser: UserAccount = {
      id: `usr_${Date.now()}`,
      email: cleanEmail,
      passwordHash: hashPassword(data.password),
      fullName: data.fullName || 'KGM Private Advisor',
      role: data.role || 'producer',
      organization: 'Kurra Greenfield Merchants Limited',
      createdAt: new Date().toISOString(),
    };

    usersStore.unshift(newUser);
    return newUser;
  }

  static getUserById(id: string): UserAccount | null {
    return usersStore.find(u => u.id === id) || null;
  }

  static getAllUsers(): Omit<UserAccount, 'passwordHash'>[] {
    return usersStore.map(({ passwordHash, ...u }) => u);
  }
}
