<?php

$layout_defs[“Bugs”][“subpanel_setup”][‘bugs_contracts’] = array (
‘order’ => 100,
‘module’ => ‘Contracts’,
‘subpanel_name’ => ‘default’,
‘sort_order’ => ‘asc’,
‘sort_by’ => ‘id’,
‘title_key’ => ‘LBL_BUGS_CONTACT’,
‘get_subpanel_data’ => ‘contracts’,
‘top_buttons’ =>
array (/*
0 =>
array (
‘widget_class’ => ‘SubPanelTopButtonQuickCreate’,
),
1 =>
array (
‘widget_class’ => ‘SubPanelTopSelectButton’,
‘mode’ => ‘MultiSelect’,
),
*/),
);
?>
