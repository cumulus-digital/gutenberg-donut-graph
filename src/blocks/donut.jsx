import metadata from './block.json';
import { donutBlock } from './donut.block.jsx';
import { donutFormat } from './donut.format.jsx';

const { registerBlockType } = wp.blocks;
const { registerFormatType } = wp.richText;

registerBlockType(metadata.name, {
	...metadata,
	...donutBlock
});
/*
registerFormatType(
	donutFormat.name,
	donutFormat
);
*/