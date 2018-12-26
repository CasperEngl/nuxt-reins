<?php

require_once('vendor/autoload.php');

use Automattic\WooCommerce\Client;

class Reins {
    protected $CONSUMER_KEY = 'ck_99a69c326e8fa00aef5f365c5741fc7f0aeece25';
    protected $CONSUMER_SECRET = 'cs_2c089cdbd427de563661f69f7d9ed22bb83c957c';

    function __construct() {
        // Add REST route with reins Options at /wp-json/reins/api
        add_action('rest_api_init', function () {
            register_rest_route(
                'reins',
                '/products',
                array(
                    'methods' => WP_REST_Server::READABLE,
                    'callback' => [$this, 'view_products'],
                )
            );
            register_rest_route(
                'reins',
                '/product/(?P<id>\d+)',
                array(
                    'methods' => WP_REST_Server::READABLE,
                    'callback' => [$this, 'view_product'],
                    'args' => [
                        'id'
                    ],
                )
            );
            register_rest_route(
                'reins',
                '/categories',
                array(
                    'methods' => 'GET',
                    'callback' => [$this, 'view_categories'],
                )
            );
        });
    }

    function get_client() {
        return new Client(
            get_site_url(),
            $this->CONSUMER_KEY,
            $this->CONSUMER_SECRET,
            [
                'wp_api' => true,
                'version' => 'wc/v3',
            ]
        );
    }

    function view_products() {
        $woocommerce = $this->get_client();
    
        return $woocommerce->get('products');
    }

    function view_product($data) {
        $params = $data->get_params();
        $woocommerce = $this->get_client();
    
        return $woocommerce->get('products/' . $params['id']);
    }

    function view_categories() {
        $woocommerce = $this->get_client();
    
        return $woocommerce->get('categories');
    }
}

new Reins();

function prepare_product_images($response, $post, $request) {
  global $_wp_additional_image_sizes;

  if (empty($response->data)) {
      return $response;
  }

  foreach ($response->data['images'] as $key => $image) {
      $image_urls = [];
      foreach ($_wp_additional_image_sizes as $size => $value) {
          $image_info = wp_get_attachment_image_src($image['id'], $size);
          $response->data['images'][$key][$size] = $image_info[0];
      }
  }
  return $response;

}
add_filter('woocommerce_rest_prepare_product_object', 'prepare_product_images', 10, 3);

// Hook.
add_action( 'rest_api_init', 'wp_rest_allow_all_cors', 15 );
/**
 * Allow all CORS.
 *
 * @since 1.0.0
 */
function wp_rest_allow_all_cors() {
    // Remove the default filter.
    remove_filter( 'rest_pre_serve_request', 'rest_send_cors_headers' );
    // Add a Custom filter.
    add_filter( 'rest_pre_serve_request', function( $value ) {
        header( 'Access-Control-Allow-Origin: *' );
        header( 'Access-Control-Allow-Methods: GET, OPTIONS' );
        header( 'Access-Control-Allow-Credentials: true' );
        return $value;
    });
} // End fucntion wp_rest_allow_all_cors().