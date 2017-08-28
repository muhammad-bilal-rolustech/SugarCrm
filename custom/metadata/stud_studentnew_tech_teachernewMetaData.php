<?php
// created: 2017-08-28 12:23:18
$dictionary["stud_studentnew_tech_teachernew"] = array (
  'true_relationship_type' => 'one-to-many',
  'relationships' => 
  array (
    'stud_studentnew_tech_teachernew' => 
    array (
      'lhs_module' => 'tech_TeacherNew',
      'lhs_table' => 'tech_teachernew',
      'lhs_key' => 'id',
      'rhs_module' => 'stud_StudentNew',
      'rhs_table' => 'stud_studentnew',
      'rhs_key' => 'id',
      'relationship_type' => 'many-to-many',
      'join_table' => 'stud_studentnew_tech_teachernew_c',
      'join_key_lhs' => 'stud_studentnew_tech_teachernewtech_teachernew_ida',
      'join_key_rhs' => 'stud_studentnew_tech_teachernewstud_studentnew_idb',
    ),
  ),
  'table' => 'stud_studentnew_tech_teachernew_c',
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
    'stud_studentnew_tech_teachernewtech_teachernew_ida' => 
    array (
      'name' => 'stud_studentnew_tech_teachernewtech_teachernew_ida',
      'type' => 'id',
    ),
    'stud_studentnew_tech_teachernewstud_studentnew_idb' => 
    array (
      'name' => 'stud_studentnew_tech_teachernewstud_studentnew_idb',
      'type' => 'id',
    ),
  ),
  'indices' => 
  array (
    0 => 
    array (
      'name' => 'stud_studentnew_tech_teachernewspk',
      'type' => 'primary',
      'fields' => 
      array (
        0 => 'id',
      ),
    ),
    1 => 
    array (
      'name' => 'stud_studentnew_tech_teachernew_ida1',
      'type' => 'index',
      'fields' => 
      array (
        0 => 'stud_studentnew_tech_teachernewtech_teachernew_ida',
      ),
    ),
    2 => 
    array (
      'name' => 'stud_studentnew_tech_teachernew_alt',
      'type' => 'alternate_key',
      'fields' => 
      array (
        0 => 'stud_studentnew_tech_teachernewstud_studentnew_idb',
      ),
    ),
  ),
);