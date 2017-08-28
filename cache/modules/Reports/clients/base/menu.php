<?php
$clientCache['Reports']['base']['menu'] = array (
  'header' => 
  array (
    'meta' => 
    array (
      0 => 
      array (
        'route' => '#bwc/index.php?module=Reports&report_module=&action=index&page=report&Create+Custom+Report=Create+Custom+Report',
        'label' => 'LBL_CREATE_REPORT',
        'acl_action' => 'create',
        'acl_module' => 'Reports',
        'icon' => 'fa-plus',
      ),
      1 => 
      array (
        'route' => '#bwc/index.php?module=Reports&favorite=1&action=index',
        'label' => 'LBL_FAVORITE_REPORTS',
        'acl_action' => 'list',
        'acl_module' => 'Reports',
        'icon' => 'fa-favorite',
      ),
      2 => 
      array (
        'route' => '#bwc/index.php?module=Reports&action=index',
        'label' => 'LBL_ALL_REPORTS',
        'acl_action' => 'list',
        'acl_module' => 'Reports',
        'icon' => 'fa-bars',
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
  '_hash' => '964bb09c98d1decc7fbb9be9308db571',
);

