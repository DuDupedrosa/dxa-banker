import { faker } from '@faker-js/faker/locale/pt_BR';
import banker from '../../fixtures/banker.json';

export type User = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
};

export default {
    signUpUser: (): User => {
        return {
            firstName: faker.person.firstName(),
            lastName: faker.person.lastName(),
            email: `banker+${Date.now()}@example.com`,
            password: banker.password
        }
    },

    signInUser: (): User => {
        return banker
    }
};