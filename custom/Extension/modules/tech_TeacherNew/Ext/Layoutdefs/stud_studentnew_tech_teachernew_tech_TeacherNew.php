<?php
 // created: 2017-08-28 12:23:18
$layout_defs["tech_TeacherNew"]["subpanel_setup"]['stud_studentnew_tech_teachernew'] = array (
  'order' => 100,
  'module' => 'stud_StudentNew',
  'subpanel_name' => 'default',
  'sort_order' => 'asc',
  'sort_by' => 'id',
  'title_key' => 'LBL_STUD_STUDENTNEW_TECH_TEACHERNEW_FROM_STUD_STUDENTNEW_TITLE',
  'get_subpanel_data' => 'stud_studentnew_tech_teachernew',
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
