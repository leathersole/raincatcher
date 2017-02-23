# FeedHenry RainCatcher template build [![Build Status](https://travis-ci.org/feedhenry-raincatcher/raincatcher-template-build.png)](https://travis-ci.org/feedhenry-raincatcher/raincatcher-template-build)

A tool for building FeedHenry RainCatcher angular directive's templates.

## Instalation

    npm install -g fh-wfm-template-build

## Usage NPM

Inside a RainCatcher Module, in the `package.json` add  :

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

## Usage Grunt
Add the dependency to your project using npm:

    npm install --save-dev fh-wfm-template-build

Load the plugin by adding it to your Gruntfile.js:

    grunt.loadNpmTasks('fh-wfm-template-build');

Add a configuration to your Gruntfile.js :

    grunt.initConfig({
      wfmTemplate: {
        module: "wfm.<module-name>.directives",
        templateDir: "lib/angular/template',
        outputDir: "dist"
      }
    })

There two target available to be run `build` and `watch`:

    $ grunt wfmTemplate:build

    $ grunt wfmTemplate:watch

The module configuration `module` is an option you can also specify it on the command line like:

    $ $ grunt wfm_watch --module=<module name>

This will override any option specified in Gruntfile.js
