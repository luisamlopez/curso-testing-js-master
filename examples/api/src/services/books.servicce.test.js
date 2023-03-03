const BooksService = require('./books.service');

const fakeBooks = [
  {
    _id: 1,
    name: 'Harry Potter',

  },
];

const MongoLibStub = {
  getAll: () => [...fakeBooks],
  create: () => { },
};

jest.mock('../lib/mongo.lib', () => jest.fn().mockImplementation(() => MongoLibStub));

describe('Test for BooksService', () => {
  let service;

  beforeEach(() => {
    service = new BooksService();
  });

  describe('Test for getBooks', () => {
    test('should return a list of books', async () => {
      const books = await service.getBooks();
      console.log(books);
      expect(books.length).toEqual(1);// ya no es la info de la bd sino la fake
    });
  });

  describe('Test for getBooks', () => {
    test('should return a list of books', async () => {
      const books = await service.getBooks();
      console.log(books);
      expect(books[0].name).toEqual('Harry Potter');
    });
  });
});
