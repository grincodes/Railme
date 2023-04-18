import { SetMetadata } from '@nestjs/common';
import { USER_TYPE } from 'src/core/constants/values';
import { Role } from './role.enum';

export const ROLE_KEY = 'role';
export const Roles = (role: USER_TYPE) => SetMetadata(ROLE_KEY, role);
