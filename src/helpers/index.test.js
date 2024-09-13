import {
  downloadDataURL,
  getFigureMetadata,
  getFileExtension,
} from './index.js';

jest.mock('uuid', () => ({
  v4: jest
    .fn()
    .mockReturnValueOnce('mock-uuid')
    .mockReturnValueOnce('mock-uuid1'),
}));

describe('helpers.js', () => {
  describe('downloadDataURL', () => {
    it('should trigger a download with the correct filename', () => {
      const createElementSpy = jest.spyOn(document, 'createElement');
      const dispatchEventSpy = jest.spyOn(
        HTMLAnchorElement.prototype,
        'dispatchEvent',
      );

      downloadDataURL('data:image/png;base64,test-data', 'test-file.png');

      const anchorElement = createElementSpy.mock.results[0].value;
      expect(anchorElement.href).toBe('data:image/png;base64,test-data');
      expect(anchorElement.download).toBe('test-file.png');
      expect(dispatchEventSpy).toHaveBeenCalledWith(expect.any(MouseEvent));
    });
  });

  describe('getFigureMetadata', () => {
    it('should return metadata with title and description', () => {
      document.getElementById = jest.fn().mockReturnValue(null);

      const block = 'block-id';
      const metadata = {
        title: 'Test Title',
        description: 'Test Description',
      };

      const result = getFigureMetadata(block, metadata);

      expect(result).toEqual({
        '@type': 'group',
        className: 'figure-metadata',
        id: 'figure-metadata-block-id',
        data: {
          blocks: {
            'mock-uuid': {
              '@type': 'slate',
              value: [
                {
                  type: 'h4',
                  children: [{ text: 'Figure 1. Test Title' }],
                },
              ],
              plaintext: 'Figure 1. Test Title',
            },
            'mock-uuid1': {
              '@type': 'slate',
              value: [
                {
                  type: 'p',
                  children: [{ text: 'Test Description' }],
                },
              ],
              plaintext: 'Test Description',
            },
          },
          blocks_layout: { items: ['mock-uuid', 'mock-uuid1'] },
        },
      });
    });

    it('should return undefined if metadata element exists', () => {
      document.getElementById = jest.fn().mockReturnValue(true);

      const result = getFigureMetadata('block-id', { title: 'Test Title' });
      expect(result).toBeUndefined();
    });

    it('should return undefined if no title or description is provided', () => {
      document.getElementById = jest.fn().mockReturnValue(null);

      const result = getFigureMetadata('block-id', {});
      expect(result).toBeUndefined();
    });
  });

  describe('getFileExtension', () => {
    it('should return "svg" for image/svg+xml content type', () => {
      const file = { 'content-type': 'image/svg+xml' };
      const result = getFileExtension(file);
      expect(result).toBe('svg');
    });

    it('should return correct file extension for known content type', () => {
      const file = { 'content-type': 'image/png' };
      const result = getFileExtension(file);
      expect(result).toBe('png');
    });

    it('should return "type" for unrecognized content type', () => {
      const file = { 'content-type': 'unknown/type' };
      const result = getFileExtension(file);
      expect(result).toBe('type');
    });

    it('should return "unknown" if content type has only one part', () => {
      const file = { 'content-type': 'unknown' };
      const result = getFileExtension(file);
      expect(result).toBe('unknown');
    });
  });
});
