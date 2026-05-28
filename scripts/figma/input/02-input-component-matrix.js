/**
 * Design-system-for-AI · Input atom + variant matrix draft
 * Axes: Brand × Type × Status × States × Size (+ BOOLEAN: leading/trailing icon, filled)
 * Draft matrix: Text type full core grid + 1 sample per other Type
 */
const BRANDS = ['Blue', 'Orange'];
const TYPES = ['Text', 'Password', 'Search', 'Affix', 'Combo', 'Textarea'];
const STATUSES = ['Default', 'Success', 'Warning', 'Error'];
const STATE_VALUES = ['default', 'disabled'];
const SIZES = ['default', 'subtle'];

async function loadFonts() {
  await figma.loadFontAsync({ family: 'Inter', style: 'Regular' });
  await figma.loadFontAsync({ family: 'Inter', style: 'Semi Bold' });
}

function parseVariant(name) {
  const o = {};
  name.split(', ').forEach((part) => {
    const i = part.indexOf('=');
    if (i > -1) o[part.slice(0, i)] = part.slice(i + 1);
  });
  return o;
}

function variantName(props) {
  return Object.entries(props)
    .map(([k, v]) => `${k}=${v}`)
    .join(', ');
}

async function getVarMap() {
  const map = {};
  for (const c of await figma.variables.getLocalVariableCollectionsAsync()) {
    for (const id of c.variableIds) {
      const v = await figma.variables.getVariableByIdAsync(id);
      map[v.name] = v;
    }
  }
  return map;
}

function bindSolid(node, field, variable) {
  if (!variable) return;
  let paint = { type: 'SOLID', color: { r: 1, g: 1, b: 1 } };
  paint = figma.variables.setBoundVariableForPaint(paint, 'color', variable);
  node[field] = [paint];
}

function bindStroke(node, variable) {
  if (!variable) return;
  let paint = { type: 'SOLID', color: { r: 0.87, g: 0.87, b: 0.89 } };
  paint = figma.variables.setBoundVariableForPaint(paint, 'color', variable);
  node.strokes = [paint];
  node.strokeWeight = 1;
}

function statusBorderVar(vars, status) {
  const map = {
    Default: vars['color/input/border/default'],
    Success: vars['color/input/border/success'],
    Warning: vars['color/input/border/warning'],
    Error: vars['color/input/border/error'],
  };
  return map[status];
}

function applyInputStyles(root, vars, props) {
  const container =
    root.findOne((n) => n.name === 'Container') ||
    root.children.find((c) => c.type === 'FRAME');
  if (!container) return;

  const disabled = props.States === 'disabled';
  const isTextarea = props.Type === 'Textarea';
  const isSearch = props.Type === 'Search';

  bindSolid(
    container,
    'fills',
    disabled ? vars['color/input/bg/disabled'] : vars['color/input/bg/default']
  );
  bindStroke(container, statusBorderVar(vars, props.Status));

  const hVar =
    props.Size === 'subtle'
      ? vars['size/input/height/subtle']
      : vars['size/input/height/default'];
  if (hVar && !isTextarea) {
    container.setBoundVariable('height', hVar);
    container.layoutSizingVertical = 'FIXED';
  }
  if (isTextarea && vars['size/input/min-height/textarea']) {
    container.minHeight = 86;
    container.layoutSizingVertical = 'HUG';
  }

  const radiusVar = isSearch
    ? vars['radius/input/search-alt']
    : vars['radius/input/default'];
  if (radiusVar) container.setBoundVariable('topLeftRadius', radiusVar);

  const text = container.findOne((n) => n.type === 'TEXT' && n.name === 'Value');
  if (text) {
    const tVar = disabled
      ? vars['color/input/text/disabled']
      : props.Filled === 'true'
        ? vars['color/input/text/value']
        : vars['color/input/text/placeholder'];
    if (tVar) {
      const fills = figma.variables.setBoundVariableForPaint(
        { type: 'SOLID', color: { r: 0.7, g: 0.7, b: 0.72 } },
        'color',
        tVar
      );
      text.fills = [fills];
    }
    text.characters =
      props.Filled === 'true' ? 'Sample value' : 'Placeholder text';
  }
}

