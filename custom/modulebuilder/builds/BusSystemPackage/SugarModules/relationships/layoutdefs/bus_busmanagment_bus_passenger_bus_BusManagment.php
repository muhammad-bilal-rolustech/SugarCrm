<?php
 // created: 2017-08-29 12:28:12
$layout_defs["bus_BusManagment"]["subpanel_setup"]['bus_busmanagment_bus_passenger'] = array (
  'order' => 100,
  'module' => 'bus_Passenger',
  'subpanel_name' => 'default',
  'sort_order' => 'asc',
  'sort_by' => 'id',
  'title_key' => 'LBL_BUS_BUSMANAGMENT_BUS_PASSENGER_FROM_BUS_PASSENGER_TITLE',
  'get_subpanel_data' => 'bus_busmanagment_bus_passenger',
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
