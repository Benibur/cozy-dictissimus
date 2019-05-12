[![Travis build status shield](https://img.shields.io/travis/benibur/cozy-dictissimus/master.svg)](https://travis-ci.org/benibur/cozy-dictissimus)
[![Github Release version shield](https://img.shields.io/github/tag/benibur/cozy-dictissimus.svg)](https://github.com/benibur/cozy-dictissimus/releases)
[![jest](https://facebook.github.io/jest/img/jest-badge.svg)](https://github.com/facebook/jest)


# Cozy dictissimus

## What's Cozy dictissimus?

<TODO>...

### Questions Cédric :
* trouver un remplaçant à combokeys :
  - https://www.npmjs.com/package/react-shortcuts : semble le mieux, le plus populaire
  - https://www.npmjs.com/package/react-keyboard-shortcuts syntaxe criptique pour moi

https://gyazo.com/600b1aabffc76f19868fa2f2a809ff9e
https://gyazo.com/c8198acef0cb90e0ad2178204a1fd02f
https://gyazo.com/cb4da10870acb7d3ae99c59798aa4bb1
https://gyazo.com/1af66ef35238a6526f5741947adfea17
https://gyazo.com/2b9f6a4d387f37fe6316a7831259fa2f
https://gyazo.com/8b4af26301cd64a05865fbf74c725800

Les écrans :

Desktop :
* https://zpl.io/2pv6jPy
* https://zpl.io/bPxGn1k
* https://zpl.io/aBRxpZA
* https://zpl.io/2yqAEPw
* https://zpl.io/aRx509N
* https://zpl.io/2j56R7Q
* https://zpl.io/adzewY1

Mobile :
* https://zpl.io/a87gvRX
* https://zpl.io/V0L4j5x
* https://zpl.io/b64zooN
* https://zpl.io/agQYBBN
* https://zpl.io/VQvjnn5
* https://zpl.io/2vOJooj
* https://zpl.io/a87gvv6
* https://zpl.io/bJpm0xE
* https://zpl.io/bWNon01
* https://zpl.io/V0L4jmR

pour un jour si visualisation de voix :
* https://www.twilio.com/blog/audio-visualisation-web-audio-api--react

## Hack

_:pushpin: Note:_ we recommend to use [Yarn] instead of NPM for package management. Don't hesitate to [install][yarn-install] and use it for your Cozy projects, it's now our main node packages tool for Cozy official apps.

### Install

Hacking the Cozy Cozy dictissimus app requires you to [setup a dev environment][setup].

You can then clone the app repository and install dependencies:

```sh
$ git clone https://github.com/benibur/cozy-dictissimus.git
$ cd cozy-dictissimus
$ yarn install
```

:pushpin: If you use a node environment wrapper like [nvm] or [ndenv], don't forget to set your local node version before doing a `yarn install`.

Cozy's apps use a standard set of _npm scripts_ to run common tasks, like watch, lint, test, build…


### Run it inside a Cozy using Docker

You can run your application inside a Cozy thanks to the [cozy-stack docker image][cozy-stack-docker]:

```sh
# in a terminal, run your app in watch mode with a docker running Cozy
$ cd cozy-dictissimus
$ yarn start
```

After the build and the stack launched, your app is now available at http://cozy-dictissimus.cozy.tools:8080.


### Living on the edge

[Cozy-ui] is our frontend stack library that provides common styles and components accross the whole Cozy's apps. You can use it for you own application to follow the official Cozy's guidelines and styles. If you need to develop / hack cozy-ui, it's sometimes more useful to develop on it through another app. You can do it by cloning cozy-ui locally and link it to yarn local index:

```sh
git clone https://github.com/cozy/cozy-ui.git
cd cozy-ui
yarn install
yarn link
```

then go back to your app project and replace the distributed cozy-ui module with the linked one:

```sh
cd cozy-drive
yarn link cozy-ui
```

[Cozy-client-js] is our API library that provides an unified API on top of the cozy-stack. If you need to develop / hack cozy-client-js in parallel of your application, you can use the same trick that we used with [cozy-ui]: yarn linking.


### Tests

Tests are run by [jest] under the hood. You can easily run the tests suite with:

```sh
$ cd cozy-dictissimus
$ yarn test
```

:pushpin: Don't forget to update / create new tests when you contribute to code to keep the app the consistent.


## Models

The Cozy datastore stores documents, which can be seen as JSON objects. A `doctype` is simply a declaration of the fields in a given JSON object, to store similar objects in an homogeneous fashion.

Cozy ships a [built-in list of `doctypes`][doctypes] for representation of most of the common documents (Bills, Contacts, Files, ...).

Whenever your app needs to use a given `doctype`, you should:

- Check if this is a standard `doctype` defined in Cozy itself. If this is the case, you should add a model declaration in your app containing at least the fields listed in the [main fields list for this `doctype`][doctypes]. Note that you can extend the Cozy-provided `doctype` with your own customs fields. This is typically what is done in [Konnectors] for the [Bill `doctype`][bill-doctype].
- If no standards `doctypes` fit your needs, you should define your own `doctype` in your app. In this case, you do not have to put any field you want in your model, but you should crosscheck other cozy apps to try to homogeneize the names of your fields, so that your `doctype` data could be reused by other apps. This is typically the case for the [Konnector `doctype`][konnector-doctype] in [Konnectors].


### Open a Pull-Request

If you want to work on Cozy dictissimus and submit code modifications, feel free to open pull-requests! See the [contributing guide][contribute] for more information about how to properly open pull-requests.


## Community

### What's Cozy?

<div align="center">
  <a href="https://cozy.io">
    <img src="https://cdn.rawgit.com/cozy/cozy-site/master/src/images/cozy-logo-name-horizontal-blue.svg" alt="cozy" height="48" />
  </a>
 </div>
 </br>

[Cozy] is a platform that brings all your web services in the same private space.  With it, your webapps and your devices can share data easily, providing you with a new experience. You can install Cozy on your own hardware where no one's tracking you.

### Localization

Localization and translations are handled by [Transifex][tx], which is used by all Cozy's apps.

As a _translator_, you can login to [Transifex][tx-signin] (using your Github account) and claim an access to the [app repository][tx-app]. Locales are pulled when app is build before publishing.

As a _developer_, you must [configure the transifex client][tx-client], and claim an access as _maintainer_ to the [app repository][tx-app]. Then please **only update** the source locale file (usually `en.json` in client and/or server parts), and push it to Transifex repository using the `tx push -s` command.


### Maintainer

The lead maintainer for Cozy dictissimus is [benibur](https://github.com/benibur), send him/her a :beers: to say hello!


### Get in touch

You can reach the Cozy Community by:

- Chatting with us on IRC [#cozycloud on Freenode][freenode]
- Posting on our [Forum][forum]
- Posting issues on the [Github repos][github]
- Say Hi! on [Twitter][twitter]


## License

Cozy dictissimus is developed by benibur and distributed under the [AGPL v3 license][agpl-3.0].



[cozy]: https://cozy.io "Cozy Cloud"
[setup]: https://dev.cozy.io/#set-up-the-development-environment "Cozy dev docs: Set up the Development Environment"
[yarn]: https://yarnpkg.com/
[yarn-install]: https://yarnpkg.com/en/docs/install
[cozy-ui]: https://github.com/cozy/cozy-ui
[cozy-client-js]: https://github.com/cozy/cozy-client-js/
[cozy-stack-docker]: https://github.com/cozy/cozy-stack/blob/master/docs/client-app-dev.md#with-docker
[doctypes]: https://cozy.github.io/cozy-doctypes/
[bill-doctype]: https://github.com/cozy/cozy-konnector-libs/blob/master/models/bill.js
[konnector-doctype]: https://github.com/cozy/cozy-konnector-libs/blob/master/models/base_model.js
[konnectors]: https://github.com/cozy/cozy-konnector-libs
[agpl-3.0]: https://www.gnu.org/licenses/agpl-3.0.html
[contribute]: CONTRIBUTING.md
[tx]: https://www.transifex.com/cozy/
[tx-signin]: https://www.transifex.com/signin/
[tx-app]: https://www.transifex.com/cozy/<SLUG_TX>/dashboard/
[tx-client]: http://docs.transifex.com/client/
[freenode]: http://webchat.freenode.net/?randomnick=1&channels=%23cozycloud&uio=d4
[forum]: https://forum.cozy.io/
[github]: https://github.com/cozy/
[twitter]: https://twitter.com/cozycloud
[nvm]: https://github.com/creationix/nvm
[ndenv]: https://github.com/riywo/ndenv
[jest]: https://facebook.github.io/jest/
