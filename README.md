# next-request-block

React library for integrating [`react-request-block`](https://github.com/ryanhefner/react-request-block) into the server-side rendering of your Next.js app.

## Install

Via [npm](https://npmjs.com/package/next-request-block)

```sh
npm install --save next-request-block
```

Via [Yarn](https://yarn.fyi)

```sh
yarn add next-request-block
```

## How to use

### `withRequestBlock` (HOC)

`withRequestBlock` makes it super simple to setup [`react-request-block`](https://github.com/ryanhefner/react-request-block)
within your Next.js app. Using `next-request-block` makes sure that all your `RequestBlock`
instances are fetched and rendered server-side, allowing you to truly take advantage
of Next.js, while making it easy to compose requests/data into your Next + React apps.

#### Options

| Option   | Default                                                        | Description                   |
| -------- | -------------------------------------------------------------- | ----------------------------- |
| `origin` | `http(s)://[current host]` (server-side) or `''` (client-side) | Current protocol/host of app. |


## Example w/o options

```js
import App, { Container } from 'next/app';
import React from 'react';
import { withRequestBlock } from 'next-request-block';

class MyApp extends App {
  static async getInitialProps({ Component, ctx, router }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps({ ctx });
    }

    return { pageProps };
  }

  render() {
    const {
      Component,
      pageProps,
      store,
    } = this.props;

    return (
      <Container>
        <Component {...pageProps} />
      </Container>
    );
  }
}

export default withRequestBlock()(MyApp);
````

## Example w/ options

```js
import App, { Container } from 'next/app';
import React from 'react';
import { withRequestBlock } from 'next-request-block';

class MyApp extends App {
  static async getInitialProps({ Component, ctx, router }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps({ ctx });
    }

    return { pageProps };
  }

  render() {
    const {
      Component,
      pageProps,
      store,
    } = this.props;

    return (
      <Container>
        <Component {...pageProps} />
      </Container>
    );
  }
}

export default withRequestBlock({ origin: 'https://api.custom.origin' })(MyApp);
````

## License

[MIT](LICENSE) © [Ryan Hefner](https://www.ryanhefner.com)
