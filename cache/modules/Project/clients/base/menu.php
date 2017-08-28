<?php
$clientCache['Project']['base']['menu'] = array (
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
        'route' => '#bwc/index.php?module=Project&action=ProjectTemplatesEditView&return_module=Project&return_action=ProjectTemplatesDetailView',
        'label' => 'LNK_NEW_PROJECT_TEMPLATES',
        'acl_action' => 'create',
        'acl_module' => 'Project',
        'icon' => 'fa-plus',
      ),
      2 => 
      array (
        'route' => '#bwc/index.php?module=Project&action=index',
        'label' => 'LNK_PROJECT_LIST',
        'acl_action' => 'list',
        'acl_module' => 'Project',
        'icon' => 'fa-bars',
      ),
      3 => 
      array (
        'route' => '#bwc/index.php?module=Project&action=ProjectTemplatesListView',
        'label' => 'LNK_PROJECT_TEMPLATES_LIST',
        'acl_action' => 'list',
        'acl_module' => 'Project',
        'icon' => 'fa-bars',
      ),
      4 => 
      array (
        'route' => '#bwc/index.php?module=ProjectTask&action=index',
        'label' => 'LNK_PROJECT_TASK_LIST',
        'acl_action' => 'list',
        'acl_module' => 'ProjectTask',
        'icon' => 'fa-bars',
      ),
      5 => 
      array (
        'route' => '#bwc/index.php?module=Project&action=Dashboard&return_module=Project&return_action=DetailView',
        'label' => 'LNK_PROJECT_DASHBOARD',
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
      'label' => 'LNK_NEW_PROJECT',
      'visible' => false,
      'icon' => 'fa-plus',
      'related' => 
      array (
        0 => 
        array (
          'module' => 'Accounts',
          'link' => 'project',
        ),
        1 => 
        array (
          'module' => 'Contacts',
          'link' => 'project',
        ),
        2 => 
        array (
          'module' => 'Opportunities',
          'link' => 'project',
        ),
        3 => 
        array (
          'module' => 'Tasks',
          'link' => 'project',
        ),
        4 => 
        array (
          'module' => 'Meetings',
          'link' => 'project',
        ),
        5 => 
        array (
          'module' => 'Calls',
          'link' => 'project',
        ),
        6 => 
        array (
          'module' => 'Cases',
          'link' => 'project',
        ),
      ),
    ),
  ),
  '_hash' => 'c41770f0da98a36ff0170f4ef4be6704',
);

