const getSchema = (props) => {
  return {
    title: 'Embed static content',
    fieldsets: [
      {
        id: 'default',
        title: 'Default',
        fields: ['url'],
      },
      {
        id: 'toolbar',
        title: 'Toolbar',
        fields: ['with_notes', 'with_more_info', 'with_share', 'with_enlarge'],
      },
    ],
    properties: {
      url: {
        title: 'URL',
        widget: 'internal_url',
      },
      with_notes: {
        title: 'Show note',
        type: 'boolean',
        defaultValue: true,
      },
      with_sources: {
        title: 'Show sources',
        description: 'Will show sources set in this page Data provenance',
        type: 'boolean',
        defaultValue: true,
      },
      with_more_info: {
        title: 'Show more info',
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
    },

    required: [],
  };
};

export default getSchema;
