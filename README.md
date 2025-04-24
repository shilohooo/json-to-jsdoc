# JSON to JSDoc

Generate JSDoc comments from JSON object or array.

## 📦 Installation

### NPM

```shell
npm install json-to-jsdoc
```

### Yarn

```shell
yarn add json-to-jsdoc
```

### PNPM

```shell
pnpm add json-to-jsdoc
```

## 🚀 Usage

```javascript
import { jsonToJSDoc } from 'json-to-jsdoc';

const jsonStr = JSON.stringify({
  id: 1,
  name: 'Bruce',
  address: { city: 'New York' },
  roles: [{ id: 1, roleName: 'admin' }]
})
const jsDoc = jsonToJSDoc(jsonStr, {
  rootTypeName: 'Root',
  typePrefix: 'My',
  typeSuffix: 'Type',
})

// output
/**
 * @typedef {MyRootType} MyRootType
 * @property {number} id
 * @property {string} name
 * @property {Address} address
 * @property {Role[]} roles
 */

/**
 * @typedef {MyAddressType} MyAddressType
 * @property {string} city
 */

/**
 * @typedef {MyRoleType} MyRoleType
 * @property {number} id
 * @property {string} roleName
 */
```

## 🛠️ Stack

| Name          | Version | Documentation                                | Remark |
|---------------|---------|----------------------------------------------|--------|
| NodeJS        | 22.14.0 | <https://nodejs.org>                         |        |
| PNPM          | 10.6.5  | <https://pnpm.io/>                           |        |
| TypeScript    | ~5.7.2  | <https://www.typescriptlang.org/>            |        |
| Vite          | ^6.3.0  | <https://vite.dev/>                          |        |
| Vitest        | ^3.1.1  | <https://vitest.dev/>                        |        |
| Vitest        | ^3.1.1  | <https://vitest.dev/>                        |        |
| change-case   | ^3.1.1  | <https://github.com/blakeembrey/change-case> |        |
| pluralize-esm | ^9.0.5  | <https://github.com/sanity-io/pluralize-esm> |        |

## ❤️ Credits

This project is inspired by [json-to-jsdoc-converter](https://gitlab.com/nvidia1997/json-to-jsdoc-converter), developed
by [Rumen Krastev Shishkov](https://gitlab.com/nvidia1997), thank you very much~

## 💪 Contributors

|                                             Shiloh                                              |
|:-----------------------------------------------------------------------------------------------:|
| [![Shiloh](https://avatars.githubusercontent.com/u/46670399?v=4)](https://github.com/shilohooo) |

## 🔖 License

Copyright © 2025-present Shiloh

[MIT](./LICENSE)
