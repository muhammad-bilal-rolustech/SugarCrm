<?php
$clientCache['Forecasts']['base']['field'] = array (
  'assignquota' => 
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
 * @class View.Fields.Base.Forecasts.AssignQuotaField
 * @alias SUGAR.App.view.fields.BaseForecastsAssignQuotaField
 * @extends View.Fields.Base.RowactionField
 */
({
    extendsFrom: \'RowactionField\',

    /**
     * Should be this disabled if it\'s not rendered?
     */
    disableButton: true,

    /**
     * @inheritdoc
     */
    initialize: function(options) {
        this._super(\'initialize\', [options]);
        this.type = \'rowaction\';
    },

    /**
     * @inheritdoc
     */
    bindDataChange: function() {
        this.context.on(\'forecasts:worksheet:quota_changed\', function() {
            this.disableButton = false;
            if (!this.disposed) {
                this.render();
            }
        }, this);

        this.context.on(\'forecasts:worksheet:committed\', function() {
            this.disableButton = true;
            if (!this.disposed) {
                this.render();
            }
        }, this);

        this.context.on(\'forecasts:assign_quota\', this.assignQuota, this);
    },

    /**
     * We override this so we can always disable the field
     *
     * @override
     * @private
     */
    _render: function() {
        this._super(\'_render\');
        // only set field as disabled if it\'s actually rendered into the dom
        // otherwise it will cause problems and not show correctly when disabled
        if (this.getFieldElement().length > 0) {
            this.setDisabled(this.disableButton);
        }
    },

    /**
     * Only show this if the current user is a manager and we are on their manager view
     *
     * @override
     * @return {boolean|*|boolean|boolean}
     */
    hasAccess: function() {
        var su = (this.context.get(\'selectedUser\')) || app.user.toJSON(),
            isManager = su.is_manager || false,
            showOpps = su.showOpps || false;
        return (su.id === app.user.get(\'id\') && isManager && showOpps === false);
    },

    /**
     * Run the XHR Request to Assign the Quotas
     *
     * @param {string} worksheetType            What worksheet are we on
     * @param {object} selectedUser             What user is calling the assign quota
     * @param {string} selectedTimeperiod        Which timeperiod are we assigning quotas for
     */
    assignQuota: function(worksheetType, selectedUser, selectedTimeperiod) {
        app.api.call(\'create\', app.api.buildURL(\'ForecastManagerWorksheets/assignQuota\'), {
            \'user_id\': selectedUser.id,
            \'timeperiod_id\': selectedTimeperiod
        }, {
            success: _.bind(function(o) {
                app.alert.dismiss(\'saving_quota\');
                app.alert.show(\'success\', {
                    level: \'success\',
                    autoClose: true,
                    autoCloseDelay: 10000,
                    title: app.lang.get("LBL_FORECASTS_WIZARD_SUCCESS_TITLE", "Forecasts") + ":",
                    messages: [app.lang.get(\'LBL_QUOTA_ASSIGNED\', \'Forecasts\')]
                });
                this.disableButton = true;
                this.context.trigger(\'forecasts:quota_assigned\');
                if (!this.disposed) {
                    this.render();
                }
            }, this)
        });
    }
})
',
    ),
  ),
  'datapoint' => 
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
 * Datapoints in the info pane for Forecasts
 *
 * @class View.Fields.Base.Forecasts.DatapointField
 * @alias SUGAR.App.view.fields.BaseForecastsDatapointField
 * @extends View.Fields.Base.BaseField
 */
({

    /**
     * Tracking the type of totals we are seeing
     */
    previous_type: \'\',

    /**
     * Arrow Colors
     */
    arrow: \'\',

    /**
     * What was the first total we got for a given type
     */
    initial_total: \'\',

    /**
     * The total we want to display
     */
    total: 0,

    /**
     * Can we actually display this field and have the data binding on it
     */
    hasAccess: true,

    /**
     * Do we have access from the ForecastWorksheet Level to show data here?
     */
    hasDataAccess: true,

    /**
     * What to show when we don\'t have access to the data
     */
    noDataAccessTemplate: undefined,

    /**
     * Holds the totals field name
     */
    total_field: \'\',

    /**
     * @inheritdoc
     */
    initialize: function(options) {
        this._super(\'initialize\', [options]);

        this.total_field = this.total_field || this.name;

        this.hasAccess = app.utils.getColumnVisFromKeyMap(this.name, \'forecastsWorksheet\');
        this.hasDataAccess = app.acl.hasAccess(\'read\', \'ForecastWorksheets\', app.user.get(\'id\'), this.name);
        if (this.hasDataAccess === false) {
            this.noDataAccessTemplate = app.template.getField(\'base\', \'noaccess\')(this);
        }

        // before we try and render, lets see if we can actually render this field
        this.before(\'render\', function() {
            if (!this.hasAccess) {
                return false;
            }
            // adjust the arrow
            this.arrow = this._getArrowIconColorClass(this.total, this.initial_total);
            this.checkIfNeedsCommit();
            return true;
        }, this);
        //if user resizes browser, adjust datapoint layout accordingly
        $(window).on(\'resize.datapoints\', _.bind(this.resize, this));
        this.on(\'render\', function() {
            if (!this.hasAccess) {
                return false;
            }
            this.resize();
            return true;
        }, this);
    },

    /**
     * Check to see if the worksheet needs commit
     */
    checkIfNeedsCommit: function() {
        // if the initial_total is an empty string (default value) don\'t run this
        if (!_.isEqual(this.initial_total, \'\') && app.math.isDifferentWithPrecision(this.total, this.initial_total)) {

            this.context.trigger(\'forecasts:worksheet:needs_commit\', null);
        }
    },

    /**
     * @inheritdoc
     */
    _dispose: function() {
        $(window).off(\'resize.datapoints\');

        // make sure we\'ve cleared the resize timer before navigating away
        clearInterval(this.resizeDetectTimer);

        this._super(\'_dispose\');
    },

    /**
     * Overwrite this to only place the placeholder if we actually have access to view it
     *
     * @return {*}
     */
    getPlaceholder: function() {
        if (this.hasAccess) {
            return this._super(\'getPlaceholder\');
        }

        return \'\';
    },

    /**
     * Adjusts the CSS for the datapoint
     */
    adjustDatapointLayout: function() {
        if (this.hasAccess) {
            var parentMarginLeft = this.view.$(\'.topline .datapoints\').css(\'margin-left\'),
                parentMarginRight = this.view.$(\'.topline .datapoints\').css(\'margin-right\'),
                timePeriodWidth = this.view.$(\'.topline .span4\').outerWidth(true),
                toplineWidth = this.view.$(\'.topline \').width(),
                collection = this.view.$(\'.topline div.pull-right\').children(\'span\'),
                collectionWidth = parseInt(parentMarginLeft) + parseInt(parentMarginRight);

            collection.each(function(index) {
                collectionWidth += $(this).children(\'div.datapoint\').outerWidth(true);
            });

            //change width of datapoint div to span entire row to make room for more numbers
            if ((collectionWidth + timePeriodWidth) > toplineWidth) {
                this.view.$(\'.topline div.hr\').show();
                this.view.$(\'.info .last-commit\').find(\'div.hr\').show();
                this.view.$(\'.topline .datapoints\').removeClass(\'span8\').addClass(\'span12\');
                this.view.$(\'.info .last-commit .datapoints\').removeClass(\'span8\').addClass(\'span12\');
                this.view.$(\'.info .last-commit .commit-date\').removeClass(\'span4\').addClass(\'span12\');

            } else {
                this.view.$(\'.topline div.hr\').hide();
                this.view.$(\'.info .last-commit\').find(\'div.hr\').hide();
                this.view.$(\'.topline .datapoints\').removeClass(\'span12\').addClass(\'span8\');
                this.view.$(\'.info .last-commit .datapoints\').removeClass(\'span12\').addClass(\'span8\');
                this.view.$(\'.info .last-commit .commit-date\').removeClass(\'span12\').addClass(\'span4\');
                var lastCommitHeight = this.view.$(\'.info .last-commit .commit-date\').height();
                this.view.$(\'.info .last-commit .datapoints div.datapoint\').height(lastCommitHeight);
            }
            //adjust height of last commit datapoints
            var index = this.$el.index(),
                width = this.$(\'div.datapoint\').outerWidth(),
                datapointLength = this.view.$(\'.info .last-commit .datapoints div.datapoint\').length,
                sel = this.view.$(\'.last-commit .datapoints div.datapoint:nth-child(\' + index + \')\');
            if (datapointLength > 2 && index <= 2 || datapointLength == 2 && index == 1) {
                // RTL was off 1px
                var widthMod = (app.lang.direction === \'rtl\') ? 7 : 8;
                $(sel).width(width - widthMod);
            } else {
                $(sel).width(width);
            }
        }
    },

    /**
     * Resizes the datapoint on window resize
     */
    resize: function() {
        //The resize event is fired many times during the resize process. We want to be sure the user has finished
        //resizing the window that\'s why we set a timer so the code should be executed only once
        if (this.resizeDetectTimer) {
            clearTimeout(this.resizeDetectTimer);
        }
        this.resizeDetectTimer = setTimeout(_.bind(function() {
            this.adjustDatapointLayout();
        }, this), 250);
    },

    /**
     * @inheritdoc
     */
    bindDataChange: function() {
        if (!this.hasAccess) {
            return;
        }

        this.context.on(\'change:selectedUser change:selectedTimePeriod\', function() {
            this.initial_total = \'\';
            this.total = 0;
            this.arrow = \'\';
        }, this);

        // any time the main forecast collection is reset this contains the commit history
        this.collection.on(\'reset\', this._onCommitCollectionReset, this);
        this.context.on(\'forecasts:worksheet:totals\', this._onWorksheetTotals, this);
        this.context.on(\'forecasts:worksheet:committed\', this._onWorksheetCommit, this);
    },

    /**
     * Collection Reset Handler
     * @param {Backbone.Collection} collection
     * @private
     */
    _onCommitCollectionReset: function(collection) {
        // get the first line
        var model = _.first(collection.models);
        if (!_.isUndefined(model)) {
            this.initial_total = model.get(this.total_field);
            if (!this.disposed) {
                this.render();
            }
        }
    },

    /**
     * Worksheet Totals Handler
     * @param {Object} totals       The totals from the worksheet
     * @param {String} type         Which worksheet are we dealing with it
     * @private
     */
    _onWorksheetTotals: function(totals, type) {
        var field = this.total_field;
        if (type == \'manager\') {
            // split off \'_case\'
            field = field.split(\'_\')[0] + \'_adjusted\';
        }
        this.total = totals[field];
        this.previous_type = type;

        if (!this.disposed) {
            this.render();
        }
    },

    /**
     * What to do when the worksheet is committed
     *
     * @param {String} type     What type of worksheet was committed
     * @param {Object} forecast What was committed for the timeperiod
     * @private
     */
    _onWorksheetCommit: function(type, forecast) {
        var field = this.total_field;
        if (type == \'manager\') {
            // split off \'_case\'
            field = field.split(\'_\')[0] + \'_adjusted\';
        }
        this.total = forecast[field];
        this.initial_total = forecast[field];
        this.arrow = \'\';
        if (!this.disposed) {
            this.render();
        }
    },

    /**
     * Returns the CSS classes for an up or down arrow icon
     *
     * @param {String|Number} newValue the new value
     * @param {String|Number} oldValue the previous value
     * @return {String} css classes for up or down arrow icons, if the values didn\'t change, returns \'\'
     * @private
     */
    _getArrowIconColorClass: function(newValue, oldValue) {
        var cls = \'\';

        // figure out if it changed here based
        if (app.math.isDifferentWithPrecision(newValue, oldValue)) {
            cls = (newValue > oldValue) ? \' fa-arrow-up font-green\' : \' fa-arrow-down font-red\';
        }
        return cls;
    }
})
',
    ),
    'templates' => 
    array (
      'detail' => '
<div class="datapoint pull-left">
    {{this.label}}<br>
    {{#if this.hasDataAccess}}
        <h2 id="{{this.name}}">{{formatCurrency this.total}}{{#if this.arrow}}<span class="fa fa-sm committed_arrow{{this.arrow}}"></span>{{/if}}</h2>
    {{else}}
        {{{this.noDataAccessTemplate}}}
    {{/if}}
</div>
',
    ),
  ),
  'fiscal-year' => 
  array (
    'templates' => 
    array (
      'edit' => '
<div>
    <i>{{label}}</i>
    <p>{{str \'LBL_FISCAL_YEAR\' \'Forecasts\'}}:
    <input type="hidden" class="select2" name="{{name}}"{{#if def.tabindex}} tabindex="{{def.tabindex}}"{{/if}}>
    {{#unless hideHelp}}{{#if def.help}}<p class="help-block">{{str def.help module}}</p>{{/if}}{{/unless}}
    </p>
</div>

',
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
    extendsFrom: \'EnumField\',

    loadEnumOptions: function(fetch, callback) {
        this._super(\'loadEnumOptions\', [fetch, callback]);

        var startYear = this.options.def.startYear;

        _.each(this.items, function(value, key, list) {
            list[key] = list[key].replace("{{year}}", startYear++);
        }, this);
    }
})
',
    ),
  ),
  'commitlog' => 
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
 * @class View.Fields.Base.Forecasts.CommitlogField
 * @alias SUGAR.App.view.fields.BaseForecastsCommitlogField
 * @extends View.Fields.Base.BaseField
 */
({
    /**
     * Stores the historical log of the Forecast entries
     */
    commitLog: [],

    /**
     * Previous committed date value to display in the view
     */
    previousDateEntered: \'\',

    initialize: function(options) {
        app.view.Field.prototype.initialize.call(this, options);

        this.on(\'show\', function() {
            if (!this.disposed) {
                this.render();
            }
        }, this);
    },

    bindDataChange: function() {
        this.collection.on(\'reset\', function() {
            this.hide();
            this.buildCommitLog();
        }, this);

        this.context.on(\'forecast:commit_log:trigger\', function() {
            if(!this.isVisible()) {
                this.show();
            } else {
                this.hide();
            }
        }, this);
    },

    /**
     * Does the heavy lifting of looping through models to build the commit history
     */
    buildCommitLog: function() {
        //Reset the history log
        this.commitLog = [];

        if(_.isEmpty(this.collection.models)) {
            return;
        }

        // get the first model so we can get the previous date entered
        var previousModel = _.first(this.collection.models);

        // parse out the previous date entered
        var dateEntered = new Date(Date.parse(previousModel.get(\'date_modified\')));
        if (dateEntered == \'Invalid Date\') {
            dateEntered = previousModel.get(\'date_modified\');
        }
        // set the previous date entered in the users format
        this.previousDateEntered = app.date.format(dateEntered, app.user.getPreference(\'datepref\') + \' \' + app.user.getPreference(\'timepref\'));

        //loop through from oldest to newest to build the log correctly
        var loopPreviousModel = \'\',
            models = _.clone(this.collection.models).reverse(),
            selectedUser = this.view.context.get(\'selectedUser\'),
            forecastType = app.utils.getForecastType(selectedUser.is_manager, selectedUser.showOpps);
        _.each(models, function(model) {
            this.commitLog.push(app.utils.createHistoryLog(loopPreviousModel, model, forecastType === \'Direct\'));
            loopPreviousModel = model;
        }, this);

        //reset the order of the history log for display
        this.commitLog.reverse();
    }
})
',
    ),
    'templates' => 
    array (
      'detail' => '
{{#if commitLog.length}}
    <div class="row-fluid">
        <div class="span12">
            <div class="extend results" id="history_log_results">
                {{#each commitLog}}
                    <article>
                        <date>{{this.text2}}</date> {{this.text}}
                    </article>
                {{/each}}
            </div>
        </div>
    </div>
{{/if}}
',
    ),
  ),
  'reportingUsers' => 
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
 * @class View.Fields.Base.Forecasts.ReportingUsersField
 * @alias SUGAR.App.view.fields.BaseForecastsReportingUsersField
 * @extends View.Fields.Base.BaseField
 */
({

    /**
     * The JS Tree Object
     */
    jsTree: {},

    /**
     * The end point we need to hit
     */
    reporteesEndpoint: \'\',

    /**
     * Current end point hit
     */
    currentTreeUrl: \'\',

    /**
     * Current root It
     */
    currentRootId: \'\',

    /**
     * Selected User Storage
     */
    selectedUser: {},

    /**
     * Has the base init selected the proper user?  This is needed to prevent a double selectedUser change from fireing
     */
    initHasSelected: false,

    /**
     * Previous user
     */
    previousUserName: undefined,

    /**
     * Initialize the View
     *
     * @constructor
     * @param {Object} options
     */
    initialize: function(options) {
        app.view.Field.prototype.initialize.call(this, options);

        this.reporteesEndpoint = app.api.buildURL("Forecasts/reportees") + \'/\';

        this.selectedUser = this.context.get(\'selectedUser\') || app.user.toJSON();
        this.currentTreeUrl = this.reporteesEndpoint + this.selectedUser.id;
        this.currentRootId = this.selectedUser.id;
    },

    /**
     * overriding _dispose to make sure custom added jsTree listener is removed
     * @private
     */
    _dispose: function() {
        if (app.user.get(\'is_manager\') && !_.isEmpty(this.jsTree)) {
            this.jsTree.off();
        }
        app.view.Field.prototype._dispose.call(this);
    },

    /**
     * Only run the render if the user is a manager as that is the only time we want the tree to display.
     */
    render: function() {
        if (app.user.get(\'is_manager\')) {
            app.view.Field.prototype.render.call(this);
        }
    },

    /**
     * Clean up any left over bound data to our context
     */
    unbindData: function() {
        app.view.Field.prototype.unbindData.call(this);
    },
    
    /**
     * set up event listeners
     */
    bindDataChange: function(){
        this.context.on("forecasts:user:canceled", function(){
            this.initHasSelected = false;
            this.selectJSTreeNode(this.previousUserName);
            this.initHasSelected = true;
        }, this);
    },

    /**
     * Function to give a final check before rendering to see if we really need to render
     * Any time the selectedUser changes on context we run through this function to
     * see if we should render the tree again
     *
     * @param context
     * @param selectedUser {Object} the current selectedUser on the context
     */
    checkRender: function(context, selectedUser) {
        // handle the case for user clicking MyOpportunities first
        this.selectedUser = selectedUser;
        if (selectedUser.showOpps) {
            var nodeId = (selectedUser.is_manager ? \'jstree_node_myopps_\' : \'jstree_node_\') + selectedUser.user_name;
            this.selectJSTreeNode(nodeId)
            // check before render if we\'re trying to re-render tree with a fresh root user
            // otherwise do not re-render tree
            // also make sure we\'re not re-rendering tree for a rep
        } else if (this.currentRootId != selectedUser.id) {
            if (selectedUser.is_manager) {
                // if user is a manager we\'ll be re-rendering the tree
                // no need to re-render the tree if not a manager because the dataset
                // stays the same

                this.currentRootId = selectedUser.id;
                this.currentTreeUrl = this.reporteesEndpoint + selectedUser.id;
                this.rendered = false;
                if (!this.disposed) {
                    this.render();
                }
            } else {
                // user is not a manager but if this event is coming from the worksheets
                // we need to "select" the user on the tree to show they\'re selected

                // create node ID
                var nodeId = \'jstree_node_\' + selectedUser.user_name;

                // select node only if it is not the already selected node
                if (this.jsTree.jstree(\'get_selected\').attr(\'id\') != nodeId) {
                    this.selectJSTreeNode(nodeId)
                }
            }
        }
    },

    /**
     * Function that handles deselecting any selected nodes then selects the nodeId
     *
     * @param nodeId {String} the node id starting with "jstree_node_"
     */
    selectJSTreeNode: function(nodeId) {
        // jstree kept trying to hold on to the root node css staying selected when
        // user clicked a user\'s name from the worksheet, so explicitly causing a deselection
        this.jsTree.jstree(\'deselect_all\');

        this.jsTree.jstree(\'select_node\', \'#\' + nodeId);
    },


    /**
     * Recursively step through the tree and for each node representing a tree node, run the data attribute through
     * the replaceHTMLChars function.  This function supports n-levels of the tree hierarchy.
     *
     * @param data The data structure returned from the REST API Forecasts/reportees endpoint
     * @param ctx A reference to the view\'s context so that we may recursively call _recursiveReplaceHTMLChars
     * @return object The modified data structure after all the parent and children nodes have been stepped through
     * @private
     */
    _recursiveReplaceHTMLChars: function(data, ctx) {

        _.each(data, function(entry, index) {

            //Scan for the nodes with the data attribute.  These are the nodes we are interested in
            if (entry.data) {
                data[index].data = (function(value) {
                    return value.replace(/&amp;/gi, \'&\').replace(/&lt;/gi, \'<\').replace(/&gt;/gi, \'>\').replace(/&#039;/gi, \'\\\'\').replace(/&quot;/gi, \'"\');
                })(entry.data);

                if (entry.children) {
                    //For each children found (if any) then call _recursiveReplaceHTMLChars again.  Notice setting
                    //childEntry to an Array.  This is crucial so that the beginning _.each loop runs correctly.
                    _.each(entry.children, function(childEntry, index2) {
                        entry.children[index2] = ctx._recursiveReplaceHTMLChars([childEntry]);
                        if (childEntry.attr.rel == \'my_opportunities\' && childEntry.metadata.id == app.user.get(\'id\')) {
                            childEntry.data = app.utils.formatString(app.lang.get(\'LBL_MY_MANAGER_LINE\', \'Forecasts\'), [childEntry.data]);
                        }
                    }, this);
                }
            }
        }, this);

        return data;
    },

    /**
     * Renders JSTree
     * @param ctx
     * @param options
     * @protected
     */
    _render: function(ctx, options) {
        app.view.Field.prototype._render.call(this, ctx, options);

        var options = {};
        // breaking out options as a proper object to allow for bind
        options.success = _.bind(function(data) {
            this.createTree(data);
        }, this);

        app.api.call(\'read\', this.currentTreeUrl, null, options);
    },

    createTree: function(data) {
        // make sure we\'re using an array
        // if the data coming from the endpoint is an array with one element
        // it gets converted to a JS object in the process of getting here
        if (!_.isArray(data)) {
            data = [ data ];
        }

        var treeData = this._recursiveReplaceHTMLChars(data, this),
            selectedUser = this.context.get(\'selectedUser\'),
            nodeId = (selectedUser.is_manager && selectedUser.showOpps ? \'jstree_node_myopps_\' : \'jstree_node_\') + selectedUser.user_name;
        treeData.ctx = this.context;

        this.jsTree = $(".jstree-sugar").jstree({
            "plugins": ["json_data", "ui", "crrm", "types", "themes"],
            "json_data": {
                "data": treeData
            },
            "ui": {
                // when the tree re-renders, initially select the root node
                "initially_select": [ nodeId ]
            },
            "types": {
                "types": {
                    "types": {
                        "parent_link": {},
                        "manager": {},
                        "my_opportunities": {},
                        "rep": {},
                        "root": {}
                    }
                }
            }
        }).on("reselect.jstree", _.bind(function() {
                // this is needed to stop the double select when the tree is rendered
                this.initHasSelected = true;
            }, this))
        .on("select_node.jstree", _.bind(function(event, data) {
            if (this.initHasSelected) {
                this.previousUserName = (this.selectedUser.is_manager && this.selectedUser.showOpps ? \'jstree_node_myopps_\' : \'jstree_node_\') + this.selectedUser.user_name;

                var jsData = data.inst.get_json(),
                    nodeType = jsData[0].attr.rel,
                    userData = jsData[0].metadata,
                    showOpps = false;

                // if user clicked on a "My Opportunities" node
                // set this flag true
                if (nodeType == "my_opportunities" || nodeType == "rep") {
                    showOpps = true
                }

                var selectedUser = {
                    \'id\': userData.id,
                    \'user_name\': userData.user_name,
                    \'full_name\': userData.full_name,
                    \'first_name\': userData.first_name,
                    \'last_name\': userData.last_name,
                    \'reports_to_id\': userData.reports_to_id,
                    \'reports_to_name\': userData.reports_to_name,
                    \'is_manager\': (nodeType != \'rep\'),
                    \'is_top_level_manager\': (nodeType != \'rep\' && _.isEmpty(userData.reports_to_id)),
                    \'showOpps\': showOpps,
                    \'reportees\': []
                };

                this.context.trigger(\'forecasts:user:changed\', selectedUser, this.context);
            }
        }, this));

        if (treeData) {
            var rootId = -1;

            if (treeData.length == 1) {
                // this case appears when "Parent" is not present
                rootId = treeData[0].metadata.id;
            } else if (treeData.length == 2) {
                // this case appears with a "Parent" link label in the return set
                // treeData[0] is the Parent link, treeData[1] is our root user node
                rootId = treeData[1].metadata.id;
            }

            this.currentRootId = rootId;
        }

        // add proper class onto the tree
        this.$el.find(\'#people\').addClass("jstree-sugar");

    }
})
',
    ),
    'templates' => 
    array (
      'detail' => '
<div class="btn-toolbar pull-left" id="forecastsTree">
    <div class="btn-group">
        <a class="dropdown-toggle btn btn-invisible" data-toggle="dropdown" href="#">
            <i class="fa fa-caret-down"></i>
        </a>
        <ul class="dropdown-menu carettop">
            <li>
                <div id="people" class="jstree-sugar" id="forecasts-jstree"></div>
            </li>
        </ul>
    </div>
</div>
',
    ),
  ),
  'quotapoint' => 
  array (
    'templates' => 
    array (
      'detail' => '
<div class="datapoint pull-left">
    {{label}}
    <br>
    <h2 id="{{name}}">{{formatCurrency quotaAmount}}</h2>
</div>
',
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
 * @class View.Fields.Base.Forecasts.QuotapointField
 * @alias SUGAR.App.view.fields.BaseForecastsQuotapointField
 * @extends View.Fields.Base.BaseField
 */
({

    /**
     * The quota amount to display in the UI
     */
    quotaAmount: undefined,

    /**
     * The current selected user object
     */
    selectedUser: undefined,

    /**
     * The current selected timeperiod id
     */
    selectedTimePeriod: undefined,

    /**
     * Hang on to the user-preferred currency id for formatting
     */
    userCurrencyID: undefined,

    /**
     * Used by the resize function to wait a certain time before adjusting
     */
    resizeDetectTimer: undefined,

    /**
     * @inheritdoc
     */
    initialize: function(options) {
        app.view.Field.prototype.initialize.call(this, options);

        this.quotaAmount = 0.00;
        this.selectedUser = this.context.get(\'selectedUser\');
        this.selectedTimePeriod = this.context.get(\'selectedTimePeriod\');
        this.userCurrencyID = app.user.getPreference(\'currency_id\');

        //if user resizes browser, adjust datapoint layout accordingly
        $(window).on(\'resize.datapoints\', _.bind(this.resize, this));
        this.on(\'render\', function() {
            this.resize();
            return true;
        }, this);
    },

    /**
     * @inheritdoc
     */
    bindDataChange: function() {
        this.context.on(\'change:selectedUser\', function(ctx, user) {
            this.selectedUser = user;

            // reload data when the selectedTimePeriod changes
            this.loadData({});
        }, this);

        this.context.on(\'change:selectedTimePeriod\', function(ctx, timePeriod) {
            this.selectedTimePeriod = timePeriod;

            // reload data when the selectedTimePeriod changes
            this.loadData({});
        }, this);

        this.loadData();
    },

    /**
     * If this is a top-level manager, we need to add an event listener for
     * forecasts:worksheet:totals so the top-level manager\'s quota can update live
     * with changes done in the manager worksheet reflected here
     *
     * @param isTopLevelManager {Boolean} if the user is a top-level manager or not
     */
    toggleTotalsListeners: function(isTopLevelManager) {
        if(isTopLevelManager) {
            this.hasListenerAdded = true;
            // Only for top-level manager whose quota can change on the fly
            this.context.on(\'forecasts:worksheet:totals\', function(totals) {
                var quota = 0.00;
                if(_.has(totals, \'quota\')) {
                    quota = totals.quota;
                } else {
                    quota = this.quotaAmount;
                }
                this.quotaAmount = quota;
                if (!this.disposed) {
                    this.render();
                }
            }, this);
            // if we\'re on the manager worksheet view, get the collection and calc quota
            if(!this.selectedUser.showOpps) {
                // in case this gets added after the totals event was dispatched
                var collection = app.utils.getSubpanelCollection(this.context, \'ForecastManagerWorksheets\'),
                    quota = 0.00;

                _.each(collection.models, function(model) {
                    quota = app.math.add(quota, model.get(\'quota\'));
                }, this);
                this.quotaAmount = quota;
                this.render();
            }
        } else if(this.hasListenerAdded) {
            this.hasListenerAdded = false;
            this.context.off(\'forecasts:worksheet:totals\', null, this);
        }
    },

    /**
     * Builds widget url
     *
     * @return {*} url to call
     */
    getQuotasURL: function() {
        var method = (this.selectedUser.is_manager && this.selectedUser.showOpps) ? \'direct\' : \'rollup\',
            url = \'Forecasts/\' + this.selectedTimePeriod + \'/quotas/\' + method + \'/\' + this.selectedUser.id;

        return app.api.buildURL(url, \'read\');
    },

    /**
     * Overrides loadData to load from a custom URL
     *
     * @override
     */
    loadData: function(options) {
        var url = this.getQuotasURL(),
            cb = {
                context: this,
                success: this.handleQuotaData,
                complete: options ? options.complete : null
            };

        app.api.call(\'read\', url, null, null, cb);
    },

    /**
     * Success handler for the Quotas endpoint, sets quotaAmount to returned values and updates the UI
     * @param quotaData
     */
    handleQuotaData: function(quotaData) {
        this.quotaAmount = quotaData.amount;

        // Check to see if we need to add an event listener to the context for the worksheet totals
        this.toggleTotalsListeners(quotaData.is_top_level_manager);

        // update the UI
        if (!this.disposed) {
            this.render();
        }
    },

    /**
     * Adjusts the layout
     */
    adjustDatapointLayout: function(){
        if(this.view.$el) {
            var thisView$El = this.view.$el,
                parentMarginLeft = thisView$El.find(".topline .datapoints").css("margin-left"),
                parentMarginRight = thisView$El.find(".topline .datapoints").css("margin-right"),
                timePeriodWidth = thisView$El.find(".topline .span4").outerWidth(true),
                toplineWidth = thisView$El.find(".topline ").width(),
                collection = thisView$El.find(".topline div.pull-right").children("span"),
                collectionWidth = parseInt(parentMarginLeft) + parseInt(parentMarginRight);

            collection.each(function(index){
                collectionWidth += $(this).children("div.datapoint").outerWidth(true);
            });

            //change width of datapoint div to span entire row to make room for more numbers
            if((collectionWidth+timePeriodWidth) > toplineWidth) {
                thisView$El.find(".topline div.hr").show();
                thisView$El.find(".info .last-commit").find("div.hr").show();
                thisView$El.find(".topline .datapoints").removeClass("span8").addClass("span12");
                thisView$El.find(".info .last-commit .datapoints").removeClass("span8").addClass("span12");
                thisView$El.find(".info .last-commit .commit-date").removeClass("span4").addClass("span12");

            } else {
                thisView$El.find(".topline div.hr").hide();
                thisView$El.find(".info .last-commit").find("div.hr").hide();
                thisView$El.find(".topline .datapoints").removeClass("span12").addClass("span8");
                thisView$El.find(".info .last-commit .datapoints").removeClass("span12").addClass("span8");
                thisView$El.find(".info .last-commit .commit-date").removeClass("span12").addClass("span4");
                var lastCommitHeight = thisView$El.find(".info .last-commit .commit-date").height();
                thisView$El.find(".info .last-commit .datapoints div.datapoint").height(lastCommitHeight);
            }

            //adjust height of last commit datapoints
            var index = this.$el.index() + 1,
                width = this.$el.find("div.datapoint").outerWidth(),
                datapointLength = thisView$El.find(".info .last-commit .datapoints div.datapoint").length,
                sel = thisView$El.find(\'.last-commit .datapoints div.datapoint:nth-child(\'+index+\')\');
            if (datapointLength > 2 && index <= 2 || datapointLength == 2 && index == 1) {
                $(sel).width(width-18);
            }  else {
                $(sel).width(width);
            }
        }
    },

    /**
     * Sets a timer to adjust the layout
     */
    resize: function() {
        //The resize event is fired many times during the resize process. We want to be sure the user has finished
        //resizing the window that\'s why we set a timer so the code should be executed only once
        if (this.resizeDetectTimer) {
            clearTimeout(this.resizeDetectTimer);
        }
        this.resizeDetectTimer = setTimeout(_.bind(function() {
            this.adjustDatapointLayout();
        }, this), 250);
    }
})
',
    ),
  ),
  'button' => 
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
 * @class View.Fields.Base.Forecasts.ButtonField
 * @alias SUGAR.App.view.fields.BaseForecastsButtonField
 * @extends View.Fields.Base.ButtonField
 */
({
    extendsFrom: \'ButtonField\',

    /**
     * Override so we can have a custom hasAccess for forecast to check on the header-pane buttons
     *
     * @inheritdoc
     * @override
     * @returns {*}
     */
    hasAccess: function() {
        // this is a special use case for forecasts
        // currently the only buttons that set acl_action == \'current_user\' are the save_draft and commit buttons
        // if it\'s not equal to \'current_user\' then go up the prototype chain.
        if(this.def.acl_action == \'current_user\') {
            var su = this.context.get(\'selectedUser\') || app.user.toJSON();
            return su.id === app.user.get(\'id\');
        } else {
            return this._super(\'hasAccess\');
        }
    }
})
',
    ),
  ),
  'lastcommit' => 
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
 * @class View.Fields.Base.Forecasts.LastcommitField
 * @alias SUGAR.App.view.fields.BaseForecastsLastcommitField
 * @extends View.Fields.Base.BaseField
 */
({

    commit_date: undefined,

    data_points: [],

    points: [],

    events: {
        \'click\': \'triggerHistoryLog\'
    },

    /**
     * @inheritdoc
     */
    initialize: function(options) {
        this._super(\'initialize\', [options]);

        this.points = [];
        this.data_points = [];

        // map what points we should display
        _.each(options.def.datapoints, function(point) {
            if (app.utils.getColumnVisFromKeyMap(point, \'forecastsWorksheet\')) {
                this.points.push(point);
            }
        }, this);
    },

    /**
     * Toggles the commit history log
     */
    triggerHistoryLog: function() {
        this.$(\'i\').toggleClass(\'fa-caret-down fa-caret-up\');
        this.context.trigger(\'forecast:commit_log:trigger\');
    },

    /**
     * @inheritdoc
     */
    bindDataChange: function() {
        this.collection.on(\'reset\', function() {
            // get the first line
            this.data_points = [];
            var model = _.first(this.collection.models)

            if (!_.isUndefined(model)) {
                this.commit_date = model.get(\'date_modified\');

                this.data_points = this.processDataPoints(model);
            } else {
                this.commit_date = undefined;
            }

            if (!this.disposed) {
                this.render();
            }
        }, this);
    },

    /**
     * Processes a Forecast collection\'s models into datapoints
     * @param {Bean} model
     * @returns {Array}
     */
    processDataPoints: function(model) {
        var points = [],
            noAccessTemplate = app.template.getField(\'base\', \'noaccess\')(this);

        _.each(this.points, function(point) {
            // make sure we can view data for this point
            var point_data = {};
            if (app.acl.hasAccess(\'read\', \'ForecastWorksheets\', app.user.get(\'id\'), point)) {
                point_data.value = model.get(point)
            } else {
                point_data.error = noAccessTemplate;
            }
            points.push(point_data);
        }, this);

        return points;
    }
})
',
    ),
    'templates' => 
    array (
      'detail' => '
<div class=\'row-fluid last-commit\'>
    <div class="span8 datapoints">
        <div class="pull-right">
            {{#each this.data_points}}
                <div class="datapoint pull-left">
                    {{#if this.value}}
                        {{formatCurrency this.value}}
                    {{else}}
                        {{{this.error}}}
                    {{/if}}
                </div>
            {{/each}}
        </div>
    </div>
    <div class="hr hide"></div>
    <div class="span4 commit-date">
        {{#if this.commit_date}}
            <span class="relativetime">
                {{str \'LBL_LAST_COMMIT\'}}{{relativeTime commit_date class=\'date\'}}
                &nbsp;<i id="show_hide_history_log" class="fa fa-caret-down fa-sm"></i>
            </span>
        {{/if}}
    </div>
</div>
',
    ),
  ),
  'range' => 
  array (
    'templates' => 
    array (
      'forecastsCustomRange' => '
{{#eq customType \'custom_default\'}}
    <div id="{{name}}" class="clearfix">
        <div class="control-group pull-left checkbox">
            <input type="checkbox" {{#if isExclude}}
                disabled="disabled"
            {{else}}
               value="1" {{#if in_included_total}}checked="true"{{/if}} name="in_included_total_{{def.name}}" data-key="{{def.name}}" data-category="{{category}}"
            {{/if}}>
            <input type="text" placeholder="{{str "LBL_FORECASTS_CONFIG_RANGES_ENTER_RANGE" module}}" class="span12" value="{{label}}" data-key="{{def.name}}" data-category="{{category}}">
        </div>
        <div class="noUiSliderEnds pull-right">
            <div class="rangeSlider noUiSlider"></div>
        </div>
    </div>
{{/eq}}

{{#notEq customType \'custom_default\'}}
    <div id="{{name}}" class="clearfix">
        <div class="control-group checkbox pull-left">
            <input type="checkbox"
                {{#eq customType \'custom_without_probability\'}}
                disabled="disabled"
               {{/eq}}
                {{#eq customType \'custom\'}}
                    value="1" {{#if in_included_total}}checked="true"{{/if}} name="in_included_total_{{def.name}}" data-key="{{def.name}}" data-category="{{category}}"
                {{/eq}}
            >
            <input type="text" placeholder="{{str "LBL_FORECASTS_CONFIG_RANGES_ENTER_RANGE" module}}" class="span12" value="{{label}}" data-key="{{def.name}}" data-category="{{category}}">
        </div>
        <div class="btn-group">
            <a class="btn removeCustomRange" href="javascript:void(0)" data-key="{{def.name}}" data-category="{{category}}">
                <i class="fa fa-minus"></i>
            </a>
        </div>
        <div class="btn-group">
            <a class="btn addCustomRange" href="javascript:void(0)" data-type="{{customType}}" data-category="{{category}}">
                <i class="fa fa-plus"></i>
            </a>
        </div>
        {{#eq customType \'custom\'}}
        <div class="noUiSliderEnds pull-right">
            <div class="rangeSlider noUiSlider"></div>
        </div>
        {{/eq}}
    </div>
{{/notEq}}
',
    ),
  ),
  'date' => 
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
 * @class View.Fields.Base.Forecasts.DateField
 * @alias SUGAR.App.view.fields.BaseForecastsDateField
 * @extends View.Fields.Base.DateField
 */
({
    extendsFrom: \'DateField\',

    /**
     * @inheritdoc
     *
     * Add `ClickToEdit` plugin to the list of required plugins.
     */
    _initPlugins: function() {
        this._super(\'_initPlugins\');

        if (this.options.def.click_to_edit) {
            this.plugins = _.union(this.plugins, [
                \'ClickToEdit\'
            ]);
        }

        return this;
    }
})
',
    ),
    'templates' => 
    array (
      'edit' => '
<span class="edit">
    <div class="input-append date">
        <input type="text" data-type="date" class="input-small focused" value="{{value}}">
        <span class="add-on"><i class="fa fa-calendar"></i></span>
        <span class="error-tooltip hide" rel="tooltip" data-container="body">
            <i class="fa fa-exclamation-circle"></i>
        </span>
    </div>
</span>
',
    ),
  ),
  '_hash' => '2f6537843c61c4a2101f7319fe2259ea',
);

