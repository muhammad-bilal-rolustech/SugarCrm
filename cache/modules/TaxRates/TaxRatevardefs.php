<?php 
 $GLOBALS["dictionary"]["TaxRate"]=array (
  'table' => 'taxrates',
  'favorites' => false,
  'fields' => 
  array (
    'id' => 
    array (
      'name' => 'id',
      'vname' => 'LBL_ID',
      'type' => 'id',
      'required' => true,
      'reportable' => false,
    ),
    'deleted' => 
    array (
      'name' => 'deleted',
      'vname' => 'LBL_DELETED',
      'type' => 'bool',
      'reportable' => false,
      'required' => false,
    ),
    'date_entered' => 
    array (
      'name' => 'date_entered',
      'vname' => 'LBL_DATE_ENTERED',
      'type' => 'datetime',
      'required' => true,
    ),
    'date_modified' => 
    array (
      'name' => 'date_modified',
      'vname' => 'LBL_DATE_MODIFIED',
      'type' => 'datetime',
      'required' => true,
    ),
    'modified_user_id' => 
    array (
      'name' => 'modified_user_id',
      'rname' => 'user_name',
      'id_name' => 'modified_user_id',
      'vname' => 'LBL_MODIFIED_ID',
      'type' => 'assigned_user_name',
      'table' => 'users',
      'isnull' => 'false',
      'dbType' => 'id',
      'reportable' => true,
      'required' => false,
    ),
    'created_by' => 
    array (
      'name' => 'created_by',
      'rname' => 'user_name',
      'id_name' => 'modified_user_id',
      'vname' => 'LBL_CREATED_ID',
      'type' => 'assigned_user_name',
      'table' => 'users',
      'isnull' => 'false',
      'dbType' => 'id',
    ),
    'name' => 
    array (
      'name' => 'name',
      'vname' => 'LBL_NAME',
      'type' => 'varchar',
      'len' => '50',
      'required' => true,
      'importable' => 'required',
    ),
    'value' => 
    array (
      'name' => 'value',
      'vname' => 'LBL_VALUE',
      'type' => 'decimal',
      'dbType' => 'decimal2',
      'len' => '26,6',
      'importable' => 'required',
      'required' => true,
    ),
    'list_order' => 
    array (
      'name' => 'list_order',
      'vname' => 'LBL_LIST_ORDER',
      'type' => 'int',
      'len' => '4',
      'importable' => 'required',
      'required' => true,
    ),
    'status' => 
    array (
      'name' => 'status',
      'vname' => 'LBL_STATUS',
      'type' => 'enum',
      'dbType' => 'varchar',
      'len' => 100,
      'options' => 'taxrate_status_dom',
      'importable' => 'required',
      'required' => true,
    ),
    'product_bundles' => 
    array (
      'name' => 'product_bundles',
      'type' => 'link',
      'relationship' => 'product_bundle_taxrate',
      'module' => 'ProductBundles',
      'bean_name' => 'ProductBundle',
      'source' => 'non-db',
    ),
  ),
  'acls' => 
  array (
    'SugarACLDeveloperOrAdmin' => 
    array (
      'aclModule' => 'Quotes',
      'allowUserRead' => true,
    ),
  ),
  'indices' => 
  array (
    0 => 
    array (
      'name' => 'taxratespk',
      'type' => 'primary',
      'fields' => 
      array (
        0 => 'id',
      ),
    ),
  ),
  'custom_fields' => false,
  'related_calc_fields' => 
  array (
    0 => 'product_bundles',
  ),
);