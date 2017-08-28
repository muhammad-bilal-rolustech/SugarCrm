<?php
$clientCache['Products']['base']['menu'] = array (
  'header' => 
  array (
    'meta' => 
    array (
      0 => 
      array (
        'route' => '#Products/create',
        'label' => 'LNK_NEW_PRODUCT',
        'acl_action' => 'create',
        'acl_module' => 'Products',
        'icon' => 'fa-plus',
      ),
      1 => 
      array (
        'route' => '#Products',
        'label' => 'LNK_PRODUCT_LIST',
        'acl_action' => 'list',
        'acl_module' => 'Products',
        'icon' => 'fa-bars',
      ),
      2 => 
      array (
        'route' => '#bwc/index.php?module=Import&action=Step1&import_module=Products&return_module=Products&return_action=index',
        'label' => 'LNK_IMPORT_PRODUCTS',
        'acl_action' => 'import',
        'acl_module' => 'Products',
        'icon' => 'fa-arrow-circle-o-up',
      ),
    ),
  ),
  'quickcreate' => 
  array (
    'meta' => 
    array (
      'layout' => 'create',
      'label' => 'LNK_NEW_RECORD',
      'visible' => false,
      'icon' => 'fa-plus',
      'order' => 1,
    ),
  ),
  '_hash' => '93583ee85f9165087b72cc95d2cebbf3',
);

