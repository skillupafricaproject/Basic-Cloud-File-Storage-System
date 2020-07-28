const { deleteFile } = require('../readDelete');

describe('Delete file named with a number', () => {
  describe('that exists', () => {
    const existingFile = `./spec/support/resources/${2}`;
    it('responds success status 200', () => {
      const response = deleteFile(existingFile);
      expect(response.status).toEqual(200);
    });
  });

  describe('that does not exist', () => {
    const nonExistingFile = `./spec/support/resources/${-0}`;
    it('responds error status 404', () => {
      const response = deleteFile(nonExistingFile);
      expect(response.status).toEqual(500);
    });
  });
});
