# FeedHenry WFM template build [![Build Status](https://travis-ci.org/feedhenry-raincatcher/raincatcher-template-build.png)](https://travis-ci.org/feedhenry-raincatcher/raincatcher-template-build)

A tool for building FeedHenry WFM angular directive's templates.

## Usage

Inside a WFM Module, in the `package.json` add  :

```
"scripts": {
  "build": "wfm-template-build -m 'wfm.<module-name>.directives'",
  "watch": "wfm-template-build -w -m 'wfm.<module-name>.directives'"
}

```
and add the dev dependency :

```
"devDependencies": {
    "fh-wfm-template-build": "0.0.7",
  }
```

Inside your module you can now watch for template changes :

```
npm run watch  

```
