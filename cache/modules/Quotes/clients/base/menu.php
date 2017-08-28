<?php
$clientCache['Quotes']['base']['menu'] = array (
  'header' => 
  array (
    'meta' => 
    array (
      0 => 
      array (
        'route' => '#bwc/index.php?module=Quotes&action=EditView&return_module=Quotes&return_action=DetailView',
        'label' => 'LNK_NEW_QUOTE',
        'acl_action' => 'create',
        'acl_module' => 'Quotes',
        'icon' => 'fa-plus',
      ),
      1 => 
      array (
        'route' => '#Quotes',
        'label' => 'LNK_QUOTE_LIST',
        'acl_action' => 'list',
        'acl_module' => 'Quotes',
        'icon' => 'fa-bars',
      ),
      2 => 
      array (
        'route' => '#bwc/index.php?module=Reports&action=index&view=quotes&query=true&report_module=Quotes',
        'label' => 'LNK_QUOTE_REPORTS',
        'acl_action' => 'list',
        'acl_module' => 'Quotes',
        'icon' => 'fa-bar-chart-o',
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
  '_hash' => '58ee5eba0565b6fcc683a06299274f81',
);

