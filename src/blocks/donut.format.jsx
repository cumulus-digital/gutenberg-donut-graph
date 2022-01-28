import metadata from './block.json';
import { setDonutProps, svgBlob } from './common.js';

import {
	formatBold,
	formatItalic,
	keyboardReturn
} from '@wordpress/icons';

const { useState } = wp.element;
const {
	Path,
	SVG,
	TextControl,
	Popover,
	Button
} = wp.components;
const { RichTextToolbarButton } = wp.blockEditor;
const {
	insertObject,
	useAnchorRef
} = wp.richText;

const name = metadata.name;
const title = metadata.title;

export const donutFormat = {
	name,
	title,
	keywords: metadata.keywords,
	object: true,
	tagName: 'div',
	className: null,
	attributes: {
		style: 'style',
		'data-width': 'width',
		'data-percent': 'percent',
		'data-stroke-width': 'strokeWidth',
		'data-color-inactive': 'colorInactive',
		'data-color-active': 'colorActive',
		'data-rotation': 'rotation'
	},
	edit: Edit,
}

function InlineUI({ value, onChange, activeObjectAttributes, contentRef }) {
	const { style } = activeObjectAttributes;
	const [width, setWidth] = useState(style?.replace(/\D/g, ''));
	const anchorRef = useAnchorRef({
		ref: contentRef,
		value,
		settings: image,
	});

}

function Edit({
	value,
	onChange,
	onFocus,
	isObjectActive,
	activeObjectAttributes,
	contentRef,
}) {
	const [isModalOpen, setIsModalOpen] = useState(false);

	function openModal() {
		setIsModalOpen(true);
	}

	function closeModal() {
		setIsModalOpen(false);
	}

	console.log('value', value);

	return (
		<>
			<RichTextToolbarButton
				icon='marker'
				title={metadata.title}
				onClick={openModal}
				isActive={isObjectActive}
			/>
			{ isModalOpen && (

				[insertObject(value, {
					type: metadata.name,
					attributes: {
						className: `wp-image-${id}`,
						style: 'style',
						'data-width': 'width',
						'data-percent': 'percent',
						'data-stroke-width': 'strokeWidth',
						'data-color-inactive': 'colorInactive',
						'data-color-active': 'colorActive',
						'data-rotation': 'rotation'
					},
				})]

			)}
			{ isObjectActive && (

				<InlineUI
					value={value}
					onChange={onChange}
					activeObjectAttributes={activeObjectAttributes}
					contentRef={contentRef}
				/>

			)}
		</>
	);

}
