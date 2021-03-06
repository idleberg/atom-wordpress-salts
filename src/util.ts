const getLongestString = (input: any) => {
  const map = input.map( (x: string) => x.length);
  const max = map.indexOf(Math.max(...map));

  return input[max];
};

const dotEnvOut = (salts: any) => {
  const output: Array<string> = [];

  Object.keys(salts).forEach(key => {
    output.push(`${key}='${salts[key]}'`);
  });

  return output.join('\n');
};

const phpOutput = (salts: any) => {
  const maxLength = getLongestString(Object.keys(salts)).length;
  const output: Array<string> = [];

  Object.keys(salts).forEach(key => {
    const whitespace = (getConfig('alignPHP')) ? ' '.repeat(maxLength - key.length) : '';

    output.push(`define('${key}', ${whitespace}'${salts[key]}');`);
  });

  return output.join('\n');
};

const yamlOutput = (salts: any) => {
  const output: Array<string> = [];

  Object.keys(salts).forEach(key => {
    output.push(`${key.toLowerCase()}: "${salts[key]}"`);
  });

  return output.join('\n');
};

const getConfig = (key: string|undefined) => {
  if (key && key.length) {
    return atom.config.get(`wordpress-salts.${key}`);
  }

  return atom.config.get(`wordpress-salts`);
};

export {
  dotEnvOut,
  phpOutput,
  yamlOutput,
  getConfig
};
