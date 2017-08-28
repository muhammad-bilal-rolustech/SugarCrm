<?php
$clientCache['UserSignatures']['base']['filter'] = array (
  'basic' => 
  array (
    'meta' => 
    array (
      'create' => false,
      'quicksearch_field' => 
      array (
        0 => 'name',
      ),
      'quicksearch_priority' => 1,
      'quicksearch_split_terms' => false,
      'filters' => 
      array (
        0 => 
        array (
          'id' => 'all_records',
          'name' => 'LBL_LISTVIEW_FILTER_ALL',
          'filter_definition' => 
          array (
            '$creator' => '',
          ),
          'editable' => false,
        ),
        1 => 
        array (
          'id' => 'created_by_me',
          'name' => 'LBL_CREATED_BY_ME',
          'filter_definition' => 
          array (
            '$creator' => '',
          ),
          'editable' => false,
        ),
      ),
    ),
  ),
  'default' => 
  array (
    'meta' => 
    array (
      'default_filter' => 'created_by_me',
    ),
  ),
  '_hash' => '326e51945f84047a04e2997a4c01a823',
);

