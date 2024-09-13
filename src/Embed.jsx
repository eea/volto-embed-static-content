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
    if (isSvg)
      fetch(data.preview_image.download)
        .then((res) => {
          return res.text();
        })
        .then((data) => {
          setSVG(data);
        });
  }, [data, isSvg]);

  useEffect(() => {
    if (__CLIENT__) {
      let svg = document.getElementById('embed_svg' + block)?.firstElementChild;

      if (svg) {
        let width = parseFloat(svg.getAttribute('width') || 0);
        let height = parseFloat(svg.getAttribute('height') || 0);

        if (!width || !height) {
          const viewBox = svg.getAttribute('viewBox');
          if (viewBox) {
            const viewBoxValues = viewBox.split(' ');
            width = parseFloat(viewBoxValues[2]); // width from viewBox
            height = parseFloat(viewBoxValues[3]); // height from viewBox
          }
        }

        if (width && height) {
          svg.setAttribute('viewBox', `0 0 ${width} ${height}`);
          svg.setAttribute('width', '100%');
          svg.setAttribute('height', '100%');
        }
      }

      let svg2 = document.getElementById(
        'embed_svg_modal' + block,
      )?.firstElementChild;

      if (svg2) {
        let width = parseFloat(svg.getAttribute('width') || 0);
        let height = parseFloat(svg.getAttribute('height') || 0);

        if (!width || !height) {
          const viewBox = svg.getAttribute('viewBox');
          if (viewBox) {
            const viewBoxValues = viewBox.split(' ');
            width = parseFloat(viewBoxValues[2]); // width from viewBox
            height = parseFloat(viewBoxValues[3]); // height from viewBox
          }
        }

        if (width && height) {
          svg2.setAttribute('viewBox', `0 0 ${width} ${height}`);
          svg2.setAttribute('width', modal.current.innerWidth);
          svg2.setAttribute('height', modal.current.innerHeight);
        }
      }
    }
  }, [svg, modal, block]);

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
