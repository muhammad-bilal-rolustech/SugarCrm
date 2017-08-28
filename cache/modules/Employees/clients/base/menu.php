<?php
$clientCache['Employees']['base']['menu'] = array (
  'header' => 
  array (
    'meta' => 
    array (
      0 => 
      array (
        'route' => '#bwc/index.php?module=Employees&action=EditView',
        'label' => 'LNK_NEW_EMPLOYEE',
        'acl_action' => 'admin',
        'acl_module' => 'Employees',
        'icon' => 'fa-plus',
      ),
      1 => 
      array (
        'route' => '#Employees',
        'label' => 'LNK_EMPLOYEE_LIST',
        'acl_action' => 'list',
        'acl_module' => 'Employees',
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
  '_hash' => 'b74ee25ee46941446084a17a6b0814bf',
);

