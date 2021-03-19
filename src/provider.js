import { configSchema, getConfig } from './config';
import { EventEmitter } from 'events';
import { satisfyDependencies } from 'atom-satisfy-dependencies';
import { spawnSync } from 'child_process';
import { which } from './util';

export { configSchema as config };

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
      if (getConfig('alwaysEligible') === true) {
        return true;
      }

      const cmd = spawnSync(which(), ['tsc']);
      if (!cmd.stdout.toString()) {
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
      const customArguments = getConfig('customArguments').trim().split(' ');
      const targetFile = getConfig('targetFile').trim();
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

// This package depends on build, make sure it's installed
export function activate() {
  if (getConfig('manageDependencies') === true) {
    satisfyDependencies('build-tsc');
  }
}
