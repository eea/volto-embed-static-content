import { v4 as uuid } from 'uuid';

export function downloadDataURL(dataURL, filename) {
  // Create a temporary anchor element
  const a = document.createElement('a');
  a.href = dataURL;
  a.download = filename;

  // Simulate a click event to trigger the download
  const clickEvent = new MouseEvent('click', {
    view: window,
    bubbles: true,
    cancelable: false,
  });

  a.dispatchEvent(clickEvent);
}

export function getFigureMetadata(block, metadata) {
  const { title, description } = metadata || {};
  const id = `figure-metadata-${block}`;
  const metadataEl = document.getElementById(id);
  if (metadataEl || (!title && !description)) return;

  const data = {
    blocks: {},
    blocks_layout: { items: [] },
  };

  function getBlock(type, plaintext) {
    const block = uuid();
    return [
      block,
      {
        '@type': 'slate',
        value: [
          {
            type,
            children: [
              {
                text: plaintext,
              },
            ],
          },
        ],
        plaintext,
      },
    ];
  }

  const blocks = [
    ...(title ? [getBlock('h4', `Figure 1. ${title}`)] : []),
    ...(description ? [getBlock('p', description)] : []),
  ];

  blocks.forEach((block) => {
    if (!block) return;
    data.blocks[block[0]] = block[1];
    data.blocks_layout.items.push(block[0]);
  });

  return {
    '@type': 'group',
    className: 'figure-metadata',
    id,
    data,
  };
}

export function getFileExtension(file) {
  if (!file) return '';
  const contentType = file['content-type'];

  // Handle special cases
  if (contentType === 'image/svg+xml') {
    return 'svg';
  }

  // Split the content type at the "/" and "+" characters
  // eslint-disable-next-line
  const parts = contentType.split(/[\/+]/);

  // The second part usually contains the file extension or a meaningful identifier
  if (parts.length > 1) {
    return parts[1];
  }

  // Return 'unknown' if the content type format is not recognized
  return 'unknown';
}
