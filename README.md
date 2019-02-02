<!-- [![NPM Version][npm-image]][npm-url] -->
<!-- [![NPM Downloads][downloads-image]][downloads-url] -->
<!-- [![Node.js Version][node-version-image]][node-version-url] -->
[![Build Status][travis-image]][travis-url]
[![Test Coverage][coveralls-image]][coveralls-url]

# Description

For quickly create NodeJs module for helpers using this command:

```bash
npx degit NikolayMakhonin/nodejs-template-helpers <app name> && cd <app name> && npm i && npm run test
```

Module usage:
```bash
  <package.json>
  ...
  "dependencies": {
    "helpers": "file:../common/modules/helpers"
  },
  ...
```

# Testing

<!-- Required for open source BrowserStack plan -->
<!-- https://www.browserstack.com/open-source?ref=pricing -->

Module has been tested on Travis and BrowserStack

## BrowserStack

You can see your user name / access key here:
https://www.browserstack.com/accounts/settings

### Local

For use BrowserStack locally you can set these environment variables:

For Windows users:
```bash
setx BROWSERSTACK_USERNAME "your user name"
setx BROWSERSTACK_ACCESS_KEY "your access key"
```

**Attention! BrowserStack tests does not work in WebStorm (and this is an unsolvable problem). You should run tests from console.**

### Travis

And you should set your user name and encrypted access key to the .travis.yml

You shoud generate encrypted access key for each repository.

See: https://docs.travis-ci.com/user/encryption-keys
```yml
addons:
  browserstack:
    username: "your user name"
    access_key:
      secure: "your encrypter access key"
```

---

[![BrowserStack](https://i.imgur.com/cOdhMed.png)](https://www.browserstack.com/)

---

# License

[CC0-1.0](LICENSE)

[npm-image]: https://img.shields.io/npm/v/nodejs-template-helpers.svg
[npm-url]: https://npmjs.org/package/nodejs-template-helpers
[node-version-image]: https://img.shields.io/node/v/nodejs-template-helpers.svg
[node-version-url]: https://nodejs.org/en/download/
[travis-image]: https://travis-ci.org/NikolayMakhonin/nodejs-template-helpers.svg
[travis-url]: https://travis-ci.org/NikolayMakhonin/nodejs-template-helpers
[coveralls-image]: https://coveralls.io/repos/github/NikolayMakhonin/nodejs-template-helpers/badge.svg
[coveralls-url]: https://coveralls.io/github/NikolayMakhonin/nodejs-template-helpers
[downloads-image]: https://img.shields.io/npm/dm/nodejs-template-helpers.svg
[downloads-url]: https://npmjs.org/package/nodejs-template-helpers
[npm-url]: https://npmjs.org/package/nodejs-template-helpers
