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

function Embed(props) {
  const { data, screen, block } = props;
  const el = useRef();
  const modal = useRef();
  const [svg, setSVG] = useState('');
  const [mobile, setMobile] = useState(false);

  const isSvg = getFileExtension(data.preview_image) === 'svg';
  if (
    !isSvg &&
    props?.modifiedSchema?.fieldsets?.[0]?.fields?.includes('svg_as_img')
  ) {
    props.setModifiedSchema({
      ...props.modifiedSchema,
      fieldsets: [
        {
          ...props.modifiedSchema?.fieldsets?.[0],
          fields: (props.modifiedSchema?.fieldsets?.[0]?.fields || [])?.filter(
            (f) => f !== 'svg_as_img',
          ),
        },
        ...(props?.modifiedSchema?.fieldsets?.slice(1) || []),
      ],
    });
  }

  if (
    isSvg &&
    props?.modifiedSchema &&
    !props?.modifiedSchema?.fieldsets?.[0]?.fields?.includes('svg_as_img')
  ) {
    props.setModifiedSchema({
      ...props.modifiedSchema,
      fieldsets: [
        {
          ...props.modifiedSchema.fieldsets?.[0],
          fields: [
            ...(props.modifiedSchema.fieldsets?.[0]?.fields || []),
            'svg_as_img',
          ],
        },
        ...(props?.modifiedSchema?.fieldsets?.slice(1) || []),
      ],
    });
  }
  useEffect(() => {
    if (isSvg && data?.preview_image?.download) {
      fetch(data.preview_image.download)
        .then((res) => res.text())
        .then((data) => {
          setSVG(data);
        })
        .catch((_) => {});
    }
  }, [data, isSvg]);

  useEffect(() => {
    if (__CLIENT__) {
      let svg = document.getElementById('embed_svg' + block)?.firstElementChild;

      if (svg) {
        let width = svg.getAttribute('width');
        let height = svg.getAttribute('height');

        if (!width || !height) {
          const viewBox = svg.getAttribute('viewBox');
          if (viewBox) {
            const viewBoxValues = viewBox.split(' ');
            if (viewBoxValues.length === 4) {
              width = viewBoxValues[2]; // width from viewBox
              height = viewBoxValues[3]; // height from viewBox
            }
          }
        }

        if (width && height) {
          svg.setAttribute(
            'viewBox',
            `0 0 ${parseFloat(width)} ${parseFloat(height)}`,
          );
          svg.setAttribute('width', '100%');
          svg.setAttribute('height', '100%');
        }
      }

      let svg2 = document.getElementById(
        'embed_svg_modal' + block,
      )?.firstElementChild;

      if (svg2) {
        let width = svg.getAttribute('width');
        let height = svg.getAttribute('height');

        if (!width || !height) {
          const viewBox = svg.getAttribute('viewBox');
          if (viewBox) {
            const viewBoxValues = viewBox.split(' ');
            if (viewBoxValues.length === 4) {
              width = viewBoxValues[2]; // width from viewBox
              height = viewBoxValues[3]; // height from viewBox
            }
          }
        }

        if (width && height) {
          svg2.setAttribute(
            'viewBox',
            `0 0 ${parseFloat(width)} ${parseFloat(height)}`,
          );
          svg2.setAttribute('width', modal.current.innerWidth);
          svg2.setAttribute('height', modal.current.innerHeight);
        }
      }
    }
  }, [svg, modal, block]);

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
        {isSvg && data.svg_as_img ? (
          <Image src={data.preview_image.download} />
        ) : (
          <span
            id={'embed_svg' + block}
            dangerouslySetInnerHTML={{ __html: svg }}
          />
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
              {isSvg && data.svg_as_img ? (
                <Image
                  src={data.preview_image.download}
                  className="enlarge-embed-static-content"
                />
              ) : (
                <span
                  dangerouslySetInnerHTML={{ __html: svg }}
                  id={'embed_svg_modal' + block}
                />
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
