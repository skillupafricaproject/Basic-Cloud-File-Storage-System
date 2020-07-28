const readFile = require('../controllers/readFile');

describe('Read file named with a number', () => {
  describe('that exists', () => {
    const existingFile = 1;
    const existingUser = 'tboyak';
    it('responds success status 200', () => {
      const response = readFile(existingFile, existingUser);
      expect(response.status).toEqual(200);
    });
  });

  describe('that does not exist', () => {
    const nonExistingFile = `${-0}`;
    const nonExistingUser = `non existing user`;
    it('responds error status 404', () => {
      const response = readFile(nonExistingFile, nonExistingUser);
      expect(response.status).toEqual(404);
    });
  });
});
