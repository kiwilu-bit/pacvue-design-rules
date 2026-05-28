/**
 * Design-system-for-AI · fqNkIHbHJDKJ0nHo82lpt4
 * Run via Figma MCP use_figma (resource:figma-use)
 * Creates / updates Input Tokens collection
 */
const FILE_NOTE = 'fqNkIHbHJDKJ0nHo82lpt4';

function hex(r, g, b, a = 1) {
  return { r: r / 255, g: g / 255, b: b / 255, a };
}

async function getOrCreateCollection(name) {
  const all = await figma.variables.getLocalVariableCollectionsAsync();
  let col = all.find((c) => c.name === name);
  if (!col) col = figma.variables.createVariableCollection(name);
  return col;
}

async function getVarByName(name) {
  const all = await figma.variables.getLocalVariablesAsync();
  return all.find((v) => v.name === name) || null;
}

async function upsertColor(collection, name, value, scopes = ['ALL_FILLS', 'STROKE_COLOR']) {
  let v = await getVarByName(name);
  if (!v) {
    v = figma.variables.createVariable(name, collection, 'COLOR');
    v.scopes = scopes;
  }
  const modeId = collection.modes[0].modeId;
  v.setValueForMode(modeId, value);
  return v;
}

async function upsertFloat(collection, name, value, scopes) {
  let v = await getVarByName(name);
  if (!v) {
    v = figma.variables.createVariable(name, collection, 'FLOAT');
    v.scopes = scopes;
  }
  const modeId = collection.modes[0].modeId;
  v.setValueForMode(modeId, value);
  return v;
}

const collection = await getOrCreateCollection('Input Tokens');
if (collection.modes[0].name !== 'Value') {
  collection.renameMode(collection.modes[0].modeId, 'Value');
}

const colors = [
  ['color/input/bg/default', hex(255, 255, 255)],
  ['color/input/bg/disabled', hex(244, 245, 246)],
  ['color/input/bg/readonly', hex(246, 247, 251)],
  ['color/input/border/default', hex(222, 223, 227)],
  ['color/input/border/disabled', hex(222, 223, 227)],
  ['color/input/border/readonly', hex(237, 238, 241)],
  ['color/input/border/success', hex(40, 199, 111)],
  ['color/input/border/warning', hex(255, 159, 67)],
  ['color/input/border/error', hex(234, 84, 85)],
  ['color/input/text/value', hex(102, 102, 108)],
  ['color/input/text/placeholder', hex(178, 178, 184)],
  ['color/input/text/disabled', hex(178, 178, 184)],
  ['color/input/text/readonly', hex(102, 102, 108)],
  ['color/input/hint/success', hex(40, 199, 111)],
  ['color/input/hint/warning', hex(255, 159, 67)],
  ['color/input/hint/error', hex(234, 84, 85)],
  ['color/input/hint/helper', hex(130, 133, 139)],
  ['color/input/icon/leading', hex(102, 102, 108)],
  ['color/input/icon/trailing', hex(178, 178, 184)],
  ['color/input/icon/trailing/disabled', hex(178, 178, 184)],
  ['color/input/search/divider', hex(216, 214, 222)],
];

const floats = [
  ['size/input/height/default', 36, ['HEIGHT']],
  ['size/input/height/subtle', 32, ['HEIGHT']],
  ['size/input/min-width/default', 256, ['WIDTH']],
  ['size/input/min-width/subtle', 160, ['WIDTH']],
  ['spacing/input/padding-x', 12, ['HORIZONTAL_PADDING']],
  ['spacing/input/gap/icon-text', 8, ['GAP']],
  ['spacing/input/gap/label-field', 4, ['GAP']],
  ['spacing/input/gap/field-hint', 4, ['GAP']],
  ['radius/input/default', 4, ['CORNER_RADIUS']],
  ['radius/input/search-alt', 6, ['CORNER_RADIUS']],
  ['font-size/input/value', 14, ['FONT_SIZE']],
  ['font-size/input/hint', 12, ['FONT_SIZE']],
  ['line-height/input/value', 20, ['LINE_HEIGHT']],
  ['line-height/input/hint', 18, ['LINE_HEIGHT']],
  ['border-width/input', 1, ['STROKE_WEIGHT']],
  ['size/input/min-height/textarea', 86, ['MIN_HEIGHT']],
];

const created = [];
for (const [name, val] of colors) {
  await upsertColor(collection, name, val);
  created.push(name);
}
for (const [name, val, scopes] of floats) {
  await upsertFloat(collection, name, val, scopes);
  created.push(name);
}

// Alias border/hover & focus to Brand primary/bg per mode (if Brand exists)
const brandCol = (await figma.variables.getLocalVariableCollectionsAsync()).find(
  (c) => c.name === 'Brand'
);
let aliases = [];
if (brandCol) {
  const brandBlue = await getVarByName('primary/bg');
  if (brandBlue) {
    for (const aliasName of ['color/input/border/hover', 'color/input/border/focus']) {
      const v = await upsertColor(collection, aliasName, { r: 0, g: 0, b: 0 });
      // Note: cross-collection alias set at component bind time; store same blue default
      v.setValueForMode(collection.modes[0].modeId, hex(2, 83, 182));
      aliases.push(aliasName);
    }
  }
}

return {
  file: FILE_NOTE,
  collectionId: collection.id,
  collectionName: collection.name,
  variableCount: created.length + aliases.length,
  created: created.slice(0, 10),
  aliases,
};
