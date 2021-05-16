# 第二章笔记

## 配置 jest

可以使用以下命令初始化 jest 配置

```sh
npx jest --init
```

输入命令后控制台会出现以下选项供选择

```sh
# 选择用于测试的测试环境 node 还是浏览器
Choose the test environment that will be used for testing » node/jsdom (browser-like)

# 您希望Jest添加覆盖率报告吗?
Do you want Jest to add coverage reports? ... yes/no

# 自动清除每个测试之间的模拟调用和实例?
Automatically clear mock calls and instances between every test? ... yes/no
```

选择好后会在项目的根目录创建 `jest.config.js` 的文件，文件内会有以上选项的配置。当然还有更多，未配置的选项都被打上注释，如需要配置则解除注释即可

```js
// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html

module.exports = {
  // All imported modules in your tests should be mocked automatically
  // automock: false,

  // Stop running tests after `n` failures
  // bail: 0,

  // Respect "browser" field in package.json when resolving modules
  // browser: false,

  // The directory where Jest should store its cached dependency information
  // cacheDirectory: "D:\\Users\\maniu\\AppData\\Local\\Temp\\jest",

  // Automatically clear mock calls and instances between every test
  clearMocks: true,

  // Indicates whether the coverage information should be collected while executing the test
  // collectCoverage: false,

  // An array of glob patterns indicating a set of files for which coverage information should be collected
  // collectCoverageFrom: null,

  // The directory where Jest should output its coverage files
  coverageDirectory: "coverage",

  // An array of regexp pattern strings used to skip coverage collection
  // coveragePathIgnorePatterns: [
  //   "\\\\node_modules\\\\"
  // ],

  // A list of reporter names that Jest uses when writing coverage reports
  // coverageReporters: [
  //   "json",
  //   "text",
  //   "lcov",
  //   "clover"
  // ],

  // An object that configures minimum threshold enforcement for coverage results
  // coverageThreshold: null,

  // A path to a custom dependency extractor
  // dependencyExtractor: null,

  // Make calling deprecated APIs throw helpful error messages
  // errorOnDeprecated: false,

  // Force coverage collection from ignored files using an array of glob patterns
  // forceCoverageMatch: [],

  // A path to a module which exports an async function that is triggered once before all test suites
  // globalSetup: null,

  // A path to a module which exports an async function that is triggered once after all test suites
  // globalTeardown: null,

  // A set of global variables that need to be available in all test environments
  // globals: {},

  // The maximum amount of workers used to run your tests. Can be specified as % or a number. E.g. maxWorkers: 10% will use 10% of your CPU amount + 1 as the maximum worker number. maxWorkers: 2 will use a maximum of 2 workers.
  // maxWorkers: "50%",

  // An array of directory names to be searched recursively up from the requiring module's location
  // moduleDirectories: [
  //   "node_modules"
  // ],

  // An array of file extensions your modules use
  // moduleFileExtensions: [
  //   "js",
  //   "json",
  //   "jsx",
  //   "ts",
  //   "tsx",
  //   "node"
  // ],

  // A map from regular expressions to module names that allow to stub out resources with a single module
  // moduleNameMapper: {},

  // An array of regexp pattern strings, matched against all module paths before considered 'visible' to the module loader
  // modulePathIgnorePatterns: [],

  // Activates notifications for test results
  // notify: false,

  // An enum that specifies notification mode. Requires { notify: true }
  // notifyMode: "failure-change",

  // A preset that is used as a base for Jest's configuration
  // preset: null,

  // Run tests from one or more projects
  // projects: null,

  // Use this configuration option to add custom reporters to Jest
  // reporters: undefined,

  // Automatically reset mock state between every test
  // resetMocks: false,

  // Reset the module registry before running each individual test
  // resetModules: false,

  // A path to a custom resolver
  // resolver: null,

  // Automatically restore mock state between every test
  // restoreMocks: false,

  // The root directory that Jest should scan for tests and modules within
  // rootDir: null,

  // A list of paths to directories that Jest should use to search for files in
  // roots: [
  //   "<rootDir>"
  // ],

  // Allows you to use a custom runner instead of Jest's default test runner
  // runner: "jest-runner",

  // The paths to modules that run some code to configure or set up the testing environment before each test
  // setupFiles: [],

  // A list of paths to modules that run some code to configure or set up the testing framework before each test
  // setupFilesAfterEnv: [],

  // A list of paths to snapshot serializer modules Jest should use for snapshot testing
  // snapshotSerializers: [],

  // The test environment that will be used for testing
  // testEnvironment: "jest-environment-jsdom",

  // Options that will be passed to the testEnvironment
  // testEnvironmentOptions: {},

  // Adds a location field to test results
  // testLocationInResults: false,

  // The glob patterns Jest uses to detect test files
  // testMatch: [
  //   "**/__tests__/**/*.[jt]s?(x)",
  //   "**/?(*.)+(spec|test).[tj]s?(x)"
  // ],

  // An array of regexp pattern strings that are matched against all test paths, matched tests are skipped
  // testPathIgnorePatterns: [
  //   "\\\\node_modules\\\\"
  // ],

  // The regexp pattern or array of patterns that Jest uses to detect test files
  // testRegex: [],

  // This option allows the use of a custom results processor
  // testResultsProcessor: null,

  // This option allows use of a custom test runner
  // testRunner: "jasmine2",

  // This option sets the URL for the jsdom environment. It is reflected in properties such as location.href
  // testURL: "http://localhost",

  // Setting this value to "fake" allows the use of fake timers for functions such as "setTimeout"
  // timers: "real",

  // A map from regular expressions to paths to transformers
  // transform: null,

  // An array of regexp pattern strings that are matched against all source file paths, matched files will skip transformation
  // transformIgnorePatterns: [
  //   "\\\\node_modules\\\\"
  // ],

  // An array of regexp pattern strings that are matched against all modules before the module loader will automatically return a mock for them
  // unmockedModulePathPatterns: undefined,

  // Indicates whether each individual test should be reported during the run
  // verbose: null,

  // An array of regexp patterns that are matched against all source file paths before re-running tests in watch mode
  // watchPathIgnorePatterns: [],

  // Whether to use watchman for file crawling
  // watchman: true,
};
```

