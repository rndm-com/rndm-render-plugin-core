const generate = (library, key) => Object.keys(library)
  .filter(item => typeof library[item] === 'function')
  .map(type => ({ type: [key, type].filter(Boolean).join('.'), value: library[type] }));

export default generate;
