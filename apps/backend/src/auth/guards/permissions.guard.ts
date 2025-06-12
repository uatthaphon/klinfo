import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Permission } from '../constants/permission.enum';
import {
  CLINIC_MEMBER_KEY,
  PERMISSIONS_KEY,
} from '../decorators/permissions.decorator';
import { hasPermission } from '../utils/permission-check.helper';

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredPermissions = this.reflector.getAllAndMerge<Permission[]>(
      PERMISSIONS_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!requiredPermissions?.length) return true;

    const request = context.switchToHttp().getRequest();
    const clinicMember = request[CLINIC_MEMBER_KEY];

    if (!clinicMember) {
      throw new ForbiddenException('No clinic member context found.');
    }

    const hasAll = requiredPermissions.every((permission) =>
      hasPermission(clinicMember, permission),
    );

    if (!hasAll) {
      throw new ForbiddenException('Insufficient permissions');
    }

    return true;
  }
}
