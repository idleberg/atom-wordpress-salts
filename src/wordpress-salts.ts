import { CompositeDisposable } from 'atom';
import { wpSalts } from 'wp-salts';

import {
  dotEnvOut,
  phpOutput,
  yamlOutput,
  getConfig
} from './util';

module.exports = {
  config: {
    saltLength: {
      title: 'Salt Length',
      description: 'Default length of salts, between 64 and 4096 characters',
      type: 'number',
      default: 64,
      minimum: 64,
      maximum: 4096,
      order: 1
    },
    jsonIndentation: {
      title: 'JSON Indentation',
      description: 'Default indentation of JSON strings',
      type: 'number',
      default: 2,
      minimum: 0,
      order: 2
    },
    alignPHP: {
      title: 'Align PHP',
      description: 'Align definitions for better visual grepping',
      type: 'boolean',
      default: true
    }
  },
  subscriptions: null,

  activate(): void {
    this.subscriptions = new CompositeDisposable;

    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'WordPress-Salts:Insert': () => this.insertSalt()
    }));
  },

  deactivate(): void {
    this.subscriptions.dispose();
  },

  insertSalt(): void {
    const textEditor = atom.workspace.getActiveTextEditor();

    if (!textEditor) {
      return atom.beep();
    }

    const scope = textEditor.getGrammar().scopeName;
    const salts = wpSalts('', getConfig('saltLength'));
    let output = '';

    switch (scope) {
      case 'source.dotenv':
        output = dotEnvOut(salts);
        break;

      case 'source.json':
        output = JSON.stringify(salts, null, getConfig('jsonIndentation'));
        break;

      case 'source.php':
      case 'text.html.php':
        output = phpOutput(salts);
        break;

      case 'source.yaml':
        output = yamlOutput(salts);
        break;

      default:
        atom.beep();
        break;
    }

    textEditor.insertText(output);
  }
};
