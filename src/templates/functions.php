<?php
add_action( 'after_setup_theme', 'theme_setup' );
function theme_setup() {
  load_theme_textdomain( 'theme', get_template_directory() . '/languages' );
  add_theme_support( 'title-tag' );
  add_theme_support( 'automatic-feed-links' );
  add_theme_support( 'post-thumbnails' );
  add_theme_support( 'html5', array( 'search-form' ) );
  global $content_width;
  if ( ! isset( $content_width ) ) { $content_width = 1920; }
  register_nav_menus( array( 'main-menu' => esc_html__( 'Main Menu', 'theme' ) ) );
}
add_action( 'wp_enqueue_scripts', 'theme_load_scripts' );
function theme_load_scripts() {
  wp_enqueue_style( 'theme-style', get_stylesheet_uri() );
  // wp_enqueue_script( 'jquery' );
}
add_action( 'wp_footer', 'theme_footer_scripts' );
function theme_footer_scripts() {
  ?>
  <script>
    document.addEventListener('DOMContentLoaded', function() {
      var deviceAgent = navigator.userAgent.toLowerCase();
      if (deviceAgent.match(/(iphone|ipod|ipad)/)) {
        document.documentElement.classList.add("ios");
        document.documentElement.classList.add("mobile");
      }
      if (navigator.userAgent.search("MSIE") >= 0) {
        document.documentElement.classList.add("ie");
      }
      else if (navigator.userAgent.search("Chrome") >= 0) {
        document.documentElement.classList.add("chrome");
      }
      else if (navigator.userAgent.search("Firefox") >= 0) {
        document.documentElement.classList.add("firefox");
      }
      else if (navigator.userAgent.search("Safari") >= 0 && navigator.userAgent.search("Chrome") < 0) {
        document.documentElement.classList.add("safari");
      }
      else if (navigator.userAgent.search("Opera") >= 0) {
        document.documentElement.classList.add("opera");
      }
    });
  </script>
  <?php
}
add_filter( 'document_title_separator', 'theme_document_title_separator' );
function theme_document_title_separator( $sep ) {
  $sep = '|';
  return $sep;
}
add_filter( 'the_title', 'theme_title' );
function theme_title( $title ) {
  if ( $title == '' ) {
    return '...';
  } else {
    return $title;
  }
}
add_filter( 'the_content_more_link', 'theme_read_more_link' );
function theme_read_more_link() {
  if ( ! is_admin() ) {
    return ' <a href="' . esc_url( get_permalink() ) . '" class="more-link">...</a>';
  }
}
add_filter( 'excerpt_more', 'theme_excerpt_read_more_link' );
function theme_excerpt_read_more_link( $more ) {
  if ( ! is_admin() ) {
    global $post;
    return ' <a href="' . esc_url( get_permalink( $post->ID ) ) . '" class="more-link">...</a>';
  }
}
add_filter( 'intermediate_image_sizes_advanced', 'theme_image_insert_override' );
function theme_image_insert_override( $sizes ) {
  unset( $sizes['medium_large'] );
  return $sizes;
}
add_action( 'widgets_init', 'theme_widgets_init' );
function theme_widgets_init() {
  register_sidebar( array(
    'name' => esc_html__( 'Sidebar Widget Area', 'theme' ),
    'id' => 'primary-widget-area',
    'before_widget' => '<li id="%1$s" class="widget-container %2$s">',
    'after_widget' => '</li>',
    'before_title' => '<h3 class="widget-title">',
    'after_title' => '</h3>',
  ) );
}
add_action( 'wp_head', 'theme_pingback_header' );
function theme_pingback_header() {
  if ( is_singular() && pings_open() ) {
    printf( '<link rel="pingback" href="%s" />' . "\n", esc_url( get_bloginfo( 'pingback_url' ) ) );
  }
}
add_action( 'comment_form_before', 'theme_enqueue_comment_reply_script' );
function theme_enqueue_comment_reply_script() {
  if ( get_option( 'thread_comments' ) ) {
    wp_enqueue_script( 'comment-reply' );
  }
}
function theme_custom_pings( $comment ) {
  ?>
  <li <?php comment_class(); ?> id="li-comment-<?php comment_ID(); ?>"><?php echo comment_author_link(); ?></li>
  <?php
}
add_filter( 'get_comments_number', 'theme_comment_count', 0 );
function theme_comment_count( $count ) {
  if ( ! is_admin() ) {
    global $id;
    $get_comments = get_comments( 'status=approve&post_id=' . $id );
    $comments_by_type = separate_comments( $get_comments );
    return count( $comments_by_type['comment'] );
  } else {
    return $count;
  }
}

