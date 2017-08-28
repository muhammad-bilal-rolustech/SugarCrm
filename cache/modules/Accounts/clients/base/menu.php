<?php
$clientCache['Accounts']['base']['menu'] = array (
  'header' => 
  array (
    'meta' => 
    array (
      0 => 
      array (
        'label' => 'LNK_NEW_ACCOUNT',
        'acl_action' => 'create',
        'acl_module' => 'Accounts',
        'icon' => 'fa-plus',
        'route' => '#Accounts/create',
      ),
      1 => 
      array (
        'route' => '#Accounts',
        'label' => 'LNK_ACCOUNT_LIST',
        'acl_action' => 'list',
        'acl_module' => 'Accounts',
        'icon' => 'fa-bars',
      ),
      2 => 
      array (
        'route' => '#bwc/index.php?module=Reports&action=index&view=Accounts&query=true&report_module=Accounts',
        'label' => 'LNK_ACCOUNT_REPORTS',
        'acl_action' => 'list',
        'acl_module' => 'Accounts',
        'icon' => 'fa-bar-chart-o',
      ),
      3 => 
      array (
        'route' => '#bwc/index.php?module=Import&action=Step1&import_module=Accounts',
        'label' => 'LNK_IMPORT_ACCOUNTS',
        'acl_action' => 'import',
        'acl_module' => 'Accounts',
        'icon' => 'fa-arrow-circle-o-up',
      ),
      4 => 
      array (
        'type' => 'dnb-bal-import-menu-label',
        'default_value' => 'LBL_BAL',
        'icon' => 'fa-arrow-circle-o-up',
        'route' => '#Accounts/layout/dnb-bal',
      ),
    ),
  ),
  'quickcreate' => 
  array (
    'meta' => 
    array (
      'layout' => 'create',
      'label' => 'LNK_NEW_ACCOUNT',
      'visible' => true,
      'order' => 0,
      'icon' => 'fa-plus',
    ),
  ),
  '_hash' => '900d6fe292a21b6e93ff3dd67dfbdca2',
);

