<?php
$clientCache['Releases']['base']['filter'] = array (
  'basic' => 
  array (
    'meta' => 
    array (
      'create' => false,
      'filters' => 
      array (
        0 => 
        array (
          'id' => 'all_records',
          'name' => 'LBL_ACTIVE_RELEASES',
          'filter_definition' => 
          array (
            'status' => 
            array (
              '$in' => 
              array (
                0 => 'Active',
              ),
            ),
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
      'default_filter' => 'all_records',
    ),
  ),
  '_hash' => '3f3ef35b6e8a7e91dbe548cfe02213d2',
);

