<?php
$clientCache['Activities']['base']['filter'] = array (
  'activity' => 
  array (
    'meta' => 
    array (
      'create' => false,
      'default_filter' => 'all_records',
      'quicksearch_field' => 
      array (
      ),
      'quicksearch_priority' => 2,
      'filters' => 
      array (
        0 => 
        array (
          'id' => 'all_records',
          'name' => 'LBL_LISTVIEW_FILTER_ALL',
          'filter_definition' => 
          array (
          ),
          'editable' => false,
        ),
        1 => 
        array (
          'id' => 'messages_for_create',
          'name' => 'LBL_ACTIVITY_CREATE',
          'filter_definition' => 
          array (
            '$or' => 
            array (
              0 => 
              array (
                'activity_type' => 'create',
              ),
              1 => 
              array (
                'activity_type' => 'attach',
              ),
            ),
          ),
          'editable' => false,
        ),
        2 => 
        array (
          'id' => 'messages_for_update',
          'name' => 'LBL_ACTIVITY_UPDATE',
          'filter_definition' => 
          array (
            'activity_type' => 'update',
          ),
          'editable' => false,
        ),
        3 => 
        array (
          'id' => 'messages_for_link',
          'name' => 'LBL_ACTIVITY_LINK',
          'filter_definition' => 
          array (
            'activity_type' => 'link',
          ),
          'editable' => false,
        ),
        4 => 
        array (
          'id' => 'messages_for_unlink',
          'name' => 'LBL_ACTIVITY_UNLINK',
          'filter_definition' => 
          array (
            'activity_type' => 'unlink',
          ),
          'editable' => false,
        ),
        5 => 
        array (
          'id' => 'messages_for_post',
          'name' => 'LBL_ACTIVITY_POST',
          'filter_definition' => 
          array (
            'activity_type' => 'post',
          ),
          'editable' => false,
        ),
      ),
    ),
  ),
  '_hash' => '3b9897fedff56d49a96ef77ad45b3b25',
);