async function buildInputFrame(vars, props) {
  const root = figma.createComponent();
  root.name = variantName(props);
  root.layoutMode = 'HORIZONTAL';
  root.primaryAxisAlignItems = 'CENTER';
  root.counterAxisAlignItems = 'CENTER';
  root.itemSpacing = 0;
  root.fills = [];
  root.layoutSizingHorizontal = 'HUG';
  root.layoutSizingVertical = 'HUG';

  const container = figma.createFrame();
  container.name = 'Container';
  container.layoutMode = 'HORIZONTAL';
  container.layoutAlign = 'STRETCH';
  container.primaryAxisAlignItems = 'CENTER';
  container.counterAxisAlignItems = 'CENTER';
  container.paddingLeft = 12;
  container.paddingRight = 12;
  container.itemSpacing = 8;
  container.minWidth = props.Size === 'subtle' ? 160 : 256;
  container.resize(256, props.Type === 'Textarea' ? 86 : 36);

  const leading = figma.createFrame();
  leading.name = 'Leading';
  leading.resize(20, 20);
  leading.fills = [{ type: 'SOLID', color: { r: 0.7, g: 0.7, b: 0.72 } }];
  leading.cornerRadius = 2;
  leading.visible = props.Type === 'Search' || props.Type === 'Affix';

  const value = figma.createText();
  value.name = 'Value';
  value.fontName = { family: 'Inter', style: 'Regular' };
  value.fontSize = 14;
  value.characters = 'Placeholder text';
  value.layoutGrow = 1;

  const trailing = figma.createFrame();
  trailing.name = 'Trailing';
  trailing.resize(20, 20);
  trailing.fills = [{ type: 'SOLID', color: { r: 0.85, g: 0.85, b: 0.88 } }];
  trailing.cornerRadius = 10;
  trailing.visible =
    props.Type === 'Password' || (props.Filled === 'true' && props.Type === 'Text');

  if (props.Type === 'Combo' || props.Type === 'Affix') {
    const affix = figma.createText();
    affix.fontName = { family: 'Inter', style: 'Regular' };
    affix.fontSize = 14;
    affix.characters = props.Type === 'Combo' ? 'USD' : 'http://';
    affix.name = 'Affix';
    container.appendChild(affix);
  }

  container.appendChild(leading);
  container.appendChild(value);
  container.appendChild(trailing);
  root.appendChild(container);

  applyInputStyles(root, vars, props);
  return root;
}

// Page setup
let page = figma.root.children.find((p) => p.name === '- Input');
if (!page) {
  page = figma.createPage();
  page.name = '- Input';
}
await figma.setCurrentPageAsync(page);

// Remove prior draft sets on this page
for (const child of [...page.children]) {
  if (child.name === 'Input' || child.name === 'Variant Matrix · Draft') {
    child.remove();
  }
}

const vars = await getVarMap();
await loadFonts();

const components = [];

// Core matrix: Text only — Brand × Status × States × Size (Filled=false)
for (const Brand of BRANDS) {
  for (const Status of STATUSES) {
    for (const States of STATE_VALUES) {
      for (const Size of SIZES) {
        components.push(
          await buildInputFrame(vars, {
            Brand,
            Type: 'Text',
            Status,
            States,
            Size,
            Filled: 'false',
          })
        );
      }
    }
  }
}

// One sample per non-Text type (Blue, Default, default, default)
for (const Type of TYPES.filter((t) => t !== 'Text')) {
  components.push(
    await buildInputFrame(vars, {
      Brand: 'Blue',
      Type,
      Status: 'Default',
      States: 'default',
      Size: 'default',
      Filled: Type === 'Password' ? 'false' : 'false',
    })
  );
}

const parent = figma.createFrame();
parent.name = 'Variant Matrix · Draft';
parent.layoutMode = 'VERTICAL';
parent.itemSpacing = 32;
parent.paddingTop = 24;
parent.paddingLeft = 24;
parent.fills = [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 } }];

const spec = figma.createText();
spec.name = 'Spec';
spec.fontName = { family: 'Inter', style: 'Semi Bold' };
spec.fontSize = 14;
spec.characters =
  'Input · Draft matrix\n' +
  'VARIANT: Brand(Blue|Orange) × Type(Text|Password|Search|Affix|Combo|Textarea) × Status(Default|Success|Warning|Error) × States(default|disabled) × Size(default|subtle)\n' +
  'BOOLEAN: has leading icon · has trailing icon · filled\n' +
  'This page: Text core grid (32) + 5 type samples. Full cartesian TBD.';
parent.appendChild(spec);

const set = figma.combineAsVariants(components, parent);
set.name = 'Input';
set.x = 24;
set.y = 120;
set.layoutMode = 'NONE';

// Grid layout — Text block then type row
const textComps = set.children.filter((c) => parseVariant(c.name).Type === 'Text');
const otherComps = set.children.filter((c) => parseVariant(c.name).Type !== 'Text');

const COL_W = 280;
const ROW_H = 48;
let y = 80;
for (let i = 0; i < textComps.length; i++) {
  const col = i % 8;
  const row = Math.floor(i / 8);
  textComps[i].x = col * COL_W;
  textComps[i].y = y + row * ROW_H;
}
y += Math.ceil(textComps.length / 8) * ROW_H + 40;
otherComps.forEach((c, i) => {
  c.x = i * COL_W;
  c.y = y;
});

set.resizeWithoutConstraints(
  Math.max(8 * COL_W, otherComps.length * COL_W) + 48,
  y + ROW_H + 48
);

parent.appendChild(set);
page.appendChild(parent);

return {
  page: page.name,
  componentSetId: set.id,
  variantCount: set.children.length,
  textVariants: textComps.length,
  typeSamples: otherComps.length,
};
