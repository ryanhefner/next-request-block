import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { RequestBlockProvider, getDataFromTree } from 'react-request-block';
import { getDisplayName } from './hoc-utils';
import initRequestBlockCache from './initRequestBlockCache';
const Flatted = require('flatted/cjs');

export default (config) => {
  const { origin } = config || {};

  return (ComposedComponent) => {
    const propTypes = {
      requestBlockState: PropTypes.shape(),
    };

    const defaultProps = {
      requestBlockState: null,
    };

    const RequestBlock = class extends React.Component {
      static displayName = `withRequestBlock(${getDisplayName(ComposedComponent)})`;

      constructor(props) {
        super(props);

        this.requestBlockCache = initRequestBlockCache(props.requestBlockState);
      }

      static async getInitialProps(props) {
        const { Component, router, ctx } = props;

        let composedInitialProps = {};
        if (ComposedComponent.getInitialProps) {
          composedInitialProps = await ComposedComponent.getInitialProps(props);
        }

        // Run all RequestBlock queries in the component tree
        // and extract the resulting data
        const requestBlockCache = initRequestBlockCache();

        if (!process.browser) {
          const { req } = ctx;
          const { host } = req.headers;
          const defaultOrigin = `${req && req.connection && req.connection.encrypted ? 'https://' : 'http://'}${host}`;

          try {
            // Run all RequestBlock queries
            await getDataFromTree(
              <RequestBlockProvider
                cache={requestBlockCache}
                origin={origin || defaultOrigin}
              >
                <ComposedComponent
                  Component={Component}
                  ctx={ctx}
                  router={router}
                  store={ctx.store}
                  {...composedInitialProps}
                />
              </RequestBlockProvider>
            );
          } catch (error) {
            // Prevent errors from crashing SSR.
            // Handle them in components via the data.error prop:
            if (process.env.NODE_ENV === 'development') {
              console.log(error);
            }
          }

          // getDataFromTree does not call componentWillUnmount
          // head side effect therefore need to be cleared manually
          Head.rewind();
        }

        // Pass in the initial cache state
        const requestBlockState = {
          cache: Flatted.stringify(requestBlockCache.extract()),
          origin,
        };

        return {
          ...composedInitialProps,
          requestBlockState,
        };
      }

      render() {
        return (
          <RequestBlockProvider cache={this.requestBlockCache} origin={origin || ''}>
            <ComposedComponent {...this.props} />
          </RequestBlockProvider>
        );
      }
    };

    RequestBlock.propTypes = propTypes;
    RequestBlock.defaultProps = defaultProps;

    return RequestBlock;
  };
}
