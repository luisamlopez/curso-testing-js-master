const { generateManyBooks } = require('../fakes/book.fake');
const BooksService = require('./books.service');

const mockGetAll = jest.fn();

// const MongoLibStub = {
//   getAll: spyGetAll,
//   create: () => { },
// };

jest.mock('../lib/mongo.lib', () => jest.fn().mockImplementation(() => ({
  getAll: mockGetAll,
  create: () => { },
})));

describe('Test for BooksService', () => {
  let service;

  beforeEach(() => {
    service = new BooksService();
  });

  describe('Test for generate many books 1', () => {
    test('should return a list of books', async () => {
      const fakeBooks = generateManyBooks(5);
      mockGetAll.mockResolvedValue(fakeBooks);
      const books = await service.getBooks();
      expect(books.length).toEqual(5);// ya no es la info de la bd sino la fake
      expect(mockGetAll).toHaveBeenCalled();
      expect(mockGetAll).toHaveBeenCalledTimes(1);
    });
  });

  describe('Test for generate many books 2', () => {
    test('should return a list of books', async () => {
      const fakeBooks = generateManyBooks(8);
      mockGetAll.mockResolvedValue(fakeBooks);
      const books = await service.getBooks();
      expect(books.length).toEqual(8);// ya no es la info de la bd sino la fake
      expect(mockGetAll).toHaveBeenCalled();
      expect(mockGetAll).toHaveBeenCalledTimes(2);// se llama dos veces
    });
  });
});
