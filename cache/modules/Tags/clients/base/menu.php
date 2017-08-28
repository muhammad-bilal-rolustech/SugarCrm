<?php
$clientCache['Tags']['base']['menu'] = array (
  'header' => 
  array (
    'meta' => 
    array (
      0 => 
      array (
        'label' => 'LNK_NEW_TAG',
        'acl_action' => 'create',
        'acl_module' => 'Tags',
        'icon' => 'fa-plus',
        'route' => '#Tags/create',
      ),
      1 => 
      array (
        'route' => '#Tags',
        'label' => 'LNK_TAG_LIST',
        'acl_action' => 'list',
        'acl_module' => 'Tags',
        'icon' => 'fa-bars',
      ),
      2 => 
      array (
        'route' => '#bwc/index.php?module=Import&action=Step1&import_module=Tags',
        'label' => 'LNK_IMPORT_TAGS',
        'acl_action' => 'import',
        'acl_module' => 'Tags',
        'icon' => 'fa-arrow-circle-o-up',
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
  '_hash' => '96230599e872acf823c80769cae349d3',
);