/**
 * Register API Endpoints
 * @param namespace { String } - endpoint vendor/version
 * @param path { String } - endpoint name
 * @param method { String } - endpoint request type
 * @param post_type { String } - custom post type slug
 * @param per_page { Int } - pagination limit
 * @param num { Int } - maximum item count (-1 for all)
 */

function register_custom_post_type_endpoint( $namespace, $path, $method, $post_type, $per_page, $num ) {

  add_action( 'rest_api_init', function () use ( $namespace, $path, $method, $post_type, $per_page, $num ) {

    register_rest_route( $namespace, $path, array(
      'methods' => $method,
      'callback' => function ( $request_data ) use ($namespace, $path, $method, $post_type, $per_page, $num ) {
        $args = array(
          'post_type' => $post_type,
          'posts_per_page'=> $per_page, 
          'numberposts'=> $num
        );

        if ($request_data['id']) {
          $args['p'] = $request_data['id'];
        }

        if ($request_data['slug']) {
          $args['name'] = $request_data['slug'];
        }

        $posts = get_posts($args);
        foreach ($posts as $key => $post) {
          $custom_fields = get_fields($post->ID);
          foreach ($custom_fields as $field => $value) {
            $posts[$key]->$field = $value;
          }
        }
        return  $posts;
      }
    ));

  });
};

/**
 * Enpoints - GET
 * /<post-type-path>/       - get a list of <post_types>
 * /<post-type-path>/:id    - get single <post_type> with matching id
 * /<post-type-path>/:slug  - get single <post_type> with matching slug
 */

$custom_post_types_arr = [
  'tracks' => 'track',
  'albums' => 'album',
  'music-videos' => 'music_video'
];

foreach ($custom_post_types_arr as $path => $post_type) {
  register_custom_post_type_endpoint('api/v1', $path, 'GET', $post_type, -1, -1 );
  register_custom_post_type_endpoint('api/v1', $path.'/(?P<id>\d+)', 'GET', $post_type, 1, 1 );
  register_custom_post_type_endpoint('api/v1', $path.'/(?P<slug>\S+)', 'GET', $post_type, 1, 1 );
}

add_action('rest_api_init', 'register_theme_mods_endpoint');
function register_theme_mods_endpoint () {
  register_rest_route( 'api/v1', 'theme-mods', array(
    'methods' => 'GET',
    'callback' => 'get_theme_mods'
  ));
}

add_action('customize_register','register_customizer');
function register_customizer( $wp_customize ) {
  // $wp_customize->add_panel();
  // $wp_customize->get_panel();
  // $wp_customize->remove_panel();
 
  $wp_customize->add_section( 'social_media', array(
    'title' => __( 'Social Media' ),
    'description' => __( 'Add external social media links here' ),
    'panel' => '',
    'theme_supports' => '',
  ));
  // $wp_customize->get_section();
  // $wp_customize->remove_section();
 
  $wp_customize->add_setting( 'facebook_url' );
  $wp_customize->add_setting( 'instagram_url' );
  $wp_customize->add_setting( 'soundcloud_url' );
  $wp_customize->add_setting( 'twitter_url' );
  $wp_customize->add_setting( 'youtube_url' );
  // $wp_customize->get_setting();
  // $wp_customize->remove_setting();
 
  $wp_customize->add_control( 'facebook_url', array(
    'type' => 'url',
    'priority' => 10,
    'section' => 'social_media',
    'label' => __( 'Facebook URL' ),
  ));

  $wp_customize->add_control( 'instagram_url', array(
    'type' => 'url',
    'priority' => 20,
    'section' => 'social_media',
    'label' => __( 'Instagram URL' ),
  ));

  $wp_customize->add_control( 'soundcloud_url', array(
    'type' => 'url',
    'priority' => 30,
    'section' => 'social_media',
    'label' => __( 'Soundcloud URL' ),
  ));

  $wp_customize->add_control( 'twitter_url', array(
    'type' => 'url',
    'priority' => 40,
    'section' => 'social_media',
    'label' => __( 'Twitter URL' ),
  ));

  $wp_customize->add_control( 'youtube_url', array(
    'type' => 'url',
    'priority' => 50,
    'section' => 'social_media',
    'label' => __( 'Youtube URL' ),
  ));
  // $wp_customize->get_control();
  // $wp_customize->remove_control();
}
