<?php
$clientCache['Bugs']['base']['layout'] = array (
  'tabbed-layout' => 
  array (
    'meta' => 
    array (
      'components' => 
      array (
      ),
      'type' => 'simple',
      'span' => 12,
    ),
  ),
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
                    'type' => 'twitter',
                    'label' => 'LBL_TWITTER_NAME',
                    'twitter' => 'sugarcrm',
                    'limit' => '5',
                  ),
                  'context' => 
                  array (
                    'module' => 'Home',
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
          'label' => 'LBL_CALLS_SUBPANEL_TITLE',
          'context' => 
          array (
            'link' => 'calls',
          ),
        ),
        1 => 
        array (
          'layout' => 'subpanel',
          'label' => 'LBL_MEETINGS_SUBPANEL_TITLE',
          'context' => 
          array (
            'link' => 'meetings',
          ),
        ),
        2 => 
        array (
          'layout' => 'subpanel',
          'label' => 'LBL_TASKS_SUBPANEL_TITLE',
          'context' => 
          array (
            'link' => 'tasks',
          ),
        ),
        3 => 
        array (
          'layout' => 'subpanel',
          'label' => 'LBL_NOTES_SUBPANEL_TITLE',
          'context' => 
          array (
            'link' => 'notes',
          ),
        ),
        4 => 
        array (
          'layout' => 'subpanel',
          'label' => 'LBL_DOCUMENTS_SUBPANEL_TITLE',
          'context' => 
          array (
            'link' => 'documents',
          ),
        ),
        5 => 
        array (
          'layout' => 'subpanel',
          'label' => 'LBL_CONTACTS_SUBPANEL_TITLE',
          'context' => 
          array (
            'link' => 'contacts',
          ),
        ),
        6 => 
        array (
          'layout' => 'subpanel',
          'label' => 'LBL_ACCOUNTS_SUBPANEL_TITLE',
          'context' => 
          array (
            'link' => 'accounts',
          ),
        ),
        7 => 
        array (
          'layout' => 'subpanel',
          'label' => 'LBL_CASES_SUBPANEL_TITLE',
          'context' => 
          array (
            'link' => 'cases',
          ),
        ),
        8 => 
        array (
          'layout' => 'subpanel',
          'label' => 'LBL_PROJECTS_SUBPANEL_TITLE',
          'context' => 
          array (
            'link' => 'project',
          ),
        ),
        9 => 
        array (
          'layout' => 'subpanel',
          'label' => 'LBL_EMAILS_SUBPANEL_TITLE',
          'context' => 
          array (
            'link' => 'emails',
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
                    'type' => 'planned-activities',
                    'label' => 'LBL_PLANNED_ACTIVITIES_DASHLET',
                  ),
                  'width' => 12,
                ),
              ),
              1 => 
              array (
                0 => 
                array (
                  'view' => 
                  array (
                    'type' => 'history',
                    'label' => 'LBL_HISTORY_DASHLET',
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
  '_hash' => 'a2e00a14623689251ed123e6d2f05654',
);

