import { name } from '../package.json';

export const configSchema = {
  customArguments: {
    title: 'Custom Arguments',
    description: 'Specify your preferred arguments for `tsc`',
    type: 'string',
    'default': '--out',
    order: 0
  },
  targetFile: {
    title: 'Target File',
    description: 'Specify the name of the target file, supports [replacement](https://github.com/noseglid/atom-build#replacement) placeholders',
    type: 'string',
    'default': '{FILE_ACTIVE_NAME_BASE}.js',
    order: 1
  },
  manageDependencies: {
    title: 'Manage Dependencies',
    description: 'When enabled, third-party dependencies will be installed automatically',
    type: 'boolean',
    default: true,
    order: 2
  },
  alwaysEligible: {
    title: 'Always Eligible',
    description: 'The build provider will be available in your project, even when not eligible',
    type: 'boolean',
    default: false,
    order: 3
  }
};

export function getConfig(key) {
  return atom.config.get(`${name}.${key}`);
}
