import React, { useState, useEffect } from 'react';
import { isFunction } from 'lodash';
import { Modal } from 'semantic-ui-react';
import cx from 'classnames';

const Enlarge = ({ children, className, onClick, ref, block }) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen === true) {
      let svg2 = document.getElementById(
        'embed_svg_modal' + block,
      )?.firstElementChild;

      if (svg2) {
        let width = svg2.getAttribute('width');
        let height = svg2.getAttribute('height');

        if (!width || !height) {
          const viewBox = svg2.getAttribute('viewBox');
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
          svg2.setAttribute('height', '100%');
          svg2.setAttribute('width', '100%');
        }
      }
    }
  }, [block, isOpen]);

  return (
    <div className="enlarge">
      <button
        className="trigger-button"
        onClick={() => {
          if (isFunction(onClick)) {
            onClick({ setOpen: setIsOpen });
          } else {
            setIsOpen(true);
          }
        }}
      >
        <i className="ri-fullscreen-line" />
        Enlarge
      </button>
      {children && (
        <Modal
          open={isOpen}
          closeIcon={
            <span className="close icon">
              <i className="ri-close-line" />
            </span>
          }
          onClose={() => setIsOpen(false)}
          className={cx('enlarge-modal', className)}
        >
          <Modal.Content>{children}</Modal.Content>
        </Modal>
      )}
    </div>
  );
};

export default Enlarge;
