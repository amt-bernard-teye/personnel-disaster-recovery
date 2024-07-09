import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Request } from "express";
import { Observable } from "rxjs";

import { Roles } from "../decorators/roles.decorator";
import { User } from "../interface/user.interface";

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) {}

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const request = <Request>context.switchToHttp().getRequest();
        const user = <User>request['user'];

        const acceptableRoles = this.reflector.getAllAndOverride(Roles, [context.getClass(), context.getHandler()]);
        
        return acceptableRoles.includes(user.role);
    }
}