<?php 
 $GLOBALS["dictionary"]["ContractType"]=array (
  'table' => 'contract_types',
  'comment' => 'Specifies the types of contracts available',
  'fields' => 
  array (
    'id' => 
    array (
      'name' => 'id',
      'vname' => 'LBL_ID',
      'type' => 'id',
      'required' => true,
      'reportable' => false,
      'comment' => 'Unique idenifier',
    ),
    'name' => 
    array (
      'name' => 'name',
      'vname' => 'LBL_TYPE_NAME',
      'type' => 'varchar',
      'len' => '30',
      'comment' => 'Contract type name',
      'importable' => 'required',
    ),
    'list_order' => 
    array (
      'name' => 'list_order',
      'vname' => 'LBL_LIST_ORDER',
      'type' => 'int',
      'len' => '4',
      'comment' => 'Relative order in drop down list',
      'importable' => 'required',
    ),
    'date_entered' => 
    array (
      'name' => 'date_entered',
      'vname' => 'LBL_DATE_ENTERED',
      'type' => 'datetime',
      'required' => true,
      'comment' => 'Date record created',
    ),
    'date_modified' => 
    array (
      'name' => 'date_modified',
      'vname' => 'LBL_DATE_MODIFIED',
      'type' => 'datetime',
      'required' => true,
      'comment' => 'Date record last modified',
    ),
    'modified_user_id' => 
    array (
      'name' => 'modified_user_id',
      'vname' => 'LBL_MODIFIED_USER_ID',
      'dbType' => 'id',
      'type' => 'id',
      'comment' => 'Date record last modified',
    ),
    'created_by' => 
    array (
      'name' => 'created_by',
      'vname' => 'LBL_CREATED_BY',
      'isnull' => 'false',
      'dbType' => 'id',
      'type' => 'id',
      'comment' => 'User ID who created record',
    ),
    'deleted' => 
    array (
      'name' => 'deleted',
      'vname' => 'LBL_DELETED',
      'type' => 'bool',
      'required' => false,
      'default' => '0',
      'reportable' => false,
      'comment' => 'Record deletion indicator',
    ),
    'documents' => 
    array (
      'name' => 'documents',
      'type' => 'link',
      'relationship' => 'contracttype_documents',
      'source' => 'non-db',
      'vname' => 'LBL_DOCUMENTS',
    ),
  ),
  'acls' => 
  array (
    'SugarACLDeveloperOrAdmin' => 
    array (
      'aclModule' => 'Contracts',
    ),
  ),
  'indices' => 
  array (
    0 => 
    array (
      'name' => 'contract_types_pk',
      'type' => 'primary',
      'fields' => 
      array (
        0 => 'id',
      ),
    ),
    1 => 
    array (
      'name' => 'idx_contracttype_name',
      'type' => 'index',
      'fields' => 
      array (
        0 => 'name',
      ),
    ),
  ),
  'custom_fields' => false,
  'related_calc_fields' => 
  array (
  ),
);