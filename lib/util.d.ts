declare const dotEnvOut: (salts: any) => string;
declare const phpOutput: (salts: any) => string;
declare const yamlOutput: (salts: any) => string;
declare const getConfig: (key: string | undefined) => any;
export { dotEnvOut, phpOutput, yamlOutput, getConfig };
