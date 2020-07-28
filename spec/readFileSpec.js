const fs = require('fs');
const path = require('path');
const { readFile } = require('../controllers/filesController')(
  fs, path, {}, { writeHead: () => { }, write: () => { }, end: () => { } }
);

describe('Read file named with a number', () => {
  describe('that exists', () => {
    const route = {
      query: {
        fileId: 1, username: 'tboyak'
      }
    };

    it('responds success status 200', () => {
      const response = readFile(route);
      expect(response.statusCode).toEqual(200);
    });
  });

  describe('that does not exist', () => {
    const route = {
      query: {
        fileId: `${-0}`, username: 'non existing user'
      }
    };

    it('responds error status 404', () => {
      const response = readFile(route);
      expect(response.statusCode).toEqual(404);
    });
  });
});
