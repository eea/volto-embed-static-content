const getSchema = (props) => {
  return {
    title: 'Embed static content',
    fieldsets: [
      {
        id: 'default',
        title: 'Default',
        fields: ['url', 'with_metadata_section', 'safe_load_img'],
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
      safe_load_img: {
        title: 'Save load as image',
        type: 'boolean',
        defaultValue: true,
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
