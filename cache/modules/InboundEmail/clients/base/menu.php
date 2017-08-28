<?php
$clientCache['InboundEmail']['base']['menu'] = array (
  'header' => 
  array (
    'meta' => 
    array (
      0 => 
      array (
        'route' => '#bwc/index.php?module=InboundEmail&action=EditView',
        'label' => 'LNK_LIST_CREATE_NEW_GROUP',
        'acl_action' => 'create',
        'acl_module' => 'InboundEmail',
        'icon' => 'fa-plus',
      ),
      1 => 
      array (
        'route' => '#bwc/index.php?module=InboundEmail&action=EditView&mailbox_type=bounce',
        'label' => 'LNK_LIST_CREATE_NEW_BOUNCE',
        'acl_action' => 'create',
        'acl_module' => 'InboundEmail',
        'icon' => 'fa-plus',
      ),
      2 => 
      array (
        'route' => '#bwc/index.php?module=InboundEmail&action=index',
        'label' => 'LNK_LIST_MAILBOXES',
        'acl_action' => 'list',
        'acl_module' => 'InboundEmail',
        'icon' => 'fa-bars',
      ),
      3 => 
      array (
        'route' => '#bwc/index.php?module=Schedulers&action=index',
        'label' => 'LNK_LIST_SCHEDULER',
        'acl_action' => 'admin',
        'acl_module' => 'Schedulers',
        'icon' => 'fa-clock-o',
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
  '_hash' => '433f04dbddf9adbc4d4c25822e0df96a',
);

