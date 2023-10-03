import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core'
import { ROLES_KEY } from 'src/decorators/roles/roles.decorator';

@Injectable()
export class AuthorizationGuard implements CanActivate {
  constructor(private reflector: Reflector){}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();

    const reqRole = this.reflector.getAllAndOverride(ROLES_KEY, [
      context.getClass(),
      context.getHandler()
    ]);


    const userRole = request.user.role;

    console.log("userRole",userRole);
    console.log("reqRoles",reqRole);
    console.log("Inside AuthorizationGuard");
    for(let i in reqRole){
      if(reqRole[i] === userRole){
        return true;
      }
    }
    return false; 
    
  }
}
