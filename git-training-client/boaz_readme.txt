add eslint
https://www.npmjs.com/package/eslint-plugin-react
  npm install eslint --save-dev
  npm install eslint-plugin-react --save-dev

  {
    "plugins": [
        "react"
      ],

    "parser": "babel-eslint",

    "extends": [
      "eslint:recommended",
      "plugin:react/recommended"
    ],
    "parserOptions": {
      "ecmaFeatures": {
        "jsx": true,
        "modules": true
      }
    }
  }
  "rules": {
      "semi": ["warn", "always"]
    }
    

Type script:

    doesn't work:
    https://www.typescriptlang.org/docs/handbook/react-&-webpack.html
    https://www.npmjs.com/package/tslint-react-recommended
    also need to add  tslint-react


    trying this
    https://github.com/Microsoft/TypeScript-React-Starter


