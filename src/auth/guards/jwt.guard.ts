// auth/guards/jwt.guard.ts
import {
    Injectable,
    CanActivate,
    ExecutionContext,
    UnauthorizedException,
  } from '@nestjs/common';
  import { GqlExecutionContext } from '@nestjs/graphql';
  import { JwtService } from '@nestjs/jwt';
import { appConfig } from 'src/shared/src';
  
  export interface JWTPayload {
      email: string
  }
  @Injectable()
  export class JwtGuard implements CanActivate {
    constructor(private readonly jwtAuthService: JwtService) {}
  
    canActivate(context: ExecutionContext): boolean {
      const gqlContext = GqlExecutionContext.create(context);
      const ctx = gqlContext.getContext();
  
      const req = ctx.req || ctx
      const authHeader = req.headers.authorization;
  
      if (!authHeader) {
        throw new UnauthorizedException('Authorization header not found');
      }
  
      const [bearer, token] = authHeader.split(' ');
      if (bearer !== 'Bearer' || !token) {
        throw new UnauthorizedException('Invalid token format');
      }
  
      try {
          const user = this.jwtAuthService.verify<JWTPayload>(token, { secret: appConfig().auth.jwtsecretkey});
        req.user = user; // Attach user to request
        return true;
      } catch (err) {
        throw new UnauthorizedException('Invalid or expired token');
      }
    }
  }
  