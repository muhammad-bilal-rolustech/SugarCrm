<?php
$clientCache['Leads']['base']['menu'] = array (
  'header' => 
  array (
    'meta' => 
    array (
      0 => 
      array (
        'route' => '#Leads/create',
        'label' => 'LNK_NEW_LEAD',
        'acl_action' => 'create',
        'acl_module' => 'Leads',
        'icon' => 'fa-plus',
      ),
      1 => 
      array (
        'route' => '#Leads/vcard-import',
        'label' => 'LNK_IMPORT_VCARD',
        'acl_action' => 'create',
        'acl_module' => 'Leads',
        'icon' => 'fa-plus',
      ),
      2 => 
      array (
        'route' => '#Leads',
        'label' => 'LNK_LEAD_LIST',
        'acl_action' => 'list',
        'acl_module' => 'Leads',
        'icon' => 'fa-bars',
      ),
      3 => 
      array (
        'route' => '#bwc/index.php?module=Reports&action=index&view=leads&query=true&report_module=Leads',
        'label' => 'LNK_LEAD_REPORTS',
        'acl_action' => 'list',
        'acl_module' => 'Leads',
        'icon' => 'fa-bar-chart-o',
      ),
      4 => 
      array (
        'route' => '#bwc/index.php?module=Import&action=Step1&import_module=Leads&return_module=Leads&return_action=index',
        'label' => 'LNK_IMPORT_LEADS',
        'acl_action' => 'import',
        'acl_module' => 'Leads',
        'icon' => 'fa-arrow-circle-o-up',
      ),
      5 => 
      array (
        'type' => 'dnb-bal-import-menu-label',
        'default_value' => 'LBL_BAL',
        'icon' => 'fa-arrow-circle-o-up',
        'route' => '#Leads/layout/dnb-bal',
      ),
    ),
  ),
  'quickcreate' => 
  array (
    'meta' => 
    array (
      'layout' => 'create',
      'label' => 'LNK_NEW_LEAD',
      'visible' => true,
      'order' => 3,
      'icon' => 'fa-plus',
      'related' => 
      array (
        0 => 
        array (
          'module' => 'Accounts',
          'link' => 'leads',
        ),
        1 => 
        array (
          'module' => 'Contacts',
          'link' => 'leads',
        ),
        2 => 
        array (
          'module' => 'Opportunities',
          'link' => 'leads',
        ),
      ),
    ),
  ),
  '_hash' => 'e9a46f7067036ee0f59c8c0d062e2328',
);

