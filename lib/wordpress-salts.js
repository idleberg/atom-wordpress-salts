"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const atom_1 = require("atom");
const wp_salts_1 = require("wp-salts");
const util_1 = require("./util");
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
            title: 'Align PHP Definitions',
            description: 'Align definitions for better visual grepping',
            type: 'boolean',
            default: true
        }
    },
    subscriptions: null,
    activate() {
        this.subscriptions = new atom_1.CompositeDisposable;
        this.subscriptions.add(atom.commands.add('atom-workspace', {
            'WordPress-Salts:Insert': () => this.insertSalt()
        }));
    },
    deactivate() {
        this.subscriptions.dispose();
    },
    insertSalt() {
        const textEditor = atom.workspace.getActiveTextEditor();
        if (!textEditor) {
            return atom.beep();
        }
        const scope = textEditor.getGrammar().scopeName;
        const salts = wp_salts_1.wpSalts('', util_1.getConfig('saltLength'));
        let output = '';
        switch (scope) {
            case 'source.dotenv':
                output = util_1.dotEnvOut(salts);
                break;
            case 'source.json':
                output = JSON.stringify(salts, null, util_1.getConfig('jsonIndentation'));
                break;
            case 'source.php':
            case 'text.html.php':
                output = util_1.phpOutput(salts);
                break;
            case 'source.yaml':
                output = util_1.yamlOutput(salts);
                break;
            default:
                atom.beep();
                break;
        }
        textEditor.insertText(output);
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid29yZHByZXNzLXNhbHRzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL3dvcmRwcmVzcy1zYWx0cy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLCtCQUEyQztBQUMzQyx1Q0FBbUM7QUFFbkMsaUNBS2dCO0FBRWhCLE1BQU0sQ0FBQyxPQUFPLEdBQUc7SUFDZixNQUFNLEVBQUU7UUFDTixVQUFVLEVBQUU7WUFDVixLQUFLLEVBQUUsYUFBYTtZQUNwQixXQUFXLEVBQUUseURBQXlEO1lBQ3RFLElBQUksRUFBRSxRQUFRO1lBQ2QsT0FBTyxFQUFFLEVBQUU7WUFDWCxPQUFPLEVBQUUsRUFBRTtZQUNYLE9BQU8sRUFBRSxJQUFJO1lBQ2IsS0FBSyxFQUFFLENBQUM7U0FDVDtRQUNELGVBQWUsRUFBRTtZQUNmLEtBQUssRUFBRSxrQkFBa0I7WUFDekIsV0FBVyxFQUFFLHFDQUFxQztZQUNsRCxJQUFJLEVBQUUsUUFBUTtZQUNkLE9BQU8sRUFBRSxDQUFDO1lBQ1YsT0FBTyxFQUFFLENBQUM7WUFDVixLQUFLLEVBQUUsQ0FBQztTQUNUO1FBQ0QsUUFBUSxFQUFFO1lBQ1IsS0FBSyxFQUFFLHVCQUF1QjtZQUM5QixXQUFXLEVBQUUsOENBQThDO1lBQzNELElBQUksRUFBRSxTQUFTO1lBQ2YsT0FBTyxFQUFFLElBQUk7U0FDZDtLQUNGO0lBQ0QsYUFBYSxFQUFFLElBQUk7SUFFbkIsUUFBUTtRQUNOLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSwwQkFBbUIsQ0FBQztRQUU3QyxJQUFJLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsRUFBRTtZQUN6RCx3QkFBd0IsRUFBRSxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFO1NBQ2xELENBQUMsQ0FBQyxDQUFDO0lBQ04sQ0FBQztJQUVELFVBQVU7UUFDUixJQUFJLENBQUMsYUFBYSxDQUFDLE9BQU8sRUFBRSxDQUFDO0lBQy9CLENBQUM7SUFFRCxVQUFVO1FBQ1IsTUFBTSxVQUFVLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO1FBRXhELElBQUksQ0FBQyxVQUFVLEVBQUU7WUFDZixPQUFPLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztTQUNwQjtRQUVELE1BQU0sS0FBSyxHQUFHLFVBQVUsQ0FBQyxVQUFVLEVBQUUsQ0FBQyxTQUFTLENBQUM7UUFDaEQsTUFBTSxLQUFLLEdBQUcsa0JBQU8sQ0FBQyxFQUFFLEVBQUUsZ0JBQVMsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDO1FBQ25ELElBQUksTUFBTSxHQUFHLEVBQUUsQ0FBQztRQUVoQixRQUFRLEtBQUssRUFBRTtZQUNiLEtBQUssZUFBZTtnQkFDbEIsTUFBTSxHQUFHLGdCQUFTLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQzFCLE1BQU07WUFFUixLQUFLLGFBQWE7Z0JBQ2hCLE1BQU0sR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssRUFBRSxJQUFJLEVBQUUsZ0JBQVMsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLENBQUM7Z0JBQ25FLE1BQU07WUFFUixLQUFLLFlBQVksQ0FBQztZQUNsQixLQUFLLGVBQWU7Z0JBQ2xCLE1BQU0sR0FBRyxnQkFBUyxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUMxQixNQUFNO1lBRVIsS0FBSyxhQUFhO2dCQUNoQixNQUFNLEdBQUcsaUJBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDM0IsTUFBTTtZQUVSO2dCQUNFLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztnQkFDWixNQUFNO1NBQ1Q7UUFFRCxVQUFVLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ2hDLENBQUM7Q0FDRixDQUFDIn0=