<?php
$clientCache['Documents']['base']['menu'] = array (
  'header' => 
  array (
    'meta' => 
    array (
      0 => 
      array (
        'route' => '#bwc/index.php?module=Documents&action=editview',
        'label' => 'LNK_NEW_DOCUMENT',
        'acl_action' => 'create',
        'acl_module' => 'Documents',
        'icon' => 'fa-plus',
      ),
      1 => 
      array (
        'route' => '#Documents',
        'label' => 'LNK_DOCUMENT_LIST',
        'acl_action' => 'list',
        'acl_module' => 'Documents',
        'icon' => 'fa-bars',
      ),
    ),
  ),
  'quickcreate' => 
  array (
    'meta' => 
    array (
      'layout' => 'create',
      'label' => 'LNK_NEW_DOCUMENT',
      'visible' => true,
      'order' => 4,
      'icon' => 'fa-plus',
      'related' => 
      array (
        0 => 
        array (
          'module' => 'Accounts',
          'link' => 'documents',
        ),
        1 => 
        array (
          'module' => 'Contacts',
          'link' => 'documents',
        ),
        2 => 
        array (
          'module' => 'Opportunities',
          'link' => 'documents',
        ),
        3 => 
        array (
          'module' => 'RevenueLineItems',
          'link' => 'documents',
        ),
      ),
    ),
  ),
  '_hash' => 'c1f5cd8cc9860431649bb3344cd72f22',
);

