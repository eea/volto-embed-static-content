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
  Enlarge,
} from '@eeacms/volto-embed/Toolbar';
import Download from './DownloadData';

function Embed({ data, intl, id, screen, block }) {
  const el = useRef();
  const [showDownload, setShowDownload] = useState(false);
  const [svg, setSVG] = useState('');
  const [mobile, setMobile] = useState(false);
  console.log(data.preview_image);
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
    if (
      data.preview_image.filename.substr(
        data.preview_image.filename.lastIndexOf('.') + 1,
      ) === 'svg'
    )
      fetch(data.preview_image.download)
        .then((res) => {
          return res.text();
        })
        .then((data) => {
          setSVG(data);
        });
  }, [data]);

  useEffect(() => {
    if (__CLIENT__) {
      let svg = document.getElementById('embed_svg' + block)?.firstElementChild;

      if (svg) svg.setAttribute('max-width', '100%');
      let svg2 = document.getElementById(
        'embed_svg_modal' + block,
      )?.firstElementChild;

      if (svg2) {
        svg.setAttribute('max-width', '100%');
        svg.setAttribute('max-hieght', '100%');
      }
    }
  }, [svg]);

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
        {data.preview_image.filename.substr(
          data.preview_image.filename.lastIndexOf('.') + 1,
        ) === 'svg' ? (
          <span
            id={'embed_svg' + block}
            dangerouslySetInnerHTML={{ __html: svg }}
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
          {data.download_button && <Download data={data} />}
          {data.with_enlarge && (
            <Enlarge className="enlarge-embed-embed-content-static">
              {data.preview_image.filename.substr(
                data.preview_image.filename.lastIndexOf('.') + 1,
              ) === 'svg' ? (
                <span
                  dangerouslySetInnerHTML={{ __html: svg }}
                  id={'embed_svg_modal' + block}
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
