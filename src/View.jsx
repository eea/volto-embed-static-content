import React, { useEffect, useMemo } from 'react';
import { connect } from 'react-redux';
import { getContent } from '@plone/volto/actions';
import { flattenToAppURL } from '@plone/volto/helpers';
import { getFigureMetadata } from './utils';
import { mapKeys } from 'lodash';
import Embed from './Embed';
import FigurePicker from './components/FigurePicker';

function View(props) {
  const { mode, onChangeBlock, block } = props;
  const {
    with_notes = true,
    with_more_info = true,
    with_share = true,
    with_enlarge = true,
    download_button = true,
  } = props.data;

  const url = flattenToAppURL(props.data.url || '');

  const embedContent = useMemo(() => {
    if (props.embedContent?.preview_image) {
      return {
        preview_image: props.embedContent.preview_image,
        '@id': props.embedContent['@id'],
        title: props.embedContent['title'],
        publisher: props.embedContent['publisher'],
        description: props.embedContent['description'],
        geo_coverage: props.embedContent['geo_coverage'],
        temporal_coverage: props.embedContent['temporal_coverage'],
        other_organisations: props.embedContent['other_organisations'],
        data_provenance: props.embedContent['data_provenance'],
        figure_note: props.embedContent['figure_note'],
      };
    } else if (url)
      return {
        error: 'Please select a resource that has a preview image available.',
      };
  }, [props.embedContent, url]);

  useEffect(() => {
    if (url && !props.data.embedContent) {
      props.getContent(flattenToAppURL(url), null, props.id);
    }
    /* eslint-disable-next-line */
  }, [url]);

  useEffect(() => {
    const mode = props.mode;
    const with_metadata_section = props.data?.with_metadata_section ?? true;
    if (mode !== 'edit') return;
    if (!with_metadata_section) {
      let metadataBlock = null;
      mapKeys(props.properties.blocks, (data, block) => {
        if (data?.['id'] === `figure-metadata-${props.block}`) {
          metadataBlock = block;
        }
      });
      if (metadataBlock) {
        props.onDeleteBlock(metadataBlock);
        props.onSelectBlock(props.block);
      }
      return;
    }
    if (embedContent) {
      const metadataSection = getFigureMetadata(props.block, {
        title: embedContent.title,
        description: embedContent.description,
      });
      if (!metadataSection) return;

      props.onInsertBlock(props.block, metadataSection);
    }
    /* eslint-disable-next-line */
  }, [props.data.with_metadata_section, embedContent, mode]);

  if (mode === 'edit' && (!url || embedContent?.error)) {
    console.log(embedContent?.error);
    return (
      <FigurePicker
        errorMessage={embedContent?.error}
        onSubmitUrl={(url) => {
          onChangeBlock(block, {
            ...props.data,
            url: url,
          });
        }}
      />
    );
  }

  if (embedContent?.error) {
    return <p>{embedContent?.error}</p>;
  }

  if (!embedContent) {
    return null;
  }

  return (
    <div className="embed-content-static">
      <Embed
        data={{
          ...embedContent,
          with_notes,
          with_sources: true,
          with_more_info,
          with_share,
          with_enlarge,
          download_button,
        }}
        block={props.block}
        id={props.id}
      />
    </div>
  );
}

export default connect(
  (state, props) => ({
    embedContent: state.content.subrequests?.[props.id]?.data,
    data_query: state.content?.data?.data_query,
  }),
  { getContent },
)(View);
