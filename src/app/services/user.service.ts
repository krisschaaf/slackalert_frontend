import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable, Injector } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { User, UserLoginDTO, UserRegistrationDTO } from "src/app/model/user";
import { TokenService } from "./token.service";
import { Token } from "@angular/compiler";

@Injectable({
    providedIn: 'root',
})
export class UserService {
    tokenService!: TokenService;
    emailPattern = new RegExp(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/);

    userURL = 'user/'
    registrationFormPOSTURL = environment.backendBasePath + this.userURL + 'sendRegistrationForm';
    loginFormPOSTURL = environment.backendBasePath + this.userURL + 'sendLoginForm';
    logoutUserURL = environment.backendBasePath + this.userURL + 'logoutUser';

    constructor(private http: HttpClient, private injector: Injector) { }

    injectTokenService(): void {
        this.tokenService = <TokenService>this.injector.get(TokenService);
    }

    getEmailFromIdToken(): string {
        return this.tokenService.getEmailFromToken();
    }

    buildUserFromLoginSubmit(nameInput: string, passwordInput: string): User {
        return this.isValidEmailAdress(nameInput)
            ? { username: '', email: nameInput, password: passwordInput }
            : { username: nameInput, email: '', password: passwordInput };
    };

    private isValidEmailAdress(toBeChecked: string): boolean {
        return this.emailPattern.test(toBeChecked);
    };

    sendRegistrationFormOnPOST(userRegistrationDTO: UserRegistrationDTO): Observable<any> {
        return this.http.post<any>(this.registrationFormPOSTURL, userRegistrationDTO);
    };

    //returns user
    sendLoginFormOnPOST(userLoginDTO: UserLoginDTO): Observable<User> {
        return this.http.post<User>(this.loginFormPOSTURL, userLoginDTO);
    };

    logoutUser(): Observable<any> {
        let params = new HttpParams().set('id', this.getEmailFromIdToken());
        return this.http.get<any>(this.logoutUserURL, { params });
    }
}
