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
        let modal = document.getElementsByClassName('enlarge-modal')?.[0];

        svg2.setAttribute(
          'viewBox',
          `0 0 ${svg2.getAttribute('width')} ${svg2.getAttribute('height')}`,
        );

        svg2.setAttribute('height', modal.clientHeight - 10);
        svg2.setAttribute('width', '100%');
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
