<?php 
 $GLOBALS["dictionary"]["System"]=array (
  'table' => 'systems',
  'fields' => 
  array (
    'id' => 
    array (
      'name' => 'id',
      'type' => 'id',
    ),
    'system_id' => 
    array (
      'name' => 'system_id',
      'type' => 'int',
      'auto_increment' => true,
      'required' => true,
    ),
    'system_key' => 
    array (
      'name' => 'system_key',
      'type' => 'varchar',
      'len' => '36',
    ),
    'user_id' => 
    array (
      'name' => 'user_id',
      'type' => 'id',
    ),
    'last_connect_date' => 
    array (
      'name' => 'last_connect_date',
      'type' => 'datetime',
      'massupdate' => false,
    ),
    'status' => 
    array (
      'name' => 'status',
      'vname' => 'LBL_OC_STATUS',
      'type' => 'enum',
      'len' => '255',
      'options' => 'oc_status_dom',
      'default' => 'Active',
      'massupdate' => true,
    ),
    'num_syncs' => 
    array (
      'name' => 'num_syncs',
      'type' => 'int',
      'default' => '0',
    ),
    'system_name' => 
    array (
      'name' => 'system_name',
      'type' => 'varchar',
      'len' => '100',
    ),
    'install_method' => 
    array (
      'name' => 'install_method',
      'type' => 'varchar',
      'len' => '100',
    ),
    'date_entered' => 
    array (
      'name' => 'date_entered',
      'type' => 'datetime',
    ),
    'date_modified' => 
    array (
      'name' => 'date_modified',
      'type' => 'datetime',
    ),
    'deleted' => 
    array (
      'name' => 'deleted',
      'type' => 'bool',
      'len' => '1',
      'default' => '0',
      'required' => true,
    ),
  ),
  'indices' => 
  array (
    0 => 
    array (
      'name' => 'systems_pk',
      'type' => 'primary',
      'fields' => 
      array (
        0 => 'id',
      ),
    ),
    1 => 
    array (
      'name' => 'system_id',
      'type' => 'index',
      'fields' => 
      array (
        0 => 'system_id',
      ),
    ),
  ),
  'custom_fields' => false,
  'related_calc_fields' => 
  array (
  ),
);