## 测试覆盖率报告

使用 `npx jest --coverage` 命令可以在测试结束是产生此次测试的文件代码覆盖率报告。如果在配置文件中设置了 `coverageDirectory`，则还会将完整的 `HTML` 报告生成在跟目录的相应文件夹中（默认：coverage）。

### 当前目录配置命令

在 `package.json` 文件中的 `scripts` 添加如下配置

```json
"scripts": {
    // ...
    "jest": "jest --coverage"
    // ...
  },
```

即可在控制台输入 `yarn jest` 或 `npm run jest` 启动

## 使用 esModule

如果要使用 esModule 的导入方式在 node 环境使用 jest 自动化测试，需要安装 babel，使用 babel 在运行之前将 esModel 语法转成 commonJs 语法。否则 `node` 环境中的 `jest` 不认识 esModule 语句，从而报错。

### 安装 babel

通过以下命令安装 babel 核心库以及预设 preset 插件到测试环境中

```sh
yarn add -D @babel/core@7.4.5 @babel/preset-env@7.4.5
```

### 配置 babel

安装好之后在根目录创建 `babel.config.js` 的配置文件，并在文件中配置 `@babel/preset-env`

```js
module.exports = {
  presets: [
    ['@babel/preset-env', {
      targets: {
        node: 'current'
      }
    }]
  ]
}
```

`preset` 配置的数组第一位为插件名，第二位为该插件的配置信息。上面代码表示按照当前 node 版本的需要，进行 babel 转义。

配置后的运行步骤：

- 运行命令 `yarn jest`
- jest 内置的 `babel-jest` 检测当前环境否安装 babel
- 如果有则会取 `babel.config.js` 文件中的配置（若没有配置，则会取默认配置）
- 在运行测试之前，通过 babel 把代码进行一次转换
- 最后运行转换后的测试用例代码
