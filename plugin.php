<?php

namespace CUMULUS\Gutenberg\DonutGraph;

/*
 * Plugin Name: Gutenberg Donut Graph
 * Plugin URI: https://github.com/cumulus-digital/gutenberg-donut-graph
 * GitHub Plugin URI: https://github.com/cumulus-digital/gutenberg-donut-graph
 * Primary Branch: main
 * Description: A simple donut graph block
 * Version: 0.0.4
 * Author: vena
 * License: UNLICENSED
 */

\defined( 'ABSPATH' ) || exit( 'No direct access allowed.' );

function GUID() {
	if ( \function_exists( 'com_create_guid' ) === true ) {
		return \trim( com_create_guid(), '{}' );
	}

	return \sprintf( '%04X%04X-%04X-%04X-%04X-%04X%04X%04X', \mt_rand( 0, 65535 ), \mt_rand( 0, 65535 ), \mt_rand( 0, 65535 ), \mt_rand( 16384, 20479 ), \mt_rand( 32768, 49151 ), \mt_rand( 0, 65535 ), \mt_rand( 0, 65535 ), \mt_rand( 0, 65535 ) );
}

// Custom Block Category
\add_filter( 'block_categories_all', function ( $categories ) {
	if ( ! \array_search( 'cmls', \array_column( $categories, 'slug' ) ) ) {
		$categories = \array_merge(
			$categories,
			[
				[
					'slug'  => 'cmls',
					'title' => 'Cumulus',
					'icon'  => null,
				],
			]
		);
	}

	return $categories;
}, 10, 1 );

// Editor Assets
function editor_assets() {
	\wp_enqueue_style(
		'gutenberg_donut_graph-css',
		\plugins_url( 'build/global.css', __FILE__ )
	);

	$assets = include \plugin_dir_path( __FILE__ ) . 'build/global.asset.php';
	\wp_enqueue_script(
		'gutenberg_donut_graph-backend-js', // Handle.
		\plugins_url( 'build/global.js', __FILE__ ),
		$assets['dependencies'],
		$assets['version'],
		true
	);
}
\add_action( 'enqueue_block_editor_assets', __NAMESPACE__ . '\\editor_assets' );

// Frontend Assets
function frontend_block_assets() {
	if ( \has_block( 'cumulus-gutenberg/donut-graph' ) && ! \is_admin() ) {

		// Block assets
		\wp_enqueue_style(
			'gutenberg_donut_graph-css',
			\plugins_url( 'build/global.css', __FILE__ )
		);
	}
}
\add_action( 'enqueue_block_assets', __NAMESPACE__ . '\\frontend_block_assets' );

// Server-side renderer
\add_action( 'init', function () {
	if ( ! \function_exists( 'register_block_type_from_metadata' ) ) {
		return;
	}

	\register_block_type_from_metadata(
		__DIR__ . '/build/blocks/block.json'
	);
} );

function attr( $attr, $key, $default = null ) {
	if ( isset( $attr[$key] ) ) {
		return $attr[$key];
	}

	return $default;
}
