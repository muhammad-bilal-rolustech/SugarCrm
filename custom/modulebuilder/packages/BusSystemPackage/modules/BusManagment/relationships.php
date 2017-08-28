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
$relationships = array (
  'bus_busmanagment_bus_passenger' => 
  array (
    'rhs_label' => 'Passengers',
    'lhs_label' => 'BusManagments',
    'rhs_subpanel' => 'default',
    'lhs_module' => 'bus_BusManagment',
    'rhs_module' => 'bus_Passenger',
    'relationship_type' => 'one-to-many',
    'readonly' => false,
    'deleted' => false,
    'relationship_only' => false,
    'for_activities' => false,
    'is_custom' => false,
    'from_studio' => false,
    'relationship_name' => 'bus_busmanagment_bus_passenger',
  ),
);