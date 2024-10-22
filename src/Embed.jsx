import React, { useEffect, useState, useRef } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { Image } from 'semantic-ui-react';

import cx from 'classnames';
import {
  FigureNote,
  Sources,
  MoreInfo,
  Share,
} from '@eeacms/volto-embed/Toolbar';
import Download from './DownloadData';
import Enlarge from './Enlarge';
import { getFileExtension } from './helpers';

function Embed({ data, screen, block }) {
  const el = useRef();
  const modal = useRef();
  const [svg, setSVG] = useState('');
  const [mobile, setMobile] = useState(false);

  const isSvg = getFileExtension(data.preview_image) === 'svg';

  useEffect(() => {
    if (el.current) {
      const visWidth = el.current.offsetWidth;

      if (visWidth < 600 && !mobile) {
        setMobile(true);
      } else if (visWidth >= 600 && mobile) {
        setMobile(false);
      }
    }
  }, [screen, mobile]);

  useEffect(() => {
    if (isSvg && data?.preview_image?.download) {
      fetch(data.preview_image.download)
        .then((res) => res.text())
        .then((data) => {
          const svgBlob = new Blob([data], { type: 'image/svg+xml' });
          const svgUrl = URL.createObjectURL(svgBlob);
          setSVG(svgUrl);
        })
        .catch((_) => {});
    }
  }, [data, isSvg]);

  return (
    <div
      ref={el}
      className={cx(
        'block embed-content-static align',
        {
          center: !Boolean(data.align),
        },
        data.align,
      )}
    >
      <div
        className={cx('embed-content-static-inner', {
          'full-width': data.align === 'full',
        })}
      >
        {isSvg ? (
          <iframe
            id={'embed_svg_iframe' + block}
            src={svg}
            width="100%"
            height="100%"
            frameBorder="0"
          />
        ) : (
          <Image src={data.preview_image.download} />
        )}
      </div>

      <div className={cx('visualization-toolbar', { mobile })}>
        <div className="left-col">
          {data.with_notes && <FigureNote notes={data.figure_note || []} />}
          {data.with_sources && (
            <Sources sources={data.data_provenance?.data} />
          )}
          {data.with_more_info && <MoreInfo href={data['@id']} />}
        </div>
        <div className="right-col">
          {data.with_share && <Share href={data['@id']} />}
          {data.download_button && (
            <Download
              data={data}
              coreMetadata={data}
              url_source={data?.['@id']}
              file={data.downloadFile}
              fileName={data.fileName}
            />
          )}
          {data.with_enlarge && (
            <Enlarge
              className="enlarge-embed-embed-content-static"
              block={block}
            >
              {isSvg ? (
                <iframe
                  id={'embed_svg_modal_iframe' + block}
                  src={svg}
                  width="100%"
                  height="100%"
                  frameBorder="0"
                />
              ) : (
                <Image src={data.preview_image.download} />
              )}
            </Enlarge>
          )}
        </div>
      </div>
    </div>
  );
}

export default compose(
  injectIntl,
  connect((state) => ({
    screen: state.screen,
  })),
)(Embed);
