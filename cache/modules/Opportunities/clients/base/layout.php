<?php
$clientCache['Opportunities']['base']['layout'] = array (
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
                    'type' => 'forecast-pipeline',
                    'label' => 'LBL_DASHLET_PIPLINE_NAME',
                    'visibility' => 'user',
                  ),
                  'context' => 
                  array (
                    'module' => 'Forecasts',
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
          'label' => 'LBL_QUOTE_SUBPANEL_TITLE',
          'context' => 
          array (
            'link' => 'quotes',
          ),
        ),
        5 => 
        array (
          'layout' => 'subpanel',
          'label' => 'LBL_PRODUCTS_SUBPANEL_TITLE',
          'context' => 
          array (
            'link' => 'products',
          ),
        ),
        6 => 
        array (
          'layout' => 'subpanel',
          'label' => 'LBL_INVITEE',
          'override_subpanel_list_view' => 'subpanel-for-opportunities',
          'context' => 
          array (
            'link' => 'contacts',
          ),
        ),
        7 => 
        array (
          'layout' => 'subpanel',
          'label' => 'LBL_LEADS_SUBPANEL_TITLE',
          'context' => 
          array (
            'link' => 'leads',
          ),
        ),
        8 => 
        array (
          'layout' => 'subpanel',
          'label' => 'LBL_DOCUMENTS_SUBPANEL_TITLE',
          'context' => 
          array (
            'link' => 'documents',
          ),
        ),
        9 => 
        array (
          'layout' => 'subpanel',
          'label' => 'LBL_CONTRACTS_SUBPANEL_TITLE',
          'context' => 
          array (
            'link' => 'contracts',
          ),
        ),
        10 => 
        array (
          'layout' => 'subpanel',
          'label' => 'LBL_EMAILS_SUBPANEL_TITLE',
          'context' => 
          array (
            'link' => 'archived_emails',
          ),
        ),
        11 => 
        array (
          'layout' => 'subpanel',
          'label' => 'LBL_PROJECTS_SUBPANEL_TITLE',
          'context' => 
          array (
            'link' => 'project',
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
                    'type' => 'forecast-pareto',
                    'label' => 'LBL_DASHLET_FORECASTS_CHART_NAME',
                  ),
                  'context' => 
                  array (
                    'module' => 'Forecasts',
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
                    'type' => 'planned-activities',
                    'label' => 'LBL_PLANNED_ACTIVITIES_DASHLET',
                  ),
                  'width' => 12,
                ),
              ),
              2 => 
              array (
                0 => 
                array (
                  'view' => 
                  array (
                    'name' => 'active-tasks',
                    'label' => 'LBL_ACTIVE_TASKS_DASHLET',
                  ),
                  'width' => 12,
                ),
              ),
              3 => 
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
              4 => 
              array (
                0 => 
                array (
                  'view' => 
                  array (
                    'type' => 'attachments',
                    'label' => 'LBL_DASHLET_ATTACHMENTS_NAME',
                    'limit' => '5',
                    'auto_refresh' => '0',
                  ),
                  'context' => 
                  array (
                    'module' => 'Notes',
                    'link' => 'notes',
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
  'config-drawer' => 
  array (
    'meta' => 
    array (
      'type' => 'config-drawer',
      'components' => 
      array (
        0 => 
        array (
          'layout' => 
          array (
            'components' => 
            array (
              0 => 
              array (
                'layout' => 
                array (
                  'components' => 
                  array (
                    0 => 
                    array (
                      'view' => 'config-header-buttons',
                    ),
                    1 => 
                    array (
                      'layout' => 'config-drawer-content',
                    ),
                  ),
                  'type' => 'simple',
                  'name' => 'main-pane',
                  'span' => 8,
                ),
              ),
              1 => 
              array (
                'layout' => 
                array (
                  'components' => 
                  array (
                    0 => 
                    array (
                      'view' => 'config-drawer-howto',
                    ),
                  ),
                  'type' => 'simple',
                  'name' => 'side-pane',
                  'span' => 4,
                ),
              ),
              2 => 
              array (
                'layout' => 
                array (
                  'components' => 
                  array (
                  ),
                  'type' => 'simple',
                  'name' => 'dashboard-pane',
                  'span' => 4,
                ),
              ),
              3 => 
              array (
                'layout' => 
                array (
                  'components' => 
                  array (
                  ),
                  'type' => 'simple',
                  'name' => 'preview-pane',
                  'span' => 8,
                ),
              ),
            ),
            'type' => 'default',
            'name' => 'sidebar',
            'span' => 12,
          ),
        ),
      ),
      'name' => 'base',
      'span' => 12,
    ),
  ),
  '_hash' => 'd6b6fa07f7888a0f6b3937ef05f7fa4e',
);

