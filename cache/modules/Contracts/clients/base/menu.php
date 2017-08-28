<?php
$clientCache['Contracts']['base']['menu'] = array (
  'header' => 
  array (
    'meta' => 
    array (
      0 => 
      array (
        'route' => '#bwc/index.php?module=Contracts&action=EditView&return_module=Contracts&return_action=DetailView',
        'label' => 'LNK_NEW_CONTRACT',
        'acl_action' => 'create',
        'acl_module' => 'Contracts',
        'icon' => 'fa-plus',
      ),
      1 => 
      array (
        'route' => '#bwc/index.php?module=Contracts&action=index',
        'label' => 'LNK_CONTRACT_LIST',
        'acl_action' => 'list',
        'acl_module' => 'Contracts',
        'icon' => 'fa-bars',
      ),
      2 => 
      array (
        'route' => '#bwc/index.php?module=Import&action=Step1&import_module=Contracts&return_module=Contracts&return_action=index',
        'label' => 'LNK_IMPORT_CONTRACTS',
        'acl_action' => 'import',
        'acl_module' => 'Contracts',
        'icon' => 'fa-arrow-circle-o-up',
      ),
    ),
  ),
  'quickcreate' => 
  array (
    'meta' => 
    array (
      'layout' => 'create',
      'href' => '#bwc/index.php?module=Contracts&action=EditView&return_module=Contracts&return_action=DetailView',
      'label' => 'LNK_NEW_CONTRACT',
      'visible' => false,
      'icon' => 'fa-plus',
    ),
  ),
  '_hash' => '298677ac454239ddf53a62a76fd03511',
);

