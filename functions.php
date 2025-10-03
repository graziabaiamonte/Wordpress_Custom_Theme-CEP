<?php
/**
 * Cep_2025 functions and definitions
 *
 * @link https://developer.wordpress.org/themes/basics/theme-functions/
 *
 * @package Cep_2025
 */

if ( ! defined( '_S_VERSION' ) ) {
	// Replace the version number of the theme on each release.
	define( '_S_VERSION', '1.0.0' );
}

/**
 * Sets up theme defaults and registers support for various WordPress features.
 *
 * Note that this function is hooked into the after_setup_theme hook, which
 * runs before the init hook. The init hook is too late for some features, such
 * as indicating support for post thumbnails.
 */
function cep_2025_setup() {
	/*
		* Make theme available for translation.
		* Translations can be filed in the /languages/ directory.
		* If you're building a theme based on Cep_2025, use a find and replace
		* to change 'cep_2025' to the name of your theme in all the template files.
		*/
	load_theme_textdomain( 'cep_2025', get_template_directory() . '/languages' );

	// Add default posts and comments RSS feed links to head.
	add_theme_support( 'automatic-feed-links' );

	/*
		* Let WordPress manage the document title.
		* By adding theme support, we declare that this theme does not use a
		* hard-coded <title> tag in the document head, and expect WordPress to
		* provide it for us.
		*/
	add_theme_support( 'title-tag' );

	/*
		* Enable support for Post Thumbnails on posts and pages.
		*
		* @link https://developer.wordpress.org/themes/functionality/featured-images-post-thumbnails/
		*/
	add_theme_support( 'post-thumbnails' );

	// This theme uses wp_nav_menu() in one location.
	register_nav_menus(
		array(
			'menu-1' => esc_html__( 'Primary', 'cep_2025' ),
		)
	);

	/*
		* Switch default core markup for search form, comment form, and comments
		* to output valid HTML5.
		*/
	add_theme_support(
		'html5',
		array(
			'search-form',
			'comment-form',
			'comment-list',
			'gallery',
			'caption',
			'style',
			'script',
		)
	);

	// Set up the WordPress core custom background feature.
	add_theme_support(
		'custom-background',
		apply_filters(
			'cep_2025_custom_background_args',
			array(
				'default-color' => 'ffffff',
				'default-image' => '',
			)
		)
	);

	// Add theme support for selective refresh for widgets.
	add_theme_support( 'customize-selective-refresh-widgets' );

	/**
	 * Add support for core custom logo.
	 *
	 * @link https://codex.wordpress.org/Theme_Logo
	 */
	add_theme_support(
		'custom-logo',
		array(
			'height'      => 250,
			'width'       => 250,
			'flex-width'  => true,
			'flex-height' => true,
		)
	);
}
add_action( 'after_setup_theme', 'cep_2025_setup' );

/**
 * Set the content width in pixels, based on the theme's design and stylesheet.
 *
 * Priority 0 to make it available to lower priority callbacks.
 *
 * @global int $content_width
 */
function cep_2025_content_width() {
	$GLOBALS['content_width'] = apply_filters( 'cep_2025_content_width', 640 );
}
add_action( 'after_setup_theme', 'cep_2025_content_width', 0 );

/**
 * Register widget area.
 *
 * @link https://developer.wordpress.org/themes/functionality/sidebars/#registering-a-sidebar
 */
function cep_2025_widgets_init() {
	register_sidebar(
		array(
			'name'          => esc_html__( 'Sidebar', 'cep_2025' ),
			'id'            => 'sidebar-1',
			'description'   => esc_html__( 'Add widgets here.', 'cep_2025' ),
			'before_widget' => '<section id="%1$s" class="widget %2$s">',
			'after_widget'  => '</section>',
			'before_title'  => '<h2 class="widget-title">',
			'after_title'   => '</h2>',
		)
	);
}
add_action( 'widgets_init', 'cep_2025_widgets_init' );







/**
 * Enqueue scripts and styles.
 */
