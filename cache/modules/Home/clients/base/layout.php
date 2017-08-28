<?php
$clientCache['Home']['base']['layout'] = array (
  'search-dashboard' => 
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
                    'type' => 'search-facet',
                    'facet_id' => 'assigned_user_id',
                    'custom_toolbar' => 'no',
                    'label' => 'LBL_FACET_ASSIGNED_TO_ME',
                    'ui_type' => 'single',
                  ),
                  'width' => 12,
                ),
                1 => 
                array (
                  'view' => 
                  array (
                    'type' => 'search-facet',
                    'facet_id' => 'favorite_link',
                    'custom_toolbar' => 'no',
                    'label' => 'LBL_FACET_MY_FAVORITES',
                    'ui_type' => 'single',
                  ),
                  'width' => 12,
                ),
                2 => 
                array (
                  'view' => 
                  array (
                    'type' => 'search-facet',
                    'facet_id' => 'created_by',
                    'custom_toolbar' => 'no',
                    'label' => 'LBL_FACET_CREATED_BY_ME',
                    'ui_type' => 'single',
                  ),
                  'width' => 12,
                ),
                3 => 
                array (
                  'view' => 
                  array (
                    'type' => 'search-facet',
                    'facet_id' => 'modified_user_id',
                    'custom_toolbar' => 'no',
                    'label' => 'LBL_FACET_MODIFIED_BY_ME',
                    'ui_type' => 'single',
                  ),
                  'width' => 12,
                ),
                4 => 
                array (
                  'view' => 
                  array (
                    'type' => 'search-facet',
                    'label' => 'LBL_FACET_MODULES',
                    'facet_id' => 'modules',
                    'ui_type' => 'multi',
                    'custom_toolbar' => 
                    array (
                      'buttons' => 
                      array (
                        0 => 
                        array (
                          'type' => 'dashletaction',
                          'css_class' => 'dashlet-toggle btn btn-invisible minify',
                          'icon' => 'fa-chevron-up',
                          'action' => 'toggleMinify',
                          'tooltip' => 'LBL_DASHLET_TOGGLE',
                        ),
                      ),
                    ),
                  ),
                  'width' => 12,
                ),
              ),
            ),
            'width' => 12,
          ),
        ),
      ),
      'dashboard_type' => 'search-dashboard',
      'name' => 'LBL_FACETS_DASHBOARD_TITLE',
      'css_class' => 'facets-dashboard',
      'drag_and_drop' => false,
    ),
  ),
  'about' => 
  array (
    'meta' => 
    array (
      'type' => 'simple',
      'name' => 'about',
      'css_class' => 'row-fluid',
      'components' => 
      array (
        0 => 
        array (
          'layout' => 
          array (
            'type' => 'simple',
            'css_class' => 'main-pane span12',
            'components' => 
            array (
              0 => 
              array (
                'view' => 'about-headerpane',
              ),
              1 => 
              array (
                'layout' => 
                array (
                  'type' => 'fluid',
                  'components' => 
                  array (
                    0 => 
                    array (
                      'layout' => 
                      array (
                        'type' => 'simple',
                        'span' => 12,
                        'components' => 
                        array (
                          0 => 
                          array (
                            'view' => 'about-copyright',
                          ),
                        ),
                      ),
                    ),
                  ),
                ),
              ),
              2 => 
              array (
                'layout' => 
                array (
                  'type' => 'fluid',
                  'components' => 
                  array (
                    0 => 
                    array (
                      'layout' => 
                      array (
                        'type' => 'simple',
                        'span' => 6,
                        'components' => 
                        array (
                          0 => 
                          array (
                            'view' => 'about-resources',
                          ),
                        ),
                      ),
                    ),
                    1 => 
                    array (
                      'layout' => 
                      array (
                        'type' => 'simple',
                        'span' => 6,
                        'components' => 
                        array (
                          0 => 
                          array (
                            'view' => 'about-source-code',
                          ),
                        ),
                      ),
                    ),
                  ),
                ),
              ),
            ),
          ),
        ),
      ),
    ),
  ),
  'record' => 
  array (
    'meta' => 
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
                'view' => 'dashboard-headerpane',
              ),
              1 => 
              array (
                'layout' => 'dashlet-main',
              ),
            ),
            'type' => 'simple',
            'name' => 'list',
            'span' => 12,
          ),
        ),
      ),
      'type' => 'dashboard',
      'span' => 12,
      'method' => 'record',
      'last_state' => 
      array (
        'id' => 'last-visit',
      ),
    ),
  ),
  'records' => 
  array (
    'meta' => 
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
                'layout' => 
                array (
                  'components' => 
                  array (
                    0 => 
                    array (
                      'layout' => 'list',
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
                  ),
                  'type' => 'simple',
                  'name' => 'dashboard-pane',
                  'span' => 4,
                ),
              ),
              2 => 
              array (
                'layout' => 
                array (
                  'components' => 
                  array (
                    0 => 
                    array (
                      'layout' => 'preview',
                    ),
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
      'type' => 'records',
      'name' => 'base',
      'span' => 12,
    ),
  ),
  'list' => 
  array (
    'meta' => 
    array (
      'components' => 
      array (
        0 => 
        array (
          'view' => 'dashboard-headerpane',
        ),
      ),
      'type' => 'dashboard',
      'span' => 12,
      'last_state' => 
      array (
        'id' => 'last-visit',
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
                    'type' => 'learning-resources',
                    'label' => 'LBL_LEARNING_RESOURCES_NAME',
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
                    'type' => 'twitter',
                    'label' => 'LBL_DASHLET_RECENT_TWEETS_SUGARCRM_NAME',
                    'twitter' => 'sugarcrm',
                    'limit' => 20,
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
                    'type' => 'dashablelist',
                    'label' => 'TPL_DASHLET_MY_MODULE',
                    'display_columns' => 
                    array (
                      0 => 'full_name',
                      1 => 'account_name',
                      2 => 'phone_work',
                      3 => 'title',
                    ),
                    'limit' => 15,
                  ),
                  'context' => 
                  array (
                    'module' => 'Contacts',
                  ),
                  'width' => 12,
                ),
              ),
            ),
            'width' => 4,
          ),
          1 => 
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
              1 => 
              array (
                0 => 
                array (
                  'view' => 
                  array (
                    'type' => 'bubblechart',
                    'label' => 'LBL_DASHLET_TOP10_SALES_OPPORTUNITIES_NAME',
                    'filter_duration' => 'current',
                    'visibility' => 'user',
                  ),
                  'width' => 12,
                ),
              ),
            ),
            'width' => 8,
          ),
        ),
      ),
      'name' => 'LBL_DEFAULT_DASHBOARD_TITLE',
    ),
  ),
  '_hash' => 'ffe5e424fca9f338577f9a0ece8764dd',
);

