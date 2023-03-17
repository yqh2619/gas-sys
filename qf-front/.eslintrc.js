module.exports = {
  "root": true,
  "env": {
    "browser": true,
    "es2022": true,
    "node": true
  },
  "extends": [
    "eslint:recommended",
    "plugin:vue/vue3-recommended" // 当规则冲突时，下面的会覆盖上面的 
  ],
  "parserOptions": {
    "ecmaVersion": "latest",
    "sourceType": "module"
  },
  "rules": { // 当规则冲突时，此处定义的规则会覆盖继承的规则。
    "indent": ["error", 4],
    "no-unused-vars": "warn",
    "quotes": ["warn", "double"],
    "no-console": "warn",
    "no-debugger": "warn",
    "vue/html-indent": ["error", 4],
    "vue/script-indent": ["error", 4, {
      "baseIndent": 1
    }],
    "vue/max-attributes-per-line": "off",
    "vue/singleline-html-element-content-newline": "off",
    "vue/multi-word-component-names": "off"
  },
  "overrides": [{
    "files": ["*.vue"],
    "rules": {
      "indent": "off"
    }
  }]
};