<?php
// created: 2017-08-29 12:28:12
$dictionary["bus_room_bus_chair"] = array (
  'true_relationship_type' => 'many-to-many',
  'relationships' => 
  array (
    'bus_room_bus_chair' => 
    array (
      'lhs_module' => 'bus_Room',
      'lhs_table' => 'bus_room',
      'lhs_key' => 'id',
      'rhs_module' => 'bus_Chair',
      'rhs_table' => 'bus_chair',
      'rhs_key' => 'id',
      'relationship_type' => 'many-to-many',
      'join_table' => 'bus_room_bus_chair_c',
      'join_key_lhs' => 'bus_room_bus_chairbus_room_ida',
      'join_key_rhs' => 'bus_room_bus_chairbus_chair_idb',
    ),
  ),
  'table' => 'bus_room_bus_chair_c',
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
    'bus_room_bus_chairbus_room_ida' => 
    array (
      'name' => 'bus_room_bus_chairbus_room_ida',
      'type' => 'id',
    ),
    'bus_room_bus_chairbus_chair_idb' => 
    array (
      'name' => 'bus_room_bus_chairbus_chair_idb',
      'type' => 'id',
    ),
  ),
  'indices' => 
  array (
    0 => 
    array (
      'name' => 'bus_room_bus_chairspk',
      'type' => 'primary',
      'fields' => 
      array (
        0 => 'id',
      ),
    ),
    1 => 
    array (
      'name' => 'bus_room_bus_chair_alt',
      'type' => 'alternate_key',
      'fields' => 
      array (
        0 => 'bus_room_bus_chairbus_room_ida',
        1 => 'bus_room_bus_chairbus_chair_idb',
      ),
    ),
  ),
);