import { isEqual } from 'lodash';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';

import { defineMessages, injectIntl } from 'react-intl';
import { Message, Button, Input } from 'semantic-ui-react';
import { FormFieldWrapper, Icon } from '@plone/volto/components';
import withObjectBrowser from '@plone/volto/components/manage/Sidebar/ObjectBrowser';
import { createContent } from '@plone/volto/actions';
import { flattenToAppURL, isInternalURL } from '@plone/volto/helpers';

import imageBlockSVG from '@plone/volto/components/manage/Blocks/Image/block-image.svg';
import clearSVG from '@plone/volto/icons/clear.svg';
import navTreeSVG from '@plone/volto/icons/nav.svg';
import aheadSVG from '@plone/volto/icons/ahead.svg';

import './style.less';

const messages = defineMessages({
  AttachedImageWidgetInputPlaceholder: {
    id: 'Browse the site, drop an image, or type an URL',
    defaultMessage: 'Browse the site, drop an image, or type an URL',
  },
});

const formatURL = (url) => {
  if (url === undefined) return '';
  if (typeof url === 'string') return url;
  if (Array.isArray(url)) return formatURL(url?.[0]);
  if (typeof url === 'object') return formatURL(url?.['@id']);
};

export class AttachedImageWidget extends Component {
  /**
   * Property types.
   * @property {Object} propTypes Property types.
   * @static
   */
  static propTypes = {
    id: PropTypes.string,
    title: PropTypes.string,
    value: PropTypes.any,
    block: PropTypes.string.isRequired,
    request: PropTypes.shape({
      loading: PropTypes.bool,
      loaded: PropTypes.bool,
    }).isRequired,
    pathname: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    openObjectBrowser: PropTypes.func.isRequired,
  };

  state = {
    url: '',
  };

  /**
   * Component will receive props
   * @method componentWillReceiveProps
   * @param {Object} nextProps Next properties
   * @returns {undefined}
   */
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (this.props.request.loading && nextProps.request.loaded) {
      this.props.onChange(this.props.id, nextProps.content['@id']);
    }
  }

  /**
   * @param {*} nextProps
   * @returns {boolean}
   * @memberof Edit
   */
  shouldComponentUpdate(nextProps, nextState) {
    return (
      !isEqual(this.props.value, nextProps.value) ||
      !isEqual(this.state, nextState)
    );
  }

  /**
   * Change url handler
   * @method onChangeUrl
   * @param {Object} target Target object
   * @returns {undefined}
   */
  onChangeUrl = ({ target }) => {
    this.setState({
      url: target.value,
    });
  };

  /**
   * Submit url handler
   * @method onSubmitUrl
   * @param {object} e Event
   * @returns {undefined}
   */

  resetSubmitUrl = () => {
    this.setState({
      url: '',
    });
  };

  node = React.createRef();

  render() {
    const placeholder =
      this.props.placeholder ||
      this.props.intl.formatMessage(
        messages.AttachedImageWidgetInputPlaceholder,
      );

    return (
      <FormFieldWrapper
        columns={1}
        className="field-attached-image"
        {...this.props}
      >
        {this.props.value && (
          <div className="preview">
            <img
              src={
                isInternalURL(formatURL(this.props.value))
                  ? `${flattenToAppURL(
                      formatURL(this.props.value),
                    )}/@@images/image/preview`
                  : formatURL(this.props.value)
              }
              alt="Preview"
            />
            <Button.Group>
              <Button
                basic
                icon
                className="cancel"
                onClick={(e) => {
                  e.stopPropagation();
                  this.setState({ url: '' }, () => {
                    this.props.onSubmitUrl(this.state.url);
                  });
                }}
              >
                <Icon name={clearSVG} size="30px" />
              </Button>
            </Button.Group>
          </div>
        )}

        <div>
          <Message>
            <div className="no-image-wrapper" style={{ textAlign: 'center' }}>
              <img src={imageBlockSVG} alt="" />
              <div className="toolbar-inner">
                <Button.Group>
                  <Button
                    basic
                    icon
                    onClick={(e) => {
                      e.stopPropagation();
                      e.preventDefault();
                      this.props.openObjectBrowser({
                        mode: 'url',
                        currentPath: this.props.pathname,
                        onSelectItem: (url) => {
                          this.setState({ url });
                        },
                      });
                    }}
                  >
                    <Icon name={navTreeSVG} size="24px" />
                  </Button>
                </Button.Group>
                <div style={{ flexGrow: 1 }} />
                <Input
                  onChange={this.onChangeUrl}
                  placeholder={placeholder}
                  value={this.state.url}
                />
                <div style={{ flexGrow: 1 }} />
                <Button.Group>
                  {this.state.url && (
                    <Button
                      basic
                      icon
                      secondary
                      className="cancel"
                      onClick={(e) => {
                        e.stopPropagation();
                        this.setState({ url: '' });
                      }}
                    >
                      <Icon name={clearSVG} size="24px" />
                    </Button>
                  )}
                  <Button
                    basic
                    icon
                    primary
                    disabled={!this.state.url}
                    onClick={(e) => {
                      e.stopPropagation();
                      this.props.onSubmitUrl(this.state.url);
                    }}
                  >
                    <Icon name={aheadSVG} size="24px" />
                  </Button>
                </Button.Group>
              </div>
              {this.props.errorMessage && (
                <Message error content={this.props.errorMessage} />
              )}
            </div>
          </Message>
        </div>
      </FormFieldWrapper>
    );
  }
}

export default compose(
  injectIntl,
  withObjectBrowser,
  connect(
    (state, props) => ({
      pathname: state.router.location.pathname,
      request: state.content.subrequests[props.block] || {},
      content: state.content.subrequests[props.block]?.data,
    }),
    {
      createContent,
    },
  ),
)(AttachedImageWidget);
