import buckarooClientTest from '../BuckarooClient.test';
import { Gender } from '../../src';

const method = buckarooClientTest.method('pim');

describe('PiM', () => {
    test('generate', async () => {
        await method
            .generate({
                amountDebit: 100,
                description: 'Omschrijving',
                title: 'Titel',
                return: {
                    nickname: 'test',
                    initials: 'TA',
                    firstName: 'Test',
                    lastName: 'Acceptatie',
                    birthDate: '01-01-1990',
                    gender: Gender.MALE,
                    email: 'test@buckaroo.nl',
                },
                result: {
                    title: 'success',
                    text: 'bedankt',
                },
            })
            .request()
            .then((info) => {
                expect(info).toBeDefined();
            });
    });
});
