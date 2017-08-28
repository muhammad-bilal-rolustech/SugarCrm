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

// PRO/CORP only fields
$fields = array(
    array(
        'name' => 'name',
        'link' => true,
        'label' => 'LBL_LIST_NAME',
        'enabled' => true,
        'default' => true,
    ),
    array(
        'name' => 'account_name',
        'enabled' => true,
        'default' => true,
        'sortable' => true,
    ),
    array(
        'name' => 'status',
        'enabled' => true,
        'default' => true,
    ),
    array(
        'name' => 'quantity',
        'enabled' => true,
        'default' => true,
    ),
    array(
        'name' => 'discount_price',
        'type' => 'currency',
        'related_fields' => array(
            'currency_id',
            'base_rate',
        ),
        'convertToBase' => true,
        'currency_field' => 'currency_id',
        'base_rate_field' => 'base_rate',
        'enabled' => true,
        'default' => true,
    ),
    array(
        'name' => 'list_price',
        'type' => 'currency',
        'related_fields' => array(
            'currency_id',
            'base_rate',
        ),
        'convertToBase' => true,
        'currency_field' => 'currency_id',
        'base_rate_field' => 'base_rate',
        'enabled' => true,
        'default' => true,
    ),
    array(
        'name' => 'cost_price',
        'type' => 'currency',
        'related_fields' => array(
            'currency_id',
            'base_rate',
        ),
        'convertToBase' => true,
        'currency_field' => 'currency_id',
        'base_rate_field' => 'base_rate',
        'enabled' => true,
        'default' => true,
    ),
    array(
        'name' => 'date_entered',
        'enabled' => true,
        'default' => true,
        'readonly' => true,
    ),
);


$viewdefs['RevenueLineItems']['base']['view']['list'] = array(
    'panels' => array(
        array(
            'name' => 'panel_header',
            'label' => 'LBL_PANEL_1',
            'fields' => $fields
        ),
    ),
);
