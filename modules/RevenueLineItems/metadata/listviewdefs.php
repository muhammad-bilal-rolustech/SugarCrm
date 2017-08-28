<?php

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

$fields = array(
    'NAME' => array (
        'width' => '40',
        'label' => 'LBL_LIST_NAME',
        'link' => true,
        'default' => true
    ),
    'ACCOUNT_NAME' => array (
        'width' => '20',
        'label' => 'LBL_LIST_ACCOUNT_NAME',
        'id' => 'ACCOUNT_ID',
        'module' => 'Accounts',
        'link' => true,
        'default' => true,
        'ACLTag' => 'ACCOUNT',
        'related_fields' => array (
            'account_id'
        ),
        'sortable' => true
    ),
    'STATUS' => array (
        'width' => '10',
        'label' => 'LBL_LIST_STATUS',
        'link' => false,
        'default' => true
    ),
    'QUANTITY' => array (
        'width' => '10',
        'label' => 'LBL_LIST_QUANTITY',
        'link' => false,
        'default' => true
    ),
    'DISCOUNT_USDOLLAR' => array (
        'width' => '10',
        'label' => 'LBL_LIST_DISCOUNT_PRICE',
        'link' => false,
        'default' => true,
        'currency_format' => true,
        'align' => 'right'
    ),
    'LIST_USDOLLAR' => array (
        'width' => '10',
        'label' => 'LBL_LIST_LIST_PRICE',
        'link' => false,
        'default' => true,
        'currency_format' => true,
        'align' => 'right',
        
    ),
    'COST_PRICE' =>  array(
        'width' => '10',
        'label' => 'LBL_LIST_COST_PRICE',
        'link' => false,
        'default' => true,
        'currency_format' => true,
        'align' => 'right',
        ),
    'DATE_ENTERED' => array (
        'type' => 'datetime',
        'label' => 'LBL_DATE_ENTERED',
        'width' => '10',
        'default' => true
    )
);
 

$listViewDefs['RevenueLineItems'] = $fields;
