module.exports = {
    'root': true,
    'env': {
        'browser': true,
        'es2022': true,
        'node': true,
        'mocha': true,
    },
    'extends': [
        'eslint:recommended',
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
    ],
    'parser': '@typescript-eslint/parser',
    'parserOptions': {
        'project': './tsconfig.json',
        'sourceType': 'module',
        'ecmaVersion': 2022,
    },
    'plugins': [
        '@stylistic',
        '@typescript-eslint',
        "simple-import-sort",
        'eslint-plugin-jsdoc',
        'eslint-plugin-prefer-arrow',
        'eslint-plugin-import',
        'import-newlines',
        'mocha',
        'unused-imports',
    ],
    'rules': {
        '@stylistic/no-multi-spaces': ['error', {
            'ignoreEOLComments': true,
            'includeTabs': false,
        }],
        '@typescript-eslint/adjacent-overload-signatures': 'error',
        '@typescript-eslint/array-type': 'off',
        '@typescript-eslint/ban-types': 'off',
        '@typescript-eslint/consistent-type-assertions': 'error',
        '@typescript-eslint/consistent-type-definitions': 'off',
        '@typescript-eslint/dot-notation': 'error',
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/explicit-member-accessibility': ['error', {
            'accessibility': 'explicit',
            'overrides': {
                'constructors': 'no-public',
            },
        }],
        '@typescript-eslint/indent': ['error', 4, {
            'FunctionDeclaration': {
                'parameters': 'first',
            },
            'FunctionExpression': {
                'parameters': 'first',
            },
            'CallExpression': {
                'arguments': 'off',
            },
            'ObjectExpression': 'off',
            'ignoredNodes': ['ArrowFunctionExpression > BlockStatement', 'TSInterfaceDeclaration TSMethodSignature *', 'TSUnionType *'],
            'ImportDeclaration': 1,
        }],
        '@typescript-eslint/member-delimiter-style': ['error', {
            'multiline': {
                'delimiter': 'semi',
                'requireLast': true,
            },
            'singleline': {
                'delimiter': 'semi',
                'requireLast': false,
            },
        }],
        '@typescript-eslint/no-base-to-string': 'error',
        '@typescript-eslint/no-empty-function': 'error',
        '@typescript-eslint/no-empty-interface': 'error',
        '@typescript-eslint/no-explicit-any': 'error',
        '@typescript-eslint/no-inferrable-types': 'off',
        '@typescript-eslint/no-misused-new': 'error',
        "@typescript-eslint/no-misused-promises": [
            'error',
            {
                'checksVoidReturn': {
                    // for jsx/tsx, enable later maybe
                    'attributes': false
                }
            }
        ],
        '@typescript-eslint/no-namespace': 'error',
        // TODO: we should probably set this rule to 'error' severity, each
        //       non-null assertion should be explicitly allowed
        '@typescript-eslint/no-non-null-assertion': 'warn',
        '@typescript-eslint/no-parameter-properties': 'off',
        '@typescript-eslint/no-shadow': ['error'],
        '@typescript-eslint/no-floating-promises': ['error'],
        '@typescript-eslint/no-this-alias': 'error',
        '@typescript-eslint/no-unnecessary-boolean-literal-compare': 'off',
        '@typescript-eslint/no-unnecessary-type-constraint': 'warn',
        '@typescript-eslint/no-unused-expressions': [
            'error',
            {
                'allowShortCircuit': true,
                'allowTernary': true,
            },
        ],
        '@typescript-eslint/no-unused-vars': 'off',
        '@typescript-eslint/no-use-before-define': 'off',
        '@typescript-eslint/no-var-requires': 'off',
        '@typescript-eslint/prefer-for-of': 'error',
        '@typescript-eslint/prefer-function-type': 'error',
        '@typescript-eslint/prefer-namespace-keyword': 'error',
        '@typescript-eslint/quotes': [
            'error',
            'single',
            {
                'avoidEscape': true,
                'allowTemplateLiterals': true,
            },
        ],
        '@typescript-eslint/restrict-template-expressions': [
            'error',
            {
                allowAny: true,
                allowBoolean: true,
                allowNumber: true,
                allowNullish: true,
                allowNever: true,
            }
        ],
        "@typescript-eslint/return-await": "error",
        '@typescript-eslint/semi': [
            'error',
            'always',
        ],
        '@typescript-eslint/strict-boolean-expressions': 'off',
        '@typescript-eslint/triple-slash-reference': [
            'error',
            {
                'path': 'always',
                'types': 'prefer-import',
                'lib': 'always',
            },
        ],
        '@typescript-eslint/unified-signatures': 'error',
        'arrow-parens': [
            'off',
            'always',
        ],
        'comma-dangle': 'off',
        'comma-spacing': ['error', { 'before': false, 'after': true }],
        '@typescript-eslint/comma-dangle': [
            'error',
            {
                'arrays': 'always-multiline',
                'objects': 'always-multiline',
                'imports': 'always-multiline',
                'exports': 'always-multiline',
                'functions': 'always-multiline',
                'enums': 'always-multiline',
                'generics': 'always-multiline',
                'tuples': 'always-multiline',
            },
        ],
        'complexity': 'off',
        'constructor-super': 'error',
        'curly': [
            'error',
            'multi-line',
        ],
        'eol-last': 'error',
        'eqeqeq': [
            'error',
            'smart',
        ],
        'guard-for-in': 'error',
        'indent': 'off',
        'id-blacklist': 'off',
        'id-match': 'off',
        'import-newlines/enforce': ['error', {
            'max-len': 160,
            'items': Infinity,
            'semi': true,
        }],
        'import/first': 'error',
        'import/no-duplicates': 'error',
        'import/newline-after-import': 'error',
        'import/no-extraneous-dependencies': 'off',
        'import/no-internal-modules': ['error', {
            'allow': ['**/protobuf/*'],
        }],
        'import/no-default-export': 'error',
        'import/no-relative-packages': 'error',
        'jsdoc/check-alignment': 'error',
        'jsdoc/check-indentation': 'off',
        'keyword-spacing': ['error', {
            'before': true,
            'after': true,
        }],
        'max-classes-per-file': 'off',
        'max-len': ['error', {
            'code': 160,
        }],
        'mocha/no-exclusive-tests': 'error',
        'new-parens': 'error',
        'no-bitwise': 'error',
        'no-caller': 'error',
        'no-cond-assign': 'error',
        'no-console': 'error',
        'no-constant-condition': 'off',
        'no-debugger': 'error',
        'no-duplicate-case': 'error',
        'no-duplicate-imports': 'error',
        'no-empty': 'error',
        'no-eval': 'error',
        'no-extra-bind': 'error',
        'no-fallthrough': 'off',
        'no-invalid-this': 'off',
        'no-irregular-whitespace': ['error', {
            'skipStrings': false,
            'skipComments': false,
            'skipRegExps': false,
            'skipTemplates': false,
        }],
        'no-multiple-empty-lines': ['error', { 'max': 1, 'maxBOF': 0 }],
        'no-new-func': 'error',
        'no-new-wrappers': 'error',
        'no-param-reassign': ['error', {
            'props': false,
        }],
        'no-redeclare': 'error',
        'no-return-await': 'off',
        'no-sequences': 'error',
        'no-shadow': 'off',
        'no-sparse-arrays': 'error',
        'no-template-curly-in-string': 'error',
        'no-throw-literal': 'error',
        'no-trailing-spaces': 'off',
        'no-undef-init': 'error',
        'no-underscore-dangle': 'off',
        'no-unsafe-finally': 'error',
        'no-unused-labels': 'error',
        'no-var': 'error',
        'object-curly-spacing': ['error', 'always'],
        'object-shorthand': 'error',
        'one-var': [
            'error',
            'never',
        ],
        'prefer-const': 'error',
        'prefer-object-spread': 'error',
        'quote-props': [
            'error',
            'as-needed',
        ],
        'radix': 'error',
        "simple-import-sort/imports": ["error", {
            "groups": [
                // Node.js builtins and external
                ["^"],
                // CPOS packages
                [
                    '^bee-',
                    '^@ubstream.*',
                    'cpos-api',
                    'event-server',
                    'beevirtua-worker',
                    'beevirtua-static-config',
                    'beevirtua-pdf-utility',
                    'beevirtua-common-backend',
                    'pdf-utility',
                    'pdf-utility-extra',
                    'stat-log-api',
                    'docker-scripts',
                    'eslint-config-cpos',
                ],
                // 'parent', 'sibling', 'index'
                ["^\\."],
                // Style imports.
                ["^.+\\.s?css|less$"],
            ]
        }],
        'space-before-function-paren': [
            'error',
            {
                'anonymous': 'always',
                'named': 'never',
            },
        ],
        'space-in-parens': [
            'error',
            'never',
        ],
        "space-infix-ops": ["warn"],
        'spaced-comment': [
            'error',
            'always',
            {
                'markers': [
                    '/',
                ],
            },
        ],
        'unused-imports/no-unused-vars': [
            'warn',
            {
                'ignoreRestSiblings': true,
            },
        ],
        'unused-imports/no-unused-imports': 'error',
        'use-isnan': 'error',
        'valid-typeof': 'off',
    },
    'overrides': [
        {
            'files': ['*Spec.ts'],
            'rules': {
                '@typescript-eslint/no-unused-expressions': 'off',
                '@typescript-eslint/no-explicit-any': 'off',
            },
        },
        {
            'files': ['*Dao.ts', '*Stub.ts', 'from_*', '*Stub*'],
            'rules': {
                '@typescript-eslint/no-explicit-any': 'off',
            },
        },
        {
            'files': ['*.ts', '*.tsx'],
            'rules': {
                '@typescript-eslint/explicit-function-return-type': ['error', {
                    'allowHigherOrderFunctions': true,
                }],
            },
        },
        {
            'files': ['*Spec.ts', '*Stub.ts', 'from_*', '*Stub*'],
            'rules': {
                '@typescript-eslint/explicit-function-return-type': 'off',
            },
        },
        {
            'files': ['*.tsx'],
            'rules': {
                '@typescript-eslint/no-empty-interface': 'off',
                'import/no-internal-modules': 'off',
                'no-console': 'off',
            },
        },
    ],
};
