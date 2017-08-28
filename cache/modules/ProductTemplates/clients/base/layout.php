<?php
$clientCache['ProductTemplates']['base']['layout'] = array (
  'filterpanel' => 
  array (
    'controller' => 
    array (
      'base' => '/*
 * Your installation or use of this SugarCRM file is subject to the applicable
 * terms available at
 * http://support.sugarcrm.com/06_Customer_Center/10_Master_Subscription_Agreements/.
 * If you do not agree to all of the applicable terms or do not have the
 * authority to bind the entity as an authorized representative, then do not
 * install or use this SugarCRM file.
 *
 * Copyright (C) SugarCRM Inc. All rights reserved.
 */

({
    extendsFrom: \'FilterpanelLayout\',

    /**
     * @inheritdoc
     */
    initialize: function(options) {

        this._super(\'initialize\', [options]);

        if (this.context.get(\'layout\') === \'record\') {
            var hasSubpanels = false,
                layouts = app.metadata.getModule(options.module, \'layouts\');
            if (layouts && layouts.subpanels && layouts.subpanels.meta) {
                hasSubpanels = (layouts.subpanels.meta.components.length > 0);
            }

            if (!hasSubpanels) {
                this.before(\'render\', function() {
                    return false;
                }, this);

                this.template = app.template.empty;
                this.$el.html(this.template());
            }
        }
    }
})
',
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
                'layout' => 
                array (
                  'components' => 
                  array (
                    0 => 
                    array (
                      'view' => 'record',
                      'primary' => true,
                    ),
                    1 => 
                    array (
                      'layout' => 'extra-info',
                    ),
                    2 => 
                    array (
                      'layout' => 
                      array (
                        'name' => 'filterpanel',
                        'span' => 12,
                        'last_state' => 
                        array (
                          'id' => 'record-filterpanel',
                          'defaults' => 
                          array (
                            'toggle-view' => 'subpanels',
                          ),
                        ),
                        'availableToggles' => 
                        array (
                          0 => 
                          array (
                            'name' => 'subpanels',
                            'icon' => 'fa-table',
                            'label' => 'LBL_DATA_VIEW',
                          ),
                          1 => 
                          array (
                            'name' => 'list',
                            'icon' => 'fa-table',
                            'label' => 'LBL_LISTVIEW',
                          ),
                          2 => 
                          array (
                            'name' => 'activitystream',
                            'icon' => 'fa-clock-o',
                            'label' => 'LBL_ACTIVITY_STREAM',
                          ),
                        ),
                        'components' => 
                        array (
                          0 => 
                          array (
                            'layout' => 'filter',
                            'targetEl' => '.filter',
                            'position' => 'prepend',
                          ),
                          1 => 
                          array (
                            'view' => 'filter-rows',
                            'targetEl' => '.filter-options',
                          ),
                          2 => 
                          array (
                            'view' => 'filter-actions',
                            'targetEl' => '.filter-options',
                          ),
                          3 => 
                          array (
                            'layout' => 'activitystream',
                            'context' => 
                            array (
                              'module' => 'Activities',
                            ),
                          ),
                          4 => 
                          array (
                            'layout' => 'subpanels',
                          ),
                        ),
                      ),
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
                      'layout' => 
                      array (
                        'type' => 'dashboard',
                        'last_state' => 
                        array (
                          'id' => 'last-visit',
                        ),
                      ),
                      'context' => 
                      array (
                        'forceNew' => true,
                        'module' => 'Home',
                      ),
                    ),
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
      'type' => 'record',
      'name' => 'base',
      'span' => 12,
    ),
  ),
  'subpanels' => 
  array (
    'meta' => 
    array (
      'components' => 
      array (
      ),
    ),
  ),
  '_hash' => '75b482dcc7cac6b921aea6c6736771ee',
);

