import { SetMetadata } from '@nestjs/common';
import { Permission } from '../constants/permission.enum';

export const PERMISSIONS_KEY = 'required_permissions';
export const CLINIC_MEMBER_KEY = 'clinic_member';

export const Permissions = (...permissions: Permission[]) =>
  SetMetadata(PERMISSIONS_KEY, permissions);
