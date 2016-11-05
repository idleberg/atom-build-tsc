'use babel';

import { EventEmitter } from 'events';
import { install } from 'atom-package-deps';
import { spawnSync } from 'child_process';

// Package settings
import meta from '../package.json';

this.config = {
  customArguments: {
    title: "Custom Arguments",
    description: "Specify your preferred arguments for `tsc`",
    type: "string",
    "default": "--out",
    order: 0
  },
  targetFile: {
    title: "Target File",
    description: "Specify the name of the target file, supports [replacement](https://github.com/noseglid/atom-build#replacement) placeholders",
    type: "string",
    "default": "{FILE_ACTIVE_NAME_BASE}.js",
    order: 1
  }
};

// This package depends on build, make sure it's installed
export function activate() {
  if (!atom.inSpecMode()) {
    install(meta.name);
  }
}

export function provideBuilder() {
  return class TscProvider extends EventEmitter {
    constructor(cwd) {
      super();
      this.cwd = cwd;
      atom.config.observe('build-tsc.customArguments', () => this.emit('refresh'));
      atom.config.observe('build-tsc.targetFile', () => this.emit('refresh'));
    }

    getNiceName() {
      return 'TypeScript';
    }

    isEligible() {
      try {
        spawnSync('tsc --version');
      } catch (error) {
        if (atom.inDevMode()) atom.notifications.addError(meta.name, { detail: error, dismissable: true });
        return false;
      }

      return true;
    }

    settings() {
      const errorMatch = [
        '(?<file>.+)\\((?<line>\\d+),(?<col>\\d+)\\): error (?<message>.+)'
      ];

      const warningMatch = [
        '(?<file>.+)\\((?<line>\\d+),(?<col>\\d+)\\): warn (?<message>.+)'
      ];

      // User settings
      let customArguments = atom.config.get('build-tsc.customArguments').trim().split(" ");
      let targetFile = atom.config.get('build-tsc.targetFile').trim();
      customArguments.push(targetFile);
      customArguments.push('{FILE_ACTIVE}');

      return [
        {
          name: 'TypeScript',
          exec: 'tsc',
          args: [ '--out', targetFile, '{FILE_ACTIVE}'],
          cwd: '{FILE_ACTIVE_PATH}',
          sh: false,
          keymap: 'cmd-alt-b',
          atomCommandName: 'TypeScript:compile',
          errorMatch: errorMatch,
          warningMatch: warningMatch
        },
        {
          name: 'TypeScript (ES5)',
          exec: 'tsc',
          args: [ '--target', 'ES5', '--out', targetFile, '{FILE_ACTIVE}'],
          cwd: '{FILE_ACTIVE_PATH}',
          sh: false,
          keymap: 'cmd-alt-b',
          atomCommandName: 'TypeScript:compile-es5',
          errorMatch: errorMatch,
          warningMatch: warningMatch
        },
        {
          name: 'TypeScript (user)',
          exec: 'tsc',
          args: customArguments,
          cwd: '{FILE_ACTIVE_PATH}',
          sh: false,
          keymap: 'cmd-alt-b',
          atomCommandName: 'TypeScript:compile-with-user-settings',
          errorMatch: errorMatch,
          warningMatch: warningMatch
        }
      ];
    }
  };
}
