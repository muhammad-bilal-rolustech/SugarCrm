<?php
$clientCache['PdfManager']['base']['menu'] = array (
  'header' => 
  array (
    'meta' => 
    array (
      0 => 
      array (
        'route' => '#bwc/index.php?module=PdfManager&action=EditView',
        'label' => 'LNK_NEW_RECORD',
        'acl_action' => 'create',
        'acl_module' => 'PdfManager',
        'icon' => 'fa-plus',
      ),
      1 => 
      array (
        'route' => '#bwc/index.php?module=PdfManager&action=index',
        'label' => 'LNK_LIST',
        'acl_action' => 'list',
        'acl_module' => 'PdfManager',
        'icon' => 'fa-bars',
      ),
      2 => 
      array (
        'route' => '#bwc/index.php?return_module=PdfManager&return_action=index&module=Configurator&action=SugarpdfSettings',
        'label' => 'LNK_EDIT_PDF_TEMPLATE',
        'acl_action' => '',
        'acl_module' => '',
        'icon' => 'fa-pencil',
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
  '_hash' => '07fe87aca12722242549544d7c312ed8',
);

