<?php
$clientCache['Tasks']['base']['menu'] = array (
  'header' => 
  array (
    'meta' => 
    array (
      0 => 
      array (
        'route' => '#Tasks/create',
        'label' => 'LNK_NEW_TASK',
        'acl_action' => 'create',
        'acl_module' => 'Tasks',
        'icon' => 'fa-plus',
      ),
      1 => 
      array (
        'route' => '#Tasks',
        'label' => 'LNK_TASK_LIST',
        'acl_action' => 'list',
        'acl_module' => 'Tasks',
        'icon' => 'fa-bars',
      ),
      2 => 
      array (
        'route' => '#bwc/index.php?module=Import&action=Step1&import_module=Tasks&return_module=Tasks&return_action=index',
        'label' => 'LNK_IMPORT_TASKS',
        'acl_action' => 'import',
        'acl_module' => 'Tasks',
        'icon' => 'fa-arrow-circle-o-up',
      ),
    ),
  ),
  'quickcreate' => 
  array (
    'meta' => 
    array (
      'layout' => 'create',
      'label' => 'LNK_NEW_TASK',
      'visible' => true,
      'order' => 8,
      'icon' => 'fa-plus',
    ),
  ),
  '_hash' => '621115464acf96c027243a9cdcf92c42',
);

