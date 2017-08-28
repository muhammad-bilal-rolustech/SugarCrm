<?php
$clientCache['Bugs']['base']['menu'] = array (
  'header' => 
  array (
    'meta' => 
    array (
      0 => 
      array (
        'route' => '#Bugs/create',
        'label' => 'LNK_NEW_BUG',
        'acl_action' => 'create',
        'acl_module' => 'Bugs',
        'icon' => 'fa-plus',
      ),
      1 => 
      array (
        'route' => '#Bugs',
        'label' => 'LNK_BUG_LIST',
        'acl_action' => 'list',
        'acl_module' => 'Bugs',
        'icon' => 'fa-bars',
      ),
      2 => 
      array (
        'route' => '#bwc/index.php?module=Reports&action=index&view=bugs&query=true&report_module=Bugs',
        'label' => 'LNK_BUG_REPORTS',
        'acl_action' => 'list',
        'acl_module' => 'Bugs',
        'icon' => 'fa-bars',
      ),
      3 => 
      array (
        'route' => '#bwc/index.php?module=Import&action=Step1&import_module=Bugs&return_module=Bugs&return_action=index',
        'label' => 'LNK_IMPORT_BUGS',
        'acl_action' => 'import',
        'acl_module' => 'Bugs',
        'icon' => 'fa-arrow-circle-o-up',
      ),
    ),
  ),
  'quickcreate' => 
  array (
    'meta' => 
    array (
      'layout' => 'create',
      'label' => 'LNK_NEW_BUG',
      'visible' => false,
      'icon' => 'fa-plus',
    ),
  ),
  '_hash' => 'fa9d43d2ef1d870f9a9e493c6434d13c',
);

