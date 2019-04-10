import { CompositeDisposable } from 'atom';
import { wpSalts } from 'wp-salts';

import {
  dotEnvOut,
  phpOutput,
  yamlOutput
} from './util';

module.exports = {
  config: {},
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
    const salts = wpSalts();
    let output = '';

    switch (scope) {
      case 'source.dotenv':
        output = dotEnvOut(salts);
        break;

      case 'source.json':
        output = JSON.stringify(salts, null, 2);
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

    textEditor.setText(output);
  }
};
