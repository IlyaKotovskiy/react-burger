const fs = require('fs');
const path = require('path');
// const { fileURLToPath } = require('url');

// const __dirname = path.dirname(fileURLToPath(import.meta.url));

const componentPath = process.argv[2];
const componentName = process.argv[3];

if (!componentName || !componentPath) {
	console.error('❌  Specify the component path and the component name!');
	process.exit(1);
}

const componentDir = path.join(
	__dirname,
	'../src/',
	componentPath,
	componentName
);
const componentFile = path.join(componentDir, 'index.tsx');
const stylesFile = path.join(componentDir, `${componentName}.module.css`);
const componentTemplate = `import s from './${componentName}.module.css';

export const ${componentName}: React.FC = (): React.JSX.Element => {
	return <div>${componentName} component</div>;
};
`;

setTimeout(() => {
	if (!fs.existsSync(componentDir)) {
		fs.mkdirSync(componentDir, { recursive: true });
	}

	fs.writeFileSync(componentFile, componentTemplate);
	fs.writeFileSync(stylesFile, '');
	console.log(
		`✅  The "${componentName}" component was created on ${componentDir}`
	);
}, 1000);
