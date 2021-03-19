# build-tsc

[![apm](https://img.shields.io/apm/l/build-tsc.svg?style=flat-square)](https://atom.io/packages/build-tsc)
[![apm](https://img.shields.io/apm/v/build-tsc.svg?style=flat-square)](https://atom.io/packages/build-tsc)
[![apm](https://img.shields.io/apm/dm/build-tsc.svg?style=flat-square)](https://atom.io/packages/build-tsc)
[![CircleCI](https://flat.badgen.net/circleci/github/idleberg/atom-build-tsc)](https://circleci.com/gh/idleberg/atom-build-tsc)
[![David](https://img.shields.io/david/idleberg/atom-build-tsc.svg?style=flat-square)](https://david-dm.org/idleberg/atom-build-tsc)

[Atom Build](https://atombuild.github.io/) provider for `tsc`, compiles TypeScript into JavaScript. Supports the [linter](https://atom.io/packages/linter) package for error highlighting.

## Installation

### apm

Install `build-tsc` from Atom's [Package Manager](http://flight-manual.atom.io/using-atom/sections/atom-packages/) or the command-line equivalent:

`$ apm install build-tsc`

### Using Git

Change to your Atom packages directory:

**Windows**

```powershell
# Powershell
$ cd $Env:USERPROFILE\.atom\packages
```

```cmd
:: Command Prompt
$ cd %USERPROFILE%\.atom\packages
```

**Linux & macOS**

```bash
$ cd ~/.atom/packages/
```

Clone repository as `build-tsc`:

```bash
$ git clone https://github.com/idleberg/atom-build-tsc build-tsc
```

Inside the cloned directory, install Node dependencies:

```bash
$ yarn || npm install
```

## Usage

### Build

Before you can build, select an active target with your preferred build option.

Available targets:

* `TypeScript` — compile script  to ECMAScript 3 (default)
* `TypeScript (ES5)` — compile script to ECMAScript 5
* `TypeScript (user)` — compile script with arguments specified in the package settings

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

This work is licensed under the [The MIT License](LICENSE).
