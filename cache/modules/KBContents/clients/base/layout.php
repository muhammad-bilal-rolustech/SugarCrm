<?php
$clientCache['KBContents']['base']['layout'] = array (
  'config-drawer-content' => 
  array (
    'meta' => 
    array (
      'type' => 'config-drawer-content',
      'name' => 'config-drawer-content',
      'components' => 
      array (
        0 => 
        array (
          'view' => 'config-languages',
        ),
      ),
    ),
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
/**
 * @class View.Layouts.Base.KBContentsConfigDrawerContentLayout
 * @alias SUGAR.App.view.layouts.BaseKBContentsConfigDrawerContentLayout
 * @extends View.Layouts.Base.ConfigDrawerContentLayout
 */
({
    extendsFrom: \'ConfigDrawerContentLayout\',

    /**
     * @inheritdoc
     * @override
     */
    _switchHowToData: function(helpId) {
        switch (helpId) {
            case \'config-languages\':
                this.currentHowToData.title = app.lang.get(
                    \'LBL_CONFIG_LANGUAGES_TITLE\',
                    this.module
                );
                this.currentHowToData.text = app.lang.get(
                    \'LBL_CONFIG_LANGUAGES_TEXT\',
                    this.module
                );
                break;
        }
    }
})
',
    ),
  ),
  'records-search-tags' => 
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
    /**
     * @inheritdoc
     */
    initialize: function(options) {
        this._super(\'initialize\', [options]);
        this._initializeCollectionFilterDef(options);
    },

    /**
     * Initialize collection in the sub-sub-component recordlist
     * with specific filterDef using tags for build recordlist
     * filtered by tags.
     *
     * @param {Object} options
     * @private
     */
    _initializeCollectionFilterDef: function(options) {
        if (_.isUndefined(options.def.context.tag)) {
            return;
        }

        var filterDef = {
            filter: [{
                tag: {
                    $in: [{
                        id: false,
                        name: options.def.context.tag
                    }]
                },
                active_rev: {
                    $equals: 1
                }
            }]
        };

        var chain = [\'sidebar\', \'main-pane\', \'list\', \'recordlist\'];
        var recordList = _.reduce(chain, function(component, name) {
            if (!_.isUndefined(component)) {
                return component.getComponent(name);
            }
        }, this);

        if (!_.isUndefined(recordList)) {
            recordList.collection.filterDef = filterDef;
        }
    }
})
',
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
                    'type' => 'dashlet-nestedset-list',
                    'label' => 'LBL_DASHLET_CATEGORIES_NAME',
                    'data_provider' => 'Categories',
                    'config_provider' => 'KBContents',
                    'root_name' => 'category_root',
                    'extra_provider' => 
                    array (
                      'module' => 'KBContents',
                      'field' => 'category_id',
                    ),
                  ),
                  'context' => 
                  array (
                    'module' => 'KBContents',
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
                    'type' => 'kbs-dashlet-most-useful',
                    'label' => 'LBL_DASHLET_MOST_USEFUL_NAME',
                  ),
                  'context' => 
                  array (
                    'module' => 'KBContents',
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
    extendsFrom: \'SubpanelsLayout\',

    /**
     * @inheritdoc
     */
    _pruneNoAccessComponents: function(components) {
        var prunedComponents = [];
        var layoutFromContext = this.context ? this.context.get(\'layout\') || this.context.get(\'layoutName\') : null;
        this.layoutType = layoutFromContext ? layoutFromContext : app.controller.context.get(\'layout\');
        this.aclToCheck = this.aclToCheck || (this.layoutType === \'record\') ? \'view\' : \'list\';
        _.each(components, function(component) {
            var relatedModule,
                link = component.context ? component.context.link : null;
            if (link) {
                relatedModule = app.data.getRelatedModule(this.module, link);
                var aclToCheck = component.acl_action || this.aclToCheck;
                if (!relatedModule || relatedModule && app.acl.hasAccess(aclToCheck, relatedModule)) {
                    prunedComponents.push(component);
                }
            }
        }, this);
        return prunedComponents;
    }
})
',
    ),
    'meta' => 
    array (
      'components' => 
      array (
        0 => 
        array (
          'layout' => 'subpanel',
          'label' => 'LBL_LOCALIZATIONS_SUBPANEL_TITLE',
          'override_subpanel_list_view' => 'subpanel-for-localizations',
          'override_paneltop_view' => 'panel-top-for-localizations',
          'context' => 
          array (
            'link' => 'localizations',
          ),
        ),
        1 => 
        array (
          'layout' => 'subpanel',
          'label' => 'LBL_REVISIONS_SUBPANEL_TITLE',
          'override_subpanel_list_view' => 'subpanel-for-revisions',
          'override_paneltop_view' => 'panel-top-for-revisions',
          'context' => 
          array (
            'link' => 'revisions',
          ),
        ),
        2 => 
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
  'config-drawer' => 
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
/**
 * @class View.Layouts.Base.KBContentsConfigDrawerLayout
 * @alias SUGAR.App.view.layouts.BaseKBContentsConfigDrawerLayout
 * @extends View.Layouts.Base.ConfigDrawerLayout
 */
({

    extendsFrom: \'ConfigDrawerLayout\',

    /**
     * @inheritdoc
     */
    _checkModuleAccess: function() {
        var acls = app.user.getAcls().KBContents,
            isSysAdmin = (app.user.get(\'type\') == \'admin\'),
            isAdmin = (!_.has(acls, \'admin\'));
        isDev = (!_.has(acls, \'developer\'));
        return (isSysAdmin || isAdmin || isDev);
    }
})
',
    ),
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
                    'type' => 'kbs-dashlet-usefulness',
                    'label' => 'LBL_DASHLET_USEFULNESS_NAME',
                  ),
                  'context' => 
                  array (
                    'module' => 'KBContents',
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
                    'type' => 'kbs-dashlet-localizations',
                    'label' => 'LBL_DASHLET_LOCALIZATIONS_NAME',
                  ),
                  'context' => 
                  array (
                    'module' => 'KBContents',
                    'filter' => 
                    array (
                      'module' => 
                      array (
                        0 => 'KBContents',
                      ),
                      'view' => 'record',
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
      'name' => 'LBL_DEFAULT_DASHBOARD_TITLE',
    ),
  ),
  'prefiltered' => 
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
                      'view' => 'prefiltered-headerpane',
                    ),
                    1 => 
                    array (
                      'layout' => 
                      array (
                        'type' => 'filterpanel',
                        'span' => 12,
                        'availableToggles' => 
                        array (
                        ),
                        'filter_options' => 
                        array (
                          'stickiness' => false,
                        ),
                        'components' => 
                        array (
                          0 => 
                          array (
                            'layout' => 
                            array (
                              'meta' => 
                              array (
                                'components' => 
                                array (
                                  0 => 
                                  array (
                                    'view' => 'filter-filter-dropdown',
                                  ),
                                  1 => 
                                  array (
                                    'view' => 'filter-quicksearch',
                                  ),
                                ),
                                'last_state' => 
                                array (
                                  'id' => 'filter',
                                ),
                                'layoutType' => 'records',
                              ),
                              'span' => 12,
                              'type' => 'filter',
                            ),
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
                            'view' => 'prefilteredlist',
                          ),
                          4 => 
                          array (
                            'view' => 'list-bottom',
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
      'type' => 'prefiltered',
      'name' => 'base',
      'span' => 12,
    ),
  ),
  'create' => 
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
                      'view' => 'create',
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
                    0 => 
                    array (
                      'view' => 'help-create',
                    ),
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
      'type' => 'simple',
      'name' => 'base',
      'span' => 12,
    ),
  ),
  '_hash' => '0aa04957fa4406ae837f73ee6cdb99f1',
);

