<?php
// WARNING: The contents of this file are auto-generated.
?>
<?php
// Merged from custom/Extension/modules/bus_BusManagment/Ext/Layoutdefs/bus_busmanagment_bus_passenger_bus_BusManagment.php

 // created: 2017-08-28 14:15:19
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

?>
