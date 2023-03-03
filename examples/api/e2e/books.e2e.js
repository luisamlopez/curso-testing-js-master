const request = require('supertest');
const { generateManyBooks } = require('../src/fakes/book.fake');
const createApp = require('../src/app');

const mockGetAll = jest.fn();

jest.mock('../src/lib/mongo.lib', () => jest.fn().mockImplementation(() => ({
  getAll: mockGetAll,
  create: () => { },
})));

describe('Test for hello endpoint', () => {
  let app = null;
  let server = null;

  beforeAll(() => {
    app = createApp();
    server = app.listen(3001);
  });
  afterAll(async () => {
    await server.close();
  });

  describe('Test for [GET] /api/v1/books', () => {
    test('should return books', async () => {
      const fakeBooks = generateManyBooks(5);
      mockGetAll.mockResolvedValue(fakeBooks);
      return request(app).get('/api/v1/books').expect(200).then((({ body }) => {
        console.log(body);
        expect(body.length).toEqual(fakeBooks.length);
      }));
    });
  });
});
