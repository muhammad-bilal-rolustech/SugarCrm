<?php
$clientCache['ProjectTask']['base']['menu'] = array (
  'header' => 
  array (
    'meta' => 
    array (
      0 => 
      array (
        'route' => '#bwc/index.php?module=Project&action=EditView&return_module=Project&return_action=DetailView',
        'label' => 'LNK_NEW_PROJECT',
        'acl_action' => 'create',
        'acl_module' => 'Project',
        'icon' => 'fa-plus',
      ),
      1 => 
      array (
        'route' => '#bwc/index.php?module=Project&action=index',
        'label' => 'LNK_PROJECT_LIST',
        'acl_action' => 'list',
        'acl_module' => 'Project',
        'icon' => 'fa-bars',
      ),
      2 => 
      array (
        'route' => '#bwc/index.php?module=ProjectTask&action=index',
        'label' => 'LNK_PROJECT_TASK_LIST',
        'acl_action' => 'list',
        'acl_module' => 'Project',
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
  '_hash' => '778dd83ec03af613458525a5a3e51e24',
);

