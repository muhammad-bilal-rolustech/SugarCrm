<?php
$clientCache['Meetings']['base']['layout'] = array (
  'list-dashboard' => 
  array (
    'meta' => 
    array (
      'metadata' => 
      array (
        'components' => 
        array (
          0 => 
          array (
            'rows' => 
            array (
              0 => 
              array (
                0 => 
                array (
                  'view' => 
                  array (
                    'type' => 'dashablelist',
                    'label' => 'LBL_MY_SCHEDULED_MEETINGS',
                    'display_columns' => 
                    array (
                      0 => 'date_start',
                      1 => 'name',
                      2 => 'parent_name',
                    ),
                    'filter_id' => 'my_scheduled_meetings',
                  ),
                  'context' => 
                  array (
                    'module' => 'Meetings',
                  ),
                  'width' => 12,
                ),
              ),
            ),
            'width' => 12,
          ),
        ),
      ),
      'name' => 'LBL_DEFAULT_DASHBOARD_TITLE',
    ),
  ),
  'subpanels' => 
  array (
    'meta' => 
    array (
      'components' => 
      array (
        0 => 
        array (
          'layout' => 'subpanel',
          'label' => 'LBL_NOTES_SUBPANEL_TITLE',
          'context' => 
          array (
            'link' => 'notes',
          ),
        ),
      ),
    ),
  ),
  'record-dashboard' => 
  array (
    'meta' => 
    array (
      'metadata' => 
      array (
        'components' => 
        array (
          0 => 
          array (
            'rows' => 
            array (
              0 => 
              array (
                0 => 
                array (
                  'view' => 
                  array (
                    'type' => 'dashablelist',
                    'label' => 'LBL_MY_SCHEDULED_MEETINGS',
                    'display_columns' => 
                    array (
                      0 => 'date_start',
                      1 => 'name',
                      2 => 'parent_name',
                    ),
                    'filter_id' => 'my_scheduled_meetings',
                  ),
                  'context' => 
                  array (
                    'module' => 'Meetings',
                  ),
                  'width' => 12,
                ),
              ),
            ),
            'width' => 12,
          ),
        ),
      ),
      'name' => 'LBL_DEFAULT_DASHBOARD_TITLE',
    ),
  ),
  '_hash' => '105bda968b013a1d0f9d8f036673b5d5',
);

