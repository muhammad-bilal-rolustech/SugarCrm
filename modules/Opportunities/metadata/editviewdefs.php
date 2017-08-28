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

$viewdefs['Opportunities']['EditView'] = array(
    'templateMeta' => array('maxColumns' => '2',
        'widths' => array(
            array('label' => '10', 'field' => '30'),
            array('label' => '10', 'field' => '30')
        ),
        'javascript' => '{$PROBABILITY_SCRIPT}',
    ),
    'panels' =>array (
        'default' =>
        array (

            array (
                array('name'=>'name'),
                'account_name',
            ),
            array(
                array('name'=>'currency_id','label'=>'LBL_CURRENCY'),
                array('name'=>'date_closed'),
            ),
            array (
                array( 'name'=>'amount'),
                'opportunity_type',
            ),
            array(
                'best_case',
                'worst_case',
            ),
            array (
                'sales_stage',
                'lead_source',
            ),
            array (
                'probability',
                'campaign_name',
            ),
            array (
                'next_step',
            ),
            array (
                'description',
            ),
        ),

        'LBL_PANEL_ASSIGNMENT' => array(
            array(
                'assigned_user_name',

                array('name'=>'team_name'),
            ),
        ),
    )
);
