/**
 * Input Field = Label + Input instance + Hint
 * VARIANT: Brand × Status × States × Label mode × Hint type
 * Draft: 8 representative combinations
 */
async function loadFonts() {
  await figma.loadFontAsync({ family: 'Inter', style: 'Regular' });
  await figma.loadFontAsync({ family: 'Inter', style: 'Semi Bold' });
}

function variantName(props) {
  return Object.entries(props)
    .map(([k, v]) => `${k}=${v}`)
    .join(', ');
}

const page = figma.root.children.find((p) => p.name === '- Input');
if (!page) throw new Error('Run 02-input-component-matrix.js first');
await figma.setCurrentPageAsync(page);

const inputSet = page.findOne((n) => n.type === 'COMPONENT_SET' && n.name === 'Input');
if (!inputSet) throw new Error('Input component set not found');

const baseComponent = inputSet.children.find(
  (c) =>
    c.type === 'COMPONENT' &&
    c.name.includes('Type=Text') &&
    c.name.includes('Status=Default') &&
    c.name.includes('States=default')
);
if (!baseComponent) throw new Error('Base Text input variant not found');

const combos = [
  { Brand: 'Blue', Status: 'Default', States: 'default', 'Label mode': 'default', 'Hint type': 'none' },
  { Brand: 'Blue', Status: 'Default', States: 'default', 'Label mode': 'required', 'Hint type': 'helper' },
  { Brand: 'Blue', Status: 'Error', States: 'default', 'Label mode': 'default', 'Hint type': 'error' },
  { Brand: 'Blue', Status: 'Success', States: 'default', 'Label mode': 'optional', 'Hint type': 'success' },
  { Brand: 'Orange', Status: 'Warning', States: 'default', 'Label mode': 'default', 'Hint type': 'warning' },
  { Brand: 'Blue', Status: 'Default', States: 'disabled', 'Label mode': 'default', 'Hint type': 'helper' },
  { Brand: 'Orange', Status: 'Default', States: 'default', 'Label mode': 'required', 'Hint type': 'none' },
  { Brand: 'Orange', Status: 'Error', States: 'disabled', 'Label mode': 'default', 'Hint type': 'error' },
];

await loadFonts();
const fieldComponents = [];

for (const props of combos) {
  const root = figma.createComponent();
  root.name = variantName(props);
  root.layoutMode = 'VERTICAL';
  root.itemSpacing = 4;
  root.fills = [];
  root.layoutSizingHorizontal = 'HUG';
  root.layoutSizingVertical = 'HUG';
  root.minWidth = 256;

  const labelRow = figma.createFrame();
  labelRow.name = 'Label row';
  labelRow.layoutMode = 'HORIZONTAL';
  labelRow.itemSpacing = 4;
  labelRow.fills = [];
  labelRow.visible = props['Label mode'] !== 'none';

  const label = figma.createText();
  label.fontName = { family: 'Inter', style: 'Semi Bold' };
  label.fontSize = 14;
  label.characters = 'Field label';
  label.fills = [{ type: 'SOLID', color: { r: 0.2, g: 0.2, b: 0.22 } }];

  const badge = figma.createText();
  badge.fontName = { family: 'Inter', style: 'Regular' };
  badge.fontSize = 12;
  badge.visible = props['Label mode'] === 'required' || props['Label mode'] === 'optional';
  badge.characters = props['Label mode'] === 'required' ? '*' : '(optional)';
  badge.fills = [
    {
      type: 'SOLID',
      color: props['Label mode'] === 'required' ? { r: 0.92, g: 0.33, b: 0.33 } : { r: 0.51, g: 0.52, b: 0.55 },
    },
  ];

  labelRow.appendChild(label);
  labelRow.appendChild(badge);
  root.appendChild(labelRow);

  const inputInstance = baseComponent.createInstance();
  inputInstance.name = 'Input';
  root.appendChild(inputInstance);

  const hint = figma.createText();
  hint.name = 'Hint';
  hint.fontName = { family: 'Inter', style: 'Regular' };
  hint.fontSize = 12;
  hint.visible = props['Hint type'] !== 'none';
  const hintCopy = {
    helper: 'Helper text for this field',
    success: 'Looks good',
    warning: 'Please double-check',
    error: 'This field is required',
  };
  hint.characters = hintCopy[props['Hint type']] || '';
  const hintColors = {
    helper: { r: 0.51, g: 0.52, b: 0.55 },
    success: { r: 0.16, g: 0.78, b: 0.44 },
    warning: { r: 1, g: 0.62, b: 0.26 },
    error: { r: 0.92, g: 0.33, b: 0.33 },
  };
  hint.fills = [{ type: 'SOLID', color: hintColors[props['Hint type']] || hintColors.helper }];
  hint.paddingLeft = 12;
  root.appendChild(hint);

  fieldComponents.push(root);
}

// Remove old Input Field set
const oldField = page.findOne((n) => n.type === 'COMPONENT_SET' && n.name === 'Input Field');
if (oldField) oldField.remove();

const fieldParent = figma.createFrame();
fieldParent.name = 'Input Field · Draft';
fieldParent.fills = [];
fieldParent.layoutMode = 'NONE';

const fieldSet = figma.combineAsVariants(fieldComponents, fieldParent);
fieldSet.name = 'Input Field';
fieldSet.x = 900;
fieldSet.y = 120;

fieldSet.children.forEach((c, i) => {
  c.x = (i % 4) * 300;
  c.y = Math.floor(i / 4) * 100;
});
fieldSet.resizeWithoutConstraints(4 * 300, 2 * 100 + 40);

page.appendChild(fieldParent);

return {
  componentSetId: fieldSet.id,
  variantCount: fieldSet.children.length,
  combos: combos.length,
};
