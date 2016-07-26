'use babel';

import {exec} from 'child_process';

// Package settings
import meta from '../package.json';
const debug = atom.config.get(`${meta.name}.debug`);
const notEligible = `**${meta.name}**: \`tsc\` is not in your PATH`;
const targetFile = atom.config.get('build-tsc.targetFile') || '{FILE_ACTIVE_NAME_BASE}.js';

// This package depends on build, make sure it's installed
module.exports = {
  activate() {
    require('atom-package-deps').install(meta.name);
  }
};

export function provideBuilder() {
  return class TscProvider {
    constructor(cwd) {
      this.cwd = cwd;
    }

    getNiceName() {
      return 'TypeScript';
    }

    isEligible() {
      exec('tsc --version', function (error, stdout, stderr) {
        if (error !== null) {
          // No TypeScript installed
          if (debug === true) atom.notifications.addError(notEligible, { detail: error, dismissable: true });
          return false;
        }
        if (debug === true) atom.notifications.addInfo(`**${meta.name}**`, { detail: stdout, dismissable: false });
      });

      return true;
    }

    settings() {
      const errorMatch = [
        '(?<file>.+)\\((?<line>\\d+),(?<col>\\d+)\\): error (?<message>.+)'
      ];

      const warningMatch = [
        '(?<file>.+)\\((?<line>\\d+),(?<col>\\d+)\\): warn (?<message>.+)'
      ];

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
        }
      ];
    }
  };
}
