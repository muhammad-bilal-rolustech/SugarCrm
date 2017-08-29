<?php
 // created: 2017-08-29 12:28:12
$layout_defs["bus_Room"]["subpanel_setup"]['bus_room_bus_chair'] = array (
  'order' => 100,
  'module' => 'bus_Chair',
  'subpanel_name' => 'default',
  'sort_order' => 'asc',
  'sort_by' => 'id',
  'title_key' => 'LBL_BUS_ROOM_BUS_CHAIR_FROM_BUS_CHAIR_TITLE',
  'get_subpanel_data' => 'bus_room_bus_chair',
  'top_buttons' => 
  array (
    0 => 
    array (
      'widget_class' => 'SubPanelTopButtonQuickCreate',
    ),
    1 => 
    array (
      'widget_class' => 'SubPanelTopSelectButton',
      'mode' => 'MultiSelect',
    ),
  ),
);
