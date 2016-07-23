'use babel';

const self = '[build-tsc]';
const debug = atom.config.get('build-tsc.debug');

import {exec} from 'child_process';

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
          if (debug === true) console.log(self, error);
          // No TypeScript installed
          return false;
        }
        if (debug === true) console.log(self, stdout);
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
          args: [ '--out', '{FILE_ACTIVE_NAME_BASE}.js', '{FILE_ACTIVE}'],
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
          args: [ '--target', 'ES5', '--out', '{FILE_ACTIVE_NAME_BASE}.js', '{FILE_ACTIVE}'],
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
