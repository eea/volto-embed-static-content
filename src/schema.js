import { getFileExtension } from './helpers';

const getSchema = (props) => {
  return {
    title: 'Embed static content',
    fieldsets: [
      {
        id: 'default',
        title: 'Default',
        fields:
          getFileExtension(
            props?.data?.properties?.image_scales[
              Object.keys(props?.data?.properties?.image_scales || {})?.[0] ||
                ''
            ]?.[0],
          ) === 'svg'
            ? ['url', 'with_metadata_section', 'svg_as_img']
            : ['url', 'with_metadata_section'],
      },
      {
        id: 'toolbar',
        title: 'Toolbar',
        fields: [
          'with_notes',
          'with_more_info',
          'with_share',
          'with_enlarge',
          'download_button',
        ],
      },
    ],
    properties: {
      url: {
        title: 'URL',
        widget: 'internal_url',
      },
      svg_as_img: {
        title: 'Render SVG as image',
        type: 'boolean',
      },
      with_metadata_section: {
        title: 'Show metadata section',
        type: 'boolean',
        defaultValue: true,
      },
      with_notes: {
        title: 'Show note button',
        type: 'boolean',
        defaultValue: true,
      },
      with_sources: {
        title: 'Show sources button',
        description: 'Will show sources set in this page Data provenance',
        type: 'boolean',
        defaultValue: true,
      },
      with_more_info: {
        title: 'Show more info button',
        type: 'boolean',
        defaultValue: true,
      },
      with_enlarge: {
        title: 'Show enlarge button',
        type: 'boolean',
        defaultValue: true,
      },
      with_share: {
        title: 'Show share button',
        type: 'boolean',
        defaultValue: true,
      },
      download_button: {
        title: 'Show download button',
        type: 'boolean',
        defaultValue: true,
      },
    },

    required: [],
  };
};

export default getSchema;
