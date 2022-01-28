import metadata from './block.json';
import { setDonutProps, svgBlob } from './common.js';

import {
	formatBold,
	formatItalic,
} from '@wordpress/icons';
const {
	Panel,
	PanelBody,
	ToggleControl,
	RangeControl,
	__experimentalUnitControl: UnitControl,
	AnglePickerControl,
	ToolbarGroup,
	ToolbarButton,
} = wp.components;
const {
	useBlockProps,
	BlockControls,
	ColorPaletteControl,
	InspectorControls,
} = wp.blockEditor;

export const donutBlock = {
	edit: (props) => {
		const { attributes, setAttributes, clientId } = props;
		if (!attributes.blockId) {
			setAttributes({ blockId: clientId });
		}
		const defaults = metadata.attributes;
		const blockProps = useBlockProps(setDonutProps(attributes));

		const updateTypography = (key, val) => {
			let newTypo = {};
			newTypo[key] = val;
			let newAttr = {
				...attributes,
				style: {
					...attributes.style,
					typography: {
						...attributes.style?.typography,
						...newTypo
					}
				}
			};
			if (!val) {
				delete newAttr.style.typography[key];
			}
			console.log(newAttr);
			setAttributes(newAttr);
		}

		return (
			<div {...blockProps}>
				<InspectorControls>
					<Panel>
						<PanelBody title="Graph Attributes">
							<ToggleControl
								label="Show Label"
								checked={attributes.showPercentLabel}
								onChange={(val) => setAttributes({ showPercentLabel: val })}
							/>

							<div>
								<UnitControl
									label="Graph Size"
									labelPosition="side"
									isUnitSelectTabbable
									value={attributes.width}
									units={[
										{ value: 'px', label: 'px', default: 100 },
										{ value: '%', label: '%', default: 100 },
										{ value: 'em', label: 'em', default: 100 },
										{ value: 'rem', label: 'rem', default: 100 },
									]}
									onChange={(val) => setAttributes({ width: val })}
								/>
							</div>

							<RangeControl
								label="Stroke Width"
								help="Percentage of the graph size."
								withInputField={true}
								value={attributes.strokeWidth}
								resetFallbackValue={defaults.strokeWidth?.default}
								min={1}
								max={50}
								onChange={(val) => setAttributes({ strokeWidth: val })}
							/>

							<div>
								<AnglePickerControl
									label="Initial Position"
									value={attributes.rotation}
									onChange={(val) => setAttributes({ rotation: val })}
								/>
							</div>

							<RangeControl
								label="Percent Active"
								value={attributes.percent}
								withInputField={true}
								resetFallbackValue={defaults.percent.default}
								min={1}
								max={100}
								onChange={(val) => setAttributes({ percent: val })}
							/>

							<ColorPaletteControl
								label="Circle Base Color"
								value={attributes.colorInactive}
								onChange={(val) => setAttributes({ colorInactive: val })}
							/>

							<ColorPaletteControl
								label="Circle Active Color"
								value={attributes.colorActive}
								onChange={(val) => setAttributes({ colorActive: val })}
							/>

						</PanelBody>
					</Panel>
				</InspectorControls>

				<BlockControls>
					<ToolbarGroup>
						<ToolbarButton
							icon={formatBold}
							label="Bold"
							isPressed={
								attributes.style?.typography?.fontWeight
								&& attributes.style?.typography?.fontWeight === 700
							}
							onClick={() => updateTypography(
								'fontWeight',
								attributes.style?.typography?.fontWeight === 700 ? null : 700
							)}
						/>
						<ToolbarButton
							icon={formatItalic}
							label="Italic"
							isPressed={
								attributes.style?.typography?.fontStyle
								&& attributes.style?.typography?.fontStyle !== 'normal'
							}
							onClick={() => updateTypography(
								'fontStyle',
								attributes.style?.typography?.fontStyle === 'italic' ? null : 'italic'
							)}
						/>
					</ToolbarGroup>
				</BlockControls>

				{svgBlob(props.attributes)}

			</div>
		);
	},

	save: (props) => {
		const { attributes } = props;
		const blockProps = useBlockProps.save(setDonutProps(attributes));
		return (
			<div {...blockProps}>
				{svgBlob(attributes)}
			</div>
		);
	}
};