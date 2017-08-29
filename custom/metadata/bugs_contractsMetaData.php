<?php
if(!defined('sugarEntry') || !sugarEntry) die('Not A Valid Entry Point');
/*
 * Your installation or use of this SugarCRM file is subject to the applicable
 * terms available at
 * http://support.sugarcrm.com/06_Customer_Center/10_Master_Subscription_Agreements/.
 * If you do not agree to all of the applicable terms or do not have the
 * authority to bind the entity as an authorized representative, then do not
 * install or use this SugarCRM file.
 *
 * Copyright (C) SugarCRM Inc. All rights reserved.
 */
$dictionary['bugs_contracts'] = array ( 'table' => 'bugs_contracts'
                                  , 'fields' => array (
       array('name' =>'id', 'type' =>'varchar', 'len'=>'36',)
      , array('name' =>'bug_id', 'type' =>'varchar', 'len'=>'36')
      , array('name' =>'contract_id', 'type' =>'varchar', 'len'=>'36')
      , array ('name' => 'date_modified','type' => 'datetime')
      , array('name' =>'deleted', 'type' =>'bool', 'len'=>'1', 'required'=>false, 'default'=>'0')
                                                      )                                  , 'indices' => array (
       array('name' =>'bugs_contractspk', 'type' =>'primary', 'fields'=>array('id'))
      , array('name' =>'idx_bug_cntr_bug', 'type' =>'index', 'fields'=>array('bug_id'))
      , array('name' =>'idx_bug_cntr_cntr', 'type' =>'index', 'fields'=>array('contract_id'))
      , array('name' => 'idx_bug_cntr', 'type'=>'alternate_key', 'fields'=>array('bug_id','contract_id'))
      )

 	  , 'relationships' => array ('bugs_contracts' => array('lhs_module'=> 'Bugs', 'lhs_table'=> 'bugs', 'lhs_key' => 'id',
							  'rhs_module'=> 'Contracts', 'rhs_table'=> 'contracts', 'rhs_key' => 'id',
							  'relationship_type'=>'many-to-many',
							  'join_table'=> 'bugs_contracts', 'join_key_lhs'=>'bug_id', 'join_key_rhs'=>'contract_id'))
)
?>
