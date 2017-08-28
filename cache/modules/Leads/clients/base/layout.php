<?php
$clientCache['Leads']['base']['layout'] = array (
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
          'label' => 'LBL_CAMPAIGN_LIST_SUBPANEL_TITLE',
          'context' => 
          array (
            'link' => 'campaigns',
          ),
        ),
        5 => 
        array (
          'layout' => 'subpanel',
          'label' => 'LBL_EMAILS_SUBPANEL_TITLE',
          'context' => 
          array (
            'link' => 'archived_emails',
          ),
        ),
      ),
    ),
  ),
  'convert' => 
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
                      'view' => 'convert-headerpane',
                    ),
                    1 => 
                    array (
                      'layout' => 'convert-main',
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
      'type' => 'simple',
      'name' => 'base',
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
                    'type' => 'dashablelist',
                    'label' => 'TPL_DASHLET_MY_MODULE',
                    'display_columns' => 
                    array (
                      0 => 'name',
                      1 => 'billing_address_country',
                      2 => 'billing_address_city',
                    ),
                  ),
                  'context' => 
                  array (
                    'module' => 'Accounts',
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
  'extra-info' => 
  array (
    'meta' => 
    array (
      'components' => 
      array (
        0 => 
        array (
          'view' => 'convert-results',
        ),
      ),
      'type' => 'simple',
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
  'convert-main' => 
  array (
    'meta' => 
    array (
      'modules' => 
      array (
        0 => 
        array (
          'module' => 'Contacts',
          'required' => true,
          'copyData' => true,
          'duplicateCheckOnStart' => true,
          'fieldMapping' => 
          array (
          ),
          'hiddenFields' => 
          array (
            'account_name' => 'Accounts',
          ),
        ),
        1 => 
        array (
          'module' => 'Accounts',
          'required' => true,
          'copyData' => true,
          'duplicateCheckOnStart' => true,
          'duplicateCheckRequiredFields' => 
          array (
            0 => 'name',
          ),
          'contactRelateField' => 'account_name',
          'fieldMapping' => 
          array (
            'name' => 'account_name',
            'billing_address_street' => 'primary_address_street',
            'billing_address_city' => 'primary_address_city',
            'billing_address_state' => 'primary_address_state',
            'billing_address_postalcode' => 'primary_address_postalcode',
            'billing_address_country' => 'primary_address_country',
            'shipping_address_street' => 'primary_address_street',
            'shipping_address_city' => 'primary_address_city',
            'shipping_address_state' => 'primary_address_state',
            'shipping_address_postalcode' => 'primary_address_postalcode',
            'shipping_address_country' => 'primary_address_country',
            'phone_office' => 'phone_work',
          ),
        ),
        2 => 
        array (
          'module' => 'Opportunities',
          'required' => false,
          'copyData' => true,
          'duplicateCheckOnStart' => false,
          'duplicateCheckRequiredFields' => 
          array (
            0 => 'account_id',
          ),
          'fieldMapping' => 
          array (
            'name' => 'opportunity_name',
            'phone_work' => 'phone_office',
          ),
          'dependentModules' => 
          array (
            'Accounts' => 
            array (
              'fieldMapping' => 
              array (
                'account_id' => 'id',
              ),
            ),
          ),
          'hiddenFields' => 
          array (
            'account_name' => 'Accounts',
          ),
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
({
    /**
     * @inheritdoc
     */
    initialize: function(options) {
        this.convertPanels = {};
        this.associatedModels = {};
        this.dependentModules = {};
        this.noAccessRequiredModules = [];

        app.view.Layout.prototype.initialize.call(this, options);

        this.meta.modules = this.filterModulesByACL(this.meta.modules);

        this.initializeOptions(this.meta.modules);

        //create and place all the accordion panels
        this.initializePanels(this.meta.modules);

        //listen for panel status updates
        this.context.on(\'lead:convert-panel:complete\', this.handlePanelComplete, this);
        this.context.on(\'lead:convert-panel:reset\', this.handlePanelReset, this);

        //listen for Save button click in headerpane
        this.context.on(\'lead:convert:save\', this.handleSave, this);

        this.before(\'render\', this.checkRequiredAccess);
    },

    /**
     * Create a new object with only modules the user has create access to and
     * build list of required modules the user does not have create access to.
     *
     * @param {Object} modulesMetadata
     * @return {Object}
     */
    filterModulesByACL: function(modulesMetadata) {
        var filteredModulesMetadata = {};

        _.each(modulesMetadata, function(moduleMeta, key) {
            //strip out modules that user does not have create access to
            if (app.acl.hasAccess(\'create\', moduleMeta.module)) {
                filteredModulesMetadata[key] = moduleMeta;
            } else if (moduleMeta.required === true) {
                this.noAccessRequiredModules.push(moduleMeta.module);
            }
        }, this);

        return filteredModulesMetadata;
    },

    /**
     * Create an options section on top of convert panels that presents options
     * when converting a lead (specifically, which modules to copy/move
     * activities to).
     *
     * @param {Object} modulesMetadata
     */
    initializeOptions: function(modulesMetadata) {
        var view,
            convertModuleList = [];

        _.each(modulesMetadata, function(moduleMeta) {
            var moduleSingular = this.getModuleSingular(moduleMeta.module);
            convertModuleList.push({
                id: moduleMeta.module,
                text: moduleSingular,
                required: moduleMeta.required
            });
        }, this);

        this.context.set(\'convertModuleList\', convertModuleList);
        view = app.view.createView({
            context: this.context,
            layout: this,
            name: \'convert-options\',
            type: \'convert-options\',
            platform: this.options.platform
        });

        this.addComponent(view);
    },

    /**
     * Iterate over the modules defined in convert-main.php
     * Create a convert panel for each module defined there
     *
     * @param {Object} modulesMetadata
     */
    initializePanels: function(modulesMetadata) {
        var moduleNumber = 1;

        _.each(modulesMetadata, function(moduleMeta) {
            moduleMeta.moduleNumber = moduleNumber++;
            var view = app.view.createLayout({
                context: this.context,
                name: \'convert-panel\',
                layout: this,
                meta: moduleMeta,
                type: \'convert-panel\',
                platform: this.options.platform
            });
            view.initComponents();

            //This is because backbone injects a wrapper element.
            view.$el.addClass(\'accordion-group\');
            view.$el.data(\'module\', moduleMeta.module);

            this.addComponent(view);
            this.convertPanels[moduleMeta.module] = view;
            if (moduleMeta.dependentModules) {
                this.dependentModules[moduleMeta.module] = moduleMeta.dependentModules;
            }
        }, this);
    },

    /**
     * Check if user is missing access to any required modules
     * @return {boolean}
     */
    checkRequiredAccess: function() {
        //user is missing access to required modules - kick them out
        if (this.noAccessRequiredModules.length > 0) {
            this.denyUserAccess(this.noAccessRequiredModules);
            return false;
        }
        return true;
    },

    /**
     * Close lead convert and notify the user that they are missing required access
     * @param {Array} noAccessRequiredModules
     */
    denyUserAccess: function(noAccessRequiredModules) {
        var translatedModuleNames = [];

        _.each(noAccessRequiredModules, function(module) {
            translatedModuleNames.push(this.getModuleSingular(module));
        }, this);

        app.alert.show(\'convert_access_denied\', {
            level: \'error\',
            messages: app.lang.get(
                \'LBL_CONVERT_ACCESS_DENIED\',
                this.module,
                {requiredModulesMissing: translatedModuleNames.join(\', \')}
            )
        });
        app.drawer.close();
    },

    /**
     * Retrieve the translated module name
     * @param {string} module
     * @return {string}
     */
    getModuleSingular: function(module) {
        var modulePlural = app.lang.getAppListStrings(\'moduleList\')[module] || module;
        return (app.lang.getAppListStrings(\'moduleListSingular\')[module] || modulePlural);
    },

    _render: function() {
        app.view.Layout.prototype._render.call(this);

        //This is because backbone injects a wrapper element.
        this.$el.addClass(\'accordion\');
        this.$el.attr(\'id\', \'convert-accordion\');

        //apply the accordion to this layout
        this.$(\'.collapse\').collapse({toggle: false, parent: \'#convert-accordion\'});
        this.$(\'.collapse\').on(\'shown hidden\', _.bind(this.handlePanelCollapseEvent, this));

        //copy lead data down to each module when we get the lead data
        this.context.get(\'leadsModel\').fetch({
            success: _.bind(function(model) {
                if (this.context) {
                    this.context.trigger(\'lead:convert:populate\', model);
                }
            }, this)
        });
    },

    /**
     * Catch collapse shown/hidden events and notify the panels via the context
     * @param {Event} event
     */
    handlePanelCollapseEvent: function(event) {
        //only respond to the events directly on the collapse (was getting events from tooltip propagated up
        if (event.target !== event.currentTarget) {
            return;
        }
        var module = $(event.currentTarget).data(\'module\');
        this.context.trigger(\'lead:convert:\' + module + \':\' + event.type);
    },

    /**
     * When a panel is complete, add the model to the associatedModels array and notify any dependent modules
     * @param {string} module that was completed
     * @param {Data.Bean} model
     */
    handlePanelComplete: function(module, model) {
        this.associatedModels[module] = model;
        this.handlePanelUpdate();
        this.context.trigger(\'lead:convert:\' + module + \':complete\', module, model);
    },

    /**
     * When a panel is reset, remove the model from the associatedModels array and notify any dependent modules
     * @param {string} module
     */
    handlePanelReset: function(module) {
        delete this.associatedModels[module];
        this.handlePanelUpdate();
        this.context.trigger(\'lead:convert:\' + module + \':reset\', module);
    },

    /**
     * When a panel has been updated, check if any module\'s dependencies are met
     * and/or if all required modules have been completed
     */
    handlePanelUpdate: function() {
        this.checkDependentModules();
        this.checkRequired();
    },

    /**
     * Check if each module\'s dependencies are met and enable the panel if they are.
     * Dependencies are defined in the convert-main.php
     */
    checkDependentModules: function() {
        _.each(this.dependentModules, function(dependencies, dependentModuleName) {
            var isEnabled = _.all(dependencies, function(module, moduleName) {
                return (this.associatedModels[moduleName]);
            }, this);
            this.context.trigger(\'lead:convert:\' + dependentModuleName + \':enable\', isEnabled);
        }, this);
    },

    /**
     * Checks if all required modules have been completed
     * Enables the Save button if all are complete
     */
    checkRequired: function() {
        var showSave = _.all(this.meta.modules, function(module) {
            if (module.required) {
                if (!this.associatedModels[module.module]) {
                    return false;
                }
            }
            return true;
        }, this);

        this.context.trigger(\'lead:convert-save:toggle\', showSave);
    },

    /**
     * When save button is clicked, call the Lead Convert API
     */
    handleSave: function() {
        var convertModel, myURL;

        //disable the save button to prevent double click
        this.context.trigger(\'lead:convert-save:toggle\', false);

        app.alert.show(\'processing_convert\', {level: \'process\', title: app.lang.get(\'LBL_SAVING\')});

        convertModel = new Backbone.Model(_.extend(
            {\'modules\' : this.parseEditableFields(this.associatedModels)},
            this.getTransferActivitiesAttributes()
        ));

        myURL = app.api.buildURL(\'Leads\', \'convert\', {id: this.context.get(\'leadsModel\').id});

        // Set field_duplicateBeanId for fields implementing FieldDuplicate
        _.each(this.convertPanels, function(view, module) {
            if (view && view.createView && convertModel.get(\'modules\')[module]) {
                view.createView.model.trigger(\'duplicate:field:prepare:save\', convertModel.get(\'modules\')[module]);
            }
        }, this);

        app.api.call(\'create\', myURL, convertModel, {
            success: _.bind(this.convertSuccess, this),
            error: _.bind(this.convertError, this)
        });
    },

    /**
     * Retrieve the attributes to be added to the convert model to support the
     * transfer activities functionality.
     *
     * @return {Object}
     */
    getTransferActivitiesAttributes: function() {
        var action = app.metadata.getConfig().leadConvActivityOpt,
            optedInToTransfer = this.model.get(\'transfer_activities\');

        return {
            transfer_activities_action: (action === \'move\' && optedInToTransfer) ? \'move\' : \'donothing\'
        };
    },

    /**
     * Returns only the fields for the models that the user is allowed to edit.
     * This method is run in the sync method of data-manager for creating records.
     *
     * @param {Object} models to get fields from.
     * @return {Object} Hash of models with editable fields.
     */
    parseEditableFields: function(models) {
        var filteredModels = {};
        _.each(models, function(associatedModel, associatedModule) {
            filteredModels[associatedModule] = app.data.getEditableFields(associatedModel);
        }, this);

        return filteredModels;
    },


    /**
     * Lead was successfully converted
     */
    convertSuccess: function() {
        this.convertComplete(\'success\', \'LBL_CONVERTLEAD_SUCCESS\', true);
    },

    /**
     * There was a problem converting the lead
     */
    convertError: function() {
        this.convertComplete(\'error\', \'LBL_CONVERTLEAD_ERROR\', false);

        if (!this.disposed) {
            this.context.trigger(\'lead:convert-save:toggle\', true);
        }
    },

    /**
     * Based on success of lead conversion, display the appropriate messages and optionally close the drawer
     * @param {string} level
     * @param {string} message
     * @param {boolean} doClose
     */
    convertComplete: function(level, message, doClose) {
        var leadsModel = this.context.get(\'leadsModel\');
        app.alert.dismiss(\'processing_convert\');
        app.alert.show(\'convert_complete\', {
            level: level,
            messages: app.lang.get(message, this.module, {leadName: app.utils.getRecordName(leadsModel)}),
            autoClose: (level === \'success\')
        });
        if (!this.disposed && doClose) {
            this.context.trigger(\'lead:convert:exit\');
            app.drawer.close();
            app.navigate(this.context, leadsModel, \'record\');
        }
    },

    /**
     * Clean up the jquery events that were added
     * @private
     */
    _dispose: function() {
        this.$(\'.collapse\').off();
        app.view.Layout.prototype._dispose.call(this);
    }
})
',
    ),
  ),
  'convert-panel' => 
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
    extendsFrom: \'ToggleLayout\',

    TOGGLE_DUPECHECK: \'dupecheck\',
    TOGGLE_CREATE: \'create\',

    availableToggles: {
        \'dupecheck\': {},
        \'create\': {}
    },

    //selectors
    accordionHeading: \'.accordion-heading\',
    accordionBody: \'.accordion-body\',

    //turned on, but could be turned into a setting later
    autoCompleteEnabled: true,

    /**
     * @inheritdoc
     */
    initialize: function(options) {
        var convertPanelEvents;

        this.meta = options.meta;
        this._setModuleSpecificValues();

        convertPanelEvents = {};
        convertPanelEvents[\'click .accordion-heading.enabled\'] = \'togglePanel\';
        convertPanelEvents[\'click [name="associate_button"]\'] = \'handleAssociateClick\';
        convertPanelEvents[\'click [name="reset_button"]\'] = \'handleResetClick\';
        this.events = _.extend({}, this.events, convertPanelEvents);
        this.plugins = _.union(this.plugins || [], [
            \'FindDuplicates\'
        ]);

        this.currentState = {
            complete: false,
            dupeSelected: false
        };
        this.toggledOffDupes = false;

        this._super(\'initialize\', [options]);

        this.addSubComponents();

        this.context.on(\'lead:convert:populate\', this.handlePopulateRecords, this);
        this.context.on(\'lead:convert:\' + this.meta.module + \':enable\', this.handleEnablePanel, this);
        this.context.on(\'lead:convert:\' + this.meta.moduleNumber + \':open\', this.handleOpenRequest, this);
        this.context.on(\'lead:convert:exit\', this.turnOffUnsavedChanges, this);
        this.context.on(\'lead:convert:\' + this.meta.module + \':shown\', this.handleShowComponent, this);

        //if this panel is dependent on others - listen for changes and react accordingly
        this.addDependencyListeners();

        //open the first module upon the first autocomplete check completion
        if (this.meta.moduleNumber === 1) {
            this.once(\'lead:autocomplete-check:complete\', this.handleOpenRequest, this);
        }
    },

    /**
     * Retrieve module specific values (like modular singular name and whether
     * dupe check is enabled at a module level).
     * @private
     */
    _setModuleSpecificValues: function() {
        var module = this.meta.module;
        this.meta.modulePlural = app.lang.getAppListStrings(\'moduleList\')[module] || module;
        this.meta.moduleSingular = app.lang.getAppListStrings(\'moduleListSingular\')[module] ||
            this.meta.modulePlural;

        //enable or disable duplicate check
        var moduleMetadata = app.metadata.getModule(module);
        this.meta.enableDuplicateCheck = (moduleMetadata && moduleMetadata.dupCheckEnabled) ||
            this.meta.enableDuplicateCheck ||
            false;
        this.meta.duplicateCheckOnStart = this.meta.enableDuplicateCheck && this.meta.duplicateCheckOnStart;
    },

    /**
     * Used by toggle layout to determine where to place sub-components.
     *
     * @param {Object} component
     * @return {jQuery}
     */
    getContainer: function(component) {
        if (component.name === \'convert-panel-header\') {
            return this.$(\'[data-container="header"]\');
        } else {
            return this.$(\'[data-container="inner"]\');
        }
    },

    /**
     * Add all sub-components of the panel.
     */
    addSubComponents: function() {
        this.addHeaderComponent();
        this.addDupeCheckComponent();
        this.addRecordCreateComponent();
    },

    /**
     * Add the panel header view.
     */
    addHeaderComponent: function() {
        var header = app.view.createView({
            context: this.context,
            name: \'convert-panel-header\',
            layout: this,
            meta: this.meta
        });
        this.addComponent(header);
    },

    /**
     * Add the duplicate check layout along with events to listen for changes to
     * the duplicate view.
     */
    addDupeCheckComponent: function() {
        var leadsModel = this.context.get(\'leadsModel\'),
            context = this.context.getChildContext({
                \'module\': this.meta.module,
                \'forceNew\': true,
                \'skipFetch\': true,
                \'dupelisttype\': \'dupecheck-list-select\',
                \'collection\': this.createDuplicateCollection(leadsModel, this.meta.module),
                \'layoutName\': \'records\',
                \'dataView\': \'selection-list\'
            });
        context.prepare();

        this.duplicateView = app.view.createLayout({
            context: context,
            name: this.TOGGLE_DUPECHECK,
            layout: this,
            module: context.get(\'module\')
        });
        this.duplicateView.context.on(\'change:selection_model\', this.handleDupeSelectedChange, this);
        this.duplicateView.collection.on(\'reset\', this.dupeCheckComplete, this);
        this.addComponent(this.duplicateView);
    },

    /**
     * Add the create view.
     */
    addRecordCreateComponent: function() {
        var context = this.context.getChildContext({
            \'module\': this.meta.module,
            forceNew: true,
            create: true
        });
        context.prepare();

        this.createView = app.view.createView({
            context: context,
            name: this.TOGGLE_CREATE,
            module: context.module,
            layout: this
        });

        this.createView.meta = this.removeFieldsFromMeta(this.createView.meta, this.meta);
        this.createView.enableHeaderButtons = false;
        this.addComponent(this.createView);
    },

    /**
     * Sets the listeners for changes to the dependent modules.
     */
    addDependencyListeners: function() {
        _.each(this.meta.dependentModules, function(details, module) {
            this.context.on(\'lead:convert:\' + module + \':complete\', this.updateFromDependentModuleChanges, this);
            this.context.on(\'lead:convert:\' + module + \':reset\', this.resetFromDependentModuleChanges, this);
        }, this);
    },

    /**
     * When duplicate results are received (or dupe check did not need to be
     * run) toggle to the appropriate view.
     *
     * If duplicates were found for a required module, auto select the first
     * duplicate.
     */
    dupeCheckComplete: function() {
        if (this.disposed) {
            return;
        }

        this.currentState.dupeCount = this.duplicateView.collection.length;
        this.runAutoCompleteCheck();
        if (this.currentState.dupeCount !== 0) {
            this.showComponent(this.TOGGLE_DUPECHECK);
            if (this.meta.required) {
                this.selectFirstDuplicate();
            }
        } else if (!this.toggledOffDupes) {
            this.showComponent(this.TOGGLE_CREATE);
        }

        this.toggledOffDupes = true; //flag so we only toggle once
        this.trigger(\'lead:convert-dupecheck:complete\', this.currentState.dupeCount);
    },

    /**
     * Check to see if the panel should be automatically marked as complete
     *
     * Required panels are marked complete when there are no duplicates and
     * the create form passes validation.
     */
    runAutoCompleteCheck: function() {
        //Bail out if we\'ve already completed the check
        if (this.autoCompleteCheckComplete) {
            return;
        }

        if (this.autoCompleteEnabled && this.meta.required && this.currentState.dupeCount === 0) {
            this.createView.once(\'render\', this.runAutoCompleteValidation, this);
        } else {
            this.markAutoCompleteCheckComplete();
        }
    },

    /**
     * Run validation, mark panel complete if valid without any alerts
     */
    runAutoCompleteValidation: function() {
        var view = this.createView,
            model = view.model;

        model.isValidAsync(view.getFields(view.module), _.bind(function(isValid) {
            if (isValid) {
                this.markPanelComplete(model);
            }
            this.markAutoCompleteCheckComplete();
        }, this));
    },

    /**
     * Set autocomplete check complete flag and trigger event
     */
    markAutoCompleteCheckComplete: function() {
        this.autoCompleteCheckComplete = true;
        this.trigger(\'lead:autocomplete-check:complete\');
    },

    /**
     * Select the first item in the duplicate check list.
     */
    selectFirstDuplicate: function() {
        var list = this.duplicateView.getComponent(\'dupecheck-list-select\');
        if (list) {
            list.once(\'render\', function() {
                var radio = this.$(\'input[type=radio]:first\');
                if (radio) {
                    radio.prop(\'checked\', true);
                    radio.click();
                }
            }, this);
        }
    },

    /**
     * Removes fields from the meta and replaces with empty html container
     * based on the modules config option - hiddenFields.
     *
     * Example: Account name drop-down should not be available on contact
     * and opportunity module.
     *
     * @param {Object} meta The original metadata
     * @param {Object} moduleMeta Metadata defining fields to hide
     * @return {Object} The metadata after hidden fields removed
     */
    removeFieldsFromMeta: function(meta, moduleMeta) {
        if (moduleMeta.hiddenFields) {
            _.each(meta.panels, function(panel) {
                _.each(panel.fields, function(field, index, list) {
                    if (_.isString(field)) {
                        field = {name: field};
                    }
                    if (moduleMeta.hiddenFields[field.name]) {
                        field.readonly = true;
                        field.required = false;
                        list[index] = field;
                    }
                });
            }, this);
        }
        return meta;
    },

    /**
     * Toggle the accordion body for this panel.
     */
    togglePanel: function() {
        this.$(this.accordionBody).collapse(\'toggle\');
    },

    /**
     * When one panel is completed it notifies the next panel to open
     * This function handles that request and will...
     * - wait for auto complete check to finish before doing anything
     * - pass along request to the next if already complete or not enabled
     * - open the panel otherwise
     */
    handleOpenRequest: function() {
        if (this.autoCompleteCheckComplete !== true) {
            this.once(\'lead:autocomplete-check:complete\', this.handleOpenRequest, this);
        } else {
            if (this.currentState.complete || !this.isPanelEnabled()) {
                this.requestNextPanelOpen();
            } else {
                this.openPanel();
            }
        }
    },

    /**
     * Check if the the current panel is enabled.
     *
     * @return {boolean}
     */
    isPanelEnabled: function() {
        return this.$(this.accordionHeading).hasClass(\'enabled\');
    },

    /**
     * Check if the current panel is open.
     *
     * @return {boolean}
     */
    isPanelOpen: function() {
        return this.$(this.accordionBody).hasClass(\'in\');
    },

    /**
     * Open the body of the panel if enabled (and not already open).
     */
    openPanel: function() {
        if (this.isPanelEnabled()) {
            if (this.isPanelOpen()) {
                this.context.trigger(\'lead:convert:\' + this.meta.module + \':shown\');
            } else {
                this.$(this.accordionBody).collapse(\'show\');
            }
        }
    },

    /**
     * When showing create view, render the view, trigger duplication
     * of fields with special handling (like image fields).
     *
     * @inheritdoc
     */
    showComponent: function(name) {
        this._super(\'showComponent\', [name]);
        if (this.currentToggle === this.TOGGLE_CREATE) {
            this.createViewRendered = true;
        }
        this.handleShowComponent();
    },

    /**
     * Render the create view.
     */
    handleShowComponent: function() {
        if (this.currentToggle === this.TOGGLE_CREATE && this.createView.meta.useTabsAndPanels && !this.createViewRendered) {
            this.createView.render();
            this.createViewRendered = true;
        }
    },

    /**
     * Close the body of the panel (if not already closed)
     */
    closePanel: function() {
        this.$(this.accordionBody).collapse(\'hide\');
    },

    /**
     * Handle click of Associate button - running validation if on create view
     * or marking complete if on dupe view.
     *
     * @param {Event} event
     */
    handleAssociateClick: function(event) {
        //ignore clicks if button is disabled
        if (!$(event.currentTarget).hasClass(\'disabled\')) {
            if (this.currentToggle === this.TOGGLE_CREATE) {
                this.runCreateValidation({
                    valid: _.bind(this.markPanelComplete, this),
                    invalid: _.bind(this.resetPanel, this)
                });
            } else {
                this.markPanelComplete(this.duplicateView.context.get(\'selection_model\'));
            }
        }
        event.stopPropagation();
    },

    /**
     * Run validation on the create model and perform specified callbacks based
     * on the validity of the model.
     *
     * @param {Object} callbacks Callbacks to be run after validation is performed.
     * @param {Function} callbacks.valid Run if model is valid.
     * @param {Function} callbacks.invalid Run if model is invalid.
     */
    runCreateValidation: function(callbacks) {
        var view = this.createView,
            model = view.model;

        model.doValidate(view.getFields(view.module), _.bind(function(isValid) {
            if (isValid) {
                callbacks.valid(model);
            } else {
                callbacks.invalid(model);
            }
        }, this));
    },

    /**
     * Mark the panel as complete, close the panel body, and tell the next panel
     * to open.
     *
     * @param {Data.Bean} model
     */
    markPanelComplete: function(model) {
        this.currentState.associatedName = app.utils.getRecordName(model);
        this.currentState.complete = true;
        this.context.trigger(\'lead:convert-panel:complete\', this.meta.module, model);
        this.trigger(\'lead:convert-panel:complete\', this.currentState.associatedName);

        app.alert.dismissAll(\'error\');

        //re-run validation if create model changes after completion
        if (!model.id) {
            model.on(\'change\', this.runPostCompletionValidation, this);
        }

        //if this panel was open, close & tell the next panel to open
        if (this.isPanelOpen()) {
            this.closePanel();
            this.requestNextPanelOpen();
        }
    },

    /**
     * Re-run create model validation after a panel has been marked completed
     */
    runPostCompletionValidation: function() {
        this.runCreateValidation({
            valid: $.noop,
            invalid: _.bind(this.resetPanel, this)
        });
    },

    /**
     * Trigger event to open the next panel in the list
     */
    requestNextPanelOpen: function() {
        this.context.trigger(\'lead:convert:\' + (this.meta.moduleNumber + 1) + \':open\');
    },

    /**
     * When reset button is clicked - reset this panel and open it
     * @param {Event} event
     */
    handleResetClick: function(event) {
        this.resetPanel();
        this.openPanel();
        event.stopPropagation();
    },

    /**
     * Reset the panel back to a state the user can modify associated values
     */
    resetPanel: function() {
        this.createView.model.off(\'change\', this.runPostCompletionValidation, this);
        this.currentState.complete = false;
        this.context.trigger(\'lead:convert-panel:reset\', this.meta.module);
        this.trigger(\'lead:convert-panel:reset\');
    },

    /**
     * Track when a duplicate has been selected and notify the panel so it can
     * enable the Associate button
     */
    handleDupeSelectedChange: function() {
        this.currentState.dupeSelected = this.duplicateView.context.has(\'selection_model\');
        this.trigger(\'lead:convert:duplicate-selection:change\');
    },

     /**
     * Wrapper to check whether to fire the duplicate check event
     */
    triggerDuplicateCheck: function() {
        if (this.shouldDupeCheckBePerformed(this.createView.model)) {
            this.trigger(\'lead:convert-dupecheck:pending\');
            this.duplicateView.context.trigger(\'dupecheck:fetch:fire\', this.createView.model, {
                //Show alerts for this request
                showAlerts: true
            });
        } else {
            this.dupeCheckComplete();
        }
    },

    /**
     * Check if duplicate check should be performed
     * dependent on enableDuplicateCheck setting and required dupe check fields
     * @param {Object} model
     */
    shouldDupeCheckBePerformed: function(model) {
        var performDuplicateCheck = this.meta.enableDuplicateCheck;

        if (this.meta.duplicateCheckRequiredFields) {
            _.each(this.meta.duplicateCheckRequiredFields, function(field) {
                if (_.isEmpty(model.get(field))) {
                    performDuplicateCheck = false;
                }
            });
        }
        return performDuplicateCheck;
    },

    /**
     * Populates the record view from the passed in model and then kick off the
     * dupe check
     *
     * @param {Object} model
     */
    handlePopulateRecords: function(model) {
        var fieldMapping = {};

        // if copyData is not set or false, no need to run duplicate check, bail out
        if (!this.meta.copyData) {
            this.dupeCheckComplete();
            return;
        }

        if (!_.isEmpty(this.meta.fieldMapping)) {
            fieldMapping = app.utils.deepCopy(this.meta.fieldMapping);
        }
        var sourceFields = app.metadata.getModule(model.attributes._module, \'fields\');
        var targetFields = app.metadata.getModule(this.meta.module, \'fields\');

        _.each(model.attributes, function(fieldValue, fieldName) {
            if (app.acl.hasAccessToModel(\'edit\', this.createView.model, fieldName) &&
                !_.isUndefined(sourceFields[fieldName]) &&
                !_.isUndefined(targetFields[fieldName]) &&
                sourceFields[fieldName].type === targetFields[fieldName].type &&
                (_.isUndefined(sourceFields[fieldName][\'duplicate_on_record_copy\']) ||
                    sourceFields[fieldName][\'duplicate_on_record_copy\'] !== \'no\') &&
                model.has(fieldName) &&
                model.get(fieldName) !== this.createView.model.get(fieldName) &&
                _.isUndefined(fieldMapping[fieldName])) {
                        fieldMapping[fieldName] = fieldName;
                    }
        }, this);

        this.populateRecords(model, fieldMapping);
        if (this.meta.duplicateCheckOnStart) {
            this.triggerDuplicateCheck();
        } else if (!this.meta.dependentModules || this.meta.dependentModules.length == 0) {
            //not waiting on other modules before running dupe check, so mark as complete
            this.dupeCheckComplete();
        }
    },

    /**
     * Use the convert metadata to determine how to map the lead fields to
     * module fields
     *
     * @param {Object} model
     * @param {Object} fieldMapping
     * @return {boolean} whether the create view model has changed
     */
    populateRecords: function(model, fieldMapping) {
        var hasChanged = false;

        _.each(fieldMapping, function(sourceField, targetField) {
            if (model.has(sourceField) && this.shouldSourceValueBeCopied(model.get(sourceField)) &&
                model.get(sourceField) !== this.createView.model.get(targetField)) {
                    this.createView.model.setDefault(targetField, model.get(sourceField));
                    this.createView.model.set(targetField, model.get(sourceField));
                    hasChanged = true;
            }
        }, this);

        //mark the model as copied so that the currency field doesn\'t set currency_id to user\'s default value
        if (hasChanged) {
            this.createView.once(\'render\', function() {
                this.createView.model.trigger(\'duplicate:field\', model);
            }, this);

            if (model.has(\'currency_id\')) {
                this.createView.model.isCopied = true;
            }
        }

        return hasChanged;
    },

    /**
     * Enable the panel
     *
     * @param {boolean} isEnabled add/remove the enabled flag on the header
     */
    handleEnablePanel: function(isEnabled) {
        var $header = this.$(this.accordionHeading);
        if (isEnabled) {
            if (!this.currentState.complete) {
                this.triggerDuplicateCheck();
            }
            $header.addClass(\'enabled\');
        } else {
            $header.removeClass(\'enabled\');
        }
    },

    /**
     * Updates the attributes on the model based on the changes from dependent
     * modules duplicate view.
     * Uses dependentModules property - fieldMappings
     *
     * @param {string} moduleName
     * @param {Object} model
     */
    updateFromDependentModuleChanges: function(moduleName, model) {
        var dependencies = this.meta.dependentModules,
            modelChanged = false;
        if (dependencies && dependencies[moduleName] && dependencies[moduleName].fieldMapping) {
            modelChanged = this.populateRecords(model, dependencies[moduleName].fieldMapping);
            if (modelChanged) {
                this.triggerDuplicateCheck();
            }
        }
    },

    /**
     * Resets the state of the panel based on a dependent module being reset
     */
    resetFromDependentModuleChanges: function(moduleName) {
        var dependencies = this.meta.dependentModules;
        if (dependencies && dependencies[moduleName]) {
            //if dupe check has already been run, reset but don\'t run again yet - just update status
            if (this.currentState.dupeCount && this.currentState.dupeCount > 0) {
                this.duplicateView.collection.reset();
                this.currentState.dupeCount = 0;
            }
            //undo any dependency field mapping that was done previously
            if (dependencies && dependencies[moduleName] && dependencies[moduleName].fieldMapping) {
                _.each(dependencies[moduleName].fieldMapping, function(sourceField, targetField) {
                    this.createView.model.unset(targetField);
                }, this);
            }
            //make sure if we re-trigger dupe check again we handle as if it never happened before
            this.toggledOffDupes = false;
            this.resetPanel();
        }
    },

    /**
     * Resets the model to the default values so that unsaved warning prompt
     * will not be displayed.
     */
    turnOffUnsavedChanges: function() {
        var defaults = _.extend({}, this.createView.model._defaults, this.createView.model.getDefault());
        this.createView.model.clear({silent: true});
        this.createView.model.set(defaults, {silent: true});
    },

    /**
     * Determine whether to copy the the supplied value when it appears in the Source module during conversion
     */
    shouldSourceValueBeCopied: function(val) {
        return _.isNumber(val) || _.isBoolean(val) || !_.isEmpty(val);
    },

    /**
     * Stop listening to events on duplicate view collection
     * @inheritdoc
     */
    _dispose: function() {
        this.createView.off(null, null, this);
        this.duplicateView.off(null, null, this);
        this.duplicateView.context.off(null, null, this);
        this.duplicateView.collection.off(null, null, this);
        this._super(\'_dispose\');
    }
})
',
    ),
    'templates' => 
    array (
      'convert-panel' => '
    <span data-container="header"></span>
    <div id="collapse{{this.meta.module}}" data-module="{{this.meta.module}}" class="accordion-body collapse">
        <div class="accordion-inner" data-container="inner"></div>
    </div>
',
    ),
  ),
  '_hash' => 'f058656f1177cd04dceae62422dea672',
);

