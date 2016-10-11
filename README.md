# build-tsc

[![apm](https://img.shields.io/apm/l/build-tsc.svg?style=flat-square)](https://atom.io/packages/build-tsc)
[![apm](https://img.shields.io/apm/v/build-tsc.svg?style=flat-square)](https://atom.io/packages/build-tsc)
[![apm](https://img.shields.io/apm/dm/build-tsc.svg?style=flat-square)](https://atom.io/packages/build-tsc)
[![Travis](https://img.shields.io/travis/idleberg/atom-build-tsc.svg?style=flat-square)](https://travis-ci.org/idleberg/atom-build-tsc)
[![David](https://img.shields.io/david/idleberg/atom-build-tsc.svg?style=flat-square)](https://david-dm.org/idleberg/atom-build-tsc#info=dependencies)
[![David](https://img.shields.io/david/dev/idleberg/atom-build-tsc.svg?style=flat-square)](https://david-dm.org/idleberg/atom-build-tsc?type=dev)

[Atom Build](https://atombuild.github.io/) provider for `tsc`, compiles TypeScript into JavaScript. Supports the [linter](https://atom.io/packages/linter) package for error highlighting.

## Installation

### apm

Install `build-tsc` from Atom's [Package Manager](http://flight-manual.atom.io/using-atom/sections/atom-packages/) or the command-line equivalent:

`$ apm install build-tsc`

### GitHub

Change to your Atom packages directory:

```bash
# Windows
$ cd %USERPROFILE%\.atom\packages

# Linux & macOS
$ cd ~/.atom/packages/
```

Clone repository as `build-tsc`:

```bash
$ git clone https://github.com/idleberg/atom-build-tsc build-tsc
```

Install Node dependencies:

```bash
$ cd build-tsc
$ yarn || npm install
```

## Usage

### Build

Before you can build, select an active target with your preferred build option.

Available targets:

* `TypeScript` — compile script  to ECMAScript 3 (default)
* `TypeScript (ES5)` — compile script to ECMAScript 5

The name of the output file can be overridden in your `config.cson`, all [standard replacements](https://github.com/noseglid/atom-build#replacements) can be used:

```cson
"build-tsc":
  out
```

### Shortcuts

Here's a reminder of the default shortcuts you can use with this package:

**Select active target**

<kbd>Cmd</kbd>+<kbd>Alt</kbd>+<kbd>T</kbd> or <kbd>F7</kbd>

**Build script**

<kbd>Cmd</kbd>+<kbd>Alt</kbd>+<kbd>B</kbd> or <kbd>F9</kbd>

**Jump to error**

<kbd>Cmd</kbd>+<kbd>Alt</kbd>+<kbd>G</kbd> or <kbd>F4</kbd>

**Toggle build panel**

<kbd>Cmd</kbd>+<kbd>Alt</kbd>+<kbd>V</kbd> or <kbd>F8</kbd>

## License

This work is licensed under the [The MIT License](LICENSE.md).

## Donate

You are welcome support this project using [Flattr](https://flattr.com/submit/auto?user_id=idleberg&url=https://github.com/idleberg/atom-build-tsc) or Bitcoin `17CXJuPsmhuTzFV2k4RKYwpEHVjskJktRd`
