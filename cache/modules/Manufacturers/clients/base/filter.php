<?php
$clientCache['Manufacturers']['base']['filter'] = array (
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
          'name' => 'LBL_MODULE_NAME',
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
      'quicksearch_field' => 
      array (
        0 => 'name',
      ),
      'quicksearch_priority' => 1,
    ),
  ),
  '_hash' => '2f08fc0c878bc77f6935bb7fff5d769f',
);

