<?php
$clientCache['Contacts']['base']['menu'] = array (
  'header' => 
  array (
    'meta' => 
    array (
      0 => 
      array (
        'route' => '#Contacts/create',
        'label' => 'LNK_NEW_CONTACT',
        'acl_action' => 'create',
        'acl_module' => 'Contacts',
        'icon' => 'fa-plus',
      ),
      1 => 
      array (
        'route' => '#Contacts/vcard-import',
        'label' => 'LNK_IMPORT_VCARD',
        'acl_action' => 'create',
        'acl_module' => 'Contacts',
        'icon' => 'fa-plus',
      ),
      2 => 
      array (
        'route' => '#Contacts',
        'label' => 'LNK_CONTACT_LIST',
        'acl_action' => 'list',
        'acl_module' => 'Contacts',
        'icon' => 'fa-bars',
      ),
      3 => 
      array (
        'route' => '#bwc/index.php?module=Reports&action=index&view=contacts&query=true&report_module=Contacts',
        'label' => 'LNK_CONTACT_REPORTS',
        'acl_action' => 'list',
        'acl_module' => 'Contacts',
        'icon' => 'fa-bar-chart-o',
      ),
      4 => 
      array (
        'route' => '#bwc/index.php?module=Import&action=Step1&import_module=Contacts&return_module=Contacts&return_action=index',
        'label' => 'LNK_IMPORT_CONTACTS',
        'acl_action' => 'import',
        'acl_module' => 'Contacts',
        'icon' => 'fa-arrow-circle-o-up',
      ),
      5 => 
      array (
        'type' => 'dnb-bal-import-menu-label',
        'default_value' => 'LBL_BAL',
        'icon' => 'fa-arrow-circle-o-up',
        'route' => '#Contacts/layout/dnb-bal',
      ),
    ),
  ),
  'quickcreate' => 
  array (
    'meta' => 
    array (
      'layout' => 'create',
      'label' => 'LNK_NEW_CONTACT',
      'visible' => true,
      'order' => 1,
      'icon' => 'fa-plus',
      'related' => 
      array (
        0 => 
        array (
          'module' => 'Accounts',
          'link' => 'contacts',
        ),
        1 => 
        array (
          'module' => 'Opportunities',
          'link' => 'contacts',
        ),
      ),
    ),
  ),
  '_hash' => '13e678cf38a5f3086b9506923d3d8fda',
);

