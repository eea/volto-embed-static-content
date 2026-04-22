import {
  deleteGeneratedFigureMetadataBlock,
  downloadDataURL,
  getFigureMetadata,
  getFileExtension,
  insertFigureMetadataBeforeBlock,
} from './index.js';
import config from '@plone/volto/registry';

let mockUuidCounter = 0;
jest.mock('uuid', () => ({
  v4: jest.fn(() => {
    const value =
      mockUuidCounter === 0 ? 'mock-uuid' : `mock-uuid${mockUuidCounter}`;
    mockUuidCounter += 1;
    return value;
  }),
}));

describe('helpers.js', () => {
  beforeEach(() => {
    mockUuidCounter = 0;
    config.blocks = config.blocks || {};
    config.blocks.blocksConfig = {
      ...config.blocks.blocksConfig,
      group: {},
    };
    jest.clearAllMocks();
  });

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
                  type: 'h3-light',
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

  describe('insertFigureMetadataBeforeBlock', () => {
    it('should insert metadata immediately before the target block', () => {
      const metadataSection = {
        '@type': 'group',
        className: 'figure-metadata',
        id: 'figure-metadata-figure',
        data: {
          blocks: {},
          blocks_layout: { items: [] },
        },
      };
      const properties = {
        blocks: {
          intro: { '@type': 'slate' },
          figure: { '@type': 'embed_static_content' },
          tail: { '@type': 'slate' },
        },
        blocks_layout: { items: ['intro', 'figure', 'tail'] },
      };
      const onChangeFormData = jest.fn();

      const newBlock = insertFigureMetadataBeforeBlock({
        properties,
        block: 'figure',
        metadataSection,
        blocksConfig: { group: {} },
        onChangeFormData,
      });

      expect(newBlock).toBe('mock-uuid');
      expect(onChangeFormData).toHaveBeenCalledTimes(1);
      expect(
        onChangeFormData.mock.calls[0][0].blocks_layout.items,
      ).toStrictEqual(['intro', 'mock-uuid', 'figure', 'tail']);
      expect(onChangeFormData.mock.calls[0][0].blocks['mock-uuid']).toEqual(
        metadataSection,
      );
    });

    it('should not insert a duplicate metadata block', () => {
      const properties = {
        blocks: {
          metadata: {
            '@type': 'group',
            id: 'figure-metadata-figure',
          },
          figure: { '@type': 'embed_static_content' },
        },
        blocks_layout: { items: ['metadata', 'figure'] },
      };
      const onChangeFormData = jest.fn();
      const onInsertBlock = jest.fn();

      const result = insertFigureMetadataBeforeBlock({
        properties,
        block: 'figure',
        metadataSection: {
          '@type': 'group',
          id: 'figure-metadata-figure',
        },
        onChangeFormData,
        onInsertBlock,
      });

      expect(result).toBeUndefined();
      expect(onChangeFormData).not.toHaveBeenCalled();
      expect(onInsertBlock).not.toHaveBeenCalled();
    });
  });

  describe('deleteGeneratedFigureMetadataBlock', () => {
    it('should delete and reselect the matching generated metadata block', () => {
      const onDeleteBlock = jest.fn();
      const onSelectBlock = jest.fn();

      const result = deleteGeneratedFigureMetadataBlock({
        properties: {
          blocks: {
            metadata: {
              '@type': 'group',
              id: 'figure-metadata-figure',
            },
            figure: { '@type': 'embed_static_content' },
          },
          blocks_layout: { items: ['metadata', 'figure'] },
        },
        block: 'figure',
        onDeleteBlock,
        onSelectBlock,
      });

      expect(result).toBe('metadata');
      expect(onDeleteBlock).toHaveBeenCalledWith('metadata');
      expect(onSelectBlock).toHaveBeenCalledWith('figure');
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
