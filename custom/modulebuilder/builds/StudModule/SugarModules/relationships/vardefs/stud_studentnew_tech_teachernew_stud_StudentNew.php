<?php
// created: 2017-08-28 12:23:18
$dictionary["stud_StudentNew"]["fields"]["stud_studentnew_tech_teachernew"] = array (
  'name' => 'stud_studentnew_tech_teachernew',
  'type' => 'link',
  'relationship' => 'stud_studentnew_tech_teachernew',
  'source' => 'non-db',
  'module' => 'tech_TeacherNew',
  'bean_name' => 'tech_TeacherNew',
  'side' => 'right',
  'vname' => 'LBL_STUD_STUDENTNEW_TECH_TEACHERNEW_FROM_STUD_STUDENTNEW_TITLE',
  'id_name' => 'stud_studentnew_tech_teachernewtech_teachernew_ida',
  'link-type' => 'one',
);
$dictionary["stud_StudentNew"]["fields"]["stud_studentnew_tech_teachernew_name"] = array (
  'name' => 'stud_studentnew_tech_teachernew_name',
  'type' => 'relate',
  'source' => 'non-db',
  'vname' => 'LBL_STUD_STUDENTNEW_TECH_TEACHERNEW_FROM_TECH_TEACHERNEW_TITLE',
  'save' => true,
  'id_name' => 'stud_studentnew_tech_teachernewtech_teachernew_ida',
  'link' => 'stud_studentnew_tech_teachernew',
  'table' => 'tech_teachernew',
  'module' => 'tech_TeacherNew',
  'rname' => 'name',
);
$dictionary["stud_StudentNew"]["fields"]["stud_studentnew_tech_teachernewtech_teachernew_ida"] = array (
  'name' => 'stud_studentnew_tech_teachernewtech_teachernew_ida',
  'type' => 'id',
  'source' => 'non-db',
  'vname' => 'LBL_STUD_STUDENTNEW_TECH_TEACHERNEW_FROM_STUD_STUDENTNEW_TITLE_ID',
  'id_name' => 'stud_studentnew_tech_teachernewtech_teachernew_ida',
  'link' => 'stud_studentnew_tech_teachernew',
  'table' => 'tech_teachernew',
  'module' => 'tech_TeacherNew',
  'rname' => 'id',
  'reportable' => false,
  'side' => 'right',
  'massupdate' => false,
  'duplicate_merge' => 'disabled',
  'hideacl' => true,
);
