import { Gender } from '../../../src';
import buckarooClientTest from '../../Support/BuckarooClient';
import { mockResponse, recordedRequests, transactionResponse } from '../../Support/HttpMock';

const method = buckarooClientTest.method('pim');

describe('PiM', () => {
    test('generate', async () => {
        mockResponse(transactionResponse(190), '/json/DataRequest');

        const response = await method
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
            .request();
        expect(response.isSuccess()).toBeTruthy();
    });
});

afterEach(() => {
    expect(recordedRequests()).toMatchSnapshot();
});
