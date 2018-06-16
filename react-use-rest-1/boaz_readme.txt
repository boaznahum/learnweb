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
    
  