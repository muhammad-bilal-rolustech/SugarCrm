<?php
$clientCache['Prospects']['base']['menu'] = array (
  'header' => 
  array (
    'meta' => 
    array (
      0 => 
      array (
        'route' => '#Prospects/create',
        'label' => 'LNK_NEW_PROSPECT',
        'acl_action' => 'create',
        'acl_module' => 'Prospects',
        'icon' => 'fa-plus',
      ),
      1 => 
      array (
        'route' => '#Prospects/vcard-import',
        'label' => 'LNK_IMPORT_VCARD',
        'acl_action' => 'create',
        'acl_module' => 'Prospects',
        'icon' => 'fa-plus',
      ),
      2 => 
      array (
        'route' => '#Prospects',
        'label' => 'LNK_PROSPECT_LIST',
        'acl_action' => 'list',
        'acl_module' => 'Prospects',
        'icon' => 'fa-bars',
      ),
      3 => 
      array (
        'route' => '#bwc/index.php?module=Import&action=Step1&import_module=Prospects&return_module=Prospects&return_action=index',
        'label' => 'LNK_IMPORT_PROSPECTS',
        'acl_action' => 'import',
        'acl_module' => 'Prospects',
        'icon' => 'fa-arrow-circle-o-up',
      ),
      4 => 
      array (
        'type' => 'dnb-bal-import-menu-label',
        'default_value' => 'LBL_BAL',
        'icon' => 'fa-arrow-circle-o-up',
        'route' => '#Prospects/layout/dnb-bal',
      ),
    ),
  ),
  'quickcreate' => 
  array (
    'meta' => 
    array (
      'layout' => 'create',
      'label' => 'LNK_NEW_PROSPECT',
      'visible' => false,
      'icon' => 'fa-plus',
    ),
  ),
  '_hash' => '47d6019887d8f59994d63b60fdffd503',
);

