<?php
// WARNING: The contents of this file are auto-generated.
?>
<?php
// Merged from custom/Extension/modules/bus_Passenger/Ext/Vardefs/bus_busmanagment_bus_passenger_bus_Passenger.php

// created: 2017-08-29 12:28:12
$dictionary["bus_Passenger"]["fields"]["bus_busmanagment_bus_passenger"] = array (
  'name' => 'bus_busmanagment_bus_passenger',
  'type' => 'link',
  'relationship' => 'bus_busmanagment_bus_passenger',
  'source' => 'non-db',
  'module' => 'bus_BusManagment',
  'bean_name' => 'bus_BusManagment',
  'side' => 'right',
  'vname' => 'LBL_BUS_BUSMANAGMENT_BUS_PASSENGER_FROM_BUS_PASSENGER_TITLE',
  'id_name' => 'bus_busmanagment_bus_passengerbus_busmanagment_ida',
  'link-type' => 'one',
);
$dictionary["bus_Passenger"]["fields"]["bus_busmanagment_bus_passenger_name"] = array (
  'name' => 'bus_busmanagment_bus_passenger_name',
  'type' => 'relate',
  'source' => 'non-db',
  'vname' => 'LBL_BUS_BUSMANAGMENT_BUS_PASSENGER_FROM_BUS_BUSMANAGMENT_TITLE',
  'save' => true,
  'id_name' => 'bus_busmanagment_bus_passengerbus_busmanagment_ida',
  'link' => 'bus_busmanagment_bus_passenger',
  'table' => 'bus_busmanagment',
  'module' => 'bus_BusManagment',
  'rname' => 'name',
);
$dictionary["bus_Passenger"]["fields"]["bus_busmanagment_bus_passengerbus_busmanagment_ida"] = array (
  'name' => 'bus_busmanagment_bus_passengerbus_busmanagment_ida',
  'type' => 'id',
  'source' => 'non-db',
  'vname' => 'LBL_BUS_BUSMANAGMENT_BUS_PASSENGER_FROM_BUS_PASSENGER_TITLE_ID',
  'id_name' => 'bus_busmanagment_bus_passengerbus_busmanagment_ida',
  'link' => 'bus_busmanagment_bus_passenger',
  'table' => 'bus_busmanagment',
  'module' => 'bus_BusManagment',
  'rname' => 'id',
  'reportable' => false,
  'side' => 'right',
  'massupdate' => false,
  'duplicate_merge' => 'disabled',
  'hideacl' => true,
);

?>
