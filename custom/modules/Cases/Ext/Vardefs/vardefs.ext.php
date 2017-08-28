<?php
// WARNING: The contents of this file are auto-generated.
?>
<?php
// Merged from custom/Extension/modules/Cases/Ext/Vardefs/accounts_cases_Cases.php

$dictionary['Case']['fields']['accounts_name'] = array(
    'required'  => false,
    'source'    => 'non-db',
    'name'      => 'accounts_name',
    'vname'     => 'LBL_ACCOUNTS_NAME',
    'type'      => 'relate',
    'rname'     => 'name',
    'id_name'   => 'accounts_id',
    'join_name' => 'accounts',
    'link'      => 'accounts',
    'table'     => 'accounts',
    'isnull'    => 'true',
    'module'    => 'Accounts',
    );
$dictionary['Case']['fields']['accounts_id'] = array(
    'name'              => 'accounts_id',
    'rname'             => 'id',
    'vname'             => 'LBL_ACCOUNTS_ID',
    'type'              => 'id',
    'table'             => 'accounts',
    'isnull'            => 'true',
    'module'            => 'Accounts',
    'dbType'            => 'id',
    'reportable'        => false,
    'massupdate'        => false,
    'duplicate_merge'   => 'disabled',
    );
$dictionary['Case']['fields']['accounts'] = array(
  	'name'          => 'accounts',
    'type'          => 'link',
    'relationship'  => 'cases_accounts',
    'module'        => 'Accounts',
    'bean_name'     => 'Accounts',
    'source'        => 'non-db',
    'vname'         => 'LBL_ACCOUNTS',
    );
$dictionary['Case']['relationships']['cases_accounts'] = array(
    'lhs_module'		=> 'Accounts',
    'lhs_table'			=> 'accounts',
    'lhs_key'			=> 'id',
    'rhs_module'		=> 'Cases',
    'rhs_table'			=> 'cases',
    'rhs_key'			=> 'accounts_id',
    'relationship_type'	=> 'one-to-many',
    );

?>