function cep_2025_scripts() {
	wp_enqueue_style( 'cep_2025-style', get_stylesheet_uri(), array(), _S_VERSION );
	wp_style_add_data( 'cep_2025-style', 'rtl', 'replace' );

	wp_enqueue_script( 'cep_2025-navigation', get_template_directory_uri() . '/js/navigation.js', array(), _S_VERSION, true );

	if ( is_singular() && comments_open() && get_option( 'thread_comments' ) ) {
		wp_enqueue_script( 'comment-reply' );
	}
}
add_action( 'wp_enqueue_scripts', 'cep_2025_scripts' );







function enqueue_home_styles() {
    wp_enqueue_style( 'home-style', get_template_directory_uri() . '/css/style-home.css', array(), null, 'all' );
}
add_action( 'wp_enqueue_scripts', 'enqueue_home_styles' );

function enqueue_prodotto_styles() {
    wp_enqueue_style( 'prodotto-style', get_template_directory_uri() . '/css/style-prodotto.css', array(), null, 'all' );
}
add_action( 'wp_enqueue_scripts', 'enqueue_prodotto_styles' );

function enqueue_about_styles() {
    wp_enqueue_style( 'about-style', get_template_directory_uri() . '/css/style-about.css', array(), null, 'all' );
}
add_action( 'wp_enqueue_scripts', 'enqueue_about_styles' );

function enqueue_eventi_styles() {
    wp_enqueue_style( 'eventi-style', get_template_directory_uri() . '/css/style-categoryEventi.css', array(), null, 'all' );
}
add_action( 'wp_enqueue_scripts', 'enqueue_eventi_styles' );

function enqueue_policy_styles() {
    wp_enqueue_style( 'policy-style', get_template_directory_uri() . '/css/style-policy.css', array(), null, 'all' );
}
add_action( 'wp_enqueue_scripts', 'enqueue_policy_styles' );





/**
 * Implement the Custom Header feature.
 */
require get_template_directory() . '/inc/custom-header.php';

/**
 * Custom template tags for this theme.
 */
require get_template_directory() . '/inc/template-tags.php';

/**
 * Functions which enhance the theme by hooking into WordPress.
 */
require get_template_directory() . '/inc/template-functions.php';

/**
 * Customizer additions.
 */
require get_template_directory() . '/inc/customizer.php';

/**
 * Load Jetpack compatibility file.
 */
if ( defined( 'JETPACK__VERSION' ) ) {
	require get_template_directory() . '/inc/jetpack.php';
}






// abilitare caricamneto svg
function add_file_types_to_uploads($file_types){

    $new_filetypes = array();
    $new_filetypes['svg'] = 'image/svg+xml';
    $file_types = array_merge($file_types, $new_filetypes );
    return $file_types;
    }
    add_filter('upload_mimes', 'add_file_types_to_uploads');




/**
 * per caricamento file font
 */
function mm_fix_checker_wp_upload( $data, $file, $filename, $mimes, $real_mime ) {

	if ( ! empty( $data['ext'] ) && ! empty( $data['type'] ) ) {
		return $data;
	}
	
	// Prendo il tipo di file appena caricato
	$wp_file_type = wp_check_filetype( $filename, $mimes );
	
	// Controlla il tipo di file da abilitare
	if ( 'woff' === $wp_file_type['ext'] ) {
		$data['ext'] = 'woff';
		$data['type'] = 'font/woff';
	}

	if ( 'woff2' === $wp_file_type['ext'] ) {
		$data['ext'] = 'woff2';
		$data['type'] = 'font/woff2';
	}

	if ( 'ttf' === $wp_file_type['ext'] ) {
		$data['ext'] = 'ttf';
		$data['type'] = 'font/ttf';
	}
	
	if ( 'otf' === $wp_file_type['ext'] ) {
		$data['ext'] = 'otf';
		$data['type'] = 'font/otf';
	}
	
	return $data;

}
add_filter( 'wp_check_filetype_and_ext', 'mm_fix_checker_wp_upload', 10, 5 );

/**
 * Abilito il caricamento dei fonts
 */
function mm_abilita_fonts ( $mimes ) {

	$mimes['woff'] = 'font/woff';
    $mimes['woff2'] = 'font/woff2';
    $mimes['ttf'] = 'font/ttf';
    $mimes['otf'] = 'font/otf';
  
    return $mimes;

}
add_filter( 'upload_mimes', 'mm_abilita_fonts' );





