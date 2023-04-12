import { HttpClientTestingModule } from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";
import { User } from "src/app/model/user";
import { UserService } from "./user.service";

const TESTING_EMAIL = 'max.mockermann@test.de';
const TESTING_USERNAME = 'MaxMockermann';
const TESTING_PASSWORD = 'Passwort01!';

const TESTING_USER_EMAIL: User = {
    username: '',
    email: TESTING_EMAIL,
    password: TESTING_PASSWORD,
}

const TESTING_USER_USERNAME: User = {
    username: TESTING_USERNAME,
    email: '',
    password: TESTING_PASSWORD,
}

describe('UserService', () => {
    let service: UserService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [ HttpClientTestingModule],
            providers: [],
        });
        service = TestBed.inject(UserService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should recognize email', () => {
        const user = service.buildUserFromLoginSubmit(TESTING_EMAIL, TESTING_PASSWORD)
        expect(user).toEqual({
            username: '',
            email: TESTING_EMAIL,
            password: TESTING_PASSWORD,
        })
    });

    it('should recognize username', () => {
        const user = service.buildUserFromLoginSubmit(TESTING_USERNAME, TESTING_PASSWORD)
        expect(user).toEqual({
            username: TESTING_USERNAME,
            email: '',
            password: TESTING_PASSWORD,
        })
    });
})
