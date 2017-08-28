<?php
$clientCache['KBContents']['base']['menu'] = array (
  'header' => 
  array (
    'meta' => 
    array (
      0 => 
      array (
        'route' => '#KBContents/create',
        'label' => 'LNK_NEW_ARTICLE',
        'acl_action' => 'create',
        'acl_module' => 'KBContents',
        'icon' => 'fa-plus',
      ),
      1 => 
      array (
        'route' => '#KBContentTemplates/create',
        'label' => 'LNK_NEW_KBCONTENT_TEMPLATE',
        'acl_action' => 'admin',
        'acl_module' => 'KBContents',
        'icon' => 'fa-plus',
      ),
      2 => 
      array (
        'route' => '#KBContents',
        'label' => 'LNK_LIST_ARTICLES',
        'acl_action' => 'list',
        'acl_module' => 'KBContents',
        'icon' => 'fa-reorder',
      ),
      3 => 
      array (
        'route' => '#KBContentTemplates',
        'label' => 'LNK_LIST_KBCONTENT_TEMPLATES',
        'acl_action' => 'admin',
        'acl_module' => 'KBContents',
        'icon' => 'fa-reorder',
      ),
      4 => 
      array (
        'event' => 'tree:list:fire',
        'label' => 'LNK_LIST_KBCATEGORIES',
        'acl_action' => 'list',
        'acl_module' => 'KBContents',
        'icon' => 'fa-reorder',
        'target' => 'view',
      ),
      5 => 
      array (
        'route' => '#KBContents/config',
        'label' => 'LNK_KNOWLEDGE_BASE_ADMIN_MENU',
        'acl_action' => 'admin',
        'acl_module' => 'KBContents',
        'icon' => 'fa-cog',
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
  '_hash' => '3c681da54ab4bf5fc1b6f452f995887e',
);

