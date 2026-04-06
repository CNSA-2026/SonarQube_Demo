const { saveUploadedFile } = require('./file-upload-unrestricted-sample');
const fs = require('fs');
const os = require('os');
const path = require('path');

describe('file-upload-unrestricted-sample', () => {
  test('saves file using original filename without validation (vulnerable)', () => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'upload-'));
    const file = {
      originalname: '../evil.txt',
      buffer: Buffer.from('content'),
    };
    const dest = saveUploadedFile(tmpDir, file);
    expect(dest).toContain('..');
  });
});
