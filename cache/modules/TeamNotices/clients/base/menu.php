<?php
$clientCache['TeamNotices']['base']['menu'] = array (
  'header' => 
  array (
    'meta' => 
    array (
      0 => 
      array (
        'route' => '#bwc/index.php?module=Teams&action=EditView&return_module=Teams&return_action=index',
        'label' => 'LNK_NEW_TEAM',
        'acl_action' => 'create',
        'acl_module' => 'Teams',
        'icon' => 'fa-plus',
      ),
      1 => 
      array (
        'route' => '#Teams',
        'label' => 'LNK_LIST_TEAM',
        'acl_action' => 'list',
        'acl_module' => 'Teams',
        'icon' => 'fa-bars',
      ),
      2 => 
      array (
        'route' => '#bwc/index.php?module=TeamNotices&action=EditView',
        'label' => 'LNK_NEW_TEAM_NOTICE',
        'acl_action' => 'create',
        'acl_module' => 'TeamNotices',
        'icon' => 'fa-plus',
      ),
      3 => 
      array (
        'route' => '#bwc/index.php?module=TeamNotices&action=index',
        'label' => 'LNK_LIST_TEAMNOTICE',
        'acl_action' => '',
        'acl_module' => '',
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
  '_hash' => 'e4b8000fe0608475293440b8b5fe84fd',
);

