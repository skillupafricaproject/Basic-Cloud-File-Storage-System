const deleteFile = require('../controllers/deleteFile');

describe('Delete file named with a number', () => {
  describe('that exists', () => {
    const existingFile = 2;
    const existingUser = 'tboyak';
    it('responds success status 200', () => {
      const response = deleteFile(existingFile, existingUser);
      expect(response.status).toEqual(200);
    });
  });

  describe('that does not exist', () => {
    const nonExistingFile = `${-0}`;
    const nonExistingUser = `non existing user`;
    it('responds error status 404', () => {
      const response = deleteFile(nonExistingFile, nonExistingUser);
      expect(response.status).toEqual(404);
    });
  });
});
