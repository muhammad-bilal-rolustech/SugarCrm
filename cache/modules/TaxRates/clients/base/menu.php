<?php
$clientCache['TaxRates']['base']['menu'] = array (
  'header' => 
  array (
    'meta' => 
    array (
      0 => 
      array (
        'route' => '#bwc/index.php?module=Shippers&action=EditView&return_module=Shippers&return_action=DetailView',
        'label' => 'LNK_NEW_SHIPPER',
        'acl_action' => 'admin',
        'acl_module' => 'Products',
        'icon' => 'fa-bars',
      ),
      1 => 
      array (
        'route' => '#bwc/index.php?module=TaxRates&action=EditView&return_module=TaxRates&return_action=DetailView',
        'label' => 'LNK_NEW_TAXRATE',
        'acl_action' => 'admin',
        'acl_module' => 'Products',
        'icon' => 'fa-bars',
      ),
      2 => 
      array (
        'route' => '#bwc/index.php?module=Import&action=Step1&import_module=TaxRates&return_module=TaxRates&return_action=index',
        'label' => 'LNK_IMPORT_TAXRATES',
        'acl_action' => 'admin',
        'acl_module' => 'Products',
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
  '_hash' => 'de003fb8de417ee6bc7c3fce251df05c',
);

