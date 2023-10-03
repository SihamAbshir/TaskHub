import { CanActivate, ExecutionContext, Injectable,UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

@Injectable()
export class AuthenticationGuard implements CanActivate {
  constructor(
    private jwtService: JwtService
  ){}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    console.log('Inside a AuthenticationGuard')
    try{
    const request = context.switchToHttp().getRequest();
    if(request.headers.authorization === undefined){
      throw new UnauthorizedException();
    }
    const token = request.headers.authorization.split(' ')[1];
    // console.log(request);
    console.log("token",token)
  
    if(!token){
      throw new UnauthorizedException();
    }
      request.user = this.jwtService.verify(token); 
      console.log("request.user",request.user.role); 
    }catch(error){
      console.log(error);
      throw new UnauthorizedException();
    }
    return true;
  }
}
