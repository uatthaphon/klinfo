import { ClinicMember } from 'src/clinic-members/entities/clinic-member.entity';
import { Permission } from '../constants/permission.enum';
import { RolePermissions } from '../constants/role-permissions';

export function getEffectivePermissions(member: ClinicMember): Permission[] {
  const rolePermissions = RolePermissions[member.role] ?? [];
  const overridePermissions = member.permissions ?? [];

  const all = [...rolePermissions, ...overridePermissions];
  return Array.from(new Set(all)) as Permission[];
}

export function hasPermission(
  member: ClinicMember,
  permission: Permission,
): boolean {
  return getEffectivePermissions(member).includes(permission);
}
