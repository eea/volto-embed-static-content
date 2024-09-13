import React from 'react';
import cx from 'classnames';
import { Popup } from 'semantic-ui-react';
import { downloadDataURL, getFileExtension } from './helpers';

export default function Download(props) {
  const { file, fileName, data } = props;
  const [open, setOpen] = React.useState(false);

  const handleDownloadImage = () => {
    downloadDataURL(data.preview_image.download, data.preview_image.filename || `download.${getFileExtension(data.preview_image)}`);

    setOpen(false);
  };
  const handleDownloadFile = () => {
    downloadDataURL(file, fileName);

    setOpen(false);
  };

  return (
    <Popup
      popper={{ id: 'vis-toolbar-popup', className: 'download-popup' }}
      position="bottom left"
      on="click"
      open={open}
      onClose={() => {
        setOpen(false);
      }}
      onOpen={() => {
        setOpen(true);
      }}
      trigger={
        <div className="download">
          <button className={cx('trigger-button', { open })}>
            <i className="ri-download-fill" />
            <span>Download</span>
          </button>
        </div>
      }
      content={
        <>
          {' '}
          {fileName && file && (
            <div className="item">
              <span className="label">File</span>
              <div className="types">
                <div className="type">
                  <button
                    onClick={() => {
                      handleDownloadFile();
                    }}
                  >
                    <span>
                      {fileName
                        .substr(fileName.lastIndexOf('.') + 1)
                        ?.toUpperCase()}
                    </span>
                  </button>
                </div>
              </div>
            </div>
          )}
          <div className="item">
            <span className="label">Chart</span>
            <div className="types">
              <div className="type">
                <button
                  onClick={() => {
                    handleDownloadImage();
                  }}
                >
                  <span>
                    {data.preview_image.download
                      .substr(data.preview_image.download.lastIndexOf('.') + 1)
                      ?.toUpperCase()}
                  </span>
                </button>
              </div>
            </div>
          </div>
        </>
      }
    />
  );
}
