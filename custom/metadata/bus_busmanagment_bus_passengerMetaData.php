<?php
// created: 2017-08-28 14:15:19
$dictionary["bus_busmanagment_bus_passenger"] = array (
  'true_relationship_type' => 'one-to-many',
  'relationships' => 
  array (
    'bus_busmanagment_bus_passenger' => 
    array (
      'lhs_module' => 'bus_BusManagment',
      'lhs_table' => 'bus_busmanagment',
      'lhs_key' => 'id',
      'rhs_module' => 'bus_Passenger',
      'rhs_table' => 'bus_passenger',
      'rhs_key' => 'id',
      'relationship_type' => 'many-to-many',
      'join_table' => 'bus_busmanagment_bus_passenger_c',
      'join_key_lhs' => 'bus_busmanagment_bus_passengerbus_busmanagment_ida',
      'join_key_rhs' => 'bus_busmanagment_bus_passengerbus_passenger_idb',
    ),
  ),
  'table' => 'bus_busmanagment_bus_passenger_c',
  'fields' => 
  array (
    'id' => 
    array (
      'name' => 'id',
      'type' => 'id',
    ),
    'date_modified' => 
    array (
      'name' => 'date_modified',
      'type' => 'datetime',
    ),
    'deleted' => 
    array (
      'name' => 'deleted',
      'type' => 'bool',
      'default' => 0,
    ),
    'bus_busmanagment_bus_passengerbus_busmanagment_ida' => 
    array (
      'name' => 'bus_busmanagment_bus_passengerbus_busmanagment_ida',
      'type' => 'id',
    ),
    'bus_busmanagment_bus_passengerbus_passenger_idb' => 
    array (
      'name' => 'bus_busmanagment_bus_passengerbus_passenger_idb',
      'type' => 'id',
    ),
  ),
  'indices' => 
  array (
    0 => 
    array (
      'name' => 'bus_busmanagment_bus_passengerspk',
      'type' => 'primary',
      'fields' => 
      array (
        0 => 'id',
      ),
    ),
    1 => 
    array (
      'name' => 'bus_busmanagment_bus_passenger_ida1',
      'type' => 'index',
      'fields' => 
      array (
        0 => 'bus_busmanagment_bus_passengerbus_busmanagment_ida',
      ),
    ),
    2 => 
    array (
      'name' => 'bus_busmanagment_bus_passenger_alt',
      'type' => 'alternate_key',
      'fields' => 
      array (
        0 => 'bus_busmanagment_bus_passengerbus_passenger_idb',
      ),
    ),
  ),
);