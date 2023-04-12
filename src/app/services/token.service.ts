import { Injectable } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import jwtDecode, { JwtHeader, JwtPayload } from 'jwt-decode';
import { environment } from 'src/environments/environment';

export interface IdToken {
  email: string;
}

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  jwtHeader!: JwtHeader;
  jwtPayload!: JwtPayload;
  idToken!: IdToken;
  tokenIsValidated = false;

  constructor(private auth: AuthService) {
    this.auth.idTokenClaims$.subscribe(claims => {
      if (claims) {
        this.jwtHeader = jwtDecode<JwtHeader>(JSON.stringify(claims));
        this.jwtPayload = jwtDecode<JwtPayload>(JSON.stringify(claims));

        if(this.validateToken()) {
          this.idToken = jwtDecode<IdToken>(JSON.stringify(claims));
        }

      } else {
        console.error("Could not get token in tokenService!");       
      }
    });
   }

  private validateToken(): boolean {
    if(this.jwtPayload) {
      this.jwtPayload.aud?.includes(environment.auth.audience) ? this.tokenIsValidated = true : this.tokenIsValidated = false;
      // TODO add exp time validation
      console.log("token validated");
      return true;
    } else {
      this.tokenIsValidated = false;
      console.error("Token validation failed!");   
      return false;  
    }
  };

  public getEmailFromToken(): string {
    if(this.tokenIsValidated) {
      return this.idToken.email;
    } else {
      console.error("Token has not yet been validated!");
      return "";
    }
  }
}