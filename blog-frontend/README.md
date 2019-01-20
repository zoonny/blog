# install

## create-react-app

create-react-app blog-frontend;
cd blog-frontend/src;
rm App.css App.js App.test.js index.css logo.svg;

## yarn eject

cd ..;
git init;
git add .;
git commit -m "save untrack";

yarn eject;

## error : Cannot find module '@babel/plugin-transform-react-jsx'

rm -rf yarn.lock
rm -rf node_modules
yarn

## install library

yarn add node-sass sass-loader classnames;
yarn add react-router-dom redux redux-actions react-redux redux-pender immutable;
yarn add open-color include-media;
yarn add codemirror marked prismjs;
yarn add axios;
yarn add query-string@5;
yarn add remove-markdown;

npm install node-sass sass-loader classnames;
npm install react-router-dom redux redux-actions react-redux redux-pender immutable;
npm install open-color include-media;
npm install codemirror marked prismjs;
npm install axios;
npm install query-string@5;
npm install remove-markdown;

## copy source

cp ../blog-frontend-run/README.md .
cp -R ../blog-frontend-run/public .
cp -R ../blog-frontend-run/src .

## make .env

echo "NODE_PATH=src" > .env

## add globalStyles in config/paths

globalStyles: resolveApp('src/styles')

## modify sass config

vi config/webpack.config.js

find sassRegex and replace below:

            {
              test: sassRegex,
              exclude: sassModuleRegex,
              use: getStyleLoaders({
                importLoaders: 2,
                sourceMap: isEnvProduction && shouldUseSourceMap
              }).concat({
                loader: require.resolve('sass-loader'),
                options: {
                  includePaths: [paths.appSrc + '/styles'],
                  sourceMap: isEnvProduction && shouldUseSourceMap
                }
              }),
              // Don't consider CSS imports dead code even if the
              // containing package claims to have no side effects.
              // Remove this when webpack adds a warning or an error for this.
              // See https://github.com/webpack/webpack/issues/6571
              sideEffects: true
            },

## chrome CORS (Cross-Origin Resource Sharing)

open -a Google\ Chrome --args --disable-web-security

install cors on koa server
yarn add koa-cors

const cors as require('koa-cors');
app.use(cors());

## bug report

- 헤더에 Last-Page가 있으나, 읽어오질 못함 > action.payload.headers['Last-Page']
