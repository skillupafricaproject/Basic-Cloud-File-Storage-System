const { readFile } = require('../readDelete');

describe('Read file named with a number', () => {
  describe('that exists', () => {
    const existingFile = `./spec/support/resources/${1}`;
    it('responds success status 200', () => {
      const response = readFile(existingFile);
      expect(response.status).toEqual(200);
    });
  });

  describe('that does not exist', () => {
    const nonExistingFile = `./spec/support/resources/${-0}`;
    it('responds error status 404', () => {
      const response = readFile(nonExistingFile);
      expect(response.status).toEqual(404);
    });
  });
});
