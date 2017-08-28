(function(app) {
 SUGAR.jssource = {
	"modules":{
		"Home":{"fieldTemplates": {
"base": {
"dashboardtitle": {"controller": /*
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
 * @class View.Fields.Base.Home.DashboardtitleField
 * @alias SUGAR.App.view.fields.BaseHomeDashboardtitleField
 * @extends View.Fields.Base.BaseField
 */
({
	// Dashboardtitle FieldTemplate (base) 

    events: {
        'click .dropdown-toggle' : 'toggleClicked',
        'click a[data-id]' : 'navigateClicked'
    },
    dashboards: null,
    toggleClicked: function(evt) {
        var self = this;
        if (!_.isEmpty(this.dashboards)) {
            return;
        }

        var contextBro = this.context.parent.getChildContext({module: 'Home'});
        var collection = contextBro.get('collection').clone();
        var pattern = /^(LBL|TPL|NTC|MSG)_(_|[a-zA-Z0-9])*$/;
        collection.remove(self.model, {silent: true});
        _.each(collection.models, function(model) {
            if (pattern.test(model.get('name'))) {
                model.set('name',
                    app.lang.get(model.get('name'), collection.module || null)
                );
            }
        });
        self.dashboards = collection;
        var optionTemplate = app.template.getField(self.type, 'options', self.module);
        self.$('.dropdown-menu').html(optionTemplate(collection));
    },
    /**
     * Handle the click from the UI
     * @param {Object} evt The jQuery Event Object
     */
    navigateClicked: function(evt) {
        var id = $(evt.currentTarget).data('id'),
            type = $(evt.currentTarget).data('type');
        this.navigate(id, type);
    },
    /**
     * Change the Dashboard
     * @param {String} id The ID of the Dashboard to load
     * @param {String} [type] The type of dashboard being loaded, default is undefined
     */
    navigate: function(id, type) {
        if (this.view.layout.isSearchContext()) {
            var contextBro = this.context.parent.getChildContext({module: 'Home'});
            contextBro.set('currentDashboardIndex', id);
        }
        this.view.layout.navigateLayout(id, type);
    },
    /**
     * Inspect the dashlet's label and convert i18n string only if it's concerned
     *
     * @param {String} i18n string or user typed string
     * @return {String} Translated string
     */
    format: function(value) {
        var module = this.context.parent && this.context.parent.get('module') || this.context.get('module');
        return app.lang.get(value, module) || value;
    },

    /**
     * @inheritdoc
     *
     * Override template for dashboard title on home page.
     * Need display it as label so use `f.base.detail` template.
     */
    _loadTemplate: function() {
        app.view.Field.prototype._loadTemplate.call(this);

        if (this.context && this.context.get('model') &&
            this.context.get('model').dashboardModule === 'Home'
        ) {
            this.template = app.template.getField('base', this.tplName) || this.template;
        }
    },

    /**
     * Called by record view to set max width of inner record-cell div
     * to prevent long names from overflowing the outer record-cell container
     */
    setMaxWidth: function(width) {
        this.$el.css({'max-width': width});
    },

    /**
     * Return the width of padding on inner record-cell
     */
    getCellPadding: function() {
        var padding = 0,
            $cell = this.$('.dropdown-toggle');

        if (!_.isEmpty($cell)) {
            padding = parseInt($cell.css('padding-left'), 10) + parseInt($cell.css('padding-right'), 10);
        }

        return padding;
    }
}) },
"layoutbutton": {"controller": /*
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
 * @class View.Fields.Base.Home.LayoutbuttonField
 * @alias SUGAR.App.view.fields.BaseHomeLayoutbuttonField
 * @extends View.Fields.Base.BaseField
 */
({
	// Layoutbutton FieldTemplate (base) 

    events: {
        'click .btn.layout' : 'layoutClicked'
    },
    plugins: ['Tooltip'],
    extendsFrom: 'ButtonField',
    getFieldElement: function() {
        return this.$el;
    },
    _render: function() {
        // if this is a help-dashboard on the home page, dont render these buttons
        if(this.context && this.context.get('model')
            && this.context.get('model').get('dashboard_type') === 'help-dashboard') {
            return this;
        }
        var buttonField = app.view._getController({type: 'field', name: 'button', platform: app.config.platform});
        buttonField.prototype._render.call(this);
    },
    _loadTemplate: function() {
        app.view.Field.prototype._loadTemplate.call(this);
        if(this.action !== 'edit' || (this.model.maxColumns <= 1)) {
            this.template = app.template.empty;
        }
    },
    format: function(value) {
        var metadata = this.model.get("metadata");
        if(metadata) {
            return (metadata.components) ? metadata.components.length : 1;
        }
        return value;
    },
    layoutClicked: function(evt) {
        var value = $(evt.currentTarget).data('value');
        this.setLayout(value);
    },
    setLayout: function(value) {
        var span = 12 / value;
        if(this.value) {

            if (value === this.value) {
                return;
            }
            var setComponent = function() {
                var metadata = this.model.get("metadata");

                _.each(metadata.components, function(component){
                    component.width = span;
                }, this);

                if(metadata.components.length > value) {
                    _.times(metadata.components.length - value, function(index){
                        metadata.components[value - 1].rows = metadata.components[value - 1].rows.concat(metadata.components[value + index].rows);
                    },this);
                    metadata.components.splice(value);
                } else {
                    _.times(value - metadata.components.length, function(index) {
                        metadata.components.push({
                            rows: [],
                            width: span
                        });
                    }, this);
                }
                this.model.set("metadata", app.utils.deepCopy(metadata), {silent: true});
                this.model.trigger("change:metadata");
            };
            if(value !== this.value) {
                app.alert.show('resize_confirmation', {
                    level: 'confirmation',
                    messages: app.lang.get('LBL_DASHBOARD_LAYOUT_CONFIRM', this.module),
                    onConfirm: _.bind(setComponent, this),
                    onCancel: _.bind(this.render,this) // reverse the toggle done
                });
            } else {
                setComponent.call(this);
            }
        } else {
            //new data
            var metadata = {
                components: []
            };
            _.times(value, function(index) {
                metadata.components.push({
                    rows: [],
                    width: span
                });
            }, this);

            this.model.set("metadata", app.utils.deepCopy(metadata), {silent: true});
            this.model.trigger("change:metadata");
        }
    },
    bindDomChange: function() {

    },
    bindDataChange: function() {
        if (this.model) {
            this.model.on("change:metadata", this.render, this);
            if(this.model.isNew()) {
                //Assign default layout set
                this.setLayout(1);
                //clean out model changed attributes not to warn unsaved changes
                this.model.changed = {};
            }
        }
    }
}) },
"layoutsizer": {"controller": /*
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
 * @class View.Fields.Base.Home.LayoutsizerField
 * @alias SUGAR.App.view.fields.BaseHomeLayoutsizerField
 * @extends View.Fields.Base.BaseField
 */
({
	// Layoutsizer FieldTemplate (base) 

    spanMin: 2,
    spanTotal: 12,
    spanStep: 1,
    format: function(value) {
        var metadata = this.model.get("metadata");
        return (metadata && metadata.components) ? metadata.components.length - 1 : 0;
    },
    _loadTemplate: function() {
        app.view.Field.prototype._loadTemplate.call(this);
        if(this.action !== 'edit') {
            this.template = app.template.empty;
        }
    },
    _render: function() {
        app.view.Field.prototype._render.call(this);
        if(this.action === 'edit' && this.value > 0) {
            var self = this,
                metadata = this.model.get("metadata");
            this.$('#layoutwidth').empty().noUiSlider('init', {
                    knobs: this.value,
                    scale: [0,this.spanTotal],
                    step: this.spanStep,
                    connect: false,
                    end: function(type) {
                        if(type !== 'move') {
                            var values = $(this).noUiSlider('value');
                            self.setValue(values);
                        }
                    }
                })
                .append(function(){
                    var html = "",
                        segments = (self.spanTotal / self.spanStep) + 1,
                        segmentWidth = $(this).width() / (segments - 1),
                        acum = 0;
                    _.times(segments, function(i){
                        acum = (segmentWidth * i) - 2;
                        html += "<div class='ticks' style='left:"+acum+"px'></div>";
                    }, this);
                    return html;
                });
            this.setSliderPosition(metadata);
        } else {
            this.$('.noUiSliderEnds').hide();
        }
    },
    setSliderPosition: function(metadata) {
        var divider = 0;
        _.each(_.pluck(metadata.components, 'width'), function(span, index) {
            if(index >= this.value) return;
            divider = divider + parseInt(span, 10);
            this.$('#layoutwidth').noUiSlider('move', {
                handle: index,
                to: divider
            });
        }, this);
    },
    setValue: function(value) {
        var metadata = this.model.get("metadata"),
            divider = 0;
        _.each(metadata.components, function(component, index){
            if(index == metadata.components.length - 1) {
                component.width = this.spanTotal - divider;
                if(component.width < this.spanMin) {
                    var adjustment = this.spanMin - component.width;
                    for(var i = index - 1; i >= 0; i--) {
                        metadata.components[i].width -= adjustment;
                        if(metadata.components[i].width < this.spanMin) {
                            adjustment = this.spanMin - metadata.components[i].width;
                            metadata.components[i].width = this.spanMin;
                        } else {
                            adjustment = 0;
                        }
                    }
                    component.width = this.spanMin;
                }
            } else {
                component.width = value[index] - divider;
                if(component.width < this.spanMin) {
                    component.width = this.spanMin;
                }
                divider += component.width;
            }
        }, this);
        this.setSliderPosition(metadata);
        this.model.set("metadata", metadata, {silent: true});
        this.model.trigger("change:layout");
    },
    bindDataChange: function() {
        if (this.model) {
            this.model.on("change:metadata", this.render, this);
        }
    },
    bindDomChange: function() {

    }
}) },
"sugar-dashlet-label": {"controller": /*
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
 * @class View.Fields.Base.Home.SugarDashletLabelField
 * @alias SUGAR.App.view.fields.BaseHomeSugarDashletLabelField
 * @extends View.Fields.Base.LabelField
 *
 * Label for trademarked `Sugar Dashlet&reg;` term.
 */
({
	// Sugar-dashlet-label FieldTemplate (base) 

    extendsFrom: 'LabelField'
}) }
}}
,
"views": {
"base": {
"about-language-packs": {"controller": /*
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
 * @class View.Views.Base.Home.AboutLanguagePacksView
 * @alias SUGAR.App.view.views.BaseHomeAboutLanguagePacksView
 * @extends View.View
 */
({
	// About-language-packs View (base) 

    linkTemplate: null,

    /**
     * @inheritdoc
     *
     * Initializes the link template to be used on the render.
     */
    initialize: function(opts) {
        app.view.View.prototype.initialize.call(this, opts);

        this.linkTemplate = app.template.getView(this.name + '.link', this.module);
    },

    /**
     * @inheritdoc
     *
     * Override the title to pass the context with the server info.
     */
    _renderHtml: function() {
        _.each(this.meta.providers, function(provider) {
            provider.link = this.linkTemplate(provider);
        }, this);

        app.view.View.prototype._renderHtml.call(this);
    }
}) },
"search-dashboard-headerpane": {"controller": /*
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
 * @class View.Views.Base.SearchDashboardHeaderpaneView
 * @alias SUGAR.App.view.views.BaseSearchDashboardHeaderpaneView
 * @extends View.View
 */
({
	// Search-dashboard-headerpane View (base) 

    className: 'search-dashboard-headerpane',
    events: {
        'click a[name=collapse_button]' : 'collapseClicked',
        'click a[name=expand_button]' : 'expandClicked',
        'click a[name=reset_button]' : 'resetClicked'
    },

    /**
     * Collapses all the dashlets in the dashboard.
     */
    collapseClicked: function() {
        this.context.trigger('dashboard:collapse:fire', true);
    },

    /**
     * Expands all the dashlets in the dashboard.
     */
    expandClicked: function() {
        this.context.trigger('dashboard:collapse:fire', false);
    },

    /**
     * Triggers 'facets:reset' event to reset the facets applied on the search.
     */
    resetClicked: function() {
        this.context.parent.trigger('facets:reset', true);
    }
}) },
"about-headerpane": {"controller": /*
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
 * @class View.Views.Base.Home.AboutHeaderpaneView
 * @alias SUGAR.App.view.views.BaseHomeAboutHeaderpaneView
 * @extends View.Views.Base.HeaderpaneView
 */
({
	// About-headerpane View (base) 

    extendsFrom: 'HeaderpaneView',
    /**
     * @override
     *
     * Formats the title with the current server info.
     */
    _formatTitle: function(title) {
        return app.lang.get(title, this.module, app.metadata.getServerInfo());
    }
}) },
"webpage": {"controller": /*
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
 * @class View.Views.Base.Home.WebpageView
 * @alias SUGAR.App.view.views.BaseHomeWebpageView
 * @extends View.View
 */
({
	// Webpage View (base) 

    plugins: ['Dashlet'],

    /**
     * {Integer} limit Default number of rows displayed in a dashlet.
     *
     * @protected
     */
    _defaultOptions: {
        limit: 10,
    },

    bindDataChange: function(){
        if(!this.meta.config) {
            this.model.on("change", this.render, this);
        }
    },

    _render: function() {
        if (!this.meta.config) {
            this.dashletConfig.view_panel[0].height = this.settings.get('limit') * this.rowHeight;
        }
        app.view.View.prototype._render.call(this);
    },

    initDashlet: function(view) {
        this.viewName = view;
        var settings = _.extend({}, this._defaultOptions, this.settings.attributes);
        this.settings.set(settings);
    },

    loadData: function(options) {
        if (options && options.complete) {
            options.complete();
        }
    }
}) },
"about-source-code": {"controller": /*
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
 * @class View.Views.Base.Home.AboutSourceCodeView
 * @alias SUGAR.App.view.views.BaseHomeAboutSourceCodeView
 * @extends View.View
 */
({
	// About-source-code View (base) 

    /**
     * The server info object. See {@link Core.MetadataManager#getServerInfo}.
     *
     * @property {String}
     */
    serverInfo: null,

    /**
     * @inheritdoc
     */
    initialize: function(options) {
        this._super('initialize', [options]);

        this.serverInfo = app.metadata.getServerInfo();
    }
}) },
"about-resources": {"controller": /*
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
 * @class View.Views.Base.Home.AboutResourcesView
 * @alias SUGAR.App.view.views.BaseHomeAboutResourcesView
 * @extends View.View
 */
({
	// About-resources View (base) 

    /**
     * @inheritdoc
     *
     * Initializes the view with the serverInfo.
     */
    initialize: function(opts) {
        this.serverInfo = app.metadata.getServerInfo();
        app.view.View.prototype.initialize.call(this, opts);
    }
}) },
"search-facet": {"controller": /*
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
 * @class View.Views.Base.Home.SearchFacetView
 * @alias SUGAR.App.view.views.BaseSearchFacetView
 * @extends View.View
 */
({
	// Search-facet View (base) 

    events: {
        'click [data-facet-criteria]': 'itemClicked'
    },

    /**
     * @inheritdoc
     */
    initialize: function(options) {
        this._super('initialize', [options]);

        /**
         * The facet id.
         *
         * @property {String}
         */
        this.facetId = this.meta.facet_id;
        /**
         * Boolean to indicate if the facet is a single criteria facet or a multi
         * criterias facet. `true` is a single criteria facet.
         *
         * @type {boolean}
         */
        this.isSingleItem = this.meta.ui_type === 'single';
        /**
         * The array of facets criterias to be displayed.
         *
         * @property {Array} facetItems
         */
        this.facetItems = [];

        if (this.context.get('facets') && this.context.get('facets')[this.facetId]) {
            this.parseFacetsData();
        }

        this.bindFacetsEvents();
    },

    /**
     * Binds context events related to facets changes.
     */
    bindFacetsEvents: function() {
        this.context.on('facets:change', this.parseFacetsData, this);
    },

    /**
     * Parses facets data and renders the view.
     */
    parseFacetsData: function() {
        var currentFacet = this.context.get('facets')[this.facetId];
        var selectedFacets = this.context.get('selectedFacets');

        if (_.isUndefined(currentFacet)) {
            this.render();
            return;
        }

        if (this.isSingleItem && currentFacet.results.count === 0) {
            this.$el.addClass('disabled');
            this.$el.data('action', 'disabled');
        } else {
            this.$el.data('action', 'enabled');
            this.$el.removeClass('disabled');
        }

        if (this.clickedFacet) {
            this.clickedFacet = false;
            return;
        }
        if (_.isUndefined(currentFacet)) {
            app.logger.warn('The facet type : ' + this.facetId + 'is not returned by the server.' +
                ' Therefore, the facet dashlet will have no data.');
            return;
        }
        var results = currentFacet.results;
        this.facetItems = [];

        if (this.isSingleItem) {
            this.facetItems = [{
                key: this.facetId,
                label: app.lang.get(this.meta.label, 'Filters'),
                count: results.count,
                selected: selectedFacets[this.facetId]
            }];
            this.render();
            return;
        }

        var labelFunction = this._getDefaultLabel;

        _.each(results, function(val, key) {
            var selected = _.contains(selectedFacets[this.facetId], key);
            this.facetItems.push({key: key, label: labelFunction(key), count: val, selected: selected});
        }, this);

        if (_.isEmpty(this.facetItems)) {
            this.layout.context.trigger('dashboard:collapse:fire', true);
        } else {
            this.layout.context.trigger('dashboard:collapse:fire', false);
            this.facetItems = _.sortBy(this.facetItems, 'count').reverse();
        }
        this.render();
    },

    /**
     * Selects or unselect a facet item.
     *
     * @param {Event} event The `click` event.
     */
    itemClicked: function(event) {
        var currentTarget = this.$(event.currentTarget);
        if (this.$el.data('action') === 'disabled') {
            return;
        }
        if (!this.clickedFacet && !this.collection.dataFetched) {
            return;
        }

        var facetCriteriaId = currentTarget.data('facet-criteria');

        currentTarget.toggleClass('selected');
        this.clickedFacet = true;
        this.context.trigger('facet:apply', this.facetId, facetCriteriaId, this.isSingleItem);
    },

    /**
     * Gets the facet criteria id to use it as a label.
     *
     * @param {Object} bucket The facet item.
     * @return {string} The label for this item.
     * @private
     */
    _getDefaultLabel: function(key) {
        return app.lang.getModuleName(key, {plural: true});
    }
}) },
"twitter": {"controller": /*
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
 * @class View.Views.Base.Home.TwitterView
 * @alias SUGAR.App.view.views.BaseHomeTwitterView
 * @extends View.View
 */
({
	// Twitter View (base) 

    plugins: ['Dashlet', 'RelativeTime', 'Connector', 'Tooltip'],
    limit : 20,
    events: {
        'click .connect-twitter': 'onConnectTwitterClick',
        'click .create-case': 'createCase'
    },

    initDashlet: function() {
        this.initDashletConfig();
        var serverInfo = app.metadata.getServerInfo();
        this.tweet2case = serverInfo.system_tweettocase_on ? true : false;
        var limit = this.settings.get('limit') || this.limit;
        this.settings.set('limit', limit);
        this.cacheKey = 'twitter.dashlet.current_user_cache';
        var currentUserCache = app.cache.get(this.cacheKey);
        if (currentUserCache && currentUserCache.current_twitter_user_name) {
            self.current_twitter_user_name = currentUserCache.current_twitter_user_name;
        }
        if (currentUserCache && currentUserCache.current_twitter_user_pic) {
            self.current_twitter_user_pic = currentUserCache.current_twitter_user_pic;
        }
        this.caseCreateAcl = app.acl.hasAccess('edit','Cases');
    },

    initDashletConfig: function() {
        this.moduleType = app.controller.context.get('module');
        this.layoutType = app.controller.context.get('layout');
        // if config view override with module specific
        if (this.meta.config && this.layoutType === 'record') {
            this.dashletConfig = app.metadata.getView(this.moduleType, this.name) || this.dashletConfig;
            // if record view that's not the Home module's record view, disable twitter name settings config
            if (this.moduleType !== 'Home' &&
                this.dashletConfig.config &&
                this.dashletConfig.config.fields) {
                // get rid of the twitter name field
                this.dashletConfig.config.fields = _.filter(this.dashletConfig.config.fields,
                    function(field) {
                        return field.name !== 'twitter';
                    });
            }
        }
    },

    onConnectTwitterClick: function(event) {
        if ( !_.isUndefined(event.currentTarget) ) {
            event.preventDefault();
            var href = this.$(event.currentTarget).attr('href');
            app.bwc.login(false, function(response){
                window.open(href);
            });
        }
    },
    /**
     * opens case create drawer with case attributes prefilled
     * @param event
     */
    createCase: function (event) {
        var module = 'Cases';
        var layout = 'create';
        var self = this;

        // set up and open the drawer
        app.drawer.reset();
        app.drawer.open({
            layout: layout,
            context: {
                create: true,
                module: module
            }
        }, function (refresh, createModelPointer) {
            if (refresh) {
                var collection = app.controller.context.get('collection');
                if (collection && collection.module === module) {
                    collection.fetch({
                        //Don't show alerts for this request
                        showAlerts: false
                    });
                }
            }
        });

        var createLayout = _.last(app.drawer._components),
            tweetId = this.$(event.target).data('url').split('/');
            tweetId = tweetId[tweetId.length-1];
        var createValues = {
            'source':'Twitter',
            'name': app.lang.get('LBL_CASE_FROM_TWITTER_TITLE', 'Cases') + ' ' + tweetId +' @'+ this.$(event.target).data('screen_name'),
            'description': app.lang.get('LBL_TWITTER_SOURCE', 'Cases') +' '+  this.$(event.target).data('url')
        };
        // update the create models values
        this.createModel = createLayout.model;
        if (this.model) {
            if(this.model.module == 'Accounts') {
                createValues.account_name = this.model.get('name');
                createValues.account_id = this.model.get('id');
            } else {
                createValues.account_name = this.model.get('account_name');
                createValues.account_id = this.model.get('account_id');
            }
        }

        this.setCreateModelFields(this.createModel, createValues);

        this.createModel.on('sync', _.once(function (model) {
            // add activity stream on save
            var activity = app.data.createBean('Activities', {
                activity_type: "post",
                comment_count: 0,
                data: {
                    value: app.lang.get('LBL_TWITTER_SOURCE') +' '+ self.$(event.target).data('url'),
                    tags: []
                },
                tags: [],
                value: app.lang.get('LBL_TWITTER_SOURCE') +' '+ self.$(event.target).data('url'),
                deleted: "0",
                parent_id: model.id,
                parent_type: "Cases"
            });

            activity.save();

            //relate contact if we can find one
            var contacts = app.data.createBeanCollection('Contacts');
            var options = {
                filter: [
                    {
                        "twitter": {
                            "$equals": self.$(event.target).data('screen_name')
                        }
                    }
                ],
                success: function (data) {
                    if (data && data.models && data.models[0]) {
                        var url = app.api.buildURL('Cases', 'contacts', {id: self.createModel.id, relatedId: data.models[0].id, link: true});
                        app.api.call('create', url);
                    }
                }
            };
            contacts.fetch(options);
        }));
    },
    /**
     * sets fields on model according to acls
     * @param model
     * @param fields
     * @return {Mixed}
     */
    setCreateModelFields: function(model, fields) {
        var action = 'edit', module = 'Cases', ownerId = app.user.get('id');
        _.each(fields, function(value, fieldName) {
            if(app.acl.hasAccess(action, module, ownerId, fieldName)) {
                model.set(fieldName, value);
            }
        });

        return model;
    },
    _render: function () {
        if (this.tweets || this.meta.config) {
            app.view.View.prototype._render.call(this);
        }
    },

    bindDataChange: function(){
        if(this.model) {
            this.model.on('change', this.loadData, this);
        }
    },

    /**
     * Gets twitter name from one of various fields depending on context
     * @return {string} twitter name
     */
    getTwitterName: function() {
        var mapping = this.getConnectorModuleFieldMapping('ext_rest_twitter', this.moduleType);
        var twitter =
                this.model.get('twitter') ||
                this.model.get(mapping.name) ||
                this.model.get('name') ||
                this.model.get('account_name') ||
                this.model.get('full_name');
        //workaround because home module actually pulls a dashboard instead of an
        //empty home model
        if (this.layoutType === 'records' || this.moduleType === 'Home') {
            twitter = this.settings.get('twitter');
        }
        if (!twitter) {
            return false;
        }
        twitter = twitter.replace(/ /g, '');
        this.twitter = twitter;
        return twitter;
    },

    /**
     * Load twitter data
     *
     * @param {object} options
     * @return {boolean} `false` if twitter name could not be established
     */
    loadData: function(options) {
        if (this.disposed || this.meta.config) {
            return;
        }

        this.screen_name = this.settings.get('twitter') || false;
        this.tried = false;

        if (this.viewName === 'config') {
            return false;
        }
        this.loadDataCompleteCb = options ? options.complete : null;
        this.connectorCriteria = ['eapm_bean', 'test_passed'];
        this.checkConnector('ext_rest_twitter',
            _.bind(this.loadDataWithValidConnector, this),
            _.bind(this.handleLoadError, this),
            this.connectorCriteria);
    },

    /**
     * With a valid connector, load twitter data
     *
     * @param {object} connector - connector will have been validated already
     */
    loadDataWithValidConnector: function(connector) {
        if (!this.getTwitterName()) {
            if (_.isFunction(this.loadDataCompleteCb)) {
                this.loadDataCompleteCb();
            }
            return false;
        }

        var limit = parseInt(this.settings.get('limit'), 10) || this.limit,
            self = this;

        var currentUserUrl = app.api.buildURL('connector/twitter/currentUser','','',{connectorHash:connector.connectorHash});
        if (!this.current_twitter_user_name) {
            app.api.call('READ', currentUserUrl, {},{
                success: function(data) {
                    app.cache.set(self.cacheKey, {
                        'current_twitter_user_name': data.screen_name,
                        'current_twitter_user_pic': data.profile_image_url
                    });
                    self.current_twitter_user_name = data.screen_name;
                    self.current_twitter_user_pic = data.profile_image_url;
                    if (!this.disposed) {
                        self.render();
                    }
                },
                complete: self.loadDataCompleteCb
            });
        }

        var url = app.api.buildURL('connector/twitter','',{id:this.twitter},{count:limit,connectorHash:connector.connectorHash});
        app.api.call('READ', url, {},{
            success: function (data) {
                if (self.disposed) {
                    return;
                }
                var tweets = [];
                if (data.success !== false) {
                    _.each(data, function (tweet) {
                        var time = new Date(tweet.created_at.replace(/^\w+ (\w+) (\d+) ([\d:]+) \+0000 (\d+)$/,
                                '$1 $2 $4 $3 UTC')),
                            date = app.date.format(time, 'Y/m/d H:i:s'),
                        // retweeted tweets are sometimes truncated so use the original as source text
                            text = tweet.retweeted_status ? 'RT @'+tweet.retweeted_status.user.screen_name+': '+tweet.retweeted_status.text : tweet.text,
                            sourceUrl = tweet.source,
                            id = tweet.id_str,
                            name = tweet.user.name,
                            tokenText = text.split(' '),
                            screen_name = tweet.user.screen_name,
                            profile_image_url = tweet.user.profile_image_url_https,
                            j,
                            rightNow = new Date(),
                            diff = (rightNow.getTime() - time.getTime())/(1000*60*60*24),
                            useAbsTime = diff > 1;

                        // Search for links and turn them into hrefs
                        for (j = 0; j < tokenText.length; j++) {
                            if (tokenText[j].charAt(0) == 'h' && tokenText[j].charAt(1) == 't') {
                                tokenText[j] = "<a class='googledoc-fancybox' href=" + '"' + tokenText[j] + '"' + "target='_blank'>" + tokenText[j] + "</a>";
                            }
                        }

                        text = tokenText.join(' ');
                        tweets.push({id: id, name: name, screen_name: screen_name, profile_image_url: profile_image_url, text: text, source: sourceUrl, date: date, useAbsTime: useAbsTime});
                    }, this);
                }

                self.tweets = tweets;
                if (!this.disposed) {
                    self.template = app.template.get(self.name + '.Home');
                    self.render();
                }
            },
            error: function(data) {
                if (self.tried === false) {
                    self.tried = true;
                    // twitter get returned error, so re-get connectors
                    var name = 'ext_rest_twitter';
                    var funcWrapper = function () {
                        self.checkConnector(name,
                            _.bind(self.loadDataWithValidConnector, self),
                            _.bind(self.handleLoadError, self),
                            self.connectorCriteria);
                    };
                    self.getConnectors(name, funcWrapper);
                }
                else {
                    self.handleLoadError(null);
                }
            },
            complete: self.loadDataCompleteCb
        });
    },

    /**
     * Error handler for if connector validation errors at some point
     *
     * @param {object} connector
     */
    handleLoadError: function(connector) {
        if (this.disposed) {
            return;
        }
        this.showGeneric = true;
        this.errorLBL = app.lang.get('ERROR_UNABLE_TO_RETRIEVE_DATA');
        this.template = app.template.get(this.name + '.twitter-need-configure.Home');
        if (connector === null) {
            //Connector doesn't exist
            this.errorLBL = app.lang.get('LBL_ERROR_CANNOT_FIND_TWITTER') + this.twitter;
        }
        else if (!connector.test_passed && connector.testing_enabled) {
            //OAuth failed
            this.needOAuth = true;
            this.needConnect = false;
            this.showGeneric = false;
            this.showAdmin = app.acl.hasAccess('admin', 'Administration');
        }
        else if (!connector.eapm_bean) {
            //Not connected
            this.needOAuth = false;
            this.needConnect = true;
            this.showGeneric = false;
            this.showAdmin = app.acl.hasAccess('admin', 'Administration');
        }
        app.view.View.prototype._render.call(this);
        if (_.isFunction(this.loadDataCompleteCb)) {
            this.loadDataCompleteCb();
        }
    },

    _dispose: function() {
        if (this.model) {
            this.model.off('change', this.loadData, this);
        }

        app.view.View.prototype._dispose.call(this);
    }
}) },
"module-menu": {"controller": /*
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
 * Module menu provides a reusable and easy render of a module Menu.
 *
 * This also helps doing customization of the menu per module and provides more
 * metadata driven features.
 *
 * @class View.Views.Base.Home.ModuleMenuView
 * @alias SUGAR.App.view.views.BaseHomeModuleMenuView
 * @extends View.Views.Base.ModuleMenuView
 */
({
	// Module-menu View (base) 

    extendsFrom: 'ModuleMenuView',

    /**
     * The collection used to list dashboards on the dropdown.
     *
     * This is initialized on {@link #_initCollections}.
     *
     * @property
     * @type {Data.BeanCollection}
     */
    dashboards: null,

    /**
     * The collection used to list the recently viewed on the dropdown,
     * since it needs to use a {@link Data.MixedBeanCollection}
     *
     * This is initialized on {@link #_initCollections}.
     *
     * @property
     * @type {Data.MixedBeanCollection}
     */
    recentlyViewed: null,

    /**
     * Default settings used when none are supplied through metadata.
     *
     * Supported settings:
     * - {Number} dashboards Number of dashboards to show on the dashboards
     *   container. Pass 0 if you don't want to support dashboards listed here.
     * - {Number} favorites Number of records to show on the favorites
     *   container. Pass 0 if you don't want to support favorites.
     * - {Number} recently_viewed Number of records to show on the recently
     *   viewed container. Pass 0 if you don't want to support recently viewed.
     * - {Number} recently_viewed_toggle Threshold of records to use for
     *   toggling the recently viewed container. Pass 0 if you don't want to
     *   support recently viewed.
     *
     * Example:
     * ```
     * // ...
     * 'settings' => array(
     *     'dashboards' => 10,
     *     'favorites' => 5,
     *     'recently_viewed' => 9,
     *     'recently_viewed_toggle' => 4,
     *     //...
     * ),
     * //...
     * ```
     *
     * @protected
     */
    _defaultSettings: {
        dashboards: 20,
        favorites: 3,
        recently_viewed: 10,
        recently_viewed_toggle: 3
    },

    /**
     * Key for storing the last state of the recently viewed toggle.
     *
     * @type {String}
     */
    TOGGLE_RECENTS_KEY: 'more',

    /**
     * The lastState key to use in order to retrieve or save last recently
     * viewed toggle.
     */
    _recentToggleKey: null,

    /**
     * @inheritdoc
     *
     * Initializes the collections that will be used when the dropdown is
     * opened.
     *
     * Initializes Legacy dashboards.
     *
     * Sets the recently viewed toggle key to be ready to use when the dropdown
     * is opened.
     */
    initialize: function(options) {
        this._super('initialize', [options]);

        this.events = _.extend({}, this.events, {
            'click [data-toggle="recently-viewed"]': 'handleToggleRecentlyViewed'
        });

        this._initCollections();
        this._initLegacyDashboards();

        this.meta.last_state = { id: 'recent' };
        this._recentToggleKey = app.user.lastState.key(this.TOGGLE_RECENTS_KEY, this);
    },

    /**
     * Creates the collections needed for list of dashboards and recently
     * viewed.
     *
     * The views' collection is pointing to the Home module and we might need
     * to use that later for something that could be populated from that
     * module. Therefore, we create other collections to be used for extra
     * information that exists on the Home dropdown menu.
     *
     * @chainable
     * @private
     */
    _initCollections: function() {

        this.dashboards = app.data.createBeanCollection('Dashboards');
        this.recentlyViewed = app.data.createMixedBeanCollection();

        return this;
    },

    /**
     * Sets the legacy dashboards link if it is configured to be enabled.
     *
     * We are not using the `hide_dashboard_bwc` form, because we don't provide
     * this feature by default and it is enabled only on upgrades from 6.x..
     * This will be removed in the future, when all dashlets are available in
     * 7.x..
     *
     * @chainable
     * @private
     */
    _initLegacyDashboards: function() {
        if (app.config.enableLegacyDashboards && app.config.enableLegacyDashboards === true) {
            this.dashboardBwcLink = app.bwc.buildRoute(this.module, null, 'bwc_dashboard');
        }
        return this;
    },

    /**
     * @inheritdoc
     *
     * Adds the title and the class for the Home module (Sugar cube).
     */
    _renderHtml: function() {
        this._super('_renderHtml');

        this.$el.attr('title', app.lang.get('LBL_TABGROUP_HOME', this.module));
        this.$el.addClass('home btn-group');
    },

    /**
     * @override
     *
     * Populates all available dashboards when opening the menu. We override
     * this function without calling the parent one because we don't want to
     * reuse any of it.
     *
     * **Attention** We only populate up to 20 dashboards.
     *
     * TODO We need to keep changing the endpoint until SIDECAR-493 is
     * implemented.
     */
    populateMenu: function() {
        var pattern = /^(LBL|TPL|NTC|MSG)_(_|[a-zA-Z0-9])*$/;
        this.$('.active').removeClass('active');
        this.dashboards.fetch({
            'limit': this._settings['dashboards'],
            'showAlerts': false,
            'success': _.bind(function(data) {

                _.each(data.models, function(model) {
                    if (pattern.test(model.get('name'))) {
                        model.set('name', app.lang.get(model.get('name'), model.module));
                    }
                    // hardcode the module to `Home` due to different link that
                    // we support
                    model.module = 'Home';
                });

                this._renderPartial('dashboards', {
                    collection: this.dashboards,
                    active: this.context.get('module') === 'Home' && this.context.get('model')
                });

            }, this),
            'endpoint': function(method, model, options, callbacks) {
                app.api.records(method, 'Dashboards', model.attributes, options.params, callbacks);
            }
        });

        this.populateRecentlyViewed(false);
    },

    /**
     * Populates recently viewed records with a limit based on last state key.
     *
     * Based on the state it will read 2 different metadata properties:
     *
     * - `recently_viewed_toggle` for the value to start toggling
     * - `recently_viewed` for maximum records to retrieve
     *
     * Defaults to `recently_viewed_toggle` if no state is defined.
     *
     * @param {Boolean} focusToggle Whether to set focus on the toggle after rendering
     */
    populateRecentlyViewed: function(focusToggle) {

        var visible = app.user.lastState.get(this._recentToggleKey),
            threshold = this._settings['recently_viewed_toggle'],
            limit = this._settings[visible ? 'recently_viewed' : 'recently_viewed_toggle'];

        if (limit <= 0) {
            return;
        }

        var modules = this._getModulesForRecentlyViewed();
        if (_.isEmpty(modules)) {
            return;
        }

        this.recentlyViewed.fetch({
            'showAlerts': false,
            'fields': ['id', 'name'],
            'date': '-7 DAY',
            'limit': limit,
            'module_list': modules,
            'success': _.bind(function(data) {
                this._renderPartial('recently-viewed', {
                    collection: this.recentlyViewed,
                    open: !visible,
                    showRecentToggle: data.models.length > threshold || data.next_offset !== -1
                });
                if (focusToggle && this.isOpen()) {
                    // put focus back on toggle after renderPartial
                    this.$('[data-toggle="recently-viewed"]').focus();
                }
            }, this),
            'endpoint': function(method, model, options, callbacks) {
                var url = app.api.buildURL('recent', 'read', options.attributes, options.params);
                app.api.call(method, url, null, callbacks, options.params);
            }
        });

        return;
    },

    /**
     * Retrieve a list of modules where support for recently viewed records is
     * enabled and current user has access to list their records.
     *
     * Dashboards is discarded since it is already populated by default on the
     * drop down list {@link #populateMenu}.
     *
     * To disable recently viewed items for a specific module, please set the
     * `recently_viewed => 0` on:
     *
     * - `{custom/,}modules/{module}/clients/{platform}/view/module-menu/module-menu.php`
     *
     * @return {Array} List of supported modules names.
     * @private
     */
    _getModulesForRecentlyViewed: function() {
        // FIXME: we should find a better option instead of relying on visible
        // modules
        var modules = app.metadata.getModuleNames({filter: 'visible', access: 'list'});

        modules = _.filter(modules, function(module) {
            var view = app.metadata.getView(module, 'module-menu');
            return !view || !view.settings || view.settings.recently_viewed > 0;
        });

        return modules;
    },

    /**
     * Handles the toggle of the more recently viewed mixed records.
     *
     * This triggers a refresh on the data to be retrieved based on the amount
     * defined in metadata for the given state. This way we limit the amount of
     * data to be retrieve to the current state and not getting always the
     * maximum.
     *
     * @param {Event} event The click event that triggered the toggle.
     */
    handleToggleRecentlyViewed: function(event) {
        app.user.lastState.set(this._recentToggleKey, Number(!app.user.lastState.get(this._recentToggleKey)));
        this.populateRecentlyViewed(true);
        event.stopPropagation();
    }
}) },
"top-activity-user": {"controller": /*
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
 * @class View.Views.Base.Home.TopActivityUserView
 * @alias SUGAR.App.view.views.BaseHomeTopActivityUserView
 * @extends View.View
 */
({
	// Top-activity-user View (base) 

    plugins: ['Dashlet', 'GridBuilder'],
    events: {
        'change select[name=filter_duration]': 'filterChanged'
    },
    /**
     * Track if current user is manager.
     */
    isManager: false,
    initDashlet: function(viewName) {
        this.collection = new app.BeanCollection();
        this.isManager = app.user.get('is_manager');
        if(!this.meta.config) {
            this.collection.on("reset", this.render, this);
        }
    },
    _mapping: {
        meetings: {
            icon: 'fa-comments',
            label: 'LBL_MOST_MEETING_HELD'
        },
        inbound_emails: {
            icon: 'fa-envelope',
            label: 'LBL_MOST_EMAILS_RECEIVED'
        },
        outbound_emails: {
            icon: 'fa-envelope-o',
            label: 'LBL_MOST_EMAILS_SENT'
        },
        calls: {
            icon: 'fa-phone',
            label: 'LBL_MOST_CALLS_MADE'
        }
    },
    loadData: function(params) {
        if(this.meta.config) {
            return;
        }
        var url = app.api.buildURL('mostactiveusers', null, null, {days: this.settings.get("filter_duration")}),
            self = this;
        app.api.call("read", url, null, {
            success: function(data) {
                if(self.disposed) {
                    return;
                }
                var models = [];
                _.each(data, function(attributes, module){
                    if(_.isEmpty(attributes)) {
                        return;
                    }
                    var model = new app.Bean(_.extend({
                        id: _.uniqueId('aui')
                    }, attributes));
                    model.module = module;
                    model.set("name", model.get("first_name") + ' ' + model.get("last_name"));
                    model.set("icon", self._mapping[module]['icon']);
                    var template = Handlebars.compile(app.lang.get(self._mapping[module]['label'], self.module));
                    model.set("label", template({
                        count: model.get("count")
                    }));
                    model.set("pictureUrl", app.api.buildFileURL({
                        module: "Users",
                        id: model.get("user_id"),
                        field: "picture"
                    }));
                    models.push(model);
                }, this);
                self.collection.reset(models);
            },
            complete: params ? params.complete : null
        });
    },
    filterChanged: function(evt) {
        this.loadData();
    },

    _dispose: function() {
        if(this.collection) {
            this.collection.off("reset", null, this);
        }
        app.view.View.prototype._dispose.call(this);
    }
}) }
}}
,
"layouts": {}
,
"datas": {}

},
		"Contacts":{"fieldTemplates": {}
,
"views": {
"base": {
"record": {"controller": /*
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
	// Record View (base) 

    extendsFrom: 'RecordView',

    /**
     * @inheritdoc
     */
    initialize: function(options) {
        this.plugins = _.union(this.plugins || [], ['HistoricalSummary']);
        this._super('initialize', [options]);
    }
}) }
}}
,
"layouts": {}
,
"datas": {}

},
		"Accounts":{"fieldTemplates": {}
,
"views": {
"base": {
"record": {"controller": /*
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
 * @class View.Views.Base.Accounts.RecordView
 * @alias SUGAR.App.view.views.BaseAccountsRecordView
 * @extends View.Views.Base.RecordView
 */
({
	// Record View (base) 

    extendsFrom: 'RecordView',

    /**
     * @inheritdoc
     */
    initialize: function(options) {
        this.plugins = _.union(this.plugins || [], ['HistoricalSummary']);
        this._super('initialize', [options]);
    }
}) },
"dnb-bal-results": {"controller": /*
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
	// Dnb-bal-results View (base) 

    extendsFrom: 'DnbBalResultsView',

    events: {
        'click .importDNBData': 'importDNBData',
        'click a.dnb-company-name': 'getCompanyDetails',
        'click .backToList' : 'backToCompanyList',
        'click [data-action="show-more"]': 'invokePagination',
        'click .bulkImport': 'bulkImport',
        'change .dnb-bi-chk': 'importCheckBox',
        'change [name="dnb-bi-slctall"]': 'selectRecords'
    },

    selectors: {
        'load': '#dnb-bal-result-loading',
        'rslt': '#dnb-bal-result',
        'rsltList': 'ul#dnb-results-list'
    },

    /*
     * @property {Boolean} for check box selects
     */
    selectAll: true,

    /*
     * @property {Object} balAcctDD Data Dictionary For D&B BAL Response
     */
    balAcctDD: null,

    //limit on the max # of records that can be bulk imported
    bulkImportLimit: 20,

    /**
     * @override
     * @param {Object} options
     */
    initialize: function(options) {
        this._super('initialize', [options]);
        this.initDD();
        this.initDashlet();
        this.paginationCallback = this.baseAccountsBAL;
        this.rowTmpl = app.template.getView(this.name + '.dnb-account-row', this.module);
        this.resultTemplate = app.template.getView(this.name + '.dnb-bal-acct-rslt', this.module);
        this.resultCountTmpl = app.lang.get('LBL_DNB_BAL_ACCT_HEADER');
    },

    /**
     * Initialize the bal data dictionary
     */
    initDD: function() {
        this.balAcctDD = {
            'name': this.searchDD.companyname,
            'duns_num': this.searchDD.duns_num,
            'billing_address_street': this.searchDD.streetaddr,
            'billing_address_city': this.searchDD.town,
            'billing_address_state': this.searchDD.territory,
            'billing_address_country': this.searchDD.ctrycd,
            'recordNum': {
                'json_path': 'DisplaySequence'
            }
        };
        this.balAcctDD.locationtype = this.searchDD.locationtype;
        this.balAcctDD.isDupe = this.searchDD.isDupe;
    },

    loadData: function(options) {
        this.checkConnector('ext_rest_dnb',
            _.bind(this.loadDataWithValidConnector, this),
            _.bind(this.handleLoadError, this),
            ['test_passed']);
    },

    /**
     * Overriding the render function from base bal results render function
     */
    _render: function() {
        //TODO: Investigate why using this._super('_renderHtml');
        //we get Unable to find method _renderHtml on parent class of dnb-bal-results
        app.view.View.prototype._renderHtml.call(this);
    },

    /**
     * Build a list of accounts
     * @param {Object} balParams
     */
    buildAList: function(balParams) {
        if (this.disposed) {
            return;
        }
        this.template = this.resultTemplate;
        if (this.listData && this.listData.count) {
            delete this.listData['count'];
        }
        this.render();
        this.$(this.selectors.load).removeClass('hide');
        this.$(this.selectors.rslt).addClass('hide');
        this.toggleButton(true, '.bulkImport');
        this.baseAccountsBAL(balParams, this.renderBAL);
    },

    /**
     * Render BAL Accounts results
     * @param {Object} dnbBalApiRsp BAL API Response
     */
    renderBAL: function(dnbBalApiRsp) {
        var dnbBalRslt = {},
            appendRecords = false;
        if (this.resetPaginationFlag) {
            this.initPaginationParams();
        }
        if (dnbBalApiRsp.product) {
            var apiCompanyList = this.getJsonNode(dnbBalApiRsp.product, this.commonJSONPaths.srchRslt);
            //setting the formatted set of records to context
            //will be required when we paginate from the client side itself
            this.formattedRecordSet = this.formatSrchRslt(apiCompanyList, this.balAcctDD);
            //setting the api recordCount to context
            //will be used to determine if the pagination controls must be displayed
            this.recordCount = this.getJsonNode(dnbBalApiRsp.product, this.commonJSONPaths.srchCount);
            var nextPage = this.paginateRecords();
            //currentPage is set to null by initPaginationParams
            if (_.isNull(this.currentPage)) {
                this.currentPage = nextPage;
                dnbBalRslt.product = this.currentPage;
            } else {
                //this loop gets executed when api is called again to obtain more records
                dnbBalRslt.product = nextPage;
                appendRecords = true;
            }
            if (this.recordCount) {
                dnbBalRslt.count = this.recordCount;
            }
        } else if (dnbBalApiRsp.errmsg) {
            dnbBalRslt.errmsg = dnbBalApiRsp.errmsg;
        }
        this.renderPage(dnbBalRslt, appendRecords);
    },

    /**
     * @override
     * Renders the currentPage
     * @param {Object} pageData
     * @param {Boolean} append boolean to indicate if records need to be appended to existing list
     */
    renderPage: function(pageData, append) {
        var slctRecCnt;
        //if selectAll flag is true
        //then limit the # of selected records to be 20
        if (this.selectAll) {
            //if append is false
            //select all records
            if (append) {
                //get the # of selected records via selectors
                slctRecCnt = this.$('.dnb-bi-chk:checked').length;
            } else {
                slctRecCnt = 0;
            }
            _.each(pageData.product, function(balRsltObj) {
                //once this.bulkImportLimit is reached exit the function
                if(slctRecCnt >= this.bulkImportLimit) {
                    return;
                }
                //if balRsltObj is not a dupe then set the isSelected to true
                //is selected defines if the checkbox is selected or not
                if (_.isUndefined(balRsltObj.isDupe) && slctRecCnt < this.bulkImportLimit) {
                    balRsltObj.isSelected = true;
                    slctRecCnt++;
                } else {
                    balRsltObj.isSelected = false;
                }
            }, this);
        } else {
            _.each(pageData.product, function(balRsltObj) {
                balRsltObj.isSelected = false;
            }, this);
            slctRecCnt = 0;
        }
        //call the base renderPage function
        this._super('renderPage', [pageData, append]);
        //decide on the state of select all button
        //disable import button if selected record count is 0
        var disableImportBtn = slctRecCnt === 0;
        if (this.selectAll && disableImportBtn) {
            this.selectAll = false;
            this.$('[name="dnb-bi-slctall"]').prop('checked', false);
        }
        //decide on the state of import button
        this.toggleButton(disableImportBtn, '.bulkImport');
    },

    /**
     * Gets D&B Company Details For A DUNS number
     * DUNS number is stored as an id in the anchor tag
     * @param {Object} evt
     */
    getCompanyDetails: function(evt) {
        if (this.disposed) {
            return;
        }
        var duns_num = evt.target.id;
        if (duns_num) {
            this.template = app.template.getView(this.name + '.dnb-company-details', this.module);
            this.render();
            this.$('div#dnb-company-details').hide();
            this.$('.importDNBData').hide();
            this.baseCompanyInformation(duns_num, this.compInfoProdCD.lite, app.lang.get('LBL_DNB_BAL_LIST'), this.renderCompanyDetails);
        }
    },

    /**
     * Renders the dnb company details for adding companies from dashlets
     * Overriding the base dashlet function
     * @param {Object} companyDetails dnb api response for company details
     */
    renderCompanyDetails: function(companyDetails) {
        if (this.disposed) {
            return;
        }
        var formattedFirmographics, dnbFirmo = {};
        dnbFirmo.backToListLabel = companyDetails.backToListLabel;
        //if there are no company details then get the erroe message
        if (companyDetails.errmsg) {
            dnbFirmo.errmsg = companyDetails.errmsg;
        } else if (companyDetails.product) {
            formattedFirmographics = this.formatCompanyInfo(companyDetails.product, this.accountsDD);
            dnbFirmo.product = formattedFirmographics;
            this.currentCompany = companyDetails.product;
        }
        this.dnbFirmo = dnbFirmo;
        this.render();
        // hide / show importDNBData button
        this.$('.importDNBData').toggleClass('hide', !_.isUndefined(this.dnbFirmo.errmsg));
        this.$('div#dnb-company-detail-loading').hide();
        this.$('div#dnb-company-details').show();
    },

    /**
     * navigates users from company details back to results pane
     */
    backToCompanyList: function() {
        if (this.disposed) {
            return;
        }
        if (this.listData && this.listData.count) {
            delete this.listData['count'];
        }
        this.template = app.template.getView(this.name + '.dnb-bal-acct-rslt', this.module);
        this.render();
        this.$(this.selectors.load).removeClass('hide');
        this.$(this.selectors.rslt).addClass('hide');
        this.toggleButton(true, '.bulkImport');
        var dupeCheckParams = {
            'type': 'duns',
            'apiResponse': this.currentPage,
            'module': 'dunsPage'
        };
        this.baseDuplicateCheck(dupeCheckParams, this.renderPage);
    },

    /**
     * bulkImports accounts
     */
    bulkImport: function() {
        var selectedDuns = this.$('.dnb_checkbox:checked').map(function() {
            return this.name;
        });
        if (!_.isUndefined(selectedDuns) && selectedDuns.length > 0) {
            this.toggleButton(true, '.bulkImport');
            //filter the selectedDUNS from the this.dnbBalRslt.product
            var recToImport = this.currentPage.filter(function(rsltObj) {
                if(_.contains(selectedDuns, rsltObj.duns_num)) {
                    return rsltObj;
                }
            }).map(function(rsltObj) {
               return {
                   'name': rsltObj.name,
                   'duns_num': rsltObj.duns_num
               }
            });
            if (!_.isUndefined(recToImport) && recToImport.length > 0) {
                //invoke the bulk import api
                this.invokeBulkImport(recToImport, this.module, this.backToCompanyList);
            }
        } else {
            //display warning that no records were selected
            app.alert.show('dnb-import', {
                level: 'warning',
                title: app.lang.get('LBL_WARNING') + ':',
                messages: app.lang.get('LBL_DNB_BI_NO_SLCT'),
                autoClose: true
            });
        }
    },

    /**
     * Sees to it that only the # of records specified in bulkImportLimit are allowed to be checked
     * if # of checkboxes selected is 0 then disable the import button
     */
    importCheckBox: function(evt) {
        var dnbCheckBoxes = this.$('.dnb-bi-chk:checked');
        var isChecked = this.$(evt.currentTarget).prop('checked');
        //if # of selected records exceeds the bulkImportLimit display error message
        if (isChecked && dnbCheckBoxes.length > this.bulkImportLimit) {
            this.$(evt.currentTarget).prop('checked', false);
            app.alert.show('dnb-import', {
                level: 'warning',
                title: app.lang.get('LBL_WARNING') + ':',
                messages: app.lang.get('LBL_DNB_BI_REC_LIMIT'),
                autoClose: true
            });
        }
        this.toggleButton(dnbCheckBoxes.length === 0, '.bulkImport');
    },

    /**
     * Select / Unselect all records
     * @param {Object} evt
     */
    selectRecords: function(evt) {
        this.selectAll = this.$(evt.currentTarget).prop('checked');
        var slctCnt = 0;
        if (this.selectAll) {
            _.each(this.$('.dnb-bi-chk'), function(chkBox) {
                if (!this.$(chkBox).prop('disabled') && slctCnt < this.bulkImportLimit) {
                    this.$(chkBox).prop('checked', true);
                    slctCnt++;
                }
            }, this);
            this.toggleButton(slctCnt === 0, '.bulkImport');
        } else {
            this.$('.dnb-bi-chk').prop('checked', false);
            //disable the import button
            this.toggleButton(true, '.bulkImport');
        }
    }
}) }
}}
,
"layouts": {}
,
"datas": {}

},
		"Opportunities":{"fieldTemplates": {
"base": {
"rowaction": {"controller": /*
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
	// Rowaction FieldTemplate (base) 

    extendsFrom: "RowactionField",
    
    /**
     * @inheritdoc
     */
    initialize: function(options) {
        this.plugins = _.clone(this.plugins) || [];
        this.plugins.push('DisableDelete');
        this._super("initialize", [options]);
    }
}) },
"editablelistbutton": {"controller": /*
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
	// Editablelistbutton FieldTemplate (base) 

    extendsFrom: 'EditablelistbuttonField',
    /**
     * extend save options
     * @param {Object} options save options.
     * @return {Object} modified success param.
     */
    getCustomSaveOptions: function(options) {
        // make copy of original function we are extending
        var origSuccess = options.success;
        // return extended success function with added alert
        return {
            success: _.bind(function() {
                if (_.isFunction(origSuccess)) {
                    origSuccess.apply(this, arguments);
                }

                if(this.context.parent) {
                    var oppsCfg = app.metadata.getModule('Opportunities', 'config'),
                        reloadLinks = ['opportunities'];
                    if (oppsCfg && oppsCfg.opps_view_by == 'RevenueLineItems') {
                        reloadLinks.push('revenuelineitems');
                    }

                    this.context.parent.set('skipFetch', false);

                    // reload opportunities subpanel
                    this.context.parent.trigger('subpanel:reload', {links: reloadLinks});
                }
            }, this)
        };
    }
}) }
}}
,
"views": {
"base": {
"merge-duplicates": {"controller": /*
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
	// Merge-duplicates View (base) 

    extendsFrom: 'MergeDuplicatesView',

    /**
     * @inheritdoc
     */
    bindDataChange: function() {
        this._super('bindDataChange');

        var config = app.metadata.getModule('Forecasts', 'config');
        if(config && config.is_setup && config.forecast_by === 'Opportunities') {
            // make sure forecasts exists and is setup
            this.collection.on('change:sales_stage change:commit_stage reset', function(model) {
                var myModel = model;

                //check to see if this is a collection (for the reset event), use this.primaryRecord instead if true;
                if (!_.isUndefined(model.models)) {
                    myModel = this.primaryRecord;
                }
                var salesStage = myModel.get('sales_stage'),
                    commit_stage = this.getField('commit_stage');

                if(salesStage) {
                    if(_.contains(config.sales_stage_won, salesStage)) {
                        // check if the sales_stage has changed to a Closed Won stage
                        if(config.commit_stages_included.length) {
                            // set the commit_stage to the first included stage
                            myModel.set('commit_stage', _.first(config.commit_stages_included));
                        } else {
                            // otherwise set the commit stage to just "include"
                            myModel.set('commit_stage', 'include');
                        }
                        commit_stage.setDisabled(true);
                        this.$('input[data-record-id="' + myModel.get('id') + '"][name="copy_commit_stage"]').prop("checked", true);
                    } else if(_.contains(config.sales_stage_lost, salesStage)) {
                        // check if the sales_stage has changed to a Closed Lost stage
                        // set the commit_stage to exclude
                        myModel.set('commit_stage', 'exclude');
                        commit_stage.setDisabled(true);
                        this.$('input[data-record-id="' + myModel.get('id') + '"][name="copy_commit_stage"]').prop("checked", true);
                    } else {
                        commit_stage.setDisabled(false);
                    }
                }
            }, this);
        }
    }
}) },
"record": {"controller": /*
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
	// Record View (base) 

    extendsFrom: 'RecordView',

    /**
     * Holds a reference to the alert this view triggers
     */
    alert: undefined,

    /**
     * Holds a reference to the alert this view triggers
     */
    cancelClicked: function() {
        /**
         * todo: this is a sad way to work around some problems with sugarlogic and revertAttributes
         * but it makes things work now. Probability listens for Sales Stage to change and then by
         * SugarLogic, it updates probability when sales_stage changes. When the user clicks cancel,
         * it goes to revertAttributes() which sets the model back how it was, but when you try to
         * navigate away, it picks up those new changes as unsaved changes to your model, and tries to
         * falsely warn the user. This sets the model back to those changed attributes (causing them to
         * show up in this.model.changed) then calls the parent cancelClicked function which does the
         * exact same thing, but that time, since the model was already set, it doesn't see anything in
         * this.model.changed, so it doesn't warn the user.
         */
        var changedAttributes = this.model.changedAttributes(this.model.getSynced());
        this.model.set(changedAttributes, { revert: true });
        this._super('cancelClicked');
    },

    /**
     * @inheritdoc
     * @param {Object} options
     */
    initialize: function(options) {
        this.plugins = _.union(this.plugins, ['LinkedModel', 'HistoricalSummary', 'CommittedDeleteWarning']);

        this._super('initialize', [options]);

        app.utils.hideForecastCommitStageField(this.meta.panels);
    },
    
}) },
"massupdate": {"controller": /*
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
	// Massupdate View (base) 

    extendsFrom: "MassupdateView",
    
    /**
     * @inheritdoc
     */
    initialize: function(options) {
        this.plugins = _.union(this.plugins || [], ['DisableMassDelete', 'CommittedDeleteWarning']);
        this._super("initialize", [options]);
    },

    /**
     *
     * @inheritdoc
     */
    setMetadata: function(options) {
        var config = app.metadata.getModule('Forecasts', 'config');

        this._super("setMetadata", [options]);

        if (!config || (config && !config.is_setup)) {
            _.each(options.meta.panels, function(panel) {
                _.every(panel.fields, function (item, index) {
                    if (_.isEqual(item.name, "commit_stage")) {
                        panel.fields.splice(index, 1);
                        return false;
                    }
                    return true;
                }, this);
            }, this);
        }
    },

    /**
     * @inheritdoc
     */
    save: function(forCalcFields) {
        var forecastCfg = app.metadata.getModule("Forecasts", "config");
        if (forecastCfg && forecastCfg.is_setup) {
            // Forecasts is enabled and setup
            var hasCommitStage = _.some(this.fieldValues, function(field) {
                    return field.name === 'commit_stage';
                }),
                hasClosedModels = false;

            if(!hasCommitStage && this.defaultOption.name === 'commit_stage') {
                hasCommitStage = true;
            }

            if(hasCommitStage) {
                hasClosedModels = this.checkMassUpdateClosedModels();
            }

            if(!hasClosedModels) {
                // if this has closed models, first time through will uncheck but not save
                // if this doesn't it will save like normal
                this._super('save', [forCalcFields]);
            }
        } else {
            // Forecasts is not enabled and the commit_stage field isn't in the mass update list
            this._super('save', [forCalcFields]);
        }
    }
}) },
"recordlist": {"controller": /*
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
 * @class View.Views.Base.OpportunitiesRecordlistView
 * @alias SUGAR.App.view.views.BaseOpportunitiesRecordlistView
 * @extends View.Views.Base.RecordlistView
 */
({
	// Recordlist View (base) 

    extendsFrom: 'RecordlistView',

    /**
     * @inheritdoc
     */
    initialize: function(options) {
        this.plugins = _.union(this.plugins || [], ['CommittedDeleteWarning']);
        this._super("initialize", [options]);
    },

    /**
     * @inheritdoc
     */
    parseFieldMetadata: function(options) {
        options = this._super('parseFieldMetadata', [options]);

        app.utils.hideForecastCommitStageField(options.meta.panels);

        return options;
    }
}) },
"create": {"controller": /*
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
 * @class View.Views.Base.Opportunities.CreateView
 * @alias SUGAR.App.view.views.OpportunitiesCreateView
 * @extends View.Views.Base.CreateView
 */
({
	// Create View (base) 

    extendsFrom: 'CreateView',


    /**
     * @inheritdoc
     */
    initialize: function(options) {
        this._super('initialize', [options]);
        app.utils.hideForecastCommitStageField(this.meta.panels);
    },

}) },
"panel-top": {"controller": /*
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
* @class View.Fields.Base.Opportunities.PanelTopField
* @alias App.view.fields.BaseOpportunitiesPanelTopField
* @extends View.Fields.Base.PanelTopField
*/
({
	// Panel-top View (base) 

    extendsFrom: "PanelTopView",

    /**
     * @inheritdoc
     */
    initialize: function(options) {
        this._super('initialize', [options]);

        this.on('linked-model:create', this._reloadRevenueLineItems, this);
    },

    /**
     * Refreshes the RevenueLineItems subpanel when a new Opportunity is added
     * @private
     */
    _reloadRevenueLineItems: function() {
        if (app.metadata.getModule('Opportunities', 'config').opps_view_by == 'RevenueLineItems') {
            var $rliSubpanel = $('div[data-subpanel-link="revenuelineitems"]');
            // only reload RLI subpanel if it is opened
            if (!$('li.subpanel', $rliSubpanel).hasClass('closed')) {
                this.context.parent.trigger('subpanel:reload', {links: ['revenuelineitems']});
            } else {
                // RLI Panel is closed, filter components to find the RLI panel and update count
                var rliComponent = _.find(this.layout.layout._components, function(component) {
                    return component.module === 'RevenueLineItems';
                });

                var cc_field = rliComponent.getComponent('panel-top').getField('collection-count');
                // TODO: We can't use fetchCount, once the component has been "fetched" it uses the wrong collection count for the label
                //cc_field.fetchCount();

                app.api.count('Accounts', {
                    id: this.context.parent.get('modelId'),
                    link:'revenuelineitems'
                }, {
                    success: function(data) {
                        cc_field.updateCount({ length: data.record_count });
                    }
                });
            }
        }
    }
}) }
}}
,
"layouts": {}
,
"datas": {}

},
		"Cases":{"fieldTemplates": {}
,
"views": {
"base": {
"record": {"controller": /*
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
	// Record View (base) 

    extendsFrom: 'RecordView',

    /**
     * @inheritdoc
     */
    initialize: function(options) {
        this.plugins = _.union(this.plugins || [], ['HistoricalSummary', 'KBContent']);
        this._super('initialize', [options]);
    }
}) }
}}
,
"layouts": {}
,
"datas": {}

},
		"Notes":{"fieldTemplates": {}
,
"views": {}
,
"layouts": {}
,
"datas": {}

},
		"Calls":{"fieldTemplates": {}
,
"views": {
"base": {
"resolve-conflicts-list": {"controller": /*
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
 * @class View.Views.Base.Calls.ResolveConflictsListView
 * @alias SUGAR.App.view.views.BaseCallsResolveConflictsListView
 * @extends View.Views.Base.ResolveConflictsListView
 */
({
	// Resolve-conflicts-list View (base) 

    extendsFrom: 'ResolveConflictsListView',

    /**
     * @inheritdoc
     *
     * The invitees field should not be displayed on list views. It is removed
     * before comparing models so that it doesn't get included.
     */
    _buildFieldDefinitions: function(modelToSave, modelInDb) {
        modelToSave.unset('invitees');
        this._super('_buildFieldDefinitions', [modelToSave, modelInDb]);
    }
}) },
"record": {"controller": /*
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
	// Record View (base) 

    extendsFrom: 'RecordView',

    /**
     * @inheritdoc
     */
    initialize: function(options) {
        this.plugins = _.union(this.plugins || [], ['EditAllRecurrences', 'AddAsInvitee']);
        this._super('initialize', [options]);
    }
}) },
"create-nodupecheck": {"controller": /*
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
 * @class View.Views.Base.Calls.CreateNodupecheckView
 * @alias SUGAR.App.view.views.CallsCreateNodupecheckView
 * @extends View.Views.Base.CreateNodupecheckView
 */
({
	// Create-nodupecheck View (base) 

    extendsFrom: 'CreateNodupecheckView',

    /**
     * @inheritdoc
     */
    initialize: function(options) {
        this.plugins = _.union(this.plugins || [], ['AddAsInvitee', 'ReminderTimeDefaults']);
        this._super('initialize', [options]);
    }
}) },
"create": {"controller": /*
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
 * @class View.Views.Base.Calls.CreateView
 * @alias SUGAR.App.view.views.CallsCreateView
 * @extends View.Views.Base.CreateView
 */
({
	// Create View (base) 

    extendsFrom: 'CreateView',

    /**
     * @inheritdoc
     */
    initialize: function(options) {
        this.plugins = _.union(this.plugins || [], ['AddAsInvitee', 'ReminderTimeDefaults']);
        this._super('initialize', [options]);
    }
}) }
}}
,
"layouts": {}
,
"datas": {
"base": {
"model": {"controller": /*
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
 * @class Model.Datas.Base.CallsModel
 * @alias SUGAR.App.model.datas.BaseCallsModel
 * @extends Model.Bean
 */
({
	// Model Data (base) 

    plugins: ['VirtualCollection']
}) }
}}

},
		"Emails":{"fieldTemplates": {
"base": {
"sender": {"controller": /*
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
 * @class View.Fields.Base.Emails.SenderField
 * @alias SUGAR.App.view.fields.BaseEmailsSenderField
 * @extends View.Fields.Base.BaseField
 */
({
	// Sender FieldTemplate (base) 

    fieldTag: 'input.select2',

    initialize: function(options) {
        _.bindAll(this);
        app.view.Field.prototype.initialize.call(this, options);
        this.endpoint = this.def.endpoint;
    },

    _render: function() {
        var result = app.view.Field.prototype._render.call(this);

        if (this.tplName === 'edit') {
            var action = (this.endpoint.action) ? this.endpoint.action : null,
                attributes = (this.endpoint.attributes) ? this.endpoint.attributes : null,
                params = (this.endpoint.params) ? this.endpoint.params : null,
                myURL = app.api.buildURL(this.endpoint.module, action, attributes, params);

            app.api.call('GET', myURL, null, {
                success: this.populateValues,
                error: function(error) {
                    // display error if not a metadata refresh
                    if (error.status !== 412) {
                        app.alert.show('server-error', {
                            level: 'error',
                            messages: 'ERR_GENERIC_SERVER_ERROR'
                        });
                    }
                    app.error.handleHttpError(error);
                }
            });
        }

        return result;
    },

    populateValues: function(results) {
        var self = this,
            defaultResult,
            defaultValue = {};

        if (this.disposed === true) {
            return; //if field is already disposed, bail out
        }

        if (!_.isEmpty(results)) {
            defaultResult = _.find(results, function(result) {
                return result.default;
            });

            defaultValue = (defaultResult) ? defaultResult : results[0];

            if (!this.model.has(this.name)) {
                this.model.set(this.name, defaultValue.id);
            }
        }

        var format = function(item) {
            return item.display;
        };

        this.$(this.fieldTag).select2({
            data:{ results: results, text: 'display' },
            formatSelection: format,
            formatResult: format,
            width: '100%',
            placeholder: app.lang.get('LBL_SELECT_FROM_SENDER', this.module),
            initSelection: function(el, callback) {
                if (!_.isEmpty(defaultValue)) {
                      callback(defaultValue);
                }
            }
        }).on("change", function(e) {
            if (self.model.get(self.name) !== e.val) {
                self.model.set(self.name, e.val, {silent: true});
            }
        });
    },

    /**
     * @inheritdoc
     *
     * We need this empty so it won't affect refresh the select2 plugin
     */
    bindDomChange: function() {
    }
}) },
"attachment-button": {"controller": /*
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
 * Attachment button is a label that is styled like a button and will trigger a
 * given file input field.
 *
 * @class View.Fields.Base.Emails.AttachmentButtonField
 * @alias SUGAR.App.view.fields.BaseEmailsAttachmentButtonField
 * @extends View.Fields.Base.ButtonField
 */
({
	// Attachment-button FieldTemplate (base) 

    extendsFrom: 'ButtonField',
    initialize: function(options) {
        this._super('initialize',[options]);
        this.fileInputId = this.context.get('attachment_field_email_attachment');
    }
}) },
"emailaction-paneltop": {"controller": /*
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
 * @class View.Fields.Base.Emails.EmailactionPaneltopField
 * @alias SUGAR.App.view.fields.BaseEmailsEmailactionPaneltopField
 * @extends View.Fields.Base.EmailactionField
 */
({
	// Emailaction-paneltop FieldTemplate (base) 

    extendsFrom: 'EmailactionField',
    plugins: ['EmailClientLaunch'],

    /**
     * @inheritdoc
     * Set type to emailaction to get the template
     */
    initialize: function(options) {
        this._super("initialize", [options]);
        this.type = 'emailaction';
        this.on('emailclient:close', this.handleEmailClientClose, this);
    },

    /**
     * When email compose is done, refresh the data in the Emails subpanel
     */
    handleEmailClientClose: function() {
        var context = this.context.parent || this.context;
        context.trigger('panel-top:refresh', 'emails');
        context.trigger('panel-top:refresh', 'archived_emails');
    },

    /**
     * No additional options are needed from the element in order to launch the
     * email client.
     *
     * @param {jQuery} [$link] The element from which to get options.
     * @return {Object}
     * @private
     */
    _retrieveEmailOptionsFromLink: function($link) {
        return {};
    }
}) },
"recipients": {"controller": /*
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
 * @class View.Fields.Base.Emails.RecipientsField
 * @alias SUGAR.App.view.fields.BaseEmailsRecipientsField
 * @extends View.Fields.Base.BaseField
 */
({
	// Recipients FieldTemplate (base) 

    /**
     * @inheritdoc
     *
     * This field doesn't support `showNoData`.
     */
    showNoData: false,

    events: {
        'click .btn': '_showAddressBook'
    },

    fieldTag: 'input.select2',

    plugins: ['Tooltip', 'DragdropSelect2'],

    /**
     * @override
     * @param {Object} options
     */
    initialize: function(options) {
        app.view.Field.prototype.initialize.call(this, options);
        // initialize the value to an empty collection
        this.model.set(this.name, new Backbone.Collection);
    },

    /**
     * Sets up event handlers for syncing between the model and the recipients field.
     *
     * See {@link #format} for the acceptable formats for recipients.
     */
    bindDataChange: function() {
        /**
         * Sets the value of the Select2 element and rebuilds the tooltips for all recipients.
         * @param {Array} recipients the return value for
         *   {@link #format}.
         */
        var updateTheDom = _.bind(function(recipients) {
            // put the formatted recipients in the DOM
            this.getFieldElement().select2('data', recipients);
            // rebuild the tooltips
            this.initializeAllPluginTooltips();
            if (!this.def.readonly) {
                this.setDragDropPluginEvents(this.getFieldElement());
            }
        }, this);
        /**
         * Sets up event handlers that allow external forces to manipulate the contents of the collection, while
         * maintaining the requirement for storing formatted recipients.
         */
        var bindCollectionChange = _.bind(function() {
            var value = this.model.get(this.name);
            if (value instanceof Backbone.Collection) {
                // on "add" we want to force the collection to be reset to guarantee that all models in the collection
                // have been properly formatted for use in this field
                value.on('add', function(models, collection) {
                    // Backbone destroys the models currently in the collection on reset, so we must clone the
                    // collection in order to add the same models again
                    collection.reset(collection.clone().models);
                }, this);
                // on "remove" the requisite models have already been removed, so we only need to bother updating the
                // value in the DOM
                value.on('remove', function(models, collection) {
                    // format the recipients and put them in the DOM
                    updateTheDom(this.format(this.model.get(this.name)));
                }, this);
                // on "reset" we want to replace all models in the collection with their formatted versions
                value.on('reset', function(collection) {
                    var recipients = this.format(collection.models);
                    // do this silently so we don't trigger another reset event and end up in an infinite loop
                    collection.reset(recipients, {silent: true});
                    // put the newly formatted recipients in the DOM
                    updateTheDom(recipients);
                }, this);
            }
        }, this);

        // set up collection event handlers for the initial collection (initialized during this.initialize)
        bindCollectionChange();

        // handle the value on the model being changed to something other than the initial collection
        this.model.on('change:' + this.name, function(model, recipients) {
            var value = this.model.get(this.name);
            if (!(value instanceof Backbone.Collection)) {
                // whoa! someone changed the value to be something other than a collection
                // stick that new value inside a collection and reset the value, so we're always dealing with a
                // collection... another change event will be triggered, so we'll end up in the else block right after
                // this
                this.model.set(this.name, new Backbone.Collection(value));
            } else {
                // phew! the value is a collection
                // but it's not the initial collection, so we'll have to set up collection event handlers for this
                // instance
                bindCollectionChange();
                // you never know what data someone sticks on the field, so we better reset the values in the collection
                // so that the recipients become formatted as we expect
                value.reset(recipients.clone().models);
            }
        }, this);
    },

    /**
     * Remove events from the field value if it is a collection
     */
    unbindData: function() {
        var value = this.model.get(this.name);
        if (value instanceof Backbone.Collection) {
            value.off(null, null, this);
        }

        app.view.Field.prototype.unbindData.call(this);
    },

    /**
     * Render field with select2 widget
     *
     * @private
     */
    _render: function() {
        app.view.Field.prototype._render.call(this);

        var $recipientsField = this.getFieldElement();

        if ($recipientsField.length > 0) {
            $recipientsField.select2({
                allowClear: true,
                multiple: true,
                width: 'off',
                containerCssClass: 'select2-choices-pills-close',
                containerCss: {'width': '100%'},
                minimumInputLength: 1,
                query: _.bind(function(query) {
                    this.loadOptions(query);
                }, this),
                createSearchChoice: _.bind(this.createOption, this),
                formatSelection: _.bind(this.formatSelection, this),
                formatResult: _.bind(this.formatResult, this),
                formatSearching: _.bind(this.formatSearching, this),
                formatInputTooShort: _.bind(this.formatInputTooShort, this),
                selectOnBlur: true
            }).on('select2-removed', _.bind(function() {
                    this.initializeAllPluginTooltips();
                }, this));

            if (!!this.def.disabled) {
                $recipientsField.select2('disable');
            }

            if (!this.def.readonly) {
                this.setDragDropPluginEvents(this.getFieldElement());
            }
        }
    },

    /**
     * Fetches additional recipients from the server.
     *
     * See [Select2 Documentation of `query` parameter](http://ivaynberg.github.io/select2/#doc-query).
     *
     * @param {Object} query Possible attributes can be found in select2's
     *   documentation.
     */
    loadOptions: _.debounce(function(query) {
        var self = this,
            data = {
                results: [],
                // only show one page of results
                // if more results are needed, then the address book should be used
                more: false
            },
            options = {},
            callbacks = {},
            url;

        // add the search term to the URL params
        options.q = query.term;
        // the first 10 results should be enough
        // if more results are needed, then the address book should be used
        options.max_num = 10;
        // build the URL for fetching recipients that match the search term
        url = app.api.buildURL('Mail', 'recipients/find', null, options);
        // create the callbacks
        callbacks.success = function(result) {
            // the api returns objects formatted such that sidecar can convert them to beans
            // we need the records to be in a standard object format (@see RecipientsField::format) and the records
            // need to be converted into beans before we can format them
            var records = app.data.createMixedBeanCollection(result.records);
            // format and add the recipients that were found via the select2 callback
            data.results = self.format(records);
        };
        callbacks.error = function() {
            // don't add any recipients via the select2 callback
            data.results = [];
        };
        callbacks.complete = function() {
            // execute the select2 callback to add any new recipients
            query.callback(data);
        };
        app.api.call('read', url, null, callbacks);
    }, 300),

    /**
     * Create additional select2 options when loadOptions returns no matches for the search term.
     *
     * See [Select2 Documentation](http://ivaynberg.github.io/select2/#documentation).
     *
     * @param {String} term
     * @param {Array} data The options in the select2 drop-down after the query callback has been executed.
     * @return {Object}
     */
    createOption: function(term, data) {
        if (data.length === 0) {
            return {id: term, email: term};
        }
    },

    /**
     * Formats a recipient object for displaying selected recipients.
     *
     * See [Select2 Documentation](http://ivaynberg.github.io/select2/#documentation).
     *
     * @param {Object} recipient
     * @return {String}
     */
    formatSelection: function(recipient) {
        var value = recipient.name || recipient.email,
            template = app.template.getField(this.type, 'select2-selection', this.module);
        if (template) {
            return template({
                id: recipient.id,
                name: value,
                email: recipient.email
            });
        }
        return value;
    },

    /**
     * Formats a recipient object for displaying items in the recipient options list.
     *
     * See [Select2 Documentation](http://ivaynberg.github.io/select2/#documentation).
     *
     * @param {Object} recipient
     * @return {String}
     */
    formatResult: function(recipient) {
        var format,
            email = Handlebars.Utils.escapeExpression(recipient.email);

        if (recipient.name) {
            format = '"' + Handlebars.Utils.escapeExpression(recipient.name) + '" &lt;' + email + '&gt;';
        } else {
            format = email;
        }

        return format;
    },

    /**
     * Returns the localized message indicating that a search is in progress
     *
     * See [Select2 Documentation](http://ivaynberg.github.io/select2/#documentation).
     *
     * @return {string}
     */
    formatSearching: function() {
        return app.lang.get('LBL_LOADING', this.module);
    },

    /**
     * Suppresses the message indicating the number of characters remaining before a search will trigger
     *
     * See [Select2 Documentation](http://ivaynberg.github.io/select2/#documentation).
     *
     * @param {string} term Search string entered by user.
     * @param {number} min Minimum required term length.
     * @return {string}
     */
    formatInputTooShort: function(term, min) {
        return '';
    },

    /**
     * Formats a set of recipients into an array of objects that select2 understands.
     *
     * See {@link #_formatRecipient} for the acceptable/expected attributes to
     * be found on each recipient.
     *
     * @param {Mixed} data A Backbone collection, a single Backbone model or standard JavaScript object, or an array of
     *   Backbone models or standard JavaScript objects.
     * @return {Array}
     */
    format: function(data) {
        var formattedRecipients = [];
        // the lowest common denominator of potential inputs is an array of objects
        // force the parameter to be an array of either objects or Backbone models so that we're always dealing with
        // one data-structure type
        if (data instanceof Backbone.Collection) {
            // get the raw array of models
            data = data.models;
        } else if (data instanceof Backbone.Model || (_.isObject(data) && !_.isArray(data))) {
            // wrap the single model in an array so the code below behaves the same whether it's a model or a collection
            data = [data];
        }
        if (_.isArray(data)) {
            _.each(data, function(recipient) {
                var formattedRecipient;
                if (!(recipient instanceof Backbone.Model)) {
                    // force the object to be a Backbone.Model to allow for certain assumptions to be made
                    // there is no harm in this because the recipient will not be added to the return value if no email
                    // address is found on the model
                    recipient = new Backbone.Model(recipient);
                }
                formattedRecipient = this._formatRecipient(recipient);
                // only add the recipient if there is an email address
                if (!_.isEmpty(formattedRecipient.email)) {
                    formattedRecipients.push(formattedRecipient);
                }
            }, this);
        }
        return formattedRecipients;
    },

    /**
     * Determine whether or not the recipient pills should be locked.
     * @return {boolean}
     */
    recipientsLocked: function() {
        return this.def.readonly || false;
    },

    /**
     * Synchronize the recipient field value with the model and setup tooltips for email pills.
     */
    bindDomChange: function() {
        var self = this;
        this.getFieldElement()
            .on('change', function(event) {
                var value = $(this).select2('data');
                if (event.removed) {
                    value = _.filter(value, function(d) {
                        return d.id !== event.removed.id;
                    });
                }
                self.model.get(self.name).reset(value);
            })
            .on('select2-selecting', _.bind(this._handleEventOnSelected, this));
    },

    /**
     * Event handler for the Select2 "select2-selecting" event.
     *
     * @param {Event} event
     * @return {boolean}
     * @private
     */
    _handleEventOnSelected: function(event) {
        // only allow the user to select an option if it is determined to be a valid email address
        // returning true will select the option; false will prevent the option from being selected
        var isValidChoice = false;

        // since this event is fired twice, we only want to perform validation on the first event
        // event.object is not available on the second event
        if (event.object) {
            // the id and email address will not match when the email address came from the database and
            // we are assuming that email addresses stored in the database have already been validated
            if (event.object.id == event.object.email) {
                // this option must be a new email address that the application does not recognize
                // so validate it
                isValidChoice = this._validateEmailAddress(event.object.email);
            } else {
                // the application should recognize the email address, so no need to validate it again
                // just assume it's a valid choice and we'll deal with the consequences later (server-side)
                isValidChoice = true;
            }
        }

        return isValidChoice;
    },

    /**
     * Destroy all select2 and tooltip plugins
     */
    unbindDom: function() {
        this.getFieldElement().select2('destroy');
        app.view.Field.prototype.unbindDom.call(this);
    },

    /**
     * When in edit mode, the field includes an icon button for opening an address book. Clicking the button will
     * trigger an event to open the address book, which calls this method to do the dirty work. The selected recipients
     * are added to this field upon closing the address book.
     *
     * @private
     */
    _showAddressBook: function() {
        /**
         * Callback to add recipients, from a closing drawer, to the target Recipients field.
         * @param {undefined|Backbone.Collection} recipients
         */
        var addRecipients = _.bind(function(recipients) {
            if (recipients && recipients.length > 0) {
                this.model.get(this.name).add(recipients.models);
            }
        }, this);
        app.drawer.open(
            {
                layout: 'compose-addressbook',
                context: {
                    module: 'Emails',
                    mixed: true
                }
            },
            function(recipients) {
                addRecipients(recipients);
            }
        );
    },

    /**
     * update ul.select2-choices data attribute which prevents underrun of pills by
     * using a css definition for :before {content:''} set to float right
     *
     * @param {string} content
     */
    setContentBefore: function(content) {
        this.$('.select2-choices').attr('data-content-before', content);
    },

    /**
     * Gets the recipients DOM field
     *
     * @return {Object} DOM Element
     */
    getFieldElement: function() {
        return this.$(this.fieldTag);
    },

    /**
     * Format a recipient from a Backbone.Model to a standard JavaScript object with id, module, email, and name
     * attributes. Only id and email are required for the recipient to be considered valid
     * {@link #format}.
     *
     * All attributes are optional. However, if the email attribute is not present, then a primary email address should
     * exist on the bean. Without an email address that can be resolved, the recipient is considered to be invalid. The
     * bean attribute must be a Backbone.Model and it is likely to be a Bean. Data found in the bean is considered to be
     * secondary to the attributes found on its parent model. The bean is a mechanism for collecting additional
     * information about the recipient that may not have been explicitly set when the recipient was passed in.
     * @param {Backbone.Model} recipient
     * @return {Object}
     * @private
     */
    _formatRecipient: function(recipient) {
        var formattedRecipient = {};
        if (recipient instanceof Backbone.Model) {
            var bean = recipient.get('bean');
            // if there is a bean attribute, then more data can be extracted about the recipient to fill in any holes if
            // attributes are missing amongst the primary attributes
            // so follow the trail using recursion
            if (bean) {
                formattedRecipient = this._formatRecipient(bean);
            }
            // prioritize any values found on recipient over those already extracted from bean
            formattedRecipient = {
                id: recipient.get('id') || formattedRecipient.id || recipient.get('email'),
                module: recipient.get('module') || recipient.module || recipient.get('_module') || formattedRecipient.module,
                email: recipient.get('email') || formattedRecipient.email,
                locked: this.recipientsLocked(),
                name: recipient.get('name') || recipient.get('full_name') || formattedRecipient.name
            };
            // don't bother with the recipient unless an id is present
            if (!_.isEmpty(formattedRecipient.id)) {
                // extract the primary email address for the recipient
                if (_.isArray(formattedRecipient.email)) {
                    var primaryEmailAddress = _.findWhere(formattedRecipient.email, {primary_address: true});

                    if (!_.isUndefined(primaryEmailAddress) && !_.isEmpty(primaryEmailAddress.email_address)) {
                        formattedRecipient.email = primaryEmailAddress.email_address;
                    }
                }
                // drop any values that are empty or non-compliant
                _.each(formattedRecipient, function(val, key) {
                    if ((_.isEmpty(formattedRecipient[key]) || !_.isString(formattedRecipient[key])) && !_.isBoolean(formattedRecipient[key])) {
                        delete formattedRecipient[key];
                    }
                });
            } else {
                // drop all values if an id isn't present
                formattedRecipient = {};
            }
        }
        return formattedRecipient;
    },

    /**
     * Validates an email address on the server.
     *
     * @param {String} emailAddress
     * @return {boolean}
     * @private
     */
    _validateEmailAddress: function(emailAddress) {
        var isValid = false,
            callbacks = {},
            options = {
                // execute the api call synchronously so that the method doesn't return before the response is known
                async: false
            },
            url = app.api.buildURL('Mail', 'address/validate');

        callbacks.success = function(result) {
            isValid = result[emailAddress];
        };
        callbacks.error = function() {
            isValid = false;
        };
        app.api.call('create', url, [emailAddress], callbacks, options);

        return isValid;
    }
}) },
"compose-actionbar": {"controller": /*
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
 * Actionbar for the email compose view
 *
 * @class View.Fields.Base.Emails.ComposeActionbarField
 * @alias SUGAR.App.view.fields.BaseEmailsComposeActionbarField
 * @extends View.Fields.Base.FieldsetField
 */
({
	// Compose-actionbar FieldTemplate (base) 

    extendsFrom: 'FieldsetField',

    events: {
        'click a:not(.dropdown-toggle)': 'handleButtonClick'
    },

    /**
     * @inheritdoc
     */
    initialize: function(options) {
        this._super('initialize', [options]);
        this.type = 'fieldset';
    },

    /**
     * Fire an event when any of the buttons on the actionbar are clicked
     * Events could be set via the data-event attribute or an event is built using the button name
     *
     * @param evt
     */
    handleButtonClick: function(evt) {
        var triggerName, buttonName,
            $currentTarget = $(evt.currentTarget);
        if ($currentTarget.data('event')) {
            triggerName = $currentTarget.data('event');
        } else {
            buttonName = $currentTarget.attr('name') || 'button';
            triggerName = 'actionbar:' + buttonName + ':clicked';
        }
        this.view.context.trigger(triggerName);
    }
}) },
"quickcreate": {"controller": /*
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
 * @class View.Fields.Base.Emails.QuickcreateField
 * @alias SUGAR.App.view.fields.BaseEmailsQuickcreateField
 * @extends View.Fields.Base.QuickcreateField
 */
({
	// Quickcreate FieldTemplate (base) 

    extendsFrom: 'QuickcreateField',
    plugins: ['EmailClientLaunch'],

    /**
     * Used by EmailClientLaunch as a hook point to retrieve email options that are specific to a view/field
     * In this case we are using it to retrieve the parent model to make this email compose launching
     * context aware - prepopulating the to address with the given model and the parent relate field
     *
     * @returns {Object}
     * @private
     */
    _retrieveEmailOptionsFromLink: function() {
        var context = this.context.parent || this.context,
            parentModel = context.get('model'),
            emailOptions = {};

        if (parentModel && parentModel.id) {
            // set parent model as option to be passed to compose for To address & relate
            // if parentModel does not have email, it will be ignored as a To recipient
            // if parentModel's module is not an available module to relate, it will also be ignored
            emailOptions = {
                to_addresses: [{bean: parentModel}],
                related: parentModel
            };
        }

        return emailOptions;
    }
}) }
}}
,
"views": {
"base": {
"archive-email": {"controller": /*
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
 * @class View.Views.Base.Emails.ArchiveEmailView
 * @alias SUGAR.App.view.views.BaseEmailsArchiveEmailView
 * @extends View.Views.Base.Emails.ComposeView
 */
({
	// Archive-email View (base) 

    extendsFrom: 'EmailsComposeView',

    /**
     * Add click event handler to archive an email.
     * @param options
     */
    initialize: function(options) {
        this.events = _.extend({}, this.events, {
            'click [name=archive_button]': 'archive'
        });
        this._super('initialize', [options]);

        if (!this.model.has('assigned_user_id')) {
            this.model.set('assigned_user_id', app.user.id);
            this.model.set('assigned_user_name', app.user.get('full_name'));
        }
    },

    /**
     * Set headerpane title.
     * @private
     */
    _render: function () {
        this._super('_render');
        this.setTitle(app.lang.get('LBL_ARCHIVE_EMAIL', this.module));
    },

    /**
     * Archive email if validation passes.
     */
    archive: function(event) {
        this.setMainButtonsDisabled(true);
        this.model.doValidate(this.getFieldsToValidate(), _.bind(function(isValid) {
            if (isValid) {
                this.archiveEmail();
            } else {
                this.setMainButtonsDisabled(false);
            }
        }, this));
    },

    /**
     * Get fields that needs to be validated.
     * @returns {object}
     */
    getFieldsToValidate: function() {
        var fields = {};
        _.each(this.fields, function(field) {
            fields[field.name] = field.def;
        });
        return fields;
    },

    /**
     * Call archive api.
     */
    archiveEmail: function() {
        var archiveUrl = app.api.buildURL('Mail/archive'),
            alertKey = 'mail_archive',
            archiveEmailModel = this.initializeSendEmailModel();

        app.alert.show(alertKey, {level: 'process', title: app.lang.get('LBL_EMAIL_ARCHIVING', this.module)});

        app.api.call('create', archiveUrl, archiveEmailModel, {
            success: _.bind(function() {
                app.alert.dismiss(alertKey);
                app.alert.show(alertKey, {
                    autoClose: true,
                    level: 'success',
                    messages: app.lang.get('LBL_EMAIL_ARCHIVED', this.module)
                });
                app.drawer.close(this.model);
            }, this),
            error: function(error) {
                var msg = {level: 'error'};
                if (error && _.isString(error.message)) {
                    msg.messages = error.message;
                }
                app.alert.dismiss(alertKey);
                app.alert.show(alertKey, msg);
            },
            complete:_.bind(function() {
                if (!this.disposed) {
                    this.setMainButtonsDisabled(false);
                }
            }, this)
        });
    },

    /**
     * Get model that will be used to archive the email.
     * @returns {Backbone.Model}
     */
    initializeSendEmailModel: function() {
        var model = this._super('initializeSendEmailModel');
        model.set({
            'date_sent': this.model.get('date_sent'),
            'from_address': this.model.get('from_address'),
            'status': 'archive'
        });
        return model;
    },

    /**
     * Disable/enable archive button.
     * @param disabled
     */
    setMainButtonsDisabled: function(disabled) {
        this.getField('archive_button').setDisabled(disabled);
    },

    /**
     * No need to warn of configuration status for archive email because no
     * email is being sent.
     */
    notifyConfigurationStatus: $.noop
}) },
"compose-addressbook-headerpane": {"controller": /*
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
 * @class View.Views.Base.Emails.ComposeAddressbookHeaderpaneView
 * @alias SUGAR.App.view.views.BaseEmailsComposeAddressbookHeaderpaneView
 * @extends View.Views.Base.HeaderpaneView
 */
({
	// Compose-addressbook-headerpane View (base) 

    extendsFrom: "HeaderpaneView",

    events: {
        "click [name=done_button]":   "_done",
        "click [name=cancel_button]": "_cancel"
    },

     /**
      * The user clicked the Done button so trigger an event to add selected recipients from the address book to the
      * target field and then close the drawer.
      *
      * @private
      */
     _done: function() {
         var recipients = this.model.get("compose_addressbook_selected_recipients");

         if (recipients) {
             app.drawer.close(recipients);
         } else {
             this._cancel();
         }
     },

    /**
     * Close the drawer.
     *
     * @private
     */
    _cancel: function() {
        app.drawer.close();
    }
}) },
"compose-addressbook-list-bottom": {"controller": /*
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
 * @class View.Views.Base.Emails.ComposeAddressbookListBottomView
 * @alias SUGAR.App.view.views.BaseEmailsComposeAddressbookListBottomView
 * @extends View.Views.Base.ListBottomView
 */
({
	// Compose-addressbook-list-bottom View (base) 

    extendsFrom: "ListBottomView",

    /**
     * Assign proper label for 'show more' link.
     * Label should be "More recipients...".
     */
    setShowMoreLabel: function() {
        this.showMoreLabel = app.lang.get('LBL_SHOW_MORE_RECIPIENTS', this.module);
    }
}) },
"compose": {"controller": /*
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
 * @class View.Views.Base.Emails.ComposeView
 * @alias SUGAR.App.view.views.BaseEmailsComposeView
 * @extends View.Views.Base.RecordView
 */
({
	// Compose View (base) 

    extendsFrom: 'RecordView',

    _lastSelectedSignature: null,
    ATTACH_TYPE_SUGAR_DOCUMENT: 'document',
    ATTACH_TYPE_TEMPLATE: 'template',
    MIN_EDITOR_HEIGHT: 300,
    EDITOR_RESIZE_PADDING: 5,
    FIELD_PANEL_BODY_SELECTOR: '.row-fluid.panel_body',

    sendButtonName: 'send_button',
    cancelButtonName: 'cancel_button',
    saveAsDraftButtonName: 'draft_button',

    /**
     * @inheritdoc
     */
    initialize: function(options) {
        _.bindAll(this);
        this._super('initialize', [options]);
        this.events = _.extend({}, this.events, {
            'click [data-toggle-field]': '_handleSenderOptionClick'
        });
        this.context.on('actionbar:template_button:clicked', this.launchTemplateDrawer, this);
        this.context.on('actionbar:attach_sugardoc_button:clicked', this.launchDocumentDrawer, this);
        this.context.on('actionbar:signature_button:clicked', this.launchSignatureDrawer, this);
        this.context.on('attachments:updated', this.toggleAttachmentVisibility, this);
        this.context.on('tinymce:oninit', this.handleTinyMceInit, this);
        this.on('more-less:toggled', this.handleMoreLessToggled, this);
        app.drawer.on('drawer:resize', this.resizeEditor, this);

        this._lastSelectedSignature = app.user.getPreference('signature_default');
    },

    /**
     * @inheritdoc
     */
    delegateButtonEvents: function() {
        this.context.on('button:' + this.sendButtonName + ':click', this.send, this);
        this.context.on('button:' + this.saveAsDraftButtonName + ':click', this.saveAsDraft, this);
        this.context.on('button:' + this.cancelButtonName + ':click', this.cancel, this);
    },

    /**
     * @inheritdoc
     */
    _render: function() {
        this._super('_render');
        if (this.createMode) {
            this.setTitle(app.lang.get('LBL_COMPOSEEMAIL', this.module));
        }

        if (this.model.isNotEmpty) {
            var prepopulateValues = this.context.get('prepopulate');
            if (!_.isEmpty(prepopulateValues)) {
                this.prepopulate(prepopulateValues);
            }
            this.addSenderOptions();

            if (this.model.isNew()) {
                this._updateEditorWithSignature(this._lastSelectedSignature);
            }
        }

        this.notifyConfigurationStatus();
    },

    /**
     * Notifies the user of configuration issues and disables send button
     */
    notifyConfigurationStatus: function() {
        var sendButton,
            emailClientPrefence = app.user.getPreference('email_client_preference');

        if (_.isObject(emailClientPrefence) && _.isObject(emailClientPrefence.error)) {
            app.alert.show('email-client-status', {
                level: 'warning',
                messages: app.lang.get(emailClientPrefence.error.message, this.module),
                autoClose: false,
                onLinkClick: function() {
                    app.alert.dismiss('email-client-status');
                }
            });

            sendButton = this.getField('send_button');
            if (sendButton) {
                sendButton.setDisabled(true);
            }
        }
    },

    /**
     * Prepopulate fields on the email compose screen that are passed in on the context when opening this view
     * TODO: Refactor once we have custom module specific models
     * @param {Object} values
     */
    prepopulate: function(values) {
        var self = this;
        _.defer(function() {
            _.each(values, function(value, fieldName) {
                switch (fieldName) {
                    case 'related':
                        self._populateForModules(value);
                        self.populateRelated(value);
                        break;
                    default:
                        self.model.set(fieldName, value);
                }
            });
        });
    },

    /**
     * Populates email compose with module specific data.
     * TODO: Refactor once we have custom module specific models
     * @param {Data.Bean} relatedModel
     */
    _populateForModules: function(relatedModel) {
        if (relatedModel.module === 'Cases') {
            this._populateForCases(relatedModel);
        }
    },


    /**
     * Populates email compose with cases specific data.
     * TODO: Refactor once we have custom module specific models
     * @param {Data.Bean} relatedModel
     */
    _populateForCases: function(relatedModel) {
        var config = app.metadata.getConfig(),
            keyMacro = '%1',
            caseMacro = config.inboundEmailCaseSubjectMacro,
            subject = caseMacro + ' ' + relatedModel.get('name');

        subject = subject.replace(keyMacro, relatedModel.get('case_number'));
        this.model.set('subject', subject);
        if (!this.isFieldPopulated('to_addresses')) {
            // no addresses, attempt to populate from contacts relationship
            var contacts = relatedModel.getRelatedCollection('contacts');

            contacts.fetch({
                relate: true,
                success: _.bind(function(data) {
                    var toAddresses = _.map(data.models, function(model) {
                        return {bean: model};
                    }, this);

                    this.model.set('to_addresses', toAddresses);
                }, this),
                fields: ['id', 'full_name', 'email']
            });
        }
    },

    /**
     * Populate the parent_name (type: parent) with the related record passed in
     *
     * @param {Data.Bean} relatedModel
     */
    populateRelated: function(relatedModel) {
        var setParent = _.bind(function(model) {
            var parentNameField = this.getField('parent_name');
            if (model.module && parentNameField.isAvailableParentType(model.module)) {
                model.value = model.get('name');
                parentNameField.setValue(model);
            }
        }, this);

        if (!_.isEmpty(relatedModel.get('id')) && !_.isEmpty(relatedModel.get('name'))) {
            setParent(relatedModel);
        } else if (!_.isEmpty(relatedModel.get('id'))) {
            relatedModel.fetch({
                showAlerts: false,
                success: function(relatedModel) {
                    setParent(relatedModel);
                },
                fields: ['name']
            });
        }
    },

    /**
     * Enable/disable the page action dropdown menu based on whether email is sendable
     * @param {boolean} disabled
     */
    setMainButtonsDisabled: function(disabled) {
        this.getField('main_dropdown').setDisabled(disabled);
    },

    /**
     * Add Cc/Bcc toggle buttons
     * Initialize whether to show/hide fields and toggle show/hide buttons appropriately
     */
    addSenderOptions: function() {
        this._renderSenderOptions('to_addresses');
        this._initSenderOption('cc_addresses');
        this._initSenderOption('bcc_addresses');
    },

    /**
     * Render the sender option buttons and place them in the given container
     *
     * @param {string} container Name of field that will contain the sender option buttons
     * @private
     */
    _renderSenderOptions: function(container) {
        var field = this.getField(container),
            $panelBody,
            senderOptionTemplate;

        if (field) {
            $panelBody = field.$el.closest(this.FIELD_PANEL_BODY_SELECTOR);
            senderOptionTemplate = app.template.getView('compose-senderoptions', this.module);

            $(senderOptionTemplate({'module' : this.module}))
                .insertAfter($panelBody.find('div span.normal'));
        }
    },

    /**
     * Check if the given field has a value
     * Hide the field if there is no value prepopulated
     *
     * @param {string} fieldName Name of the field to initialize active state on
     * @private
     */
    _initSenderOption: function(fieldName) {
        var fieldValue = this.model.get(fieldName) || [];
        this.toggleSenderOption(fieldName, (fieldValue.length > 0));
    },

    /**
     * Toggle the state of the given field
     * Sets toggle button state and visibility of the field
     *
     * @param {string} fieldName Name of the field to toggle
     * @param {boolean} [active] Whether toggle button active and field shown
     */
    toggleSenderOption: function(fieldName, active) {
        var toggleButtonSelector = '[data-toggle-field="' + fieldName + '"]',
            $toggleButton = this.$(toggleButtonSelector);

        // if explicit active state not set, toggle to opposite
        if (_.isUndefined(active)) {
            active = !$toggleButton.hasClass('active');
        }

        $toggleButton.toggleClass('active', active);
        this._toggleFieldVisibility(fieldName, active);
    },

    /**
     * Event Handler for toggling the Cc/Bcc options on the page.
     *
     * @param {Event} event click event
     * @private
     */
    _handleSenderOptionClick: function(event) {
        var $toggleButton = $(event.currentTarget),
            fieldName = $toggleButton.data('toggle-field');

        this.toggleSenderOption(fieldName);
        this.resizeEditor();
    },

    /**
     * Show/hide a field section on the form
     *
     * @param {string} fieldName Name of the field to show/hide
     * @param {boolean} show Whether to show or hide the field
     * @private
     */
    _toggleFieldVisibility: function(fieldName, show) {
        var field = this.getField(fieldName);
        if (field) {
            field.$el.closest(this.FIELD_PANEL_BODY_SELECTOR).toggleClass('hide', !show);
        }
    },

    /**
     * Cancel and close the drawer
     */
    cancel: function() {
        app.drawer.close();
    },

    /**
     * Get the attachments from the model and format for the API
     *
     * @return {Array} array of attachments or empty array if none found
     */
    getAttachmentsForApi: function() {
        var attachments = this.model.get('attachments') || [];

        if (!_.isArray(attachments)) {
            attachments = [attachments];
        }

        return attachments;
    },

    /**
     * Get the individual related object fields from the model and format for the API
     *
     * @return {Object} API related argument as array with appropriate fields set
     */
    getRelatedForApi: function() {
        var related = {};
        var id = this.model.get('parent_id');
        var type;

        if (!_.isUndefined(id)) {
            id = id.toString();
            if (id.length > 0) {
                related['id'] = id;
                type = this.model.get('parent_type');
                if (!_.isUndefined(type)) {
                    type = type.toString();
                }
                related.type = type;
            }
        }

        return related;
    },

    /**
     * Get the team information from the model and format for the API
     *
     * @return {Object} API teams argument as array with appropriate fields set
     */
    getTeamsForApi: function() {
        var teamName = this.model.get('team_name') || [];
        var teams = {};
        teams.others = [];

        if (!_.isArray(teamName)) {
            teamName = [teamName];
        }

        _.each(teamName, function(team) {
            if (team.primary) {
                teams.primary = team.id.toString();
            } else if (!_.isUndefined(team.id)) {
                teams.others.push(team.id.toString());
            }
        }, this);

        if (teams.others.length == 0) {
            delete teams.others;
        }

        return teams;
    },

    /**
     * Build a backbone model that will be sent to the Mail API
     */
    initializeSendEmailModel: function() {
        var sendModel = new Backbone.Model(_.extend({}, this.model.attributes, {
            to_addresses: this.model.get('to_addresses'),
            cc_addresses: this.model.get('cc_addresses'),
            bcc_addresses: this.model.get('bcc_addresses'),
            attachments: this.getAttachmentsForApi(),
            related: this.getRelatedForApi(),
            teams: this.getTeamsForApi()
        }));
        return sendModel;
    },

    /**
     * Save the email as a draft for later sending
     */
    saveAsDraft: function() {
        this.saveModel(
            'draft',
            app.lang.get('LBL_DRAFT_SAVING', this.module),
            app.lang.get('LBL_DRAFT_SAVED', this.module),
            app.lang.get('LBL_ERROR_SAVING_DRAFT', this.module)
        );
    },

    /**
     * Send the email immediately or warn if user did not provide subject or body
     */
    send: function() {
        var sendEmail = _.bind(function() {
            this.saveModel(
                'ready',
                app.lang.get('LBL_EMAIL_SENDING', this.module),
                app.lang.get('LBL_EMAIL_SENT', this.module),
                app.lang.get('LBL_ERROR_SENDING_EMAIL', this.module)
            );
        }, this);

        if (!this.isFieldPopulated('to_addresses') &&
            !this.isFieldPopulated('cc_addresses') &&
            !this.isFieldPopulated('bcc_addresses')
        ) {
            this.model.trigger('error:validation:to_addresses');
            app.alert.show('send_error', {
                level: 'error',
                messages: 'LBL_EMAIL_COMPOSE_ERR_NO_RECIPIENTS'
            });
        } else if (!this.isFieldPopulated('subject') && !this.isFieldPopulated('html_body')) {
            app.alert.show('send_confirmation', {
                level: 'confirmation',
                messages: app.lang.get('LBL_NO_SUBJECT_NO_BODY_SEND_ANYWAYS', this.module),
                onConfirm: sendEmail
            });
        } else if (!this.isFieldPopulated('subject')) {
            app.alert.show('send_confirmation', {
                level: 'confirmation',
                messages: app.lang.get('LBL_SEND_ANYWAYS', this.module),
                onConfirm: sendEmail
            });
        } else if (!this.isFieldPopulated('html_body')) {
            app.alert.show('send_confirmation', {
                level: 'confirmation',
                messages: app.lang.get('LBL_NO_BODY_SEND_ANYWAYS', this.module),
                onConfirm: sendEmail
            });
        } else {
            sendEmail();
        }
    },

    /**
     * Build the backbone model to be sent to the Mail API with the appropriate status
     * Also display the appropriate alerts to give user indication of what is happening.
     *
     * @param {string} status (draft or ready)
     * @param {string} pendingMessage message to display while Mail API is being called
     * @param {string} successMessage message to display when a successful Mail API response has been received
     * @param {string} errorMessage message to display when Mail API call fails
     */
    saveModel: function(status, pendingMessage, successMessage, errorMessage) {
        var myURL,
            sendModel = this.initializeSendEmailModel();

        this.setMainButtonsDisabled(true);
        app.alert.show('mail_call_status', {level: 'process', title: pendingMessage});

        sendModel.set('status', status);
        myURL = app.api.buildURL('Mail');
        app.api.call('create', myURL, sendModel, {
            success: function() {
                app.alert.dismiss('mail_call_status');
                app.alert.show('mail_call_status', {autoClose: true, level: 'success', messages: successMessage});
                app.drawer.close(sendModel);
            },
            error: function(error) {
                var msg = {level: 'error'};
                if (error && _.isString(error.message)) {
                    msg.messages = error.message;
                }
                app.alert.dismiss('mail_call_status');
                app.alert.show('mail_call_status', msg);
            },
            complete: _.bind(function() {
                if (!this.disposed) {
                    this.setMainButtonsDisabled(false);
                }
            }, this)
        });
    },

    /**
     * Is this field populated?
     * @param {string} fieldName
     * @return {boolean}
     */
    isFieldPopulated: function(fieldName) {
        var value = this.model.get(fieldName);

        if (value instanceof Backbone.Collection) {
            return value.length !== 0;
        } else {
            return !_.isEmpty($.trim(value));
        }
    },

    /**
     * Open the drawer with the EmailTemplates selection list layout. The callback should take the data passed to it
     * and replace the existing editor contents with the selected template.
     */
    launchTemplateDrawer: function() {
        app.drawer.open({
                layout: 'selection-list',
                context: {
                    module: 'EmailTemplates'
                }
            },
            this.templateDrawerCallback
        );
    },

    /**
     * Receives the selected template to insert and begins the process of confirming the operation and inserting the
     * template into the editor.
     *
     * @param {Data.Bean} model
     */
    templateDrawerCallback: function(model) {
        if (model) {
            var emailTemplate = app.data.createBean('EmailTemplates', { id: model.id });
            emailTemplate.fetch({
                success: this.confirmTemplate,
                error: _.bind(function(error) {
                    this._showServerError(error);
                }, this)
            });
        }
    },

    /**
     * Presents the user with a confirmation prompt indicating that inserting the template will replace all content
     * in the editor. If the user confirms "yes" then the template will inserted.
     *
     * @param {Data.Bean} template
     */
    confirmTemplate: function(template) {
        if (this.disposed === true) return; //if view is already disposed, bail out
        app.alert.show('delete_confirmation', {
            level: 'confirmation',
            messages: app.lang.get('LBL_EMAILTEMPLATE_MESSAGE_SHOW_MSG', this.module),
            onConfirm: _.bind(function() {
                this.insertTemplate(template);
            }, this)
        });
    },

    /**
     * Inserts the template into the editor.
     *
     * @param {Data.Bean} template
     */
    insertTemplate: function(template) {
        var subject,
            notes;

        if (_.isObject(template)) {
            subject = template.get('subject');

            if (subject) {
                this.model.set('subject', subject);
            }

            //TODO: May need to move over replaces special characters.
            if (template.get('text_only') === 1) {
                this.model.set('html_body', template.get('body'));
            } else {
                this.model.set('html_body', template.get('body_html'));
            }

            notes = app.data.createBeanCollection('Notes');

            notes.fetch({
                'filter': {
                    'filter': [
                        {'parent_id': {'$equals': template.id}}
                    ]
                },
                success: _.bind(function(data) {
                    if (this.disposed === true) return; //if view is already disposed, bail out
                    if (!_.isEmpty(data.models)) {
                        this.insertTemplateAttachments(data.models);
                    }
                }, this),
                error: _.bind(function(error) {
                    this._showServerError(error);
                }, this)
            });

            // currently adds the html signature even when the template is text-only
            this._updateEditorWithSignature(this._lastSelectedSignature);
        }
    },

    /**
     * Inserts attachments associated with the template by triggering an "add" event for each attachment to add to the
     * attachments field.
     *
     * @param {Array} attachments
     */
    insertTemplateAttachments: function(attachments) {
        this.context.trigger('attachments:remove-by-tag', 'template');
        _.each(attachments, function(attachment) {
            var filename = attachment.get('filename');
            this.context.trigger('attachment:add', {
                id: attachment.id,
                name: filename,
                nameForDisplay: filename,
                tag: 'template',
                type: this.ATTACH_TYPE_TEMPLATE
            });
        }, this);
    },

    /**
     * Open the drawer with the SugarDocuments attachment selection list layout. The callback should take the data
     * passed to it and add the document as an attachment.
     */
    launchDocumentDrawer: function() {
        app.drawer.open({
                layout: 'selection-list',
                context: {module: 'Documents'}
            },
            this.documentDrawerCallback);
    },

    /**
     * Fetches the selected SugarDocument using its ID and triggers an "add" event to add the attachment to the
     * attachments field.
     *
     * @param {Data.Bean} model
     */
    documentDrawerCallback: function(model) {
        if (model) {
            var sugarDocument = app.data.createBean('Documents', { id: model.id });
            sugarDocument.fetch({
                success: _.bind(function(model) {
                    if (this.disposed === true) return; //if view is already disposed, bail out
                    this.context.trigger('attachment:add', {
                        id: model.id,
                        name: model.get('filename'),
                        nameForDisplay: model.get('filename'),
                        type: this.ATTACH_TYPE_SUGAR_DOCUMENT
                    });
                }, this),
                error: _.bind(function(error) {
                    this._showServerError(error);
                }, this)
            });
        }
    },

    /**
     * Hide attachment field row if no attachments, show when added
     *
     * @param {Array} attachments
     */
    toggleAttachmentVisibility: function(attachments) {
        var $row = this.$('.attachments').closest('.row-fluid');
        if (attachments.length > 0) {
            $row.removeClass('hidden');
            $row.addClass('single');
        } else {
            $row.addClass('hidden');
            $row.removeClass('single');
        }
        this.resizeEditor();
    },

    /**
     * Open the drawer with the signature selection layout. The callback should take the data passed to it and insert
     * the signature in the correct place.
     *
     * @private
     */
    launchSignatureDrawer: function() {
        app.drawer.open(
            {
                layout: 'selection-list',
                context: {
                    module: 'UserSignatures'
                }
            },
            this._updateEditorWithSignature
        );
    },

    /**
     * Fetches the signature content using its ID and updates the editor with the content.
     *
     * @param {Data.Bean} model
     */
    _updateEditorWithSignature: function(model) {
        if (model && model.id) {
            var signature = app.data.createBean('UserSignatures', { id: model.id });

            signature.fetch({
                success: _.bind(function(model) {
                    if (this.disposed === true) return; //if view is already disposed, bail out
                    if (this._insertSignature(model)) {
                        this._lastSelectedSignature = model;
                    }
                }, this),
                error: _.bind(function(error) {
                    this._showServerError(error);
                }, this)
            });
        }
    },

    /**
     * Inserts the signature into the editor.
     *
     * @param {Data.Bean} signature
     * @return {Boolean}
     * @private
     */
    _insertSignature: function(signature) {
        if (_.isObject(signature) && signature.get('signature_html')) {
            var signatureContent = this._formatSignature(signature.get('signature_html')),
                emailBody = this.model.get('html_body') || '',
                signatureOpenTag = '<br class="signature-begin" />',
                signatureCloseTag = '<br class="signature-end" />',
                signatureOpenTagForRegex = '(<br\ class=[\'"]signature\-begin[\'"].*?\/?>)',
                signatureCloseTagForRegex = '(<br\ class=[\'"]signature\-end[\'"].*?\/?>)',
                signatureOpenTagMatches = emailBody.match(new RegExp(signatureOpenTagForRegex, 'gi')),
                signatureCloseTagMatches = emailBody.match(new RegExp(signatureCloseTagForRegex, 'gi')),
                regex = new RegExp(signatureOpenTagForRegex + '[\\s\\S]*?' + signatureCloseTagForRegex, 'g');

            if (signatureOpenTagMatches && !signatureCloseTagMatches) {
                // there is a signature, but no close tag; so the signature runs from open tag until EOF
                emailBody = this._insertSignatureTag(emailBody, signatureCloseTag, false); // append the close tag
            } else if (!signatureOpenTagMatches && signatureCloseTagMatches) {
                // there is a signature, but no open tag; so the signature runs from BOF until close tag
                emailBody = this._insertSignatureTag(emailBody, signatureOpenTag, true); // prepend the open tag
            } else if (!signatureOpenTagMatches && !signatureCloseTagMatches) {
                // there is no signature, so add the tag to the correct location
                emailBody = this._insertSignatureTag(
                    emailBody,
                    signatureOpenTag + signatureCloseTag, // insert both tags as one
                    (app.user.getPreference('signature_prepend') == 'true'));
            }

            this.model.set('html_body', emailBody.replace(regex, '$1' + signatureContent + '$2'));

            return true;
        }

        return false;
    },

    /**
     * Inserts a tag into the editor to surround the signature so the signature can be identified again.
     *
     * @param {string} body
     * @param {string} tag
     * @param {string} prepend
     * @return {string}
     * @private
     */
    _insertSignatureTag: function(body, tag, prepend) {
        var preSignature = '',
            postSignature = '';

        prepend = prepend || false;

        if (prepend) {
            var bodyOpenTag = '<body>',
                bodyOpenTagLoc = body.indexOf(bodyOpenTag);

            if (bodyOpenTagLoc > -1) {
                preSignature = body.substr(0, bodyOpenTagLoc + bodyOpenTag.length);
                postSignature = body.substr(bodyOpenTagLoc + bodyOpenTag.length, body.length);
            } else {
                postSignature = body;
            }
        } else {
            var bodyCloseTag = '</body>',
                bodyCloseTagLoc = body.indexOf(bodyCloseTag);

            if (bodyCloseTagLoc > -1) {
                preSignature = body.substr(0, bodyCloseTagLoc);
                postSignature = body.substr(bodyCloseTagLoc, body.length);
            } else {
                preSignature = body;
            }
        }

        return preSignature + tag + postSignature;
    },

    /**
     * Formats HTML signatures to replace select HTML-entities with their true characters.
     *
     * @param {string} signature
     */
    _formatSignature: function(signature) {
        signature = signature.replace(/&lt;/gi, '<');
        signature = signature.replace(/&gt;/gi, '>');

        return signature;
    },

    /**
     * Show a generic alert for server errors resulting from custom API calls during Email Compose workflows. Logs
     * the error message for system administrators as well.
     *
     * @param {SUGAR.HttpError} error
     * @private
     */
    _showServerError: function(error) {
        app.alert.show('server-error', {
            level: 'error',
            messages: 'ERR_GENERIC_SERVER_ERROR'
        });
        app.error.handleHttpError(error);
    },

    /**
     * When toggling to show/hide hidden panel, resize editor accordingly
     */
    handleMoreLessToggled: function() {
        this.resizeEditor();
    },

    /**
     * When TinyMCE has been completely initialized, go ahead and resize the editor
     */
    handleTinyMceInit: function() {
        this.resizeEditor();
    },

    _dispose: function() {
        if (app.drawer) {
            app.drawer.off(null, null, this);
        }
        app.alert.dismiss('email-client-status');
        this._super('_dispose');
    },

    /**
     * Register keyboard shortcuts.
     */
    registerShortcuts: function() {
        app.shortcuts.register('Compose:Action:More', 'm', function() {
            var $primaryDropdown = this.$('.btn-primary[data-toggle=dropdown]');
            if ($primaryDropdown.is(':visible') && !$primaryDropdown.hasClass('disabled')) {
                $primaryDropdown.click();
            }
        }, this);
        this._super('registerShortcuts');
    },

    /**
     * Resize the html editor based on height of the drawer it is in
     *
     * @param {number} [drawerHeight] current height of the drawer or height the drawer will be after animations
     */
    resizeEditor: function(drawerHeight) {
        var $editor, headerHeight, recordHeight, showHideHeight, diffHeight, editorHeight, newEditorHeight;

        $editor = this.$('.mceLayout .mceIframeContainer iframe');
        //if editor not already rendered, cannot resize
        if ($editor.length === 0) {
            return;
        }

        drawerHeight = drawerHeight || app.drawer.getHeight();
        headerHeight = this.$('.headerpane').outerHeight(true);
        recordHeight = this.$('.record').outerHeight(true);
        showHideHeight = this.$('.show-hide-toggle').outerHeight(true);
        editorHeight = $editor.height();

        //calculate the space left to fill - subtracting padding to prevent scrollbar
        diffHeight = drawerHeight - headerHeight - recordHeight - showHideHeight - this.EDITOR_RESIZE_PADDING;

        //add the space left to fill to the current height of the editor to get a new height
        newEditorHeight = editorHeight + diffHeight;

        //maintain min height
        if (newEditorHeight < this.MIN_EDITOR_HEIGHT) {
            newEditorHeight = this.MIN_EDITOR_HEIGHT;
        }

        //set the new height for the editor
        $editor.height(newEditorHeight);
    },

    /**
     * Turn off logic from record view which handles clicking the cancel button
     * as it causes issues for email compose.
     *
     * TODO: Remove this when record view changes to use button events instead
     * of DOM based events
     */
    cancelClicked: $.noop
}) },
"compose-addressbook-filter": {"controller": /*
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
 * @class View.Views.Base.Emails.ComposeAddressbookFilterView
 * @alias SUGAR.App.view.views.BaseEmailsComposeAddressbookFilterView
 * @extends View.View
 */
({
	// Compose-addressbook-filter View (base) 

    _moduleFilterList: [],
    _allModulesId:     'All',
    _selectedModule:   null,
    _currentSearch:    '',
    events: {
        'keyup .search-name':        'throttledSearch',
        'paste .search-name':        'throttledSearch',
        'click .add-on.fa-times': 'clearInput'
    },
    /**
     * Converts the input field to a select2 field and adds the module filter for refining the search.
     *
     * @private
     */
    _render: function() {
        app.view.View.prototype._render.call(this);
        this.buildModuleFilterList();
        this.buildFilter();
    },
    /**
     * Builds the list of allowed modules to provide the data to the select2 field.
     */
    buildModuleFilterList: function() {
        var allowedModules = this.collection.allowed_modules;

        this._moduleFilterList = [
            {id: this._allModulesId, text: app.lang.get('LBL_MODULE_ALL')}
        ];

        _.each(allowedModules, function(module) {
            this._moduleFilterList.push({
                id: module,
                text: app.lang.getModuleName(module, {plural: true})
            });
        }, this);
    },
    /**
     * Converts the input field to a select2 field and initializes the selected module.
     */
    buildFilter: function() {
        var $filter = this.getFilterField();
        if ($filter.length > 0) {
            $filter.select2({
                data:                    this._moduleFilterList,
                allowClear:              false,
                multiple:                false,
                minimumResultsForSearch: -1,
                formatSelection:         _.bind(this.formatModuleSelection, this),
                formatResult:            _.bind(this.formatModuleChoice, this),
                dropdownCss:             {width: 'auto'},
                dropdownCssClass:        'search-filter-dropdown',
                initSelection:           _.bind(this.initSelection, this),
                escapeMarkup:            function(m) { return m; },
                width:                   'off'
            });
            $filter.off('change');
            $filter.on('change', _.bind(this.handleModuleSelection, this));
            this._selectedModule = this._selectedModule || this._allModulesId;
            $filter.select2('val', this._selectedModule);
        }
    },
    /**
     * Gets the filter DOM field.
     *
     * @returns {Object} DOM Element
     */
    getFilterField: function() {
        return this.$('input.select2');
    },
    /**
     * Gets the module filter DOM field.
     *
     * @returns {Object} DOM Element
     */
    getModuleFilter: function() {
        return this.$('div.choice-filter');
    },
    /**
     * Destroy the select2 plugin.
     */
    unbind: function() {
        $filter = this.getFilterField();
        if ($filter.length > 0) {
            $filter.off();
            $filter.select2('destroy');
        }
        this._super("unbind");
    },
    /**
     * Performs a search once the user has entered a term.
     */
    throttledSearch: _.debounce(function(evt) {
        var newSearch = this.$(evt.currentTarget).val();
        if (this._currentSearch !== newSearch) {
            this._currentSearch = newSearch;
            this.applyFilter();
        }
    }, 400),
    /**
     * Initialize the module selection with the value for all modules.
     *
     * @param el
     * @param callback
     */
    initSelection: function(el, callback) {
        if (el.is(this.getFilterField())) {
            var module = _.findWhere(this._moduleFilterList, {id: el.val()});
            callback({id: module.id, text: module.text});
        }
    },
    /**
     * Format the selected module to display its name.
     *
     * @param {Object} item
     * @return {String}
     */
    formatModuleSelection: function(item) {
        // update the text for the selected module
        this.getModuleFilter().html(item.text);
        return '<span class="select2-choice-type">'
            + app.lang.get('LBL_MODULE')
            + '<i class="fa fa-caret-down"></i></span>';
    },
    /**
     * Format the choices in the module select box.
     *
     * @param {Object} option
     * @return {String}
     */
    formatModuleChoice: function (option) {
        return '<div><span class="select2-match"></span>' + option.text + '</div>';
    },
    /**
     * Handler for when the module filter dropdown value changes, either via a click or manually calling jQuery's
     * .trigger("change") event.
     *
     * @param {Object} evt jQuery Change Event Object
     * @param {string} overrideVal (optional) ID passed in when manually changing the filter dropdown value
     */
    handleModuleSelection: function(evt, overrideVal) {
        var module = overrideVal || evt.val || this._selectedModule || this._allModulesId;
        // only perform a search if the module is in the approved list
        if (!_.isEmpty(_.findWhere(this._moduleFilterList, {id: module}))) {
            this._selectedModule = module;
            this.getFilterField().select2('val', this._selectedModule);
            this.getModuleFilter().css('cursor', 'pointer');
            this.applyFilter();
        }
    },
    /**
     * Triggers an event that makes a call to search the address book and filter the data set.
     */
    applyFilter: function() {
        var searchAllModules = (this._selectedModule === this._allModulesId),
            // pass an empty array when all modules are being searched
            module = searchAllModules ? [] : [this._selectedModule],
            // determine if the filter is dirty so the "clearQuickSearchIcon" can be added/removed appropriately
            isDirty = !_.isEmpty(this._currentSearch);
        this._toggleClearQuickSearchIcon(isDirty);
        this.context.trigger('compose:addressbook:search', module, this._currentSearch);
    },
    /**
     * Append or remove an icon to the quicksearch input so the user can clear the search easily.
     * @param {Boolean} addIt TRUE if you want to add it, FALSE to remove
     */
    _toggleClearQuickSearchIcon: function(addIt) {
        if (addIt && !this.$('.add-on.fa-times')[0]) {
            this.$('.filter-view.search').append('<i class="add-on fa fa-times"></i>');
        } else if (!addIt) {
            this.$('.add-on.fa-times').remove();
        }
    },
    /**
     * Clear input
     */
    clearInput: function() {
        var $filter          = this.getFilterField();
        this._currentSearch  = '';
        this._selectedModule = this._allModulesId;
        this.$('.search-name').val(this._currentSearch);
        if ($filter.length > 0) {
            $filter.select2('val', this._selectedModule);
        }
        this.applyFilter();
    }
}) },
"compose-addressbook-list": {"controller": /*
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
 * @class View.Views.Base.Emails.ComposeAddressbookListView
 * @alias SUGAR.App.view.views.BaseEmailsComposeAddressbookListView
 * @extends View.Views.Base.FlexListView
 */
({
	// Compose-addressbook-list View (base) 

    extendsFrom: 'FlexListView',
    plugins: ['ListColumnEllipsis', 'ListRemoveLinks', 'Pagination', 'MassCollection'],
    /**
     * Removes the event listeners that were added to the mass collection.
     */
    unbindData: function() {
        var massCollection = this.context.get('mass_collection');
        if (massCollection) {
            massCollection.off(null, null, this);
        }
        this._super("unbindData");
    },
    /**
     * Override to inject field names into the request when fetching data for the list.
     *
     * @param module
     * @returns {Array}
     */
    getFieldNames: function(module) {
        // id and module always get returned, so name and email just need to be added
        return ['name', 'email'];
    },
    /**
     * Override to hook in additional triggers as the mass collection is updated (rows are checked on/off in
     * the actionmenu field). Also attempts to pre-check any rows when the list is refreshed and selected recipients
     * are found within the new result set (this behavior occurs when the user searches the address book).
     *
     * @private
     */
    _render: function() {
        this._super("_render");
        var massCollection              = this.context.get('mass_collection'),
            selectedRecipientsFieldName = 'compose_addressbook_selected_recipients';
        if (massCollection) {
            // get rid of any old event listeners on the mass collection
            massCollection.off(null, null, this);
            // add a new recipient to the selected recipients field as recipients are added to the mass collection
            massCollection.on('add', function(model) {
                var existingRecipients = this.model.get(selectedRecipientsFieldName);
                if (model.id && existingRecipients instanceof Backbone.Collection) {
                    existingRecipients.add(model);
                }
            }, this);
            // remove a recipient from the selected recipients field as recipients are removed from the mass collection
            massCollection.on('remove', function(model) {
                var existingRecipients = this.model.get(selectedRecipientsFieldName);
                if (model.id && existingRecipients instanceof Backbone.Collection) {
                    existingRecipients.remove(model);
                }
            }, this);
            // remove from the selected recipients field all recipients found in the current collection
            massCollection.on('reset', function(newCollection, prevCollection) {
                var existingRecipients = this.model.get(selectedRecipientsFieldName);
                if (existingRecipients instanceof Backbone.Collection) {
                    if (newCollection.length > 0) {
                        //select all should be cumulative
                        newCollection.add(prevCollection.previousModels);
                    } else {
                        //remove all should only remove models that are visible in the list
                        newCollection.add(_.difference(prevCollection.previousModels, this.collection.models));
                    }
                    existingRecipients.reset(newCollection.models);
                }
            }, this);
            // find any currently selected recipients and add them to mass_collection so the checkboxes on the
            // corresponding rows are pre-selected
            var existingRecipients = this.model.get(selectedRecipientsFieldName);
            if (existingRecipients instanceof Backbone.Collection && existingRecipients.length > 0) {
                // only bother with adding, to mass_collection, recipients that are visible in the list view
                var recipientsToPreselect = existingRecipients.filter(_.bind(function(recipient) {
                    return (this.collection.where({id: recipient.get('id')}).length > 0);
                }, this));
                if (recipientsToPreselect.length > 0) {
                    massCollection.add(recipientsToPreselect);
                }
            }
        }
    }
}) },
"compose-addressbook-recipientscontainer": {"controller": /*
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
 * @class View.Views.Base.Emails.ComposeAddressbookRecipientscontainerView
 * @alias SUGAR.App.view.views.BaseEmailsComposeAddressbookRecipientscontainerView
 * @extends View.Views.Base.RecordView
 */
({
	// Compose-addressbook-recipientscontainer View (base) 

    extendsFrom:         "RecordView",
    enableHeaderButtons: false,
    enableHeaderPane:    false,
    events:              {},

    initialize: function(options) {
        this._super("initialize", [options]);
        this.model.isNotEmpty = true;
    },

    /**
     * Override to remove unwanted functionality.
     *
     * @param prefill
     */
    setupDuplicateFields: function(prefill) {},

    /**
     * Override to remove unwanted functionality.
     */
    delegateButtonEvents: function() {},

    /**
     * Override to remove unwanted functionality.
     */
    initButtons: function() {
        this.buttons = {};
    },

    /**
     * Override to remove unwanted functionality.
     */
    showPreviousNextBtnGroup: function() {},

    /**
     * Override to remove unwanted functionality.
     */
    bindDataChange: function() {},

    /**
     * Override to remove unwanted functionality.
     *
     * @param isEdit
     */
    toggleHeaderLabels: function(isEdit) {},

    /**
     * Override to remove unwanted functionality.
     *
     * @param field
     */
    toggleLabelByField: function (field) {},

    /**
     * Override to remove unwanted functionality.
     *
     * @param e
     * @param field
     */
    handleKeyDown: function(e, field) {},

    /**
     * Override to remove unwanted functionality.
     *
     * @param state
     */
    setButtonStates: function(state) {},

    /**
     * Override to remove unwanted functionality.
     *
     * @param title
     */
    setTitle: function(title) {}
}) }
}}
,
"layouts": {
"base": {
"compose": {"controller": /*
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
	// Compose Layout (base) 

    plugins: ['ShortcutSession'],

    shortcuts: [
        'Sidebar:Toggle',
        'Record:Cancel',
        'Compose:Action:More',
        'DragdropSelect2:SelectAll'
    ]
}) },
"compose-addressbook": {"controller": /*
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
 * @class View.Layouts.Base.Emails.ComposeAddressbookLayout
 * @alias SUGAR.App.view.layouts.BaseEmailsComposeAddressbookLayout
 * @extends View.Layout
 */
({
	// Compose-addressbook Layout (base) 

    /**
     * @inheritdoc
     */
    initialize: function(options) {
        app.view.Layout.prototype.initialize.call(this, options);
        this.collection.sync = this.sync;
        this.collection.allowed_modules = ['Accounts', 'Contacts', 'Leads', 'Prospects', 'Users'];
        this.context.on('compose:addressbook:search', this.search, this);
    },
    /**
     * Calls the custom Mail API endpoint to search for email addresses.
     *
     * @param method
     * @param model
     * @param options
     */
    sync: function(method, model, options) {
        var callbacks,
            url;

        options = options || {};

        // only fetch from the approved modules
        if (_.isEmpty(options.module_list)) {
            options.module_list = ['all'];
        } else {
            options.module_list = _.intersection(this.allowed_modules, options.module_list);
        }

        // this is a hack to make pagination work while trying to minimize the affect on existing configurations
        // there is a bug that needs to be fixed before the correct approach (config.maxQueryResult vs. options.limit)
        // can be determined
        app.config.maxQueryResult = app.config.maxQueryResult || 20;
        options.limit = options.limit || app.config.maxQueryResult;

        options = app.data.parseOptionsForSync(method, model, options);

        callbacks = app.data.getSyncCallbacks(method, model, options);
        this.trigger('data:sync:start', method, model, options);

        url = app.api.buildURL('Mail', 'recipients/find', null, options.params);
        app.api.call('read', url, null, callbacks);
    },
    /**
     * Adds the set of modules and term that should be used to search for recipients.
     *
     * @param {Array} modules
     * @param {String} term
     */
    search: function(modules, term) {
        // reset offset to 0 on a search. make sure that it resets and does not update.
        this.collection.fetch({query: term, module_list: modules, offset: 0, update: false});
    }
}) }
}}
,
"datas": {}

},
		"Meetings":{"fieldTemplates": {
"base": {
"launchbutton": {"controller": /*
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
 * Button to launch an external meeting
 *
 * @class View.Fields.Base.Meetings.LaunchbuttonField
 * @alias SUGAR.App.view.fields.BaseMeetingsLaunchbuttonField
 * @extends View.Fields.Base.RowactionField
 */
({
	// Launchbutton FieldTemplate (base) 

    extendsFrom: 'RowactionField',

    /**
     * @inheritdoc
     */
    initialize: function(options) {
        this._super('initialize', [options]);
        this.type = 'rowaction';
        this.isHost = (this.def.host === true);
    },

    /**
     * @inheritdoc
     *
     * Hide this button if:
     * - Status is not Planned
     * - Type is Sugar (not an external meeting type)
     * - Host button and user does not have permission to start the meeting
     */
    _render: function() {
        if (this.model.get('status') !== 'Planned' ||
            this.model.get('type') === 'Sugar' ||
            (this.isHost && !this._hasPermissionToStartMeeting())
        ) {
            this.hide();
        } else {
            this._setLabel();
            this._super('_render');
            this.show();
        }
    },

    /**
     * Check if the user has permission to host the external meeting
     * True if assigned user or an admin for Meetings
     *
     * @return {boolean}
     * @private
     */
    _hasPermissionToStartMeeting: function() {
        return (this.model.get('assigned_user_id') === app.user.id || app.acl.hasAccess('admin', 'Meetings'));
    },

    /**
     * Set the appropriate label for this field
     * Use the Start Meeting label for host
     * Use the Join Meeting label otherwise
     *
     * @private
     */
    _setLabel: function() {
        this.label = (this.isHost) ?
            this._getLabel('LBL_START_MEETING') :
            this._getLabel('LBL_JOIN_MEETING');
    },

    /**
     * Build the appropriate label based on the meeting type
     *
     * @param {string} labelName Meetings module label
     * @return {string}
     * @private
     */
    _getLabel: function(labelName) {
        var meetingTypeStrings = app.lang.getAppListStrings('eapm_list'),
            meetingType = meetingTypeStrings[this.model.get('type')] ||
                app.lang.get('LBL_MODULE_NAME_SINGULAR', this.module);

        return app.lang.get(labelName, this.module, {'meetingType': meetingType});
    },

    /**
     * Event to trigger the join/start of the meeting
     * Call the API first to get the host/join URL and determine if user has permission
     */
    rowActionSelect: function() {
        var url = app.api.buildURL('Meetings', 'external', {id: this.model.id});
        app.api.call('read', url, null, {
            success: _.bind(this._launchMeeting, this),
            error: function() {
                app.alert.show('launch_meeting_error', {
                    level: 'error',
                    messages: app.lang.get('LBL_ERROR_LAUNCH_MEETING_GENERAL', this.module)
                });
            }
        });
    },

    /**
     * Given the external meeting info retrieved from the API, launch the meeting
     * Display an error if user is not permitted to launch the meeting.
     *
     * @param {Object} externalInfo
     * @private
     */
    _launchMeeting: function(externalInfo) {
        var launchUrl = '';

        if (this.disposed) {
            return;
        }

        if (this.isHost && externalInfo.is_host_option_allowed) {
            launchUrl = externalInfo.host_url;
        } else if (!this.isHost && externalInfo.is_join_option_allowed) {
            launchUrl = externalInfo.join_url;
        } else {
            // user is not allowed to launch the external meeting
            app.alert.show('launch_meeting_error', {
                level: 'error',
                messages: app.lang.get(this.isHost ? 'LBL_EXTNOSTART_MAIN' : 'LBL_EXTNOT_MAIN', this.module)
            });
            return;
        }

        if (!_.isEmpty(launchUrl)) {
            window.open(launchUrl);
        } else {
            app.alert.show('launch_meeting_error', {
                level: 'error',
                messages: this._getLabel('LBL_EXTERNAL_MEETING_NO_URL')
            });
        }
    },

    /**
     * Re-render the join button when the model changes
     */
    bindDataChange: function() {
        if (this.model) {
            this.model.on('change', this.render, this);
        }
    }
}) },
"enum": {"controller": /*
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
 * Enum modifications that are specific to Meeting type field
 * These modifications are temporary until the can (hopefully) be addressed in
 * the Enum field refactoring (SC-3481)
 *
 * @class View.Fields.Base.Meetings.EnumField
 * @alias SUGAR.App.view.fields.BaseMeetingsEnumField
 * @extends View.Fields.Base.EnumField
 */
({
	// Enum FieldTemplate (base) 

    /**
     * @inheritdoc
     */
    _render: function() {
        if (this.name === 'type') {
            this._ensureSelectedValueInItems();
        }
        this._super('_render');
    },

    /**
     * Meeting type is a special case where we want to ensure the selected
     * value is an option in the list. This can happen when User A has
     * an external meeting integration set up (ie. WebEx) and sets WebEx as
     * the type. If User B does not have WebEx set up (only needed to create
     * WebEx meetings, not to join), User B should still see WebEx selected
     * on existing meetings, but not be able to create a meeting with WebEx.
     */
    _ensureSelectedValueInItems: function() {
        var value = this.model.get(this.name),
            meetingTypeLabels;

        //if we don't have items list yet or no value previously selected - no work to do
        if (!this.items || _.isEmpty(this.items) || _.isEmpty(value)) {
            return;
        }

        //if selected value is not in the list of items, but is in the list of meeting types...
        meetingTypeLabels = app.lang.getAppListStrings('eapm_list');
        if (_.isEmpty(this.items[value]) && !_.isEmpty(meetingTypeLabels[value])) {
            //...add it to the list
            this.items[value] = meetingTypeLabels[value];
        }
    },

    /**
     * @inheritdoc
     *
     * Remove options for meeting type field which comes from the vardef - this
     * will force a retrieval of options from the server. Options is in the
     * vardef for meeting type to support mobile which does not have the ability
     * to pull dynamic enum list from the server yet.
     */
    loadEnumOptions: function(fetch, callback) {
        if (this.name === 'type') {
            this.def.options = '';
        }
        this._super('loadEnumOptions', [fetch, callback]);
    }
}) }
}}
,
"views": {
"base": {
"resolve-conflicts-list": {"controller": /*
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
 * @class View.Views.Base.Meetings.ResolveConflictsListView
 * @alias SUGAR.App.view.views.BaseMeetingsResolveConflictsListView
 * @extends View.Views.Base.ResolveConflictsListView
 */
({
	// Resolve-conflicts-list View (base) 

    extendsFrom: 'ResolveConflictsListView',

    /**
     * @inheritdoc
     *
     * The invitees field should not be displayed on list views. It is removed
     * before comparing models so that it doesn't get included.
     */
    _buildFieldDefinitions: function(modelToSave, modelInDb) {
        modelToSave.unset('invitees');
        this._super('_buildFieldDefinitions', [modelToSave, modelInDb]);
    }
}) },
"record": {"controller": /*
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
	// Record View (base) 

    extendsFrom: 'RecordView',

    /**
     * @inheritdoc
     */
    initialize: function(options) {
        this.plugins = _.union(this.plugins || [], ['EditAllRecurrences', 'AddAsInvitee']);
        this._super('initialize', [options]);
    }
}) },
"create-nodupecheck": {"controller": /*
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
 * @class View.Views.Base.Meetings.CreateNodupecheckView
 * @alias SUGAR.App.view.views.MeetingsCreateNodupecheckView
 * @extends View.Views.Base.CreateNodupecheckView
 */
({
	// Create-nodupecheck View (base) 

    extendsFrom: 'CreateNodupecheckView',

    /**
     * @inheritdoc
     */
    initialize: function(options) {
        this.plugins = _.union(this.plugins || [], ['AddAsInvitee', 'ReminderTimeDefaults']);
        this._super('initialize', [options]);
    }
}) },
"create": {"controller": /*
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
 * @class View.Views.Base.Meetings.CreateView
 * @alias SUGAR.App.view.views.MeetingsCreateView
 * @extends View.Views.Base.CreateView
 */
({
	// Create View (base) 

    extendsFrom: 'CreateView',

    /**
     * @inheritdoc
     */
    initialize: function(options) {
        this.plugins = _.union(this.plugins || [], ['AddAsInvitee', 'ReminderTimeDefaults']);
        this._super('initialize', [options]);
    }
}) }
}}
,
"layouts": {}
,
"datas": {
"base": {
"model": {"controller": /*
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
 * @class Model.Datas.Base.MeetingsModel
 * @alias SUGAR.App.model.datas.BaseMeetingsModel
 * @extends Model.Bean
 */
({
	// Model Data (base) 

    plugins: ['VirtualCollection']
}) }
}}

},
		"Tasks":{"fieldTemplates": {}
,
"views": {}
,
"layouts": {}
,
"datas": {}

},
		"Calendar":{"fieldTemplates": {}
,
"views": {}
,
"layouts": {}
,
"datas": {}

},
		"Leads":{"fieldTemplates": {
"base": {
"badge": {"controller": /*
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
 * @class View.Fields.Base.Leads.BadgeField
 * @alias SUGAR.App.view.fields.BaseLeadsBadgeField
 * @extends View.Fields.Base.BaseField
 */
({
	// Badge FieldTemplate (base) 

    /**
     * @inheritdoc
     *
     * This field doesn't support `showNoData`.
     */
    showNoData: false,

    events: {
        'click [data-action=convert]': 'convertLead'
    },

    /**
     * @inheritdoc
     *
     * The badge is always a readonly field.
     */
    initialize: function(options) {
        options.def.readonly = true;
        app.view.Field.prototype.initialize.call(this, options);
    },

    /**
     * Kick off convert lead process.
     */
    convertLead: function() {
        var model = app.data.createBean(this.model.module);
        model.set(app.utils.deepCopy(this.model.attributes));

        app.drawer.open({
            layout : 'convert',
            context: {
                forceNew: true,
                skipFetch: true,
                module: this.model.module,
                leadsModel: model
            }
        });
    }
}) },
"convertbutton": {"controller": /*
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
 * @class View.Fields.Base.Leads.ConvertbuttonField
 * @alias SUGAR.App.view.fields.BaseLeadsConvertbuttonField
 * @extends View.Fields.Base.RowactionField
 */
({
	// Convertbutton FieldTemplate (base) 

    extendsFrom: 'RowactionField',

    initialize: function (options) {
        this._super("initialize", [options]);
        this.type = 'rowaction';
    },

    _render: function () {
        var convertMeta = app.metadata.getLayout('Leads', 'convert-main');
        var missingRequiredAccess = _.some(convertMeta.modules, function (moduleMeta) {
            return (moduleMeta.required === true && !app.acl.hasAccess('create', moduleMeta.module));
        }, this);

        if (this.model.get('converted') || missingRequiredAccess) {
            this.hide();
        } else {
            this._super("_render");
        }
    },

    /**
     * Event to trigger the convert lead process for the lead
     */
    rowActionSelect: function() {
        var model = app.data.createBean(this.model.module);

        model.set(app.utils.deepCopy(this.model.attributes));
        app.drawer.open({
            layout : "convert",
            context: {
                forceNew: true,
                skipFetch: true,
                module: 'Leads',
                leadsModel: model
            }
        });
    },

    bindDataChange: function () {
        if (this.model) {
            this.model.on("change", this.render, this);
        }
    }
}) }
}}
,
"views": {
"base": {
"convert-options": {"controller": /*
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
	// Convert-options View (base) 

    /**
     * @inheritdoc
     *
     * Prevent render if transfer activities action is not move.
     */
    _render: function() {
        var transferActivitiesAction = app.metadata.getConfig().leadConvActivityOpt;
        if (transferActivitiesAction === 'move') {
            this.model.setDefault('transfer_activities', true);
            this._super('_render');
        }
    }
}) },
"convert-panel-header": {"controller": /*
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
	// Convert-panel-header View (base) 

    events: {
        'click .toggle-link': 'handleToggleClick'
    },

    /**
     * @inheritdoc
     */
    initialize: function(options) {
        options.meta.buttons = this.getButtons(options);
        app.view.View.prototype.initialize.call(this, options);
        this.layout.on('toggle:change', this.handleToggleChange, this);
        this.layout.on('lead:convert-dupecheck:pending', this.setDupeCheckPending, this);
        this.layout.on('lead:convert-dupecheck:complete', this.setDupeCheckResults, this);
        this.layout.on('lead:convert-panel:complete', this.handlePanelComplete, this);
        this.layout.on('lead:convert-panel:reset', this.handlePanelReset, this);
        this.layout.on('lead:convert:duplicate-selection:change', this.setAssociateButtonState, this);
        this.context.on('lead:convert:' + this.meta.module + ':shown', this.handlePanelShown, this);
        this.context.on('lead:convert:' + this.meta.module + ':hidden', this.handlePanelHidden, this);
        this.initializeSubTemplates();
    },

    /**
     * Return the metadata for the Associate/Reset buttons to be added to the
     * convert panel header
     *
     * @param {Object} options
     * @return {Array}
     */
    getButtons: function(options) {
        return [
            {
                name: 'associate_button',
                type: 'button',
                label: this.getLabel(
                    'LBL_CONVERT_CREATE_MODULE',
                    {'moduleName': options.meta.moduleSingular}
                ),
                css_class: 'btn-primary disabled'
            },
            {
                name: 'reset_button',
                type: 'button',
                label: 'LBL_CONVERT_RESET_PANEL',
                css_class: 'btn-invisible btn-link'
            }
        ];
    },

    /**
     * Initialize the Reset button to be hidden on render
     * @inheritdoc
     */
    _render: function() {
        app.view.View.prototype._render.call(this);
        this.getField('reset_button').hide();
    },

    /**
     * Compile data from the convert panel layout with some of the metadata to
     * be used when rendering sub-templates
     *
     * @return {Object}
     */
    getCurrentState: function() {
        var currentState = _.extend({}, this.layout.currentState, {
            create: (this.layout.currentToggle === this.layout.TOGGLE_CREATE),
            labelModule: this.module,
            moduleInfo: {'moduleName': this.meta.moduleSingular},
            required: this.meta.required
        });

        if (_.isNumber(currentState.dupeCount)) {
            currentState.duplicateCheckResult = {'duplicateCount': currentState.dupeCount};
        }

        return currentState;
    },

    /**
     * Pull in the sub-templates to be used to render & re-render pieces of the convert header
     * Pieces of the convert header change based on various states the panel is in
     */
    initializeSubTemplates: function() {
        this.tpls = {};
        this.initial = {};

        this.tpls.title = app.template.getView(this.name + '.title', this.module);
        this.initial.title = this.tpls.title(this.getCurrentState());

        this.tpls.dupecheckPending = app.template.getView(this.name + '.dupecheck-pending', this.module);
        this.tpls.dupecheckResults = app.template.getView(this.name + '.dupecheck-results', this.module);
    },

    /**
     * Toggle the subviews based on which link was clicked
     *
     * @param {Event} event The click event on the toggle link
     */
    handleToggleClick: function(event) {
        var nextToggle = this.$(event.target).data('next-toggle');
        this.layout.trigger('toggle:showcomponent', nextToggle);
        event.preventDefault();
        event.stopPropagation();
    },

    /**
     * When switching between sub-views, change the appropriate header components:
     * - Title changes to reflect New vs. Select (showing New ModuleName or just ModuleName)
     * - Dupe check results are shown/hidden based on whether dupe view is shown
     * - Change the toggle link to allow the user to toggle back to the other one
     * - Enable Associate button when on create view - Enable/Disable button based
     *   on whether dupe selected on dupe view
     *
     * @param {string} toggle Which view is now being displayed
     */
    handleToggleChange: function(toggle) {
        this.renderTitle();
        this.toggleDupeCheckResults(toggle === this.layout.TOGGLE_DUPECHECK);
        this.setSubViewToggle(toggle);
        this.setAssociateButtonState();
    },

    /**
     * When opening a panel, change the appropriate header components:
     * - Activate the header
     * - Display the subview toggle link
     * - Enable Associate button when on create view - Enable/Disable button
     *   based on whether dupe selected on dupe view
     * - Mark active indicator pointing up
     */
    handlePanelShown: function() {
        this.$('.accordion-heading').addClass('active');
        this.toggleSubViewToggle(true);
        this.setAssociateButtonState();
        this.toggleActiveIndicator(true);
    },

    /**
     * When hiding a panel, change the appropriate header components:
     * - Deactivate the header
     * - Hide the subview toggle link
     * - Disable the Associate button
     * - Mark active indicator pointing down
     */
    handlePanelHidden: function() {
        this.$('.accordion-heading').removeClass('active');
        this.toggleSubViewToggle(false);
        this.setAssociateButtonState(false);
        this.toggleActiveIndicator(false);
    },

    /**
     * When a panel has been marked complete, change the appropriate header components:
     * - Mark the step circle as check box
     * - Title changes to show the record associated
     * - Hide duplicate check results
     * - Hide the subview toggle link
     * - Switch to Reset button
     */
    handlePanelComplete: function() {
        this.setStepCircle(true);
        this.renderTitle();
        this.toggleDupeCheckResults(false);
        this.toggleSubViewToggle(false);
        this.toggleButtons(true);
    },

    /**
     * When a panel has been reset, change the appropriate header components:
     * - Mark the step circle back to step number
     * - Title changes back to incomplete (showing New ModuleName or just ModuleName)
     * - Show duplicate check count (if any found)
     * - Switch to back to Associate button
     * - Enable Associate button when on create view - Enable/Disable button
     *   based on whether dupe selected on dupe view
     */
    handlePanelReset: function() {
        this.setStepCircle(false);
        this.renderTitle();
        this.toggleDupeCheckResults(true);
        this.toggleButtons(false);
        this.setAssociateButtonState();
    },

    /**
     * Switch between check mark and step number
     *
     * @param {boolean} complete Whether to mark panel completed
     */
    setStepCircle: function(complete) {
        var $stepCircle = this.$('.step-circle');
        if (complete) {
            $stepCircle.addClass('complete');
        } else {
            $stepCircle.removeClass('complete');
        }
    },

    /**
     * Render the title based on current state Create vs DupeCheck and
     * Complete vs. Incomplete
     */
    renderTitle: function() {
        this.$('.title').html(this.tpls.title(this.getCurrentState()));
    },

    /**
     * Put up "Searching for duplicates" message
     */
    setDupeCheckPending: function() {
        this.renderDupeCheckResults('pending');
    },

    /**
     * Display duplicate results (if any found) or hide subview links if none found
     *
     * @param {number} duplicateCount Number of duplicates found
     */
    setDupeCheckResults: function(duplicateCount) {
        if (duplicateCount > 0) {
            this.renderDupeCheckResults('results');
        } else {
            this.renderDupeCheckResults('clear');
        }
        this.setSubViewToggleLabels(duplicateCount);
    },

    /**
     * Render either dupe check results or pending (or empty if no dupes found)
     *
     * @param {string} type Which message to show - `results` or `pending`
     */
    renderDupeCheckResults: function(type) {
        var results = '';
        if (type === 'results') {
            results = this.tpls.dupecheckResults(this.getCurrentState());
        } else if (type === 'pending') {
            results = this.tpls.dupecheckPending(this.getCurrentState());
        }
        this.$('.dupecheck-results').text(results);
    },

    /**
     * Show/hide dupe check results
     * If duplicate already selected, results will not be shown
     *
     * @param {boolean} show Whether to show the duplicate check results
     */
    toggleDupeCheckResults: function(show) {
        // if we are trying to show this, but we already have a dupeSelected, change the show to false
        if (show && this.layout.currentState.dupeSelected) {
            show = false;
        }
        this.$('.dupecheck-results').toggle(show);
    },

    /**
     * Show/hide the subview toggle links altogether
     * If panel is complete, the subview toggle will not be shown
     *
     * @param {boolean} show Whether to show the subview toggle
     */
    toggleSubViewToggle: function(show) {
        if (this.layout.currentState.complete) {
            show = false;
        }
        this.$('.subview-toggle').toggleClass('hide', !show);
    },

    /**
     * Show/hide appropriate toggle link for the subview being displayed
     *
     * @param {string} nextToggle Css class labeling the next toggle
     */
    setSubViewToggle: function(nextToggle) {
        _.each(['dupecheck', 'create'], function(currentToggle) {
            this.toggleSubViewLink(currentToggle, (nextToggle === currentToggle));
        }, this);
    },

    /**
     * Show/hide a single subview toggle link
     *
     * @param {string} currentToggle Css class labeling the current toggle
     * @param {boolean} show Whether to show the toggle link
     */
    toggleSubViewLink: function(currentToggle, show) {
        this.$('.subview-toggle .' + currentToggle).toggle(show);
    },

    /**
     * Switch subview toggle labels based on whether duplicates were found or not
     *
     * @param {number} duplicateCount
     */
    setSubViewToggleLabels: function(duplicateCount) {
        if (duplicateCount > 0) {
            this.setSubViewToggleLabel('dupecheck', 'LBL_CONVERT_IGNORE_DUPLICATES');
            this.setSubViewToggleLabel('create', 'LBL_CONVERT_BACK_TO_DUPLICATES');
        } else {
            this.setSubViewToggleLabel('dupecheck', 'LBL_CONVERT_SWITCH_TO_CREATE');
            this.setSubViewToggleLabel('create', 'LBL_CONVERT_SWITCH_TO_SEARCH');
        }
    },

    /**
     * Set label for given subview toggle
     *
     * @param {string} currentToggle Css class labeling the current toggle
     * @param {string} label Label to replace the toggle text with
     */
    setSubViewToggleLabel: function(currentToggle, label) {
        this.$('.subview-toggle .' + currentToggle).text(this.getLabel(label));
    },

    /**
     * Toggle between Associate and Reset buttons
     *
     * @param {boolean} complete
     */
    toggleButtons: function(complete) {
        var associateButton = 'associate_button',
            resetButton = 'reset_button';

        if (complete) {
            this.getField(associateButton).hide();
            this.getField(resetButton).show();
        } else {
            this.getField(associateButton).show();
            this.getField(resetButton).hide();
        }
    },

    /**
     * Activate/Deactivate the Associate button based on which subview is active
     * and whether the panel itself is active (keep disabled when panel not active)
     *
     * @param {boolean} [activate]
     */
    setAssociateButtonState: function(activate) {
        var $associateButton = this.$('[name="associate_button"]'),
            panelActive = this.$('.accordion-heading').hasClass('active');

        //use current state to determine activate if not explicit in call
        if (_.isUndefined(activate)) {
            if (this.layout.currentToggle === this.layout.TOGGLE_CREATE) {
                activate = true;
            } else {
                activate = this.layout.currentState.dupeSelected;
            }
        }

        this.setAssociateButtonLabel(this.layout.currentToggle === this.layout.TOGGLE_CREATE);

        //only activate if current panel is active
        if (activate && panelActive) {
            $associateButton.removeClass('disabled');
        } else {
            $associateButton.addClass('disabled');
        }
    },

    /**
     * Set the label for the Associate Button
     *
     * @param {boolean} isCreate
     */
    setAssociateButtonLabel: function(isCreate) {
        var label = 'LBL_CONVERT_SELECT_MODULE';
        if (isCreate) {
            label = 'LBL_CONVERT_CREATE_MODULE';
        }
        this.$('[name="associate_button"]').html(this.getLabel(label, {'moduleName': this.meta.moduleSingular}));
    },

    /**
     * Toggle the active indicator up/down
     *
     * @param {boolean} active
     */
    toggleActiveIndicator: function(active) {
        var $activeIndicator = this.$('.active-indicator i');
        $activeIndicator.toggleClass('fa-chevron-up', active);
        $activeIndicator.toggleClass('fa-chevron-down', !active);
    },

    /**
     * Get translated strings from the Leads module language file
     *
     * @param {string} key The app/mod string
     * @param {Object} [context] Any placeholder data to populate in the string
     * @return {string} The translated string
     */
    getLabel: function(key, context) {
        context = context || {};
        return app.lang.get(key, 'Leads', context);
    }
}) },
"record": {"controller": /*
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
	// Record View (base) 

    extendsFrom: 'RecordView',

    /**
     * @inheritdoc
     */
    initialize: function(options) {
        this.plugins = _.union(this.plugins || [], ['HistoricalSummary']);
        this._super('initialize', [options]);
    },

    /**
     * Remove id, status and converted fields
     * (including associations created during conversion) when duplicating a Lead
     * @param prefill
     */
    setupDuplicateFields: function(prefill){
        var duplicateBlackList = ['id', 'status', 'converted', 'account_id', 'opportunity_id', 'contact_id'];
        _.each(duplicateBlackList, function(field){
            if(field && prefill.has(field)){
                //set blacklist field to the default value if exists
                if (!_.isUndefined(prefill.fields[field]) && !_.isUndefined(prefill.fields[field].default)) {
                    prefill.set(field, prefill.fields[field].default);
                } else {
                    prefill.unset(field);
                }
            }
        });
    }
}) },
"convert-results": {"controller": /*
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
	// Convert-results View (base) 

    extendsFrom: 'ConvertResultsView',

    /**
     * Build a collection of associated models and re-render the view
     */
    populateResults: function() {
        var model;

        //only show related records if lead is converted
        if (!this.model.get('converted')) {
            return;
        }

        this.associatedModels.reset();

        model = this.buildAssociatedModel('Contacts', 'contact_id', 'contact_name');
        if (model) {
            this.associatedModels.push(model);
        }
        model = this.buildAssociatedModel('Accounts', 'account_id', 'account_name');
        if (model) {
            this.associatedModels.push(model);
        }
        model = this.buildAssociatedModel('Opportunities', 'opportunity_id', 'opportunity_name');
        if (model) {
            this.associatedModels.push(model);
        }
        app.view.View.prototype.render.call(this);
    },

    /**
     * Build an associated model based on given id & name fields on the Lead record
     *
     * @param {String} moduleName
     * @param {String} idField
     * @param {String} nameField
     * @return {*} model or false if id field is not set on the lead
     */
    buildAssociatedModel: function(moduleName, idField, nameField) {
        var moduleSingular = app.lang.getAppListStrings('moduleListSingular'),
            model;

        if (_.isEmpty(this.model.get(idField))) {
            return false;
        }

        model = app.data.createBean(moduleName, {
            id: this.model.get(idField),
            name: this.model.get(nameField),
            row_title: moduleSingular[moduleName],
            _module: moduleName,
            target_module: moduleName
        });
        model.module = moduleName;
        return model;
    }
}) },
"convert-headerpane": {"controller": /*
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
	// Convert-headerpane View (base) 

    extendsFrom: 'HeaderpaneView',

    events: {
        'click [name=save_button]:not(".disabled")': 'initiateSave',
        'click [name=cancel_button]': 'initiateCancel'
    },

    /**
     * @inheritdoc
     */
    initialize: function(options) {
        this._super("initialize", [options]);
        this.context.on('lead:convert-save:toggle', this.toggleSaveButton, this);
    },

    /**
     * @override
     *
     * Grabs the lead's name and format the title such as `Convert: <name>`.
     */
    _formatTitle: function(title) {
        var leadsModel = this.context.get('leadsModel'),
            name = !_.isUndefined(leadsModel.get('name')) ?
                leadsModel.get('name') :
                leadsModel.get('first_name') + ' ' + leadsModel.get('last_name');
        return app.lang.get(title, this.module) + ': ' + name;
    },

    /**
     * When finish button is clicked, send this event down to the convert layout to wrap up
     */
    initiateSave: function() {
        this.context.trigger('lead:convert:save');
    },

    /**
     * When cancel clicked, hide the drawer
     */
    initiateCancel : function() {
        app.drawer.close();
    },

    /**
     * Enable/disable the Save button
     *
     * @param enable true to enable, false to disable
     */
    toggleSaveButton: function(enable) {
        this.$('[name=save_button]').toggleClass('disabled', !enable);
    }
}) },
"create": {"controller": /*
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
 * @class View.Views.Base.Leads.CreateView
 * @alias SUGAR.App.view.views.LeadsCreateView
 * @extends View.Views.Base.CreateView
 */
({
	// Create View (base) 

    extendsFrom: 'CreateView',

    getCustomSaveOptions: function(){
        var options = {};

        if(this.context.get('prospect_id')) {
            options.params = {};
            // Needed for populating the relationship
            options.params.relate_to = 'Prospects';
            options.params.relate_id = this.context.get('prospect_id');
            this.context.unset('prospect_id');
        }

        return options;
    }
}) }
}}
,
"layouts": {
"base": {
"convert-main": {"controller": /*
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
	// Convert-main Layout (base) 

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
        this.context.on('lead:convert-panel:complete', this.handlePanelComplete, this);
        this.context.on('lead:convert-panel:reset', this.handlePanelReset, this);

        //listen for Save button click in headerpane
        this.context.on('lead:convert:save', this.handleSave, this);

        this.before('render', this.checkRequiredAccess);
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
            if (app.acl.hasAccess('create', moduleMeta.module)) {
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

        this.context.set('convertModuleList', convertModuleList);
        view = app.view.createView({
            context: this.context,
            layout: this,
            name: 'convert-options',
            type: 'convert-options',
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
                name: 'convert-panel',
                layout: this,
                meta: moduleMeta,
                type: 'convert-panel',
                platform: this.options.platform
            });
            view.initComponents();

            //This is because backbone injects a wrapper element.
            view.$el.addClass('accordion-group');
            view.$el.data('module', moduleMeta.module);

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

        app.alert.show('convert_access_denied', {
            level: 'error',
            messages: app.lang.get(
                'LBL_CONVERT_ACCESS_DENIED',
                this.module,
                {requiredModulesMissing: translatedModuleNames.join(', ')}
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
        var modulePlural = app.lang.getAppListStrings('moduleList')[module] || module;
        return (app.lang.getAppListStrings('moduleListSingular')[module] || modulePlural);
    },

    _render: function() {
        app.view.Layout.prototype._render.call(this);

        //This is because backbone injects a wrapper element.
        this.$el.addClass('accordion');
        this.$el.attr('id', 'convert-accordion');

        //apply the accordion to this layout
        this.$('.collapse').collapse({toggle: false, parent: '#convert-accordion'});
        this.$('.collapse').on('shown hidden', _.bind(this.handlePanelCollapseEvent, this));

        //copy lead data down to each module when we get the lead data
        this.context.get('leadsModel').fetch({
            success: _.bind(function(model) {
                if (this.context) {
                    this.context.trigger('lead:convert:populate', model);
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
        var module = $(event.currentTarget).data('module');
        this.context.trigger('lead:convert:' + module + ':' + event.type);
    },

    /**
     * When a panel is complete, add the model to the associatedModels array and notify any dependent modules
     * @param {string} module that was completed
     * @param {Data.Bean} model
     */
    handlePanelComplete: function(module, model) {
        this.associatedModels[module] = model;
        this.handlePanelUpdate();
        this.context.trigger('lead:convert:' + module + ':complete', module, model);
    },

    /**
     * When a panel is reset, remove the model from the associatedModels array and notify any dependent modules
     * @param {string} module
     */
    handlePanelReset: function(module) {
        delete this.associatedModels[module];
        this.handlePanelUpdate();
        this.context.trigger('lead:convert:' + module + ':reset', module);
    },

    /**
     * When a panel has been updated, check if any module's dependencies are met
     * and/or if all required modules have been completed
     */
    handlePanelUpdate: function() {
        this.checkDependentModules();
        this.checkRequired();
    },

    /**
     * Check if each module's dependencies are met and enable the panel if they are.
     * Dependencies are defined in the convert-main.php
     */
    checkDependentModules: function() {
        _.each(this.dependentModules, function(dependencies, dependentModuleName) {
            var isEnabled = _.all(dependencies, function(module, moduleName) {
                return (this.associatedModels[moduleName]);
            }, this);
            this.context.trigger('lead:convert:' + dependentModuleName + ':enable', isEnabled);
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

        this.context.trigger('lead:convert-save:toggle', showSave);
    },

    /**
     * When save button is clicked, call the Lead Convert API
     */
    handleSave: function() {
        var convertModel, myURL;

        //disable the save button to prevent double click
        this.context.trigger('lead:convert-save:toggle', false);

        app.alert.show('processing_convert', {level: 'process', title: app.lang.get('LBL_SAVING')});

        convertModel = new Backbone.Model(_.extend(
            {'modules' : this.parseEditableFields(this.associatedModels)},
            this.getTransferActivitiesAttributes()
        ));

        myURL = app.api.buildURL('Leads', 'convert', {id: this.context.get('leadsModel').id});

        // Set field_duplicateBeanId for fields implementing FieldDuplicate
        _.each(this.convertPanels, function(view, module) {
            if (view && view.createView && convertModel.get('modules')[module]) {
                view.createView.model.trigger('duplicate:field:prepare:save', convertModel.get('modules')[module]);
            }
        }, this);

        app.api.call('create', myURL, convertModel, {
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
            optedInToTransfer = this.model.get('transfer_activities');

        return {
            transfer_activities_action: (action === 'move' && optedInToTransfer) ? 'move' : 'donothing'
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
        this.convertComplete('success', 'LBL_CONVERTLEAD_SUCCESS', true);
    },

    /**
     * There was a problem converting the lead
     */
    convertError: function() {
        this.convertComplete('error', 'LBL_CONVERTLEAD_ERROR', false);

        if (!this.disposed) {
            this.context.trigger('lead:convert-save:toggle', true);
        }
    },

    /**
     * Based on success of lead conversion, display the appropriate messages and optionally close the drawer
     * @param {string} level
     * @param {string} message
     * @param {boolean} doClose
     */
    convertComplete: function(level, message, doClose) {
        var leadsModel = this.context.get('leadsModel');
        app.alert.dismiss('processing_convert');
        app.alert.show('convert_complete', {
            level: level,
            messages: app.lang.get(message, this.module, {leadName: app.utils.getRecordName(leadsModel)}),
            autoClose: (level === 'success')
        });
        if (!this.disposed && doClose) {
            this.context.trigger('lead:convert:exit');
            app.drawer.close();
            app.navigate(this.context, leadsModel, 'record');
        }
    },

    /**
     * Clean up the jquery events that were added
     * @private
     */
    _dispose: function() {
        this.$('.collapse').off();
        app.view.Layout.prototype._dispose.call(this);
    }
}) },
"convert-panel": {"controller": /*
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
	// Convert-panel Layout (base) 

    extendsFrom: 'ToggleLayout',

    TOGGLE_DUPECHECK: 'dupecheck',
    TOGGLE_CREATE: 'create',

    availableToggles: {
        'dupecheck': {},
        'create': {}
    },

    //selectors
    accordionHeading: '.accordion-heading',
    accordionBody: '.accordion-body',

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
        convertPanelEvents['click .accordion-heading.enabled'] = 'togglePanel';
        convertPanelEvents['click [name="associate_button"]'] = 'handleAssociateClick';
        convertPanelEvents['click [name="reset_button"]'] = 'handleResetClick';
        this.events = _.extend({}, this.events, convertPanelEvents);
        this.plugins = _.union(this.plugins || [], [
            'FindDuplicates'
        ]);

        this.currentState = {
            complete: false,
            dupeSelected: false
        };
        this.toggledOffDupes = false;

        this._super('initialize', [options]);

        this.addSubComponents();

        this.context.on('lead:convert:populate', this.handlePopulateRecords, this);
        this.context.on('lead:convert:' + this.meta.module + ':enable', this.handleEnablePanel, this);
        this.context.on('lead:convert:' + this.meta.moduleNumber + ':open', this.handleOpenRequest, this);
        this.context.on('lead:convert:exit', this.turnOffUnsavedChanges, this);
        this.context.on('lead:convert:' + this.meta.module + ':shown', this.handleShowComponent, this);

        //if this panel is dependent on others - listen for changes and react accordingly
        this.addDependencyListeners();

        //open the first module upon the first autocomplete check completion
        if (this.meta.moduleNumber === 1) {
            this.once('lead:autocomplete-check:complete', this.handleOpenRequest, this);
        }
    },

    /**
     * Retrieve module specific values (like modular singular name and whether
     * dupe check is enabled at a module level).
     * @private
     */
    _setModuleSpecificValues: function() {
        var module = this.meta.module;
        this.meta.modulePlural = app.lang.getAppListStrings('moduleList')[module] || module;
        this.meta.moduleSingular = app.lang.getAppListStrings('moduleListSingular')[module] ||
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
        if (component.name === 'convert-panel-header') {
            return this.$('[data-container="header"]');
        } else {
            return this.$('[data-container="inner"]');
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
            name: 'convert-panel-header',
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
        var leadsModel = this.context.get('leadsModel'),
            context = this.context.getChildContext({
                'module': this.meta.module,
                'forceNew': true,
                'skipFetch': true,
                'dupelisttype': 'dupecheck-list-select',
                'collection': this.createDuplicateCollection(leadsModel, this.meta.module),
                'layoutName': 'records',
                'dataView': 'selection-list'
            });
        context.prepare();

        this.duplicateView = app.view.createLayout({
            context: context,
            name: this.TOGGLE_DUPECHECK,
            layout: this,
            module: context.get('module')
        });
        this.duplicateView.context.on('change:selection_model', this.handleDupeSelectedChange, this);
        this.duplicateView.collection.on('reset', this.dupeCheckComplete, this);
        this.addComponent(this.duplicateView);
    },

    /**
     * Add the create view.
     */
    addRecordCreateComponent: function() {
        var context = this.context.getChildContext({
            'module': this.meta.module,
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
            this.context.on('lead:convert:' + module + ':complete', this.updateFromDependentModuleChanges, this);
            this.context.on('lead:convert:' + module + ':reset', this.resetFromDependentModuleChanges, this);
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
        this.trigger('lead:convert-dupecheck:complete', this.currentState.dupeCount);
    },

    /**
     * Check to see if the panel should be automatically marked as complete
     *
     * Required panels are marked complete when there are no duplicates and
     * the create form passes validation.
     */
    runAutoCompleteCheck: function() {
        //Bail out if we've already completed the check
        if (this.autoCompleteCheckComplete) {
            return;
        }

        if (this.autoCompleteEnabled && this.meta.required && this.currentState.dupeCount === 0) {
            this.createView.once('render', this.runAutoCompleteValidation, this);
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
        this.trigger('lead:autocomplete-check:complete');
    },

    /**
     * Select the first item in the duplicate check list.
     */
    selectFirstDuplicate: function() {
        var list = this.duplicateView.getComponent('dupecheck-list-select');
        if (list) {
            list.once('render', function() {
                var radio = this.$('input[type=radio]:first');
                if (radio) {
                    radio.prop('checked', true);
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
        this.$(this.accordionBody).collapse('toggle');
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
            this.once('lead:autocomplete-check:complete', this.handleOpenRequest, this);
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
        return this.$(this.accordionHeading).hasClass('enabled');
    },

    /**
     * Check if the current panel is open.
     *
     * @return {boolean}
     */
    isPanelOpen: function() {
        return this.$(this.accordionBody).hasClass('in');
    },

    /**
     * Open the body of the panel if enabled (and not already open).
     */
    openPanel: function() {
        if (this.isPanelEnabled()) {
            if (this.isPanelOpen()) {
                this.context.trigger('lead:convert:' + this.meta.module + ':shown');
            } else {
                this.$(this.accordionBody).collapse('show');
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
        this._super('showComponent', [name]);
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
        this.$(this.accordionBody).collapse('hide');
    },

    /**
     * Handle click of Associate button - running validation if on create view
     * or marking complete if on dupe view.
     *
     * @param {Event} event
     */
    handleAssociateClick: function(event) {
        //ignore clicks if button is disabled
        if (!$(event.currentTarget).hasClass('disabled')) {
            if (this.currentToggle === this.TOGGLE_CREATE) {
                this.runCreateValidation({
                    valid: _.bind(this.markPanelComplete, this),
                    invalid: _.bind(this.resetPanel, this)
                });
            } else {
                this.markPanelComplete(this.duplicateView.context.get('selection_model'));
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
        this.context.trigger('lead:convert-panel:complete', this.meta.module, model);
        this.trigger('lead:convert-panel:complete', this.currentState.associatedName);

        app.alert.dismissAll('error');

        //re-run validation if create model changes after completion
        if (!model.id) {
            model.on('change', this.runPostCompletionValidation, this);
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
        this.context.trigger('lead:convert:' + (this.meta.moduleNumber + 1) + ':open');
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
        this.createView.model.off('change', this.runPostCompletionValidation, this);
        this.currentState.complete = false;
        this.context.trigger('lead:convert-panel:reset', this.meta.module);
        this.trigger('lead:convert-panel:reset');
    },

    /**
     * Track when a duplicate has been selected and notify the panel so it can
     * enable the Associate button
     */
    handleDupeSelectedChange: function() {
        this.currentState.dupeSelected = this.duplicateView.context.has('selection_model');
        this.trigger('lead:convert:duplicate-selection:change');
    },

     /**
     * Wrapper to check whether to fire the duplicate check event
     */
    triggerDuplicateCheck: function() {
        if (this.shouldDupeCheckBePerformed(this.createView.model)) {
            this.trigger('lead:convert-dupecheck:pending');
            this.duplicateView.context.trigger('dupecheck:fetch:fire', this.createView.model, {
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
        var sourceFields = app.metadata.getModule(model.attributes._module, 'fields');
        var targetFields = app.metadata.getModule(this.meta.module, 'fields');

        _.each(model.attributes, function(fieldValue, fieldName) {
            if (app.acl.hasAccessToModel('edit', this.createView.model, fieldName) &&
                !_.isUndefined(sourceFields[fieldName]) &&
                !_.isUndefined(targetFields[fieldName]) &&
                sourceFields[fieldName].type === targetFields[fieldName].type &&
                (_.isUndefined(sourceFields[fieldName]['duplicate_on_record_copy']) ||
                    sourceFields[fieldName]['duplicate_on_record_copy'] !== 'no') &&
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

        //mark the model as copied so that the currency field doesn't set currency_id to user's default value
        if (hasChanged) {
            this.createView.once('render', function() {
                this.createView.model.trigger('duplicate:field', model);
            }, this);

            if (model.has('currency_id')) {
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
            $header.addClass('enabled');
        } else {
            $header.removeClass('enabled');
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
            //if dupe check has already been run, reset but don't run again yet - just update status
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
        this._super('_dispose');
    }
}) }
}}
,
"datas": {}

},
		"Currencies":{"fieldTemplates": {}
,
"views": {}
,
"layouts": {}
,
"datas": {}

},
		"Project":{"fieldTemplates": {}
,
"views": {}
,
"layouts": {}
,
"datas": {}

},
		"Contracts":{"fieldTemplates": {}
,
"views": {}
,
"layouts": {}
,
"datas": {}

},
		"Quotes":{"fieldTemplates": {}
,
"views": {
"base": {
"panel-top-for-accounts": {"controller": /*
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
 * @class View.Views.Quotes.PanelTopForAccountsView
 * @alias SUGAR.App.view.views.QuotesPanelTopForAccountsView
 * @extends View.Views.Base.PanelTopView
 */
({
	// Panel-top-for-accounts View (base) 

    extendsFrom: 'PanelTopView'
}) }
}}
,
"layouts": {}
,
"datas": {}

},
		"Products":{"fieldTemplates": {
"base": {
"discount": {"controller": /*
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
 * @class View.Fields.Base.Products.DiscountField
 * @alias SUGAR.App.view.fields.BaseProductsDiscountField
 * @extends View.Fields.Base.CurrencyField
 */
({
	// Discount FieldTemplate (base) 

    extendsFrom: 'CurrencyField',

    /**
     * @inheritdoc
     *
     * Listen for the discount_select field to change, when it does, re-render the field
     */
    bindDataChange: function() {
        this._super('bindDataChange');

        // if discount select changes, we need to re-render this field
        this.model.on('change:discount_select', this.render, this);
    },

    /**
     * @inheritdoc
     *
     * Special handling of the templates, if we are displaying it as a percent, then use the _super call,
     * otherwise get the templates from the currency field.
     */
    _loadTemplate: function() {
        if (this.model.get('discount_select') == true) {
            this._super('_loadTemplate');
        } else {
            this.template = app.template.getField('currency', this.action || this.view.action, this.module) ||
                app.template.empty;
            this.tplName = this.action || this.view.action;
        }
    },

    /**
     * @inheritdoc
     *
     * Special handling for the format, if we are in a percent, use the decimal field to handle the percent, otherwise
     * use the format according to the currency field
     */
    format: function(value) {
        if (this.model.get('discount_select') == true) {
            return app.utils.formatNumberLocale(value);
        } else {
            return this._super('format', [value]);
        }
    },

    /**
     * @inheritdoc
     *
     * Special handling for the unformat, if we are in a percent, use the decimal field to handle the percent,
     * otherwise use the format according to the currency field
     */
    unformat: function(value) {
        if (this.model.get('discount_select') == true) {
            var unformattedValue = app.utils.unformatNumberStringLocale(value, true);
            // if unformat failed, return original value
            return _.isFinite(unformattedValue) ? unformattedValue : value;
        } else {
            return this._super('unformat', [value]);
        }
    }
}) }
}}
,
"views": {
"base": {
"record": {"controller": /*
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
	// Record View (base) 

    extendsFrom: 'RecordView',

    delegateButtonEvents: function() {
        this.context.on('button:convert_to_quote:click', this.convertToQuote, this);
        this._super("delegateButtonEvents");
    }

}) }
}}
,
"layouts": {}
,
"datas": {}

},
		"WebLogicHooks":{"fieldTemplates": {}
,
"views": {}
,
"layouts": {}
,
"datas": {}

},
		"ProductCategories":{"fieldTemplates": {}
,
"views": {}
,
"layouts": {}
,
"datas": {}

},
		"ProductTypes":{"fieldTemplates": {}
,
"views": {}
,
"layouts": {}
,
"datas": {}

},
		"ProductTemplates":{"fieldTemplates": {
"base": {
"pricing-formula": {"controller": /*
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
 * Field that computes the logic for the pricing factor field
 *
 * @class View.Fields.Base.ProductTemplates.PricingFormulaField
 * @alias SUGAR.App.view.fields.BaseProductTemplatesPricingFormulaField
 * @extends View.Fields.Base.EnumField
 */
({
	// Pricing-formula FieldTemplate (base) 

    /**
     * Where the core logic is at
     */
    extendsFrom: 'EnumField',

    /**
     * Should we show the factor field on the front end
     */
    showFactorField: false,

    /**
     * Valid formulas that we should show the factor field for.
     */
    validFactorFieldFormulas: [
        'ProfitMargin',
        'PercentageMarkup',
        'PercentageDiscount'
    ],

    /**
     * Label for the factor field
     */
    factorFieldLabel: '',

    /**
     * Value of the factor field
     */
    factorValue: 0,

    /**
     * @inheritdoc
     */
    initialize: function(options) {
        this._super('initialize', [options]);

        this.before('render', function() {
            this.showFactorField = this.checkShouldShowFactorField();
            this.factorFieldLabel = this.getFactorFieldLabel();
            this.disableDiscountField();
            this.factorValue = this.model.get('pricing_factor');
        }, this);

        this.listenTo(this, 'render', function() {
            // only setup the formulas when the action is edit
            if (this.action == 'edit') {
                    if (this.showFactorField) {
                    // put the cursor int he factor field once this is rendered
                    this.$el.find('.pricing-factor').focus();
                }
                this.setupPricingFormula();
            }
        });
    },

    /**
     * Listen for this field to change it's value, and when it does, we should re-render the field as it could have
     * the pricing_factor field visible
     */
    bindDataChange: function() {
        this.listenTo(this.model, 'change:' + this.name, function() {
            // when it's changed, we need to re-render just in case we need to show the factor field
            if (!this.disposed) {
                this.render();
            }
        });
    },

    /**
     * Override to remove default DOM change listener so we can listen for the pricing factor change if it's visible
     * @override
     */
    bindDomChange: function() {
        if (this.showFactorField) {
            var $el = this.$('.pricing-factor');
            $el.on('change', _.bind(function() {
                this.model.set('pricing_factor', $el.val());
            }, this));
        }

        // call the super just in case something ever gets put there
        this._super('bindDomChange');
    },

    /**
     * Override so we can stop listening to the pricing factor field if it's visible
     * @override
     */
    unbindDom: function() {
        if (this.showFactorField) {
            this.$('.pricing-factor').off();
        }

        // call the super
        this._super('unbindDom');
    },

    /**
     * Utility Method to check if we should show the factor field or not
     * @return {*|boolean}
     */
    checkShouldShowFactorField: function() {
        return (this.model.has(this.name) && _.contains(this.validFactorFieldFormulas, this.model.get(this.name)));
    },

    /**
     * Get the correct label for the field type
     */
    getFactorFieldLabel: function() {
        if (this.model.has(this.name)) {
            switch (this.model.get(this.name)) {
                case 'ProfitMargin':
                    return (this.action === 'edit' && this.view.action === 'list') ? 'LBL_POINTS_ABBR' : 'LBL_POINTS';
                case 'PercentageMarkup':
                case 'PercentageDiscount':
                    return (this.action === 'edit' && this.view.action === 'list') ? '%' : 'LBL_PERCENTAGE';
            }
        }

        return '';
    },

    /**
     * Figure out which formula to setup based off the value from the model.
     */
    setupPricingFormula: function() {
        if (this.model.has(this.name)) {
            switch (this.model.get(this.name)) {
                case 'ProfitMargin':
                    this._setupProfitMarginFormula();
                    break;
                case 'PercentageMarkup':
                    this._setupPercentageMarkupFormula();
                    break;
                case 'PercentageDiscount':
                    this._setupPercentageDiscountFormula();
                    break;
                case 'IsList':
                    this._setupIsListFormula();
                    break;
                default:
                    var oldPrice = this.model.get('discount_price');
                    if (_.isUndefined(oldPrice) || _.isNaN(oldPrice)) {
                        this.model.set('discount_price', '');
                    }
                    break;
            }
        }
    },

    /**
     * Profit Margin Formula
     *
     * ($cost_price * 100)/(100 - $points)
     *
     * @private
     */
    _setupProfitMarginFormula: function() {
        var formula = function(cost_price, points) {
            return app.math.div(app.math.mul(cost_price, 100), app.math.sub(100, points));
        };

        this._costPriceFormula(formula);
    },

    /**
     * Percent Markup
     *
     * $cost_price * (1 + ($percentage/100))
     *
     * @private
     */
    _setupPercentageMarkupFormula: function() {
        var formula = function(cost_price, percentage) {
            return app.math.mul(cost_price, app.math.add(1, app.math.div(percentage, 100)));
        };

        this._costPriceFormula(formula);
    },

    /**
     * Percent Discount from List Price
     *
     * $list_price - ($list_price * ($percentage/100))
     *
     * @private
     */
    _setupPercentageDiscountFormula: function() {
        var formula = function(list_price, percentage) {
            return app.math.sub(list_price, app.math.mul(list_price, app.math.div(percentage, 100)));
        };

        this._costPriceFormula(formula, 'list_price');
    },

    /**
     * Utility Method to handle multiple formulas using the same listener for cost_price, just pass in a function
     * that handles the formula and accepts two params, cost_price and the pricing factor.
     * @param {Function} formula
     * @param {String} [field]      What field to use in the listenTo, if undefined, it will default to cost_price
     * @private
     */
    _costPriceFormula: function(formula, field) {
        field = field || 'cost_price'
        this.listenTo(this.model, 'change:' + field, function(model, price) {
            model.set('discount_price', formula(price, model.get('pricing_factor')));
        });

        this.listenTo(this.model, 'change:pricing_factor', function(model, pricing_factor) {
            model.set('discount_price', formula(model.get(field), pricing_factor));
        });

        // run this now just to make sure if default values are already set
        this.model.set('discount_price', formula(this.model.get(field), this.model.get('pricing_factor')));
    },

    /**
     * Code to handle when the pricing formula is IsList where discount_price is the same as list_price
     *
     * @private
     */
    _setupIsListFormula: function() {
        this.listenTo(this.model, 'change:list_price', function(model, value) {
            model.set('discount_price', value);
        });

        this.model.set('discount_price', this.model.get('list_price'));
    },

    /**
     * Method to handle when the discount_price field should be disable or not.
     */
    disableDiscountField: function() {
        if (this.model.has(this.name)) {
            var field = this.view.getField('discount_price');
            if (field) {
                switch (this.model.get(this.name)) {
                    case 'ProfitMargin':
                    case 'PercentageMarkup':
                    case 'PercentageDiscount':
                    case 'IsList':
                        field.setDisabled(true);
                        break;
                    default:
                        field.setDisabled(false);
                        break;
                }
            }
        }
    }
}) }
}}
,
"views": {}
,
"layouts": {
"base": {
"filterpanel": {"controller": /*
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
	// Filterpanel Layout (base) 

    extendsFrom: 'FilterpanelLayout',

    /**
     * @inheritdoc
     */
    initialize: function(options) {

        this._super('initialize', [options]);

        if (this.context.get('layout') === 'record') {
            var hasSubpanels = false,
                layouts = app.metadata.getModule(options.module, 'layouts');
            if (layouts && layouts.subpanels && layouts.subpanels.meta) {
                hasSubpanels = (layouts.subpanels.meta.components.length > 0);
            }

            if (!hasSubpanels) {
                this.before('render', function() {
                    return false;
                }, this);

                this.template = app.template.empty;
                this.$el.html(this.template());
            }
        }
    }
}) }
}}
,
"datas": {}

},
		"Reports":{"fieldTemplates": {}
,
"views": {}
,
"layouts": {}
,
"datas": {}

},
		"Forecasts":{"fieldTemplates": {
"base": {
"assignquota": {"controller": /*
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
	// Assignquota FieldTemplate (base) 

    extendsFrom: 'RowactionField',

    /**
     * Should be this disabled if it's not rendered?
     */
    disableButton: true,

    /**
     * @inheritdoc
     */
    initialize: function(options) {
        this._super('initialize', [options]);
        this.type = 'rowaction';
    },

    /**
     * @inheritdoc
     */
    bindDataChange: function() {
        this.context.on('forecasts:worksheet:quota_changed', function() {
            this.disableButton = false;
            if (!this.disposed) {
                this.render();
            }
        }, this);

        this.context.on('forecasts:worksheet:committed', function() {
            this.disableButton = true;
            if (!this.disposed) {
                this.render();
            }
        }, this);

        this.context.on('forecasts:assign_quota', this.assignQuota, this);
    },

    /**
     * We override this so we can always disable the field
     *
     * @override
     * @private
     */
    _render: function() {
        this._super('_render');
        // only set field as disabled if it's actually rendered into the dom
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
        var su = (this.context.get('selectedUser')) || app.user.toJSON(),
            isManager = su.is_manager || false,
            showOpps = su.showOpps || false;
        return (su.id === app.user.get('id') && isManager && showOpps === false);
    },

    /**
     * Run the XHR Request to Assign the Quotas
     *
     * @param {string} worksheetType            What worksheet are we on
     * @param {object} selectedUser             What user is calling the assign quota
     * @param {string} selectedTimeperiod        Which timeperiod are we assigning quotas for
     */
    assignQuota: function(worksheetType, selectedUser, selectedTimeperiod) {
        app.api.call('create', app.api.buildURL('ForecastManagerWorksheets/assignQuota'), {
            'user_id': selectedUser.id,
            'timeperiod_id': selectedTimeperiod
        }, {
            success: _.bind(function(o) {
                app.alert.dismiss('saving_quota');
                app.alert.show('success', {
                    level: 'success',
                    autoClose: true,
                    autoCloseDelay: 10000,
                    title: app.lang.get("LBL_FORECASTS_WIZARD_SUCCESS_TITLE", "Forecasts") + ":",
                    messages: [app.lang.get('LBL_QUOTA_ASSIGNED', 'Forecasts')]
                });
                this.disableButton = true;
                this.context.trigger('forecasts:quota_assigned');
                if (!this.disposed) {
                    this.render();
                }
            }, this)
        });
    }
}) },
"datapoint": {"controller": /*
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
	// Datapoint FieldTemplate (base) 


    /**
     * Tracking the type of totals we are seeing
     */
    previous_type: '',

    /**
     * Arrow Colors
     */
    arrow: '',

    /**
     * What was the first total we got for a given type
     */
    initial_total: '',

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
     * What to show when we don't have access to the data
     */
    noDataAccessTemplate: undefined,

    /**
     * Holds the totals field name
     */
    total_field: '',

    /**
     * @inheritdoc
     */
    initialize: function(options) {
        this._super('initialize', [options]);

        this.total_field = this.total_field || this.name;

        this.hasAccess = app.utils.getColumnVisFromKeyMap(this.name, 'forecastsWorksheet');
        this.hasDataAccess = app.acl.hasAccess('read', 'ForecastWorksheets', app.user.get('id'), this.name);
        if (this.hasDataAccess === false) {
            this.noDataAccessTemplate = app.template.getField('base', 'noaccess')(this);
        }

        // before we try and render, lets see if we can actually render this field
        this.before('render', function() {
            if (!this.hasAccess) {
                return false;
            }
            // adjust the arrow
            this.arrow = this._getArrowIconColorClass(this.total, this.initial_total);
            this.checkIfNeedsCommit();
            return true;
        }, this);
        //if user resizes browser, adjust datapoint layout accordingly
        $(window).on('resize.datapoints', _.bind(this.resize, this));
        this.on('render', function() {
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
        // if the initial_total is an empty string (default value) don't run this
        if (!_.isEqual(this.initial_total, '') && app.math.isDifferentWithPrecision(this.total, this.initial_total)) {

            this.context.trigger('forecasts:worksheet:needs_commit', null);
        }
    },

    /**
     * @inheritdoc
     */
    _dispose: function() {
        $(window).off('resize.datapoints');

        // make sure we've cleared the resize timer before navigating away
        clearInterval(this.resizeDetectTimer);

        this._super('_dispose');
    },

    /**
     * Overwrite this to only place the placeholder if we actually have access to view it
     *
     * @return {*}
     */
    getPlaceholder: function() {
        if (this.hasAccess) {
            return this._super('getPlaceholder');
        }

        return '';
    },

    /**
     * Adjusts the CSS for the datapoint
     */
    adjustDatapointLayout: function() {
        if (this.hasAccess) {
            var parentMarginLeft = this.view.$('.topline .datapoints').css('margin-left'),
                parentMarginRight = this.view.$('.topline .datapoints').css('margin-right'),
                timePeriodWidth = this.view.$('.topline .span4').outerWidth(true),
                toplineWidth = this.view.$('.topline ').width(),
                collection = this.view.$('.topline div.pull-right').children('span'),
                collectionWidth = parseInt(parentMarginLeft) + parseInt(parentMarginRight);

            collection.each(function(index) {
                collectionWidth += $(this).children('div.datapoint').outerWidth(true);
            });

            //change width of datapoint div to span entire row to make room for more numbers
            if ((collectionWidth + timePeriodWidth) > toplineWidth) {
                this.view.$('.topline div.hr').show();
                this.view.$('.info .last-commit').find('div.hr').show();
                this.view.$('.topline .datapoints').removeClass('span8').addClass('span12');
                this.view.$('.info .last-commit .datapoints').removeClass('span8').addClass('span12');
                this.view.$('.info .last-commit .commit-date').removeClass('span4').addClass('span12');

            } else {
                this.view.$('.topline div.hr').hide();
                this.view.$('.info .last-commit').find('div.hr').hide();
                this.view.$('.topline .datapoints').removeClass('span12').addClass('span8');
                this.view.$('.info .last-commit .datapoints').removeClass('span12').addClass('span8');
                this.view.$('.info .last-commit .commit-date').removeClass('span12').addClass('span4');
                var lastCommitHeight = this.view.$('.info .last-commit .commit-date').height();
                this.view.$('.info .last-commit .datapoints div.datapoint').height(lastCommitHeight);
            }
            //adjust height of last commit datapoints
            var index = this.$el.index(),
                width = this.$('div.datapoint').outerWidth(),
                datapointLength = this.view.$('.info .last-commit .datapoints div.datapoint').length,
                sel = this.view.$('.last-commit .datapoints div.datapoint:nth-child(' + index + ')');
            if (datapointLength > 2 && index <= 2 || datapointLength == 2 && index == 1) {
                // RTL was off 1px
                var widthMod = (app.lang.direction === 'rtl') ? 7 : 8;
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
        //resizing the window that's why we set a timer so the code should be executed only once
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

        this.context.on('change:selectedUser change:selectedTimePeriod', function() {
            this.initial_total = '';
            this.total = 0;
            this.arrow = '';
        }, this);

        // any time the main forecast collection is reset this contains the commit history
        this.collection.on('reset', this._onCommitCollectionReset, this);
        this.context.on('forecasts:worksheet:totals', this._onWorksheetTotals, this);
        this.context.on('forecasts:worksheet:committed', this._onWorksheetCommit, this);
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
        if (type == 'manager') {
            // split off '_case'
            field = field.split('_')[0] + '_adjusted';
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
        if (type == 'manager') {
            // split off '_case'
            field = field.split('_')[0] + '_adjusted';
        }
        this.total = forecast[field];
        this.initial_total = forecast[field];
        this.arrow = '';
        if (!this.disposed) {
            this.render();
        }
    },

    /**
     * Returns the CSS classes for an up or down arrow icon
     *
     * @param {String|Number} newValue the new value
     * @param {String|Number} oldValue the previous value
     * @return {String} css classes for up or down arrow icons, if the values didn't change, returns ''
     * @private
     */
    _getArrowIconColorClass: function(newValue, oldValue) {
        var cls = '';

        // figure out if it changed here based
        if (app.math.isDifferentWithPrecision(newValue, oldValue)) {
            cls = (newValue > oldValue) ? ' fa-arrow-up font-green' : ' fa-arrow-down font-red';
        }
        return cls;
    }
}) },
"fiscal-year": {"controller": /*
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
	// Fiscal-year FieldTemplate (base) 

    extendsFrom: 'EnumField',

    loadEnumOptions: function(fetch, callback) {
        this._super('loadEnumOptions', [fetch, callback]);

        var startYear = this.options.def.startYear;

        _.each(this.items, function(value, key, list) {
            list[key] = list[key].replace("{{year}}", startYear++);
        }, this);
    }
}) },
"commitlog": {"controller": /*
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
	// Commitlog FieldTemplate (base) 

    /**
     * Stores the historical log of the Forecast entries
     */
    commitLog: [],

    /**
     * Previous committed date value to display in the view
     */
    previousDateEntered: '',

    initialize: function(options) {
        app.view.Field.prototype.initialize.call(this, options);

        this.on('show', function() {
            if (!this.disposed) {
                this.render();
            }
        }, this);
    },

    bindDataChange: function() {
        this.collection.on('reset', function() {
            this.hide();
            this.buildCommitLog();
        }, this);

        this.context.on('forecast:commit_log:trigger', function() {
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
        var dateEntered = new Date(Date.parse(previousModel.get('date_modified')));
        if (dateEntered == 'Invalid Date') {
            dateEntered = previousModel.get('date_modified');
        }
        // set the previous date entered in the users format
        this.previousDateEntered = app.date.format(dateEntered, app.user.getPreference('datepref') + ' ' + app.user.getPreference('timepref'));

        //loop through from oldest to newest to build the log correctly
        var loopPreviousModel = '',
            models = _.clone(this.collection.models).reverse(),
            selectedUser = this.view.context.get('selectedUser'),
            forecastType = app.utils.getForecastType(selectedUser.is_manager, selectedUser.showOpps);
        _.each(models, function(model) {
            this.commitLog.push(app.utils.createHistoryLog(loopPreviousModel, model, forecastType === 'Direct'));
            loopPreviousModel = model;
        }, this);

        //reset the order of the history log for display
        this.commitLog.reverse();
    }
}) },
"reportingUsers": {"controller": /*
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
	// ReportingUsers FieldTemplate (base) 


    /**
     * The JS Tree Object
     */
    jsTree: {},

    /**
     * The end point we need to hit
     */
    reporteesEndpoint: '',

    /**
     * Current end point hit
     */
    currentTreeUrl: '',

    /**
     * Current root It
     */
    currentRootId: '',

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

        this.reporteesEndpoint = app.api.buildURL("Forecasts/reportees") + '/';

        this.selectedUser = this.context.get('selectedUser') || app.user.toJSON();
        this.currentTreeUrl = this.reporteesEndpoint + this.selectedUser.id;
        this.currentRootId = this.selectedUser.id;
    },

    /**
     * overriding _dispose to make sure custom added jsTree listener is removed
     * @private
     */
    _dispose: function() {
        if (app.user.get('is_manager') && !_.isEmpty(this.jsTree)) {
            this.jsTree.off();
        }
        app.view.Field.prototype._dispose.call(this);
    },

    /**
     * Only run the render if the user is a manager as that is the only time we want the tree to display.
     */
    render: function() {
        if (app.user.get('is_manager')) {
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
            var nodeId = (selectedUser.is_manager ? 'jstree_node_myopps_' : 'jstree_node_') + selectedUser.user_name;
            this.selectJSTreeNode(nodeId)
            // check before render if we're trying to re-render tree with a fresh root user
            // otherwise do not re-render tree
            // also make sure we're not re-rendering tree for a rep
        } else if (this.currentRootId != selectedUser.id) {
            if (selectedUser.is_manager) {
                // if user is a manager we'll be re-rendering the tree
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
                // we need to "select" the user on the tree to show they're selected

                // create node ID
                var nodeId = 'jstree_node_' + selectedUser.user_name;

                // select node only if it is not the already selected node
                if (this.jsTree.jstree('get_selected').attr('id') != nodeId) {
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
        // user clicked a user's name from the worksheet, so explicitly causing a deselection
        this.jsTree.jstree('deselect_all');

        this.jsTree.jstree('select_node', '#' + nodeId);
    },


    /**
     * Recursively step through the tree and for each node representing a tree node, run the data attribute through
     * the replaceHTMLChars function.  This function supports n-levels of the tree hierarchy.
     *
     * @param data The data structure returned from the REST API Forecasts/reportees endpoint
     * @param ctx A reference to the view's context so that we may recursively call _recursiveReplaceHTMLChars
     * @return object The modified data structure after all the parent and children nodes have been stepped through
     * @private
     */
    _recursiveReplaceHTMLChars: function(data, ctx) {

        _.each(data, function(entry, index) {

            //Scan for the nodes with the data attribute.  These are the nodes we are interested in
            if (entry.data) {
                data[index].data = (function(value) {
                    return value.replace(/&amp;/gi, '&').replace(/&lt;/gi, '<').replace(/&gt;/gi, '>').replace(/&#039;/gi, '\'').replace(/&quot;/gi, '"');
                })(entry.data);

                if (entry.children) {
                    //For each children found (if any) then call _recursiveReplaceHTMLChars again.  Notice setting
                    //childEntry to an Array.  This is crucial so that the beginning _.each loop runs correctly.
                    _.each(entry.children, function(childEntry, index2) {
                        entry.children[index2] = ctx._recursiveReplaceHTMLChars([childEntry]);
                        if (childEntry.attr.rel == 'my_opportunities' && childEntry.metadata.id == app.user.get('id')) {
                            childEntry.data = app.utils.formatString(app.lang.get('LBL_MY_MANAGER_LINE', 'Forecasts'), [childEntry.data]);
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

        app.api.call('read', this.currentTreeUrl, null, options);
    },

    createTree: function(data) {
        // make sure we're using an array
        // if the data coming from the endpoint is an array with one element
        // it gets converted to a JS object in the process of getting here
        if (!_.isArray(data)) {
            data = [ data ];
        }

        var treeData = this._recursiveReplaceHTMLChars(data, this),
            selectedUser = this.context.get('selectedUser'),
            nodeId = (selectedUser.is_manager && selectedUser.showOpps ? 'jstree_node_myopps_' : 'jstree_node_') + selectedUser.user_name;
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
                this.previousUserName = (this.selectedUser.is_manager && this.selectedUser.showOpps ? 'jstree_node_myopps_' : 'jstree_node_') + this.selectedUser.user_name;

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
                    'id': userData.id,
                    'user_name': userData.user_name,
                    'full_name': userData.full_name,
                    'first_name': userData.first_name,
                    'last_name': userData.last_name,
                    'reports_to_id': userData.reports_to_id,
                    'reports_to_name': userData.reports_to_name,
                    'is_manager': (nodeType != 'rep'),
                    'is_top_level_manager': (nodeType != 'rep' && _.isEmpty(userData.reports_to_id)),
                    'showOpps': showOpps,
                    'reportees': []
                };

                this.context.trigger('forecasts:user:changed', selectedUser, this.context);
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
        this.$el.find('#people').addClass("jstree-sugar");

    }
}) },
"quotapoint": {"controller": /*
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
	// Quotapoint FieldTemplate (base) 


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
        this.selectedUser = this.context.get('selectedUser');
        this.selectedTimePeriod = this.context.get('selectedTimePeriod');
        this.userCurrencyID = app.user.getPreference('currency_id');

        //if user resizes browser, adjust datapoint layout accordingly
        $(window).on('resize.datapoints', _.bind(this.resize, this));
        this.on('render', function() {
            this.resize();
            return true;
        }, this);
    },

    /**
     * @inheritdoc
     */
    bindDataChange: function() {
        this.context.on('change:selectedUser', function(ctx, user) {
            this.selectedUser = user;

            // reload data when the selectedTimePeriod changes
            this.loadData({});
        }, this);

        this.context.on('change:selectedTimePeriod', function(ctx, timePeriod) {
            this.selectedTimePeriod = timePeriod;

            // reload data when the selectedTimePeriod changes
            this.loadData({});
        }, this);

        this.loadData();
    },

    /**
     * If this is a top-level manager, we need to add an event listener for
     * forecasts:worksheet:totals so the top-level manager's quota can update live
     * with changes done in the manager worksheet reflected here
     *
     * @param isTopLevelManager {Boolean} if the user is a top-level manager or not
     */
    toggleTotalsListeners: function(isTopLevelManager) {
        if(isTopLevelManager) {
            this.hasListenerAdded = true;
            // Only for top-level manager whose quota can change on the fly
            this.context.on('forecasts:worksheet:totals', function(totals) {
                var quota = 0.00;
                if(_.has(totals, 'quota')) {
                    quota = totals.quota;
                } else {
                    quota = this.quotaAmount;
                }
                this.quotaAmount = quota;
                if (!this.disposed) {
                    this.render();
                }
            }, this);
            // if we're on the manager worksheet view, get the collection and calc quota
            if(!this.selectedUser.showOpps) {
                // in case this gets added after the totals event was dispatched
                var collection = app.utils.getSubpanelCollection(this.context, 'ForecastManagerWorksheets'),
                    quota = 0.00;

                _.each(collection.models, function(model) {
                    quota = app.math.add(quota, model.get('quota'));
                }, this);
                this.quotaAmount = quota;
                this.render();
            }
        } else if(this.hasListenerAdded) {
            this.hasListenerAdded = false;
            this.context.off('forecasts:worksheet:totals', null, this);
        }
    },

    /**
     * Builds widget url
     *
     * @return {*} url to call
     */
    getQuotasURL: function() {
        var method = (this.selectedUser.is_manager && this.selectedUser.showOpps) ? 'direct' : 'rollup',
            url = 'Forecasts/' + this.selectedTimePeriod + '/quotas/' + method + '/' + this.selectedUser.id;

        return app.api.buildURL(url, 'read');
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

        app.api.call('read', url, null, null, cb);
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
                sel = thisView$El.find('.last-commit .datapoints div.datapoint:nth-child('+index+')');
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
        //resizing the window that's why we set a timer so the code should be executed only once
        if (this.resizeDetectTimer) {
            clearTimeout(this.resizeDetectTimer);
        }
        this.resizeDetectTimer = setTimeout(_.bind(function() {
            this.adjustDatapointLayout();
        }, this), 250);
    }
}) },
"button": {"controller": /*
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
	// Button FieldTemplate (base) 

    extendsFrom: 'ButtonField',

    /**
     * Override so we can have a custom hasAccess for forecast to check on the header-pane buttons
     *
     * @inheritdoc
     * @override
     * @returns {*}
     */
    hasAccess: function() {
        // this is a special use case for forecasts
        // currently the only buttons that set acl_action == 'current_user' are the save_draft and commit buttons
        // if it's not equal to 'current_user' then go up the prototype chain.
        if(this.def.acl_action == 'current_user') {
            var su = this.context.get('selectedUser') || app.user.toJSON();
            return su.id === app.user.get('id');
        } else {
            return this._super('hasAccess');
        }
    }
}) },
"lastcommit": {"controller": /*
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
	// Lastcommit FieldTemplate (base) 


    commit_date: undefined,

    data_points: [],

    points: [],

    events: {
        'click': 'triggerHistoryLog'
    },

    /**
     * @inheritdoc
     */
    initialize: function(options) {
        this._super('initialize', [options]);

        this.points = [];
        this.data_points = [];

        // map what points we should display
        _.each(options.def.datapoints, function(point) {
            if (app.utils.getColumnVisFromKeyMap(point, 'forecastsWorksheet')) {
                this.points.push(point);
            }
        }, this);
    },

    /**
     * Toggles the commit history log
     */
    triggerHistoryLog: function() {
        this.$('i').toggleClass('fa-caret-down fa-caret-up');
        this.context.trigger('forecast:commit_log:trigger');
    },

    /**
     * @inheritdoc
     */
    bindDataChange: function() {
        this.collection.on('reset', function() {
            // get the first line
            this.data_points = [];
            var model = _.first(this.collection.models)

            if (!_.isUndefined(model)) {
                this.commit_date = model.get('date_modified');

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
     * Processes a Forecast collection's models into datapoints
     * @param {Bean} model
     * @returns {Array}
     */
    processDataPoints: function(model) {
        var points = [],
            noAccessTemplate = app.template.getField('base', 'noaccess')(this);

        _.each(this.points, function(point) {
            // make sure we can view data for this point
            var point_data = {};
            if (app.acl.hasAccess('read', 'ForecastWorksheets', app.user.get('id'), point)) {
                point_data.value = model.get(point)
            } else {
                point_data.error = noAccessTemplate;
            }
            points.push(point_data);
        }, this);

        return points;
    }
}) },
"date": {"controller": /*
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
	// Date FieldTemplate (base) 

    extendsFrom: 'DateField',

    /**
     * @inheritdoc
     *
     * Add `ClickToEdit` plugin to the list of required plugins.
     */
    _initPlugins: function() {
        this._super('_initPlugins');

        if (this.options.def.click_to_edit) {
            this.plugins = _.union(this.plugins, [
                'ClickToEdit'
            ]);
        }

        return this;
    }
}) }
}}
,
"views": {
"base": {
"config-ranges": {"controller": /*
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
 * @class View.Views.Base.ForecastsConfigRangesView
 * @alias SUGAR.App.view.layouts.BaseForecastsConfigRangesView
 * @extends View.Views.Base.ConfigPanelView
 */
({
	// Config-ranges View (base) 

    extendsFrom: 'ConfigPanelView',

    events: {
        'click #btnAddCustomRange a': 'addCustomRange',
        'click #btnAddCustomRangeWithoutProbability a': 'addCustomRange',
        'click .addCustomRange': 'addCustomRange',
        'click .removeCustomRange': 'removeCustomRange',
        'keyup input[type=text]': 'updateCustomRangeLabel',
        'change :radio': 'selectionHandler'
    },

    /**
     * Holds the fields metadata
     */
    fieldsMeta: {},

    /**
     * used to hold the metadata for the forecasts_ranges field, used to manipulate and render out as the radio buttons
     * that correspond to the fieldset for each bucket type.
     */
    forecastRangesField: {},

    /**
     * Used to hold the buckets_dom field metadata, used to retrieve and set the proper bucket dropdowns based on the
     * selection for the forecast_ranges
     */
    bucketsDomField: {},

    /**
     * Used to hold the category_ranges field metadata, used for rendering the sliders that correspond to the range
     * settings for each of the values contained in the selected buckets_dom dropdown definition.
     */
    categoryRangesField: {},

    /**
     * Holds the values found in Forecasts Config commit_stages_included value
     */
    includedCommitStages: [],

    //TODO-sfa remove this once the ability to map buckets when they get changed is implemented (SFA-215).
    /**
     * This is used to determine whether we need to lock the module or not, based on whether forecasts has been set up already
     */
    disableRanges: false,

    /**
     * Used to keep track of the selection as it changes so that it can be used to determine how to hide and show the
     * sub-elements that contain the fields for setting the category ranges
     */
    selectedRange: '',

    /**
     * a placeholder for the individual range sliders that will be used to build the range setting
     */
    fieldRanges: {},

    /**
     * @inheritdoc
     */
    initialize: function(options) {
        this._super('initialize', [options]);

        // parse get the fields metadata
        _.each(_.first(this.meta.panels).fields, function(field) {
            this.fieldsMeta[field.name] = field;
            if (field.name === 'category_ranges') {
                // get rid of the name key so it doesn't mess up the other fields
                delete this.fieldsMeta.category_ranges.name;
            }
        }, this);

        // init the fields from metadata
        this.forecastRangesField = this.fieldsMeta.forecast_ranges;
        this.bucketsDomField = this.fieldsMeta.buckets_dom;
        this.categoryRangesField = this.fieldsMeta.category_ranges;

        // get the included commit stages
        this.includedCommitStages = this.model.get('commit_stages_included');

        // set the values for forecastRangesField and bucketsDomField from the model, so it can be set to selected properly when rendered
        this.forecastRangesField.value = this.model.get('forecast_ranges');
        this.bucketsDomField.value = this.model.get('buckets_dom');

        // This will be set to true if the forecasts ranges setup should be disabled
        this.disableRanges = this.model.get('has_commits');
        this.selectedRange = this.model.get('forecast_ranges');
    },

    /**
     * @inheritdoc
     * @override
     */
    _updateTitleValues: function() {
        var forecastRanges = this.model.get('forecast_ranges'),
            rangeObjs = this.model.get(forecastRanges + '_ranges'),
            tmpArr = [],
            str = '',
            aSort = function(a, b) {
                if (a.min < b.min) {
                    return -1;
                } else if (a.min > b.min) {
                    return 1;
                }
            }

        // Get the keys into an object
        _.each(rangeObjs, function(value, key) {
            if(key.indexOf('without_probability') === -1) {
                tmpArr.push({
                    min: value.min,
                    max: value.max
                });
            }
        });

        tmpArr.sort(aSort);

        _.each(tmpArr, function(val) {
            str += val.min + '% - ' + val.max + '%, ';
        });

        this.titleSelectedValues = str.slice(0, str.length - 2);
        this.titleSelectedRange = app.lang.getAppListStrings('forecasts_config_ranges_options_dom')[forecastRanges];
    },

    /**
     * @inheritdoc
     * @override
     */
    _updateTitleTemplateVars: function() {
        this.titleTemplateVars = {
            title: this.titleViewNameTitle,
            message: this.titleSelectedRange,
            selectedValues: this.titleSelectedValues,
            viewName: this.name
        };
    },

    /**
     * @inheritdoc
     */
    bindDataChange: function() {
        this.model.on('change:show_binary_ranges change:show_buckets_ranges change:show_custom_buckets_ranges',
            function() {
                this.updateTitle();
            }, this
        );
        this.model.on('change:forecast_ranges', function(model) {
            this.updateTitle();
            if(model.get('forecast_ranges') === 'show_custom_buckets') {
                this.updateCustomRangesCheckboxes();
            }
        }, this);
    },

    /**
     * @inheritdoc
     */
    _render: function() {
        this._super('_render');

        // after the view renders, check for the range that has been selected and
        // trigger the change event on its element so that it shows
        this.$(':radio:checked').trigger('change');

        if(this.model.get('forecast_ranges') === 'show_custom_buckets') {
            this.updateCustomRangesCheckboxes();
        }
    },

    /**
     * Handles when the radio buttons change
     *
     * @param {jQuery.Event} event
     */
    selectionHandler: function(event) {
        var newValue = $(event.target).val(),
            oldValue = this.selectedRange,
            bucket_dom = this.bucketsDomField.options[newValue],
            elToHide = this.$('#' + oldValue + '_ranges'),
            elToShow = this.$('#' + newValue + '_ranges');

        // now set the new selection, so that if they change it,
        // we can later hide the things we are about to show.
        this.selectedRange = newValue;

        if(elToShow.children().length === 0) {
            if(newValue === 'show_custom_buckets') {
                this._customSelectionHandler(newValue, elToShow);
            } else {
                this._selectionHandler(newValue, elToShow);
            }

            // use call to set context back to the view for connecting the sliders
            this.connectSliders.call(this, newValue, this.fieldRanges);
        }

        if(elToHide) {
            elToHide.toggleClass('hide', true);
        }

        if(elToShow) {
            elToShow.toggleClass('hide', false);
        }

        // set the forecast ranges and associated dropdown dom on the model
        this.model.set({
            forecast_ranges: newValue,
            buckets_dom: bucket_dom
        });
    },

    /**
     * Selection handler for standard ranges (two and three ranges)
     *
     * @param {Object} elementVal value of the radio button that was clicked
     * @param {Object} showElement the jQuery-wrapped html element from selectionHandler
     * @private
     */
    _selectionHandler: function(elementVal, showElement) {
        var bucketDomStrings = app.lang.getAppListStrings(this.bucketsDomField.options[elementVal]);

        // add the things here...
        this.fieldRanges[elementVal] = {};
        showElement.append('<p>' + app.lang.get('LBL_FORECASTS_CONFIG_' + elementVal.toUpperCase() + '_RANGES_DESCRIPTION', 'Forecasts', this) + '</p>');

        _.each(bucketDomStrings, function(label, key) {
            if(key != 'exclude') {
                var rangeField,
                    model = new Backbone.Model(),
                    fieldSettings;

                // get the value in the current model and use it to display the slider
                model.set(key, this.model.get(elementVal + '_ranges')[key]);

                // build a range field
                fieldSettings = {
                    view: this,
                    def: this.fieldsMeta.category_ranges[key],
                    viewName: 'edit',
                    context: this.context,
                    module: this.module,
                    model: model,
                    meta: app.metadata.getField('range')
                };

                rangeField = app.view.createField(fieldSettings);
                showElement.append('<b>' + label + ':</b>').append(rangeField.el);
                rangeField.render();

                // now give the view a way to get at this field's model, so it can be used to set the value on the
                // real model.
                this.fieldRanges[elementVal][key] = rangeField;

                // this gives the field a way to save to the view's real model. It's wrapped in a closure to allow us to
                // ensure we have everything when switching contexts from this handler back to the view.
                rangeField.sliderDoneDelegate = function(category, key, view) {

                    return function(value) {
                        this.view.updateRangeSettings(category, key, value);
                    };
                }(elementVal, key, this);
            }
        }, this);
        showElement.append($('<p>' + app.lang.get('LBL_FORECASTS_CONFIG_RANGES_EXCLUDE_INFO', 'Forecasts') + '</p>'));
    },

    /**
     * Selection handler for custom ranges
     *
     * @param {Object} elementVal value of the radio button that was clicked
     * @param {Object} showElement the jQuery-wrapped html element from selectionHandler
     * @private
     */
    _customSelectionHandler: function(elementVal, showElement) {
        var bucketDomOptions = {},
            elValRanges = elementVal + '_ranges',
            bucketDomStrings = app.lang.getAppListStrings(this.bucketsDomField.options[elementVal]),
            rangeField,
            _ranges = _.clone(this.model.get(elValRanges));

        this.fieldRanges[elementVal] = {};
        showElement.append('<p>' + app.lang.get('LBL_FORECASTS_CONFIG_' + elementVal.toUpperCase() + '_RANGES_DESCRIPTION', 'Forecasts', this) + '</p>');

        // if custom bucket isn't defined save default values
        if(!this.model.has(elValRanges)) {
            this.model.set(elValRanges, {});
        }

        _.each(bucketDomStrings, function(label, key) {
            if (_.isUndefined(_ranges[key])) {
                // the range doesn't exist, so we add it to the ranges
                _ranges[key] = {min: 0, max: 100, in_included_total: false};
            } else {
                // the range already exists, update the in_included_total value
                _ranges[key].in_included_total = (_.contains(this.includedCommitStages, key));
            }
            bucketDomOptions[key] = label;
        }, this);
        this.model.set(elValRanges, _ranges);

        // save key and label of custom range from the language file to model
        // then we can add or remove ranges and save it on backend side
        // bind handler on change to validate data
        this.model.set(elementVal + '_options', bucketDomOptions);
        this.model.on('change:' + elementVal + '_options', function(event) {
            this.validateCustomRangeLabels(elementVal);
        }, this);

        // create layout, create placeholders for different types of custom ranges
        this._renderCustomRangesLayout(showElement, elementVal);

        // render custom ranges
        _.each(bucketDomStrings, function(label, key) {
            rangeField = this._renderCustomRange(key, label, showElement, elementVal);
            // now give the view a way to get at this field's model, so it can be used to set the value on the
            // real model.
            this.fieldRanges[elementVal][key] = rangeField;
        }, this);

        // if there are custom ranges not based on probability hide add button on the top of block
        if(this._getLastCustomRangeIndex(elementVal, 'custom')) {
            this.$('#btnAddCustomRange').hide();
        }

        // if there are custom ranges not based on probability hide add button on the top of block
        if(this._getLastCustomRangeIndex(elementVal, 'custom_without_probability')) {
            this.$('#btnAddCustomRangeWithoutProbability').hide();
        }
    },

    /**
     * Render layout for custom ranges, add placeholders for different types of ranges
     *
     * @param {Object} showElement the jQuery-wrapped html element from selectionHandler
     * @param {string} category type for the ranges 'show_binary' etc.
     * @private
     */
    _renderCustomRangesLayout: function(showElement, category) {
        var template = app.template.getView('config-ranges.customRangesDefault', 'Forecasts'),
            mdl = {
                category: category
            };

        showElement.append(template(mdl));
    },

    /**
     * Creates a new custom range field and renders it in showElement
     *
     * @param {string} key
     * @param {string} label
     * @param {Object} showElement the jQuery-wrapped html element from selectionHandler
     * @param {string} category type for the ranges 'show_binary' etc.
     * @private
     * @return {View.field} new created field
     */
    _renderCustomRange: function(key, label, showElement, category) {
        var customType = key,
            customIndex = 0,
            isExclude = false,
            // placeholder to insert custom range
            currentPlaceholder = showElement,
            rangeField,
            model = new Backbone.Model(),
            fieldSettings,
            lastCustomRange;

        // define type of new custom range based on name of range and choose placeholder to insert
        // custom_default: include, upside or exclude
        // custom - based on probability
        // custom_without_probability - not based on probability
        if(key.substring(0, 26) == 'custom_without_probability') {
            customType = 'custom_without_probability';
            customIndex = key.substring(27);
            currentPlaceholder = this.$('#plhCustomWithoutProbability');
        } else if(key.substring(0, 6) == 'custom') {
            customType = 'custom';
            customIndex = key.substring(7);
            currentPlaceholder = this.$('#plhCustom');
        } else if(key.substring(0, 7) == 'exclude') {
            customType = 'custom_default';
            currentPlaceholder = this.$('#plhExclude');
            isExclude = true;
        } else {
            customType = 'custom_default';
            currentPlaceholder = this.$('#plhCustomDefault');
        }

        // get the value in the current model and use it to display the slider
        model.set(key, this.model.get(category + '_ranges')[key]);

        // get the field definition from
        var fieldDef = this.fieldsMeta.category_ranges[key] || this.fieldsMeta.category_ranges[customType];

        // build a range field
        fieldSettings = {
            view: this,
            def: _.clone(fieldDef),
            viewName: 'forecastsCustomRange',
            context: this.context,
            module: this.module,
            model: model,
            meta: app.metadata.getField('range')
        };
        // set up real range name
        fieldSettings.def.name = key;
        // set up view
        fieldSettings.def.view = 'forecastsCustomRange';
        // enable slider
        fieldSettings.def.enabled = true;

        rangeField = app.view.createField(fieldSettings);
        currentPlaceholder.append(rangeField.el);
        rangeField.label = label;
        rangeField.customType = customType;

        // added + to make sure customIndex is numeric
        rangeField.customIndex = +customIndex;

        rangeField.isExclude = isExclude;
        rangeField.in_included_total = (_.contains(this.includedCommitStages, key));
        rangeField.category = category;

        if(key == 'include') {
            rangeField.isReadonly = true;
        }

        rangeField.render();

        // enable slider after render
        rangeField.$(rangeField.fieldTag).noUiSlider('enable');

        // hide add button for previous custom range not based on probability
        lastCustomRange = this._getLastCustomRange(category, rangeField.customType);
        if(lastCustomRange) {
            lastCustomRange.$('.addCustomRange').parent().hide();
        }

        // add error class if the range has an empty label
        if(_.isEmpty(rangeField.label)) {
            rangeField.$('.control-group').addClass('error');
        } else {
            rangeField.$('.control-group').removeClass('error');
        }

        // this gives the field a way to save to the view's real model. It's wrapped in a closure to allow us to
        // ensure we have everything when switching contexts from this handler back to the view.
        rangeField.sliderDoneDelegate = function(category, key, view) {
            return function(value) {
                this.view.updateRangeSettings(category, key, value);
            };
        }(category, key, this);

        return rangeField;
    },

    /**
     * Returns the index of the last custom range or 0
     *
     * @param {string} category type for the ranges 'show_binary' etc.
     * @param {string} customType
     * @return {number}
     * @private
     */
    _getLastCustomRangeIndex: function(category, customType) {
        var lastCustomRangeIndex = 0;
        // loop through all ranges, if there are multiple ranges with the same customType, they'll just overwrite
        // each other's index and after the loop we'll have the final index left
        if(this.fieldRanges[category]) {
            _.each(this.fieldRanges[category], function(range) {
                if(range.customType == customType && range.customIndex > lastCustomRangeIndex) {
                    lastCustomRangeIndex = range.customIndex;
                }
            }, this);
        }
        return lastCustomRangeIndex;
    },

    /**
     * Returns the last created custom range object, if no range object, return upside/include
     * for custom type and exclude for custom_without_probability type
     *
     * @param {string} category type for the ranges 'show_binary' etc.
     * @param {string} customType
     * @return {*}
     * @private
     */
    _getLastCustomRange: function(category, customType) {
        if(!_.isEmpty(this.fieldRanges[category])) {
            var lastCustomRange = undefined;
            // loop through all ranges, if there are multiple ranges with the same customType, they'll just overwrite
            // each other on lastCustomRange and after the loop we'll have the final one left
            _.each(this.fieldRanges[category], function(range) {
                if(range.customType == customType
                    && (_.isUndefined(lastCustomRange) || range.customIndex > lastCustomRange.customIndex)) {
                    lastCustomRange = range;
                }
            }, this);

            if(_.isUndefined(lastCustomRange)) {
                // there is not custom range - use default ranges
                if(customType == 'custom') {
                    // use upside or include
                    lastCustomRange = this.fieldRanges[category].upside || this.fieldRanges[category].include;
                } else {
                    // use exclude
                    lastCustomRange = this.fieldRanges[category].exclude;
                }
            }
        }

        return lastCustomRange;
    },

    /**
     * Adds a new custom range field and renders it in specific placeholder
     *
     * @param {jQuery.Event} event click
     */
    addCustomRange: function(event) {
        var self = this,
            category = $(event.currentTarget).data('category'),
            customType = $(event.currentTarget).data('type'),
            categoryRange = category + '_ranges',
            categoryOptions = category + '_options',
            ranges = _.clone(this.model.get(categoryRange)),
            bucketDomOptions = _.clone(this.model.get(categoryOptions));

        if (_.isUndefined(category) || _.isUndefined(customType)
            || _.isUndefined(ranges) || _.isUndefined(bucketDomOptions)) {
            return false;
        }

        var showElement = (customType == 'custom') ? this.$('#plhCustom') : this.$('#plhCustomWithoutProbability'),
            label = app.lang.get('LBL_FORECASTS_CUSTOM_RANGES_DEFAULT_NAME', 'Forecasts'),
            rangeField,
            lastCustomRange = this._getLastCustomRange(category, customType),
            lastCustomRangeIndex = this._getLastCustomRangeIndex(category, customType);

        lastCustomRangeIndex++;

        // setup key for the new range
        var key = customType + '_' + lastCustomRangeIndex;

        // set up min/max values for new custom range
        if (customType != 'custom') {
            // if range is without probability setup min and max values to 0
            ranges[key] = {
                min: 0,
                max: 0,
                in_included_total: false
            };
        } else if (ranges.exclude.max - ranges.exclude.min > 3) {
            // decrement exclude range to insert new range
            ranges[key] = {
                min: parseInt(ranges.exclude.max, 10) - 1,
                max: parseInt(ranges.exclude.max, 10),
                in_included_total: false
            };
            ranges.exclude.max = parseInt(ranges.exclude.max, 10) - 2;
            if (this.fieldRanges[category].exclude.$el) {
                this.fieldRanges[category].exclude.$(this.fieldRanges[category].exclude.fieldTag)
                    .noUiSlider('move', {handle: 'upper', to: ranges.exclude.max});
            }
        } else if (ranges[lastCustomRange.name].max - ranges[lastCustomRange.name].min > 3) {
            // decrement previous range to insert new range
            ranges[key] = {
                min: parseInt(ranges[lastCustomRange.name].min, 10),
                max: parseInt(ranges[lastCustomRange.name].min, 10) + 1,
                in_included_total: false
            };
            ranges[lastCustomRange.name].min = parseInt(ranges[lastCustomRange.name].min, 10) + 2;
            if (lastCustomRange.$el) {

                lastCustomRange.$(lastCustomRange.fieldTag)
                    .noUiSlider('move', {handle: 'lower', to: ranges[lastCustomRange.name].min});
            }
        } else {
            ranges[key] = {
                min: parseInt(ranges[lastCustomRange.name].min, 10) - 2,
                max: parseInt(ranges[lastCustomRange.name].min, 10) - 1,
                in_included_total: false
            };
        }

        this.model.set(categoryRange, ranges);

        rangeField = this._renderCustomRange(key, label, showElement, category);
        if(rangeField) {
            this.fieldRanges[category][key] = rangeField;
        }

        bucketDomOptions[key] = label;
        this.model.set(categoryOptions, bucketDomOptions);

        // adding event listener to new custom range
        rangeField.$(':checkbox').each(function() {
            var $el = $(this);
            $el.on('click', _.bind(self.updateCustomRangeIncludeInTotal, self));
            app.accessibility.run($el, 'click');
        });

        if(customType == 'custom') {
            // use call to set context back to the view for connecting the sliders
            this.$('#btnAddCustomRange').hide();
            this.connectSliders.call(this, category, this.fieldRanges);
        } else {
            // hide add button form top of block and for previous ranges not based on probability
            this.$('#btnAddCustomRangeWithoutProbability').hide();
            _.each(this.fieldRanges[category], function(item) {
                if(item.customType == customType && item.customIndex < lastCustomRangeIndex && item.$el) {
                    item.$('.addCustomRange').parent().hide();
                }
            }, this);
        }

        // update checkboxes
        this.updateCustomRangesCheckboxes();
    },

    /**
     * Removes a custom range from the model and view
     *
     * @param {jQuery.Event} event click
     * @return void
     */
    removeCustomRange: function(event) {
        var category = $(event.currentTarget).data('category'),
            fieldKey = $(event.currentTarget).data('key'),
            categoryRanges = category + '_ranges',
            categoryOptions = category + '_options',
            ranges = _.clone(this.model.get(categoryRanges)),
            bucketDomOptions = _.clone(this.model.get(categoryOptions));

        if (_.isUndefined(category) || _.isUndefined(fieldKey) || _.isUndefined(this.fieldRanges[category])
            || _.isUndefined(this.fieldRanges[category][fieldKey]) || _.isUndefined(ranges)
            || _.isUndefined(bucketDomOptions))
        {
            return false;
        }

        var range,
            previousCustomRange,
            lastCustomRangeIndex,
            lastCustomRange;

        range = this.fieldRanges[category][fieldKey];

        if (_.indexOf(['include', 'upside', 'exclude'], range.name) != -1) {
            return false;
        }

        if(range.customType == 'custom') {
            // find previous renge and reassign range values form removed to it
            _.each(this.fieldRanges[category], function(item) {
                if(item.customType == 'custom' && item.customIndex < range.customIndex) {
                    previousCustomRange = item;
                }
            }, this);

            if(_.isUndefined(previousCustomRange)) {
                previousCustomRange = (this.fieldRanges[category].upside) ? this.fieldRanges[category].upside : this.fieldRanges[category].include;
            }

            ranges[previousCustomRange.name].min = +ranges[range.name].min;

            if(previousCustomRange.$el) {
                previousCustomRange.$(previousCustomRange.fieldTag).noUiSlider('move', {handle: 'lower', to: ranges[previousCustomRange.name].min});
            }
        }

        // update included ranges
        this.includedCommitStages = _.without(this.includedCommitStages, range.name)

        // removing event listener for custom range
        range.$(':checkbox').off('click');

        // remove view for the range
        this.fieldRanges[category][range.name].remove();

        delete ranges[range.name];
        delete this.fieldRanges[category][range.name];
        delete bucketDomOptions[range.name];

        this.model.set(categoryOptions, bucketDomOptions);
        this.model.set(categoryRanges, ranges);

        lastCustomRangeIndex = this._getLastCustomRangeIndex(category, range.customType);
        if(range.customType == 'custom') {
            // use call to set context back to the view for connecting the sliders
            if (lastCustomRangeIndex == 0) {
                this.$('#btnAddCustomRange').show();
            }
            this.connectSliders.call(this, category, this.fieldRanges);
        } else {
            // show add button for custom range not based on probability
            if(lastCustomRangeIndex == 0) {
                this.$('#btnAddCustomRangeWithoutProbability').show();
            }
        }
        lastCustomRange = this._getLastCustomRange(category, range.customType);
        if(lastCustomRange.$el) {
            lastCustomRange.$('.addCustomRange').parent().show();
        }

        // update checkboxes
        this.updateCustomRangesCheckboxes();
    },

    /**
     * Change a label for a custom range in the model
     *
     * @param {jQuery.Event} event keyup
     */
    updateCustomRangeLabel: function(event) {
        var category = $(event.target).data('category'),
            fieldKey = $(event.target).data('key'),
            categoryOptions = category + '_options',
            bucketDomOptions = _.clone(this.model.get(categoryOptions));

        if (category && fieldKey && bucketDomOptions) {
            bucketDomOptions[fieldKey] = $(event.target).val();
            this.model.set(categoryOptions, bucketDomOptions);
        }
    },

    /**
     * Validate labels for custom ranges, if it is invalid add error style for input
     *
     * @param {string} category type for the ranges 'show_binary' etc.
     */
    validateCustomRangeLabels: function(category) {
        var opts = this.model.get(category + '_options'),
            hasErrors = false,
            range;

        _.each(opts, function(label, key) {
            range = this.fieldRanges[category][key];
            if(_.isEmpty(label.trim())) {
                range.$('.control-group').addClass('error');
                hasErrors = true;
            } else {
                range.$('.control-group').removeClass('error');
            }
        }, this);

        var saveBtn = this.layout.layout.$('[name=save_button]');
        if(saveBtn) {
            if(hasErrors) {
                // if there are errors, disable the save button
                saveBtn.addClass('disabled');
            } else if(!hasErrors && saveBtn.hasClass('disabled')) {
                // if there are no errors and the save btn is disabled, enable it
                saveBtn.removeClass('disabled');
            }
        }
    },

    /**
     * Change in_included_total value for custom range in model
     *
     * @param {Backbone.Event} event change
     */
    updateCustomRangeIncludeInTotal: function(event) {
        var category = $(event.target).data('category'),
            fieldKey = $(event.target).data('key'),
            categoryRanges = category + '_ranges',
            ranges;

        if (category && fieldKey) {
            ranges = _.clone(this.model.get(categoryRanges));
            if (ranges && ranges[fieldKey]) {
                if (fieldKey !== 'exclude' && fieldKey.indexOf('custom_without_probability') == -1) {
                    var isChecked = $(event.target).is(':checked');
                    ranges[fieldKey].in_included_total = isChecked;
                    if(isChecked) {
                        // silently add this range to the includedCommitStages
                        this.includedCommitStages.push(fieldKey);
                    } else {
                        // silently remove this range from includedCommitStages
                        this.includedCommitStages = _.without(this.includedCommitStages, fieldKey)
                    }

                    this.model.set('commit_stages_included', this.includedCommitStages);

                } else {
                    ranges[fieldKey].in_included_total = false;
                }
                this.model.set(categoryRanges, ranges);
                this.updateCustomRangesCheckboxes();
            }
        }
    },

    /**
     * Iterates through custom ranges checkboxes and enables/disables
     * checkboxes so users can only select certain checkboxes to include ranges
     */
    updateCustomRangesCheckboxes: function() {
        var els = this.$('#plhCustomDefault :checkbox, #plhCustom :checkbox'),
            len = els.length,
            $el,
            fieldKey,
            i;

        for(i = 0; i < len; i++) {
            $el = $(els[i]);
            fieldKey = $el.data('key');

            //disable the checkbox
            $el.attr('disabled', true);
            // remove any click event listeners
            $el.off('click');

            // looking specifically for checkboxes that are not the 'include' checkbox but that are
            // the last included commit stage range or the first non-included commit stage range
            if(fieldKey !== 'include'
                && (i == this.includedCommitStages.length - 1 || i == this.includedCommitStages.length)) {
                // enable the checkbox
                $el.attr('disabled', false);
                // add new click event listener
                $el.on('click', _.bind(this.updateCustomRangeIncludeInTotal, this));
                app.accessibility.run($el, 'click');
            }
        }
    },

    /**
     * Updates the setting in the model for the specific range types.
     * This gets triggered when the range slider after the user changes a range
     *
     * @param {string} category type for the ranges 'show_binary' etc.
     * @param {string} range - the range being set, i. e. `include`, `exclude` or `upside` for `show_buckets` category
     * @param {number} value - the value being set
     */
    updateRangeSettings: function(category, range, value) {
        var catRange = category + '_ranges',
            setting = _.clone(this.model.get(catRange));

        if (category == 'show_custom_buckets') {
            value.in_included_total = setting[range].in_included_total || false;
        }

        setting[range] = value;
        this.model.set(catRange, setting);
    },

    /**
     * Graphically connects the sliders to the one below, so that they move in unison when changed, based on category.
     *
     * @param {string} ranges - the forecasts category that was selected, i. e. 'show_binary' or 'show_buckets'
     * @param {Object} sliders - an object containing the sliders that have been set up in the page.  This is created in the
     * selection handler when the user selects a category type.
     */
    connectSliders: function(ranges, sliders) {
        var rangeSliders = sliders[ranges];

        if(ranges == 'show_binary') {
            rangeSliders.include.sliderChangeDelegate = function(value) {
                // lock the upper handle to 100, as per UI/UX requirements to show a dual slider
                rangeSliders.include.$(rangeSliders.include.fieldTag).noUiSlider('move', {handle: 'upper', to: rangeSliders.include.def.maxRange});
                // set the excluded range based on the lower value of the include range
                this.view.setExcludeValueForLastSlider(value, ranges, rangeSliders.include);
            };
        } else if(ranges == 'show_buckets') {
            rangeSliders.include.sliderChangeDelegate = function(value) {
                // lock the upper handle to 100, as per UI/UX requirements to show a dual slider
                rangeSliders.include.$(rangeSliders.include.fieldTag).noUiSlider('move', {handle: 'upper', to: rangeSliders.include.def.maxRange});

                rangeSliders.upside.$(rangeSliders.upside.fieldTag).noUiSlider('move', {handle: 'upper', to: value.min - 1});
                if(value.min <= rangeSliders.upside.$(rangeSliders.upside.fieldTag).noUiSlider('value')[0] + 1) {
                    rangeSliders.upside.$(rangeSliders.upside.fieldTag).noUiSlider('move', {handle: 'lower', to: value.min - 2});
                }
            };
            rangeSliders.upside.sliderChangeDelegate = function(value) {
                rangeSliders.include.$(rangeSliders.include.fieldTag).noUiSlider('move', {handle: 'lower', to: value.max + 1});
                // set the excluded range based on the lower value of the upside range
                this.view.setExcludeValueForLastSlider(value, ranges, rangeSliders.upside);
            };
        } else if(ranges == 'show_custom_buckets') {
            var i, max,
                customSliders = _.sortBy(_.filter(
                    rangeSliders,
                    function(item) {
                        return item.customType == 'custom';
                    }
                ), function(item) {
                        return parseInt(item.customIndex, 10);
                    }
                ),
                probabilitySliders = _.union(rangeSliders.include, rangeSliders.upside, customSliders, rangeSliders.exclude);

            if(probabilitySliders.length) {
                for(i = 0, max = probabilitySliders.length; i < max; i++) {
                    probabilitySliders[i].connectedSlider = (probabilitySliders[i + 1]) ? probabilitySliders[i + 1] : null;
                    probabilitySliders[i].connectedToSlider = (probabilitySliders[i - 1]) ? probabilitySliders[i - 1] : null;
                    probabilitySliders[i].sliderChangeDelegate = function(value, populateEvent) {
                        // lock the upper handle to 100, as per UI/UX requirements to show a dual slider
                        if(this.name == 'include') {
                            this.$(this.fieldTag).noUiSlider('move', {handle: 'upper', to: this.def.maxRange});
                        } else if(this.name == 'exclude') {
                            this.$(this.fieldTag).noUiSlider('move', {handle: 'lower', to: this.def.minRange});
                        }

                        if(this.connectedSlider) {
                            this.connectedSlider.$(this.connectedSlider.fieldTag).noUiSlider('move', {handle: 'upper', to: value.min - 1});
                            if(value.min <= this.connectedSlider.$(this.connectedSlider.fieldTag).noUiSlider('value')[0] + 1) {
                                this.connectedSlider.$(this.connectedSlider.fieldTag).noUiSlider('move', {handle: 'lower', to: value.min - 2});
                            }
                            if(_.isUndefined(populateEvent) || populateEvent == 'down') {
                                this.connectedSlider.sliderChangeDelegate.call(this.connectedSlider, {
                                    min: this.connectedSlider.$(this.connectedSlider.fieldTag).noUiSlider('value')[0],
                                    max: this.connectedSlider.$(this.connectedSlider.fieldTag).noUiSlider('value')[1]
                                }, 'down');
                            }
                        }
                        if(this.connectedToSlider) {
                            this.connectedToSlider.$(this.connectedToSlider.fieldTag).noUiSlider('move', {handle: 'lower', to: value.max + 1});
                            if(value.max >= this.connectedToSlider.$(this.connectedToSlider.fieldTag).noUiSlider('value')[1] - 1) {
                                this.connectedToSlider.$(this.connectedToSlider.fieldTag).noUiSlider('move', {handle: 'upper', to: value.max + 2});
                            }
                            if(_.isUndefined(populateEvent) || populateEvent == 'up') {
                                this.connectedToSlider.sliderChangeDelegate.call(this.connectedToSlider, {
                                    min: this.connectedToSlider.$(this.connectedToSlider.fieldTag).noUiSlider('value')[0],
                                    max: this.connectedToSlider.$(this.connectedToSlider.fieldTag).noUiSlider('value')[1]
                                }, 'up');
                            }
                        }
                    };
                }
            }
        }
    },

    /**
     * Provides a way for the last of the slider fields in the view, to set the value for the exclude range.
     *
     * @param {Object} value the range value of the slider
     * @param {string} ranges the selected config range
     * @param {Object} slider the slider
     */
    setExcludeValueForLastSlider: function(value, ranges, slider) {
        var excludeRange = {
                min: 0,
                max: 100
            },
            settingName = ranges + '_ranges',
            setting = _.clone(this.model.get(settingName));

        excludeRange.max = value.min - 1;
        excludeRange.min = slider.def.minRange;
        setting.exclude = excludeRange;
        this.model.set(settingName, setting);
    }
}) },
"config-worksheet-columns": {"controller": /*
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
 * @class View.Views.Base.ForecastsConfigWorksheetColumnsView
 * @alias SUGAR.App.view.layouts.BaseForecastsConfigWorksheetColumnsView
 * @extends View.Views.Base.ConfigPanelView
 */
({
	// Config-worksheet-columns View (base) 

    extendsFrom: 'ConfigPanelView',

    /**
     * Holds the select2 reference to the #wkstColumnSelect element
     */
    wkstColumnsSelect2: undefined,

    /**
     * Holds the default/selected items
     */
    selectedOptions: [],

    /**
     * Holds all items
     */
    allOptions: [],

    /**
     * The field object id/label for likely_case
     */
    likelyFieldObj: {},

    /**
     * The field object id/label for best_case
     */
    bestFieldObj: {},

    /**
     * The field object id/label for worst_case
     */
    worstFieldObj: {},

    /**
     * @inheritdoc
     */
    initialize: function(options) {
        // patch metadata for if opps_view_by is Opportunities, not RLIs
        if (app.metadata.getModule('Opportunities', 'config').opps_view_by === 'Opportunities') {
            _.each(_.first(options.meta.panels).fields, function(field) {
                if (field.label_module && field.label_module === 'RevenueLineItems') {
                    field.label_module = 'Opportunities';
                }
            });
        }

        this._super('initialize', [options]);

        this.allOptions = [];
        this.selectedOptions = [];

        var cfgFields = this.model.get('worksheet_columns'),
            index = 0;

        // set up scenarioOptions
        _.each(this.meta.panels[0].fields, function(field) {
            var obj = {
                    id: field.name,
                    text: app.lang.get(field.label, this._getLabelModule(field.name, field.label_module)),
                    index: index,
                    locked: field.locked || false
                },
                cField = _.find(cfgFields, function(cfgField) {
                    return cfgField == field.name;
                }, this),
                addFieldToFullList = true;

            // save the field objects
            if (field.name == 'best_case') {
                this.bestFieldObj = obj;
                addFieldToFullList = (this.model.get('show_worksheet_best') === 1);
            } else if (field.name == 'likely_case') {
                this.likelyFieldObj = obj;
                addFieldToFullList = (this.model.get('show_worksheet_likely') === 1);
            } else if (field.name == 'worst_case') {
                this.worstFieldObj = obj;
                addFieldToFullList = (this.model.get('show_worksheet_worst') === 1);
            }

            if (addFieldToFullList) {
                this.allOptions.push(obj);
            }

            // If the current field being processed was found in the config fields,
            if (!_.isUndefined(cField)) {
                // push field to defaults
                this.selectedOptions.push(obj);
            }

            index++;
        }, this);
    },

    /**
     * @inheritdoc
     *
     * Empty function as the title values have already been set properly
     * with the change:worksheet_columns event handler
     *
     * @override
     */
    _updateTitleValues: function() {
    },

    /**
     * @inheritdoc
     */
    bindDataChange: function() {
        this.model.on('change:worksheet_columns', function() {
            var arr = [],
                cfgFields = this.model.get('worksheet_columns'),
                metaFields = this.meta.panels[0].fields;

            _.each(metaFields, function(metaField) {
                _.each(cfgFields, function(field) {
                    if (metaField.name == field) {
                        arr.push(
                            app.lang.get(
                                metaField.label,
                                this._getLabelModule(metaField.name, metaField.label_module)
                            )
                        );
                    }
                }, this);
            }, this);
            this.titleSelectedValues = arr.join(', ');

            // Handle truncating the title string and adding "..."
            this.titleSelectedValues = this.titleSelectedValues.slice(0, 50) + '...';

            this.updateTitle();
        }, this);

        // trigger the change event to set the title when this gets added
        this.model.trigger('change:worksheet_columns');

        this.model.on('change:scenarios', function() {
            // check model settings and update select2 options
            if (this.model.get('show_worksheet_best')) {
                this.addOption(this.bestFieldObj);
            } else {
                this.removeOption(this.bestFieldObj);
            }

            if (this.model.get('show_worksheet_likely')) {
                this.addOption(this.likelyFieldObj);
            } else {
                this.removeOption(this.likelyFieldObj);
            }

            if (this.model.get('show_worksheet_worst')) {
                this.addOption(this.worstFieldObj);
            } else {
                this.removeOption(this.worstFieldObj);
            }

            // force render
            this._render();

            // update the model, since a field was added or removed
            var arr = [];
            _.each(this.selectedOptions, function(field) {
                arr.push(field.id);
            }, this);

            this.model.set('worksheet_columns', arr);
        }, this);
    },

    /**
     * Adds a field object to allOptions & selectedOptions if it is not found in those arrays
     *
     * @param {Object} fieldObj
     */
    addOption: function(fieldObj) {
        if (!_.contains(this.allOptions, fieldObj)) {
            this.allOptions.splice(fieldObj.index, 0, fieldObj);
            this.selectedOptions.splice(fieldObj.index, 0, fieldObj);
        }
    },

    /**
     * Removes a field object to allOptions & selectedOptions if it is not found in those arrays
     *
     * @param {Object} fieldObj
     */
    removeOption: function(fieldObj) {
        this.allOptions = _.without(this.allOptions, fieldObj);
        this.selectedOptions = _.without(this.selectedOptions, fieldObj);
    },

    /**
     * @inheritdoc
     */
    _render: function() {
        this._super('_render');

        // handle setting up select2 options
        this.wkstColumnsSelect2 = this.$('#wkstColumnsSelect').select2({
            data: this.allOptions,
            multiple: true,
            containerCssClass: 'select2-choices-pills-close',
            initSelection: _.bind(function(element, callback) {
                callback(this.selectedOptions);
            }, this)
        });
        this.wkstColumnsSelect2.select2('val', this.selectedOptions);

        this.wkstColumnsSelect2.on('change', _.bind(this.handleColumnModelChange, this));
    },

    /**
     * Handles the select2 adding/removing columns
     *
     * @param {Object} evt change event from the select2 selected values
     */
    handleColumnModelChange: function(evt) {
        // did we add something?  if so, lets add it to the selectedOptions
        if (!_.isUndefined(evt.added)) {
            this.selectedOptions.push(evt.added);
        }

        // did we remove something? if so, lets remove it from the selectedOptions
        if (!_.isUndefined(evt.removed)) {
            this.selectedOptions = _.without(this.selectedOptions, evt.removed);
        }

        this.model.set('worksheet_columns', evt.val);
    },

    /**
     * @inheritdoc
     *
     * Remove custom listeners off select2 instances
     */
    _dispose: function() {
        if (this.wkstColumnsSelect2) {
            this.wkstColumnsSelect2.off();
            this.wkstColumnsSelect2.select2('destroy');
            this.wkstColumnsSelect2 = null;
        }
        this._super('_dispose');
    },

    /**
     * Re-usable method to get the module label for the column list
     *
     * @param {String} fieldName The field we are currently looking at
     * @param {String} setModule If the metadata has a module set it will be passed in here
     * @return {string}
     * @private
     */
    _getLabelModule: function(fieldName, setModule) {
        var labelModule = setModule || 'Forecasts';
        if (fieldName === 'parent_name') {
            // when we have the parent_name, pull the label from the module we are forecasting by
            labelModule = this.model.get('forecast_by');
        }

        return labelModule;
    }
}) },
"forecasts-chart": {"controller": /*
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
 * Dashlet that displays a chart
 */
({
	// Forecasts-chart View (base) 

    plugins: ['Dashlet'],

    /**
     * This is the values model for the template
     */
    values: new Backbone.Model(),

    className: 'forecasts-chart-wrapper',

    /**
     * Hold the initOptions if we have to call the Forecast/init end point cause we are not on Forecasts
     */
    initOptions: null,

    /**
     * The context of the ForecastManagerWorksheet Module if one exists
     */
    forecastManagerWorksheetContext: undefined,

    /**
     * The context of the ForecastWorksheet Module if one exists
     */
    forecastWorksheetContext: undefined,

    /**
     * Track if current user is manager.
     */
    isManager: false,
    
    /**
     * @inheritdoc
     */
    initialize: function(options) {
        // after we init, find and bind to the Worksheets Contexts
        this.once('init', this.findWorksheetContexts, this);
        this.once('render', function() {
            this.parseCollectionForData();
        }, this);
        this.isManager = app.user.get('is_manager');
        this._super('initialize', [options]);
        if (!this.meta.config) {
            var ctx = this.context.parent,
                user = ctx.get('selectedUser') || app.user.toJSON(),
                showMgr = ctx.get('model').get('forecastType') == 'Rollup';

            this.values.set({
                user_id: user.id,
                display_manager: showMgr,
                show_target_quota: (user.is_manager && !user.is_top_level_manager),
                ranges: ctx.get('selectedRanges') || ['include'],
                timeperiod_id: ctx.get('selectedTimePeriod'),
                dataset: 'likely',
                group_by: 'forecast',
                no_data: true
            });
        }
    },

    /**
     * Specific code to run after a dashlet Init Code has ran
     */
    initDashlet: function() {
        var fieldOptions,
            cfg = app.metadata.getModule('Forecasts', 'config');
        fieldOptions = app.lang.getAppListStrings(this.dashletConfig.dataset.options);
        this.dashletConfig.dataset.options = {};

        if (cfg.show_worksheet_worst &&
            app.acl.hasAccess('view', 'ForecastWorksheets', app.user.get('id'), 'worst_case')) {
            this.dashletConfig.dataset.options['worst'] = fieldOptions['worst'];
        }

        if (cfg.show_worksheet_likely) {
            this.dashletConfig.dataset.options['likely'] = fieldOptions['likely'];
        }

        if (cfg.show_worksheet_best &&
            app.acl.hasAccess('view', 'ForecastWorksheets', app.user.get('id'), 'best_case')) {
            this.dashletConfig.dataset.options['best'] = fieldOptions['best'];
        }

        // Hide dataset drop-down if there is only one option.
        this.dashletConfig.show_dataset = true;
        if (_.size(this.dashletConfig.dataset.options) <= 1) {
            this.dashletConfig.show_dataset = false;
        }
    },

    /**
     * Loop though the parent context children context to find the worksheet, if they exist
     */
    findWorksheetContexts: function() {
        // loop though the children context looking for the ForecastWorksheet and ForecastManagerWorksheet Modules
        _.filter(this.context.parent.children, function(item) {
            if (item.get('module') == 'ForecastWorksheets') {
                this.forecastWorksheetContext = item;
                return true;
            } else if (item.get('module') == 'ForecastManagerWorksheets') {
                this.forecastManagerWorksheetContext = item;
                return true;
            }
            return false;
        }, this);

        var collection;

        if (this.forecastWorksheetContext) {
            // listen for collection change events
            collection = this.forecastWorksheetContext.get('collection');
            if (collection) {
                collection.on('change', this.repWorksheetChanged, this);
                collection.on('reset', function(collection) {
                    this.parseCollectionForData(collection);
                }, this);
            }
        }

        if (this.forecastManagerWorksheetContext) {
            // listen for collection change events
            collection = this.forecastManagerWorksheetContext.get('collection');
            if (collection) {
                collection.on('change', this.mgrWorksheetChanged, this);
                collection.on('reset', function(collection) {
                    this.parseCollectionForData(collection);
                }, this);
            }
        }
    },

    /**
     * Figure out which way we need to parse a collection
     *
     * @param {Backbone.Collection} [collection]
     */
    parseCollectionForData: function(collection) {
        if (this.meta.config) {
            return;
        }
        // get the field
        var field = this.getField('paretoChart');
        if(field && !field.hasServerData()) {
            // if the field does not have any data, wait for the xhr call to run and then just call this
            // method again
            field.once('chart:pareto:rendered', this.parseCollectionForData, this);
            return;
        }

        if (this.values.get('display_manager')) {
            this.parseManagerWorksheet(collection || this.forecastManagerWorksheetContext.get('collection'));
        } else {
            this.parseRepWorksheet(collection || this.forecastWorksheetContext.get('collection'));
        }
    },

    /**
     * Parses a chart data collection for the Rep worksheet
     *
     * @param {Backbone.Collection} collection
     */
    parseRepWorksheet: function(collection) {
        var field = this.getField('paretoChart');
        if(field) {
            var serverData = field.getServerData();

            serverData.data = collection.map(function(item) {
                var i = {
                    id: item.get('id'),
                    forecast: item.get('commit_stage'),
                    probability: item.get('probability'),
                    sales_stage: item.get('sales_stage'),
                    likely: app.currency.convertWithRate(item.get('likely_case'), item.get('base_rate')),
                    date_closed_timestamp: parseInt(item.get('date_closed_timestamp'))
                };

                if (!_.isUndefined(this.dashletConfig.dataset.options['best'])) {
                    i.best = app.currency.convertWithRate(item.get('best_case'), item.get('base_rate'));
                }
                if (!_.isUndefined(this.dashletConfig.dataset.options['worst'])) {
                    i.worst = app.currency.convertWithRate(item.get('worst_case'), item.get('base_rate'));
                }

                return i;
            }, this);

            field.setServerData(serverData, true);
        }
    },

    /**
     * Parses a chart data collection for the Manager worksheet
     *
     * @param {Backbone.Collection} collection
     */
    parseManagerWorksheet: function(collection) {
        var field = this.getField('paretoChart');
        if(field) {
            var serverData = field.getServerData();

            serverData.data = collection.map(function(item) {
                var i = {
                    id: item.get('id'),
                    user_id: item.get('user_id'),
                    name: item.get('name'),
                    likely: app.currency.convertWithRate(item.get('likely_case'), item.get('base_rate')),
                    likely_adjusted: app.currency.convertWithRate(item.get('likely_case_adjusted'), item.get('base_rate')),
                    quota: app.currency.convertWithRate(item.get('quota'), item.get('base_rate'))
                };

                if (!_.isUndefined(this.dashletConfig.dataset.options['best'])) {
                    i.best = app.currency.convertWithRate(item.get('best_case'), item.get('base_rate'));
                    i.best_adjusted = app.currency.convertWithRate(item.get('best_case_adjusted'), item.get('base_rate'));
                }
                if (!_.isUndefined(this.dashletConfig.dataset.options['worst'])) {
                    i.worst = app.currency.convertWithRate(item.get('worst_case'), item.get('base_rate'));
                    i.worst_adjusted = app.currency.convertWithRate(item.get('worst_case_adjusted'), item.get('base_rate'));
                }

                return i;
            }, this);

            serverData.quota = _.reduce(serverData.data, function(memo, item) {
                return app.math.add(memo, item.quota, undefined, true);
            }, 0);

            field.setServerData(serverData);
        }
    },

    /**
     * Handler for when the Rep Worksheet Changes
     * @param {Object} model
     */
    repWorksheetChanged: function(model) {
        // get what we are currently filtered by
        // find the item in the serverData
        var changed = model.changed,
            changedField = _.keys(changed),
            field = this.getField('paretoChart'),
            serverData = field.getServerData();

        // if the changedField is date_closed, we need to adjust the timestamp as well since SugarLogic doesn't work
        // on list views yet
        if (changedField.length == 1 && changedField[0] == 'date_closed') {
            // convert this into the timestamp
            changedField.push('date_closed_timestamp');
            changed.date_closed_timestamp = Math.round(+app.date.parse(changed.date_closed).getTime() / 1000);
            model.set('date_closed_timestamp', changed.date_closed_timestamp, {silent: true});
        }

        if (_.contains(changedField, 'likely_case')) {
            changed.likely = app.currency.convertWithRate(changed.likely_case, model.get('base_rate'));
            delete changed.likely_case;
        }
        if (_.contains(changedField, 'best_case')) {
            changed.best = app.currency.convertWithRate(changed.best_case, model.get('base_rate'));
            delete changed.best_case;
        }
        if (_.contains(changedField, 'worst_case')) {
            changed.worst = app.currency.convertWithRate(changed.worst_case, model.get('base_rate'));
            delete changed.worst_case;
        }

        if (_.contains(changedField, 'commit_stage')) {
            changed.forecast = changed.commit_stage;
            delete changed.commit_stage;
        }

        _.find(serverData.data, function(record, i, list) {
            if (model.get('id') == record.id) {
                list[i] = _.extend({}, record, changed);
                return true;
            }
            return false;
        });

        field.setServerData(serverData, _.contains(changedField, 'probability'));
    },

    /**
     * Handler for when the Manager Worksheet Changes
     * @param {Object} model
     */
    mgrWorksheetChanged: function(model) {
        var fieldsChanged = _.keys(model.changed),
            changed = model.changed,
            field = this.getField('paretoChart');
        if(field && field.hasServerData()) {
            var serverData = field.getServerData();

            if (_.contains(fieldsChanged, 'quota')) {
                var q = parseInt(serverData.quota, 10);
                q = app.math.add(app.math.sub(q, model.previous('quota')), model.get('quota'));
                serverData.quota = q;
            } else {
                var f = _.first(fieldsChanged),
                    fieldChartName = f.replace('_case', '');

                // find the user
                _.find(serverData.data, function(record, i, list) {
                    if (model.get('user_id') == record.user_id) {
                        list[i][fieldChartName] = changed[f];
                        return true;
                    }
                    return false;
                });
            }

            field.setServerData(serverData);
        }
    },

    /**
     * When loadData is called, find the paretoChart field, if it exist, then have it render the chart
     *
     * @override
     */
    loadData: function(options) {
        var field = this.getField('paretoChart');

        if (!_.isUndefined(field)) {
            field.once('chart:pareto:rendered', this.parseCollectionForData, this);
            field.renderChart(options);
        }
        if (options && _.isFunction(options.complete)) {
            options.complete();
        }
    },

    /**
     * Called after _render
     */
    toggleRepOptionsVisibility: function() {
        this.$('div.groupByOptions').toggleClass('hide', this.values.get('display_manager') === true);
    },

    /**
     * @inheritdoc
     */
    bindDataChange: function() {
        // on the off chance that the init has not run yet.
        var meta = this.meta || this.initOptions.meta;
        if (meta.config) {
            return;
        }

        this.values.on('change:title', function(model, title) {
            this.layout.setTitle(app.lang.get(this.meta.label) + title);
        }, this);

        this.on('render', function() {
            var field = this.getField('paretoChart'),
                dashToolbar = this.layout.getComponent('dashlet-toolbar');

            // if we have a dashlet-toolbar, then make it do the refresh icon while the chart is loading from the
            // server
            if (dashToolbar) {
                field.before('chart:pareto:render', function() {
                    this.$("[data-action=loading]").removeClass(this.cssIconDefault).addClass(this.cssIconRefresh);
                }, dashToolbar);
                field.on('chart:pareto:rendered', function() {
                    this.$("[data-action=loading]").removeClass(this.cssIconRefresh).addClass(this.cssIconDefault);
                }, dashToolbar);
            }
            this.toggleRepOptionsVisibility();
            this.parseCollectionForData();
        }, this);

        var ctx = this.context.parent;

        ctx.on('change:selectedUser', function(context, user) {
            var displayMgr = ctx.get('model').get('forecastType') == 'Rollup',
                showTargetQuota = (displayMgr && !user.is_top_level_manager);
            this.values.set({
                user_id: user.id,
                display_manager: displayMgr,
                show_target_quota: showTargetQuota
            });
            this.toggleRepOptionsVisibility();
        }, this);
        ctx.on('change:selectedTimePeriod', function(context, timePeriod) {
            this.values.set({timeperiod_id: timePeriod});
        }, this);
        ctx.on('change:selectedRanges', function(context, value) {
            this.values.set({ranges: value});
        }, this);
    },

    /**
     * @inheritdoc
     */
    unbindData: function() {
        var ctx = this.context.parent;
        if (ctx) {
            ctx.off(null, null, this);
        }

        if (this.forecastManagerWorksheetContext && this.forecastManagerWorksheetContext.get('collection')) {
            this.forecastManagerWorksheetContext.get('collection').off(null, null, this);
        }

        if (this.forecastWorksheetContext && this.forecastWorksheetContext.get('collection')) {
            this.forecastWorksheetContext.get('collection').off(null, null, this);
        }

        if (this.context) {
            this.context.off(null, null, this);
        }

        if (this.values) {
            this.values.off(null, null, this);
        }

        this._super('unbindData');
    }
}) },
"info": {"controller": /*
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
 * @class View.Views.Base.Forecasts.InfoView
 * @alias SUGAR.App.view.views.BaseForecastsInfoView
 * @extends View.View
 */
({
	// Info View (base) 

    /**
     * Timeperiod model 
     */
    tpModel: undefined,
    
    /**
     * @inheritdoc
     *
     */
    initialize: function(options) {
        if (app.lang.direction === 'rtl') {
            options.template = app.template.getView('info.info-rtl', 'Forecasts');

            // reverse the datapoints
            options.meta.datapoints.reverse();
        }

        this.tpModel = new Backbone.Model();
        this._super("initialize", [options]);
        this.resetSelection(this.context.get("selectedTimePeriod"));
    },
    
    /**
     * @inheritdoc
     *
     */
    bindDataChange: function(){
        this.tpModel.on("change", function(model){
            this.context.trigger(
                'forecasts:timeperiod:changed',
                model,
                this.getField('selectedTimePeriod').tpTooltipMap[model.get('selectedTimePeriod')]);
        }, this);
        
        this.context.on("forecasts:timeperiod:canceled", function(){
            this.resetSelection(this.tpModel.previous("selectedTimePeriod"));
        }, this);
        
    },
    
    /**
     * Sets the timeperiod to the selected timeperiod, used primarily for resetting
     * the dropdown on nav cancel
     */
    resetSelection: function(timeperiod_id){
        this.tpModel.set({selectedTimePeriod:timeperiod_id}, {silent:true});
        _.find(this.fields, function(field){
            if(_.isEqual(field.name, "selectedTimePeriod")){
                field.render();
                return true;
            }
        });
    }
    
}) },
"config-scenarios": {"controller": /*
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
 * @class View.Views.Base.ForecastsConfigScenariosView
 * @alias SUGAR.App.view.layouts.BaseForecastsConfigScenariosView
 * @extends View.Views.Base.ConfigPanelView
 */
({
	// Config-scenarios View (base) 

    extendsFrom: 'ConfigPanelView',

    /**
     * Holds ALL possible different scenarios
     */
    scenarioOptions: [],

    /**
     * Holds the scenario objects that should start selected by default
     */
    selectedOptions: [],

    /**
     * Holds the select2 instance of the default scenario that users cannot change
     */
    defaultSelect2: undefined,

    /**
     * Holds the select2 instance of the options that users can add/remove
     */
    optionsSelect2: undefined,

    /**
     * The default key used for the "Amount" value in forecasts, right now it is "likely" but users will be able to
     * change that in admin to be best or worst
     *
     * todo: eventually this will be moved to config settings where users can select their default forecasted value likely/best/worst
     */
    defaultForecastedAmountKey: 'show_worksheet_likely',

    /**
     * @inheritdoc
     */
    initialize: function(options) {
        this._super('initialize', [options]);

        this.selectedOptions = [];
        this.scenarioOptions = [];

        // set up scenarioOptions
        _.each(this.meta.panels[0].fields, function(field) {
            var obj = {
                id: field.name,
                text: app.lang.get(field.label, 'Forecasts')
            }

            // Check if this field is the one we don't want users to delete
            if(field.name == this.defaultForecastedAmountKey) {
                obj['locked'] = true;
            }

            this.scenarioOptions.push(obj);

            // if this should be selected by default and it is not the undeletable scenario, push it to selectedOptions
            if(this.model.get(field.name) == 1) {
                // push fields that should be selected to selectedOptions
                this.selectedOptions.push(obj);
            }
        }, this);
    },

    /**
     * @inheritdoc
     *
     * Empty function as the title values have already been set properly
     * with the change:scenarios event handler
     *
     * @override
     */
    _updateTitleValues: function() {
    },

    /**
     * @inheritdoc
     */
    bindDataChange: function() {
        this.model.on('change:scenarios', function(model) {
            var arr = [];

            if(model.get('show_worksheet_likely')) {
                arr.push(app.lang.get('LBL_FORECASTS_CONFIG_WORKSHEET_SCENARIOS_LIKELY', 'Forecasts'));
            }
            if(model.get('show_worksheet_best')) {
                arr.push(app.lang.get('LBL_FORECASTS_CONFIG_WORKSHEET_SCENARIOS_BEST', 'Forecasts'));
            }
            if(model.get('show_worksheet_worst')) {
                arr.push(app.lang.get('LBL_FORECASTS_CONFIG_WORKSHEET_SCENARIOS_WORST', 'Forecasts'));
            }

            this.titleSelectedValues = arr.join(', ');

            this.updateTitle();
        }, this);

        // trigger the change event to set the title when this gets added
        this.model.trigger('change:scenarios', this.model);
    },

    /**
     * @inheritdoc
     */
    _render: function() {
        this._super('_render');

        this.$('.select2-container-disabled').width('auto');
        this.$('.select2-search-field').css('display','none');

        // handle setting up select2 options
        var isRTL = app.lang.direction === 'rtl';
        this.optionsSelect2 = this.$('#scenariosSelect').select2({
            data: this.scenarioOptions,
            multiple: true,
            width: "100%",
            containerCssClass: "select2-choices-pills-close",
            escapeMarkup: function(m) {
                return m;
            },
            initSelection : _.bind(function (element, callback) {
                callback(this.selectedOptions);
            }, this)
        });
        this.optionsSelect2.select2('val', this.selectedOptions);

        this.optionsSelect2.on('change', _.bind(this.handleScenarioModelChange, this));
    },

    /**
     * Event handler for the select2 dropdown changing selected items
     *
     * @param {jQuery.Event} evt select2 change event
     */
    handleScenarioModelChange: function(evt) {
        var changedEnabled = [],
            changedDisabled = [],
            allOptions = [];

        // Get the options that changed and set the model
        _.each($(evt.target).val().split(','), function(option) {
            changedEnabled.push(option);
            this.model.set(option, true, {silent: true});
        }, this);

        // Convert all scenario options into a flat array of ids
        _.each(this.scenarioOptions, function(option) {
            allOptions.push(option.id);
        }, this);

        // Take all options and return an array without the ones that changed to true
        changedDisabled = _.difference(allOptions, changedEnabled);

        // Set any options that weren't changed to true to false
        _.each(changedDisabled, function(option) {
            this.model.set(option, false, {silent: true});
        }, this);

        this.model.trigger('change:scenarios', this.model);
    },

    /**
     * Formats pill selections
     *
     * @param {Object} item selected item
     */
    formatCustomSelection: function(item) {
        return '<a class="select2-choice-filter" rel="'+ item.id + '" href="javascript:void(0)">'+ item.text +'</a>';
    },

    /**
     * @inheritdoc
     *
     * Remove custom listeners off select2 instances
     */
    _dispose: function() {
        // remove event listener from select2
        if (this.defaultSelect2) {
            this.defaultSelect2.off();
            this.defaultSelect2.select2('destroy');
            this.defaultSelect2 = null;
        }
        if (this.optionsSelect2) {
            this.optionsSelect2.off();
            this.optionsSelect2.select2('destroy');
            this.optionsSelect2 = null;
        }

        this._super('_dispose');
    }
}) },
"help-dashlet": {"controller": /*
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
	// Help-dashlet View (base) 

    extendsFrom: 'HelpDashletView',

    /**
     * @override
     *
     * We also add the forecast_by module to the context, that we are passing in, so we can have a dynamic name for
     * for when we are using the help dashlet on the forecast module
     */
    getHelpObject: function() {
        var config = app.metadata.getModule('Forecasts', 'config'),
            helpUrl = {
                forecastby_singular_module: app.lang.getModuleName(config.forecast_by),
                forecastby_module: app.lang.getModuleName(config.forecast_by, {plural: true}),
                more_info_url: this.createMoreHelpLink(),
                more_info_url_close: '</a>'
            },
            ctx = this.context && this.context.parent || this.context,
            layout = (this.meta.preview) ? 'preview' : ctx.get('layout');

        this.helpObject = app.help.get(ctx.get('module'), layout, helpUrl);

        // if title is empty for some reason, use the dashlet label as the fallback
        if (_.isEmpty(this.helpObject.title)) {
            this.helpObject.title = app.lang.get(this.meta.label);
        }
    }
}) },
"config-timeperiods": {"controller": /*
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
 * @class View.Views.Base.ForecastsConfigTimeperiodsView
 * @alias SUGAR.App.view.layouts.BaseForecastsConfigTimeperiodsView
 * @extends View.Views.Base.ConfigPanelView
 */
({
	// Config-timeperiods View (base) 

    extendsFrom: 'ConfigPanelView',

    /**
     * Holds the moment.js date object
     * @type Moment
     */
    tpStartDate: undefined,

    /**
     * If the Fiscal Year field is displayed, this holds the reference to the field
     */
    fiscalYearField: undefined,

    /**
     * Holds the timeperiod_fiscal_year metadata so it doesn't render until the view needs it
     */
    fiscalYearMeta: undefined,

    /**
     * @inheritdoc
     */
    initialize: function(options) {
        // remove the fiscal year metadata since we cant use the enabled check
        var fieldsMeta = _.filter(_.first(options.meta.panels).fields, function(field) {
            if(field.name === 'timeperiod_fiscal_year') {
                this.fiscalYearMeta = _.clone(field);
            }
            // return all fields except fiscal year
            return field.name !== 'timeperiod_fiscal_year';
        }, this);

        // put updated fields back into options
        _.first(options.meta.panels).fields = fieldsMeta;

        this._super('initialize', [options]);

        // check if Forecasts is set up, if so, make the timeperiod field readonly
        if(!this.model.get('is_setup')) {
            _.each(fieldsMeta, function(field) {
                if(field.name == 'timeperiod_start_date') {
                    field.click_to_edit = true;
                }
            }, this);
        }

        this.tpStartDate = this.model.get('timeperiod_start_date');
        if (this.tpStartDate) {
            // convert the tpStartDate to a Moment object
            this.tpStartDate = app.date(this.tpStartDate);
        }
    },

    /**
     * @inheritdoc
     * @override
     */
    _updateTitleValues: function() {
        this.titleSelectedValues = (this.tpStartDate) ? this.tpStartDate.formatUser(true) : '';
    },

    /**
     * Checks the timeperiod start date to see if it's 01/01 to know
     * if we need to display the Fiscal Year field or not
     */
    checkFiscalYearField: function() {
        // moment.js months are zero-based: 0 = January
        if (this.tpStartDate.month() !== 0 ||
            (this.tpStartDate.month() === 0 && this.tpStartDate.date() !== 1)) {
            // if the start date's month isn't Jan,
            // or it IS Jan but a date other than the 1st, add the field
            this.addFiscalYearField();
        } else if(this.fiscalYearField) {
            this.model.set({
                timeperiod_fiscal_year: null
            });
            this.removeFiscalYearField();
        }
    },

    /**
     * @inheritdoc
     */
    bindDataChange: function() {
        if(this.model) {
            this.model.once('change', function(model) {
                // on a fresh install with no demo data,
                // this.model has the values and the param model is undefined
                if(_.isUndefined(model)) {
                    model = this.model;
                }
            }, this);

            this.model.on('change:timeperiod_start_date', function(model) {
                this.tpStartDate = app.date(model.get('timeperiod_start_date'));
                this.checkFiscalYearField();
                this.titleSelectedValues = this.tpStartDate.formatUser(true);
                this.updateTitle();
            }, this);
        }
    },

    /**
     * Creates the fiscal-year field and adds it to the DOM
     */
    addFiscalYearField: function() {
        if(!this.fiscalYearField) {
            // set the value so the fiscal-year field chooses its first option
            // in the dropdown
            this.model.set({
                timeperiod_fiscal_year: 'current_year'
            });

            var $el = this.$('#timeperiod_start_date_subfield');
            if ($el) {
                var fiscalYearFieldMeta = this.updateFieldMetadata(this.fiscalYearMeta),
                    fieldSettings = {
                        view: this,
                        def: fiscalYearFieldMeta,
                        viewName: 'edit',
                        context: this.context,
                        module: this.module,
                        model: this.model,
                        meta: app.metadata.getField('enum')
                    };

                this.fiscalYearField = app.view.createField(fieldSettings);

                $el.html(this.fiscalYearField.el);
                this.fiscalYearField.render();
            }
        }
    },

    /**
     * Takes the default fiscal-year metadata and adds any dynamic values
     * Done in function form in case this field ever needs to be extended with
     * more than just 2 years
     *
     * @param {Object} fieldMeta The field's metadata
     * @returns {Object}
     */
    updateFieldMetadata: function(fieldMeta) {
        fieldMeta.startYear = this.tpStartDate.year();
        return fieldMeta;
    },

    /**
     * Disposes the fiscal-year field and removes it from the DOM
     */
    removeFiscalYearField: function() {
        this.model.set({
            timeperiod_fiscal_year: null
        });
        this.fiscalYearField.dispose();
        this.fiscalYearField = null;
        this.$('#timeperiod_start_date_subfield').html('')
    },

    /**
     * @inheritdoc
     *
     * Sets up a binding to the start month dropdown to populate the day drop down on change
     *
     * @param {View.Field} field
     * @private
     */
    _renderField: function(field) {
        field = this._setUpTimeperiodConfigField(field);

        // check for all fields, if forecast is setup, set to detail/readonly mode
        if(this.model.get('is_setup')) {
            field.options.def.view = 'detail';
        } else if(field.name == 'timeperiod_start_date') {
            // if this is the timeperiod_start_date field and Forecasts is not setup
            field.options.def.click_to_edit = true;
        }

        this._super('_renderField', [field]);

        if (field.name == 'timeperiod_start_date') {
            if (this.model.get('is_setup')) {
                var year = this.model.get('timeperiod_start_date').substring(0, 4),
                    str,
                    $el;

                if (this.model.get('timeperiod_fiscal_year') === 'next_year') {
                    year++;
                }

                str = app.lang.get('LBL_FISCAL_YEAR', 'Forecasts') + ': ' + year;
                $el = this.$('#timeperiod_start_date_sublabel');
                if ($el) {
                    $el.html(str);
                }
            } else {
                this.tpStartDate = app.date(this.model.get('timeperiod_start_date'));
                this.checkFiscalYearField();
            }
        }
    },

    /**
     * Sets up the fields with the handlers needed to properly get and set their values for the timeperiods config view.
     *
     * @param {View.Field} field the field to be setup for this config view.
     * @return {*} field that has been properly setup and augmented to function for this config view.
     * @private
     */
    _setUpTimeperiodConfigField: function(field) {
        switch(field.name) {
            case "timeperiod_shown_forward":
            case "timeperiod_shown_backward":
                return this._setUpTimeperiodShowField(field);
            case "timeperiod_interval":
                return this._setUpTimeperiodIntervalBind(field);
            default:
                return field;
        }
    },

    /**
     * Sets up the timeperiod_shown_forward and timeperiod_shown_backward dropdowns to set the model and values properly
     *
     * @param {View.Field} field The field being set up.
     * @return {*} The configured field.
     * @private
     */
    _setUpTimeperiodShowField: function (field) {
        // ensure Date object gets an additional function
        field.events = _.extend({"change input":  "_updateSelection"}, field.events);
        field.bindDomChange = function() {};

        field._updateSelection = function(event) {
            var value =  $(event.currentTarget).val();
            this.def.value = value;
            this.model.set(this.name, value);
        };

        // force value to a string so hbs has helper will match the dropdown correctly
        this.model.set(field.name, this.model.get(field.name).toString(), {silent: true});

        field.def.value = this.model.get(field.name) || 1;
        return field;
    },

    /**
     * Sets up the change event on the timeperiod_interval drop down to maintain the interval selection
     * and push in the default selection for the leaf period
     *
     * @param {View.Field} field the dropdown interval field
     * @return {*}
     * @private
     */
    _setUpTimeperiodIntervalBind: function(field) {
        field.def.value = this.model.get(field.name);

        // ensure selected day functions like it should
        field.events = _.extend({"change input":  "_updateIntervals"}, field.events);
        field.bindDomChange = function() {};

        if(typeof(field.def.options) == 'string') {
            field.def.options = app.lang.getAppListStrings(field.def.options);
        }

        /**
         * function that updates the selected interval
         * @param event
         * @private
         */
        field._updateIntervals = function(event) {
            //get the timeperiod interval selector
            var selected_interval = $(event.currentTarget).val();
            this.def.value = selected_interval;
            this.model.set(this.name, selected_interval);
            this.model.set('timeperiod_leaf_interval', selected_interval == 'Annual' ? 'Quarter' : 'Month');
        }

        return field;
    }
}) },
"preview": {"controller": /*
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
 * @class View.Views.Base.Forecasts.PreviewView
 * @alias SUGAR.App.view.views.BaseForecastsPreviewView
 * @extends View.Views.Base.PreviewView
 */
({
	// Preview View (base) 

    extendsFrom: 'PreviewView',

    /**
     * Track the original model passed in from the worksheet, this is needed becuase of how the base preview works
     */
    originalModel: undefined,

    /**
     * @inheritdoc
     */
    closePreview: function() {
        this.originalModel = undefined;
        this._super("closePreview");
    },

    /**
     * Override _renderPreview to pull in the parent_type and parent_id when we are running a fetch
     *
     * @param model
     * @param collection
     * @param fetch
     * @param previewId
     * @param dontClose overrides triggering preview:close
     * @private
     */
    _renderPreview: function(model, collection, fetch, previewId, dontClose){
        var self = this;
        dontClose = dontClose || false;

        // If there are drawers there could be multiple previews, make sure we are only rendering preview for active drawer
        if(app.drawer && !app.drawer.isActive(this.$el)){
            return;  //This preview isn't on the active layout
        }

        // Close preview if we are already displaying this model
        if(!dontClose && this.originalModel && model && (this.originalModel.get("id") == model.get("id") && previewId == this.previewId)) {
            // Remove the decoration of the highlighted row
            app.events.trigger("list:preview:decorate", false);
            // Close the preview panel
            app.events.trigger('preview:close');
            return;
        }

        if (model) {
            // Get the corresponding detail view meta for said module.
            // this.meta needs to be set before this.getFieldNames is executed.
            this.meta = app.metadata.getView(model.get('parent_type') || model.get('_module'), 'record') || {};
            this.meta = this._previewifyMetadata(this.meta);
        }

        if (fetch) {
            var mdl = app.data.createBean(model.get('parent_type'), {'id' : model.get('parent_id')});
            this.originalModel = model;
            mdl.fetch({
                //Show alerts for this request
                showAlerts: true,
                success: function(model) {
                    self.renderPreview(model, collection);
                }
            });
        } else {
            this.renderPreview(model, collection);
        }

        this.previewId = previewId;
    },

    /**
     * Show previous and next buttons groups on the view.
     *
     * This gets called everytime the collection gets updated. It also depends
     * if we have a current model or layout.
     *
     * TODO we should check if we have the preview open instead of doing a bunch
     * of if statements.
     */
    showPreviousNextBtnGroup: function () {
        if (!this.model || !this.layout || !this.collection) {
            return;
        }
        var collection = this.collection;
        if (!collection.size()) {
            this.layout.hideNextPrevious = true;
        }
        // use the originalModel if one is defined, if not fall back to the basic model
        var model = this.originalModel || this.model;
        var recordIndex = collection.indexOf(collection.get(model.id));
        this.layout.previous = collection.models[recordIndex-1] ? collection.models[recordIndex-1] : undefined;
        this.layout.next = collection.models[recordIndex+1] ? collection.models[recordIndex+1] : undefined;
        this.layout.hideNextPrevious = _.isUndefined(this.layout.previous) && _.isUndefined(this.layout.next);

        // Need to rerender the preview header
        this.layout.trigger("preview:pagination:update");
    },

    /**
     * Renders the preview dialog with the data from the current model and collection
     * @param model Model for the object to preview
     * @param newCollection Collection of related objects to the current model
     */
    renderPreview: function(model, newCollection) {
        if(newCollection) {
            this.collection.reset(newCollection.models);
        }

        if (model) {
            this.model = app.data.createBean(model.module, model.toJSON());
            this.render();

            // TODO: Remove when pagination on activity streams is fixed.
            if (this.previewModule && this.previewModule === "Activities") {
                this.layout.hideNextPrevious = true;
                this.layout.trigger("preview:pagination:update");
            }
            // Open the preview panel
            app.events.trigger("preview:open",this);
            // Highlight the row
            // use the original model when going to the list:preview:decorate event
            app.events.trigger("list:preview:decorate", this.originalModel, this);
        }
    },

    /**
     * Switches preview to left/right model in collection.
     * @param {String} data direction Direction that we are switching to, either 'left' or 'right'.
     * @param index Optional current index in list
     * @param id Optional
     * @param module Optional
     */
    switchPreview: function(data, index, id, module) {
        var self = this,
            currModule = module || this.model.module,
            currID = id || this.model.get("postId") || this.model.get("id"),
            // use the originalModel vs the model
            currIndex = index || _.indexOf(this.collection.models, this.collection.get(this.originalModel.get('id')));

        if( this.switching || this.collection.models.length < 2) {
            // We're currently switching previews or we don't have enough models, so ignore any pagination click events.
            return;
        }
        this.switching = true;
        // get the parent_id from the specific module
        if( data.direction === "left" && (currID === _.first(this.collection.models).get("parent_id")) ||
            data.direction === "right" && (currID === _.last(this.collection.models).get("parent_id")) ) {
            this.switching = false;
            return;
        }
        else {
            // We can increment/decrement
            data.direction === "left" ? currIndex -= 1 : currIndex += 1;

            // If there is no target_id, we don't have access to that activity record
            // The other condition ensures we're previewing from activity stream items.
            if( _.isUndefined(this.collection.models[currIndex].get("target_id")) &&
                this.collection.models[currIndex].get("activity_data") ) {

                currID = this.collection.models[currIndex].id;
                this.switching = false;
                this.switchPreview(data, currIndex, currID, currModule);
            } else {
                var targetModule = this.collection.models[currIndex].get("target_module") || currModule;

                this.model = app.data.createBean(targetModule);

                if( _.isUndefined(this.collection.models[currIndex].get("target_id")) ) {
                    // get the parent_id
                    this.model.set("id", this.collection.models[currIndex].get("parent_id"));
                } else {
                    this.model.set("postId", this.collection.models[currIndex].get("id"));
                    this.model.set("id", this.collection.models[currIndex].get("target_id"));
                }
                this.originalModel = this.collection.models[currIndex];
                this.model.fetch({
                    //Show alerts for this request
                    showAlerts: true,
                    success: function(model) {
                        model.set("_module", targetModule);
                        self.model = null;
                        //Reset the preview
                        app.events.trigger("preview:render", model, null, false);
                        self.switching = false;
                    }
                });
            }
        }
    }
}) },
"config-forecast-by": {"controller": /*
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
 * @class View.Views.Base.ForecastsConfigForecastByView
 * @alias SUGAR.App.view.layouts.BaseForecastsConfigForecastByView
 * @extends View.Views.Base.ConfigPanelView
 */
({
	// Config-forecast-by View (base) 

    extendsFrom: 'ConfigPanelView',

    /**
     * @inheritdoc
     * @override
     */
    _updateTitleValues: function() {
        this.titleSelectedValues = this.model.get('forecast_by');
    }
}) },
"forecast-pipeline": {"controller": /*
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
	// Forecast-pipeline View (base) 

    results: {},
    chart: {},
    plugins: ['Dashlet', 'Chart', 'Tooltip'],

    /**
     * Is the forecast Module setup??
     */
    forecastSetup: 0,

    /**
     * Holds the forecast isn't set up message if Forecasts hasn't been set up yet
     */
    forecastsNotSetUpMsg: undefined,

    /**
     * Track if current user is manager.
     */
    isManager: false,

    /**
     * @inheritdoc
     */
    initialize: function(options) {
        this.isManager = app.user.get('is_manager');
        this._initPlugins();
        this._super('initialize', [options]);

        // check to make sure that forecast is configured
        this.forecastSetup = app.metadata.getModule('Forecasts', 'config').is_setup;
    },

    /**
     * @inheritdoc
     */
    initDashlet: function(view) {
        var userCurrency = app.metadata.getCurrency(app.user.getPreference('currency_id'));
        var userConversionRate = (userCurrency ? (1 / userCurrency.conversion_rate) : 1);
        var userCurrencyPreference = app.user.getPreference('currency_id');
        var salesStageLabels = app.lang.getAppListStrings('sales_stage_dom');

        function formatValue(d, precision) {
            return app.currency.formatAmountLocale(app.currency.convertWithRate(d, userConversionRate), userCurrencyPreference, precision);
        }

        if (!this.isManager && this.meta.config) {
            // FIXME: Dashlet's config page is rendered from meta.panels directly.
            // See the "dashletconfiguration-edit.hbs" file.
            this.meta.panels = _.chain(this.meta.panels).filter(function(panel) {
                panel.fields = _.without(panel.fields, _.findWhere(panel.fields, {name: 'visibility'}));
                return panel;
            }).value();
        }
        // get the current timeperiod
        if (this.forecastSetup) {
            app.api.call('GET', app.api.buildURL('TimePeriods/current'), null, {
                success: _.bind(function(currentTP) {
                    this.settings.set({'selectedTimePeriod': currentTP.id}, {silent: true});
                    this.layout.loadData();
                }, this),
                error: _.bind(function() {
                    // Needed to catch the 404 in case there isnt a current timeperiod
                }, this),
                complete: view.options ? view.options.complete : null
            });
        } else {
            this.settings.set({'selectedTimePeriod': 'current'}, {silent: true});
        }
        this.chart = nv.models.funnelChart()
            .showTitle(false)
            .tooltips(true)
            .margin({top: 0})
            .direction(app.lang.direction)
            .tooltipContent(function(key, x, y, e, graph) {
                return '<p>' + SUGAR.App.lang.get('LBL_SALES_STAGE', 'Forecasts') + ': <b>' + ((salesStageLabels && salesStageLabels[key]) ? salesStageLabels[key] : key) + '</b></p>' +
                    '<p>' + SUGAR.App.lang.get('LBL_AMOUNT', 'Forecasts') + ': <b>' + formatValue(y) + '</b></p>' +
                    '<p>' + SUGAR.App.lang.get('LBL_PERCENT', 'Forecasts') + ': <b>' + x + '%</b></p>';
            })
            .colorData('class', {step: 2})
            .fmtValueLabel(function(d) {
                var y = d.value || (isNaN(d) ? 0 : d);
                return formatValue(y, 0);
            })
            .strings({
                legend: {
                    close: app.lang.get('LBL_CHART_LEGEND_CLOSE'),
                    open: app.lang.get('LBL_CHART_LEGEND_OPEN')
                },
                noData: app.lang.get('LBL_CHART_NO_DATA')
            });
    },


    /**
     * Initialize plugins.
     * Only manager can toggle visibility.
     *
     * @return {View.Views.BaseForecastPipeline} Instance of this view.
     * @protected
     */
    _initPlugins: function() {
        if (this.isManager) {
            this.plugins = _.union(this.plugins, [
                'ToggleVisibility'
            ]);
        }
        return this;
    },

    /**
     * @inheritdoc
     */
    bindDataChange: function() {
        this.settings.on('change', function(model) {
            // reload the chart
            if (this.$el && this.$el.is(':visible')) {
                this.loadData({});
            }
        }, this);
    },

    /**
     * Generic method to render chart with check for visibility and data.
     * Called by _renderHtml and loadData.
     */
    renderChart: function() {
        if (!this.isChartReady()) {
            return;
        }
        // Clear out the current chart before a re-render
        this.$('svg#' + this.cid).children().remove();

        d3.select('svg#' + this.cid)
            .datum(this.results)
            .transition().duration(500)
            .call(this.chart);

        this.chart_loaded = _.isFunction(this.chart.update);
        this.displayNoData(!this.chart_loaded);
    },

    hasChartData: function() {
        return !_.isEmpty(this.results) && this.results.data && this.results.data.length > 0;
    },

    /**
     * @inheritdoc
     */
    loadData: function(options) {
        var timeperiod = this.settings.get('selectedTimePeriod');
        if (timeperiod) {
            var forecastBy = app.metadata.getModule('Forecasts', 'config').forecast_by || 'Opportunities',
                url_base = forecastBy + '/chart/pipeline/' + timeperiod + '/';

            if (this.isManager) {
                url_base += this.getVisibility() + '/';
            }
            var url = app.api.buildURL(url_base);
            app.api.call('GET', url, null, {
                success: _.bind(function(o) {
                    if (o && o.data) {
                        var salesStageLabels = app.lang.getAppListStrings('sales_stage_dom');

                        // update sales stage labels to translated strings
                        _.each(o.data, function(dataBlock) {
                            if (dataBlock && dataBlock.key && salesStageLabels && salesStageLabels[dataBlock.key]) {
                                dataBlock.key = salesStageLabels[dataBlock.key];
                            }

                        });
                    }
                    this.results = {};
                    this.results = o;
                    this.renderChart();
                }, this),
                error: _.bind(function(o) {
                    this.results = {};
                    this.renderChart();
                }, this),
                complete: options ? options.complete : null
            });
        }
    },

    /**
     * @inheritdoc
     */
    unbind: function() {
        this.settings.off('change');
        this._super('unbind');
    }
}) },
"list-headerpane": {"controller": /*
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
 * @class View.Views.Base.ForecastsListHeaderpaneView
 * @alias SUGAR.App.view.layouts.BaseForecastsListHeaderpaneView
 * @extends View.Views.Base.ListHeaderpaneView
 */
({
	// List-headerpane View (base) 

    extendsFrom: 'HeaderpaneView',

    plugins: ['FieldErrorCollection'],

    /**
     * If the Save button should be disabled or not
     * @type Boolean
     */
    saveBtnDisabled: true,

    /**
     * If the Commit button should be disabled or not
     * @type Boolean
     */
    commitBtnDisabled: true,

    /**
     * If any fields in the view have errors or not
     * @type Boolean
     */
    fieldHasErrorState: false,

    /**
     * The Save Draft Button Field
     * @type View.Fields.Base.ButtonField
     */
    saveDraftBtnField: undefined,

    /**
     * The Commit Button Field
     * @type View.Fields.Base.ButtonField
     */
    commitBtnField: undefined,

    /**
     * If Forecasts' data sync is complete and we can render buttons
     * @type Boolean
     */
    forecastSyncComplete: false,

    /**
     * @inheritdoc
     */
    bindDataChange: function() {
        this.layout.context.on('forecasts:sync:start', function() {
            this.forecastSyncComplete = false;
            this.setButtonStates();
        }, this);
        this.layout.context.on('forecasts:sync:complete', function() {
            this.forecastSyncComplete = true;
            this.setButtonStates();
        }, this);

        this.on('render', function() {
            // switching from mgr to rep leaves $el null, so make sure we grab a fresh reference
            // to the field if it's there but $el is null in the current reference
            if (!this.saveDraftBtnField || (this.saveDraftBtnField && _.isNull(this.saveDraftBtnField.$el))) {
                // get reference to the Save Draft button Field
                this.saveDraftBtnField = this.getField('save_draft_button');
            }
            if (!this.commitBtnField || (this.commitBtnField && _.isNull(this.commitBtnField.$el))) {
                // get reference to the Commit button Field
                this.commitBtnField = this.getField('commit_button');
            }

            this.saveDraftBtnField.setDisabled();
            this.commitBtnField.setDisabled();
        }, this);

        this.context.on('change:selectedUser', function(model, changed) {
            this._title = changed.full_name;
            if (!this.disposed) {
                this.render();
            }
        }, this);

        this.context.on('plugin:fieldErrorCollection:hasFieldErrors', function(collection, hasErrors) {
            if(this.fieldHasErrorState !== hasErrors) {
                this.fieldHasErrorState = hasErrors;
                this.setButtonStates();
            }
        }, this)

        this.context.on('button:print_button:click', function() {
            window.print();
        }, this);

        this.context.on('forecasts:worksheet:is_dirty', function(worksheet_type, is_dirty) {
            is_dirty = !is_dirty;
            if (this.saveBtnDisabled !== is_dirty || this.commitBtnDisabled !== is_dirty) {
                this.saveBtnDisabled = is_dirty;
                this.commitBtnDisabled = is_dirty;
                this.setButtonStates();
            }
        }, this);

        this.context.on('button:commit_button:click button:save_draft_button:click', function() {
            if (!this.saveBtnDisabled || !this.commitBtnDisabled) {
                this.saveBtnDisabled = true;
                this.commitBtnDisabled = true;
                this.setButtonStates();
            }
        }, this);

        this.context.on('forecasts:worksheet:saved', function(totalSaved, worksheet_type, wasDraft) {
            if(wasDraft === true && this.commitBtnDisabled) {
                this.commitBtnDisabled = false;
                this.setButtonStates();
            }
        }, this);

        this.context.on('forecasts:worksheet:needs_commit', function(worksheet_type) {
            if (this.commitBtnDisabled) {
                this.commitBtnDisabled = false;
                this.setButtonStates();
            }
        }, this);

        this._super('bindDataChange');
    },

    /**
     * Sets the Save Button and Commit Button to enabled or disabled
     */
    setButtonStates: function() {
        // make sure all data sync has finished before updating button states
        if(this.forecastSyncComplete) {
            // fieldHasErrorState trumps the disabled flags, but when it's cleared
            // revert back to whatever states the buttons were in
            if (this.fieldHasErrorState) {
                this.saveDraftBtnField.setDisabled(true);
                this.commitBtnField.setDisabled(true);
                this.commitBtnField.$('.commit-button').tooltip();
            } else {
                this.saveDraftBtnField.setDisabled(this.saveBtnDisabled);
                this.commitBtnField.setDisabled(this.commitBtnDisabled);

                if (!this.commitBtnDisabled) {
                    this.commitBtnField.$('.commit-button').tooltip('destroy');
                } else {
                    this.commitBtnField.$('.commit-button').tooltip();
                }
            }
        } else {
            // disable buttons while syncing
            if(this.saveDraftBtnField) {
                this.saveDraftBtnField.setDisabled(true);
            }
            if(this.commitBtnField) {
                this.commitBtnField.setDisabled(true);
            }
        }
    },

    /**
     * @inheritdoc
     */
    _renderHtml: function() {
        if(!this._title) {
            var user = this.context.get('selectedUser') || app.user.toJSON();
            this._title = user.full_name;
        }

        this._super('_renderHtml');
    },

    /**
     * @inheritdoc
     */
    _dispose: function() {
        if(this.layout.context) {
            this.layout.context.off('forecasts:sync:start', null, this);
            this.layout.context.off('forecasts:sync:complete', null, this);
        }
        this._super('_dispose');
    }
}) },
"config-header-buttons": {"controller": /*
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
 * @class View.Views.Base.ForecastsConfigHeaderButtonsView
 * @alias SUGAR.App.view.layouts.BaseForecastsConfigHeaderButtonsView
 * @extends View.Views.Base.ConfigHeaderButtonsView
 */
({
	// Config-header-buttons View (base) 

    extendsFrom: 'ConfigHeaderButtonsView',

    /**
     * @inheritdoc
     * @override
     */
    _beforeSaveConfig: function() {
        var ctxModel = this.context.get('model');

        // Set config settings before saving
        ctxModel.set({
            is_setup:true,
            show_forecasts_commit_warnings: true
        });

        // update the commit_stages_included property and
        // remove 'include_in_totals' from the ranges so it doesn't get saved
        if(ctxModel.get('forecast_ranges') == 'show_custom_buckets') {
            var ranges = ctxModel.get('show_custom_buckets_ranges'),
                labels = ctxModel.get('show_custom_buckets_options'),
                commitStages = [],
                finalLabels = [];

            ctxModel.unset('commit_stages_included');
            _.each(ranges, function(range, key) {
                if(range.in_included_total) {
                    commitStages.push(key)
                }
                delete range.in_included_total;

                finalLabels.push([key, labels[key]]);
            }, this);

            ctxModel.set({
                commit_stages_included: commitStages,
                show_custom_buckets_ranges: ranges,
                show_custom_buckets_options: finalLabels
            }, {silent: true});
        }
    },

    /**
     * @inheritdoc
     */
    cancelConfig: function() {
        if (app.metadata.getModule('Forecasts', 'config').is_setup) {
            return this._super('cancelConfig');
        }
        if (this.triggerBefore('cancel')) {
            if (app.drawer.count()) {
                app.drawer.close(this.context, this.context.get('model'));
            }
            // Redirect to Admin panel if Forecasts has not been set up
            app.router.navigate('#Administration', {trigger: true});
        }
    },


    /**
     * @inheritdoc
     */
    _saveConfig: function() {
        this.context.get('model').save({}, {
            // getting the fresh model with correct config settings passed in as the param
            success: _.bind(function(model) {
                // If we're inside a drawer and Forecasts is setup and this isn't the first time, otherwise refresh
                if (app.drawer.count()) {
                    this.showSavedConfirmation();
                    // close the drawer and return to Forecasts
                    app.drawer.close(this.context, this.context.get('model'));
                    // Forecasts requires a refresh, always, so we force it
                    Backbone.history.loadUrl(app.api.buildURL(this.module));
                }
            }, this),
            error: _.bind(function() {
                this.getField('save_button').setDisabled(false);
            }, this)
        });
    }
}) }
}}
,
"layouts": {
"base": {
"config-drawer-content": {"controller": /*
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
 * @class View.Layouts.Base.ForecastsConfigDrawerContentLayout
 * @alias SUGAR.App.view.layouts.BaseForecastsConfigDrawerContentLayout
 * @extends View.Layouts.Base.ConfigDrawerContentLayout
 */
({
	// Config-drawer-content Layout (base) 

    extendsFrom: 'ConfigDrawerContentLayout',

    timeperiodsTitle: undefined,
    timeperiodsText: undefined,
    scenariosTitle: undefined,
    scenariosText: undefined,
    rangesTitle: undefined,
    rangesText: undefined,
    forecastByTitle: undefined,
    forecastByText: undefined,
    wkstColumnsTitle: undefined,
    wkstColumnsText: undefined,

    /**
     * @inheritdoc
     * @override
     */
    _initHowTo: function() {
        var appLang = app.lang,
            forecastBy = app.metadata.getModule('Forecasts', 'config').forecast_by,
            forecastByLabels = {
                forecastByModule: appLang.getAppListStrings('moduleList')[forecastBy],
                forecastByModuleSingular: appLang.getAppListStrings('moduleListSingular')[forecastBy]
            };

        this.timeperiodsTitle = appLang.get('LBL_FORECASTS_CONFIG_TITLE_TIMEPERIODS', 'Forecasts');
        this.timeperiodsText = appLang.get('LBL_FORECASTS_CONFIG_HELP_TIMEPERIODS', 'Forecasts');
        this.scenariosTitle = appLang.get('LBL_FORECASTS_CONFIG_TITLE_SCENARIOS', 'Forecasts');
        this.scenariosText = appLang.get('LBL_FORECASTS_CONFIG_HELP_SCENARIOS', 'Forecasts', forecastByLabels);
        this.rangesTitle = appLang.get('LBL_FORECASTS_CONFIG_TITLE_RANGES', 'Forecasts');
        this.rangesText = appLang.get('LBL_FORECASTS_CONFIG_HELP_RANGES', 'Forecasts', forecastByLabels);
        this.forecastByTitle = appLang.get('LBL_FORECASTS_CONFIG_HOWTO_TITLE_FORECAST_BY', 'Forecasts');
        this.forecastByText = appLang.get('LBL_FORECASTS_CONFIG_HELP_FORECAST_BY', 'Forecasts');
        this.wkstColumnsTitle = appLang.get('LBL_FORECASTS_CONFIG_TITLE_WORKSHEET_COLUMNS', 'Forecasts');
        this.wkstColumnsText = appLang.get('LBL_FORECASTS_CONFIG_HELP_WORKSHEET_COLUMNS', 'Forecasts');
    },

    /**
     * @inheritdoc
     * @override
     */
    _switchHowToData: function(helpId) {
        switch(helpId) {
            case 'config-timeperiods':
                this.currentHowToData.title = this.timeperiodsTitle;
                this.currentHowToData.text = this.timeperiodsText;
                break;

            case 'config-ranges':
                this.currentHowToData.title = this.rangesTitle;
                this.currentHowToData.text = this.rangesText;
                break;

            case 'config-scenarios':
                this.currentHowToData.title = this.scenariosTitle;
                this.currentHowToData.text = this.scenariosText;
                break;

            case 'config-forecast-by':
                this.currentHowToData.title = this.forecastByTitle;
                this.currentHowToData.text = this.forecastByText;
                break;

            case 'config-worksheet-columns':
                this.currentHowToData.title = this.wkstColumnsTitle;
                this.currentHowToData.text = this.wkstColumnsText;
                break;
        }
    }
}) },
"records": {"controller": /*
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
 * Forecasts Records Layout
 *
 * @class View.Layouts.Base.Forecasts.RecordsLayout
 * @alias SUGAR.App.view.layouts.BaseForecastsRecordsLayout
 * @extends View.Layouts.Base.RecordsLayout
 *
 * Events
 *
 * forecasts:worksheet:committed
 *  on: this.context
 *  by: commitForecast
 *  when: after a successful Forecast Commit
 */
({
	// Records Layout (base) 

    /**
     * bool to store if a child worksheet is dirty
     */
    isDirty: false,
    
    /**
     * worksheet type
     */
    worksheetType: '',
    
    /**
     * the forecast navigation message
     */
    navigationMessage: "",
    
    /**
     * The options from the initialize call
     */
    initOptions: undefined,

    /**
     * Overrides the Layout.initialize function and does not call the parent so we can defer initialization
     * until _onceInitSelectedUser is called
     *
     * @override
     */
    initialize: function(options) {
        // the parent is not called here so we make sure that nothing else renders until after we init the
        // the forecast module
        this.initOptions = options;

        var acls = app.user.getAcls().Forecasts,
            hasAccess = (!_.has(acls, 'access') || acls.access == 'yes');
        if (hasAccess) {
            // check the module we are forecasting by for access
            var forecastByAcl = app.user.getAcls()[app.metadata.getModule('Forecasts', 'config').forecast_by] || {};
            if (_.has(forecastByAcl, 'access') && forecastByAcl.access === 'no') {
                // the user doesn't have access to what is being forecast by
                this.codeBlockForecasts('LBL_FORECASTS_ACLS_NO_ACCESS_TITLE', 'LBL_FORECASTS_RECORDS_ACLS_NO_ACCESS_MSG');
            } else {
                // Check to make sure users have proper values in their sales_stage_won/_lost cfg values
                if (app.utils.checkForecastConfig()) {
                    // correct config exists, continue with syncInitData
                    this.syncInitData();
                } else {
                    // codeblock this sucka
                    this.codeBlockForecasts('LBL_FORECASTS_MISSING_STAGE_TITLE', 'LBL_FORECASTS_MISSING_SALES_STAGE_VALUES');
                }
            }
        } else {
            this.codeBlockForecasts('LBL_FORECASTS_ACLS_NO_ACCESS_TITLE', 'LBL_FORECASTS_ACLS_NO_ACCESS_MSG');
        }
    },

    /**
     * @override
     */
    initComponents: function() {
    },

    /**
     * Blocks forecasts from continuing to load
     */
    codeBlockForecasts: function(title, msg) {
        var alert = app.alert.show('no_access_to_forecasts', {
            level: 'error',
            title: app.lang.get(title, 'Forecasts') + ':',
            messages: [app.lang.get(msg, 'Forecasts')]
        });

        var $close = alert.getCloseSelector();
        $close.on('click', function() {
            $close.off();
            app.router.navigate('#Home', {trigger: true});
        });
        app.accessibility.run($close, 'click');
    },

    /**
     * Overrides loadData to defer it running until we call it in _onceInitSelectedUser
     *
     * @override
     */
    loadData: function() {
    },

    /**
     * @inheritdoc
     */
    bindDataChange: function() {
        // we need this here to track when the selectedTimeperiod changes and then also move it up to the context
        // so the recordlists can listen for it.
        if (!_.isUndefined(this.model)) {
            this.collection.on('reset', function() {
                // get the first model and set the last commit date
                var lastCommit = _.first(this.collection.models);
                var commitDate = undefined;
                if (lastCommit instanceof Backbone.Model && lastCommit.has('date_modified')) {
                    commitDate = lastCommit.get('date_modified');
                }
                this.context.set({'currentForecastCommitDate': commitDate});
            }, this);
            // since the selected user change on the context, update the model
            this.context.on('change:selectedUser', function(model, changed) {
                var update = {
                    'selectedUserId': changed.id,
                    'forecastType': app.utils.getForecastType(changed.is_manager, changed.showOpps)
                }
                this.model.set(update);
            }, this);

            // if the model changes, run a fetch
            this.model.on('change', function() {
                // clear this out as something on the model changed,
                // this will be set once the collection resets
                // set the value to null since it can be undefined
                this.context.set({'currentForecastCommitDate' : null}, {silent: true});
                this.collection.fetch();
            }, this);

            this.context.on('change:selectedTimePeriod', function() {
                // clear this out if the timeperiod changed on the context,
                // this will be set once the collection resets
                // set the value to null since it can be undefined
                this.context.set({'currentForecastCommitDate' : null}, {silent: true});
                this.collection.fetch();
            }, this);

            // listen on the context for a commit trigger
            this.context.on('forecasts:worksheet:commit', function(user, worksheet_type, forecast_totals) {
                this.commitForecast(user, worksheet_type, forecast_totals);
            }, this);
            
            //listen for the worksheets to be dirty/clean
            this.context.on("forecasts:worksheet:dirty", function(type, isDirty){
                this.isDirty = isDirty;
                this.worksheetType = type;
            }, this);
            
            //listen for the worksheet navigation messages
            this.context.on("forecasts:worksheet:navigationMessage", function(message){
                this.navigationMessage = message;
            }, this);
            
            //listen for the user to change
            this.context.on("forecasts:user:changed", function(selectedUser, context){
                if(this.isDirty){
                    app.alert.show('leave_confirmation', {
                        level: 'confirmation',
                        messages: app.lang.get(this.navigationMessage, 'Forecasts').split('<br>'),
                        onConfirm: _.bind(function() {
                            app.utils.getSelectedUsersReportees(selectedUser, context);
                        }, this),
                        onCancel: _.bind(function() {
                            this.context.trigger('forecasts:user:canceled');
                        }, this)
                    });
                } else {
                    app.utils.getSelectedUsersReportees(selectedUser, context);
                }
            }, this);
            
            //handle timeperiod change events
            this.context.on('forecasts:timeperiod:changed', function(model, startEndDates) {
                // create an anonymous function to combine the two calls where this is used
                var onSuccess = _.bind(function() {
                    this.context.set('selectedTimePeriod', model.get('selectedTimePeriod'));
                    this._saveTimePeriodStatEndDates(startEndDates['start'], startEndDates['end']);
                }, this);

                if (this.isDirty) {
                    app.alert.show('leave_confirmation', {
                        level: 'confirmation',
                        messages: app.lang.get(this.navigationMessage, 'Forecasts').split('<br>'),
                        onConfirm: onSuccess,
                        onCancel: _.bind(function() {
                            this.context.trigger('forecasts:timeperiod:canceled');
                        }, this)
                    });
                } else {
                    // call the on success handler
                    onSuccess();
                }
            }, this);
        }
    },

    /**
     * Utility Method to handle saving of the timeperiod start and end dates so we can use them in other parts
     * of the forecast application
     *
     * @param {String} startDate        Start Date
     * @param {String} endDate          End Date
     * @param {Boolean} [doSilent]      When saving to the context, should this be silent to supress events
     * @return {Object} The object that is saved to the context if the context is there.
     * @private
     */
    _saveTimePeriodStatEndDates: function(startDate, endDate, doSilent)
    {
        // if do silent is not passed in or it's not a boolean, then just default it to false, so the events will fire
        if (_.isUndefined(doSilent) || !_.isBoolean(doSilent)) {
            doSilent = false;
        }
        var userPref = app.date.convertFormat(app.user.getPreference('datepref')),
            systemPref = 'YYYY-MM-DD',
            dateObj = {
                start: app.date(startDate, [userPref, systemPref]).format(systemPref),
                end: app.date(endDate, [userPref, systemPref]).format(systemPref)
            };

        if (!_.isUndefined(this.context)) {
            this.context.set(
                'selectedTimePeriodStartEnd',
                dateObj,
                {silent: doSilent}
            );
        }

        return dateObj;
    },

    /**
     * Opens the Forecasts Config drawer
     */
    openConfigDrawer: function() {
        // if there is no drawer open, then we need to open the drawer.
        if(app.drawer._components.length == 0) {
            // trigger the forecast config by going to the config route, while replacing what
            // is currently there so when we use app.route.goBack() from the cancel button
            app.router.navigate('Forecasts/config', {replace: true, trigger: true});
        }
    },

    /**
     * Get the Forecast Init Data from the server
     *
     * @param {Object} options
     */
    syncInitData: function(options) {
        var callbacks,
            url;

        options = options || {};
        // custom success handler
        options.success = _.bind(function(model, data, options) {
            // Add Forecasts-specific stuff to the app.user object
            app.user.set(data.initData.userData);
            if (data.initData.forecasts_setup === 0) {
                // Immediately open the config drawer so user can set up config
                this.openConfigDrawer();
            } else {
                this.initForecastsModule(data, options);
            }
        }, this);

        // since we have not initialized the view yet, pull the model from the initOptions.context
        var model = this.initOptions.context.get('model');
        callbacks = app.data.getSyncCallbacks('read', model, options);
        this.trigger("data:sync:start", 'read', model, options);

        url = app.api.buildURL("Forecasts/init", null, null, options.params);

        var params = {},
            cfg = app.metadata.getModule('Forecasts', 'config');
        if (cfg && cfg.is_setup === 0) {
            // add no-cache header if forecasts isnt set up yet
            params = {
                headers: {
                    'Cache-Control': 'no-cache'
                }
            };
        }
        app.api.call("read", url, null, callbacks, params);
    },

    /**
     * Process the Forecast Data
     *
     * @param {Object} data contains the data passed back from Forecasts/init endpoint
     * @param {Object} options
     */
    initForecastsModule: function(data, options) {
        var ctx = this.initOptions.context;
        // we watch for the first selectedUser change to actually init the Forecast Module case then we know we have
        // a proper selected user
        ctx.once('change:selectedUser', this._onceInitSelectedUser, this);

        // lets see if the user has ranges selected, so lets generate the key from the filters
        var ranges_key = app.user.lastState.buildKey('worksheet-filter', 'filter', 'ForecastWorksheets'),
            default_selection = app.user.lastState.get(ranges_key) || data.defaultSelections.ranges;

        // set items on the context from the initData payload
        ctx.set({
            // set the value to null since it can be undefined
            currentForecastCommitDate: null,
            selectedTimePeriod: data.defaultSelections.timeperiod_id.id,
            selectedRanges: default_selection,
            selectedTimePeriodStartEnd: this._saveTimePeriodStatEndDates(
                data.defaultSelections.timeperiod_id.start,
                data.defaultSelections.timeperiod_id.end,
                true
            )
        }, {silent: true});

        ctx.get('model').set({'selectedTimePeriod': data.defaultSelections.timeperiod_id.id}, {silent: true});

        // set the selected user to the context
        app.utils.getSelectedUsersReportees(app.user.toJSON(), ctx);
    },

    /**
     * Event handler for change:selectedUser
     * Triggered once when the user is set for the first time.  After setting user it calls
     * the init of the records layout
     *
     * @param {Backbone.Model} model the model from the change event
     * @param {String} change the updated selectedUser value from the change event
     * @private
     */
    _onceInitSelectedUser: function(model, change) {
        // init the recordlist view
        app.view.Layout.prototype.initialize.call(this, this.initOptions);
        app.view.Layout.prototype.initComponents.call(this);

        // set the selected user and forecast type on the model
        this.model.set('selectedUserId', change.id, {silent: true});
        this.model.set('forecastType', app.utils.getForecastType(change.is_manager, change.showOpps));
        // bind the collection sync to our custom sync
        this.collection.sync = _.bind(this.sync, this);

        // load the data
        app.view.Layout.prototype.loadData.call(this);
        // bind the data change
        this.bindDataChange();
        // render everything
        if (!this.disposed) this.render();
    },

    /**
     * Custom sync method used by this.collection
     *
     * @param {String} method
     * @param {Backbone.Model} model
     * @param {Object} options
     */
    sync: function(method, model, options) {
        var callbacks,
            url;

        options = options || {};

        options.params = options.params || {};

        var args_filter = [],
            filter = null;
        if (this.context.has('selectedTimePeriod')) {
            args_filter.push({"timeperiod_id": this.context.get('selectedTimePeriod')});
        }
        if (this.model.has('selectedUserId')) {
            args_filter.push({"user_id": this.model.get('selectedUserId')});
            args_filter.push({"forecast_type": this.model.get('forecastType')});
        }

        if (!_.isEmpty(args_filter)) {
            filter = {"filter": args_filter};
        }

        options.params.order_by = 'date_entered:DESC'
        options = app.data.parseOptionsForSync(method, model, options);

        // custom success handler
        options.success = _.bind(function(model, data, options) {
            if(!this.disposed) {
                this.collection.reset(data);
            }
        }, this);

        callbacks = app.data.getSyncCallbacks(method, model, options);

        // if there's a 412 error dismiss the custom loading alert
        this.collection.once('data:sync:error', function() {
            app.alert.dismiss('worksheet_loading');
        }, this);

        this.collection.trigger("data:sync:start", method, model, options);

        url = app.api.buildURL("Forecasts/filter", null, null, options.params);
        app.api.call("create", url, filter, callbacks);
    },

    /**
     * Commit A Forecast
     *
     * @fires forecasts:worksheet:committed
     * @param {Object} user
     * @param {String} worksheet_type
     * @param {Object} forecast_totals
     */
    commitForecast: function(user, worksheet_type, forecast_totals) {
        var forecast = new this.collection.model(),
            forecastType = app.utils.getForecastType(user.is_manager, user.showOpps),
            forecastData = {};


        // we need a commit_type so we know what to do on the back end.
        forecastData.commit_type = worksheet_type;
        forecastData.timeperiod_id = forecast_totals.timeperiod_id || this.context.get('selectedTimePeriod');
        forecastData.forecast_type = forecastType;

        forecast.save(forecastData, { success: _.bind(function(model, response) {
            // we need to make sure we are not disposed, this handles any errors that could come from the router and window
            // alert events
            if (!this.disposed) {
                // Call sync again so commitLog has the full collection
                // method gets overridden and options just needs an
                this.collection.fetch();
                this.context.trigger("forecasts:worksheet:committed", worksheet_type, response);
                var msg, managerName;
                if (worksheet_type === 'sales_rep') {
                    if (user.is_manager) {
                        // as manager, use own name
                        managerName = user.full_name;
                    } else {
                        // as sales rep, use manager name
                        managerName = user.reports_to_name;
                    }
                } else {
                    if (user.reports_to_id) {
                        // if manager has a manager, use reports to name
                        managerName = user.reports_to_name;
                    }
                }
                if (managerName) {
                    msg = Handlebars.compile(app.lang.get('LBL_FORECASTS_WORKSHEET_COMMIT_SUCCESS_TO', 'Forecasts'))(
                        {
                            manager: managerName
                        }
                    );
                } else {
                    // user does not report to anyone, don't use any name
                    msg = Handlebars.compile(app.lang.get('LBL_FORECASTS_WORKSHEET_COMMIT_SUCCESS', 'Forecasts'))();
                }

                app.alert.show('success', {
                    level: 'success',
                    autoClose: true,
                    autoCloseDelay: 10000,
                    title: app.lang.get('LBL_FORECASTS_WIZARD_SUCCESS_TITLE', 'Forecasts') + ':',
                    messages: [msg]
                });
            }
        }, this),
            error: _.bind(function(error){
                //if the metadata error comes back, we saved successfully, so we need to clear the is_dirty flag so the
                //page can reload
                if (error.status === 412) {
                    this.context.trigger('forecasts:worksheet:is_dirty', worksheet_type, false);
                }
            }, this),
            silent: true, alerts: { 'success': false }});
    }
}) },
"config-drawer": {"controller": /*
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
 * @class View.Layouts.Base.ForecastsConfigDrawerLayout
 * @alias SUGAR.App.view.layouts.BaseForecastsConfigDrawerLayout
 * @extends View.Layouts.Base.ConfigDrawerLayout
 */
({
	// Config-drawer Layout (base) 

    extendsFrom: 'ConfigDrawerLayout',

    /**
     * @inheritdoc
     *
     * Checks Forecasts ACLs to see if the User is a system admin
     * or if the user has a developer role for the Forecasts module
     *
     * @override
     */
    _checkModuleAccess: function() {
        var acls = app.user.getAcls().Forecasts,
            isSysAdmin = (app.user.get('type') == 'admin'),
            isDev = (!_.has(acls, 'developer'));

        return (isSysAdmin || isDev);
    },

    /**
     * @inheritdoc
     *
     * Checks Forecasts config metadata to see if the correct Sales Stage Won/Lost settings are present
     *
     * @override
     */
    _checkModuleConfig: function() {
        return app.utils.checkForecastConfig();
    }
}) }
}}
,
"datas": {}

},
		"ForecastWorksheets":{"fieldTemplates": {
"base": {
"parent": {"controller": /*
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
 * @class View.Fields.Base.ForecastsWorksheets.ParentField
 * @alias SUGAR.App.view.fields.BaseForecastsWorksheetsParentField
 * @extends View.Fields.Base.ParentField
 */
({
	// Parent FieldTemplate (base) 

    extendsFrom: 'ParentField',

    _render: function () {
        if(this.model.get('parent_deleted') == 1) {
            // set the value for use in the template
            this.deleted_value = this.model.get('name');
            // override the template to use the delete one
            this.options.viewName = 'deleted';
        }
        this._super("_render");
    }
}) },
"currency": {"controller": /*
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
 * @class View.Fields.Base.ForecastsWorksheets.CurrencyField
 * @alias SUGAR.App.view.fields.BaseForecastsWorksheetsCurrencyField
 * @extends View.Fields.Base.CurrencyField
 */
({
	// Currency FieldTemplate (base) 

    extendsFrom: 'CurrencyField',

    initialize: function(options) {
        // we need to make a clone of the plugins and then push to the new object. this prevents double plugin
        // registration across ExtendedComponents
        this.plugins = _.clone(this.plugins) || [];
        this.plugins.push('ClickToEdit');
        this._super("initialize", [options]);
    }
}) },
"enum": {"controller": /*
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
 * @class View.Fields.Base.ForecastsWorksheets.EnumField
 * @alias SUGAR.App.view.fields.BaseForecastsWorksheetsEnumField
 * @extends View.Fields.Base.EnumField
 */
({
	// Enum FieldTemplate (base) 

    extendsFrom: 'EnumField',

    /**
     * @inheritdoc
     */
    initialize: function(options) {
        // we need to make a clone of the plugins and then push to the new object. this prevents double plugin
        // registration across ExtendedComponents
        this.plugins = _.clone(this.plugins) || [];
        this.plugins.push('ClickToEdit');
        this._super("initialize", [options]);
    },

    /**
     * @inheritdoc
     */
    bindDataChange: function() {
        if(this.name === 'sales_stage') {
            this.model.on('change:sales_stage', function(model, newValue) {
                var salesStageWon = app.metadata.getModule('Forecasts', 'config').sales_stage_won;
                if(_.contains(salesStageWon, newValue)) {
                    this.context.trigger('forecasts:cteRemove:' + model.id)
                }
            }, this);
        }

        if(this.name === 'commit_stage') {
            this.context.on('forecasts:cteRemove:' + this.model.id, function() {
                this.$el.removeClass('isEditable');
                var $divEl = this.$('div.clickToEdit');
                if($divEl.length) {
                    $divEl.removeClass('clickToEdit');
                }
            }, this);
        }
    },

    /**
     * @inheritdoc
     */
    _render: function() {
        this._super('_render');

        // make sure commit_stage enum maintains 'list' class for style reasons
        if(this.name === 'commit_stage' && this.$el.hasClass('disabled')) {
            this.$el.addClass('list');
        }
    }
}) },
"int": {"controller": /*
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
 * @class View.Fields.Base.ForecastsWorksheets.IntField
 * @alias SUGAR.App.view.fields.BaseForecastsWorksheetsIntField
 * @extends View.Fields.Base.IntField
 */
({
	// Int FieldTemplate (base) 

    extendsFrom: 'IntField',

    initialize: function(options) {
        // we need to make a clone of the plugins and then push to the new object. this prevents double plugin
        // registration across ExtendedComponents
        this.plugins = _.clone(this.plugins) || [];
        this.plugins.push('ClickToEdit');
        this._super("initialize", [options]);
    }
}) },
"date": {"controller": /*
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
 * @class View.Fields.Base.ForecastsWorksheets.DateField
 * @alias SUGAR.App.view.fields.BaseForecastsWorksheetsDateField
 * @extends View.Fields.Base.DateField
 */
({
	// Date FieldTemplate (base) 

    extendsFrom: 'DateField',

    /**
     * @inheritdoc
     *
     * Add `ClickToEdit` plugin to the list of required plugins.
     */
    _initPlugins: function() {
        this._super('_initPlugins');

        this.plugins = _.union(this.plugins, [
            'ClickToEdit'
        ]);

        return this;
    }
}) }
}}
,
"views": {
"base": {
"filter": {"controller": /*
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
 * @class View.Views.Base.ForecastsWorksheets.FilterView
 * @alias SUGAR.App.view.views.BaseForecastsWorksheetsFilterView
 * @extends View.View
 */
({
	// Filter View (base) 

    /**
     * Front End Javascript Events
     */
    events: {
        'keydown .select2-input': 'disableSelect2KeyPress'
    },

    /**
     * Since we don't what the user to be able to type in the filter input
     * just disable all key press events for the .select2-input boxes
     *
     * @param event
     */
    disableSelect2KeyPress: function(event) {
        event.preventDefault();
    },

    /**
     * Key for saving the users last selected filters
     */
    userLastWorksheetFilterKey: undefined,

    /**
     * Initialize because we need to set the selectedUser variable
     * @param {Object} options
     */
    initialize: function(options) {
        this._super('initialize', [options]);
        this.userLastWorksheetFilterKey = app.user.lastState.key('worksheet-filter', this);
        this.selectedUser = {
            id: app.user.get('id'),
            is_manager: app.user.get('is_manager'),
            showOpps: false
        };
    },

    // prevent excessive renders when things change.
    bindDomChange: function() {},

    /**
     * Override the render to have call the group by toggle
     *
     * @private
     */
    _render:function () {
        app.view.View.prototype._render.call(this);

        this.node = this.$el.find("#" + this.cid);

        // set up the filters
        this._setUpFilters();

        return this;
    },


    /**
     * Set up select2 for driving the filter UI
     * @param node the element to use as the basis for select2
     * @private
     */
    _setUpFilters: function() {
        var ctx = this.context.parent || this.context,
            user_ranges = app.user.lastState.get(this.userLastWorksheetFilterKey),
            selectedRanges = user_ranges || ctx.get('selectedRanges') || app.defaultSelections.ranges;

        this.node.select2({
            data:this._getRangeFilters(),
            initSelection: function(element, callback) {
                callback(_.filter(
                    this.data,
                    function(obj) {
                        return _.contains(this, obj.id);
                    },
                    $(element.val().split(","))
                ));
            },
            multiple:true,
            placeholder: app.lang.get("LBL_MODULE_FILTER"),
            dropdownCss: {width:"auto"},
            containerCssClass: "select2-choices-pills-close",
            containerCss: "border: none",
            formatSelection: this.formatCustomSelection,
            dropdownCssClass: "search-filter-dropdown",
            escapeMarkup: function(m) { return m; },
            width: '100%'
        });

        // set the default selections
        this.node.select2("val", selectedRanges);

        // add a change handler that updates the forecasts context appropriately with the user's selection
        this.node.change(
            {
                context: ctx
            },
            _.bind(function(event) {
                app.alert.show('worksheet_filtering',
                    {level: 'process', title: app.lang.get('LBL_LOADING')}
                );
                app.user.lastState.set(this.userLastWorksheetFilterKey, event.val);
                _.delay(function() {
                    event.data.context.set('selectedRanges', event.val);
                }, 25);
            }, this)
        );
    },
    /**
     * Formats pill selections
     * 
     * @param item selected item
     */
    formatCustomSelection: function(item) {        
        return '<span class="select2-choice-type" disabled="disabled">' + app.lang.get("LBL_FILTER") + '</span><a class="select2-choice-filter" rel="'+ item.id + '" href="javascript:void(0)">'+ item.text +'</a>';
    },

    /**
     * Gets the list of filters that correspond to the forecasts range settings that were selected by the admin during
     * configuration of the forecasts module.
     * @return {Array} array of the selected ranges
     */
    _getRangeFilters: function() {
        var options = app.metadata.getModule('Forecasts', 'config').buckets_dom || 'commit_stage_binary_dom';

        return _.map(app.lang.getAppListStrings(options), function(value, key)  {
            return {id: key, text: value};
        });
    }

}) },
"recordlist": {"controller": /*
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
 * Forecast Sales Rep Worksheet Record List.
 *
 * @class View.Views.Base.ForecastsWorksheets.RecordlistView
 * @alias SUGAR.App.view.views.BaseForecastsWorksheetsRecordlistView
 * @extends View.Views.Base.RecordlistView
 */
/**
 * Events
 *
 * forecasts:worksheet:is_dirty
 *  on: this.context.parent || this.context
 *  by: this.dirtyModels 'add' Event
 *  when: a model is added to the dirtModels collection
 *
 * forecasts:worksheet:needs_commit
 *  on: this.context.parent || this.context
 *  by: checkForDraftRows
 *  when: this.collection has a row newer than the last commit date
 *
 * forecasts:worksheet:totals
 *  on: this.context.parent || this.context
 *  by: calculateTotals
 *  when: after it's done calculating totals from a collection change or reset event
 *
 * forecasts:worksheet:saved
 *  on: this.context.parent || this.context
 *  by: saveWorksheet
 *  when: after it's done saving the worksheets to the db for a save draft
 *
 * forecasts:worksheet:commit
 *  on: this.context.parent || this.context
 *  by: forecasts:worksheet:saved event
 *  when: only when the commit button is pressed
 *
 * forecasts:sync:start
 *  on: this.context.parent
 *  by: data:sync:start handler
 *  when: this.collection starts syncing
 *
 * forecasts:sync:complete
 *  on: this.context.parent
 *  by: data:sync:complete handler
 *  when: this.collection completes syncing
 *
 */
({
	// Recordlist View (base) 

    /**
     * Who is my parent
     */
    extendsFrom: 'RecordlistView',

    /**
     * Type of worksheet
     */
    worksheetType: 'sales_rep',

    /**
     * Totals Storage
     */
    totals: {},

    /**
     * Before W/L/B Columns Colspan
     */
    before_colspan: 0,

    /**
     * After W/L/B Columns Colspan
     */
    after_colspan: 0,

    /**
     * Selected User Storage
     */
    selectedUser: {},

    /**
     * Can we edit this worksheet?
     *
     * defaults to true as it's always the current user that loads first
     */
    canEdit: true,

    /**
     * Active Filters
     */
    filters: [],

    /**
     * Filtered Collection
     */
    filteredCollection: new Backbone.Collection(),

    /**
     * Selected Timeperiod Storage
     */
    selectedTimeperiod: '',

    /**
     * Navigation Message To Display
     */
    navigationMessage: '',

    /**
     * Special Navigation for the Window Refresh
     */
    routeNavigationMessage: '',

    /**
     * Do we actually need to display a navigation message
     */
    displayNavigationMessage: false,

    /**
     * Only check for draft records once
     */
    hasCheckedForDraftRecords: false,

    /**
     * Holds the model currently being displayed in the preview panel
     */
    previewModel: undefined,

    /**
     * Tracks if the preview panel is visible or not
     */
    previewVisible: false,

    /**
     * is the collection syncing
     * @param boolean
     */
    isCollectionSyncing: false,

    /**
     * is the commit history being loading
     * @param boolean
     */
    isLoadingCommits: false,

    /**
     * The template for when we don't have access to a data point
     */
    noAccessDataErrorTemplate: undefined,

    /**
     * Target URL of the nav action
     */
    targetURL: '',
    
    /**
     * Current URL of the module
     */
    currentURL: '',

    /**
     * Takes the values calculated in `this.totals` and condenses them for the totals.hbs subtemplate
     */
    totalsTemplateObj: undefined,

    initialize: function(options) {
        // we need to make a clone of the plugins and then push to the new object. this prevents double plugin
        // registration across ExtendedComponents
        this.plugins = _.without(this.plugins, 'ReorderableColumns', 'MassCollection');
        this.plugins.push('CteTabbing', 'DirtyCollection');
        this._super('initialize', [options]);
        // we need to get the flex-list template from the ForecastWorksheets module so it can use the filteredCollection
        // for display
        this.template = app.template.getView('flex-list', this.module);
        this.selectedUser = this.context.get('selectedUser') || this.context.parent.get('selectedUser') || app.user.toJSON();
        this.selectedTimeperiod = this.context.get('selectedTimePeriod') || this.context.parent.get('selectedTimePeriod') || '';
        this.context.set('skipFetch', !(this.selectedUser.showOpps || !this.selectedUser.is_manager)); // if user is a manager, skip the initial fetch
        this.filters = this.context.get('selectedRanges') || this.context.parent.get('selectedRanges');
        this.collection.sync = _.bind(this.sync, this);
        this.noAccessDataErrorTemplate = app.template.getField('base', 'noaccess')(this);
        this.currentURL = Backbone.history.getFragment();
    },

    _dispose: function() {
        if (!_.isUndefined(this.context.parent) && !_.isNull(this.context.parent)) {
            this.context.parent.off(null, null, this);
            if (this.context.parent.has('collection')) {
                this.context.parent.get('collection').off(null, null, this);
            }
        }
        // make sure this alert is hidden if the the view is disposed
        app.alert.dismiss('workshet_loading');
        app.routing.offBefore('route', this.beforeRouteHandler, this);
        $(window).off('beforeunload.' + this.worksheetType);
        this._super('_dispose');
    },

    bindDataChange: function() {
        // these are handlers that we only want to run when the parent module is forecasts
        if (!_.isUndefined(this.context.parent) && !_.isUndefined(this.context.parent.get('model'))) {
            if (this.context.parent.get('model').module == 'Forecasts') {
                this.context.parent.on('button:export_button:click', function() {
                    if (this.layout.isVisible()) {
                        this.exportCallback();
                    }
                }, this);
                this.before('render', function() {
                    return this.beforeRenderCallback()
                }, this);
                this.on('render', function() {
                    this.renderCallback();
                    if (this.previewVisible) {
                        this.decorateRow(this.previewModel);
                    }
                }, this);

                this.on('list:toggle:column', function(column, isVisible, columnMeta) {
                    // if we hide or show a column, recalculate totals
                    this.calculateTotals();
                }, this);

                this.context.parent.on('forecasts:worksheet:totals', function(totals, type) {
                    if (type == this.worksheetType && this.layout.isVisible()) {
                        this.totalsTemplateObj = {
                            orderedFields: []
                        };
                        var tpl = app.template.getView('recordlist.totals', this.module),
                            filteredKey,
                            totalValues;

                        // loop through visible fields in metadata order
                        _.each(this._fields.visible, function(field) {
                            if(_.contains(['likely_case', 'best_case', 'worst_case'], field.name)) {
                                totalValues = {};
                                totalValues.fieldName = field.name;

                                switch(field.name) {
                                    case 'worst_case':
                                    case 'best_case':
                                        filteredKey = field.name.split('_')[0];
                                        break;
                                    case 'likely_case':
                                        filteredKey = 'amount';
                                        break;
                                }

                                totalValues.display = this.totals[field.name + '_display'];
                                totalValues.access = this.totals[field.name + '_access'];
                                totalValues.filtered = this.totals['filtered_' + filteredKey];
                                totalValues.overall = this.totals['overall_' + filteredKey];

                                this.totalsTemplateObj.orderedFields.push(totalValues);
                            }
                        }, this);

                        this.$('tfoot').remove();
                        this.$('tbody').after(tpl(this));
                    }
                }, this);

                /**
                 * trigger an event if dirty
                 */
                this.dirtyModels.on('add change reset', function(){
                    if(this.layout.isVisible()){
                        this.context.parent.trigger('forecasts:worksheet:dirty', this.worksheetType, this.dirtyModels.length > 0);
                    }
                }, this);
                
                this.context.parent.on('change:selectedTimePeriod', function(model, changed) {
                    this.updateSelectedTimeperiod(changed);
                }, this);

                this.context.parent.on('change:selectedUser', function(model, changed) {
                    this.updateSelectedUser(changed)
                }, this);

                this.context.parent.on('button:save_draft_button:click', function() {
                    if (this.layout.isVisible()) {
                        // after we save, trigger the needs_commit event
                        this.context.parent.once('forecasts:worksheet:saved', function() {
                            // clear out the current navigation message
                            this.setNavigationMessage(false, '', '');
                            this.cleanUpDirtyModels();
                            this.refreshData();
                            this.collection.once('reset', function(){
                                this.context.parent.trigger('forecasts:worksheet:needs_commit', this.worksheetType);
                            }, this);
                        }, this);
                        this.saveWorksheet(true);
                    }
                }, this);

                this.context.parent.on('button:commit_button:click', function() {
                    if (this.layout.isVisible()) {
                        this.context.parent.once('forecasts:worksheet:saved', function() {
                            this.context.parent.trigger('forecasts:worksheet:commit', this.selectedUser, this.worksheetType, this.getCommitTotals())
                        }, this);
                        this.saveWorksheet(false);
                    }
                }, this);

                this.context.parent.on('change:currentForecastCommitDate', function(context, changed) {
                    if (this.layout.isVisible()) {
                        this.checkForDraftRows(changed);
                    }
                }, this);

                if (this.context.parent.has('collection')) {
                    var parentCollection = this.context.parent.get('collection');

                    parentCollection.on('data:sync:start', function() {
                        this.isLoadingCommits = true;
                    }, this);
                    parentCollection.on('data:sync:complete', function() {
                        this.isLoadingCommits = false;
                    }, this);
                }

                this.collection.on('data:sync:start', function() {
                    this.isCollectionSyncing = true;
                    // Begin sync start for buttons
                    this.context.parent.trigger('forecasts:sync:start');
                }, this);

                this.collection.on('data:sync:complete', function() {
                    this.isCollectionSyncing = false;
                    // End sync start for buttons
                    this.context.parent.trigger('forecasts:sync:complete');
                }, this);

                this.collection.on('reset', function() {
                    this.setNavigationMessage(false, '', '');
                    this.cleanUpDirtyModels();
                    var ctx = this.context.parent || this.context;
                    ctx.trigger('forecasts:worksheet:is_dirty', this.worksheetType, false);
                    if (this.isLoadingCommits === false) {
                        this.checkForDraftRows(ctx.get('currentForecastCommitDate'));
                    }
                    this.filterCollection();
                }, this);

                this.collection.on('change:commit_stage', function(model) {
                    if (!_.isEmpty(this.filters)  // we have filters
                        && _.indexOf(this.filters, model.get('commit_stage')) === -1 // and the commit_stage is not shown
                        ) {
                        this.filterCollection();
                        _.defer(_.bind(function() {
                            if (!this.disposed) {
                                this.render();
                            }
                        }, this));
                    } else {
                        var commitStage = model.get('commit_stage'),
                            includedCommitStages = app.metadata.getModule('Forecasts', 'config').commit_stages_included,
                            el = this.$('tr[name=' + model.module + '_' + model.id + ']'),
                            isIncluded = _.include(includedCommitStages, commitStage);

                        if (el) {
                            // we need to update the data-forecast attribute on the row
                            // and the new commit stage is visible
                            el.attr('data-forecast', commitStage);

                            if (isIncluded && !el.hasClass('included')) {
                                // if the commitStage is included, and it doesnt have the included class, add it
                                el.addClass('included');
                                model.set({ includedInForecast: true }, {silent: true});
                            } else if (!isIncluded && el.hasClass('included')) {
                                // if the commitStage isn't included, and it still has the class, remove it
                                el.removeClass('included');
                                model.unset('includedInForecast');
                            }
                        }
                    }
                }, this);

                this.context.parent.on('change:selectedRanges', function(model, changed) {
                    this.filters = changed;
                    this.once('render', function() {
                        app.alert.dismiss('worksheet_filtering');
                    });
                    this.filterCollection();
                    this.calculateTotals();
                    if (!this.disposed) this.render();
                }, this);

                this.context.parent.on('forecasts:worksheet:committed', function() {
                    if (this.layout.isVisible()) {
                        this.setNavigationMessage(false, '', '');
                        this.cleanUpDirtyModels();
                        var ctx = this.context.parent || this.context;
                        ctx.trigger('forecasts:worksheet:is_dirty', this.worksheetType, false);
                        this.refreshData();
                    }
                }, this);

                this.context.parent.on('forecasts:worksheet:is_dirty', function(worksheetType, is_dirty) {
                    if (this.worksheetType == worksheetType) {
                        if (is_dirty) {
                            this.setNavigationMessage(true, 'LBL_WARN_UNSAVED_CHANGES', 'LBL_WARN_UNSAVED_CHANGES');
                        } else {
                            this.setNavigationMessage(false, '', '');
                        }
                    }
                }, this);

                app.routing.before('route', this.beforeRouteHandler, this);

                $(window).bind('beforeunload.' + this.worksheetType, _.bind(function() {
                    var ret = this.showNavigationMessage('window');
                    if (_.isString(ret)) {
                        return ret;
                    }
                }, this));
            }
        }

        // listen for the before list:orderby to handle if the worksheet is dirty or notW
        this.before('list:orderby', function(options) {
            if (this.isDirty()) {
                app.alert.show('leave_confirmation', {
                    level: 'confirmation',
                    messages: app.lang.get('LBL_WARN_UNSAVED_CHANGES_CONFIRM_SORT', 'Forecasts'),
                    onConfirm: _.bind(function() {
                        this._setOrderBy(options);
                    }, this)
                });
                return false;
            }
            return true;
        }, this);

        this.collection.on('reset change', function() {
            this.calculateTotals();
        }, this);

        if (!_.isUndefined(this.dirtyModels)) {
            this.dirtyModels.on('add', function() {
                if (this.canEdit) {
                    var ctx = this.context.parent || this.context;
                    ctx.trigger('forecasts:worksheet:is_dirty', this.worksheetType, true);
                }
            }, this);
        }

        this.layout.on('hide', function() {
            this.totals = {};
        }, this);

        // call the parent
        this._super('bindDataChange');
    },

    beforeRouteHandler: function() {
        return this.showNavigationMessage('router');
    },
    
    /**
     * default navigation callback for alert message
     */
    defaultNavCallback: function(){
        this.displayNavigationMessage = false;
        app.router.navigate(this.targetURL, {trigger: true});
    },

    /**
     * @inheritdoc
     */
    unbindData: function() {
        app.events.off(null, null, this);
        this._super('unbindData');
    },

    /**
     * Handle Showing of the Navigation messages if any are applicable
     *
     * @param type
     * @returns {*}
     */
    showNavigationMessage: function(type, callback) {
        if (!_.isFunction(callback)) {
            callback = this.defaultNavCallback;
        }
        
        if (this.layout.isVisible()) {
            var canEdit = this.dirtyCanEdit || this.canEdit;
            if (canEdit && this.displayNavigationMessage) {
                if (type == 'window') {
                    if (!_.isEmpty(this.routeNavigationMessage)) {
                        return app.lang.get(this.routeNavigationMessage, 'Forecasts');
                    }
                    return false;
                }
                this.targetURL = Backbone.history.getFragment();

                //Replace the url hash back to the current staying page
                app.router.navigate(this._currentUrl, {trigger: false, replace: true});

                app.alert.show('leave_confirmation', {
                    level: 'confirmation',
                    messages: app.lang.get(this.navigationMessage, 'Forecasts').split('<br>'),
                    onConfirm: _.bind(function() {
                        callback.call(this);
                    }, this)
                });
                return false;
            }
        }
        return true;
    },

    /**
     * Utility to set the Navigation Message and Flag
     *
     * @param display
     * @param reload_label
     * @param route_label
     */
    setNavigationMessage: function(display, reload_label, route_label) {
        this.displayNavigationMessage = display;
        this.navigationMessage = reload_label;
        this.routeNavigationMessage = route_label;
        this.context.parent.trigger('forecasts:worksheet:navigationMessage', this.navigationMessage);
    },

    /**
     * Handle the export callback
     */
    exportCallback: function() {

        if (this.canEdit && this.isDirty()) {
            app.alert.show('leave_confirmation', {
                level: 'confirmation',
                messages: app.lang.get('LBL_WORKSHEET_EXPORT_CONFIRM', 'Forecasts'),
                onConfirm: _.bind(function() {
                    this.doExport();
                }, this)
            });
        } else {
            this.doExport();
        }
    },

    /**
     * Actually run the export
     */
    doExport: function() {
        app.alert.show('massexport_loading', {level: 'process', title: app.lang.get('LBL_LOADING')});
        var params = {
            timeperiod_id: this.selectedTimeperiod,
            user_id: this.selectedUser.id,
            filters: this.filters,
            platform: app.config.platform
        };
        var url = app.api.buildURL(this.module, 'export', null, params);

        app.api.fileDownload(url, {
            complete: function(data) {
                app.alert.dismiss('massexport_loading');
            }
        }, { iframe: this.$el });
    },

    /**
     * Callback for the before('render') event
     * @returns {boolean}
     */
    beforeRenderCallback: function() {
        // set the defaults to make it act like a manager so it doesn't actually render till the selected
        // user is updated
        var showOpps = (_.isUndefined(this.selectedUser.showOpps)) ? false : this.selectedUser.showOpps,
            isManager = (_.isUndefined(this.selectedUser.is_manager)) ? true : this.selectedUser.is_manager;

        if (!(showOpps || !isManager) && this.layout.isVisible()) {
            this.layout.hide();
        } else if ((showOpps || !isManager) && !this.layout.isVisible()) {
            this.layout.once('show', this.calculateTotals, this);
            this.layout.show();
        }

        // empty out the left columns
        this.leftColumns = [];

        return (showOpps || !isManager);
    },

    /**
     * Callback for the on('render') event
     */
    renderCallback: function() {
        var user = this.selectedUser || this.context.parent.get('selectedUser') || app.user.toJSON()
        if (user.showOpps || !user.is_manager) {
            if (!this.layout.isVisible()) {
                this.layout.show();
            }

            if (this.filteredCollection.length == 0) {
                var tpl = app.template.getView('recordlist.noresults', this.module);
                this.$('tbody').html(tpl(this));
            }

            // insert the footer
            if (!_.isEmpty(this.totals) && this.layout.isVisible()) {
                var tpl = app.template.getView('recordlist.totals', this.module);
                this.$('tbody').after(tpl(this));
            }
            //adjust width of sales stage column to longest value so cells don't shift when using CTE
            var sales_stage_width = this.$('td[data-field-name="sales_stage"] span.isEditable').width();
            var sales_stage_outerwidth = this.$('td[data-field-name="sales_stage"] span.isEditable').outerWidth();
            this.$('td[data-field-name="sales_stage"] span.isEditable').width(sales_stage_width + 20);
            this.$('td[data-field-name="sales_stage"] span.isEditable').parent('td').css('min-width', sales_stage_outerwidth + 26 + 'px');

            // figure out if any of the row actions need to be disabled
            this.setRowActionButtonStates();
        } else {
            if (this.layout.isVisible()) {
                this.layout.hide();
            }
        }
    },

    /**
     * Code to handle if the selected user changes
     *
     * @param changed
     */
    updateSelectedUser: function(changed) {
        var doFetch = false;
        if (this.selectedUser.id != changed.id) {
            // user changed. make sure it's not a manager view before we say fetch or not
            doFetch = (changed.showOpps || !changed.is_manager);
        }
        // if we are already not going to fetch, check to see if the new user is showingOpps or is not
        // a manager, then we want to fetch
        if (!doFetch && (changed.showOpps || !changed.is_manager)) {
            doFetch = true;
        }

        if (this.displayNavigationMessage) {
            // save the user just in case
            this.dirtyUser = this.selectedUser;
            this.dirtyCanEdit = this.canEdit;
        }
        this.cleanUpDirtyModels();
        
        this.selectedUser = changed;

        // Set the flag for use in other places around this controller to suppress stuff if we can't edit
        this.canEdit = (this.selectedUser.id == app.user.get('id'));
        this.hasCheckedForDraftRecords = false;

        if (doFetch) {
            this.refreshData();
        } else {
            if ((!this.selectedUser.showOpps && this.selectedUser.is_manager) && this.layout.isVisible()) {
                // we need to hide
                this.layout.hide();
            }
        }
    },

    updateSelectedTimeperiod: function(changed) {
        if (this.displayNavigationMessage) {
            // save the time period just in case
            this.dirtyTimeperiod = this.selectedTimeperiod;
        }
        this.selectedTimeperiod = changed;
        this.hasCheckedForDraftRecords = false;
        if (this.layout.isVisible()) {
            this.refreshData();
        }
    },

    /**
     * Check to make sure that if there are dirty rows, then trigger the needs_commit event to enable
     * the buttons
     *
     * @fires forecasts:worksheet:needs_commit
     * @param lastCommitDate
     */
    checkForDraftRows: function(lastCommitDate) {
        if (this.layout.isVisible() && this.canEdit && this.hasCheckedForDraftRecords === false
            && !_.isEmpty(this.collection.models) && this.isCollectionSyncing === false) {
            this.hasCheckedForDraftRecords = true;
            if (_.isUndefined(lastCommitDate)) {
                // we have rows but no commit, enable the commit button
                this.context.parent.trigger('forecasts:worksheet:needs_commit', this.worksheetType);
            } else {
                // check to see if anything in the collection is a draft, if it is, then send an event
                // to notify the commit button to enable
                this.collection.find(function(item) {
                    if (item.get('date_modified') > lastCommitDate) {
                        this.context.parent.trigger('forecasts:worksheet:needs_commit', this.worksheetType);
                        return true;
                    }
                    return false;
                }, this);
            }
        } else if (this.layout.isVisible() === false && this.canEdit && this.hasCheckedForDraftRecords === false) {
            // since the layout is not visible, lets wait for it to become visible
            this.layout.once('show', function() {
                this.checkForDraftRows(lastCommitDate);
            }, this);
        } else if (this.isCollectionSyncing === true) {
            this.collection.once('data:sync:complete', function() {
                this.checkForDraftRows(lastCommitDate);
            }, this);
        }
    },

    /**
     * Handles setting the proper state for the Preview in the row-actions
     */
    setRowActionButtonStates: function() {
        _.each(this.fields, function(field) {
            if (field.def.event === 'list:preview:fire') {
                // we have a field that needs to be disabled, so disable it!
                field.setDisabled((field.model.get('parent_deleted') == '1'));
                field.render();
            }
        });
    },

    /**
     * Filter the Collection so we only show what the filter says we should show
     */
    filterCollection: function() {
        this.filteredCollection.reset();
        if (_.isEmpty(this.filters)) {
            this.filteredCollection.add(this.collection.models);
        } else {
            this.collection.each(function(model) {
                if (_.indexOf(this.filters, model.get('commit_stage')) !== -1) {
                    this.filteredCollection.add(model);
                }
            }, this);
        }
    },

    /**
     * Save the worksheet to the database
     *
     * @fires forecasts:worksheet:saved
     * @return {Number}
     */
    saveWorksheet: function(isDraft) {
        // only run the save when the worksheet is visible and it has dirty records
        var totalToSave = 0;
        if (this.layout.isVisible()) {
            var saveCount = 0,
                ctx = this.context.parent || this.context;

            if (this.isDirty()) {
                totalToSave = this.dirtyModels.length;
                this.dirtyModels.each(function(model) {
                    //set properties on model to aid in save
                    model.set({
                        draft: (isDraft && isDraft == true) ? 1 : 0,
                        timeperiod_id: this.dirtyTimeperiod || this.selectedTimeperiod,
                        current_user: this.dirtyUser.id || this.selectedUser.id
                    }, {silent: true});

                    // set the correct module on the model since sidecar doesn't support sub-beans yet
                    model.save({}, {success: _.bind(function() {
                        saveCount++;

                        // Make sure the preview panel gets updated model info
                        if (this.previewVisible) {
                            var previewId = this.previewModel.get('parent_id') || this.previewModel.get('id');
                            if (model.get('parent_id') == previewId) {
                                var previewCollection = new Backbone.Collection();
                                this.filteredCollection.each(function(model) {
                                    if (model.get('parent_deleted') !== '1') {
                                        previewCollection.add(model);
                                    }
                                }, this);

                                app.events.trigger('preview:render', model, previewCollection, true, model.get('id'), true);
                            }
                        }

                        //if this is the last save, go ahead and trigger the callback;
                        if (totalToSave === saveCount) {
                            // we only want to show this when the draft is being saved
                            if (isDraft) {
                                app.alert.show('success', {
                                    level: 'success',
                                    autoClose: true,
                                    autoCloseDelay: 10000,
                                    title: app.lang.get('LBL_FORECASTS_WIZARD_SUCCESS_TITLE', 'Forecasts') + ':',
                                    messages: [app.lang.get('LBL_FORECASTS_WORKSHEET_SAVE_DRAFT_SUCCESS', 'Forecasts')]
                                });
                            }
                            ctx.trigger('forecasts:worksheet:saved', totalToSave, this.worksheetType, isDraft);
                        }
                    }, this), silent: true, alerts: { 'success': false }});
                }, this);

                this.cleanUpDirtyModels();
            } else {
                // we only want to show this when the draft is being saved
                if (isDraft) {
                    app.alert.show('success', {
                        level: 'success',
                        autoClose: true,
                        autoCloseDelay: 10000,
                        title: app.lang.get('LBL_FORECASTS_WIZARD_SUCCESS_TITLE', 'Forecasts') + ':',
                        messages: [app.lang.get('LBL_FORECASTS_WORKSHEET_SAVE_DRAFT_SUCCESS', 'Forecasts')]
                    });
                }
                ctx.trigger('forecasts:worksheet:saved', totalToSave, this.worksheetType, isDraft);
            }
        }

        return totalToSave
    },

    /**
     * Calculate the totals for the visible fields
     */
    calculateTotals: function() {
        // fire an event on the parent context
        if (this.layout.isVisible()) {
            this.totals = this.getCommitTotals();
            var calcFields = ['worst_case', 'best_case', 'likely_case'],
                fields = _.filter(this._fields.visible, function(field) {
                    if (_.contains(calcFields, field.name)) {
                        this.totals[field.name + '_access'] = app.acl.hasAccess('read', this.module, app.user.get('id'), field.name);
                        this.totals[field.name + '_display'] = true;
                        return true;
                    }

                    return false;
                }, this);

            // loop though all the fields and find where the worst/likely/best start at
            for(var x = 0; x < this._fields.visible.length; x++) {
                var f = this._fields.visible[x];
                if (_.contains(calcFields, f.name)) {
                    break;
                }
            }

            this.before_colspan = x;
            this.after_colspan = (this._fields.visible.length - (x + fields.length));

            var ctx = this.context.parent || this.context;
            ctx.trigger('forecasts:worksheet:totals', this.totals, this.worksheetType);
        }
    },

    /**
     * Set the loading message and have a way to hide it
     */
    displayLoadingMessage: function() {
        app.alert.show('worksheet_loading',
            {level: 'process', title: app.lang.get('LBL_LOADING')}
        );
        this.collection.once('reset', function() {
            app.alert.dismiss('worksheet_loading');
        }, this);
    },

    /**
     * Custom Method to handle the refreshing of the worksheet Data
     */
    refreshData: function() {
        this.displayLoadingMessage();
        this.collection.fetch();
    },

    /**
     * Custom Sync Method
     *
     * @param method
     * @param model
     * @param options
     */
    sync: function(method, model, options) {
        var callbacks,
            url;

        options = options || {};
        options.params = options.params || {};

        if (!_.isUndefined(this.selectedUser.id)) {
            options.params.user_id = this.selectedUser.id;
        }
        if (!_.isEmpty(this.selectedTimeperiod)) {
            options.params.timeperiod_id = this.selectedTimeperiod;
        }

        options.limit = 1000;
        options = app.data.parseOptionsForSync(method, model, options);

        // Since parent_name breaks the XHR call in the order by, just use the name field instead
        // they are the same anyways.
        if (!_.isUndefined(options.params.order_by) && options.params.order_by.indexOf('parent_name') === 0) {
            options.params.order_by = options.params.order_by.replace('parent_', '');
        }

        // custom success handler
        options.success = _.bind(function(model, data, options) {
            if(!this.disposed) {
                this.collection.reset(data);
            }
        }, this);

        callbacks = app.data.getSyncCallbacks(method, model, options);
        this.collection.trigger('data:sync:start', method, model, options);

        url = app.api.buildURL('ForecastWorksheets', null, null, options.params);
        app.api.call('read', url, null, callbacks);
    },

    /**
     * Get the totals that need to be committed
     *
     * @returns {{amount: number, best_case: number, worst_case: number, overall_amount: number, overall_best: number, overall_worst: number, timeperiod_id: (*|bindDataChange.selectedTimeperiod), lost_count: number, lost_amount: number, won_count: number, won_amount: number, included_opp_count: number, total_opp_count: Number, closed_count: number, closed_amount: number}}
     */
    getCommitTotals: function() {
        var includedAmount = 0,
            includedBest = 0,
            includedWorst = 0,
            filteredAmount = 0,
            filteredBest = 0,
            filteredWorst = 0,
            filteredCount = 0,
            overallAmount = 0,
            overallBest = 0,
            overallWorst = 0,
            includedCount = 0,
            lostCount = 0,
            lostAmount = 0,
            lostBest = 0,
            lostWorst = 0,
            wonCount = 0,
            wonAmount = 0,
            wonBest = 0,
            wonWorst = 0,
            includedClosedCount = 0,
            includedClosedAmount = 0,
            cfg = app.metadata.getModule('Forecasts', 'config'),
            startEndDates = this.context.get('selectedTimePeriodStartEnd') ||
                this.context.parent.get('selectedTimePeriodStartEnd'),
            activeFilters = this.context.get('selectedRanges') || this.context.parent.get('selectedRanges') || [];

        //Get the excluded_sales_stage property.  Default to empty array if not set
        var sales_stage_won_setting = cfg.sales_stage_won || [],
            sales_stage_lost_setting = cfg.sales_stage_lost || [];

        // set up commit_stages that should be processed in included total
        var commit_stages_in_included_total = ['include'];

        if (cfg.forecast_ranges == 'show_custom_buckets') {
            commit_stages_in_included_total = cfg.commit_stages_included;
        }

        this.collection.each(function(model) {
            // make sure that the selected date is between the start and end dates for the current timeperiod
            // if it's not, then don't include it in the totals
            if (app.date(model.get('date_closed')).isBetween(startEndDates['start'], startEndDates['end'])) {
                var won = _.include(sales_stage_won_setting, model.get('sales_stage')),
                    lost = _.include(sales_stage_lost_setting, model.get('sales_stage')),
                    commit_stage = model.get('commit_stage'),
                    base_rate = model.get('base_rate'),
                    // added || 0 in case these converted out to NaN so they dont make charts blow up
                    worst_base = app.currency.convertWithRate(model.get('worst_case'), base_rate) || 0,
                    amount_base = app.currency.convertWithRate(model.get('likely_case'), base_rate) || 0,
                    best_base = app.currency.convertWithRate(model.get('best_case'), base_rate) || 0,
                    includedInForecast = _.include(commit_stages_in_included_total, commit_stage),
                    includedInFilter = _.include(activeFilters, commit_stage);

                if (won && includedInForecast) {
                    wonAmount = app.math.add(wonAmount, amount_base);
                    wonBest = app.math.add(wonBest, best_base);
                    wonWorst = app.math.add(wonWorst, worst_base);
                    wonCount++;

                    includedClosedCount++;
                    includedClosedAmount = app.math.add(amount_base, includedClosedAmount);
                } else if (lost) {
                    lostAmount = app.math.add(lostAmount, amount_base);
                    lostBest = app.math.add(lostBest, best_base);
                    lostWorst = app.math.add(lostWorst, worst_base);
                    lostCount++;
                }

                if (includedInFilter || _.isEmpty(activeFilters)) {
                    filteredAmount = app.math.add(filteredAmount, amount_base);
                    filteredBest = app.math.add(filteredBest, best_base);
                    filteredWorst = app.math.add(filteredWorst, worst_base);
                    filteredCount++;
                }

                if (includedInForecast) {
                    includedAmount = app.math.add(includedAmount, amount_base);
                    includedBest = app.math.add(includedBest, best_base);
                    includedWorst = app.math.add(includedWorst, worst_base);
                    includedCount++;

                    // since we're already looping through the collection of models and we have
                    // the included commit stages, set or unset the includedInForecast property here
                    model.set({ includedInForecast: true }, {silent: true});
                } else if (model.has('includedInForecast')) {
                    model.unset('includedInForecast');
                }

                overallAmount = app.math.add(overallAmount, amount_base);
                overallBest = app.math.add(overallBest, best_base);
                overallWorst = app.math.add(overallWorst, worst_base);
            }
        }, this);

        return {
            'likely_case': includedAmount,
            'best_case': includedBest,
            'worst_case': includedWorst,
            'overall_amount': overallAmount,
            'overall_best': overallBest,
            'overall_worst': overallWorst,
            'filtered_amount': filteredAmount,
            'filtered_best': filteredBest,
            'filtered_worst': filteredWorst,
            'timeperiod_id': this.dirtyTimeperiod || this.selectedTimeperiod,
            'lost_count': lostCount,
            'lost_amount': lostAmount,
            'won_count': wonCount,
            'won_amount': wonAmount,
            'included_opp_count': includedCount,
            'total_opp_count': this.collection.length,
            'closed_count': includedClosedCount,
            'closed_amount': includedClosedAmount
        };
    },

    /**
     * We need to overwrite so we pass in the filterd list
     */
    addPreviewEvents: function() {
        //When clicking on eye icon, we need to trigger preview:render with model&collection
        this.context.on('list:preview:fire', function(model) {
            var previewCollection = new Backbone.Collection();
            this.filteredCollection.each(function(model) {
                if (model.get('parent_deleted') !== '1') {
                    previewCollection.add(model);
                }
            }, this);

            if (_.isUndefined(this.previewModel) || model.get('id') != this.previewModel.get('id')) {
                this.previewModel = model;
                app.events.trigger('preview:render', model, previewCollection, true);
            } else {
                // user already has the preview panel open and has clicked the preview icon again
                // remove row decoration
                this.decorateRow();
                // close the preview panel
                app.events.trigger('preview:close');
            }
        }, this);

        //When switching to next/previous record from the preview panel, we need to update the highlighted row
        app.events.on('list:preview:decorate', this.decorateRow, this);
        if (this.layout) {
            this.layout.on('list:sort:fire', function() {
                //When sorting the list view, we need to close the preview panel
                app.events.trigger('preview:close');
            }, this);
        }

        app.events.on('preview:render', function(model) {
            this.previewModel = model;
            this.previewVisible = true;
        }, this);

        app.events.on('preview:close', function() {
            this.previewVisible = false;
            this.previewModel = undefined;
        }, this);
    }
}) }
}}
,
"layouts": {}
,
"datas": {}

},
		"ForecastManagerWorksheets":{"fieldTemplates": {
"base": {
"currency": {"controller": /*
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
 * @class View.Fields.Base.ForecastsManagerWorksheets.CurrencyField
 * @alias SUGAR.App.view.fields.BaseForecastsManagerWorksheetsCurrencyField
 * @extends View.Fields.Base.CurrencyField
 */
({
	// Currency FieldTemplate (base) 

    extendsFrom: 'CurrencyField',

    initialize: function(options) {
        // we need to make a clone of the plugins and then push to the new object. this prevents double plugin
        // registration across ExtendedComponents
        this.plugins = _.clone(this.plugins) || [];
        this.plugins.push('ClickToEdit');
        this._super("initialize", [options]);
    }
}) },
"userLink": {"controller": /*
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
 * @class View.Fields.Base.ForecastsManagerWorksheets.UserLinkField
 * @alias SUGAR.App.view.fields.BaseForecastsManagerWorksheetsUserLinkField
 * @extends View.Fields.Base.BaseField
 */
({
	// UserLink FieldTemplate (base) 

    /**
     * Attach a click event to <a class="worksheetManagerLink"> field
     */
    events: { 'click a.worksheetManagerLink': 'linkClicked' },

    plugins: ['EllipsisInline'],

    /**
     * Holds the user_id for passing into userTemplate
     */
    uid: '',

    initialize: function(options) {
        this.uid = this.model.get('user_id');

        app.view.Field.prototype.initialize.call(this, options);
        return this;
    },

    format: function(value) {
        var su = this.context.get('selectedUser') || this.context.parent.get('selectedUser') || app.user.toJSON();
        if (value == su.full_name && su.id == app.user.get('id')) {
            var hb = Handlebars.compile("{{str key module context}}");
            value = hb({'key': 'LBL_MY_MANAGER_LINE', 'module': this.module, 'context': su});
        }

        return value;
    },

    /**
     * Handle a user link being clicked
     * @param event
     */
    linkClicked: function(event) {
        var uid = $(event.target).data('uid');
        var selectedUser = {
            id: '',
            user_name: '',
            full_name: '',
            first_name: '',
            last_name: '',
            is_manager: false,
            showOpps: false,
            reportees: []
        };

        var options = {
            dataType: 'json',
            success: _.bind(function(data) {
                selectedUser.id = data.id;
                selectedUser.user_name = data.user_name;
                selectedUser.full_name = data.full_name;
                selectedUser.first_name = data.first_name;
                selectedUser.last_name = data.last_name;
                selectedUser.is_manager = data.is_manager;
                selectedUser.reports_to_id = data.reports_to_id;
                selectedUser.reports_to_name = data.reports_to_name;
                selectedUser.is_top_level_manager = data.is_top_level_manager || (data.is_manager && _.isEmpty(data.reports_to_id));

                var su = this.context.get('selectedUser') || this.context.parent.get('selectedUser') || app.user.toJSON();
                // get the current selected user, if the id's match up set the showOpps to be true)
                selectedUser.showOpps = (su.id == data.id);

                this.context.parent.trigger("forecasts:user:changed", selectedUser, this.context.parent);
            }, this)
        };

        myURL = app.api.buildURL('Forecasts', 'user/' + uid);
        app.api.call('read', myURL, null, options);
    }
}) },
"commithistory": {"controller": /*
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
 * @class View.Fields.Base.ForecastsManagerWorksheets.CommithistoryField
 * @alias SUGAR.App.view.fields.BaseForecastsManagerWorksheetsCommithistoryField
 * @extends View.Fields.Base.BaseField
 */
({
	// Commithistory FieldTemplate (base) 

    /**
     * @inheritdoc
     */
    initialize: function(options) {
        this._super('initialize', [options]);

        this.on('render', function() {
            this.loadData();
        }, this);
    },

    /**
     * @inheritdoc
     */
    loadData: function() {
        var ctx = this.context.parent || this.context,
            su = ctx.get('selectedUser') || app.user.toJSON(),
            isManager = this.model.get('is_manager'),
            showOpps = (su.id == this.model.get('user_id')) ? 1 : 0,
            forecastType = app.utils.getForecastType(isManager, showOpps),
            args_filter = [],
            options = {},
            url;

        args_filter.push(
            {"user_id": this.model.get('user_id')},
            {"forecast_type": forecastType},
            {"timeperiod_id": this.view.selectedTimeperiod}
        );

        url = {"url": app.api.buildURL('Forecasts', 'filter'), "filters": {"filter": args_filter}};

        options.success = _.bind(function(data) {
            this.buildLog(data);
        }, this);
        app.api.call('create', url.url, url.filters, options, { context: this });
    },

    /**
     * Build out the History Log
     * @param data
     */
    buildLog: function(data) {
        data = data.records;
        var ctx = this.context.parent || this.context,
            forecastCommitDate = ctx.get('currentForecastCommitDate'),
            commitDate = app.date(forecastCommitDate),
            newestModel = new Backbone.Model(_.first(data)),
        // get everything that is left but the first item.
            otherModels = _.last(data, data.length - 1),
            oldestModel = {},
            displayCommitDate = newestModel.get('date_modified');

        // using for because you can't break out of _.each
        for(var i = 0; i < otherModels.length; i++) {
            // check for the first model equal to or past the forecast commit date
            // we want the last commit just before the whole forecast was committed
            if (app.date(otherModels[i].date_modified) <= commitDate) {
                oldestModel = new Backbone.Model(otherModels[i]);
                break;
            }
        }

        // create the history log
        var tpl = app.template.getField(this.type, 'log', this.module);
        this.$el.html(tpl({
            commit: app.utils.createHistoryLog(oldestModel, newestModel).text,
            commit_date: displayCommitDate
        }));
    },

    /**
     * Override the _render so we can tell it where to render at in the list view
     * @private
     */
    _render: function() {
        // set the $el equal to the place holder so it renders in the correct spot
        this.$el = this.view.$('span[sfuuid="' + this.sfId + '"]');
        this._super('_render');
    }
}) }
}}
,
"views": {
"base": {
"recordlist": {"controller": /*
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
 * Forecast Manager Worksheet Record List.
 *
 * Events
 *
 * forecasts:worksheet:is_dirty
 *  on: this.context.parent || this.context
 *  by: this.dirtyModels 'add' Event
 *  when: a model is added to the dirtModels collection
 *
 * forecasts:worksheet:needs_commit
 *  on: this.context.parent || this.context
 *  by: checkForDraftRows
 *  when: this.collection has a row newer than the last commit date
 *
 * forecasts:worksheet:totals
 *  on: this.context.parent || this.context
 *  by: calculateTotals
 *  when: after it's done calculating totals from a collection change or reset event
 *
 * forecasts:worksheet:saved
 *  on: this.context.parent || this.context
 *  by: saveWorksheet and _worksheetSaveHelper
 *  when: after it's done saving the worksheets to the db for a save draft
 *
 * forecasts:worksheet:commit
 *  on: this.context.parent || this.context
 *  by: forecasts:worksheet:saved event
 *  when: only when the commit button is pressed
 *
 * forecasts:assign_quota
 *  on: this.context.parent || this.context
 *  by: forecasts:worksheet:saved event
 *  when: only when the Assign Quota button is pressed
 *
 * forecasts:sync:start
 *  on: this.context.parent
 *  by: data:sync:start handler
 *  when: this.collection starts syncing
 *
 * forecasts:sync:complete
 *  on: this.context.parent
 *  by: data:sync:complete handler
 *  when: this.collection completes syncing
 *
 * @class View.Views.Base.ForecastsManagerWorksheets.RecordListView
 * @alias SUGAR.App.view.views.BaseForecastsManagerWorksheetsRecordListView
 * @extends View.Views.Base.RecordListView
 */
({
	// Recordlist View (base) 

    /**
     * Who are parent is
     */
    extendsFrom: 'RecordlistView',

    /**
     * what type of worksheet are we?
     */
    worksheetType: 'manager',

    /**
     * Selected User Storage
     */
    selectedUser: {},

    /**
     * Can we edit this worksheet?
     */
    canEdit: true,

    /**
     * Selected Timeperiod Storage
     */
    selectedTimeperiod: {},

    /**
     * Totals Storage
     */
    totals: {},

    /**
     * Default values for the blank rows
     */
    defaultValues: {
        id: '',         // set id to empty so it fails the isNew() check as we don't want this to override the currency
        quota: '0',
        best_case: '0',
        best_case_adjusted: '0',
        likely_case: '0',
        likely_case_adjusted: '0',
        worst_case: '0',
        worst_case_adjusted: '0',
        show_history_log: 0
    },

    /**
     * Navigation Message To Display
     */
    navigationMessage: '',

    /**
     * Special Navigation for the Window Refresh
     */
    routeNavigationMessage: '',

    /**
     * Do we actually need to display a navigation message
     */
    displayNavigationMessage: false,

    /**
     * Only check for draft records once
     */
    hasCheckedForDraftRecords: false,

    /**
     * Draft Save Type
     */
    draftSaveType: undefined,

    /**
     * is the collection syncing
     * @param boolean
     */
    isCollectionSyncing: false,

    /**
     * is the commit history being loading
     * @param boolean
     */
    isLoadingCommits: false,

    /**
     * Target URL of the nav action
     */
    targetURL: '',

    /**
     * Current URL of the module
     */
    currentURL: '',

    /**
     * @inheritdoc
     */
    initialize: function(options) {
        // we need to make a clone of the plugins and then push to the new object. this prevents double plugin
        // registration across ExtendedComponents
        this.plugins = _.without(this.plugins, 'ReorderableColumns', 'MassCollection');
        this.plugins.push('CteTabbing');
        this.plugins.push('DirtyCollection');
        this._super("initialize", [options]);
        this.template = app.template.getView('flex-list', this.module);
        this.selectedUser = this.context.get('selectedUser') || this.context.parent.get('selectedUser') || app.user.toJSON();
        this.selectedTimeperiod = this.context.get('selectedTimePeriod') || this.context.parent.get('selectedTimePeriod') || '';
        this.context.set('skipFetch', (this.selectedUser.is_manager && this.selectedUser.showOpps));    // skip the initial fetch, this will be handled by the changing of the selectedUser
        this.collection.sync = _.bind(this.sync, this);
        this.currentURL = Backbone.history.getFragment();
    },

    /**
     * @inheritdoc
     */
    _dispose: function() {
        if (!_.isUndefined(this.context.parent) && !_.isNull(this.context.parent)) {
            this.context.parent.off(null, null, this);
            if (this.context.parent.has('collection')) {
                this.context.parent.get('collection').off(null, null, this);
            }
        }
        app.routing.offBefore('route', this.beforeRouteHandler, this);
        $(window).off("beforeunload." + this.worksheetType);
        this._super("_dispose");
    },

    /**
     * @inheritdoc
     */
    bindDataChange: function() {
        // these are handlers that we only want to run when the parent module is forecasts
        if (!_.isUndefined(this.context.parent) && !_.isUndefined(this.context.parent.get('model'))) {
            if (this.context.parent.get('model').module == 'Forecasts') {
                this.context.parent.on('button:export_button:click', function() {
                    if (this.layout.isVisible()) {
                        this.exportCallback();
                    }
                }, this);
                // before render has happened, potentially stopping the render from happening
                this.before('render', this.beforeRenderCallback, this);

                // after render has completed
                this.on('render', this.renderCallback, this);

                this.on('list:toggle:column', function(column, isVisible, columnMeta) {
                    // if we hide or show a column, recalculate totals
                    this.calculateTotals();
                }, this);

                // trigger the worksheet save draft code
                this.context.parent.on('button:save_draft_button:click', function() {
                    if (this.layout.isVisible()) {
                        // after we save, trigger the needs_commit event

                        this.context.parent.once('forecasts:worksheet:saved', function() {
                            // clear out the current navigation message
                            this.setNavigationMessage(false, '', '');
                            this.context.parent.trigger('forecasts:worksheet:needs_commit', this.worksheetType);
                        }, this);
                        this.draftSaveType = 'draft';
                        this.saveWorksheet(true);
                    }
                }, this);

                // trigger the worksheet save draft code and then commit the worksheet
                this.context.parent.on('button:commit_button:click', function() {
                    if (this.layout.isVisible()) {
                        // we just need to listen to it once, then we don't want to listen to it any more
                        this.context.parent.once('forecasts:worksheet:saved', function() {
                            this.context.parent.trigger('forecasts:worksheet:commit', this.selectedUser, this.worksheetType, this.getCommitTotals())
                        }, this);
                        this.draftSaveType = 'commit';
                        this.saveWorksheet(false);
                    }
                }, this);

                /**
                 * trigger an event if dirty
                 */
                this.dirtyModels.on("add change reset", function(){
                    if(this.layout.isVisible()){
                        this.context.parent.trigger("forecasts:worksheet:dirty", this.worksheetType, this.dirtyModels.length > 0);
                    }
                }, this);

                /**
                 * Watch for a change to the selectedTimePeriod
                 */
                this.context.parent.on('change:selectedTimePeriod', function(model, changed) {
                    this.updateSelectedTimeperiod(changed);
                }, this);

                /**
                 * Watch for a change int he worksheet totals
                 */
                this.context.parent.on('forecasts:worksheet:totals', function(totals, type) {
                    if (type == this.worksheetType) {
                        var tpl = app.template.getView('recordlist.totals', this.module);
                        this.$el.find('tfoot').remove();
                        this.$el.find('tbody').after(tpl(this));
                    }
                }, this);

                /**
                 * Watch for a change in the selectedUser
                 */
                this.context.parent.on('change:selectedUser', function(model, changed) {
                    this.updateSelectedUser(changed);
                }, this);

                /**
                 * Watch for the currentForecastCommitDate to be updated
                 */
                this.context.parent.on('change:currentForecastCommitDate', function(context, changed) {
                    if (this.layout.isVisible()) {
                        this.checkForDraftRows(changed);
                    }
                }, this);

                if (this.context.parent.has('collection')) {
                    var parentCollection = this.context.parent.get('collection');

                    parentCollection.on('data:sync:start', function() {
                        this.isLoadingCommits = true;
                    }, this);
                    parentCollection.on('data:sync:complete', function() {
                        this.isLoadingCommits = false;
                    }, this);
                }

                this.collection.on('data:sync:start', function() {
                    this.isCollectionSyncing = true;
                    // Begin sync start for buttons
                    this.context.parent.trigger('forecasts:sync:start');
                }, this);

                this.collection.on('data:sync:complete', function() {
                    this.isCollectionSyncing = false;
                    // End sync start for buttons
                    this.context.parent.trigger('forecasts:sync:complete');
                }, this);

                /**
                 * When the collection is reset, we need checkForDraftRows
                 */
                this.collection.on('reset', function() {
                    var ctx = this.context.parent || this.context;
                    ctx.trigger('forecasts:worksheet:is_dirty', this.worksheetType, false);
                    if (this.isLoadingCommits === false) {
                        this.checkForDraftRows(ctx.get('currentForecastCommitDate'));
                    }
                }, this);

                this.collection.on('change:quota', function(model, changed) {
                    // a quota has changed, trigger an event to toggle the assign quota button
                    var ctx = this.context.parent || this.context;
                    ctx.trigger('forecasts:worksheet:quota_changed', this.worksheetType);
                }, this);

                this.context.parent.on('forecasts:worksheet:committed', function() {
                    if (this.layout.isVisible()) {
                        var ctx = this.context.parent || this.context;
                        ctx.trigger('forecasts:worksheet:is_dirty', this.worksheetType, false);
                        this.refreshData();
                        // after a commit, we don't need to check for draft records again
                        this.hasCheckedForDraftRecords = true;
                    }
                }, this);

                this.context.parent.on('forecasts:worksheet:is_dirty', function(worksheetType, is_dirty) {
                    if (this.worksheetType == worksheetType) {
                        if (is_dirty) {
                            this.setNavigationMessage(true, 'LBL_WARN_UNSAVED_CHANGES', 'LBL_WARN_UNSAVED_CHANGES');
                        } else {
                            // worksheet is not dirty,
                            this.cleanUpDirtyModels();
                            this.setNavigationMessage(false, '', '');
                        }
                    }
                }, this);

                this.context.parent.on('button:assign_quota:click', function() {
                    this.context.parent.once('forecasts:worksheet:saved', function() {
                        // clear out the current navigation message
                        this.setNavigationMessage(false, '', '');
                        this.context.parent.trigger('forecasts:assign_quota', this.worksheetType, this.selectedUser, this.selectedTimeperiod);
                    }, this);
                    app.alert.show('saving_quota', {
                        level: 'process',
                        title: app.lang.get('LBL_ASSIGNING_QUOTA', 'Forecasts')
                    });
                    this.draftSaveType = 'assign_quota';
                    this.saveWorksheet(true, true);
                }, this);

                this.context.parent.on('forecasts:quota_assigned', function() {
                    // after the quote has been re-assigned, lets refresh the data just in case.
                    this.refreshData();
                }, this);

                app.routing.before('route', this.beforeRouteHandler, this);

                $(window).bind("beforeunload." + this.worksheetType, _.bind(function() {
                    if (!this.disposed) {
                        var ret = this.showNavigationMessage('window');
                        if (_.isString(ret)) {
                            return ret;
                        }
                    }
                }, this));

                this.layout.on('hide', function() {
                    this.hasCheckedForDraftRecords = false;
                }, this);
            }
        }

        // make sure that the dirtyModels plugin is there
        if (!_.isUndefined(this.dirtyModels)) {
            // when something gets added, the save_draft and commit buttons need to be enabled
            this.dirtyModels.on('add', function() {
                var ctx = this.context.parent || this.context;
                ctx.trigger('forecasts:worksheet:is_dirty', this.worksheetType, true);
            }, this);
        }

        /**
         * Listener for the list:history_log:fire event, this triggers the inline history log to display or hide
         */
        this.context.on('list:history_log:fire', function(model, e) {
            // parent row

            var row_name = model.module + '_' + model.id;

            // check if the row is open, if it is, just destroy it
            var log_row = this.$el.find('tr[name="' + row_name + '_commit_history"]');

            var field;

            // if we have a row, just close it and destroy the field
            if (log_row.length == 1) {
                // remove it and dispose the field
                log_row.remove();
                // find the field
                field = _.find(this.fields, function(field, idx) {
                    return (field.name == row_name + '_commit_history');
                }, this);
                field.dispose();
            } else {
                var rowTpl = app.template.getView('recordlist.commithistory', this.module);
                field = app.view.createField({
                    def: {
                        'type': 'commithistory',
                        'name': row_name + '_commit_history'
                    },
                    view: this,
                    model: model
                });
                this.$el.find('tr[name="' + row_name + '"]').after(rowTpl({
                    module: this.module,
                    id: model.id,
                    placeholder: field.getPlaceholder(),
                    colspan: this._fields.visible.length + this.leftColumns.length + this.rightColumns.length  // do the +1 to account for right side Row Actions
                }));
                field.render();
            }
        }, this);

        // listen for the before list:orderby to handle if the worksheet is dirty or not
        this.before('list:orderby', function(options) {
            if (this.isDirty()) {
                app.alert.show('leave_confirmation', {
                    level: 'confirmation',
                    messages: app.lang.get('LBL_WARN_UNSAVED_CHANGES_CONFIRM_SORT', 'Forecasts'),
                    onConfirm: _.bind(function() {
                        this._setOrderBy(options);
                    }, this)
                });
                return false;
            }
            return true;
        }, this);

        /**
         * On Collection Reset or Change, calculate the totals
         */
        this.collection.on('reset change', function() {
            this.calculateTotals();
        }, this);

        this.layout.on('hide', function() {
            this.totals = {};
        }, this);

        // call the parent
        this._super("bindDataChange");
    },

    /**
     * Handles the before route event so we can show nav messages
     * @returns {*}
     */
    beforeRouteHandler: function() {
        return this.showNavigationMessage('router');
    },

    /**
     * default navigation callback for alert message
     */
    defaultNavCallback: function(){
        this.displayNavigationMessage = false;
        app.router.navigate(this.targetURL, {trigger: true});
    },

    /**
     * Handle Showing of the Navigation messages if any are applicable
     *
     * @param type
     * @returns {*}
     */
    showNavigationMessage: function(type, callback) {
        if (!_.isFunction(callback)) {
            callback = this.defaultNavCallback;
        }
        if (this.layout.isVisible()) {
            var canEdit = this.dirtyCanEdit || this.canEdit;
            if (canEdit && this.displayNavigationMessage) {
                if (type == 'window') {
                    if (!_.isEmpty(this.routeNavigationMessage)) {
                        return app.lang.get(this.routeNavigationMessage, 'Forecasts');
                    }
                    return false;
                }

                this.targetURL = Backbone.history.getFragment();

                //Replace the url hash back to the current staying page
                app.router.navigate(this._currentUrl, {trigger: false, replace: true});

                app.alert.show('leave_confirmation', {
                    level: 'confirmation',
                    messages: app.lang.get(this.navigationMessage, 'Forecasts').split('<br>'),
                    onConfirm: _.bind(function() {
                        callback.call(this);
                    }, this)
                });
                return false;
            }
        }
        return true;
    },

    /**
     * Utility to set the Navigation Message and Flag
     *
     * @param display
     * @param reload_label
     * @param route_label
     */
    setNavigationMessage: function(display, reload_label, route_label) {
        this.displayNavigationMessage = display;
        this.navigationMessage = reload_label;
        this.routeNavigationMessage = route_label;
        this.context.parent.trigger("forecasts:worksheet:navigationMessage", this.navigationMessage);
    },

    /**
     * Custom Method to handle the refreshing of the worksheet Data
     */
    refreshData: function() {
        this.displayLoadingMessage();
        this.collection.fetch();
    },

    /**
     * Set the loading message and have a way to hide it
     */
    displayLoadingMessage: function() {
        app.alert.show('worksheet_loading',
            {level: 'process', title: app.lang.get('LBL_LOADING')}
        );
        this.collection.once('reset', function() {
            app.alert.dismiss('worksheet_loading');
        }, this);
    },

    /**
     * Handle the export callback
     */
    exportCallback: function() {

        if (this.canEdit && this.isDirty()) {
            app.alert.show('leave_confirmation', {
                level: 'confirmation',
                messages: app.lang.get('LBL_WORKSHEET_EXPORT_CONFIRM', 'Forecasts'),
                onConfirm: _.bind(function() {
                    this.doExport();
                }, this)
            });
        } else {
            this.doExport();
        }
    },

    /**
     * Actually run the export
     */
    doExport: function() {
        app.alert.show('massexport_loading', {level: 'process', title: app.lang.get('LBL_LOADING')});
        var params = {
            timeperiod_id: this.selectedTimeperiod,
            user_id: this.selectedUser.id,
            platform: app.config.platform
        };
        var url = app.api.buildURL(this.module, 'export/', null, params);

        app.api.fileDownload(url, {
            complete: function(data) {
                app.alert.dismiss('massexport_loading');
            }
        }, { iframe: this.$el });
    },

    /**
     * Method for the before('render') event
     */
    beforeRenderCallback: function() {
        // if manager is not set or manager == false
        var ret = true;
        if (_.isUndefined(this.selectedUser.is_manager) || this.selectedUser.is_manager == false) {
            ret = false;
        }

        // only render if this.selectedUser.showOpps == false which means
        // we want to display the manager worksheet view
        if (ret) {
            ret = !(this.selectedUser.showOpps);
        }

        // if we are going to stop render but the layout is visible
        if (ret === false && this.layout.isVisible()) {
            // hide the layout
            this.layout.hide();
        }

        // Adjust the label on the quota field if the user doesn't report to any one
        var quotaLabel = _.isEmpty(this.selectedUser.reports_to_id) ? 'LBL_QUOTA' : 'LBL_QUOTA_ADJUSTED';
        _.each(this._fields, function(fields) {
            _.each(fields, function(field) {
                if(field.name == 'quota') {
                    field.label = quotaLabel;
                }
            });
        });

        // empty out the left columns
        this.leftColumns = [];

        return ret;
    },

    /**
     * Method for the on('render') event
     */
    renderCallback: function() {
        var user = this.selectedUser || this.context.parent.get('selectedUser') || app.user.toJSON();
        if (user.is_manager && user.showOpps == false) {
            if (!this.layout.isVisible()) {
                this.layout.once('show', this.calculateTotals, this);
                this.layout.show();
            }

            if (!_.isEmpty(this.totals) && this.layout.isVisible()) {
                var tpl = app.template.getView('recordlist.totals', this.module);
                this.$el.find('tfoot').remove();
                this.$el.find('tbody').after(tpl(this));
            }

            // set the commit button states to match the models
            this.setCommitLogButtonStates();
        } else {
            if (this.layout.isVisible()) {
                this.layout.hide();
            }
        }
    },

    /**
     * Update the selected timeperiod, and run a fetch if the worksheet is visible
     * @param changed
     */
    updateSelectedTimeperiod: function(changed) {
        if (this.displayNavigationMessage) {
            // save the time period just in case
            this.dirtyTimeperiod = this.selectedTimeperiod;
        }

        this.selectedTimeperiod = changed;
        if (this.layout.isVisible()) {
            this.refreshData();
        }
    },

    /**
     * Update the selected user and do a fetch if the criteria is met
     * @param changed
     */
    updateSelectedUser: function(changed) {
        // selected user changed
        var doFetch = false;
        if (this.selectedUser.id != changed.id) {
            doFetch = true;
        }
        if (!doFetch && this.selectedUser.is_manager != changed.is_manager) {
            doFetch = true;
        }
        if (!doFetch && this.selectedUser.showOpps != changed.showOpps) {
            doFetch = !(changed.showOpps);
        }

        if (this.displayNavigationMessage) {
            // save the user just in case
            this.dirtyUser = this.selectedUser;
            this.dirtyCanEdit = this.canEdit;
        }

        this.selectedUser = changed;

        // Set the flag for use in other places around this controller to suppress stuff if we can't edit
        this.canEdit = (this.selectedUser.id == app.user.get('id'));
        this.cleanUpDirtyModels();

        if (doFetch) {
            this.refreshData();
        } else {
            if (this.selectedUser.is_manager && this.selectedUser.showOpps && this.layout.isVisible()) {
                // viewing managers opp worksheet so hide the manager worksheet
                this.layout.hide();
            }
        }
    },

    /**
     * Check the collection for any rows that may have been saved as a draft or rolled up from a reportee commit and
     * trigger the commit button to be enabled
     *
     * @fires forecasts:worksheet:needs_commit
     * @param lastCommitDate
     */
    checkForDraftRows: function(lastCommitDate) {
        var isVisible = this.layout.isVisible();
        if (isVisible && this.canEdit && !_.isUndefined(lastCommitDate)
            && this.collection.length !== 0 && this.hasCheckedForDraftRecords === false &&
            this.isCollectionSyncing === false) {
            this.hasCheckedForDraftRecords = true;
            this.collection.find(function(item) {
                if (item.get('date_modified') > lastCommitDate) {
                    this.context.parent.trigger('forecasts:worksheet:needs_commit', this.worksheetType);
                    return true;
                }
                return false;
            }, this);
        } else if (isVisible && this.canEdit &&_.isUndefined(lastCommitDate) && !this.collection.isEmpty) {
            // if there is no commit date, e.g. new manager with no commits yet
            // but there IS data, then the commit button should be enabled
            this.context.parent.trigger('forecasts:worksheet:needs_commit', this.worksheetType);
        } else if (isVisible === false && this.canEdit && this.hasCheckedForDraftRecords === false) {
            // since the layout is not visible, lets wait for it to become visible
            this.layout.once('show', function() {
                this.checkForDraftRows(lastCommitDate);
            }, this);
        } else if (this.isCollectionSyncing === true) {
            this.collection.once('data:sync:complete', function() {
                this.checkForDraftRows(lastCommitDate);
            }, this);
        }
    },

    /**
     * Handles setting the proper state for the CommitLog Buttons in the row-actions
     */
    setCommitLogButtonStates: function() {
        _.each(this.fields, function(field) {
            if (field.def.event === 'list:history_log:fire') {
                // we have a field that needs to be disabled, so disable it!
                field.setDisabled((field.model.get('show_history_log') == "0"));
                if ((field.model.get('show_history_log') == "0")) {
                    field.$el.find("a.rowaction").attr(
                        "data-original-title",
                        app.lang.get("LBL_NO_COMMIT", "ForecastManagerWorksheets")
                    );
                }
            }
        });
    },

    /**
     * Override the sync method so we can put out custom logic in it
     *
     * @param method
     * @param model
     * @param options
     */
    sync: function(method, model, options) {

        if (!_.isUndefined(this.context.parent) && !_.isUndefined(this.context.parent.get('selectedUser'))) {
            var sl = this.context.parent.get('selectedUser');

            if (sl.is_manager == false) {
                // they are not a manager, we should always hide this if it's not already hidden
                if (this.layout.isVisible()) {
                    this.layout.hide();
                }
                return;
            }
        }

        var callbacks,
            url;

        options = options || {};

        options.params = options.params || {};

        if (!_.isUndefined(this.selectedUser.id)) {
            options.params.user_id = this.selectedUser.id;
        }

        if (!_.isEmpty(this.selectedTimeperiod)) {
            options.params.timeperiod_id = this.selectedTimeperiod;
        }

        options.limit = 1000;
        options = app.data.parseOptionsForSync(method, model, options);

        // custom success handler
        options.success = _.bind(function(model, data, options) {
            this.collectionSuccess(data);
        }, this);

        callbacks = app.data.getSyncCallbacks(method, model, options);
        this.collection.trigger("data:sync:start", method, model, options);

        url = app.api.buildURL("ForecastManagerWorksheets", null, null, options.params);
        app.api.call("read", url, null, callbacks);
    },

    /**
     * Method to handle the success of a collection call to make sure that all reportee's show up in the table
     * even if they don't have data for the user that is asking for it.
     *
     * @param data
     */
    collectionSuccess: function(data) {
        var records = [],
            users = $.map(this.selectedUser.reportees, function(obj) {
                return $.extend(true, {}, obj);
            });

        // put the selected user on top
        users.unshift({id: this.selectedUser.id, name: this.selectedUser.full_name});

        // get the base currency
        var currency_id = app.currency.getBaseCurrencyId(),
            currency_base_rate = app.metadata.getCurrency(app.currency.getBaseCurrencyId()).conversion_rate;

        _.each(users, function(user) {
            var row = _.find(data, function(rec) {
                return (rec.user_id == this.id)
            }, user);
            if (!_.isUndefined(row)) {
                // update the name on the row as this will have the correct formatting for the locale
                row.name = user.name;
            } else {
                row = _.clone(this.defaultValues);
                row.currency_id = currency_id;
                row.base_rate = currency_base_rate;
                row.user_id = user.id;
                row.assigned_user_id = this.selectedUser.id;
                row.draft = (this.selectedUser.id == app.user.id) ? 1 : 0;
                row.name = user.name;
            }
            records.push(row);
        }, this);

        if (!_.isUndefined(this.orderBy)) {
            // lets sort the collection
            if (this.orderBy.field !== 'name') {
                records = _.sortBy(records, function(item) {
                    // typecast values to Number since it's not the 'name'
                    // column (the only string value in the manager worksheet)
                    var val = +item[this.orderBy.field];

                    if (this.orderBy.direction == "desc") {
                        return -val;
                    } else {
                        return val;
                    }
                }, this);
            } else {
                // we have the name
                records.sort(_.bind(function(a, b) {
                    if (this.orderBy.direction == 'asc') {
                        if (a.name.toString() < b.name.toString()) return 1;
                        if (a.name.toString() > b.name.toString()) return -1;
                    } else {
                        if (a.name.toString() < b.name.toString()) return -1;
                        if (a.name.toString() > b.name.toString()) return 1;
                    }
                    return 0;
                }, this));
            }
        }

        this.collection.isEmpty = (_.isEmpty(data));

        this.collection.reset(records);
    },

    /**
     * Calculates the display totals for the worksheet
     *
     * @fires forecasts:worksheet:totals
     */
    calculateTotals: function() {
        if (this.layout.isVisible()) {
            this.totals = this.getCommitTotals();
            this.totals['display_total_label_in'] = _.first(this._fields.visible).name;
            _.each(this._fields.visible, function(field) {
                this.totals[field.name + '_display'] = true;
            }, this);

            var ctx = this.context.parent || this.context;
            // fire an event on the parent context
            ctx.trigger('forecasts:worksheet:totals', this.totals, this.worksheetType);
        }
    },

    /**
     * Gets the numbers needed for a commit
     *
     * @returns {{quota: number, best_case: number, best_adjusted: number, likely_case: number, likely_adjusted: number, worst_case: number, worst_adjusted: number, included_opp_count: number, pipeline_opp_count: number, pipeline_amount: number, closed_amount: number, closed_count: number}}
     */
    getCommitTotals: function() {
        var quota = 0,
            best_case = 0,
            best_case_adjusted = 0,
            likely_case = 0,
            likely_case_adjusted = 0,
            worst_case_adjusted = 0,
            worst_case = 0,
            included_opp_count = 0,
            pipeline_opp_count = 0,
            pipeline_amount = 0,
            closed_amount = 0;


        this.collection.forEach(function(model) {
            var base_rate = parseFloat(model.get('base_rate')),
                mPipeline_opp_count = model.get("pipeline_opp_count"),
                mPipeline_amount = model.get("pipeline_amount"),
                mClosed_amount = model.get("closed_amount"),
                mOpp_count = model.get("opp_count");

            quota = app.math.add(app.currency.convertWithRate(model.get('quota'), base_rate), quota);
            best_case = app.math.add(app.currency.convertWithRate(model.get('best_case'), base_rate), best_case);
            best_case_adjusted = app.math.add(app.currency.convertWithRate(model.get('best_case_adjusted'), base_rate), best_case_adjusted);
            likely_case = app.math.add(app.currency.convertWithRate(model.get('likely_case'), base_rate), likely_case);
            likely_case_adjusted = app.math.add(app.currency.convertWithRate(model.get('likely_case_adjusted'), base_rate), likely_case_adjusted);
            worst_case = app.math.add(app.currency.convertWithRate(model.get('worst_case'), base_rate), worst_case);
            worst_case_adjusted = app.math.add(app.currency.convertWithRate(model.get('worst_case_adjusted'), base_rate), worst_case_adjusted);
            included_opp_count += (_.isUndefined(mOpp_count)) ? 0 : parseInt(mOpp_count);
            pipeline_opp_count += (_.isUndefined(mPipeline_opp_count)) ? 0 : parseInt(mPipeline_opp_count);
            if (!_.isUndefined(mPipeline_amount)) {
                pipeline_amount = app.math.add(pipeline_amount, mPipeline_amount);
            }
            if (!_.isUndefined(mClosed_amount)) {
                closed_amount = app.math.add(closed_amount, mClosed_amount);
            }

        });

        return {
            'quota': quota,
            'best_case': best_case,
            'best_adjusted': best_case_adjusted,
            'likely_case': likely_case,
            'likely_adjusted': likely_case_adjusted,
            'worst_case': worst_case,
            'worst_adjusted': worst_case_adjusted,
            'included_opp_count': included_opp_count,
            'pipeline_opp_count': pipeline_opp_count,
            'pipeline_amount': pipeline_amount,
            'closed_amount': closed_amount,
            'closed_count': (included_opp_count - pipeline_opp_count)
        };
    },

    /**
     * We have to overwrite this method completely, since there is currently no way to completely disable
     * a field from being displayed
     *
     * @returns {{default: Array, available: Array, visible: Array, options: Array}}
     */
    parseFields: function() {
        var catalog = this._super("parseFields");
        _.each(catalog, function(group, i) {
            if (_.isArray(group)) {
                catalog[i] = _.filter(group, function(fieldMeta) {
                    return app.utils.getColumnVisFromKeyMap(fieldMeta.name, 'forecastsWorksheetManager');
                });
            } else {
                // _byId is an Object and _.filter returns data in Array form
                // so just go through _byId this way
                _.each(group, function(fieldMeta) {
                    if (!app.utils.getColumnVisFromKeyMap(fieldMeta.name, 'forecastsWorksheetManager')) {
                        delete group[fieldMeta.name];
                    }
                });
            }
        });
        return catalog;
    },

    /**
     * Call the worksheet save event
     *
     * @fires forecasts:worksheet:saved
     * @param {bool} isDraft
     * @param {bool} [suppressMessage]
     * @returns {number}
     */
    saveWorksheet: function(isDraft, suppressMessage) {
        // only run the save when the worksheet is visible and it has dirty records
        var saveObj = {
                totalToSave: 0,
                saveCount: 0,
                model: undefined,
                isDraft: isDraft,
                suppressMessage: suppressMessage || false,
                timeperiod: this.dirtyTimeperiod,
                userId: this.dirtyUser
            },
            ctx = this.context.parent || this.context;

        if (this.layout.isVisible()) {

            if (_.isUndefined(saveObj.userId)) {
                saveObj.userId = this.selectedUser;
            }
            saveObj.userId = saveObj.userId.id;
            /**
             * If the sheet is dirty, save the dirty rows. Else, if the save is for a commit, and we have
             * draft models (things saved as draft), we need to resave those as committed (version 1). If neither
             * of these conditions are true, then we need to fall through and signal that the save is complete so other
             * actions listening for this can continue.
             */
            if (this.isDirty()) {
                saveObj.totalToSave = this.dirtyModels.length;

                this.dirtyModels.each(function(model) {
                    saveObj.model = model;
                    this._worksheetSaveHelper(saveObj, ctx);
                }, this);

                this.cleanUpDirtyModels();
            } else {
                if (isDraft && saveObj.suppressMessage === false) {
                    app.alert.show('success', {
                        level: 'success',
                        autoClose: true,
                        autoCloseDelay: 10000,
                        title: app.lang.get("LBL_FORECASTS_WIZARD_SUCCESS_TITLE", "Forecasts") + ":",
                        messages: [app.lang.get("LBL_FORECASTS_WORKSHEET_SAVE_DRAFT_SUCCESS", "Forecasts")]
                    });
                }
                ctx.trigger('forecasts:worksheet:saved', saveObj.totalToSave, this.worksheetType, isDraft);
            }
        }

        this.draftSaveType = undefined;

        return saveObj.totalToSave
    },

    /**
     * Helper function for worksheet save
     *
     * @fires forecasts:worksheet:saved
     */
    _worksheetSaveHelper: function(saveObj, ctx) {
        saveObj.model.set({
            id: saveObj.model.get('id') || null,        // we have to set the id back to null if ID is not set
                                                        // so when the xhr runs it knows it's a new model and will use
                                                        // POST vs PUT
            current_user: saveObj.userId || this.selectedUser.id,
            timeperiod_id: saveObj.timeperiod || this.selectedTimeperiod,
            draft_save_type: this.draftSaveType
        }, {silent: true});

        saveObj.model.save({}, {success: _.bind(function() {
            saveObj.saveCount++;
            //if this is the last save, go ahead and trigger the callback;
            if (saveObj.totalToSave === saveObj.saveCount) {
                if (saveObj.isDraft && saveObj.suppressMessage === false) {
                    app.alert.show('success', {
                        level: 'success',
                        autoClose: true,
                        autoCloseDelay: 10000,
                        title: app.lang.get("LBL_FORECASTS_WIZARD_SUCCESS_TITLE", "Forecasts") + ":",
                        messages: [app.lang.get("LBL_FORECASTS_WORKSHEET_SAVE_DRAFT_SUCCESS", "Forecasts")]
                    });
                }
                ctx.trigger('forecasts:worksheet:saved', saveObj.totalToSave, this.worksheetType, saveObj.isDraft);
            }
        }, this), silent: true, alerts: { 'success': false }});
    }
}) }
}}
,
"layouts": {}
,
"datas": {}

},
		"MergeRecords":{"fieldTemplates": {}
,
"views": {}
,
"layouts": {}
,
"datas": {}

},
		"Quotas":{"fieldTemplates": {}
,
"views": {}
,
"layouts": {}
,
"datas": {}

},
		"Teams":{"fieldTemplates": {}
,
"views": {}
,
"layouts": {}
,
"datas": {}

},
		"TeamNotices":{"fieldTemplates": {}
,
"views": {}
,
"layouts": {}
,
"datas": {}

},
		"Manufacturers":{"fieldTemplates": {}
,
"views": {}
,
"layouts": {}
,
"datas": {}

},
		"Activities":{"fieldTemplates": {}
,
"views": {}
,
"layouts": {}
,
"datas": {}

},
		"Comments":{"fieldTemplates": {}
,
"views": {}
,
"layouts": {}
,
"datas": {}

},
		"Subscriptions":{"fieldTemplates": {}
,
"views": {}
,
"layouts": {}
,
"datas": {}

},
		"Bugs":{"fieldTemplates": {}
,
"views": {
"base": {
"record": {"controller": /*
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
 * @class View.Views.Base.Bugs.RecordView
 * @alias SUGAR.App.view.views.BaseBugsRecordView
 * @extends View.Views.Base.RecordView
 */
({
	// Record View (base) 

    extendsFrom: 'RecordView',

    /**
     * @inheritdoc
     */
    initialize: function(options) {
        this.plugins = _.union(this.plugins || [], ['HistoricalSummary', 'KBContent']);
        this._super('initialize', [options]);
    }
}) }
}}
,
"layouts": {}
,
"datas": {}

},
		"Feeds":{"fieldTemplates": {}
,
"views": {}
,
"layouts": {}
,
"datas": {}

},
		"iFrames":{"fieldTemplates": {}
,
"views": {}
,
"layouts": {}
,
"datas": {}

},
		"TimePeriods":{"fieldTemplates": {}
,
"views": {}
,
"layouts": {}
,
"datas": {}

},
		"TaxRates":{"fieldTemplates": {}
,
"views": {}
,
"layouts": {}
,
"datas": {}

},
		"ContractTypes":{"fieldTemplates": {}
,
"views": {}
,
"layouts": {}
,
"datas": {}

},
		"Schedulers":{"fieldTemplates": {}
,
"views": {}
,
"layouts": {}
,
"datas": {}

},
		"ProjectTask":{"fieldTemplates": {}
,
"views": {}
,
"layouts": {}
,
"datas": {}

},
		"Campaigns":{"fieldTemplates": {}
,
"views": {}
,
"layouts": {}
,
"datas": {}

},
		"CampaignLog":{"fieldTemplates": {}
,
"views": {}
,
"layouts": {}
,
"datas": {}

},
		"CampaignTrackers":{"fieldTemplates": {}
,
"views": {}
,
"layouts": {}
,
"datas": {}

},
		"Documents":{"fieldTemplates": {}
,
"views": {}
,
"layouts": {}
,
"datas": {}

},
		"DocumentRevisions":{"fieldTemplates": {}
,
"views": {}
,
"layouts": {}
,
"datas": {}

},
		"Connectors":{"fieldTemplates": {}
,
"views": {}
,
"layouts": {}
,
"datas": {}

},
		"Roles":{"fieldTemplates": {}
,
"views": {}
,
"layouts": {}
,
"datas": {}

},
		"Notifications":{"fieldTemplates": {
"base": {
"severity": {"controller": /*
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
	// Severity FieldTemplate (base) 

    /**
     * Severity Widget.
     *
     * Extends from EnumField widget adding style property according to specific
     * severity.
     */
    extendsFrom: 'EnumField',

    /**
     * An object where its keys map to specific severity and values to matching
     * CSS classes.
     *
     * @property {Object}
     * @protected
     */
    _styleMapping: {
        'default': 'label-unknown',
        alert: 'label-important',
        information: 'label-info',
        other: 'label-inverse',
        success: 'label-success',
        warning: 'label-warning'
    },

    /**
     * @inheritdoc
     *
     * Listen to changes on `is_read` field only if view name matches
     * notifications.
     */
    bindDataChange: function() {
        this._super('bindDataChange');

        if (this.model && this.view.name === 'notifications') {
            this.model.on('change:is_read', this.render, this);
        }
    },

    /**
     * @inheritdoc
     *
     * Inject additional logic to load templates based on different view names
     * according to the following:
     *
     * - `fields/severity/<view-name>-<tpl-name>.hbs`
     * - `fields/severity/<view-template-name>-<tpl-name>.hbs`
     */
    _loadTemplate: function() {
        this._super('_loadTemplate');

        var template = app.template.getField(
            this.type,
            this.view.name + '-' + this.tplName,
            this.model.module
        );

        if (!template && this.view.meta && this.view.meta.template) {
            template = app.template.getField(
                this.type,
                this.view.meta.template + '-' + this.tplName,
                this.model.module
            );
        }

        this.template = template || this.template;
    },

    /**
     * @inheritdoc
     *
     * Defines `severityCss` property based on field value. If current severity
     * does not match a known value its value is used as label and default
     * style is used as well.
     */
    _render: function () {
        var severity = this.model.get(this.name),
            options = app.lang.getAppListStrings(this.def.options);

        this.severityCss = this._styleMapping[severity] || this._styleMapping['default'];
        this.severityLabel = options[severity] || severity;

        this._super('_render');
    }
}) },
"read": {"controller": /*
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
	// Read FieldTemplate (base) 

    events: {
        'click [data-action=toggle]': 'toggleIsRead',
        'mouseover [data-action=toggle]': 'toggleMouse',
        'mouseout [data-action=toggle]': 'toggleMouse'
    },

    plugins: ['Tooltip'],

    /**
     * @inheritdoc
     *
     * The read field is always a readonly field.
     *
     * If `mark_as_read` option is enabled on metadata it means we should
     * automatically mark the notification as read.
     *
     */
    initialize: function(options) {
        options.def.readonly = true;

        this._super('initialize', [options]);

        if (options.def && options.def.mark_as_read) {
            this.markAs(true);
        }
    },

    /**
     * Event handler for mouse events.
     *
     * @param {Event} event Mouse over / mouse out.
     */
    toggleMouse: function(event) {
        var $target= this.$(event.currentTarget),
            isRead = this.model.get('is_read');

        if (!isRead) {
            return;
        }

        var label = event.type === 'mouseover' ? 'LBL_UNREAD' : 'LBL_READ';
        $target.html(app.lang.get(label, this.module));
        $target.toggleClass('label-inverse', event.type === 'mouseover');
    },

    /**
     * Toggle notification `is_read` flag.
     */
    toggleIsRead: function() {
        this.markAs(!this.model.get('is_read'));
    },

    /**
     * Mark notification as read/unread.
     *
     * @param {Boolean} read `True` marks notification as read, `false` as
     *   unread.
     */
    markAs: function(read) {
        if (read === this.model.get('is_read')) {
            return;
        }

        this.model.save({is_read: !!read}, {
            success: _.bind(function() {
                if (!this.disposed) {
                    this.render();
                }
            }, this)
        });
    }
}) }
}}
,
"views": {}
,
"layouts": {}
,
"datas": {}

},
		"Sync":{"fieldTemplates": {}
,
"views": {}
,
"layouts": {}
,
"datas": {}

},
		"WorkFlow":{"fieldTemplates": {}
,
"views": {}
,
"layouts": {}
,
"datas": {}

},
		"EAPM":{"fieldTemplates": {}
,
"views": {}
,
"layouts": {}
,
"datas": {}

},
		"Worksheet":{"fieldTemplates": {}
,
"views": {}
,
"layouts": {}
,
"datas": {}

},
		"Users":{"fieldTemplates": {}
,
"views": {}
,
"layouts": {}
,
"datas": {}

},
		"Employees":{"fieldTemplates": {}
,
"views": {}
,
"layouts": {}
,
"datas": {}

},
		"Administration":{"fieldTemplates": {}
,
"views": {}
,
"layouts": {}
,
"datas": {}

},
		"ACLRoles":{"fieldTemplates": {}
,
"views": {}
,
"layouts": {}
,
"datas": {}

},
		"InboundEmail":{"fieldTemplates": {}
,
"views": {}
,
"layouts": {}
,
"datas": {}

},
		"Releases":{"fieldTemplates": {}
,
"views": {}
,
"layouts": {}
,
"datas": {}

},
		"Prospects":{"fieldTemplates": {}
,
"views": {
"base": {
"record": {"controller": /*
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
	// Record View (base) 

    extendsFrom: 'RecordView',

    /**
     * @inheritdoc
     */
    initialize: function(options) {
        this.plugins = _.union(this.plugins || [], ['HistoricalSummary']);
        this._super('initialize', [options]);
    },

    delegateButtonEvents: function() {
        this.context.on('button:convert_button:click', this.convertProspectClicked, this);
        this._super('delegateButtonEvents');
    },

    convertProspectClicked: function() {
        var prefill = app.data.createBean('Leads');

        prefill.copy(this.model);
        app.drawer.open({
            layout: 'create',
            context: {
                create: true,
                model: prefill,
                module: 'Leads',
                prospect_id: this.model.get('id')
            }
        }, _.bind(function(context, model) {
            //if lead is created, grab the new relationship to the target so the convert-results will refresh
            if (model && model.id && !this.disposed) {
                this.model.fetch();
                _.each(this.context.children, function(child) {
                    if (!_.isUndefined(child.attributes) && !_.isUndefined(child.attributes.isSubpanel)) {
                        if (child.attributes.isSubpanel && !child.attributes.hidden) {
                            child.attributes.collection.fetch();
                        }
                    }
                });
            }
        }, this));

        prefill.trigger('duplicate:field', this.model);
    }
}) },
"convert-results": {"controller": /*
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
	// Convert-results View (base) 

    extendsFrom: 'ConvertResultsView',

    /**
     * Fetches the data for the leads model
     */
    populateResults: function() {
        if (!_.isEmpty(this.model.get('lead_id'))){
            var leads = app.data.createBean('Leads', { id: this.model.get('lead_id')});
            leads.fetch({
                success: _.bind(this.populateLeadCallback, this)
            });
        }
    },

    /**
     * Success callback for retrieving associated lead model
     * @param leadModel
     */
    populateLeadCallback: function (leadModel) {
        var rowTitle;

        this.associatedModels.reset();

        rowTitle = app.lang.get('LBL_CONVERTED_LEAD',this.module);

        leadModel.set('row_title', rowTitle);

        this.associatedModels.push(leadModel);

        app.view.View.prototype.render.call(this);
    }
}) }
}}
,
"layouts": {}
,
"datas": {}

},
		"Queues":{"fieldTemplates": {}
,
"views": {}
,
"layouts": {}
,
"datas": {}

},
		"EmailMarketing":{"fieldTemplates": {}
,
"views": {}
,
"layouts": {}
,
"datas": {}

},
		"EmailTemplates":{"fieldTemplates": {}
,
"views": {}
,
"layouts": {}
,
"datas": {}

},
		"SNIP":{"fieldTemplates": {}
,
"views": {}
,
"layouts": {}
,
"datas": {}

},
		"ProspectLists":{"fieldTemplates": {}
,
"views": {
"base": {
"record": {"controller": /*
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
	// Record View (base) 

    extendsFrom: 'RecordView',

    delegateButtonEvents: function() {
        this.context.on('button:export_button:click', this.exportListMembers, this);
        this._super("delegateButtonEvents");
    },

    /**
     * Event to trigger the Export page level action
     */
    exportListMembers: function() {
        app.alert.show('export_loading', {level: 'process', title: app.lang.get('LBL_LOADING')});
        app.api.exportRecords(
            {
                module: this.module,
                uid: [this.model.id],
                members: true
            },
            this.$el,
            {
                complete: function() {
                    app.alert.dismiss('export_loading');
                }
            }
        );
    }
}) }
}}
,
"layouts": {}
,
"datas": {}

},
		"SavedSearch":{"fieldTemplates": {}
,
"views": {}
,
"layouts": {}
,
"datas": {}

},
		"UpgradeWizard":{"fieldTemplates": {}
,
"views": {}
,
"layouts": {}
,
"datas": {}

},
		"Trackers":{"fieldTemplates": {}
,
"views": {}
,
"layouts": {}
,
"datas": {}

},
		"TrackerPerfs":{"fieldTemplates": {}
,
"views": {}
,
"layouts": {}
,
"datas": {}

},
		"TrackerSessions":{"fieldTemplates": {}
,
"views": {}
,
"layouts": {}
,
"datas": {}

},
		"TrackerQueries":{"fieldTemplates": {}
,
"views": {}
,
"layouts": {}
,
"datas": {}

},
		"FAQ":{"fieldTemplates": {}
,
"views": {}
,
"layouts": {}
,
"datas": {}

},
		"Newsletters":{"fieldTemplates": {}
,
"views": {}
,
"layouts": {}
,
"datas": {}

},
		"SugarFavorites":{"fieldTemplates": {}
,
"views": {}
,
"layouts": {}
,
"datas": {}

},
		"PdfManager":{"fieldTemplates": {}
,
"views": {}
,
"layouts": {}
,
"datas": {}

},
		"OAuthKeys":{"fieldTemplates": {}
,
"views": {}
,
"layouts": {}
,
"datas": {}

},
		"OAuthTokens":{"fieldTemplates": {}
,
"views": {}
,
"layouts": {}
,
"datas": {}

},
		"Filters":{"fieldTemplates": {}
,
"views": {}
,
"layouts": {}
,
"datas": {
"base": {
"model": {"controller": /*
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
 * @class Data.Base.FiltersBean
 * @extends Data.Bean
 */
({
	// Model Data (base) 

    /**
     * @inheritdoc
     */
    defaults: {
        editable: true
    },

    /**
     * Maps field types and field operator types.
     *
     * @property {Object}
     */
    fieldTypeMap: {
        'datetime': 'date',
        'datetimecombo': 'date'
    },

    /**
     * Gets the filter definition based on quick search metadata.
     *
     * The filter definition that is built is based on the `basic` filter
     * metadata. By default, modules will make a search on the `name` field, but
     * this is configurable. For instance, the `person` type modules
     * (e.g. Contacts or Leads) will perform a search on the first name and the
     * last name (`first_name` and `last_name` fields).
     *
     * For these modules whom the search is performed on two fields, you can
     * also configure to split the terms. In this case, the terms are split such
     * that different combinations of the terms are search against each search
     * field.
     *
     * There is a special case if the `moduleName` is `all_modules`: the
     * function will always return an empty filter definition (empty `array`).
     *
     * There is another special case with the `Users` and `Employees` module:
     * the filter will be augmented to retrieve only the records with the
     * `status` set to `Active`.
     *
     * @param {string} moduleName The filtered module.
     * @param {string} searchTerm The search term.
     * @return {Array} This search term filter.
     * @static
     */
    buildSearchTermFilter: function(moduleName, searchTerm) {
        if (moduleName === 'all_modules' || !searchTerm) {
            return [];
        }

        searchTerm = searchTerm.trim();

        var splitTermFilter;
        var filterList = [];
        var searchMeta = app.data.getBeanClass('Filters').prototype.getModuleQuickSearchMeta(moduleName);
        var fieldNames = searchMeta.fieldNames;

        // Iterate through each field and check if the field is a simple
        // or complex field, and build the filter object accordingly
        _.each(fieldNames, function(name) {
            if (!_.isArray(name)) {
                var filter = this._buildFilterDef(name, '$starts', searchTerm);
                if (filter) {
                    // Simple filters are pushed to `filterList`
                    filterList.push(filter);
                }
                return;
            }

            if (splitTermFilter) {
                app.logger.error('Cannot have more than 1 split term filter');
                return;
            }
            splitTermFilter = this._buildSplitTermFilterDef(name, '$starts', searchTerm);
        }, this);

        // Push the split term filter
        if (splitTermFilter) {
            filterList.push(splitTermFilter);
        }

        // If more than 1 filter was created, wrap them in `$or`
        if (filterList.length > 1) {
            var filter = this._joinFilterDefs('$or', filterList);
            if (filter) {
                filterList = [filter];
            }
        }

        // FIXME [SC-3560]: This should be moved to the metadata
        if (moduleName === 'Users' || moduleName === 'Employees') {
            filterList = this._simplifyFilterDef(filterList);
            filterList = [{
                '$and': [
                    {'status': {'$not_equals': 'Inactive'}},
                    filterList
                ]
            }];
        }

        return filterList;
    },

    /**
     * Combines two filters into a single filter definition.
     *
     * @param {Array|Object} [baseFilter] The selected filter definition.
     * @param {Array} [searchTermFilter] The filter for the quick search terms.
     * @return {Array} The filter definition.
     * @static
     */
    combineFilterDefinitions: function(baseFilter, searchTermFilter) {
        var isBaseFilter = _.size(baseFilter) > 0,
            isSearchTermFilter = _.size(searchTermFilter) > 0;

        baseFilter = _.isArray(baseFilter) ? baseFilter : [baseFilter];

        if (isBaseFilter && isSearchTermFilter) {
            baseFilter.push(searchTermFilter[0]);
            return [
                {'$and': baseFilter }
            ];
        } else if (isBaseFilter) {
            return baseFilter;
        } else if (isSearchTermFilter) {
            return searchTermFilter;
        }

        return [];
    },

    /**
     * Gets filterable fields from the module metadata.
     *
     * The list of fields comes from the metadata but is also filtered by
     * user acls (`detail`/`read` action).
     *
     * @param {string} moduleName The name of the module.
     * @return {Object} The filterable fields.
     * @static
     */
    getFilterableFields: function(moduleName) {
        var moduleMeta = app.metadata.getModule(moduleName),
            operatorMap = app.metadata.getFilterOperators(moduleName),
            fieldMeta = moduleMeta.fields,
            fields = {};

        if (moduleMeta.filters) {
            _.each(moduleMeta.filters, function(templateMeta) {
                if (templateMeta.meta && templateMeta.meta.fields) {
                    fields = _.extend(fields, templateMeta.meta.fields);
                }
            });
        }

        _.each(fields, function(fieldFilterDef, fieldName) {
            var fieldMetaData = app.utils.deepCopy(fieldMeta[fieldName]);
            if (_.isEmpty(fieldFilterDef)) {
                fields[fieldName] = fieldMetaData || {};
            } else {
                fields[fieldName] = _.extend({name: fieldName}, fieldMetaData, fieldFilterDef);
            }
            delete fields[fieldName]['readonly'];
        });

        var validFields = {};
        _.each(fields, function(value, key) {
            // Check if we support this field type.
            var type = this.fieldTypeMap[value.type] || value.type;
            var hasAccess = app.acl.hasAccess('detail', moduleName, null, key);
            // Predefined filters don't have operators defined.
            if (hasAccess && (operatorMap[type] || value.predefined_filter === true)) {
                validFields[key] = value;
            }
        }, this);

        return validFields;
    },

    /**
     * Retrieves and caches the quick search metadata.
     *
     * @param {string} [moduleName] The filtered module. Only required when the
     *   function is called statically.
     * @return {Object} Quick search metadata (with highest priority).
     * @return {string[]} return.fieldNames The fields to be used in quick search.
     * @return {boolean} return.splitTerms Whether to split the search terms
     *   when there are multiple search fields.
     * @static
     */
    getModuleQuickSearchMeta: function(moduleName) {
        moduleName = moduleName || this.get('module_name');

        var prototype = app.data.getBeanClass('Filters').prototype;
        prototype._moduleQuickSearchMeta = prototype._moduleQuickSearchMeta || {};

        prototype._moduleQuickSearchMeta[moduleName] = prototype._moduleQuickSearchMeta[moduleName] ||
            this._getQuickSearchMetaByPriority(moduleName);
        return prototype._moduleQuickSearchMeta[moduleName];
    },

    /**
     * Populates empty values of a filter definition.
     *
     * @param {Object} filterDef The filter definition.
     * @param {Object} populateObj Populate object containing the
     *   `filter_populate` metadata definition.
     * @return {Object} The filter definition.
     * @static
     */
    populateFilterDefinition: function(filterDef, populateObj) {
        if (!populateObj) {
            return filterDef;
        }
        filterDef = app.utils.deepCopy(filterDef);
        _.each(filterDef, function(row) {
            _.each(row, function(filter, field) {
                var hasNoOperator = (_.isString(filter) || _.isNumber(filter));
                if (hasNoOperator) {
                    filter = {'$equals': filter};
                }
                var operator = _.keys(filter)[0],
                    value = filter[operator],
                    isValueEmpty = !_.isNumber(value) && _.isEmpty(value);

                if (isValueEmpty && populateObj && !_.isUndefined(populateObj[field])) {
                    value = populateObj[field];
                }

                if (hasNoOperator) {
                    row[field] = value;
                } else {
                    row[field][operator] = value;
                }
            });
        });
        return filterDef;
    },

    /**
     * Retrieves the quick search metadata.
     *
     * The metadata returned is the one that has the highest
     * `quicksearch_priority` property.
     *
     * @param {string} searchModule The filtered module.
     * @return {Object}
     * @return {string[]} return.fieldNames The list of field names.
     * @return {boolean} return.splitTerms Whether to split search terms or not.
     * @private
     * @static
     */
    _getQuickSearchMetaByPriority: function(searchModule) {
        var meta = app.metadata.getModule(searchModule),
            filters = meta ? meta.filters : [],
            fieldNames = [],
            priority = 0,
            splitTerms = false;

        _.each(filters, function(value) {
            if (value && value.meta && value.meta.quicksearch_field &&
                priority < value.meta.quicksearch_priority) {
                fieldNames = value.meta.quicksearch_field;
                priority = value.meta.quicksearch_priority;
                if (_.isBoolean(value.meta.quicksearch_split_terms)) {
                    splitTerms = value.meta.quicksearch_split_terms;
                }
            }
        });

        return {
            fieldNames: fieldNames,
            splitTerms: splitTerms
        };
    },

    /**
     * Returns the first filter from `filterList`, if the length of
     * `filterList` is 1.
     *
     * The *simplified* filter is in the form of the one returned by
     * {@link #_buildFilterDef} or {@link #_joinFilterDefs}.
     *
     * @param {Array} filterList An array of filter definitions.
     *
     * @return {Array|Object} First element of `filterList`, if the
     *   length of the array is 1, otherwise, the original `filterList`.
     * @private
     */
    _simplifyFilterDef: function(filterList) {
        return filterList.length > 1 ? filterList : filterList[0];
    },

    /**
     * Builds a filter definition object.
     *
     * A filter definition object is in the form of:
     *
     *     { fieldName: { operator: searchTerm } }
     *
     * @param {string} fieldName Name of the field to search by.
     * @param {string} operator Operator to search by. As found in `FilterApi#addFilters`.
     * @param {string} searchTerm Search input entered.
     *
     * @return {Object} The search filter definition for quick search.
     * @private
     */
    _buildFilterDef: function(fieldName, operator, searchTerm) {
        var def = {};
        var filter = {};
        filter[operator] = searchTerm;
        def[fieldName] = filter;
        return def;
    },

    /**
     * Joins a list of filter definitions under a logical operator.
     *
     * Supports logical operators such as `$or` and `$and`. Ultimately producing
     * a filter definition structured as:
     *
     *     { operator: filterDefs }
     *
     * @param {string} operator Logical operator to join the filter definitions by.
     * @param {Array|Object} filterDefs Array of filter definitions or individual
     *   filter definition objects.
     *
     * @return {Object|Array} Filter definitions joined under a logical operator,
     *   or a simple filter definition if `filterDefs` is of length 1,
     *   otherwise an empty `Array`.
     * @private
     */
    _joinFilterDefs: function(operator) {
        var filterDefs = Array.prototype.slice.call(arguments, 1);

        if (_.isEmpty(filterDefs)) {
            return [];
        }

        if (_.isArray(filterDefs[0])) {
            filterDefs = filterDefs[0];
        }

        // if the length of the `filterList` is less than 2, then just return the simple filter
        if (filterDefs.length < 2) {
            return filterDefs[0];
        }

        var filter = {};
        filter[operator] = filterDefs;
        return filter;
    },

    /**
     * Builds a filter object by using unique combination of the
     * searchTerm delimited by spaces.
     *
     * @param {Array} fieldNames Field within `quicksearch_field`
     *   in the metadata to perform split term filtering.
     * @param {string} operator Operator to search by. As found in `FilterApi#addFilters`.
     * @param {string} searchTerm Search input entered.
     *
     * @return {Object|undefined} The search filter definition for
     *   quick search or `undefined` if no filter to apply or supported.
     * @private
     */
    _buildSplitTermFilterDef: function(fieldNames, operator, searchTerm) {
        if (fieldNames.length > 2) {
            app.logger.error('Cannot have more than 2 fields in a complex filter');
            return;
        }

        // If the field is a split-term field, but only composed of single item
        // return the simple filter
        if (fieldNames.length === 1) {
            return this._buildFilterDef(fieldNames[0], operator, searchTerm);
        }

        var filterList = [];
        var tokens = searchTerm.split(' ');

        // When the searchTerm is composed of at least 2 terms delimited by a space character,
        // Divide the searchTerm in 2 unique sets
        // e.g. For the name "Jean Paul Durand",
        // first = "Jean", rest = "Paul Durand" (1st iteration)
        // first = "Jean Paul", rest = "Durand" (2nd iteration)
        for (var i = 1; i < tokens.length; ++i) {
            var first = _.first(tokens, i).join(' ');
            var rest = _.rest(tokens, i).join(' ');

            // FIXME the order of the filters need to be reviewed (TY-547)
            var tokenFilter = [
                this._buildFilterDef(fieldNames[0], operator, first),
                this._buildFilterDef(fieldNames[1], operator, rest)
            ];
            filterList.push(this._joinFilterDefs('$and', tokenFilter));
        }

        // Try with full search term in each field
        // e.g. `first_name: Sangyoun Kim` or `last_name: Sangyoun Kim`
        _.each(fieldNames, function(name) {
            filterList.push(this._buildFilterDef(name, operator, searchTerm));
        }, this);

        return this._joinFilterDefs('$or', filterList);
    }
}) },
"collection": {"controller": /*
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
 * This `FiltersCollection` is designed to be used like:
 *
 *     filters = app.data.createBeanCollection('Filters');
 *     filters.setModuleName('Accounts');
 *     filters.setFilterOptions(filterOptions); // Optional
 *     filters.load({
	// Collection Data (base) 

 *         success: _.bind(function() {
 *             // You can start using `filters.collection`
 *         }, this)
 *     });
 *
 * Even though {@link #load} and {@link #collection} are the recommended way to
 * manipulate the filters of a module, you can still use this `BeanCollection`
 * in a more traditional way.
 *
 *     filters = app.data.createBeanCollection('Filters');
 *     filters.fetch({
 *         filter: [
 *             {'created_by': app.user.id},
 *             {'module_name': module}
 *         ],
 *         success: _.bind(function() {
 *             // You can start using the collection
 *         }, this)
 *     });
 *
 * **Note** that in this case you're not taking advantage of the internal cache
 * memory.
 *
 * @class Data.Base.FiltersBeanCollection
 * @extends Data.BeanCollection
 */
({
    /**
     * This is the public and recommended API for manipulating the collection
     * of filters of a module.
     *
     * {@link #load} will create this collection provided that you set the
     * module name with {@link #setModuleName}.
     *
     * @property {Backbone.Collection|null}
     */
    collection: null,

    /**
     * The filter options used by {@link #load} when retrieving and building the
     * filter collection.
     *
     * See {@link #setFilterOptions}.
     *
     * @property {Object}
     * @private
     */
    _filterOptions: {},

    /**
     * Clears the filter options for the next call to {@link #load}.
     *
     * @chainable
     */
    clearFilterOptions: function() {
        this._filterOptions = {};
        return this;
    },

    /**
     * Maintains the filters collection in sorted order.
     *
     * User's filters will be positioned first in the collection, the
     * predefined filters will be positioned second.
     *
     * @param {Data.Bean} model1 The first model.
     * @param {Data.Bean} model2 The second model.
     * @return {Number} If `-1`, the first model goes before the second model,
     *   if `1`, the first model goes after the second model.
     */
    comparator: function(model1, model2) {
        if (model1.get('editable') === false && model2.get('editable') !== false) {
            return 1;
        }
        if (model1.get('editable') !== false && model2.get('editable') === false) {
            return -1;
        }
        if (this._getTranslatedFilterName(model1).toLowerCase() < this._getTranslatedFilterName(model2).toLowerCase()) {
            return -1;
        }
        return 1;
    },

    /**
     * Retrieves the list of filters of a module.
     *
     * The list includes predefined filters (defined in the metadata) as well as
     * the current user's filters.
     *
     * The collection is saved in memory the first time filters are retrieved,
     * so next calls to {@link #load} will just return the cached version.
     *
     * **Note:** Template filters are retrieved and saved in memory but are not
     * in the collection unless you pass the `initial_filter` options. See
     * {@link #setFilterOptions}. Only one template filter can be available at
     * a time.
     *
     * @param {Object} [options]
     * @param {Function} [options.success] Callback function to execute code
     *   once the filters are successfully retrieved.
     * @param {Function} [options.error] Callback function to execute code
     *   in case an error occured when retrieving filters.
     */
    load: function(options) {
        options = options || {};

        var module = this.moduleName,
            prototype = this._getPrototype(),
            collection;

        if (!module) {
            app.logger.error('This Filters collection has no module defined.');
            return;
        }

        if (this.collection) {
            this.collection.off();
        }

        // Make sure only one request is sent for each module.
        prototype._request = prototype._request || {};
        if (prototype._request[module]) {
            prototype._request[module].xhr.done(_.bind(function() {
                this._onSuccessCallback(options.success);
            }, this));
            return;
        }

        // Try to retrieve cached filters.
        prototype._cache = prototype._cache || {};
        if (prototype._cache[module]) {
            this._onSuccessCallback(options.success);
            return;
        }

        this._initFiltersModuleCache();

        // No cache found, retrieve filters.
        this._loadPredefinedFilters();

        var requestObj = {
            showAlerts: false,
            filter: [
                {'created_by': app.user.id},
                {'module_name': module}
            ],
            success: _.bind(function(models) {
                this._cacheFilters(models);
                this._onSuccessCallback(options.success);
            }, this),
            complete: function() {
                delete prototype._request[module];
            },
            error: function() {
                if (_.isFunction(options.error)) {
                    options.error();
                } else {
                    app.logger.error('Unable to get filters from the server.');
                }
            }
        };
        prototype._request[module] = prototype.fetch.call(this, requestObj);
    },

    /**
     * Defines the module name of the filter collection. This is mandatory in
     * order to use {@link #load}.
     *
     * @param {String} module The module name.
     * @chainable
     */
    setModuleName: function(module) {
        this.moduleName = module;
        return this;
    },

    /**
     * Defines the filter options used by {@link #load}.
     *
     * **Options supported:**
     *
     * - `{String} [initial_filter]` The id of the template filter.
     *
     * - `{String} [initial_filter_lang_modules]` The list of modules to look up
     *   the filter label string.
     *
     * - `{String} [filter_populate]` The populate hash in case we want to
     *   create a relate template filter on the fly.
     *
     * Filter options can be cleared with {@link #clearFilterOptions}.
     *
     * @param {String|Object} key The name of the option, or an hash of
     *   options.
     * @param {Mixed} [val] The default value for the `key` argument.
     * @chainable
     */
    setFilterOptions: function(key, val) {
        var options;
        if (_.isObject(key)) {
            options = key;
        } else {
            (options = {})[key] = val;
        }
        this._filterOptions = _.extend({}, this._filterOptions, options);
        return this;
    },

    /**
     * Saves the list of filters in memory.
     *
     * This allows us not to parse the metadata everytime in order to get the
     * predefined and template filters, and not to fetch the API everytime in
     * order to get the user's filters.
     *
     * @param {Mixed} models A list of filters (`Backbone.Collection` or
     *   `Object[]`) or one filter (`Data.Base.FiltersBean` or `Object`).
     * @private
     */
    _cacheFilters: function(models) {
        if (!models) {
            return;
        }
        var filters = _.isFunction(models.toJSON) ? models.toJSON() : models;
        filters = _.isArray(filters) ? filters : [filters];

        var prototype = this._getPrototype();
        _.each(filters, function(filter) {
            if (filter.editable === false) {
                prototype._cache[this.moduleName].predefined[filter.id] = filter;
            } else if (filter.is_template) {
                prototype._cache[this.moduleName].template[filter.id] = filter;
            } else {
                prototype._cache[this.moduleName].user[filter.id] = filter;
            }
        }, this);
    },

    /**
     * Create the collection of filters.
     *
     * The collection contains predefined filters and the current user's
     * filters.
     *
     * @return {Backbone.Collection} The collection of filters.
     * @private
     */
    _createCachedCollection: function() {
        var prototype = app.data.getCollectionClasses().Filters.prototype,
            module = this.moduleName,
            collection;

        // Creating the collection class.
        prototype._cachedCollection = prototype._cachedCollection || Backbone.Collection.extend({
            model: app.data.getBeanClass('Filters'),
            _setInitialFilter: this._setInitialFilter,
            comparator: this.comparator,
            _getPrototype: this._getPrototype,
            _getTranslatedFilterName: this._getTranslatedFilterName,
            _cacheFilters: this._cacheFilters,
            _updateFilterCache: this._updateFilterCache,
            _removeFilterCache: this._removeFilterCache,
            initialize: function(models, options) {
                this.on('add', this._cacheFilters, this);
                this.on('cache:update', this._updateFilterCache, this);
                this.on('remove', this._removeFilterCache, this);
            }
        });

        collection = new prototype._cachedCollection();
        collection.moduleName = module;
        collection._filterOptions = this._filterOptions;
        collection.defaultFilterFromMeta = prototype._cache[module].defaultFilterFromMeta;
        // Important to pass silent `true` to avoid saving in memory again.
        collection.add(_.toArray(prototype._cache[module].predefined), {silent: true});
        collection.add(_.toArray(prototype._cache[module].user), {silent: true});

        return collection;
    },

    /**
     * Gets the translated name of a filter.
     *
     * If the model is not editable or is a template, the filter name must be
     * defined as a label that is internationalized.
     * We allow injecting the translated module name into filter names.
     *
     * @param {Data.Bean} model The filter model.
     * @return {String} The translated filter name.
     * @private
     */
    _getTranslatedFilterName: function(model) {
        var name = model.get('name') || '';

        if (model.get('editable') !== false && !model.get('is_template')) {
            return name;
        }
        var module = model.get('module_name') || this.moduleName;

        var fallbackLangModules = model.langModules || [module, 'Filters'];
        var moduleName = app.lang.getModuleName(module, {plural: true});
        var text = app.lang.get(name, fallbackLangModules) || '';
        return app.utils.formatString(text, [moduleName]);
    },

    /**
     * Loads predefined filters from metadata and stores them in memory.
     *
     * Also determines the default filter. The default filter will be the last
     * `default_filter` property found in the filters metadata.
     *
     * @private
     */
    _loadPredefinedFilters: function() {
        var cache = this._getPrototype()._cache[this.moduleName],
            moduleMeta = app.metadata.getModule(this.moduleName);

        if (!moduleMeta) {
            app.logger.error('The module "' + this.moduleName + '" has no metadata.');
            return;
        }

        var moduleFilterMeta = moduleMeta.filters;
        if (!moduleFilterMeta) {
            app.logger.error('The module "' + this.moduleName + '" has no filter metadata.');
            return;
        }

        _.each(moduleFilterMeta, function(template) {
            if (!template || !template.meta) {
                return;
            }
            if (_.isArray(template.meta.filters)) {
                this._cacheFilters(template.meta.filters);
            }
            if (template.meta.default_filter) {
                cache.defaultFilterFromMeta = template.meta.default_filter;
            }
        }, this);
    },

    /**
     * Success callback applied once filters are retrieved in order to prepare
     * the bean collection.
     *
     * @param {Function} [callback] Custom success callback. The collection is
     *   readily available as the first argument to this callback function.
     * @private
     */
    _onSuccessCallback: function(callback) {
        this.collection = this._createCachedCollection();
        if (this._filterOptions.initial_filter) {
            this.collection._setInitialFilter();
        }

        if (_.isFunction(callback)) {
            callback(this.collection);
        }
    },

    /**
     * Sets an initial/template filter to the collection.
     *
     * Filter options:
     *
     * If the `initial_filter` id is `$relate`, a new filter will be created for
     * you, and will be populated by `filter_populate` definition.
     *
     * If you pass any other `initial_filter` id, the function will look up for
     * this template filter in memory and create it.
     *
     * @private
     */
    _setInitialFilter: function() {
        var filterId = this._filterOptions.initial_filter;

        if (!filterId) {
            return;
        }

        if (filterId === '$relate') {
            var filterDef = {};
            _.each(this._filterOptions.filter_populate, function(value, key) {
                filterDef[key] = '';
            });
            this.add([
                {
                    'id': '$relate',
                    'editable': true,
                    'is_template': true,
                    'filter_definition': [filterDef]
                }
            ], {silent: true});
        } else {
            var prototype = this._getPrototype();
            var filter = prototype._cache[this.moduleName].template[filterId];
            if (!filter) {
                return;
            }
            this.add(filter, {silent: true});
        }
        this.get(filterId).set('name', this._filterOptions.initial_filter_label);
        this.get(filterId).langModules = this._filterOptions.initial_filter_lang_modules;
    },

    /**
     * Saves the list of filters in memory.
     *
     * Only user's filters are refreshed. We want to ignore changes to template
     * filters and predefined filters.
     *
     * @param {Data.Base.FiltersBean|Object} model The filter model to update in
     *   memory.
     * @param {String} model.id The filter id.
     * @private
     */
    _updateFilterCache: function(model) {
        if (!model) {
            return;
        }
        var attributes = _.isFunction(model.toJSON) ? model.toJSON() : model;
        if (attributes.is_template || attributes.editable === false) {
            return;
        }
        this._cacheFilters(model);
    },

    /**
     * Removes a filter stored in memory.
     *
     * @param {Data.Base.FiltersBean|Object} model The filter model to remove
     *   from memory.
     * @param {String} model.id The filter id.
     * @private
     */
    _removeFilterCache: function(model) {
        var prototype = this._getPrototype();
        delete prototype._cache[this.moduleName].predefined[model.id];
        delete prototype._cache[this.moduleName].template[model.id];
        delete prototype._cache[this.moduleName].user[model.id];
    },

    /**
     * Initializes the filter cache for this module.
     *
     * @private
     */
    _initFiltersModuleCache: function() {
        var prototype = this._getPrototype();
        prototype._cache = prototype._cache || {};
        prototype._cache[this.moduleName] = {
            defaultFilterFromMeta: null,
            predefined: {},
            template: {},
            user: {}
        };
    },

    /**
     * Clears all the filters and their associated HTTP requests from the cache.
     */
    resetFiltersCacheAndRequests: function() {
        var prototype = this._getPrototype();
        prototype._cache = {};
        _.each(prototype._request, function(request, module) {
            request.xhr.abort();
        });
        prototype._request = {};
    },

    /**
     * Gets the prototype object of this class.
     *
     * @return {Object} The prototype.
     * @private
     */
    _getPrototype: function() {
        return app.data.getCollectionClasses().Filters.prototype;
    },

    /**
     * Removes all the listeners.
     */
    dispose: function() {
        if (this.collection) {
            this.collection.off();
        }
        this.off();
    }
}) }
}}

},
		"UserSignatures":{"fieldTemplates": {}
,
"views": {}
,
"layouts": {}
,
"datas": {}

},
		"Shippers":{"fieldTemplates": {}
,
"views": {}
,
"layouts": {}
,
"datas": {}

},
		"Styleguide":{"fieldTemplates": {}
,
"views": {
"base": {
"docs-components-progress": {"controller": /*
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
	// Docs-components-progress View (base) 

    className: 'container-fluid'
}) },
"docs-base-grid": {"controller": /*
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
	// Docs-base-grid View (base) 

    className: 'container-fluid'
}) },
"docs-forms-range": {"controller": /*
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
	// Docs-forms-range View (base) 

    className: 'container-fluid',

    // forms range
    _renderHtml: function () {
        this._super('_renderHtml');

        var fieldSettings = {
            view: this,
            def: {
                name: 'include',
                type: 'range',
                view: 'edit',
                sliderType: 'connected',
                minRange: 0,
                maxRange: 100,
                'default': true,
                enabled: true
            },
            viewName: 'edit',
            context: this.context,
            module: this.module,
            model: this.model,
            meta: app.metadata.getField('range')
        },
        rangeField = app.view.createField(fieldSettings);

        this.$('#test_slider').append(rangeField.el);

        rangeField.render();

        rangeField.sliderDoneDelegate = function(minField, maxField) {
            return function(value) {
                minField.val(value.min);
                maxField.val(value.max);
            };
        }(this.$('#test_slider_min'), this.$('#test_slider_max'));
    }
}) },
"docs-components-keybindings": {"controller": /*
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
	// Docs-components-keybindings View (base) 

    className: 'container-fluid',

    _renderHtml: function () {
        this._super('_renderHtml');
    }
}) },
"docs-charts-horizontal": {"controller": /*
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
	// Docs-charts-horizontal View (base) 

    className: 'container-fluid',

    // charts horizontal
    _renderHtml: function() {
        this._super('_renderHtml');

        // Multibar Horizontal Chart
        this.chart1 = nv.models.multiBarChart()
              .vertical(false)
              .margin({top: 10, right: 10, bottom: 10, left: 10})
              .showValues(true)
              .showTitle(false)
              .tooltips(true)
              .stacked(true)
              .showControls(false)
              .direction(app.lang.direction)
              .tooltipContent(function(key, x, y, e, graph) {
                return '<p>Outcome: <b>' + key + '</b></p>' +
                       '<p>Lead Source: <b>' + x + '</b></p>' +
                       '<p>Amount: <b>$' + parseInt(y) + 'K</b></p>';
                });
        this.chart1.yAxis
            .tickFormat(d3.format(',.2f'));
        nv.utils.windowResize(this.chart1.update);

        // Multibar Horizontal Chart with Baseline
        this.chart2 = nv.models.multiBarChart()
              .vertical(false)
              .margin({top: 10, right: 10, bottom: 10, left: 10})
              .showValues(true)
              .showTitle(false)
              .tooltips(true)
              .showControls(false)
              .stacked(false)
              .direction(app.lang.direction)
              .tooltipContent(function(key, x, y, e, graph) {
                return '<p>Outcome: <b>' + key + '</b></p>' +
                       '<p>Lead Source: <b>' + x + '</b></p>' +
                       '<p>Amount: <b>$' + parseInt(y) + 'K</b></p>';
              });
        this.chart2.yAxis
            .tickFormat(d3.format(',.2f'));
        nv.utils.windowResize(this.chart2.update);

        this.loadData();
    },

    loadData: function(options) {
        // Multibar Horizontal Chart
        d3.json('styleguide/content/charts/data/multibar_data_opportunities.json', _.bind(function(data) {
            d3.select('#horiz1 svg')
                .datum(data)
              .transition().duration(500)
                .call(this.chart1);
        }, this));

        // Multibar Horizontal Chart with Baseline
        d3.json('styleguide/content/charts/data/multibar_data_negative.json', _.bind(function(data) {
            d3.select('#horiz2 svg')
                .datum(data)
              .transition().duration(500)
                .call(this.chart2);
        }, this));

        //this._super('loadData', [options]);
    }
}) },
"docs-layouts-modals": {"controller": /*
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
	// Docs-layouts-modals View (base) 

    className: 'container-fluid',

    // layouts modals
    _renderHtml: function () {
        this._super('_renderHtml');

        this.$('[rel=popover]').popover();

        this.$('.modal').tooltip({
          selector: '[rel=tooltip]'
        });
        this.$('#dp1').datepicker({
          format: 'mm-dd-yyyy'
        });
        this.$('#dp3').datepicker();
        this.$('#tp1').timepicker();
    }
}) },
"docs-forms-jstree": {"controller": /*
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
	// Docs-forms-jstree View (base) 

    className: 'container-fluid',

    // forms jstree
    _renderHtml: function () {
        var self = this;

        this._super('_renderHtml');

        this.$('#people').jstree({
            "json_data" : {
                "data" : [
                    {
                        "data" : "Sabra Khan",
                        "state" : "open",
                        "metadata" : { id : 1 },
                        "children" : [
                            {"data" : "Mark Gibson","metadata" : { id : 2 }},
                            {"data" : "James Joplin","metadata" : { id : 3 }},
                            {"data" : "Terrence Li","metadata" : { id : 4 }},
                            {"data" : "Amy McCray",
                                "metadata" : { id : 5 },
                                "children" : [
                                    {"data" : "Troy McClure","metadata" : {id : 6}},
                                    {"data" : "James Kirk","metadata" : {id : 7}}
                                ]
                            }
                        ]
                    }
                ]
            },
            // "themes" : { "theme" : "default", "dots" : false },
            "plugins" : [ "json_data", "ui", "types" ]
        })
        .bind('loaded.jstree', function () {
            // do stuff when tree is loaded
            self.$('#people').addClass('jstree-sugar');
            self.$('#people > ul').addClass('list');
            self.$('#people > ul > li > a').addClass('jstree-clicked');
        })
        .bind('select_node.jstree', function (e, data) {
            data.inst.toggle_node(data.rslt.obj);
        });
    }
}) },
"field": {"controller": /*
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
	// Field View (base) 

    className: 'container-fluid',
    section: {},
    useTable: true,
    parent_link: '',
    tempfields: [],

    _render: function() {
        var self = this,
            fieldTypeReq = this.context.get('field_type'),
            fieldTypes = (fieldTypeReq === 'all' ? ['text','bool','date','datetimecombo','currency','email'] : [fieldTypeReq]),
                //'textarea','url','phone','password','full_name'
            fieldStates = ['detail','edit','error','disabled'],
            fieldLayouts = ['base','record','list'],
            fieldMeta = {};

        this.section.title = 'Form Elements';
        this.section.description = 'Basic fields that support detail, record, and edit modes with error addons.';
        this.useTable = (fieldTypeReq === 'all' ? true : false);
        this.parent_link = (fieldTypeReq === 'all' ? 'docs/index-forms' : 'field/all');
        this.tempfields = [];

        _.each(fieldTypes, function(fieldType){

            //build meta data for field examples from model fields
            fieldMeta = _.find(self.model.fields, function(field) {
                if (field.type === 'datetime' && fieldType.indexOf('date') === 0) {
                    field.type = fieldType;
                }
                return field.type === fieldType;
            }, self);

            //insert metadata into array for hbs template
            if (fieldMeta) {
                var metaData = self.meta['template_values'][fieldType];

                if (_.isObject(metaData) && !_.isArray(metaData)) {
                    _.each(metaData, function(value, name) {
                        self.model.set(name, value);
                    }, self);
                } else {
                    self.model.set(fieldMeta.name, metaData);
                }

                self.tempfields.push(fieldMeta);
            }
        });

        this._super('_render');

        //render example fields into accordion grids
        //e.g., ['text','bool','date','datetimecombo','currency','email']
        _.each(fieldTypes, function(fieldType){

            var fieldMeta = _.find(self.tempfields, function(field) {
                    return field.type === fieldType;
                }, self);

            //e.g., ['detail','edit','error','disabled']
            _.each(fieldStates, function(fieldState) {

                //e.g., ['base','record','list']
                _.each(fieldLayouts, function(fieldLayout) {
                    var fieldTemplate = fieldState;

                    //set field view template name
                    if (fieldLayout === 'list') {
                        if (fieldState === 'edit') {
                            fieldTemplate = 'list-edit';
                        } else {
                            fieldTemplate = 'list';
                        }
                    } else if (fieldState === 'error') {
                        fieldTemplate = 'edit';
                    }

                    var fieldSettings = {
                            view: self,
                            def: {
                                name: fieldMeta.name,
                                type: fieldType,
                                view: fieldTemplate,
                                default: true,
                                enabled: fieldState === 'disabled' ? false : true
                            },
                            viewName: fieldTemplate,
                            context: self.context,
                            module: self.module,
                            model: self.model,
                            meta: fieldMeta
                        };

                    var fieldObject = app.view.createField(fieldSettings),
                        fieldDivId = '#' + fieldType + '_' + fieldState + '_' + fieldLayout;

                    //pre render field setup
                    if (fieldState !== 'detail') {
                        if (!fieldObject.plugins || !_.contains(fieldObject.plugins, "ListEditable") || fieldLayout !== 'list') {
                            fieldObject.setMode('edit');
                        } else {
                            fieldObject.setMode('list-edit');
                        }
                    }
                    if (fieldState === 'disabled') {
                        fieldObject.setDisabled(true);
                    }

                    //render field
                    self.$(fieldDivId).append(fieldObject.el);
                    fieldObject.render();

                    //post render field setup
                    if (fieldType === 'currency' && fieldState === 'edit') {
                        fieldObject.setMode('edit');
                    }
                    if (fieldState === 'error') {
                        if (fieldType === 'email') {
                            var errors = {email: ['primary@example.info']};
                            fieldObject.decorateError(errors);
                        } else {
                            fieldObject.setMode('edit');
                            fieldObject.decorateError('You did a bad, bad thing.');
                        }
                    }
                });

            });

            if (fieldTypeReq !== 'all') {
                self.title = fieldTypeReq + ' field';
                var descTpl = app.template.getView('styleguide.' + fieldTypeReq, self.module);
                if (descTpl) {
                    self.description = descTpl();
                }
            }
        });
    }
}) },
"docs-components-tooltips": {"controller": /*
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
	// Docs-components-tooltips View (base) 

    className: 'container-fluid',

    //components tooltips
    _renderHtml: function () {
        this._super('_renderHtml');

        this.$('#tooltips').tooltip({
            selector: '[rel=tooltip]'
        });
    }
}) },
"docs-charts-custom": {"controller": /*
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
	// Docs-charts-custom View (base) 

  className: 'container-fluid',

  // charts custom
  _renderHtml: function() {
    this._super('_renderHtml');

    // Funnel Chart
    d3.json('styleguide/content/charts/data/funnel_data.json', function(data) {
      nv.addGraph(function() {
        var chart = nv.models.funnelChart()
              .showTitle(false)
              .direction(app.lang.direction)
              .fmtValueLabel(function(d) { return '$' + (d.label || d.value || d) + 'K'; })
              .tooltipContent(function(key, x, y, e, graph) {
                return '<p>Stage: <b>' + key + '</b></p>' +
                       '<p>Amount: <b>$' + parseInt(y, 10) + 'K</b></p>' +
                       '<p>Percent: <b>' + x + '%</b></p>';
              });

        d3.select('#funnel1 svg')
            .datum(data)
          .transition().duration(500)
            .call(chart);

        return chart;
      });
    });

    // Gauge Chart
    d3.json('styleguide/content/charts/data/gauge_data.json', function(data) {
      nv.addGraph(function() {
        var gauge = nv.models.gaugeChart()
              .x(function(d) { return d.key; })
              .y(function(d) { return d.y; })
              .showLabels(true)
              .showTitle(false)
              .colorData('default')
              .ringWidth(50)
              .maxValue(9)
              .direction(app.lang.direction)
              .transitionMs(4000);

        d3.select('#gauge svg')
            .datum(data)
          .transition().duration(500)
            .call(gauge);

        return gauge;
      });
    });

    // Treemap flare chart
    d3.json('styleguide/content/charts/data/flare.json', function(data) {
      nv.addGraph(function() {

        var chart = nv.models.treemapChart()
              .leafClick(function(d) {
                alert('leaf clicked');
              })
              .showTitle(false)
              .tooltips(true)
              .getSize(function(d) { return d.size; })
              .direction(app.lang.direction)
              .colorData('default');

        d3.select('#treemap1 svg')
            .datum(data)
          .transition().duration(500)
            .call(chart);

        return chart;
      });
    });

    // Tree org chart
    d3.json('styleguide/content/charts/data/tree_data.json', function(data) {
      nv.addGraph(function() {

        var nodeRenderer = function(d) {
          return '<img src="styleguide/content/charts/img/' + d.image +
            '" class="rep-avatar" width="32" height="32"><div class="rep-name">' + d.name +
            '</div><div class="rep-title">' + d.title + '</div>';
        };

        var chart = nv.models.tree()
              .duration(300)
              .nodeSize({ 'width': 124, 'height': 56 })
              .nodeRenderer(nodeRenderer)
              .zoomExtents({ 'min': 0.25, 'max': 4 });

        d3.select('#org svg')
            .datum(data)
          .transition().duration(700)
            .call(chart);

        nv.utils.windowResize(function() { chart.resize(); });

        return chart;
      });
    });

    // Bubble chart
    nv.addGraph(function() {
      var format = d3.time.format('%Y-%m-%d'),
          now = new Date(),
          duration = 12,
          startDate = new Date(now.getFullYear(), (duration === 12 ? 0 : Math.ceil((now.getMonth()) / 3) - 1 + duration), 1),
          endDate = new Date(now.getFullYear(), (duration === 12 ? 12 : startDate.getMonth() + 3), 0),
          dateRange = [startDate, endDate];

      d3.json('styleguide/content/charts/data/bubble_data.json', function(data) {
        /*var bubble_data = {
              data: d3.nest()
                      .key(function(d){ return d.assigned_user_name;})
                      .entries(
                          json.records
                              .filter(function(d){
                                  var oppDate = Date.parse(d.date_closed);
                                  return  oppDate >= dateRange[0] && oppDate <= dateRange[1];
                              })
                              .slice(0,10)
                              .map(function(d){
                                  return {
                                      id: d.id,
                                      x: d.date_closed,
                                      y: parseInt(d.amount,10),
                                      shape: 'circle',
                                      account_name: d.account_name,
                                      assigned_user_name: d.assigned_user_name,
                                      sales_stage: d.sales_stage,
                                      probability: d.probability
                                  };
                              })
                      ),
              properties: { title: "Top 10 Opportunities", value: json.records.length }
        };*/
        //chart.colorData( 'graduated', {c1: '#e8e2ca', c2: '#3e6c0a', l: bubble_data.data.length} );

        var chart = nv.models.bubbleChart()
            .x(function(d) { return format.parse(d.x); })
            .y(function(d) { return d.y; })
            .tooltipContent(function(key, x, y, e, graph) {
                return '<p>Assigned: <b>' + key + '</b></p>' +
                       '<p>Amount: <b>$' + d3.format(',.02d')(e.point.opportunity) + '</b></p>' +
                       '<p>Cloase Date: <b>' + d3.time.format('%x')(format.parse(e.point.x)) + '</b></p>';
              })
            .showTitle(false)
            .tooltips(true)
            .showLegend(true)
            .direction(app.lang.direction)
            .colorData('graduated', {c1: '#d9edf7', c2: '#134158', l: data.data.length});

        d3.select('#bubble svg')
            .datum(data)
          .transition().duration(500)
            .call(chart);

        nv.utils.windowResize(chart.update);

        return chart;
      });

    });

    // Treemap opportunities chart
    d3.json('styleguide/content/charts/data/treemap_data.json', function(data) {
      nv.addGraph(function() {
        var chart = nv.models.treemapChart()
              .leafClick(function(d) { alert('leaf clicked'); })
              .getSize(function(d) { return d.value; })
              .showTitle(false)
              .tooltips(false)
              .direction(app.lang.direction)
              .colorData('class');
        d3.select('#treemap2 svg')
            .datum(parseData(data.records))
          .transition().duration(500)
            .call(chart);
        return chart;
      });
    });

    function parseData(data) {
      var root = {
            name: 'Opportunities',
            children: [],
            x: 0,
            y: 0,
            dx: parseInt(document.getElementById('treemap2').offsetWidth, 10),
            dy: parseInt(document.getElementById('treemap2').offsetHeight, 10),
            depth: 0,
            colorIndex: '0root_Opportunities'
          },
          colorIndices = ['0root_Opportunities'],
          colors = d3.scale.category20().range();

      var today = new Date();
          today.setUTCHours(0, 0, 0, 0);

      var day_ms = 1000 * 60 * 60 * 24,
          d1 = new Date(today.getTime() + 31 * day_ms);

      var data = data.filter(function(model) {
        // Filter for 30 days from now.
        var d2 = new Date(model.date_closed || '1970-01-01');
        return (d2 - d1) / day_ms <= 30;
      }).map(function(d) {
        // Include properties to be included in leaves
        return {
          assigned_user_name: d.assigned_user_name,
          sales_stage: d.sales_stage,
          name: d.name,
          amount_usdollar: d.amount_usdollar,
          color: d.color
        };
      });

      data = _.groupBy(data, function(m) {
        return m.assigned_user_name;
      });

      _.each(data, function(value, key, list) {
        list[key] = _.groupBy(value, function(m) {
          return m.sales_stage;
        });
      });

      _.each(data, function(value1, key1) {
        var child = [];
        _.each(value1, function(value2, key2) {
          if (colorIndices.indexOf('2oppgroup_' + key2) === -1) {
            colorIndices.push('2oppgroup_' + key2);
          }
          _.each(value2, function(record) {
            record.className = 'stage_' + record.sales_stage.toLowerCase().replace(' ', '');
            record.value = parseInt(record.amount_usdollar, 10);
            record.colorIndex = '2oppgroup_' + key2;
          });
          child.push({
            name: key2,
            className: 'stage_' + key2.toLowerCase().replace(' ', ''),
            children: value2,
            colorIndex: '2oppgroup_' + key2
          });
        });
        if (colorIndices.indexOf('1rep_' + key1) === -1) {
          colorIndices.push('1rep_' + key1);
        }
        root.children.push({
          name: key1,
          children: child,
          colorIndex: '1rep_' + key1
        });
      });

      function accumulate(d) {
        if (d.children) {
          return d.value = d.children.reduce(function(p, v) { return p + accumulate(v); }, 0);
        }
        return d.value;
      }

      accumulate(root);

      colorIndices.sort(d3.ascending());

      //build color indexes
      function setColorIndex(d) {
        var i, l;
        d.colorIndex = colorIndices.indexOf(d.colorIndex);
        if (d.children) {
          l = d.children.length;
          for (i = 0; i < l; i += 1) {
            setColorIndex(d.children[i]);
          }
        }
      }

      setColorIndex(root);

      return root;
    }
  }
}) },
"docs-base-labels": {"controller": /*
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
	// Docs-base-labels View (base) 

    className: 'container-fluid',
    module_list: [],

    _renderHtml: function () {
        this.module_list = _.without(app.metadata.getModuleNames({filter: 'display_tab', access: 'read'}), 'Home');
        this.module_list.sort();
        this._super('_renderHtml');
    }
}) },
"docs-layouts-navbar": {"controller": /*
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
	// Docs-layouts-navbar View (base) 

    className: 'container-fluid'
}) },
"dashlet-tabbed": {"controller": /*
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
	// Dashlet-tabbed View (base) 

    extendsFrom: 'TabbedDashletView',

    /**
     * @inheritdoc
     *
     * @property {Number} _defaultSettings.limit Maximum number of records to
     *   load per request, defaults to '10'.
     * @property {String} _defaultSettings.visibility Records visibility
     *   regarding current user, supported values are 'user' and 'group',
     *   defaults to 'user'.
     */
    _defaultSettings: {
        limit: 10,
        visibility: 'user'
    },

    /**
     * @inheritdoc
     */
    initialize: function(options) {
        options.meta = options.meta || {};
        options.meta.template = 'tabbed-dashlet';

        this._super('initialize', [options]);
    },

    /**
     * @inheritdoc
     *
     * FIXME: This should be removed when metadata supports date operators to
     * allow one to define relative dates for date filters.
     */
    _initTabs: function() {
        this._super("_initTabs");

        // FIXME: since there's no way to do this metadata driven (at the
        // moment) and for the sake of simplicity only filters with 'date_due'
        // value 'today' are replaced by today's date
        var today = new Date();
        today.setHours(23, 59, 59);
        today.toISOString();

        _.each(_.pluck(_.pluck(this.tabs, 'filters'), 'date_due'), function(filter) {
            _.each(filter, function(value, operator) {
                if (value === 'today') {
                    filter[operator] = today;
                }
            });
        });
    },

   _renderHtml: function() {
        if (this.meta.config) {
            this._super('_renderHtml');
            return;
        }

        var tab = this.tabs[this.settings.get('activeTab')];

        if (tab.overdue_badge) {
            this.overdueBadge = tab.overdue_badge;
        }

        var model1 = app.data.createBean('Tasks');
        model1.set("assigned_user_id", "seed_sally_id");
        model1.set("assigned_user_name", "Sally Bronsen");
        model1.set("name", "Programmatically added task");
        model1.set("date_due", "2014-02-07T07:15:00-05:00");
        model1.set("date_due_flag", false);
        model1.set("date_start", null);
        model1.set("date_start_flag", false);
        model1.set("status", "Not Started");

        this.collection.add(model1);

        _.each(this.collection.models, function(model) {
            var pictureUrl = app.api.buildFileURL({
                module: 'Users',
                id: model.get('assigned_user_id'),
                field: 'picture'
            });
            model.set('picture_url', pictureUrl);
        }, this);

        this._super('_renderHtml');
    }
}) },
"dashlet-chart": {"controller": /*
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
	// Dashlet-chart View (base) 

    extendsFrom: 'OpportunityMetricsView',

    loadData: function (options) {
        if (this.meta.config) {
            return;
        }
        this.metricsCollection = {
          "won": {
            "amount_usdollar": 40000,
            "count": 4,
            "formattedAmount": "$30,000",
            "icon": "caret-up",
            "cssClass": "won",
            "dealLabel": "won",
            "stageLabel": "Won"
          },
          "lost": {
            "amount_usdollar": 10000,
            "count": 1,
            "formattedAmount": "$10,000",
            "icon": "caret-down",
            "cssClass": "lost",
            "dealLabel": "lost",
            "stageLabel": "Lost"
          },
          "active": {
            "amount_usdollar": 30000,
            "count": 3,
            "formattedAmount": "$30,000",
            "icon": "minus",
            "cssClass": "active",
            "dealLabel": "active",
            "stageLabel": "Active"
          }
        };
        this.chartCollection = {
          "data": [
            {
              "key": "Won",
              "value": 4,
              "classes": "won"
            },
            {
              "key": "Lost",
              "value": 1,
              "classes": "lost"
            },
            {
              "key": "Active",
              "value": 3,
              "classes": "active"
            }
          ],
          "properties": {
            "title": "Opportunity Metrics",
            "value": 8,
            "label": 8
          }
        };
        this.total = 8;
    }
}) },
"styleguide": {"controller": /*
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
	// Styleguide View (base) 

    className: 'container-fluid',

    _render: function() {
        var self = this;

        this._super('_render');
    }
}) },
"docs-dashboards-dashlets": {"controller": /*
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
	// Docs-dashboards-dashlets View (base) 

    className: 'container-fluid',

    // dashboard dashlets
    _renderHtml: function () {
        var self = this;

        this._super('_renderHtml');

        // define event listeners
        app.events.on('preview:close', function() {
            self.hideDashletPreview();
        });
        app.events.on('app:dashletPreview:close', function() {
            self.hideDashletPreview();
        });
        app.events.on('app:dashletPreview:open', function() {
            self.showDashletPreview();
        });

        app.events.trigger('app:dashletPreview:close');

        this.$('.dashlet-example').on('click.styleguide', function(){
            self.$('.dashlet-example').removeClass('active');
            $(this).addClass('active');
            app.events.trigger('app:dashletPreview:open');
            var dashlet = $(this).data('dashlet'),
                module = $(this).data('module') || 'Styleguide',
                metadata = app.metadata.getView(module, dashlet).dashlets[0];
            metadata.type = dashlet;
            metadata.component = dashlet;
            self.previewDashlet(metadata);
        });
    },

    _dispose: function() {
        this.$('.dashlet-example').off('click.styleguide');
        app.events.trigger('app:dashletPreview:close');
        this._super('_dispose');
    },

    showDashletPreview: function(event) {
        $('.main-pane').addClass('span8').removeClass('span12');
        $('.preview-pane').addClass('active');
        $('.side').css({visibility: 'visible'});
    },

    hideDashletPreview: function(event) {
        $('.dashlet-example').removeClass('active');
        $('.main-pane').addClass('span12').removeClass('span8');
        $('.side').css({visibility: 'hidden'});
    },

    /**
     * Load dashlet preview by passing preview metadata
     *
     * @param {Object} metadata Preview metadata.
     */
    previewDashlet: function(metadata) {
        var layout = this.layout,
            previewLayout;

        while (layout) {
            if (layout.getComponent('preview-pane')) {
                previewLayout = layout.getComponent('preview-pane').getComponent('dashlet-preview');
                //previewLayout.showPreviewPanel();
                break;
            }
            layout = layout.layout;
        }

        if (previewLayout) {
            // If there is no preview property, use the config property
            if (!metadata.preview) {
                metadata.preview = metadata.config;
            }
            var previousComponent = _.last(previewLayout._components);

            if (previousComponent.name !== 'dashlet-preview' && previousComponent.name !== 'preview-header') {
                var index = previewLayout._components.length - 1;
                previewLayout._components[index].dispose();
                previewLayout.removeComponent(index);
            }

            var contextDef,
                component = {
                    label: app.lang.get(metadata.label, metadata.preview.module),
                    type: metadata.type,
                    preview: true
                };
            if (metadata.preview.module || metadata.preview.link) {
                contextDef = {
                    skipFetch: false,
                    forceNew: true,
                    module: metadata.preview.module,
                    link: metadata.preview.link
                };
            } else if (metadata.module) {
                contextDef = {
                    module: metadata.module
                };
            }

            component.view = _.extend({module: metadata.module}, metadata.preview, component);
            if (contextDef) {
                component.context = contextDef;
            }

            previewLayout.initComponents([
                {
                    layout: {
                        type: 'dashlet',
                        label: app.lang.get(metadata.preview.label || metadata.label, metadata.preview.module),
                        preview: true,
                        components: [
                            component
                        ]
                    }
                }
            ], this.context.parent);

            previewLayout.loadData();
            previewLayout.render();
        }
    }
}) },
"docs-forms-datetime": {"controller": /*
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
	// Docs-forms-datetime View (base) 

    className: 'container-fluid',

    // forms datetime
    _renderHtml: function () {
        var self = this;

        this._super('_renderHtml');

        // sugar7 date field
        //TODO: figure out how to set the date value when calling createField
        this.model.start_date = '2000-01-01T22:47:00+00:00';
        var fieldSettingsDate = {
            view: this,
            def: {
                name: 'start_date',
                type: 'date',
                view: 'edit',
                enabled: true
            },
            viewName: 'edit',
            context: this.context,
            module: this.module,
            model: this.model,
            meta: app.metadata.getField('date')
        },
        dateField = app.view.createField(fieldSettingsDate);
        this.$('#sugar7_date').append(dateField.el);
        dateField.render();

        // sugar7 datetimecombo field
        this.model.start_datetime = '2000-01-01T22:47:00+00:00';
        var fieldSettingsCombo = {
            view: this,
            def: {
                name: 'start_datetime',
                type: 'datetimecombo',
                view: 'edit',
                enabled: true
            },
            viewName: 'edit',
            context: this.context,
            module: this.module,
            model: this.model,
            meta: app.metadata.getField('datetimecombo')
        },
        datetimecomboField = app.view.createField(fieldSettingsCombo);
        this.$('#sugar7_datetimecombo').append(datetimecomboField.el);
        datetimecomboField.render();

        // static examples
        this.$('#dp1').datepicker();
        this.$('#tp1').timepicker();

        this.$('#dp2').datepicker({format:'mm-dd-yyyy'});
        this.$('#tp2').timepicker({timeformat:'H.i.s'});

        this.$('#dp3').datepicker();

        var startDate = new Date(2012,1,20);
        var endDate = new Date(2012,1,25);

        this.$('#dp4').datepicker()
          .on('changeDate', function(ev){
            if (ev.date.valueOf() > endDate.valueOf()){
              self.$('#alert').show().find('strong').text('The start date can not be greater then the end date');
            } else {
              self.$('#alert').hide();
              startDate = new Date(ev.date);
              self.$('#startDate').text(self.$('#dp4').data('date'));
            }
            self.$('#dp4').datepicker('hide');
          });

        this.$('#dp5').datepicker()
          .on('changeDate', function(ev){
            if (ev.date.valueOf() < startDate.valueOf()){
              self.$('#alert').show().find('strong').text('The end date can not be less then the start date');
            } else {
              self.$('#alert').hide();
              endDate = new Date(ev.date);
              self.$('#endDate').text(self.$('#dp5').data('date'));
            }
            self.$('#dp5').datepicker('hide');
          });


        this.$('#tp3').timepicker({'scrollDefaultNow': true});

        this.$('#tp4').timepicker();
        this.$('#tp4_button').on('click', function (){
          self.$('#tp4').timepicker('setTime', new Date());
        });

        this.$('#tp5').timepicker({
          'minTime': '2:00pm',
          'maxTime': '6:00pm',
          'showDuration': true
        });

        this.$('#tp6').timepicker();
        this.$('#tp6').on('changeTime', function() {
          self.$('#tp6_legend').text('You selected: ' + $(this).val());
        });

        this.$('#tp7').timepicker({ 'step': 5 });
    },

    _dispose: function() {
        this.$('#dp4').off('changeDate');
        this.$('#dp5').off('changeDate');
        this.$('#tp4_button').off('click');
        this.$('#tp6').off('changeTime');

        this._super('_dispose');
    }
}) },
"docs-layouts-drawer": {"controller": /*
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
	// Docs-layouts-drawer View (base) 

    className: 'container-fluid',

    // layouts drawer
    _renderHtml: function () {
        this._super('_renderHtml');

        this.$('#sg_open_drawer').on('click.styleguide', function(){
            app.drawer.open({
                layout: 'create',
                context: {
                    create: true,
                    model: app.data.createBean('Styleguide')
                }
            });
        });
    },

    _dispose: function() {
        this.$('#sg_open_drawer').off('click.styleguide');

        this._super('_dispose');
    }
}) },
"docs-layouts-list": {"controller": /*
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
	// Docs-layouts-list View (base) 

    className: 'container-fluid'
}) },
"docs-forms-buttons": {"controller": /*
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
	// Docs-forms-buttons View (base) 

    className: 'container-fluid',
    _render: function() {
        this._super('_render');
        // button state demo
        this.$('#fat-btn').click(function () {
            var btn = $(this);
            btn.button('loading');
            setTimeout(function () {
              btn.button('reset');
            }, 3000);
        })
    }
}) },
"docs-base-icons": {"controller": /*
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
	// Docs-base-icons View (base) 

    className: 'container-fluid',

    // base icons
    _renderHtml: function () {
        this._super('_renderHtml');

        this.$('.chart-icon').each(function(){
            var svg = svgChartIcon($(this).data('chart-type'));
            $(this).html(svg);
        });

        this.$('.filetype-thumbnail').each(function(){
            $(this).html( '<svg xmlns:svg="http://www.w3.org/2000/svg" xmlns="http://www.w3.org/2000/svg" version="1.1" width="28" height="33"><g><path class="ft-ribbon" d="M 0,15 0,29 3,29 3,13 z" /><path d="M 3,1 20.5,1 27,8 27,32 3,32 z" style="fill:#ececec;stroke:#b3b3b3;stroke-width:1;stroke-linecap:butt;" /><path d="m 20,1 0,7 7,0 z" style="fill:#b3b3b3;stroke-width:0" /></g></svg>' );
        });

        this.$('.sugar-cube').each(function(){
            var svg = svgChartIcon('sugar-cube');
            $(this).html(svg);
        });
    }
}) },
"docs-index": {"controller": /*
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
	// Docs-index View (base) 

    className: 'container-fluid',
    section_description: '',
    section_key: '',

    /* RENDER index page
    *******************/
    _renderHtml: function() {
        var self = this,
            i = 0,
            html = '',
            request = this.context.attributes.request;

        this._super('_renderHtml');

        this.section_key = request.keys[1];

        function fmtLink(s, p) {
            return '#Styleguide/docs/' +
                (p ? '' : 'index-') +
                s.replace(/[\s\,]+/g,'-').toLowerCase() +
                (p ? '-' + p : '');
        }

        if (request.keys.length === 1) {

            // home index call
            $.each(request.page_data, function (kS, vS) {
                if (!vS.index) {
                    return;
                }

                html += (i % 3 === 0 ? '<div class="row-fluid">' : '');
                html += '<div class="span4"><h3>' +
                    '<a class="section-link" href="' +
                    (vS.url ? vS.url : fmtLink(kS)) + '">' +
                    vS.title + '</a></h3><p>' + vS.description + '</p><ul>';
                if (vS.pages) {
                    $.each(vS.pages, function (kP, vP) {
                        html += '<li ><a class="section-link" href="' +
                            (vP.url ? vP.url : fmtLink(kS, kP)) + '">' +
                            vP.label + '</a></li>';
                    });
                }
                html += '</ul></div>';
                html += (i % 3 === 2 ? '</div>' : '');

                i += 1;
            });

            this.section_description = request.page_data[request.keys[0]].description;

        } else {

            // section index call
            $.each(request.page_data[this.section_key].pages, function (kP, vP) {
                html += (i % 4 === 0 ? '<div class="row-fluid">' : '');
                html += '<div class="span3"><h3>' +
                    (!vP.items ?
                        ('<a class="section-link" href="' + (vP.url ? vP.url : fmtLink(self.section_key, kP)) + '">' + vP.label + '</a>') :
                        vP.label
                    ) +
                    '</h3><p>' + vP.description;
                // if (vS.items) {
                //     l = vS.items.length-1;
                //     $.each(d.items, function (kP,vP) {
                //         m += ' <a class="section-link" href="'+ (vP.url ? vP.url : fmtLink(kS,kP)) +'">'+ d2 +'</a>'+ (j===l?'.':', ');
                //     });
                // }
                html += '</p></div>';
                html += (i % 4 === 3 ? '</div>' : '');

                i += 1;
            });

            this.section_description = request.page_data[request.keys[1]].description;
        }

        this.$('#index_content').append('<section id="section-menu"></section>').html(html);
    }
}) },
"docs-components-alerts": {"controller": /*
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
	// Docs-components-alerts View (base) 

    className: 'container-fluid',

    // components dropdowns
    _renderHtml: function () {
        this._super('_renderHtml');

        this.$('[data-alert]').on('click', function() {

            var $button = $(this),
                level = $button.data('alert'),
                state = $button.text(),
                auto_close = ['info','success'].indexOf(level) > -1;

            app.alert.dismiss('core_meltdown_' + level);

            if (state !== 'Example') {
                $button.text('Example');
            } else {
                app.alert.show('core_meltdown_' + level, {
                    level: level,
                    messages: 'The core is in meltdown!!',
                    autoClose: auto_close,
                    onClose: function () {
                        $button.text('Example');
                    }
                });
                $button.text('Dismiss');
            }
        });
    },

    _dispose: function() {
        this.$('[data-alert]').off('click');
        app.alert.dismissAll();

        this._super('_dispose');
    }
}) },
"docs-forms-select2": {"controller": /*
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
	// Docs-forms-select2 View (base) 

    className: 'container-fluid',

    // forms range
    _renderHtml: function () {
        this._super('_renderHtml');

        var $this,
            ctor;

        function select2ChartSelection(chart) {
            if (!chart.id) return chart.text; // optgroup
            return svgChartIcon(chart.id);
        }

        function select2ChartResult(chart) {
            if (!chart.id) return chart.text; // optgroup
            return svgChartIcon(chart.id) + chart.text;
        }

        //
        $('select[name="priority"]').select2({minimumResultsForSearch: 7});

        //
        $('#priority').select2({minimumResultsForSearch: 7, width: '200px'});

        //
        $("#e6").select2({
            placeholder: "Search for a movie",
            minimumInputLength: 1,
            ajax: { // instead of writing the function to execute the request we use Select2's convenient helper
                url: "styleguide/content/js/select2.json",
                dataType: 'json',
                data: function (term, page) {
                    return {q:term};
                },
                results: function (data, page) { // parse the results into the format expected by Select2.
                    // since we are using custom formatting functions we do not need to alter remote JSON data
                    return {results: data.movies};
                }
            },
            formatResult: function(m) { return m.title; },
            formatSelection: function(m) { return m.title; }
        });

        //
        $this = $('#priority2');
        ctor = this.getSelect2Constructor($this);
        $this.select2(ctor);

        //
        $this = $('#state');
        ctor = this.getSelect2Constructor($this);
        ctor.formatSelection = function(state) { return state.id;};
        $this.select2(ctor);
        $('#states3').select2({width: '200px', minimumResultsForSearch: 7, allowClear: true});

        //
        $this = $('#s2_hidden');
        ctor = this.getSelect2Constructor($this);
        ctor.data = [
            {id: 0, text: 'enhancement'},
            {id: 1, text: 'bug'},
            {id: 2, text: 'duplicate'},
            {id: 3, text: 'invalid'},
            {id: 4, text: 'wontfix'}
        ];
        ctor.placeholder = "Select a issue type...";
        $this.select2(ctor);
        $('#states4').select2({width: '200px', minimumResultsForSearch: 1000, dropdownCssClass: 'select2-drop-bootstrap'});

        //
        $this = $('select[name="chart_type"]');
        ctor = this.getSelect2Constructor($this);
        ctor.dropdownCssClass = 'chart-results select2-narrow';
        ctor.width = 'off';
        ctor.minimumResultsForSearch = 9;
        ctor.formatResult = select2ChartResult;
        ctor.formatSelection = select2ChartSelection;
        ctor.escapeMarkup = function(m) { return m; };
        $this.select2(ctor);

        //
        $this = $('select[name="label_module"]');
        ctor = this.getSelect2Constructor($this);
        ctor.width = 'off';
        ctor.minimumResultsForSearch = 9;
        ctor.formatSelection = function(item) {
            return '<span class="label label-module label-module-mini label-' + item.text + '">' + item.id + '</span>';
        };
        ctor.escapeMarkup = function(m) { return m; };
        ctor.width = '55px';
        $this.select2(ctor);

        //
        $('#priority3').select2({width: '200px', minimumResultsForSearch: 7, dropdownCssClass: 'select2-drop-error'});

        //
        $('#multi1').select2({width: '100%'});
        $('#multi2').select2({width: '300px'});

        //
        $('#states5').select2({
            width: '100%',
            minimumResultsForSearch: 7,
            //closeOnSelect: false,
            containerCssClass: 'select2-choices-pills-close'
        });

        //
        $('#states4').select2({
            width: '100%',
            minimumResultsForSearch: 7,
            containerCssClass: 'select2-choices-pills-close',
            formatSelection: function(item) {
                return '<span class="select2-choice-type">Link:</span><a href="javascript:void(0)" rel="' + item.id + '">' + item.text + '</a>';
            },
            escapeMarkup: function(m) { return m; }
        });

        //
        /*$("select.select2").each(function(){
            $this = $(this),
                ctor = getSelect2Constructor($this);
            //$this.select2( ctor );
        });*/

        $('.error .select .error-tooltip').tooltip({
            trigger: 'click',
            container: 'body'
        });
    },

    getSelect2Constructor: function($select) {
        var _ctor = {};
        _ctor.minimumResultsForSearch = 7;
        _ctor.dropdownCss = {};
        _ctor.dropdownCssClass = '';
        _ctor.containerCss = {};
        _ctor.containerCssClass = '';

        if ( $select.hasClass('narrow') ) {
            _ctor.dropdownCss.width = 'auto';
            _ctor.dropdownCssClass = 'select2-narrow ';
            _ctor.containerCss.width = '75px';
            _ctor.containerCssClass = 'select2-narrow';
            _ctor.width = 'off';
        }

        if ( $select.hasClass('inherit-width') ) {
            _ctor.dropdownCssClass = 'select2-inherit-width ';
            _ctor.containerCss.width = '100%';
            _ctor.containerCssClass = 'select2-inherit-width';
            _ctor.width = 'off';
        }

        return _ctor;
    }
}) },
"docs-dashboards-home": {"controller": /*
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
	// Docs-dashboards-home View (base) 

    className: 'container-fluid',

    // dashboards home
    _renderHtml: function () {
        var self = this;
        this._super('_renderHtml');

        this.$('.dashlet-example').on('click.styleguide', function(){
            var dashlet = $(this).data('dashlet'),
                metadata = app.metadata.getView('Home', dashlet).dashlets[0];
            metadata.type = dashlet;
            metadata.component = dashlet;
            self.layout.previewDashlet(metadata);
        });

        this.$('[data-modal]').on('click.styleguide', function(){
            var modal = $(this).data('modal');
            $(modal).appendTo('body').modal('show');
        });
    },

    _dispose: function() {
        this.$('.dashlet-example').off('click.styleguide');
        this.$('[data-modal]').off('click.styleguide');
        this._super('_dispose');
    }
}) },
"docs-components-collapse": {"controller": /*
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
	// Docs-components-collapse View (base) 

    className: 'container-fluid'
}) },
"docs-components-popovers": {"controller": /*
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
	// Docs-components-popovers View (base) 

    className: 'container-fluid',

    // components popovers
    _renderHtml: function () {
        this._super('_renderHtml');

        this.$('[rel=popover]').popover();
        this.$('[rel=popoverHover]').popover({trigger: 'hover'});
        this.$('[rel=popoverTop]').popover({placement: 'top'});
        this.$('[rel=popoverBottom]').popover({placement: 'bottom'});
    }
}) },
"docs-forms-switch": {"controller": /*
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
	// Docs-forms-switch View (base) 

    className: 'container-fluid',

    // forms switch
    _renderHtml: function () {
        this._super('_renderHtml');

        this.$('#mySwitch').on('switch-change', function (e, data) {
            var $el = $(data.el),
                value = data.value;
        });
    },

    _dispose: function() {
        this.$('#mySwitch').off('switch-change');

        this._super('_dispose');
    }
}) },
"docs-charts-colors": {"controller": /*
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
	// Docs-charts-colors View (base) 

  className: 'container-fluid',

  // charts colors
  _renderHtml: function () {
    this._super('_renderHtml');

    var gauge_data_1 = {
      "properties": {
        "title": "Closed Won Opportunities Gauge",
        "values": [
          {
            "group": 1,
            "t": 4
          }
        ]
      },
      "data": [
        {
          "key": "Range 1"
          , "y": 3
        },
        {
          "key": "Range 2"
          , "y": 5
        },
        {
          "key": "Range 3"
          , "y": 7
        },
        {
          "key": "Range 4"
          , "y": 9
        }
      ]
    };

    var gauge_data_2 = {
      "properties": {
        "title": "Closed Won Opportunities Gauge",
        "values": [
          {
            "group": 1,
            "t": 4
          }
        ]
      },
      "data": [
        {
          "key": "Range 1"
          , "y": 3
          , "color": "#d62728"
        },
        {
          "key": "Range 2"
          , "y": 5
          , "color": "#ff7f0e"
        },
        {
          "key": "Range 3"
          , "y": 7
          , "color": "#bcbd22"
        },
        {
          "key": "Range 4"
          , "y": 9
          , "color": "#2ca02c"
        }
      ]
    };

    var gauge_data_3 = {
      "properties": {
        "title": "Closed Won Opportunities Gauge",
        "values": [
          {
            "group": 1,
            "t": 4
          }
        ]
      },
      "data": [
        {
          "key": "Range 1"
          , "y": 3
          , "class": "nv-fill07"
        },
        {
          "key": "Range 2"
          , "y": 5
          , "class": "nv-fill03"
        },
        {
          "key": "Range 3"
          , "y": 7
          , "class": "nv-fill17"
        },
        {
          "key": "Range 4"
          , "y": 9
          , "class": "nv-fill05"
        }
      ]
    };

    // Gauge Chart
    nv.addGraph(function() {
      var gauge = nv.models.gaugeChart()
          .x(function(d) { return d.key })
          .y(function(d) { return d.y })
          .showLabels(true)
          .showTitle(true)
          .colorData('default')
          .ringWidth(50)
          .maxValue(9)
          .direction(app.lang.direction)
          .transitionMs(4000);

      d3.select('#gauge1 svg')
          .datum(gauge_data_1)
          .call(gauge);

      return gauge;
    });

    nv.addGraph(function() {
      var gauge = nv.models.gaugeChart()
          .x(function(d) { return d.key })
          .y(function(d) { return d.y })
          .showLabels(true)
          .showTitle(true)
          .colorData('default', {gradient: true})
          .ringWidth(50)
          .maxValue(9)
          .direction(app.lang.direction)
          .transitionMs(4000);

      d3.select('#gauge2 svg')
          .datum(gauge_data_1)
        .transition().duration(500)
          .call(gauge);

      return gauge;
    });

    nv.addGraph(function() {
      var gauge = nv.models.gaugeChart()
          .x(function(d) { return d.key })
          .y(function(d) { return d.y })
          .showLabels(true)
          .showTitle(true)
          .colorData('default')
          .ringWidth(50)
          .maxValue(9)
          .direction(app.lang.direction)
          .transitionMs(4000);

      d3.select('#gauge3 svg')
          .datum(gauge_data_2)
        .transition().duration(500)
          .call(gauge);

      return gauge;
    });

    nv.addGraph(function() {
      var gauge = nv.models.gaugeChart()
          .x(function(d) { return d.key })
          .y(function(d) { return d.y })
          .showLabels(true)
          .showTitle(true)
          .colorData('default', {gradient: true})
          .ringWidth(50)
          .maxValue(9)
          .direction(app.lang.direction)
          .transitionMs(4000);

      d3.select('#gauge4 svg')
          .datum(gauge_data_2)
        .transition().duration(500)
          .call(gauge);

      return gauge;
    });

    nv.addGraph(function() {
      var gauge = nv.models.gaugeChart()
          .x(function(d) { return d.key })
          .y(function(d) { return d.y })
          .showLabels(true)
          .showTitle(true)
          .colorData('graduated', {c1: '#e8e2ca', c2: '#3e6c0a', l: gauge_data_1.data.length})
          .ringWidth(50)
          .maxValue(9)
          .direction(app.lang.direction)
          .transitionMs(4000);

      d3.select('#gauge5 svg')
          .datum(gauge_data_1)
        .transition().duration(500)
          .call(gauge);

      return gauge;
    });

    nv.addGraph(function() {
      var gauge = nv.models.gaugeChart()
          .x(function(d) { return d.key })
          .y(function(d) { return d.y })
          .showLabels(true)
          .showTitle(true)
          .colorData('graduated', {c1: '#e8e2ca', c2: '#3e6c0a', l: gauge_data_1.data.length, gradient: true})
          .ringWidth(50)
          .maxValue(9)
          .direction(app.lang.direction)
          .transitionMs(4000);

      d3.select('#gauge6 svg')
          .datum(gauge_data_1)
        .transition().duration(500)
          .call(gauge);

      return gauge;
    });


    nv.addGraph(function() {
      var gauge = nv.models.gaugeChart()
          .x(function(d) { return d.key })
          .y(function(d) { return d.y })
          .showLabels(true)
          .showTitle(true)
          .colorData('class')
          .ringWidth(50)
          .maxValue(9)
          .direction(app.lang.default)
          .transitionMs(4000);

      d3.select('#gauge7 svg')
          .datum(gauge_data_1)
        .transition().duration(500)
          .call(gauge);

      return gauge;
    });

    nv.addGraph(function() {
      var gauge = nv.models.gaugeChart()
          .x(function(d) { return d.key })
          .y(function(d) { return d.y })
          .showLabels(true)
          .showTitle(true)
          .colorData('class', {gradient: true})
          .ringWidth(50)
          .maxValue(9)
          .direction(app.lang.direction)
          .transitionMs(4000);

      d3.select('#gauge8 svg')
          .datum(gauge_data_3)
        .transition().duration(500)
          .call(gauge);

      return gauge;
    });
  }
}) },
"docs-base-mixins": {"controller": /*
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
	// Docs-base-mixins View (base) 

    className: 'container-fluid'
}) },
"sg-headerpane": {"controller": /*
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
	// Sg-headerpane View (base) 

    className: 'headerpane',
    pageData: {},
    section: {},
    page: {},
    section_page: false,
    parent_link: '',
    file: '',
    keys: [],
    $find: [],

    initialize: function(options) {
        var self = this;

        this._super('initialize', [options]);

        this.pageData = app.metadata.getLayout(this.module, 'docs').page_data;

        this.file = this.context.get('page_name');

        if (!_.isUndefined(this.file) && !_.isEmpty(this.file)) {
            this.keys = this.file.split('-');
        }

        if (this.keys.length) {
            // get page content variables from pageData (defined in view/docs.php)
            if (this.keys[0] === 'index') {
                if (this.keys.length > 1) {
                    // section index call
                    this.section = this.pageData[this.keys[1]];
                } else {
                    // master index call
                    this.section = this.pageData[this.keys[0]];
                    //this.index_search = true;
                }
                this.section_page = true;
                this.file = 'index';
            } else if (this.keys.length > 1) {
                // section page call
                this.section = this.pageData[this.keys[0]];
                this.page = this.section.pages[this.keys[1]];
                this.parent_link = '-' + this.keys[0];
            } else {
                // general page call
                this.section = this.pageData[this.keys[0]];
            }
        }
    },

    _render: function() {
        var self = this,
            $optgroup = {};

        // render view
        this._super('_render');

        // styleguide guide doc search
        this.$find = $('#find_patterns');

        if (this.$find.length) {
            // build search select2 options
            $.each(this.pageData, function (k, v) {
                if ( !v.index ) {
                    return;
                }
                $optgroup = $('<optgroup>').appendTo(self.$find).attr('label',v.title);
                $.each(v.pages, function (i, d) {
                    renderSearchOption(k, i, d, $optgroup);
                });
            });

            // search for patterns
            this.$find.on('change', function (e) {
                window.location.href = $(this).val();
            });

            // init select2 control
            this.$find.select2();
        }

        function renderSearchOption(section, page, d, optgroup) {
            $('<option>')
                .appendTo(optgroup)
                .attr('value', (d.url ? d.url : fmtLink(section, page)) )
                .text(d.label);
        }

        function fmtLink(section, page) {
            return '#Styleguide/docs/' +
                (page?'':'index-') + section.replace(/[\s\,]+/g,'-').toLowerCase() + (page?'-'+page:'');
        }
    },

    _dispose: function() {
        this.$find.off('change');
        this._super('_dispose');
    }
}) },
"docs-base-typography": {"controller": /*
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
	// Docs-base-typography View (base) 

    className: 'container-fluid'
}) },
"docs-forms-layouts": {"controller": /*
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
	// Docs-forms-layouts View (base) 

    className: 'container-fluid',

    // forms switch
    _renderHtml: function () {
        this._super('_renderHtml');

        var self = this;

        this.$('select.select2').each(function(){
            var $this = $(this),
                ctor = self.getSelect2Constructor($this);
            $this.select2(ctor);
        });

        this.$('table td [rel=tooltip]').tooltip({
            container:'body',
            placement:'top',
            html:'true'
        });

        this.$('.error input, .error textarea').on('focus', function(){
            $(this).next().tooltip('show');
        });

        this.$('.error input, .error textarea').on('blur', function(){
            $(this).next().tooltip('hide');
        });

        this.$('.add-on')
            .tooltip('destroy')  // I cannot find where _this_ tooltip gets initialised with 'hover', so i detroy it first, -f1vlad
            .tooltip({
                trigger: 'click',
                container: 'body'
        });
    },

    _dispose: function() {
        this.$('.error input, .error textarea').off('focus');
        this.$('.error input, .error textarea').off('blur');
    },

    getSelect2Constructor: function($select) {
        var _ctor = {};
        _ctor.minimumResultsForSearch = 7;
        _ctor.dropdownCss = {};
        _ctor.dropdownCssClass = '';
        _ctor.containerCss = {};
        _ctor.containerCssClass = '';

        if ( $select.hasClass('narrow') ) {
            _ctor.dropdownCss.width = 'auto';
            _ctor.dropdownCssClass = 'select2-narrow ';
            _ctor.containerCss.width = '75px';
            _ctor.containerCssClass = 'select2-narrow';
            _ctor.width = 'off';
        }

        if ( $select.hasClass('inherit-width') ) {
            _ctor.dropdownCssClass = 'select2-inherit-width ';
            _ctor.containerCss.width = '100%';
            _ctor.containerCssClass = 'select2-inherit-width';
            _ctor.width = 'off';
        }

        return _ctor;
    }
}) },
"docs-charts-circular": {"controller": /*
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
	// Docs-charts-circular View (base) 

  className: 'container-fluid',

  // charts circular
  _renderHtml: function() {
    this._super('_renderHtml');

    // Pie Chart
    d3.json('styleguide/content/charts/data/pie_data.json', function(data) {
      nv.addGraph(function() {
        var chart = nv.models.pieChart()
              .x(function(d) { return d.key })
              .y(function(d) { return d.value })
              .showLabels(true)
              .showTitle(false)
              .direction(app.lang.direction)
              .colorData('default')
              .tooltipContent(function(key, x, y, e, graph) {
                return '<p>Stage: <b>' + key + '</b></p>' +
                       '<p>Amount: <b>$' + parseInt(y) + 'K</b></p>' +
                       '<p>Percent: <b>' + x + '%</b></p>';
              });

          d3.select('#pie svg')
              .datum(data)
            .transition().duration(500)
              .call(chart);

        return chart;
      });
    });

    // Donut Chart
    d3.json('styleguide/content/charts/data/pie_data.json', function(data) {
      nv.addGraph(function() {
        var chart = nv.models.pieChart()
              .x(function(d) { return d.key })
              .y(function(d) { return d.value })
              .showLabels(true)
              .showTitle(false)
              .donut(true)
              .donutRatio(0.4)
              .donutLabelsOutside(true)
              .hole(10)
              .direction(app.lang.direction)
              .colorData('default')
              .tooltipContent(function(key, x, y, e, graph) {
                return '<p>Stage: <b>' + key + '</b></p>' +
                       '<p>Amount: <b>$' + parseInt(y) + 'K</b></p>' +
                       '<p>Percent: <b>' + x + '%</b></p>';
              });

          d3.select('#donut svg')
              .datum(data)
            .transition().duration(1200)
              .call(chart);

        return chart;
      });
    });
  }
}) },
"docs-base-theme": {"controller": /*
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
	// Docs-base-theme View (base) 

    className: 'container-fluid'
}) },
"docs-base-edit": {"controller": /*
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
	// Docs-base-edit View (base) 

    className: 'container-fluid'
}) },
"docs-components-dropdowns": {"controller": /*
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
	// Docs-components-dropdowns View (base) 

    className: 'container-fluid',

    // components dropdowns
    _renderHtml: function () {
        this._super('_renderHtml');

        this.$('#mm001demo *').on('click.styleguide', function(){ /* make this menu frozen in its state */
            return false;
        });

        this.$('*').on('click.styleguide', function(){
            /* not sure how to override default menu behaviour, catching any click, becuase any click removes class `open` from li.open div.btn-group */
            setTimeout(function(){
                this.$('#mm001demo').find('li.open .btn-group').addClass('open');
            },0.1);
        });
    },

    _dispose: function() {
        this.$('#mm001demo *').off('click.styleguide');

        this._super('_dispose');
    }
}) },
"docs-layouts-tabs": {"controller": /*
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
	// Docs-layouts-tabs View (base) 

    className: 'container-fluid',

    // layouts tabs
    _renderHtml: function () {
        this._super('_renderHtml');

        this.$('#nav-tabs-pills')
            .find('ul.nav-tabs > li > a, ul.nav-list > li > a, ul.nav-pills > li > a')
            .on('click.styleguide', function(e){
                e.preventDefault();
                e.stopPropagation();
                $(this).tab('show');
            });
    },

    _dispose: function() {
        this.$('#nav-tabs-pills')
            .find('ul.nav-tabs > li > a, ul.nav-list > li > a, ul.nav-pills > li > a')
            .off('click.styleguide');

        this._super('_dispose');
    }
}) },
"docs-charts-vertical": {"controller": /*
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
	// Docs-charts-vertical View (base) 

    className: 'container-fluid',

    // charts vertical
    _renderHtml: function() {
        this._super('_renderHtml');

        // Vertical Bar Chart without Line
        this.chart1 = nv.models.multiBarChart()
              .showTitle(false)
              .tooltips(true)
              .showControls(false)
              .direction(app.lang.direction)
              .colorData('default')
              .tooltipContent(function(key, x, y, e, graph) {
                  return '<p>Stage: <b>' + key + '</b></p>' +
                         '<p>Amount: <b>$' + parseInt(y, 10) + 'K</b></p>' +
                         '<p>Percent: <b>' + x + '%</b></p>';
              });

        nv.utils.windowResize(this.chart1.update);


        //Vertical Bar Chart with Line
        this.chart2 = nv.models.paretoChart()
              .showTitle(false)
              .showLegend(true)
              .tooltips(true)
              .showControls(false)
              .direction(app.lang.direction)
              .stacked(true)
              .clipEdge(false)
              .colorData('default')
              .yAxisTickFormat(function(d) { return '$' + d3.format(',.2s')(d); })
              .quotaTickFormat(function(d) { return '$' + d3.format(',.3s')(d); });
              // override default barClick function
              // .barClick( function(data,e,selection) {
              //     //if only one bar series is disabled
              //     d3.select('#vert2 svg')
              //       .datum(forecast_data_Manager)
              //       .call(chart);
              //   })

        nv.utils.windowResize(this.chart2.update);

        this.loadData();
    },

    loadData: function(options) {

      // Vertical Bar Chart without Line
      d3.json('styleguide/content/charts/data/multibar_data.json', _.bind(function(data) {
          d3.select('#vert1 svg')
              .datum(data)
            .transition().duration(500)
              .call(this.chart1);
      }, this));

      //Vertical Bar Chart with Line
      d3.json('styleguide/content/charts/data/pareto_data_salesrep.json', _.bind(function(data) {
          d3.select('#vert2 svg')
            .datum(data)
            .call(this.chart2);
      }, this));
    }
}) },
"docs-forms-editable": {"controller": /*
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
	// Docs-forms-editable View (base) 

  className: 'container-fluid',

  // forms editable
  _renderHtml: function () {
      this._super('_renderHtml');

      this.$('.url-editable-trigger').on('click.styleguide',function(){
        var uefield = $(this).next();
        uefield
          .html(uefield.text())
          .editable(
            function(value, settings) {
                var nvprep = '<a href="'+value+'">',
                    nvapp = '</a>',
                    value = nvprep.concat(value);
               return(value);
            },
            {onblur:'submit'}
          )
          .trigger('click.styleguide');
      });

      this.$('.text-editable-trigger').on('click.styleguide',function(){
        var uefield = $(this).next();
        uefield
          .html(uefield.text())
          .editable()
          .trigger('click.styleguide');
      });

      this.$('.urleditable-field > a').each(function(){
        if(isEllipsis($(this))===true) {
          $(this).attr({'data-original-title':$(this).text(),'rel':'tooltip','class':'longUrl'});
        }
      });

      function isEllipsis(e) { // check if ellipsis is present on el, add tooltip if so
        return (e[0].offsetWidth < e[0].scrollWidth);
      }

      this.$('.longUrl[rel=tooltip]').tooltip({placement:'top'});
  }
}) },
"docs-forms-file": {"controller": /*
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
	// Docs-forms-file View (base) 

  className: 'container-fluid',

  // components dropdowns
  _renderHtml: function () {
    this._super('_renderHtml');

    /* Custom file upload overrides and avatar widget */
    var uobj = [],
        onUploadChange = function (e) {
          var status = $(this),
              opts = 'show';
          if (this.value) {
            var this_container = $(this).parent('.file-upload').parent('.upload-field-custom'),
              value_explode = this.value.split('\\'),
              value = value_explode[value_explode.length-1];

            if ($(this).closest('.upload-field-custom').hasClass('avatar')===true) { /* hide status for avatars */
              opts = "hide";
            }

            if (this_container.next('.file-upload-status').length > 0) {
              this_container.next('.file-upload-status').remove();
            }
            //this_container.append('<span class="file-upload-status">'+value+'</span>');
            this.$('<span class="file-upload-status ' + opts + ' ">' + value + '</span>').insertAfter(this_container);
          }
        },
        onUploadFocus = function () {
          $(this).parent().addClass('focus');
        },
        onUploadBlur = function () {
          $(this).parent().addClass('focus');
        };

    this.$('.upload-field-custom input[type=file]').each(function() {
      // Bind events
      $(this)
        .bind('focus', onUploadFocus)
        .bind('blur', onUploadBlur)
        .bind('change', onUploadChange);

      // Get label width so we can make button fluid, 12px default left/right padding
      var lbl_width = $(this).parent().find('span strong').width() + 24;
      $(this)
        .parent().find('span').css('width',lbl_width)
        .closest('.upload-field-custom').css('width',lbl_width);

      // Set current state
      onUploadChange.call(this);

      // Minimizes the text input part in IE
      $(this).css('width', '0');
    });

    this.$('#photoimg').on('change', function() {
      $("#preview1").html('');
      $("#preview1").html('<span class="loading">Loading...</span>');
      $("#imageform").ajaxForm({
        target: '#preview1'
      }).submit();
    });

    this.$('.preview.avatar').on('click.styleguide', function(e){
        $(this).closest('.span10').find('label.file-upload span strong').trigger('click');
    });
  },

  _dispose: function(view) {
      this.$('#photoimg').off('change');
      this.$('.preview.avatar').off('click.styleguide');
  }
}) },
"docs-base-responsive": {"controller": /*
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
	// Docs-base-responsive View (base) 

    className: 'container-fluid'
}) },
"docs-charts-implementation": {"controller": /*
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
	// Docs-charts-implementation View (base) 

    className: 'container-fluid'
}) },
"docs-charts-line": {"controller": /*
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
	// Docs-charts-line View (base) 

  className: 'container-fluid',

  // charts line
  _renderHtml: function() {
    this._super('_renderHtml');

    // Line chart
    d3.json('styleguide/content/charts/data/line_data.json', function(data) {
      nv.addGraph(function() {
        var chart = nv.models.lineChart()
              .x(function(d) { return d[0]; })
              .y(function(d) { return d[1]; })
              .showTitle(false)
              .tooltips(true)
              .useVoronoi(false)
              .showControls(false)
              .direction(app.lang.direction)
              .tooltipContent(function(key, x, y, e, graph) {
                  return '<p>Category: <b>' + key + '</b></p>' +
                         '<p>Amount: <b>$' + parseInt(y, 10) + 'M</b></p>' +
                         '<p>Date: <b>' + x + '</b></p>';
              });

        chart.xAxis
            .tickFormat(function(d) { return d3.time.format('%x')(new Date(d)); });

        chart.yAxis
            .axisLabel('Voltage (v)')
            .tickFormat(d3.format(',.2f'));

        d3.select('#line1 svg')
            .datum(data)
          .transition().duration(500)
            .call(chart);

        return chart;
      });
    });

    // Stacked area chart
    d3.json('styleguide/content/charts/data/line_data.json', function(data) {
      nv.addGraph(function() {

        var chart = nv.models.stackedAreaChart()
              .x(function(d) { return d[0]; })
              .y(function(d) { return d[1]; })
              .tooltipContent(function(key, x, y, e, graph) {
                  return '<p>Category: <b>' + key + '</b></p>' +
                         '<p>Amount: <b>$' + parseInt(y, 10) + 'M</b></p>' +
                         '<p>Date: <b>' + x + '</b></p>';
                })
              .showTitle(false)
              .tooltips(true)
              .useVoronoi(false)
              .showControls(false)
              .direction(app.lang.direction)
              .colorData('graduated', {c1: '#e8e2ca', c2: '#3e6c0a', l: data.data.length});
              //.colorData( 'class' )
              //.colorData( 'default' )
              //.clipEdge(true)

        chart.xAxis
            .tickFormat(function(d) { return d3.time.format('%x')(new Date(d)); });

        chart.yAxis
            .axisLabel('Expenditures ($)')
            .tickFormat(d3.format(',.2f'));

        d3.select('#area svg')
            .datum(data)
          .transition().duration(500)
            .call(chart);

        return chart;
      });
    });
  }
}) },
"docs-dashboards-intel": {"controller": /*
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
	// Docs-dashboards-intel View (base) 

    className: 'container-fluid',

    // dashboard intel
    _renderHtml: function () {
        var self = this;
        this._super('_renderHtml');

        this.$('.dashlet-example').on('click.styleguide', function(){
            var dashlet = $(this).data('dashlet'),
                metadata = app.metadata.getView('Home', dashlet).dashlets[0];
            metadata.type = dashlet;
            metadata.component = dashlet;
            self.layout.previewDashlet(metadata);
        });
    },

    _dispose: function() {
        this.$('.dashlet-example').off('click.styleguide');
        this._super('_dispose');
    }
}) },
"docs-base-variables": {"controller": /*
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
	// Docs-base-variables View (base) 

    className: 'container-fluid'
}) },
"create": {"controller": /*
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
 * @class View.Views.Base.Styleguide.CreateView
 * @alias SUGAR.App.view.views.StyleguideCreateView
 * @extends View.Views.Base.CreateView
 */
({
	// Create View (base) 

    extendsFrom: 'CreateView',
    showHelpText: false,
    showErrorDecoration: false,
    showFormHorizontal: false,
    events: {
        'click a[name=show_help_text]:not(.disabled)': 'toggleHelpText',
        'click a[name=display_error_state]:not(.disabled)': 'toggleErrorDecoration',
        'click a[name=display_form_horizontal]:not(.disabled)': 'toggleFormHorizontal'
    },

    _render: function() {
        var error_string = 'You did a bad, bad thing.';
        _.each(this.meta.panels, function(panel) {
            if (!panel.header) {
                panel.labelsOnTop = !this.showFormHorizontal;
            }
        }, this);
        if (this.showErrorDecoration) {
            _.each(this.fields, function(field) {
                if (!_.contains(['button', 'rowaction', 'actiondropdown'], field.type)) {
                    field.setMode('edit');
                    field._errors = error_string;
                    if (field.type === 'email') {
                        var errors = {email: ['primary@example.info']};
                        field.handleValidationError([errors]);
                    } else {
                        if (_.contains(['image', 'picture', 'avatar'], field.type)) {
                            field.handleValidationError(error_string);
                        } else {
                            field.decorateError(error_string);
                        }
                    }
                }
            }, this);
        }
        this._super('_render');
    },

    _renderField: function(field) {
        app.view.View.prototype._renderField.call(this, field);
        var error_string = 'You did a bad, bad thing.';
        if (!this.showHelpText) {
            field.def.help = null;
            field.options.def.help = null;
        }
    },

    toggleHelpText: function(e) {
        this.showHelpText = !this.showHelpText;
        this.render();
        e.preventDefault();
        e.stopPropagation();
    },

    toggleErrorDecoration: function(e) {
        this.showErrorDecoration = !this.showErrorDecoration;
        this.render();
        e.preventDefault();
        e.stopPropagation();
    },

    toggleFormHorizontal: function(e) {
        this.showFormHorizontal = !this.showFormHorizontal;
        this.render();
        e.preventDefault();
        e.stopPropagation();
    }
}) }
}}
,
"layouts": {
"base": {
"field": {"controller": /*
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
	// Field Layout (base) 

    plugins: ['Prettify'],
    className: 'row-fluid',

    initialize: function(options) {
        this._super('initialize', [options]);
        // load up the styleguide css if not already loaded
        //TODO: cleanup styleguide.css and add to main file
        if ($('head #styleguide_css').length === 0) {
            $('<link>')
                .attr({
                    rel: 'stylesheet',
                    href: 'styleguide/assets/css/styleguide.css',
                    id: 'styleguide_css'
                })
                .appendTo('head');
        }
    },

    _placeComponent: function(component) {
        this.$('.styleguide').append(component.$el);
    }
}) },
"styleguide": {"controller": /*
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
	// Styleguide Layout (base) 

    className: 'row-fluid',

    initialize: function(options) {
        this._super('initialize', [options]);
        // load up the styleguide css if not already loaded
        //TODO: cleanup styleguide.css and add to main file
        if ($('head #styleguide_css').length === 0) {
            $('<link>')
                .attr({
                    rel: 'stylesheet',
                    href: 'styleguide/assets/css/styleguide.css',
                    id: 'styleguide_css'
                })
                .appendTo('head');
        }

        document.title = $('<span/>').html('Styleguide &#187; SugarCRM').text();
    },

    _placeComponent: function(component) {
        this.$('.styleguide').append(component.$el);
    }
}) },
"docs": {"controller": /*
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
	// Docs Layout (base) 

    plugins: ['Prettify'],
    className: 'row-fluid',

    initialize: function(options) {
        this._super('initialize', [options]);

        // trigger initial close of side bar
        app.events.trigger('app:dashletPreview:close');

        // load up the styleguide css if not already loaded
        //TODO: cleanup styleguide.css and add to main file
        if ($('head #styleguide_css').length === 0) {
            $('<link>')
                .attr({
                    rel: 'stylesheet',
                    href: 'styleguide/assets/css/styleguide.css',
                    id: 'styleguide_css'
                })
                .appendTo('head');
        }
    },

    /**
     * @inheritdoc
     */
    initComponents: function(components, context, module) {
        var self = this,
            request = {
                file: '',
                keys: [],
                page: {},
                page_data: {},
                parent_link: '',
                section: {},
                section_page: false
            },
            main;

        this._super('initComponents', [components, context, module]);

        // load page_data index from metadata (defined in layout/docs.php)
        request.page_data = app.metadata.getLayout(this.module, 'docs').page_data;
        // page_name defined in router
        request.file = this.context.get('page_name');
        if (!_.isUndefined(request.file) && !_.isEmpty(request.file)) {
            request.keys = request.file.split('-');
        }
        if (request.keys.length) {
            // get page content variables from page_data
            if (request.keys[0] === 'index') {
                if (request.keys.length > 1) {
                    // this is a section index call
                    request.section = request.page_data[request.keys[1]];
                } else {
                    // this is the home index call
                    request.section = request.page_data[request.keys[0]];
                }
                request.section_page = true;
                request.file = 'index';
            } else if (request.keys.length > 1) {
                // this is a section page call
                request.section = request.page_data[request.keys[0]];
                request.page = request.section.pages[request.keys[1]];
                request.parent_link = '-' + request.keys[0];
                window.prettyPrint && prettyPrint();
            } else {
                // this is a general page call
                request.section = request.page_data[request.keys[0]];
            }
        }

        // load up the page view into the component array
        main = this.getComponent('main-pane');
        main._addComponentsFromDef([{
            view: 'docs-' + request.file,
            context: {
                module: 'Styleguide',
                skipFetch: true,
                request: request
            }
        }]);

        this.render();
    },

    _placeComponent: function(component) {
        if (component.meta.name) {
            this.$("." + component.meta.name).append(component.$el);
        }
    }
}) },
"view": {"controller": /*
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
	// View Layout (base) 

    plugins: ['Prettify'],
    className: 'row-fluid',
    data: [],
    page_name: '',
    page_doc: {},
    section: {},

    initialize: function(options) {
        this._super('initialize', [options]);
        this.page_name = this.options.context.get('page_name').split('_')[1];
        this.section.title = 'Default Views';
        // load up the styleguide css if not already loaded
        //TODO: cleanup styleguide.css and add to main file
        if ($('head #styleguide_css').length === 0) {
            $('<link>')
                .attr({
                    rel: 'stylesheet',
                    href: 'styleguide/assets/css/styleguide.css',
                    id: 'styleguide_css'
                })
                .appendTo('head');
        }
    },

    _render: function() {
        this._super('_render');

        var page_content = app.template.getView( this.page_name + '.' + this.page_name + '-doc', 'Styleguide');

        this.page_doc = app.view.createView({
                context: this.context,
                name: this.page_name,
                module: 'Styleguide',
                layout: this,
                model: this.model,
                readonly: true
            });

        this.$('.styleguide .container-fluid').append(page_content(this));
        this.$('#exampleView').append(this.page_doc.el);

        this.page_doc.render();
    },

    _placeComponent: function(component) {
        this.$('.styleguide').append(component.$el);
    }
}) }
}}
,
"datas": {}

},
		"Feedbacks":{"fieldTemplates": {
"base": {
"rating": {"controller": /*
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
 * Rating field will generate clickable stars that will translate those into
 * a value for the model.
 *
 * Supported properties:
 *
 * - {Number} rate How many stars to display
 * - {Number} default What is the default value of the starts
 *
 * Example:
 *     // ...
 *     array(
 *         'rate' => 3,
 *         'default' => 3,
 *     ),
 *     //...
 *
 * @class View.Fields.Base.Feedbacks.RatingField
 * @alias SUGAR.App.view.fields.BaseFeedbacksRatingField
 * @extends View.Fields.Base.BaseField
 */
({
	// Rating FieldTemplate (base) 


    /**
     * @inheritdoc
     *
     * Initializes default rate and generates stars based on that rate for
     * template.
     */
    initialize: function(options) {
        this._super('initialize', [options]);
        this.def.rate = this.def.rate || 3;
        this.model.setDefault(this.name, this.def.default);
    },

    /**
     * @inheritdoc
     *
     * Fills all stars up to `this.value`. `true` means fill, `false` means not
     * filled.
     */
    format: function(value) {
        this.stars = _.map(_.range(1, this.def.rate + 1), function(n) {
            return n <= value;
        });
        return value;
    },

    /**
     * @inheritdoc
     */
    unformat: function(value) {
        return value + 1;
    },

    /**
     * @override
     * This will bind to a different event (`click` instead of `change`).
     */
    bindDomChange: function() {

        if (!this.model) {
            return;
        }

        var $el = this.$('[data-value]');
        $el.on('click', _.bind(function(evt) {
            var value = $(evt.currentTarget).data('value');
            this.model.set(this.name, this.unformat(value));
        }, this));
    },

    /**
     * @override
     * This will always render on model change.
     */
    bindDataChange: function() {
        if (this.model) {
            this.model.on('change:' + this.name, this.render, this);
        }
    }

}) }
}}
,
"views": {
"base": {
"feedback": {"controller": /*
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
 * This View allows the user to provide Feedback about SugarCRM platform to a
 * GoogleDoc spreadsheet.
 *
 * The view can stay visible while the user is navigating and will use the
 * current URL when the user clicks submit. Other fields are mapped into the
 * spreadsheet and might become metadata driven in the future.
 *
 * @class View.Views.Base.Feedbacks.FeedbackView
 * @alias SUGAR.App.view.views.BaseFeedbacksFeedbackView
 * @extends View.View
 */
({
	// Feedback View (base) 

    plugins: ['ErrorDecoration'],

    events: {
        'click [data-action=submit]': 'submit',
        'click [data-action=close]': 'close'
    },

    /**
     * @inheritdoc
     *
     * During initialize we listen to model validation and if it is valid we
     * {@link #send} the Feedback.
     */
    initialize: function(options) {
        options.model = app.data.createBean('Feedbacks');
        var fieldsMeta = _.flatten(_.pluck(options.meta.panels, 'fields'));
        options.model.fields = {};
        _.each(fieldsMeta, function(field) {
            options.model.fields[field.name] = field;
        });
        this._super('initialize', [options]);
        this.context.set('skipFetch', true);

        this.model.on('validation:start', function() {
            app.alert.dismiss('send_feedback');
        });

        this.model.on('error:validation', function() {
            app.alert.show('send_feedback', {
                level: 'error',
                messages: app.lang.get('LBL_FEEDBACK_SEND_ERROR', this.module)
            });
        }, this);

        this.model.on('validation:success', this.send, this);

        // TODO Once the view renders the button, this is no longer needed
        this.button = $(options.button);

        /**
         * The internal state of this view.
         * By default this view is closed ({@link #toggle} will call render).
         *
         * This is needed because of the bad popover plugin.
         *
         * @type {boolean}
         * @private
         */
        this._isOpen = false;

        var learnMoreUrl = 'http://www.sugarcrm.com/crm/product_doc.php?' + $.param({
            edition: app.metadata.getServerInfo().flavor,
            version: app.metadata.getServerInfo().version,
            lang: app.lang.getLanguage(),
            module: this.module,
            route: 'list'
        });
        /**
         * Aside text with all the translated links and strings to easily show
         * it in the view.
         * @type {String}
         */
        this.aside = new Handlebars.SafeString(app.lang.get('TPL_FEEDBACK_ASIDE', this.module, {
            learnMoreLink: new Handlebars.SafeString('<a href="' + learnMoreUrl + '" target="_blank">' + Handlebars.Utils.escapeExpression(
                app.lang.get('LBL_FEEDBACK_ASIDE_CLICK_MORE', this.module)
            ) + '</a>'),
            contactSupportLink: new Handlebars.SafeString('<a href="http://support.sugarcrm.com" target="_blank">' + Handlebars.Utils.escapeExpression(
                app.lang.get('LBL_FEEDBACK_ASIDE_CONTACT_SUPPORT', this.module)
            ) + '</a>')
        }));
    },

    /**
     * Initializes the popover plugin for the button given.
     *
     * @param {jQuery} button the jQuery button;
     * @private
     */
    _initPopover: function(button) {
        button.popover({
            title: app.lang.get('LBL_FEEDBACK', this.module),
            content: _.bind(function() { return this.$el; }, this),
            html: true,
            placement: 'top',
            trigger: 'manual',
            template: '<div class="popover feedback"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
        });
    },

    /**
     * Close button on the feedback view is pressed.
     *
     * @param {Event} evt The `click` event.
     */
    close: function() {
        this.toggle(false);
    },

    /**
     * Toggle this view (by re-rendering) and allow force option.
     *
     * @param {boolean} [show] `true` to show, `false` to hide, `undefined`
     *   toggles the current state.
     */
    toggle: function(show) {

        if (_.isUndefined(show)) {
            this._isOpen = !this._isOpen;
        } else {
            this._isOpen = show;
        }

        this.button.popover('destroy');
        this.render();

        if (this._isOpen) {
            this._initPopover(this.button);
            this.button.popover('show');
        }

        this.trigger(this._isOpen ? 'show' : 'hide', this, this._isOpen);
    },

    /**
     * @inheritdoc
     * During dispose destroy the popover.
     */
    _dispose: function() {
        if (this.button) {
            this.button.popover('destroy');
        }
        this._super('_dispose');
    },

    /**
     * Submit the form
     */
    submit: function() {
        this.model.doValidate();
    },

    /**
     * Sends the Feedback to google doc page.
     *
     * Populate the rest of the data into the model from different sources of
     * the app.
     */
    send: function() {

        this.model.set({
            timezone: app.user.getPreference('timezone'),
            account_type: app.user.get('type'),
            role: app.user.get('roles').join(', ') || 'n/a',
            feedback_app_path: window.location.href,
            feedback_user_browser: navigator.userAgent + ' (' + navigator.language + ')',
            feedback_user_os: navigator.platform,
            feedback_sugar_version: _.toArray(_.pick(app.metadata.getServerInfo(), 'product_name', 'version')).join(' '),
            company: app.config.systemName
        });

        var post_url = 'https://docs.google.com/forms/d/1iIdfeWma_OUUkaP-wSojZW2GelaxMOBgDq05A8PGHY8/formResponse';

        $.ajax({
            url: post_url,
            type: 'POST',
            data: {
                'entry.98009013': this.model.get('account_type'),
                'entry.1589366838': this.model.get('timezone'),
                'entry.762467312': this.model.get('role'),
                'entry.968140953': this.model.get('feedback_text'),
                'entry.944905780': this.model.get('feedback_app_path'),
                'entry.1750203592': this.model.get('feedback_user_browser'),
                'entry.1115361778': this.model.get('feedback_user_os'),
                'entry.1700062722': this.model.get('feedback_csat'),
                'entry.1926759955': this.model.get('feedback_sugar_version'),
                'entry.398692075': this.model.get('company')
            },
            dataType: 'xml',
            crossDomain: true,
            cache: false,
            context: this,
            timeout: 10000,
            success: this._handleSuccess,
            error: function(xhr) {
                if (xhr.status === 0) {
                    // the status might be 0 which is still a success from a
                    // cross domain request using xml as dataType
                    this._handleSuccess();
                    return;
                }

                app.alert.show('send_feedback', {
                    level: 'error',
                    messages: app.lang.get('LBL_FEEDBACK_NOT_SENT', this.module)
                });
            }
        });
    },

    /**
     * Handles the success of Feedback submission.
     *
     * Show the success message on top (alert), clears the model and hides the
     * view. This will allow the user to be ready for yet another feedback.
     *
     * @private
     */
    _handleSuccess: function() {
        app.alert.show('send_feedback', {
            level: 'success',
            messages: app.lang.get('LBL_FEEDBACK_SENT', this.module),
            autoClose: true
        });
        this.model.clear();
        this.toggle(false);
    }
}) }
}}
,
"layouts": {}
,
"datas": {}

},
		"Tags":{"fieldTemplates": {
"base": {
"editablelistbutton": {"controller": /*
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
 * @class View.Fields.Base.EditablelistbuttonField
 * @alias SUGAR.App.view.fields.BaseEditablelistbuttonField
 * @extends View.Fields.Base.ButtonField
 */
({
	// Editablelistbutton FieldTemplate (base) 

    /**
     * @inheritdoc
     */
    initialize: function(options) {
        this._super('initialize', [options]);

        // Initialize collection
        this.collection = app.data.createBeanCollection('Tags');
    },

    /**
     * @inheritdoc
     */
    saveClicked: function() {
        var options = {
            showAlerts: true,
            success: _.bind(this.handleTagSuccess, this),
            error: _.bind(this.handleTagError, this),
        };
        this.checkForTagDuplicate(options);
    },

    /**
     * Handle fetch error
     * @param {object} e
     */
    handleTagError: function(e) {
        app.alert.show('collections_error', {
            level: 'error',
            messages: 'LBL_TAG_FETCH_ERROR'
        });
    },

    /**
     * Handle fetch success
     * @param {array} collection
     */
    handleTagSuccess: function(collection) {
        if (collection.length > 0) {
            // duplicate found, warn user and quit
            app.alert.show('tag_duplicate', {
                level: 'warning',
                messages: app.lang.get('LBL_EDIT_DUPLICATE_FOUND', 'Tags')
            });
        } else {
            // no duplicate found, continue with save
            this.saveModel();
        }
    },

    /**
     * Check to see if new name is a duplicate
     * @param tagName
     * @param options
     */
    checkForTagDuplicate: function(options) {
        this.collection.filterDef = [{
            'name_lower': {'$equals': this.model.get('name').toLowerCase()}
        }, {
            'id': {'$not_equals': this.model.get('id')}
        }];

        this.collection.fetch(options);
    }
}) }
}}
,
"views": {
"base": {
"merge-duplicates": {"controller": /*
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
 * View for merge duplicates.
 *
 * @class View.Views.Base.Tags.MergeDuplicatesView
 * @alias SUGAR.App.view.views.BaseTagsMergeDuplicatesView
 * @extends View.Views.Base.MergeDuplicatesView
 */
({
	// Merge-duplicates View (base) 

    extendsFrom: 'MergeDuplicatesView',

    /**
     * Saves primary record and triggers `mergeduplicates:primary:saved` event on success.
     * Before saving triggers also `duplicate:unformat:field` event.
     *
     * @override Checks if the tags in the primary record are unique before saving and only saves
     * if no duplicates are found
     * @private
     */
    _savePrimary: function() {
        var self = this;
        var primaryRecordName = this.primaryRecord.get('name');
        var tagCollection = app.data.createBeanCollection('Tags');

        tagCollection.filterDef = {
            'filter': [{'name_lower': {'$equals': primaryRecordName.toLowerCase()}}]
        };

        //fetch records that have the same name as the primaryRecord name
        tagCollection.fetch({
            success: function(tags) {
                //throw a warning if the primaryRecord name is in the tagCollection
                // and it is not one of the merged records
                if (tags.length > 0 && _.isEmpty(_.intersection(_.keys(self.rowFields), _.pluck(tags.models, 'id')))) {
                    app.alert.show('tag_duplicate', {
                        level: 'warning',
                        messages: app.lang.get('LBL_EDIT_DUPLICATE_FOUND', 'Tags')
                    });
                } else {
                    var fields = self.getFieldNames().filter(function(field) {
                        return app.acl.hasAccessToModel('edit', self.primaryRecord, field);
                    }, self);

                    self.primaryRecord.trigger('duplicate:unformat:field');

                    self.primaryRecord.save({}, {
                        fieldsToValidate: fields,
                        success: function() {
                            // Trigger format fields again, because they can come different
                            // from the server (e.g: only teams checked will be in the
                            // response, and we still want to display unchecked teams on the
                            // view)
                            self.primaryRecord.trigger('duplicate:format:field');
                            self.primaryRecord.trigger('mergeduplicates:primary:saved');
                        },
                        error: function(error) {
                            if (error.status === 409) {
                                app.utils.resolve409Conflict(error, self.primaryRecord, function(model, isDatabaseData) {
                                    if (model) {
                                        if (isDatabaseData) {
                                            self.resetRadioSelection(model.id);
                                        } else {
                                            self._savePrimary();
                                        }
                                    }
                                });
                            }
                        },
                        lastModified: self.primaryRecord.get('date_modified'),
                        showAlerts: true,
                        viewed: true,
                        params: {verifiedUnique: true}
                    });
                }
            }
        });
    }
}) },
"record": {"controller": /*
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
 * @class View.Views.Base.Tags.RecordView
 * @alias SUGAR.App.view.views.BaseTagsRecordView
 * @extends View.Views.Base.RecordView
 */
({
	// Record View (base) 

    /**
     * @inheritdoc
     */
    initialize: function(options) {
        // Initialize collection
        this.collection = app.data.createBeanCollection('Tags');
        this._super('initialize', [options]);
    },

    /**
     * @inheritdoc
     */
    saveClicked: function() {
        var options = {
            showAlerts: true,
            success: _.bind(this.handleTagSuccess, this),
            error: _.bind(this.handleTagError, this)
        };
        this.checkForTagDuplicate(options);
    },

    /**
     * Handle fetch error
     * @param {object} e
     */
    handleTagError: function(e) {
        app.alert.show('collections_error', {
            level: 'error',
            messages: 'LBL_TAG_FETCH_ERROR'
        });
    },

    /**
     * Handle fetch success
     * @param {array} collection
     */
    handleTagSuccess: function(collection) {
        if (collection.length > 0) {
            // duplicate found, warn user and quit
            app.alert.show('tag_duplicate', {
                level: 'warning',
                messages: app.lang.get('LBL_EDIT_DUPLICATE_FOUND', 'Tags')
            });
        } else {
            // no duplicate found, continue with save
            this._super('saveClicked');
        }
    },

    /**
     * Check to see if new name is a duplicate
     * @param tagName
     * @param options
     */
    checkForTagDuplicate: function(options) {
        this.collection.filterDef = [{
            'name_lower': {'$equals': this.model.get('name').toLowerCase()}
        }, {
            'id': {'$not_equals': this.model.get('id')}
        }];

        this.collection.fetch(options);
    }
}) },
"create": {"controller": /*
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
 * @class View.Views.Base.Tags.CreateView
 * @alias SUGAR.App.view.views.TagsCreateView
 * @extends View.Views.Base.CreateView
 */
({
	// Create View (base) 

    extendsFrom: 'CreateView',

    saveAndCreateAnotherButtonName: 'save_create_button',

    /**
     * Add event listener for the save and create another button
     * @override
     * @param options
     */
    initialize: function(options) {
        this._super("initialize", [options]);

        // Uncomment this line to add back Save and Create Another functionality
        //this.context.on('button:' + this.saveAndCreateAnotherButtonName + ':click', this.saveAndCreateAnother, this);
    },

    /**
     * Save and reload drawer to allow another save
     */
    saveAndCreateAnother: function() {
        this.initiateSave(_.bind(function () {
            //reload the drawer
            if (app.drawer) {
                app.drawer.load({
                    layout: 'create',
                    context: {
                        create: true
                    }
                });

                //Change the context on the cancel button
                app.drawer.getActiveDrawerLayout().context.on('button:' + this.cancelButtonName + ':click', this.multiSaveCancel, this);
            }
        }, this));
    },

    /**
     * When cancelling, re-render the Tags listview to show updates from previous save
     */
    multiSaveCancel: function() {
        if (app.drawer) {
            var route = app.router.buildRoute('Tags');
            app.router.navigate(route, {trigger: true});
            app.drawer.close(app.drawer.context);
        }
    }
}) },
"preview": {"controller": /*
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
 * @class View.Views.Base.Tags.PreviewView
 * @alias SUGAR.App.view.views.BaseTagsPreviewView
 * @extends View.Views.Tags.PreviewView
 */
({
	// Preview View (base) 

    extendsFrom: 'PreviewView',

    /**
     * @inheritdoc
     */
    initialize: function(options) {
        this._super('initialize', [options]);

        // Initialize collection
        this.collection_preview = app.data.createBeanCollection('Tags');
    },

    /**
     * @inheritdoc
     */
    saveClicked: function() {
        var options = {
            showAlerts: true,
            success: _.bind(this.handleTagSuccess, this),
            error: _.bind(this.handleTagError, this)
        };
        this.checkForTagDuplicate(options);
    },

    /**
     * Handle fetch error
     * @param {object} e
     */
    handleTagError: function(e) {
        app.alert.show('collections_error', {
            level: 'error',
            messages: 'LBL_TAG_FETCH_ERROR'
        });
    },

    /**
     * Handle fetch success
     * @param {array} collection_preview
     */
    handleTagSuccess: function(collection_preview) {
        if (collection_preview.length > 0) {
            // duplicate found, warn user and quit
            app.alert.show('tag_duplicate', {
                level: 'warning',
                messages: app.lang.get('LBL_EDIT_DUPLICATE_FOUND', 'Tags')
            });
        } else {
            // no duplicate found, continue with save
            this._super('saveClicked');
        }
    },

    /**
     * Check to see if new name is a duplicate
     * @param options
     */
    checkForTagDuplicate: function(options) {
        this.collection_preview.filterDef = [{
            'name_lower': {'$equals': this.model.get('name').toLowerCase()}
        }, {
            'id': {'$not_equals': this.model.get('id')}
        }];

        this.collection_preview.fetch(options);
    }
}) }
}}
,
"layouts": {
"base": {
"subpanels": {"controller": /*
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
 * @class View.Layouts.Base.Tags.SubpanelsLayout
 * @alias SUGAR.App.view.layouts.TagsSubpanelsLayout
 * @extends View.Layout.Base.SubpanelsLayout
 */
({
	// Subpanels Layout (base) 

    /**
     * @inheritdoc
     */
    initialize: function(options) {
        // Create dynamic subpanel metadata
        var dSubpanels = app.utils.getDynamicSubpanelMetadata(this.options.module);

        if (dSubpanels.components) {
            _.each(dSubpanels.components, function(sub) {
                if (sub.layout) {
                    sub['override_paneltop_view'] = 'panel-top-readonly';
                }
            }, this);
        }

        // Merge dynamic subpanels with existing metadata
        options.meta = _.extend(
            options.meta || {},
            dSubpanels
        );

        // Call the parent
        this._super('initialize', [options]);
    }
}) }
}}
,
"datas": {}

},
		"Categories":{"fieldTemplates": {}
,
"views": {
"base": {
"tree": {"controller": /*
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
	// Tree View (base) 

    plugins: ['JSTree', 'NestedSetCollection'],

    events: {
        'keyup [data-name=search]': '_keyHandler',
        'click [data-role=icon-remove]': function() {
            this.trigger('search:clear');
        }
    },

    /**
     * Default settings.
     *
     * @property {Object} _defaultSettings
     * @property {boolean} _defaultSettings.showMenu Display menu or not.
     * @property {number} _defaultSettings.liHeight Height (pixels) of row.
     */
    _defaultSettings: {
        showMenu: true,
        liHeight: 37
    },

    /**
     * Aggregated settings.
     * @property {Object} _settings
     */
    _settings: null,

    /**
     * List of overridden callbacks.
     * @property {Object} _callbacks
     */
    _callbacks: null,

    /**
     * @inheritdoc
     *
     * Add listener for 'search:clear' and 'click:add_node_button' events.
     * Init settings.
     * Init callbacks.
     */
    initialize: function(options) {
        this.on('search:clear', function() {
            var el = this.$el.find('input[data-name=search]');
            el.val('');
            this._toggleIconRemove(!_.isEmpty(el.val()));
            this.searchNodeHandler(el.val());
        }, this);
        this._super('initialize', [options]);
        this._initSettings();
        this._initCallbacks();
        this.layout.on('click:add_node_button', this.addNodeHandler, this);
    },

    /**
     * @inheritdoc
     *
     * @example Call _renderTree function with the following parameters.
     * <pre><code>
     * this._renderTree($('.tree-block'), this._settings, {
     *      onToggle: this.jstreeToggle,
     *      onSelect: this.jstreeSelect
     * });
     * </code></pre>
     */
    _renderHtml: function(ctx, options) {
        this._super('_renderHtml', [ctx, options]);
        this._renderTree($('.tree-block'), this._settings, this._callbacks);
    },

    /**
     * Initialize _settings object.
     * @return {Object}
     * @private
     */
    _initSettings: function() {
        this._settings = {
            settings: _.extend({},
                this._defaultSettings,
                this.context.get('treeoptions') || {},
                this.def && this.def.settings || {}
            )
        };
        return this;
    },

    /**
     * Initialize _callbacks object.
     * @return {Object}
     * @private
     */
    _initCallbacks: function() {
        this._callbacks = _.extend({},
            this.context.get('treecallbacks') || {},
            this.def && this.def.callbacks || {}
        );
        return this;
    },

    /**
     * Handle submit in search field.
     * @param {Event} event
     * @return {boolean}
     * @private
     */
    _keyHandler: function(event) {
        this._toggleIconRemove(!_.isEmpty($(event.currentTarget).val()));
        if (event.keyCode != 13) return false;
        this.searchNodeHandler(event);
    },

    /**
     * Append or remove an icon to the search input so the user can clear the search easily.
     * @param {boolean} addIt TRUE if you want to add it, FALSE to remove
     */
    _toggleIconRemove: function(addIt) {
        if (addIt && !this.$('i[data-role=icon-remove]')[0]) {
            this.$el.find('div[data-container=filter-view-search]').append('<i class="fa fa-times add-on" data-role="icon-remove"></i>');
        } else if (!addIt) {
            this.$('i[data-role=icon-remove]').remove();
        }
    },

    /**
     * Custom add handler.
     */
    addNodeHandler: function() {
        this.addNode(app.lang.get('LBL_DEFAULT_TITLE', this.module), 'last', false, true, false);
    },

    /**
     * Custom search handler.
     * @param {Event} event DOM event.
     */
    searchNodeHandler: function(event) {
        this.searchNode($(event.currentTarget).val());
    },

    /**
     * @inheritdoc
     */
    _dispose: function() {
        this.off('search:clear');
        this._super('_dispose');
    }
}) },
"nested-set-headerpane": {"controller": /*
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
 * @class View.Views.Base.NestedSetHeaderpaneView
 * @alias SUGAR.App.view.views.BaseNestedSetHeaderpaneView
 * @extends View.Views.Base.HeaderpaneView
 */
({
	// Nested-set-headerpane View (base) 

    extendsFrom: 'HeaderpaneView',

    /**
     * @inheritdoc
     */
    _renderHtml: function() {
        var titleTemplate = Handlebars.compile(this.context.get('title') || app.lang.getAppString('LBL_SEARCH_AND_SELECT')),
            moduleName = app.lang.get('LBL_MODULE_NAME', this.module);
        this.title = titleTemplate({module: moduleName});
        this._super('_renderHtml');

        this.layout.on('selection:closedrawer:fire', _.once(_.bind(function() {
            this.$el.off();
            app.drawer.close();
        }, this)));
    }
}) }
}}
,
"layouts": {
"base": {
"nested-set-list": {"controller": /*
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
 * @class View.Layouts.Base.NestedSetListLayout
 * @alias SUGAR.App.view.layouts.BaseNestedSetListLayout
 * @extends View.Layout
 */
({
	// Nested-set-list Layout (base) 

    plugins: ['ShortcutSession'],

    shortcuts: [
        'Sidebar:Toggle'
    ],

    /**
     * @inheritdoc
     */
    loadData: function(options) {
        var fields = _.union(this.getFieldNames(), (this.context.get('fields') || []));
        this.context.set('fields', fields);
        this._super('loadData', [options, false]);
    }
}) }
}}
,
"datas": {}

},
		"Library":{"fieldTemplates": {}
,
"views": {}
,
"layouts": {}
,
"datas": {}

},
		"EmailAddresses":{"fieldTemplates": {}
,
"views": {}
,
"layouts": {}
,
"datas": {}

},
		"Words":{"fieldTemplates": {}
,
"views": {}
,
"layouts": {}
,
"datas": {}

},
		"Sugar_Favorites":{"fieldTemplates": {}
,
"views": {}
,
"layouts": {}
,
"datas": {}

},
		"KBDocuments":{"fieldTemplates": {}
,
"views": {}
,
"layouts": {}
,
"datas": {}

},
		"KBContents":{"fieldTemplates": {
"base": {
"htmleditable_tinymce": {"controller": /*
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
	// Htmleditable_tinymce FieldTemplate (base) 

    extendsFrom: 'Htmleditable_tinymceField',

    /**
     * Flag indicates, should we disable field.
     * @property {boolean}
     */
    shouldDisable: null,

    /**
     * @inheritdoc
     * Additional override fieldSelector property from field's meta.
     */
    initialize: function(opts) {
        if (opts.view.action === 'filter-rows') {
            opts.viewName = 'filter-rows-edit';
        }
        this._super('initialize', [opts]);
        this.shouldDisable = false;
        if (!_.isUndefined(this.def.fieldSelector)) {
            this.fieldSelector = '[data-htmleditable=' + this.def.fieldSelector + ']';
        }
        this.before('render', function() {
            if (this.shouldDisable != this.isDisabled()) {
                this.setDisabled(this.shouldDisable);
                return false;
            }
        }, this);
    },

    /**
     * @inheritdoc
     *
     * Apply document css style to editor.
     */
    getTinyMCEConfig: function() {
        var config = this._super('getTinyMCEConfig'),
            content_css = [];

        _.each(document.styleSheets, function(style) {
            if (style.href) {
                content_css.push(style.href);
            }
        });
        config.content_css = content_css;
        config.body_class = 'kbdocument-body';

        config.file_browser_callback = _.bind(this.tinyMCEFileBrowseCallback, this);

        return config;
    },

    /**
     * @inheritdoc
     * Need to strip tags for list and activity stream.
     */
    format: function(value) {
        var result;
        switch (this.view.tplName) {
            case 'audit':
            case 'list':
            case 'activitystream':
                result = this.stripTags(value);
                break;
            default:
                result = this._super('format', [value]);
                break;
        }
        return result;
    },

    /**
     * Strip HTML tags from text.
     * @param {string} value Value to strip tags from.
     * @return {string} Plain text.
     */
    stripTags: function(value) {
        var $el = $('<div/>').html(value),
            texts = $el.contents()
            .map(function() {
                if (this.nodeType === 1 && this.nodeName != 'STYLE' && this.nodeName != 'SCRIPT') {
                    return this.textContent.replace(/ +?\r?\n/g, ' ').trim();
                }
                if (this.nodeType === 3) {
                    return this.textContent.replace(/ +?\r?\n/g, ' ').trim();
                }
            });
        return _.filter(texts, function(value) {
            return (value.length > 0);
        }).join(' ');
    },

    /**
     * @inheritdoc
     * Should check, if field should be disabled while mode change.
     */
    setMode: function(mode) {
        this.shouldDisable = (mode === 'edit' &&
            (this.view.tplName === 'list' ||
            (this.view.tplName == '' && (this.tplName == 'subpanel-list' || this.tplName == 'list'))
            )
        );
        this._super('setMode', [mode]);
    },

    /**
     * @inheritdoc
     */
    getEditorContent: function() {
        var text = this._htmleditor.getContent({format: 'html'});
        //We don't need to get empty html, to prevent model changes.
        if (text !== '') {
            text = this._super('getEditorContent');
        }
        return text;
    },

    /**
     * @inheritdoc
     */
    setViewName: function ()
    {
        this.destroyTinyMCEEditor();
        this._super('setViewName', arguments);
    }
}) },
"nestedset": {"controller": /*
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
 * @class View.Fields.Base.KBContents.NestedsetField
 * @alias SUGAR.App.view.fields.BaseNestedsetField
 * @extends View.Fields.Base.BaseField
 */
({
	// Nestedset FieldTemplate (base) 

    /**
     * @inheritdoc
     */
    fieldTag: 'div',

    /**
     * Root ID of a shown Nestedset.
     * @property {String}
     */
    categoryRoot: null,

    /**
     * Module which implements Nestedset.
     * @property {String}
     */
    moduleRoot: null,

    /**
     * @inheritdoc
     */
    extendsFrom: 'BaseField',

    /**
     * @inheritdoc
     */
    plugins: ['JSTree', 'NestedSetCollection'],

    /**
     * Selector for tree's placeholder.
     * @property {String}
     */
    ddEl: '[data-menu=dropdown]',

    /**
     * Flag indicates if input for new node shown.
     * @property {Boolean}
     */
    inCreation: false,

    /**
     * Callback to handle global dropdown click event.
     * @property {Callback}
     */
    dropdownCallback: null,

    /**
     * @inheritdoc
     */
    events: {
        'click [data-role=treeinput]': 'openDropDown',
        'click': 'handleClick',
        'keydown [data-role=secondinput]': 'handleKeyDown',
        'click [data-action=full-screen]': 'fullScreen',
        'click [data-action=create-new]': 'switchCreate',
        'keydown [data-role=add-item]': 'handleKeyDown',
        'click [data-action=show-list]': 'showList',
        'click [data-action=clear-field]': 'clearField'
    },

    /**
     * @inheritdoc
     */
    initialize: function(opts) {
        this._super('initialize', [opts]);
        var module = this.def.config_provider || this.context.get('module'),
            config = app.metadata.getModule(module, 'config');
        this.categoryRoot = this.def.category_root || config.category_root || '';
        this.moduleRoot = this.def.category_provider || this.def.data_provider || module;
        this.dropdownCallback = _.bind(this.handleGlobalClick, this);
        this.emptyLabel = app.lang.get(
            'LBL_SEARCH_SELECT_MODULE',
            this.module,
            {module: app.lang.get(this.def.label, this.module)}
        );
        this.before('render', function() {
            if (this.$(this.ddEl).length !== 0 && this._dropdownExists()) {
                this.closeDropDown();
            }
            return true;
        });
    },

    /**
     * @inheritdoc
     */
    _render: function() {
        var treeOptions = {},
            $ddEl,
            self = this;
        this._super('_render');
        $ddEl = this.$(this.ddEl);
        if ($ddEl.length !== 0 && this._dropdownExists()) {
            $ddEl.dropdown();
            $ddEl.data('dropdown').opened = false;
            $ddEl.off('click.bs.dropdown');
            treeOptions = {
                settings: {
                    category_root: this.categoryRoot,
                    module_root: this.moduleRoot
                },
                options: {}
            };
            this._renderTree(
                this.$('[data-place=tree]'),
                treeOptions,
                {
                    'onSelect': _.bind(this.selectedNode, this),
                    'onLoad': function () {
                        if (!self.disposed) {
                            self.toggleSearchIcon(false);
                        }
                    }
                }
            );
            this.toggleSearchIcon(true);
            this.toggleClearIcon();
        }
    },

    /**
     * Gets HTML placeholder for a field.
     * @return {String} HTML placeholder for the field as Handlebars safe string.
     */
    getPlaceholder: function() {
        // if this in the filter row, the placeholder must have some css rules
        if (this.view && this.view.action === 'filter-rows') {
            return new Handlebars.SafeString('<span sfuuid="' + this.sfId + '" class="nestedset-filter-container"></span>');
        }
        return this._super('getPlaceholder');
    },

    /**
     * Show dropdown.
     * @param {Event} evt Triggered mouse event.
     */
    openDropDown: function(evt) {
        if (!this._dropdownExists()) {
            return;
        }
        var dropdown = this.$(this.ddEl).data('dropdown');
        if (dropdown.opened === true) {
            return;
        }
        this.view.trigger('list:scrollLock', true);
        $('body').on('click.bs.dropdown.data-api', this.dropdownCallback);
        evt.stopPropagation();
        evt.preventDefault();
        _.defer(function(dropdown, self) {
            var treePosition, $input;
            if (self.disposed) {
                return;
            }
            treePosition = self.$el.find('[data-role=treeinput]').position();
            $input = self.$('[data-role=secondinput]');
            self.$(self.ddEl).css({'left': treePosition.left - 1 + 'px', 'top': treePosition.top + 27 + 'px'});
            self.$(self.ddEl).dropdown('toggle');
            $input.val('');
            dropdown.opened = true;
            $input.focus();
        }, dropdown, this);
    },

    /**
     * Close dropdown.
     * @return {Boolean} Return `true` if dropdown has been closed, `false` otherwise.
     */
    closeDropDown: function() {
        var dropdown = this.$(this.ddEl).data('dropdown');
        if (!dropdown) {
            return false;
        }
        if (!dropdown.opened === true) {
            return false;
        }
        this.view.trigger('list:scrollLock', false);
        this.$(this.ddEl).dropdown('toggle');
        if (this.inCreation) {
            this.switchCreate();
        }
        dropdown.opened = false;
        $('body').off('click.bs.dropdown.data-api', this.dropdownCallback);
        this.clearSelection();
        return true;
    },

    /**
     * Toggle icon in search field while loading tree.
     * @param {Boolean} hide Flag indicates would we show the icon.
     */
    toggleSearchIcon: function(hide) {
        this.$('[data-role=secondinputaddon]')
            .toggleClass('fa-search', !hide)
            .toggleClass('fa-spinner', hide)
            .toggleClass('fa-spin', hide);
    },

    /**
     * Toggle clear icon in field.
     */
    toggleClearIcon: function() {
        if (_.isEmpty(this.model.get(this.def.name))) {
            this.$el.find('[data-action=clear-field]').hide();
        } else {
            this.$el.find('[data-action=clear-field]').show();
        }
    },

    /**
     * Handle global dropdown clicks.
     * @param evt {Event} Triggered mouse event.
     */
    handleGlobalClick: function(evt) {
        if (this._dropdownExists()) {
            this.closeDropDown();
            evt.preventDefault();
            evt.stopPropagation();
        }
    },

    /**
     * Handle all clicks for the field.
     * Need to catch for preventing external events.
     * @param evt {Event} Triggered mouse event.
     */
    handleClick: function(evt) {
        evt.preventDefault();
        evt.stopPropagation();
    },

    /**
     *  Search in the tree.
     */
    searchTreeValue: function() {
        var val = this.$('[data-role=secondinput]').val();
        this.searchNode(val);
    },

    /**
     * @override `Editable` plugin event to prevent default behavior.
     */
    bindKeyDown: function() {},

    /**
     * @override `Editable` plugin event to prevent default behavior.
     */
    bindDocumentMouseDown: function() {},

    /**
     * @override `Editable` plugin event to prevent default behavior.
     */
    focus: function() {
        if (this._dropdownExists()) {
            this.$('[data-role=treeinput]').click();
        }
    },

    /**
     * Handle key events in input fields.
     * @param evt {Event} Triggered key event.
     */
    handleKeyDown: function(evt) {
        var role = $(evt.currentTarget).data('role');
        if (evt.keyCode !== 13 && evt.keyCode !== 27) {
            return;
        }
        evt.preventDefault();
        evt.stopPropagation();
        switch (evt.keyCode) {
            case 13:
                switch (role) {
                    case 'secondinput':
                        this.searchTreeValue(evt);
                        break;
                    case 'add-item':
                        this.addNew(evt);
                        break;
                }
                break;
            case 27:
                switch (role) {
                    case 'secondinput':
                        this.closeDropDown();
                        break;
                    case 'add-item':
                        this.switchCreate();
                        break;
                }
                break;
        }
    },

    /**
     * Set value of a model.
     * @param {String} id Related ID value.
     * @param {String} val Related value.
     */
    setValue: function(id, val) {
        this.model.set(this.def.id_name, id);
        this.model.set(this.def.name, val);
    },

    /**
     * @inheritdoc
     *
     * No data changes to bind.
     */
    bindDomChange: function () {
    },

    /**
     * @inheritdoc
     *
     * Set right value in DOM for the field.
     */
    bindDataChange: function() {
        this.model.on("change:" + this.name, this.dataChangeUpdate, this);
    },

    /**
     * Update field data.
     */
    dataChangeUpdate: function() {
        if (this._dropdownExists()) {
            var id = this.model.get(this.def.id_name),
                name = this.model.get(this.def.name),
                child = this.collection.getChild(id);
            if (!name && child) {
                name = child.get(this.def.rname);
            }
            if (!name) {
                bean = app.data.createBean(this.moduleRoot, {id: id});
                bean.fetch({
                    success: _.bind(function(data) {
                        if (this.model) {
                            this.model.set(this.def.name, data.get(this.def.rname));
                        }
                    }, this)
                });
            }
            this.$('[data-role="treevalue"]','[name=' + this.def.name + ']').text(name);
            this.$('[name=' + this.def.id_name + ']').val(id);
        }
        if (!this.disposed) {
            this.render();
        }
    },

    /**
     * @inheritdoc
     */
    _dispose: function() {
        if (this._dropdownExists()) {
            $('body').off('click.bs.dropdown.data-api', this.dropdownCallback);
        }
        this._super('_dispose');
    },

    /**
     * Open drawer with tree list.
     */
    fullScreen: function() {
        var treeOptions = {
            category_root: this.categoryRoot,
            module_root: this.moduleRoot,
            plugins: ['dnd', 'contextmenu'],
            isDrawer: true
            },
            treeCallbacks = {
                'onRemove': function(node) {
                    if (this.context.parent) {
                        this.context.parent.trigger('kbcontents:category:deleted', node);
                    }
                },
                'onSelect': function(node) {
                    if (!_.isEmpty(node) && !_.isEmpty(node.id) && !_.isEmpty(node.name)) {
                        return true;
                    }
                }
            },
        // @TODO: Find out why params from context for drawer don't pass to our view tree::_initSettings
            context = _.extend({}, this.context, {treeoptions: treeOptions, treecallbacks: treeCallbacks});
        app.drawer.open({
            layout: 'nested-set-list',
            context: {
                module: 'Categories',
                parent: context,
                treeoptions: treeOptions,
                treecallbacks: treeCallbacks
            }
        }, _.bind(this.selectedNode, this));
    },

    /**
     * Open drawer with module records.
     */
    showList: function() {
        var popDef = {},
            filterOptions;
        popDef[this.def.id_name] = this.model.get(this.def.id_name);
        filterOptions = new app.utils.FilterOptions()
            .config(this.def)
            .setFilterPopulate(popDef)
            .format();

        app.drawer.open({
            layout: 'prefiltered',
            module: this.module,
            context: {
                module: this.module,
                filterOptions: filterOptions,
            }
        });
    },

    /**
     * Add new element to the tree.
     * @param {Event} evt Triggered key event.
     */
    addNew: function(evt) {
        var name = $(evt.target).val().trim();
        if (!name) {
            app.alert.show('wrong_node_name', {
                level: 'error',
                messages: app.error.getErrorString('empty_node_name', this),
                autoClose: true
            });
        } else {
            this.addNode(name, 'last', true, false, true);
            this.switchCreate();
        }
    },

    /**
     * Create and hide input for new element.
     */
    switchCreate: function() {
        var $options = this.$('[data-place=bottom-options]'),
            $create = this.$('[data-place=bottom-create]'),
            $input = this.$('[data-role=add-item]'),
            placeholder = app.lang.get('LBL_CREATE_CATEGORY_PLACEHOLDER', this.module);
        if (this.inCreation === false) {
            $options.hide();
            $create.show();
            $input
                .tooltip({
                    title: placeholder,
                    container: 'body',
                    trigger: 'manual',
                    delay: {show: 200, hide: 100}
                })
                .tooltip('show');
            $input.focus().select();
        } else {
            $input.tooltip('destroy');
            $input.val('');
            $create.hide();
            $options.show();
        }
        this.inCreation = !this.inCreation;
    },

    /**
     * Clear input element.
     */
    clearField: function(event) {
        event.preventDefault();
        event.stopPropagation();
        this.setValue('', '');
        this.$('[data-role="treevalue"]','[name=' + this.def.name + ']').text(this.emptyLabel);
        this.$('[name=' + this.def.id_name + ']').val();
        this.toggleClearIcon();
    },

    /**
     * Callback to handle selection of the tree.
     * @param data {Object} Data from selected node.
     */
    selectedNode: function(data) {
        if (_.isEmpty(data) || _.isEmpty(data.id) || _.isEmpty(data.name)) {
            return;
        }
        var id = data.id,
            val = data.name;
        this.setValue(id, val);
        this.closeDropDown();
        this.toggleClearIcon();
    },

    /**
     * Checks whether we need to work with dropdown on the view.
     * @private
     */
    _dropdownExists: function() {
        return this.action === 'edit' || (this.meta && this.meta.view === 'edit');
    },

    /**
     * We don't need tooltip, because it breaks dropdown.
     * @inheritdoc
     */
    decorateError: function(errors) {
        var $tooltip = $(this.exclamationMarkTemplate()),
            $ftag = this.$('span.select-arrow');
        this.$el.closest('.record-cell').addClass('error');
        this.$el.addClass('error');
        $ftag.after($tooltip);
        this.$('[data-role=parent]').addClass('error');
    },

    /**
     * Need to remove own error decoration.
     * @inheritdoc
     */
    clearErrorDecoration: function() {
        this.$el.closest('.record-cell').removeClass('error');
        this.$el.removeClass('error');
        this.$('[data-role=parent]').removeClass('error');
        this.$('.add-on.error-tooltip').remove();
        if (this.view && this.view.trigger) {
            this.view.trigger('field:error', this, false);
        }
    },

    /**
     * @inheritdoc
     */
    exclamationMarkTemplate: function() {
        var extraClass = this.view.tplName === 'record' ? 'top0' : 'top4';
        return '<span class="error-tooltip ' + extraClass + ' add-on" data-contexclamationMarkTemplateainer="body">' +
        '<i class="fa fa-exclamation-circle">&nbsp;</i>' +
        '</span>';
    }
}) },
"status": {"controller": /*
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
	// Status FieldTemplate (base) 

    /**
     * status Widget.
     *
     * Extends from EnumField widget adding style property according to specific
     * status.
     */
    extendsFrom: 'BadgeSelectField',

    /**
     * @inheritdoc
     */
    initialize: function(options) {
        this._super('initialize', [options]);

        /**
         * An object where its keys map to specific status and color to matching
         * CSS classes.
         */
        this.statusClasses = {
            'draft': 'label-pending',
            'in-review': 'label-warning',
            'approved': 'label-info',
            'published': 'label-success',
            'expired': 'label'
        };

        this.type = 'badge-select';
    },

    /**
     * @inheritdoc
     */
    format: function(value) {
        if (this.action === 'edit') {
            var def = this.def.default ? this.def.default : value;
            value = (this.items[value] ? value : false) ||
            (this.items[def] ? def : false) ||
            value;
        }
        return this._super('format', [value]);
    }
}) },
"rowaction": {"controller": /*
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
 * Rowaction is a button that when selected will trigger a Backbone Event.
 *
 * @class View.Fields.KBContents.RowactionField
 * @alias SUGAR.App.view.fields.KBContentsRowactionField
 * @extends View.Fields.Base.RowactionField
 */
({
	// Rowaction FieldTemplate (base) 

    extendsFrom: 'RowactionField',

    /**
     * @inheritdoc
     */
    initialize: function(options) {
        this._super('initialize', [options]);

        if ((this.options.def.name === 'create_localization_button' ||
            this.options.def.name === 'create_revision_button') && !app.acl.hasAccessToModel('view', this.model)) {
            this.hide();
        }
    }
}) },
"enum-config": {"controller": /*
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
	// Enum-config FieldTemplate (base) 

    extendsFrom: 'EnumField',

    /**
     * @inheritdoc
     */
    initialize: function(opts) {
        this._super('initialize', [opts]);
        if (this.model.isNew() && this.view.action === 'detail') {
            this.def.readonly = false;
        } else {
            this.def.readonly = true;
        }
    },

    /**
     * @inheritdoc
     */
    loadEnumOptions: function(fetch, callback) {
        var module = this.def.module || this.module,
            optKey = this.def.key || this.name,
            config = app.metadata.getModule(module, 'config') || {};
        this._setItems(config[optKey]);
        fetch = fetch || false;

        if (fetch || !this.items) {
            var url = app.api.buildURL(module, 'config', null, {});
            app.api.call('read', url, null, {
                success: _.bind(function(data) {
                    this._setItems(data[optKey]);
                    callback.call(this);
                }, this)
            });
        }
    },

    /**
     * @inheritdoc
     */
    _loadTemplate: function() {
        this.type = 'enum';
        this._super('_loadTemplate');
        this.type = this.def.type;
    },

    /**
     * Sets current items.
     * @param {Array} values Values to set into items.
     */
    _setItems: function(values) {
        var result = {},
            def = null;
        _.each(values, function(val) {
            var tmp = _.omit(val, 'primary');
            _.extend(result, tmp);
            if (val.primary) {
                def = _.first(_.keys(tmp));
            }
        });
        this.items = result;
        if (def && _.isUndefined(this.model.get(this.name))) {
            this.defaultOnUndefined = false;
            // call with {silent: true} on, so it won't re-render the field, since we haven't rendered the field yet
            this.model.set(this.name, def, {silent: true});
            //Forecasting uses backbone model (not bean) for custom enums so we have to check here
            if (_.isFunction(this.model.setDefault)) {
                this.model.setDefault(this.name, def);
            }
        }
    },

    /**
     * @inheritdoc
     *
     * Filters language items for different modes.
     * Disable edit mode for editing revision and for creating new revision.
     * Displays only available langs for creating localization.
     */
    setMode: function(mode) {
        if (mode == 'edit') {
            if (this.model.has('id')) {
                this.setDisabled(true);
            } else if (this.model.has('related_languages')) {
                if (this.model.has('kbarticle_id')) {
                    this.setDisabled(true);
                } else {
                    _.each(this.model.get('related_languages'), function(lang) {
                        delete this.items[lang];
                    }, this);
                    this.model.set(this.name, _.first(_.keys(this.items)), {silent: true});
                }
            }
        }
        this._super('setMode', [mode]);
    }
}) },
"attachments": {"controller": /*
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
	// Attachments FieldTemplate (base) 

    /**
     * @inheritdoc
     */
    events: {
        'click [data-action=download-all]': 'startDownloadArchive'
    },

    plugins: ['DragdropAttachments'],

    /**
     * @property {Object} `Select2` object.
     */
    $node: null,

    /**
     * @property {string} Selector for `Select2` dropdown.
     */
    fieldSelector: '',

    /**
     * @property {string} Unique ID for file input.
     */
    cid: null,

    /**
     * @property {string} Selector for file input.
     */
    fileInputSelector: '',

    /**
     * @property {Object} Handlebar object.
     */
    _select2formatSelectionTemplate: null,

    /**
     * Label for `Download all`.
     */
    download_label: '',

    /**
     * @inheritdoc
     */
    initialize: function (opts) {
        var evt = {},
            relate,
            self = this;
        evt['change ' +  this.getFileNode().selector] = 'uploadFile';
        this.events = _.extend({}, this.events, opts.def.events, evt);

        this.fileInputSelector = opts.def.fileinput || '';
        this.fieldSelector = opts.def.field || '';
        this.cid = _.uniqueId('attachment');

        this._super('initialize', [opts]);
        this._select2formatSelectionTemplate = app.template.get('f.attachments.KBContents.selection-partial');

        /**
         * Selects attachments related module.
         */
        if (this.model.id) {
            relate = this.model.getRelatedCollection(this.def.link);
            relate.fetch({
                relate: true,
                success: function() {
                    if (self.disposed === true) {
                        return;
                    }
                    self.render();
                }
            });
        }

        /**
         * Override handling on drop attachment.
         */
        this.before('attachments:drop', this._onAttachmentDrop, this);
    },

    /**
     * @inheritdoc
     */
    format: function (value) {
        return _.map(value, function (item) {
            var forceDownload = !item.isImage,
                mimeType = item.isImage ? 'image' : 'application/octet-stream',
                fileName = item.name.substring(0, item.name.lastIndexOf(".")),
                fileExt = item.name.substring(item.name.lastIndexOf(".") + 1).toLowerCase(),
                urlOpts = {
                    module: this.def.module,
                    id: item.id,
                    field: this.def.modulefield
                };

            fileExt = !_.isEmpty(fileExt) ? '.' + fileExt : fileExt;

            return _.extend(
                {},
                {
                    mimeType: mimeType,
                    fileName: fileName,
                    fileExt: fileExt,
                    url: app.api.buildFileURL(
                        urlOpts,
                        {
                            htmlJsonFormat: false,
                            passOAuthToken: false,
                            cleanCache: true,
                            forceDownload: forceDownload
                        }
                    )
                },
                item
            );
        }, this);
    },

    /**
     * @inheritdoc
     */
    _render: function () {
        if (this.action == 'noaccess') {
            return;
        }
        this.download_label = (this.value && this.value.length > 1) ? 'LBL_DOWNLOAD_ALL' : 'LBL_DOWNLOAD_ONE';
        // Please, do not put this._super call before acl check,
        // due to _loadTemplate function logic from sidecar/src/view.js file
        this._super('_render',[]);

        this.$node = this.$(this.fieldSelector + '[data-type=attachments]');
        this.setSelect2Node();
        if (this.$node.length > 0) {
            this.$node.select2({
                allowClear: true,
                multiple: true,
                containerCssClass: 'select2-choices-pills-close span12 with-padding kb-attachmentlist-details-view',
                tags: [],
                formatSelection: _.bind(this.formatSelection, this),
                width: 'off',
                escapeMarkup: function(m) {
                    return m;
                }
            });
            $(this.$node.data('select2').container).attr('data-attachable', true);
            this.refreshFromModel();
        }
    },

    /**
     *  Update `Select2` data from model.
     */
    refreshFromModel: function () {
        var attachments = [];
        if (this.model.has(this.name)) {
            attachments = this.model.get(this.name);
        }
        this.$node.select2('data', this.format(attachments));
    },

    /**
     * Set `$node` as `Select2` object.
     * Unlink and delete attached notes on remove from select2.
     */
    setSelect2Node: function () {
        var self = this;
        if (!this.$node || this.$node.length == 0) {
            return;
        }
        this.$node.off('select2-removed');
        this.$node.off('select2-opening');

        this.$node.on('select2-removed', function(evt) {
            var note = app.data.createBean('Notes', {id: evt.val});
            note.fetch({
                success: function(model) {
                    // Do nothing with a note of original record.
                    if (!self.model.id && model.get('parent_id')) {
                        return;
                    }
                    model.destroy();
                }
            });
            self.model.set(self.name, _.filter(self.model.get(self.name),
                function(file) {
                    return (file.id !== evt.val);
                }
            ));
            self.render();
        });
        /**
         * Disables dropdown for `Select2`
         */
        this.$node.on('select2-opening', function (evt) {
            evt.preventDefault();
        });

    },

    /**
     * Return file input.
     * @return {Object}
     */
    getFileNode: function () {
        return this.$(this.fileInputSelector + '[data-type=fileinput]');
    },

    /**
     * @inheritdoc
     */
    bindDomChange: function () {
        this.setSelect2Node();
    },

    /**
     * Upload file to server.
     * Create a real note for an attachment to use drag and drop and the file in body.
     * Do not create a related note because the attachment field is enabled on create view.
     */
    uploadFile: function() {
        var self = this,
            $input = this.getFileNode(),
            note = app.data.createBean('Notes'),
            fieldName = 'filename';

        note.save({name: $input[0].files[0].name, portal_flag: true}, {
            success: function(model) {
                // FileApi uses one name for file key and defs.
                var $cloneInput = _.clone($input);
                $cloneInput.attr('name', fieldName);
                model.uploadFile(
                    fieldName,
                    $input,
                    {
                        success: function(rsp) {
                            var att = {};
                            att.id = rsp.record.id;
                            att.isImage = (rsp[fieldName]['content-type'].indexOf('image') !== -1);
                            att.name = rsp[fieldName].name;
                            self.model.set(self.name, _.union([], self.model.get(self.name) || [], [att]));
                            $input.val('');
                            self.render();
                        },
                        error: function(error) {
                            app.alert.show('delete_confirmation', {
                                level: 'error',
                                title: 'LBL_EMAIL_ATTACHMENT_UPLOAD_FAILED',
                                messages: [error.error_message]
                            });
                        }
                    }
                );
            }
        });
    },

    /**
     * Handler for 'attachments:drop' event.
     * This event is triggered when user drops file on the file field.
     *
     * @param {Event} event Drop event.
     * @return {boolean} Returns 'false' to prevent running default behavior.
     */
    _onAttachmentDrop: function(event) {
        event.preventDefault();
        var self = this,
            data = new FormData(),
            fieldName = 'filename';

        _.each(event.dataTransfer.files, function(file) {
            data.append(this.name, file);

            var note = app.data.createBean('Notes');
            note.save({name: file.name}, {
                success: function(model) {
                    var url = app.api.buildFileURL({
                        module: model.module,
                        id: model.id,
                        field: 'filename'
                    }, {htmlJsonFormat: false});
                    data.append('filename', file);
                    data.append('OAuth-Token', app.api.getOAuthToken());

                    $.ajax({
                        url: url,
                        type: 'POST',
                        data: data,
                        processData: false,
                        contentType: false,
                        success: function(rsp) {
                            var att = {};
                            att.id = rsp.record.id;
                            att.isImage = (rsp[fieldName]['content-type'].indexOf('image') !== -1);
                            att.name = rsp[fieldName].name;
                            self.model.set(self.name, _.union([], self.model.get(self.name) || [], [att]));
                            self.render();
                        }
                    });
                }
            });
        }, this);

        return false;
    },

    /**
     * Format selection for `Select2` to display.
     * @param {Object} attachment
     * @return {string}
     */
    formatSelection: function (attachment) {
        return this._select2formatSelectionTemplate(attachment);
    },

    /**
     * Download archived files from server.
     */
    startDownloadArchive: function () {
        var params = {
            format:'sugar-html-json',
            link_name: this.def.link,
            platform: app.config.platform
        };
        params[(new Date()).getTime()] = 1;

        // todo: change buildURL to buildFileURL when will be allowed "link" attribute
        var uri = app.api.buildURL(this.model.module, 'file', {
            module: this.model.module,
            id: this.model.id,
            field: this.def.modulefield
        }, params);

        app.api.fileDownload(
            uri,
            {
                error: function (data) {
                    // refresh token if it has expired
                    app.error.handleHttpError(data, {});
                }
            },
            {iframe: this.$el}
        );
    },

    /**
     * @inheritdoc
     *
     * Disposes event listeners on `Select2` object.
     */
    dispose: function () {
        this.$node.off('select2-removed');
        this.$node.off('select2-opening');
        this._super('dispose');
    },

    /**
     * We do not support this field for preview edit
     * @inheritdoc
     */
    _loadTemplate: function() {
        this._super('_loadTemplate');

        if (this.view.name === 'preview') {
            this.template = app.template.getField('attachments', 'detail', this.model.module);
        }
    }
}) },
"usefulness": {"controller": /*
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
	// Usefulness FieldTemplate (base) 

    events: {
        'click [data-action=useful]': 'usefulClicked',
        'click [data-action=notuseful]': 'notusefulClicked'
    },

    /**
     * @inheritdoc
     *
     * This field doesn't support `showNoData`.
     */
    showNoData: false,

    plugins: [],

    KEY_USEFUL: '1',
    KEY_NOT_USEFUL: '-1',

    voted: false,
    votedUseful: false,
    votedNotUseful: false,

    /**
     * @inheritdoc
     */
    initialize: function(options) {
        this._super('initialize', [options]);
        if (!this.model.has('useful')) {
            this.model.set('useful', 0);
        }
        if (!this.model.has('notuseful')) {
            this.model.set('notuseful', 0);
        }
        this.checkVotes();
    },

    /**
     * Check votes state,
     * Set values for votedUseful, if user voted `useful` and
     * votedNotUseful if user voted `not useful`.
     */
    checkVotes: function() {
        var vote = this.model.get('usefulness_user_vote');
        this.votedUseful = (vote == this.KEY_USEFUL);
        this.votedNotUseful = (vote == this.KEY_NOT_USEFUL);
    },

    /**
     * The vote for useful or not useful.
     *
     * @param {boolean} isUseful Flag of useful or not useful.
     */
    vote: function(isUseful) {
        if (
            (isUseful && this.model.get('usefulness_user_vote') == this.KEY_USEFUL)
            || (!isUseful && this.model.get('usefulness_user_vote') == this.KEY_NOT_USEFUL)
        ) {
            return;
        }
        var action = isUseful ? 'useful' : 'notuseful';
        var url = app.api.buildURL(this.model.module, action, {
            id: this.model.id
        });
        var callbacks = {
            success: _.bind(function(data) {
                this.model.set({
                    'usefulness_user_vote': data.usefulness_user_vote,
                    'useful': data.useful,
                    'notuseful': data.notuseful,
                    'date_modified': data.date_modified
                });
                if (!this.disposed) {
                    this.render();
                }
            }, this),
            error: function() {}
        };

        app.api.call('update', url, null, callbacks);
    },

    /**
     * Handler to vote useful when icon clicked.
     */
    usefulClicked: function() {
        this.vote(true);
    },

    /**
     * Handler to vote not useful when icon clicked.
     */
    notusefulClicked: function() {
        this.vote(false);
    },

    /**
     * @inheritdoc
     */
    _render: function() {
        this.checkVotes();
        this._super('_render');
        return this;
    }
}) },
"editablelistbutton": {"controller": /*
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
 * @class View.Fields.KBContents.EditablelistbuttonField
 * @alias SUGAR.App.view.fields.KBContentsEditablelistbuttonField
 * @extends View.Fields.Base.EditablelistbuttonField
 */
({
	// Editablelistbutton FieldTemplate (base) 

    extendsFrom: 'EditablelistbuttonField',

    /**
     * @inheritdoc
     *
     * Add KBNotify plugin for field.
     */
    initialize: function(options) {
        this.plugins = _.union(this.plugins || [], [
            'KBNotify'
        ]);
        this._super('initialize', [options]);
    },

    /**
     * Overriding custom save options to trigger kb:collection:updated event when KB model saved.
     *
     * @override
     * @param {Object} options
     */
    getCustomSaveOptions: function(options) {
        var success = _.compose(options.success, _.bind(function(model) {
            this.notifyAll('kb:collection:updated', model);
            return model;
        }, this));
        return {'success': success};
    }
}) },
"languages": {"controller": /*
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
	// Languages FieldTemplate (base) 

    extendsFrom: 'FieldSet',

    events: {
        'click .btn[data-action=add-field]': 'addItem',
        'click .btn[data-action=remove-field]': 'removeItem',
        'click .btn[data-action=set-primary-field]': 'setPrimaryItem'
    },

    intKey: null,

    deletedLanguages: [],

    plugins: ['Tooltip'],

    /**
     * @inheritdoc
     */
    initialize: function(options) {
        this._super('initialize', [options]);
        this._currentIndex = 0;
        this.model.unset('deleted_languages', {silent: true});
    },

    /**
     * @inheritdoc
     */
    format: function(value) {
        var result = [],
            numItems = 0;
        value = app.utils.deepCopy(value);

        if (_.isString(value)) {
            value = [{'': value, primary: false}];
        }

        // Place the add button as needed
        if (_.isArray(value) && value.length > 0) {
            _.each(value, function(item, ind) {
                delete item.remove_button;
                delete item.add_button;
                result[ind] = {
                    name: this.name,
                    primary: item.primary || false
                };
                delete item.primary;
                result[ind].items = item;
            }, this);
            if (!result[this._currentIndex]) {
                result[this._currentIndex] = {};
            }
            result[value.length - 1].add_button = true;
            // number of valid teams
            numItems = _.filter(result, function(item) {
                return _.isUndefined(item.items['']);
            }).length;
            // Show remove button for all unset combos and only set combos if there are more than one
            _.each(result, function(item) {
                if (!_.isUndefined(item.items['']) || numItems > 1) {
                    item.remove_button = true;
                }
            });
        }
        return result;
    },

    /**
     * @inheritdoc
     */
    unformat: function(value) {
        var result = [];
        _.each(value, function(item) {
            result.push(_.extend({}, item.items, {primary: item.primary}));
        }, this);
        return result;
    },

    /**
     * Set primary item.
     * @param {number} index
     * @return {boolean}
     */
    setPrimary: function(index) {
        var value = this.unformat(this.value);
        _.each(value, function(item) {
            item.primary = false;
        }, this);
        value[index].primary = true;
        this.model.set(this.name, value);
        return (this.value[index]) ? this.value[index].primary : false;
    },

    /**
     * @inheritdoc
     */
    bindDomChange: function() {
        var self = this,
            el = null;
        if (this.model) {
            el = this.$el.find('div[data-name=languages_' + this.name + '] input[type=text]');
            el.on('change', function() {
                var value = self.unformatValue();
                self.model.set(self.name, value, {silent: true});
                self.value = self.format(value);
            });
        }
    },

    /**
     * @inheritdoc
     */
    bindDataChange: function() {
        if (this.model) {
            this.model.on('change', function() {
                if (this.disposed) {
                    return;
                }
                this.render();
            }, this);
        }
    },

    /**
     * Get value from view data.
     * @return [{}]
     */
    unformatValue: function() {
        var container = $(this.$('div[data-name=languages_' + this.name + ']')),
            input = container.find('input[type=text]'),
            value = [],
            val,
            k,
            v,
            pr,
            i;
        for (i = 0; i < input.length / 2; i = i + 1) {
            val = {};
            k = container.find('input[data-index=' + i + '][name=key_' + this.name + ']').val();
            v = container.find('input[data-index=' + i + '][name=value_' + this.name + ']').val();
            pr = container.find('button[data-index=' + i + '][name=primary]').hasClass('active');

            val[k] = v;
            val.primary = pr;
            value.push(val);
        }
        return value;
    },

    /**
     * Add item to list.
     * @param {Event} evt DOM event.
     */
    addItem: function(evt) {
        var index = $(evt.currentTarget).data('index'),
            value = this.unformat(this.value);
        if (!index || _.isUndefined(this.value[this.value.length - 1].items[''])) {
            value.push({'': ''});
            this._currentIndex += 1;
            this.model.set(this.name, value);
        }
    },

    /**
     * Remove item from list.
     * @param {Event} evt DOM event.
     */
    removeItem: function(evt) {
        this._currentTarget = evt.currentTarget;
        this.warnDelete();
    },

    /**
     * Popup dialog message to confirm delete action.
     */
    warnDelete: function() {
        app.alert.show('delete_confirmation', {
            level: 'confirmation',
            messages: app.lang.get('LBL_DELETE_CONFIRMATION_LANGUAGE', this.module),
            onConfirm: _.bind(this.confirmDelete, this),
            onCancel: _.bind(this.cancelDelete, this)
        });
    },

    /**
     * Predefined function for confirm delete.
     */
    confirmDelete: function() {
        var index = $(this._currentTarget).data('index'),
            value = null,
            removed = null;

        if (_.isNumber(index)) {
            if (index === 0 && this.value.length === 1) {
                return;
            }
            if (this._currentIndex === this.value.length - 1) {
                this._currentIndex -= 1;
            }

            value = this.unformat(this.value);
            removed = value.splice(index, 1);
            if (removed && removed.length > 0 && removed[0].primary) {
                value[0].primary = this.setPrimary(0);
            }
            for (var key in removed[0]) {
                if (key !== 'primary' && 2 == key.length) {
                    if (-1 === this.deletedLanguages.indexOf(key)) {
                        this.deletedLanguages.push(key);
                    }
                }
            }
            if (value) {
                this.model.set(this.name, value);
            }

            if (_.size(this.deletedLanguages) > 0) {
                this.model.set({'deleted_languages': this.deletedLanguages}, {silent: true});
            }
        }
    },

    /**
     * Predefined function for cancel delete.
     * @param {Event} evt DOM event.
     */
    cancelDelete: function(evt) {
    },

    /**
     * Set primary item.
     * @param {Event} evt DOM event.
     */
    setPrimaryItem: function(evt) {
        var index = $(evt.currentTarget).data('index');

        if (!this.value[index] ||
            !_.isUndefined(this.value[index].items['']) ||
            $(evt.currentTarget).hasClass('active')) {
            return;
        }
        this.$('.btn[name=primary]').removeClass('active');
        if (this.setPrimary(index)) {
            this.$('.btn[name=primary][data-index=' + index + ']').addClass('active');
        }
    },

    /**
     * @inheritdoc
     */
    _dispose: function() {
        this.$el.off();
        this.model.off('change');
        this._super('_dispose');
    },

    /**
     * Need own decoration for field error.
     * @override
     */
    handleValidationError: function (errors) {
        this.clearErrorDecoration();
        var err = errors.errors || errors;
        _.each(err, function(value) {
            var inpName = value.type + '_' + this.name,
                $inp = this.$('input[data-index=' + value.ind + '][name=' + inpName + ']');
            $inp.wrap('<div class="input-append input error ' + this.name + '">');
            errorMessages = [value.message];
            $tooltip = $(this.exclamationMarkTemplate(errorMessages));
            $inp.after($tooltip);
            this.createErrorTooltips($tooltip);
        }, this);
    },

    /**
     * Need own method to clear error decoration.
     * @override
     */
    clearErrorDecoration: function () {
        this.destroyAllErrorTooltips();
        this.$('.add-on.error-tooltip').remove();
        _.each(this.$('input[type=text]'), function(inp) {
            var $inp = this.$(inp);
            if ($inp.parent().hasClass('input-append') && $inp.parent().hasClass('error')) {
                $inp.unwrap();
            }
        });
        if (this.view && this.view.trigger) {
            this.view.trigger('field:error', this, false);
        }
    }
}) },
"sticky-rowaction": {"controller": /*
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
 * @class View.Fields.Base.KBContents.StickyRowactionField
 * @alias SUGAR.App.view.fields.BaseKBContentsStickyRowactionField
 * @extends View.Fields.Base.StickyRowactionField
 */
({
	// Sticky-rowaction FieldTemplate (base) 

    extendsFrom: 'StickyRowactionField',

    /**
     * Disable field if it has no access to edit.
     * @inheritdoc
     */
    isDisabled: function() {
        var parentLayout = this.context.parent.get('layout');
        var parentModel = this.context.parent.get('model');

        if (
            this.def.name === 'create_button' &&
            parentLayout === 'record' &&
            !app.acl.hasAccessToModel('edit', parentModel)
        ) {
            return true;
        }
        return this._super('isDisabled');
    }

}) }
}}
,
"views": {
"base": {
"prefiltered-headerpane": {"controller": /*
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
 * @class View.Views.Base.PrefilteredHeaderpaneView
 * @alias SUGAR.App.view.views.BasePrefilteredHeaderpaneView
 * @extends View.Views.Base.SelectionHeaderpaneView
 */

({
	// Prefiltered-headerpane View (base) 

    extendsFrom: 'SelectionHeaderpaneView',

    /**
     * @inheritdoc
     */
    initialize: function(options) {
        this._super('initialize', [options]);
        this.meta.fields = _.map(this.meta.fields, function(field) {
            if (field.name === 'title') {
                field['formatted_value'] = this.context.get('headerPaneTitle')
                    || this._formatTitle(field['default_value'])
                    || app.lang.get(field['value'], this.module);
                this.title = field['formatted_value'];
            }
            return field;
        }, this);
    }
}) },
"record": {"controller": /*
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
	// Record View (base) 

    extendsFrom: 'RecordView',

    /**
     * @inheritdoc
     *
     * Add KBContent plugin for view.
     */
    initialize: function(options) {
        this.plugins = _.union(this.plugins || [], [
            'KBContent'
        ]);

        this._super('initialize', [options]);
        this.context.on('kbcontents:category:deleted', this._categoryDeleted, this);
    },

    /**
     * Process record on category delete.
     * @param {Object} node
     * @private
     */
    _categoryDeleted: function(node) {
        if (this.model.get('category_id') === node.data('id')) {
            this.model.unset('category_id');
            this.model.unset('category_name');
        }
        if (this.disposed) {
            return;
        }
        this.render();
    },

    /**
     * @inheritdoc
     *
     * Need to switch field to `edit` if it has errors.
     */
    handleFieldError: function(field, hasError) {
        this._super('handleFieldError', [field, hasError]);
        if (hasError && field.tplName === 'detail') {
            field.setMode('edit');
        }
    }

}) },
"dashlet-nestedset-list": {"controller": /*
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
	// Dashlet-nestedset-list View (base) 


    plugins: ['Dashlet', 'NestedSetCollection', 'JSTree', 'KBNotify'],

    /**
     * Module name that provides an netedset data.
     *
     * @property {String}
     */
    moduleRoot: null,

    /**
     * Root ID of a shown NestedSet.
     * @property {String}
     */
    categoryRoot: null,

    /**
     * Module to load additional data into nested set.
     * @property {Object}
     * @property {String} extraModule.module Module to load additional data from.
     * @property {String} extraModule.field Linked field of provided module.
     */
    extraModule: null,

    /**
     * Cache to store loaded leafs to prevent extra loading.
     * @property {Object}
     */
    loadedLeafs: null,

    /**
     * Lifetime for data cache in ms.
     * @property {Number}
     */
    cacheLifetime: 300000,

    /**
     * Flag which indicate, if we need to use saved states.
     * @property {Boolean}
     */
    useStates: true,

    /**
     * Value of extraModule.field.
     * @property {String}
     */
    currentFieldValue: null,

    /**
     * Flag indicates should we hide tree.
     */
    hidden: null,

    /**
     * Initialize dashlet properties.
     */
    initDashlet: function() {
        var config = app.metadata.getModule(
            this.meta.config_provider,
            'config'
            ),
            currentContext = this.context.parent || this.context,
            currentModule = currentContext.get('module'),
            currentAction = currentContext.get('action');
        this.moduleRoot = this.settings.get('data_provider');
        this.categoryRoot = !_.isUndefined(config.category_root) ?
            config.category_root :
            null;
        this.extraModule = this.meta.extra_provider || {};
        if (currentModule === this.extraModule.module &&
            (currentAction === 'detail' || currentAction === 'edit')
        ) {
            this.useStates = false;
            this.changedCallback = _.bind(this.modelFieldChanged, this);
            this.savedCallback = _.bind(this.modelSaved, this);

            this.context.get('model').on('change:' + this.extraModule.field, this.modelFieldChanged, this);
            this.context.get('model').on('data:sync:complete', this.modelSaved, this);

            this.currentFieldValue = this.context.get('model').get(this.extraModule.field);
            this.on('openCurrentParent', this.hideTree, this);
        } else {
            this.on('stateLoaded', this.hideTree, this);
        }
        currentContext.on('subpanel:reload', function(args) {
            if (!_.isUndefined(args) &&
                _.isArray(args.links) &&
                (_.contains(args.links, 'revisions') || _.contains(args.links, 'localizations'))
            ) {
                this.layout.reloadDashlet({complete: function() {}, saveLeafs: false});
            }
        }, this);

        this.on('kb:collection:updated', _.bind(function() {
            _.defer(function(self) {
                if (self.layout.disposed === true) {
                    return;
                }
                if (!_.isUndefined(self.layout.reloadDashlet)) {
                    self.layout.reloadDashlet({complete: function() {}, saveLeafs: false});
                }
            }, this);
        }, this));

    },

    /**
     * The view doesn't need standard handlers for data change because it use own events and handlers.
     *
     * @override.
     */
    bindDataChange: function() {},

    /**
     * @inheritdoc
     */
    _render: function() {
        this._super('_render');
        if (this.meta.config) {
            return;
        }
        this.hideTree(this.hidden);
        var treeOptions = {
            settings: {
                category_root: this.categoryRoot,
                module_root: this.moduleRoot,
                plugins: [],
                liHeight: 14
            },
            options: {
            }},
            callbacks = {
                onLeaf: _.bind(this.leafClicked, this),
                onToggle: _.bind(this.folderToggled, this),
                onLoad: _.bind(this.treeLoaded, this),
                onSelect: _.bind(this.openRecord, this),
                onLoadState:  _.bind(this.stateLoaded, this)
            };
        if (this.useStates === true) {
            treeOptions.settings.plugins.push('state');
            treeOptions.options.state = {
                save_selected: false,
                auto_save: false,
                save_opened: 'jstree_open',
                options: {},
                storage: this._getStorage()
            };
        }
        this._renderTree(this.$('[data-place=dashlet-tree]'), treeOptions, callbacks);
    },

    /**
     * Return storage for tree state.
     * @return {Function}
     * @private
     */
    _getStorage: function () {
        var self = this;
        return function(key, value, options) {
            var intKey = app.user.lastState.buildKey(self.categoryRoot, self.moduleRoot, self.module);
            if (!_.isUndefined(value)) {
                app.user.lastState.set(intKey, value);
            }
            return app.user.lastState.get(intKey);
        };
    },

    /**
     * Handle tree selection.
     * @param data {Object} Selected item.
     */
    openRecord: function(data) {
        switch (data.type) {
            case 'document':
                if (_.isEmpty(this.extraModule.module)) {
                    break;
                }
                if (!this.$el.find('[data-id=' + data.id +']').data('disabled')) {
                    var route = app.router.buildRoute(this.extraModule.module, data.id);
                    app.router.navigate(route, {trigger: true});
                }
                break;
            case 'folder':
                if (this.$el.find('[data-id=' + data.id +']').hasClass('jstree-closed')) {
                    this.openNode(data.id);
                    data.open = true;
                } else {
                    this.closeNode(data.id);
                    data.open = false;
                }
                this.folderToggled(data);
                break;
        }
    },

    /**
     * Handle tree loaded. Load additional leafs for the tree.
     * @return {Boolean} Always true.
     */
    treeLoaded: function() {
        var self = this;
        this.bulkLoadLeafs(this.collection.models, function() {
            if (self.useStates) {
                self.loadJSTreeState();
            } else {
                self.openCurrentParent();
            }
        });
        return true;
    },

    /**
     * Loads leafs for all models (nodes) using single request.
     *
     * @param {Array} models Array of models (categories) which additional leafs will be loaded for.
     * @param {Function} callback Callback function that will be run after leafs loaded.
     */
    bulkLoadLeafs: function(models, callback) {
        var ids = _.map(models, function(model) {
            return model.id;
        });

        this.loadAdditionalLeafs(ids, callback);
    },

    /**
     * Open category, which is parent to current record.
     */
    openCurrentParent: function() {
        if (_.isEmpty(this.extraModule)
            || _.isEmpty(this.extraModule.module)
            || _.isEmpty(this.extraModule.field)
            ) {
            return;
        }
        var currentContext = this.context.parent || this.context,
            currentModel = currentContext.get('model'),
            id = currentModel.get(this.extraModule.field),
            self = this;

        this.loadAdditionalLeafs([id], function() {
            if (self.disposed) {
                return;
            }
            var nestedBean = self.collection.getChild(id);
            if (!_.isUndefined(nestedBean)) {
                nestedBean.getPath({
                    success: function(data) {
                        var path = [];
                        _.each(data, function(cat) {
                            if (cat.id == this.categoryRoot) {
                                return;
                            }
                            path.push({
                                id: cat.id,
                                name: cat.name
                            });
                        }, self);
                        path.push({
                            id: nestedBean.id,
                            name: nestedBean.get('name')
                        });
                        async.forEach(
                            path,
                            function(item, c) {
                                self.folderToggled({
                                    id: item.id,
                                    name: item.name,
                                    type: 'folder',
                                    open: true
                                }, c);
                            },
                            function() {
                                self.selectNode(currentModel.id);
                                self.trigger('openCurrentParent', false);
                            }
                        );
                    }
                });
            } else {
                self.trigger('openCurrentParent', false);
            }
        });
    },

    /**
     * Handle load state of tree.
     * Always returns true to process the code, which called the method.
     * @param {Object} data Data of loaded tree.
     * @return {Boolean} Always returns `true`.
     */
    stateLoaded: function(data) {
        var self = this;

        var models = _.reduce(data.open, function(memo, value) {
            var model = self.collection.getChild(value.id);
            return _.extend(memo, model.children.models);
        }, []);

        this.bulkLoadLeafs(models, function() {
            _.each(data.open, function(value) {
                self.openNode(value.id);
            });
            self.trigger('stateLoaded', false);
        });

        return true;
    },

    /**
     * Handle toggle of tree folder.
     * Always returns true to process the code, which called the method.
     * @param {Object} data Toggled folder.
     * @param {Function} callback Async callback to use with async.js
     * @return {Boolean} Return `true` to continue execution, `false` otherwise..
     */
    folderToggled: function (data, callback) {
        var triggeredCallback = false,
            self = this;
        if (data.open) {
            var model = this.collection.getChild(data.id),
                items = [];

            if (model.id) {
                items = model.children.models;
                if (items.length !== 0) {
                    triggeredCallback = true;
                    this.bulkLoadLeafs(items, function() {
                        if (_.isFunction(callback)) {
                            callback.call();
                            return false;
                        } else if (self.useStates) {
                            self.saveJSTreeState();
                        }
                    });
                }
            }
        }
        if (triggeredCallback === false && _.isFunction(callback)) {
            callback.call();
            return false;
        }
        if (this.useStates && triggeredCallback === false) {
            this.saveJSTreeState();
        }
        return true;
    },

    /**
     * Handle leaf click for tree.
     * @param {Object} data Clicked leaf.
     */
    leafClicked: function (data) {
        if (data.type !== 'folder') {
            if (_.isEmpty(this.extraModule.module)) {
                return;
            }
            if (!this.$el.find('[data-id=' + data.id +']').data('disabled')) {
                var route = app.router.buildRoute(this.extraModule.module, data.id);
                app.router.navigate(route, {trigger: true});
            }
            return;
        }
        this.loadAdditionalLeafs([data.id]);
    },

    /**
     * Load extra data for tree.
     *
     * @param {Array} ids Ids of tree nodes to load data in.
     * @param {Function} callback Callback funct
     */
    loadAdditionalLeafs: function(ids, callback) {
        var self = this;

        if (ids.length === 0) {
            if (_.isFunction(callback)) {
                callback.call();
            }
            return;
        }

        var processedIds = _.filter(ids, function(id) {
            return self.addLeafFromCache(id, callback);
        });
        if (processedIds.length === ids.length) {
            return;
        }

        var collection = this.createCollection();
        collection.filterDef = [{}];
        collection.filterDef[0][this.extraModule.field] = {$in: ids};
        collection.filterDef[0]['status'] = {$equals: 'published'};
        collection.filterDef[0]['active_rev'] = {$equals: 1};

        collection.fetch({
            success: function(data) {
                var groupedModels = _.groupBy(data.models, function(model) {
                    return model.get('category_id');
                });

                _.each(ids, function(id) {
                    self.addLeafs(groupedModels[id] || [], id);
                });

                if (_.isFunction(callback)) {
                    callback.call();
                }
            }
        });
    },

    /**
     * Tries to find loaded leaf in cache and adds it to the tree.
     *
     * @param {String} id Leaf id.
     * @param {Function} callback Callback function that will be executed after trying to adding leafs from cache.
     * @return {boolean} Returns true if leaf was added from cache, otherwise - false.
     */
    addLeafFromCache: function(id, callback) {
        if (!_.isUndefined(this.loadedLeafs[id]) && this.loadedLeafs[id].timestamp < Date.now() - this.cacheLifetime) {
            delete this.loadedLeafs[id];
        }

        if (_.isEmpty(this.extraModule)
            || id === undefined
            || _.isEmpty(id)
            || _.isEmpty(this.extraModule.module)
            || _.isEmpty(this.extraModule.field)
            || !_.isUndefined(this.loadedLeafs[id])
        ) {
            if (!_.isUndefined(this.loadedLeafs[id])) {
                this.addLeafs(this.loadedLeafs[id].models, id);
            }
            if (_.isFunction(callback)) {
                callback.call();
            }
            return true;
        }

        return false;
    },

    /**
     * Creates bean collection with predefined options.
     *
     * @return {Object} Bean Collection.
     */
    createCollection: function() {
        var collection = app.data.createBeanCollection(this.extraModule.module);

        collection.options = {
            params: {
                order_by: 'date_entered:desc'
            },
            fields: [
                'id',
                'name'
            ]
        };

        return collection;
    },

    /**
     * @inheritdoc
     *
     * Need additional check for tree leafs.
     *
     * @override
     */
    loadData: function(options) {
        this.hideTree(true);
        if (!options || _.isUndefined(options.saveLeafs) || options.saveLeafs === false) {
            this.loadedLeafs = {};
        }

        if (options && options.complete) {
            this._render();
            options.complete();
        }
    },

    /**
     * Override behavior of JSTree plugin.
     * @param {Data,BeanCollection} collection synced collection.
     */
    onNestedSetSyncComplete: function(collection) {
        if (this.disposed || this.collection.root !== collection.root) {
            return;
        }
        this.layout.reloadDashlet({complete: function() {}, saveLeafs: true});
    },

    /**
     * Handle change of this.extraModule.field.
     * @param {Data.Bean} model Changed model.
     * @param {String} value Current field value of the field.
     */
    modelFieldChanged: function(model, value) {
        delete this.loadedLeafs[this.currentFieldValue];
        this.currentFieldValue = value;
    },

    /**
     * Handle save of context model.
     */
    modelSaved: function() {
        delete this.loadedLeafs[this.currentFieldValue];
        this.onNestedSetSyncComplete(this.collection);
    },

    /**
     * @inheritdoc
     */
    _dispose: function() {
        var model;
        if (this.useStates === false && (model = this.context.get('model'))) {
            model.off('change:' + this.extraModule.field, this.changedCallback);
            model.off('data:sync:complete', this.savedCallback);
        }
        this._super('_dispose');
    },

    /**
     * Add documents as leafs for categories.
     * @param {Array} models Documents which should be added into the tree.
     * @param {String} id ID of category leaf to insert documents in.
     */
    addLeafs: function(models, id) {
        this.removeChildrens(id, 'document');
        _.each(models, function(value) {
            var insData = {
                id: value.id,
                name: value.get('name'),
                isViewable: app.acl.hasAccessToModel('view', value)
            };
            this.insertNode(insData, id, 'document');
        }, this);
        this.loadedLeafs[id] = {
            timestamp: Date.now(),
            models: models
        };
    },

    /**
     * Hide or show tree,
     * @param {boolean} hide Whether we need to hide tree.
     */
    hideTree: function(hide) {
        hide = hide || false;
        if (!hide) {
            this.hidden = false;
            this.$('[data-place=dashlet-tree]').removeClass('hide').show();
            this.$('[data-place=loading]').addClass('hide').hide();
        } else {
            this.hidden = true;
            this.$('[data-place=dashlet-tree]').addClass('hide').hide();
            this.$('[data-place=loading]').removeClass('hide').show();
        }
    }
}) },
"subpanel-list": {"controller": /*
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
 * Custom Subpanel Layout for Revenue Line Items.
 *
 * @class View.Views.Base.KBContents.SubpanelListView
 * @alias SUGAR.App.view.views.BaseKBContentsSubpanelListView
 * @extends View.Views.Base.SubpanelListView
 */
({
	// Subpanel-list View (base) 

    extendsFrom: 'SubpanelListView',

    /**
     * @inheritdoc
     */
    initialize: function(options) {
        this.plugins = _.union(this.plugins || [], ['KBContent']);
        this._super('initialize', [options]);
    }
}) },
"subpanel-for-revisions": {"controller": /*
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
	// Subpanel-for-revisions View (base) 

    extendsFrom: 'SubpanelListView',

    /**
     * @inheritdoc
     *
     * Setup dataView to load correct viewdefs from subpanel-for-revisions
     */
    initialize: function(options) {
        this._super('initialize', [options]);
        this.context.set('dataView', 'subpanel-for-revisions');
    }
}) },
"config-languages": {"controller": /*
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
 * @class View.Views.Base.KBContentsConfigLanguagesView
 * @alias SUGAR.App.view.layouts.BaseKBContentsConfigLanguages
 * @extends View.Views.Base.ConfigPanelView
 */
({
	// Config-languages View (base) 

    extendsFrom: 'ConfigPanelView',

    /**
     * @inheritdoc
     */
    initialize: function (options) {
        this._super('initialize', [options]);
        var model = this.context.get('model');
        model.fields = this.getFieldNames();
        model.addValidationTask('validate_config_languages', _.bind(this._validateLanguages, this));
        model.on('validation:success', _.bind(this._validationSuccess, this));

        app.error.errorName2Keys['lang_empty_key'] = 'ERR_CONFIG_LANGUAGES_EMPTY_KEY';
        app.error.errorName2Keys['lang_empty_value'] = 'ERR_CONFIG_LANGUAGES_EMPTY_VALUE';
        app.error.errorName2Keys['lang_duplicate'] = 'ERR_CONFIG_LANGUAGES_DUPLICATE';
    },

    /**
     * Validate languages duplicates.
     * @param {Object} fields
     * @param {Object} errors
     * @param {Function} callback
     */
    _validateLanguages: function (fields, errors, callback) {
        var model = this.context.get('model'),
            languages = this.model.get('languages'),
            languagesToSave = [],
            index = 0,
            languageErrors = [];

        _.each(languages, function(lang) {
            var lng = _.omit(lang, 'primary'),
                key = _.first(_.keys(lng)),
                val = lang[key].trim();
            if (val.length === 0) {
                languageErrors.push({
                    'message': app.error.getErrorString('lang_empty_value', this),
                    'key': key,
                    'ind': index,
                    'type': 'value'
                });
            }
            index = index + 1;
            languagesToSave.push(key.trim().toLowerCase());
        }, this);

        if ((index = _.indexOf(languagesToSave, '')) !== -1) {
            languageErrors.push({
                'message': app.error.getErrorString('lang_empty_key', this),
                'key': '',
                'ind': index,
                'type': 'key'
            });
        }

        if (languagesToSave.length !== _.uniq(languagesToSave).length) {
            var tmp = languagesToSave.slice(0);
            tmp.sort();
            for (var i = 0; i < tmp.length - 1; i++) {
                if (tmp[i + 1] == tmp[i]) {
                    languageErrors.push({
                        'message': app.error.getErrorString('lang_duplicate', this),
                        'key': tmp[i],
                        'ind': _.indexOf(languagesToSave, tmp[i]),
                        'type': 'key'
                    });
                }
            }
        }

        if (languageErrors.length > 0) {
            errors.languages = errors.languages || {};
            errors.languages.errors = languageErrors;
            app.alert.show('languages', {
                level: 'error',
                autoClose: true,
                messages: app.lang.get('ERR_RESOLVE_ERRORS')
            });
        }
        callback(null, fields, errors);
    },

    /**
     * On success validation, trim language keys and labels
     */
    _validationSuccess: function () {
        var model = this.context.get('model'),
            languages = this.model.get('languages');

        // trim keys
        var buf = _.map(languages, function(lang) {
            var prim = lang['primary'],
                lng = _.omit(lang, 'primary'),
                key = _.first(_.keys(lng)),
                val = lang[key].trim();

            key = key.trim();
            var res = {primary: prim};
            res[key] = val;

            return res;
        }, this);

        model.set('languages', buf);
    }
}) },
"kbs-dashlet-localizations": {"controller": /*
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
	// Kbs-dashlet-localizations View (base) 

    plugins: ['Dashlet'],

    events: {
        'click [data-action=show-more]': 'loadMoreData'
    },

    /**
     * @inheritdoc
     *
     * @property {number} _defaultSettings.limit Maximum number of records to
     *   load per request, defaults to '5'.
     */
    _defaultSettings: {
        limit: 5
    },

    /**
     * KBContents bean collection.
     *
     * @property {Data.BeanCollection}
     */
    collection: null,

    /**
     * @inheritdoc
     *
     * Init collection.
     */
    initDashlet: function () {
        this._initSettings();
        this._initCollection();
    },

    /**
     * Sets up settings, starting with defaults.
     *
     * @return {View.Views.BaseRelatedDocumentsView} Instance of this view.
     * @protected
     */
    _initSettings: function () {
        this.settings.set(
            _.extend(
                {},
                this._defaultSettings,
                this.settings.attributes
            )
        );
        return this;
    },

    /**
     * Initialize feature collection.
     */
    _initCollection: function () {
        this.collection = app.data.createBeanCollection(this.module);
        this.context.set('collection', this.collection);
        return this;
    },

    /**
     * @inheritdoc
     *
     * Once collection has been changed, the view should be refreshed.
     */
    bindDataChange: function () {
        if (this.collection) {
            this.collection.on('add remove reset', function () {
                if (this.disposed) {
                    return;
                }
                this.render();
            }, this);
        }
    },

    /**
     * Load more data (paginate).
     */
    loadMoreData: function () {
        if (this.collection.next_offset > 0) {
            this.collection.paginate({add: true});
        }
    },

    /**
     * @inheritdoc
     */
    loadData: function (options) {
        if (this.collection.dataFetched) {
            return;
        }
        var currentContext = this.context.parent || this.context,
            model = currentContext.get('model');

        if (!model.get('kbdocument_id')) {
            model.once('sync', function() {this.loadData();}, this);
            return;
        }
        options = options || {};
        this.collection.setOption({
            limit: this.settings.get('limit'),
            fields: [
                'id',
                'name',
                'date_entered',
                'created_by',
                'created_by_name',
                'language'
            ],
            filter: {
                'kbdocument_id': {
                    '$equals': model.get('kbdocument_id')
                },
                'id' : {
                    '$not_equals': model.get('id')
                },
                'status': {
                    '$equals': 'published'
                },
                'active_rev': {
                    '$equals': 1
                }
            }
        });
        if (!options.error) {
            options.error = _.bind(function(error) {
                if (error.code === 'not_authorized') {
                    this.$el.find('.block-footer').html(app.lang.get('LBL_NO_DATA_AVAILABLE', this.module));
                }
            }, this);
        }
        this.collection.fetch(options);
    }
}) },
"massupdate": {"controller": /*
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
	// Massupdate View (base) 

    extendsFrom: 'MassupdateView',
    
    /**
     * @inheritdoc
     */
    initialize: function(options) {
        this.plugins = _.union(this.plugins || [], ['CommittedDeleteWarning', 'KBContent', 'KBNotify']);
        this._super('initialize', [options]);
    },

    /**
     * @inheritdoc
     */
    saveClicked: function(evt) {
        var massUpdateModels = this.getMassUpdateModel(this.module).models,
            fieldsToValidate = this._getFieldsToValidate(),
            emptyValues = [];

        this._restoreInitialState(massUpdateModels);

        this._doValidateMassUpdate(massUpdateModels, fieldsToValidate, _.bind(function(fields, errors) {
            if (_.isEmpty(errors)) {
                this.trigger('massupdate:validation:complete', {
                    errors: errors,
                    emptyValues: emptyValues
                });
                if(this.$('.btn[name=update_button]').hasClass('disabled') === false) {
                    this.listenTo(this.collection, 'data:sync:complete', _.bind(function() {
                        this.notifyAll('kb:collection:updated');
                        this.stopListening(this.collection);
                    }, this));
                    this.save();
                }
            } else {
                this.handleValidationError(errors);
            }
        }, this));
    },

    /**
     * Restore models state.
     *
     * @param {Array} models
     * @private
     */
    _restoreInitialState: function(models) {
        _.each(models, function(model) {
            model.revertAttributes();
        });
    },

    /**
     * Custom MassUpdate validation.
     *
     * @param {Object} models
     * @param {Object} fields
     * @param {Function} callback
     * @private
     */
    _doValidateMassUpdate: function(models, fields, callback) {
        var checkField = 'status',
            errorFields = [],
            messages = [],
            errors = {},
            updatedValues = {};
        _.each(fields, function(field) {
            updatedValues[field.name] = this.model.get(field.name);
            if (undefined !== field.id_name && this.model.has(field.id_name)) {
                updatedValues[field.id_name] = this.model.get(field.id_name);
            }
        }, this);
        _.each(models, function(model) {
            var values = _.extend({}, model.toJSON(), updatedValues),
                newModel = app.data.createBean(model.module, values);
            if (undefined !== updatedValues[checkField] && updatedValues[checkField] === 'approved') {
                this._doValidateActiveDateField(newModel, fields, errors, function(model, fields, errors) {
                    var fieldName = 'active_date';
                    if (!_.isEmpty(errors[fieldName])) {
                        errors[checkField] = errors[fieldName];
                        errorFields.push(fieldName);
                        messages.push(app.lang.get('LBL_SPECIFY_PUBLISH_DATE', 'KBContents'));
                    }
                });
            }
            this._doValidateExpDateField(newModel, fields, errors, function(model, fields, errors) {
                var fieldName = 'exp_date';
                if (!_.isEmpty(errors[fieldName])) {
                    errors[checkField] = errors[fieldName];
                    errorFields.push(fieldName);
                    messages.push(app.lang.get('LBL_MODIFY_EXP_DATE_LOW', 'KBContents'));
                }
            });
        }, this);

        if (!_.isEmpty(errorFields)) {
            if (!_.isUndefined(errors.active_date) && errors.active_date.activeDateLow ||
                !_.isUndefined(errors.exp_date) && errors.exp_date.expDateLow) {
                callback(fields, errors);
                return;
            }
            errorFields.push(checkField);
            app.alert.show('save_without_publish_date_confirmation', {
                level: 'confirmation',
                messages: _.uniq(messages),
                confirm: {
                    label: app.lang.get('LBL_YES')
                },
                cancel: {
                    label: app.lang.get('LBL_NO')
                },
                onConfirm: function() {
                    errors = _.filter(errors, function(error, key) {
                        _.indexOf(errorFields, key) === -1;
                    });
                    callback(fields, errors);
                }
            });
        } else {
            callback(fields, errors);
        }
    },

    /**
     * We don't need to initialize KB listeners.
     * @override.
     * @private
     */
    _initKBListeners: function() {},
    
    /**
     * @inheritdoc
     */
    cancelClicked: function(evt) {
        this._restoreInitialState(this.getMassUpdateModel(this.module).models);
        this._super('cancelClicked', [evt]);
    }
}) },
"help-create": {"controller": /*
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
	// Help-create View (base) 

    // TODO: Remove this View completely, when it is possible to place a standard help-dashlet to the Create layout

    /**
     * @inheritdoc
     */
    _renderHtml: function () {
        var helpUrl = {
                more_info_url: this.createMoreHelpLink(),
                more_info_url_close: '</a>'
            },
            helpObject = app.help.get(this.context.get('module'), 'create', helpUrl);

        this._super('_renderHtml', [helpObject, this.options]);
    },

    /**
     * Collects server version, language, module, and route and returns an HTML link to be used
     * in the template
     *
     * @returns {string} The HTML a-tag for the More Help link
     */
    createMoreHelpLink: function () {
        var serverInfo = app.metadata.getServerInfo(),
            lang = app.lang.getLanguage(),
            module = app.controller.context.get('module'),
            route = 'create';

        var url = 'http://www.sugarcrm.com/crm/product_doc.php?edition=' + serverInfo.flavor
            + '&version=' + serverInfo.version + '&lang=' + lang + '&module=' + module + '&route=' + route;

        return '<a href="' + url + '" target="_blank">';
    }
}) },
"subpanel-for-localizations": {"controller": /*
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
	// Subpanel-for-localizations View (base) 

    extendsFrom: 'SubpanelListView',

    /**
     * @inheritdoc
     *
     * Check access to model.
     * Setup dataView to load correct viewdefs from subpanel-for-localizations
     */
    initialize: function(options) {
        this._super('initialize', [options]);

        if (!app.acl.hasAccessToModel('edit', this.model)) {
            this.context.set('requiredFilter', 'records-noedit');
        }

        this.context.set('dataView', 'subpanel-for-localizations');
    },

    /**
     * @inheritdoc
     *
     * Removes 'status' field from options if there is no access to model.
     */
    parseFieldMetadata: function(options) {
        options = this._super('parseFieldMetadata', [options]);

        if (app.acl.hasAccess('edit', options.module)) {
            return options;
        }

        _.each(options.meta.panels, function(panel, panelIdx) {
            _.each(panel.fields, function(field, fieldIdx) {
                if (field.name === 'status') {
                    delete panel.fields[fieldIdx];
                }
            }, this);
        }, this);

        return options;
    }
}) },
"panel-top-for-revisions": {"controller": /*
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
	// Panel-top-for-revisions View (base) 

    extendsFrom: 'PanelTopView',

    plugins: ['KBContent'],

    /**
     * @inheritdoc
     */
    createRelatedClicked: function(event) {
        var parentModel = this.context.parent.get('model');
        if (parentModel) {
            this.createRelatedContent(parentModel, this.CONTENT_REVISION);
        }
    }
}) },
"list": {"controller": /*
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
	// List View (base) 

    extendsFrom: 'ListView',

    /**
     * @inheritdoc
     *
     * Add KBContent plugin for view.
     */
    initialize: function(options) {
        this.plugins = _.union(this.plugins || [], [
            'KBContent'
        ]);

        this._super('initialize', [options]);
    }

}) },
"config-header-buttons": {"controller": /*
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
 * @class View.Views.Base.SchedulersJobsConfigHeaderButtonsView
 * @alias SUGAR.App.view.layouts.BaseSchedulersJobsConfigHeaderButtonsView
 * @extends View.Views.Base.ConfigHeaderButtonsView
 */
({
	// Config-header-buttons View (base) 

    extendsFrom: 'ConfigHeaderButtonsView',

    initialize: function(options) {
        this._super('initialize', [options]);

        // Standard ConfigHeaderButtonsView doesn't use doValidate
        var model = this.context.get('model');
        model._save = model.save;
        model.save = function(key, val, options) {
            this.doValidate(null, function(isValid){
                if (isValid) {
                    model._save(key, val, options)
                } else {
                    val.error();
                }
            });
        }
    },

    /**
     * Fix for RS-1284.
     * When we save config, metadata for current user is cleared.
     * That's why we need to sync metadata manually.
     * Otherwise user will see error message "Metadata is out of sync" when will try to create new KB content.
     *
     * @private
     */
    _saveConfig: function() {
        var self = this;
        this.context.get('model').save({}, {
            success: _.bind(function(model) {
                app.metadata.sync(function() {
                    self.showSavedConfirmation();
                    if (app.drawer) {
                        app.drawer.close(self.context, self.context.get('model'));
                    }
                    if (self.context.parent && self.context.parent.get('module') === self.module) {
                        self.context.parent.reloadData();
                    }
                });
            }, this),

            error: _.bind(function() {
                this.getField('save_button').setDisabled(false);
            }, this)
        });
    }
}) },
"kbs-dashlet-usefulness": {"controller": /*
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
	// Kbs-dashlet-usefulness View (base) 

    plugins: ['Dashlet'],

    /**
     * Holds report data from the server's endpoint once we fetch it
     */
    chartData: undefined,

    /**
     * We'll use this property to bind loadData function for event
     */
    refresh: null,

    /**
     * @inheritdoc
     */
    initialize: function(options) {
        this.chartData = new Backbone.Model();
        this._super('initialize', [options]);
        this.refresh = _.bind(this.loadData, this);
        this.listenTo(app.controller.context.get('model'), 'change:useful', this.refresh);
        this.listenTo(app.controller.context.get('model'), 'change:notuseful', this.refresh);
    },

    /**
     * @inheritdoc
     */
    loadData: function(options) {
        var currModel = app.controller.context.get('model'),
            model = currModel.clone(),
            opts = options || {},
            self = this;

        model.fetch({
            success: function(model) {
                var dt = self.layout.getComponent('dashlet-toolbar'),
                    useful = model.get('useful') || '0',
                    notuseful = model.get('notuseful') || '0';
                if (dt) {
                    // manually set the icon class to spiny
                    self.$('[data-action=loading]')
                        .removeClass(dt.cssIconDefault)
                        .addClass(dt.cssIconRefresh);
                }

                useful = parseInt(useful, 10);
                notuseful = parseInt(notuseful, 10);

                // correcting values for pie chart,
                // because pie chart not support all zero values.
                if (0 === useful && 0 === notuseful) {
                    self.chartData.set({rawChartData: {values: []}});
                    return;
                }
                var chartData = {
                        properties: [
                            {
                                labels: 'value',
                                print: '',
                                subtitle: '',
                                thousands: '',
                                title: '',
                                type: 'pie chart'
                            }
                        ],
                        values: [
                            {
                                label: [app.lang.get('LBL_USEFUL', 'KBContents')],
                                values: [useful],
                                classes: 'nv-fill-green'
                            },
                            {
                                label: [app.lang.get('LBL_NOT_USEFUL', 'KBContents')],
                                values: [notuseful],
                                classes: 'nv-fill-red'
                            }
                        ]
                    },
                    chartParams = {
                        donut: true,
                        donutRatio: 0.45,
                        hole: parseInt(useful * 100 / (notuseful + useful)) + ' %',
                        donutLabelsOutside: true,
                        colorData: 'data',
                        chart_type: 'pie chart',
                        show_legend: false
                    };
                _.defer(_.bind(function() {
                    self.chartData.set({rawChartData: chartData, rawChartParams: chartParams});
                }, this));
            },
            complete: function() {
                if (opts && _.isFunction(opts.complete)) {
                    opts.complete();
                }
            }
        });
    },

    /**
     * @inheritdoc
     *
     * Dispose listeners for 'change:useful' and 'change:notuseful' events.
     */
    dispose: function() {
        this.stopListening(app.controller.context.get('model'), 'change:useful', this.refresh);
        this.stopListening(app.controller.context.get('model'), 'change:notuseful', this.refresh);
        this._super('dispose');
    }
}) },
"kbs-dashlet-most-useful": {"controller": /*
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
	// Kbs-dashlet-most-useful View (base) 

    plugins: ['Dashlet'],

    events: {
        "click [data-action=show-more]": "loadMoreData"
    },

    /**
     * KBContents bean collection.
     *
     * @property {Data.BeanCollection}
     */
    collection: null,

    /**
     * We'll use this property to bind loadData function for event
     */
    refresh: null,

    /**
     * @inheritdoc
     */
    initialize: function (options) {
        var self = this;
        
        options.module = 'KBContents';
        this._super('initialize', [options]);
        this.refresh = _.bind(this.loadData, this);

        if (_.isUndefined(this.meta.config) || this.meta.config === false){
            this.listenTo(this.context.parent.get('collection'), 'sync', function () {
                if (self.collection) {
                    self.collection.dataFetched = false;
                    self.layout.reloadDashlet(options);
                }
            });
        }

        this._initCollection();
        this.listenTo(app.controller.context.get('model'), 'change:useful', this.refresh);
        this.listenTo(app.controller.context.get('model'), 'change:notuseful', this.refresh);
    },

    /**
     * Initialize feature collection.
     */
    _initCollection: function () {
        this.collection = app.data.createBeanCollection(this.module);
        this.collection.setOption({
            params: {
                order_by: 'useful:desc,notuseful:asc,viewcount:desc,date_entered:desc',
                mostUseful: true
            },
            limit: 3,
            fields: [
                'id',
                'name',
                'date_entered',
                'created_by',
                'created_by_name'
            ],
            filter: {
                'active_rev': {
                    '$equals': 1
                },
                'useful': {
                    '$gt': {
                        '$field': 'notuseful'
                    }
                },
                'status': {
                    '$equals': 'published'
                }
            }
        });
        return this;
    },

    /**
     * @inheritdoc
     *
     * Once collection has been changed, the view should be refreshed.
     */
    bindDataChange: function () {
        if (this.collection) {
            this.collection.on('add remove reset', function () {
                if (this.disposed) {
                    return;
                }
                this.render();
            }, this);
        }
    },

    /**
     * Load more data (paginate)
     */
    loadMoreData: function () {
        if (this.collection.next_offset > 0) {
            this.collection.paginate({add: true});
        }
    },

    /**
     * @inheritdoc
     */
    loadData: function (options) {
        this.collection.resetPagination();
        this.collection.fetch({
            success: function () {
                if (options && options.complete) {
                    options.complete();
                }
            },
            error: _.bind(function(error) {
                if (error.code === 'not_authorized') {
                    this.$el.find('.block-footer').html(app.lang.get('LBL_NO_DATA_AVAILABLE', this.module));
                }
            }, this)
        });
    },

    /**
     * @inheritdoc
     *
     * Dispose listeners for 'change:useful' and 'change:notuseful' events.
     */
    dispose: function() {
        this.stopListening(app.controller.context.get('model'), 'change:useful', this.refresh);
        this.stopListening(app.controller.context.get('model'), 'change:notuseful', this.refresh);
        this._super('dispose');
    }
}) },
"recordlist": {"controller": /*
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
	// Recordlist View (base) 

    extendsFrom: 'RecordlistView',

    /**
     * @inheritdoc
     *
     * Add KBContent plugin for view.
     */
    initialize: function(options) {
        this.plugins = _.union(this.plugins || [], [
            'KBContent',
            'KBNotify'
        ]);

        this._super('initialize', [options]);

        this.layout.on('list:record:deleted', function() {
            this.refreshCollection();
            this.notifyAll('kb:collection:updated');
        }, this);

        this.context.on('kbcontents:category:deleted', function(node) {
            this.refreshCollection();
            this.notifyAll('kb:collection:updated');
        }, this);

        if (!app.acl.hasAccessToModel('edit', this.model)) {
            this.context.set('requiredFilter', 'records-noedit');
        }
    }
}) },
"module-menu": {"controller": /*
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
 * Module menu provides a reusable and easy render of a module Menu.
 *
 * This also helps doing customization of the menu per module and provides more
 * metadata driven features.
 *
 * @class View.Views.Base.KBContents.ModuleMenuView
 * @alias SUGAR.App.view.views.BaseKBContentsModuleMenuView
 * @extends View.Views.Base.ModuleMenuView
 */
({
	// Module-menu View (base) 

    extendsFrom: 'ModuleMenuView',

    /**
     * Root ID of a shown NestedSet.
     * @property {string}
     */
    categoryRoot: null,

    /**
     * Module which implements NestedSet.
     */
    moduleRoot: null,

    /**
     * Panel label.
     */
    label: null,

    /**
     * @inheritdoc
     *
     * Init additional properties and events.
     */
    initialize: function(options) {
        this._super('initialize', [options]);

        var module = this.meta.config.config_provider || this.context.get('module'),
            config = app.metadata.getModule(module, 'config');
        this.categoryRoot = this.meta.config.category_root || config.category_root || '';
        this.moduleRoot = this.meta.config.data_provider || module;

        this.label = this.meta.label || '';

        this.events = _.extend({}, this.events, {
            'click [data-event="tree:list:fire"]': 'handleCategoriesList'
        });
    },

    /**
     * Handle click on KB category menu item.
     */
    handleCategoriesList: function() {
        var treeOptions = {
            category_root: this.categoryRoot,
            module_root: this.moduleRoot,
            plugins: ['dnd', 'contextmenu'],
            isDrawer: true
        };

        var treeCallbacks = {
                'onSelect': function() {
                    return;
                },
                'onRemove': function(node) {
                    if (this.context.parent) {
                        this.context.parent.trigger('kbcontents:category:deleted', node);
                    }
                }
            },
        // @TODO: Find out why params from context for drawer don't pass to our view tree::_initSettings
            context = _.extend({}, this.context, {treeoptions: treeOptions, treecallbacks: treeCallbacks});
        if (app.drawer.getActiveDrawerLayout().module === this.moduleRoot) {
            app.drawer.closeImmediately();
        }
        app.drawer.open({
            layout: 'nested-set-list',
            context: {
                module: this.moduleRoot,
                parent: context,
                title: app.lang.getModString(this.label, this.module),
                treeoptions: treeOptions,
                treecallbacks: treeCallbacks
            }
        });
    },

    /**
     * @inheritdoc
     */
    populate: function(tplName, filter, limit) {
        if (limit <= 0) {
            return;
        }
        filter =  _.union([], filter, this.meta.filterDef || []);
        this.getCollection(tplName).fetch({
            'showAlerts': false,
            'fields': ['id', 'name'],
            'filter': filter,
            'limit': limit,
            'success': _.bind(function() {
                this._renderPartial(tplName);
            }, this)
        });
    }
}) },
"panel-top-for-cases": {"controller": /*
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
 * @class View.Views.Base.KBContentsPanelTopForCases
 * @alias SUGAR.App.view.views.BaseKBContentsPanelTopForCases
 * @extends View.Views.Base.PanelTopView
 */

({
	// Panel-top-for-cases View (base) 

    extendsFrom: 'PanelTopView',
    plugins: ['KBContent'],
    /**
     * @inheritdoc
     */
    initialize: function(options) {
        this._super('initialize', [options]);
    },
    /**
     * Event handler for the create button.
     *
     * @param {Event} event The click event.
     */
    createRelatedClicked: function(event) {
        this.createArticleSubpanel();
    },
}) },
"preview": {"controller": /*
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
 * @class View.Views.Base.KBContentsPreviewView
 * @alias SUGAR.App.view.views.BaseKBContentsPreviewView
 * @extends View.Views.Base.PreviewView
 */
({
	// Preview View (base) 


    extendsFrom: 'PreviewView',

    /**
     * @inheritdoc
     */
    initialize: function(options) {
        this.plugins = _.union(this.plugins || [], ['KBContent']);
        this._super('initialize', [options]);
    },

    /**
     * @inheritdoc
     * @TODO: Need to be removed after BR-2704 fixed.
     */
    _previewifyMetadata: function(meta) {
        _.each(meta.panels, function(panel) {
            panel.fields = _.filter(panel.fields, function(def) {
                if (def.type == 'fieldset' && !_.isEmpty(def.fields)) {
                    return _.find(def.fields, function(def) {
                        return def.type !== 'htmleditable_tinymce';
                    }) === undefined;
                }
                return def.type !== 'htmleditable_tinymce';
            });
        }, this);
        return this._super('_previewifyMetadata', [meta]);
    },

    /**
     * We don't need to initialize KB listeners.
     * @override.
     * @private
     */
    _initKBListeners: function() {}
}) },
"prefilteredlist": {"controller": /*
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
 * @class View.Views.Base.PrefilteredListView
 * @alias SUGAR.App.view.views.BasePrefilteredListView
 * @extends View.Views.Base.RecordlistView
 */
({
	// Prefilteredlist View (base) 

    /**
     * @inheritdoc
     */
    extendsFrom: 'RecordlistView'
}) },
"related-documents": {"controller": /*
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
	// Related-documents View (base) 

    plugins: ['Dashlet'],

    events: {
        'click [data-action=show-more]': 'loadMoreData'
    },

    /**
     * @inheritdoc
     *
     * @property {Object} _defaultSettings Default settings.
     * @property {number} _defaultSettings.limit Maximum number of records to
     *   load per request, defaults to '5'.
     */
    _defaultSettings: {
        limit: 5
    },

    /**
     * KBContents bean collection.
     *
     * @property {Data.BeanCollection}
     */
    collection: null,

    /**
     * @inheritdoc
     *
     * Initialize settings and collection.
     */
    initDashlet: function() {
        this._initSettings();
        this._initCollection();
    },

    /**
     * Sets up settings, starting with defaults.
     *
     * @return {View.Views.BaseRelatedDocumentsView} Instance of this view.
     * @protected
     */
    _initSettings: function() {
        this.settings.set(
            _.extend(
                {},
                this._defaultSettings,
                this.settings.attributes
            )
        );

        return this;
    },

    /**
     * Initialize feature collection.
     */
    _initCollection: function() {
        this.collection = app.data.createBeanCollection(this.module);
        this.collection.options = {
            limit: this.settings.get('limit'),
            fields: [
                'id',
                'name',
                'date_entered',
                'created_by',
                'created_by_name'
            ]
        };
        this.collection.sync = _.wrap(
            this.collection.sync,
            _.bind(function(sync, method, model, options) {
                options = options || {};
                var viewModelId = this.model.get('id')
                    || this.context.get('model').get('id')
                    || this.context.parent.get('model').get('id');
                options.endpoint = function(method, model, options, callbacks) {
                    var url = app.api.buildURL(
                        model.module,
                        'related_documents',
                        {
                            id: viewModelId
                        },
                        options.params
                    );
                    return app.api.call('read', url, {}, callbacks);
                };
                sync(method, model, options);
            }, this)
        );

        this.context.set('collection', this.collection);
        return this;
    },

    /**
     * @inheritdoc
     *
     * Once collection has been changed, the view should be refreshed.
     */
    bindDataChange: function() {
        if (this.collection) {
            this.collection.on('add remove reset', this.render, this);
        }
    },

    /**
     * Load more data (paginate)
     */
    loadMoreData: function() {
        if (this.collection.next_offset > 0) {
            this.collection.paginate({add: true});
        }
    },

    /**
     * @inheritdoc
     *
     * Fetch collection if it was not fetched before.
     */
    loadData: function(options) {
        options = options || {};
        if (this.collection.dataFetched) {
            return;
        }
        this.collection.fetch(options);
    }
}) },
"panel-top-for-localizations": {"controller": /*
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
	// Panel-top-for-localizations View (base) 

    extendsFrom: 'PanelTopView',

    plugins: ['KBContent'],

    /**
     * @inheritdoc
     */
    createRelatedClicked: function(event) {
        var parentModel = this.context.parent.get('model');
        if (parentModel) {
            this.createRelatedContent(parentModel, this.CONTENT_LOCALIZATION);
        }
    }
}) },
"filter-module-dropdown": {"controller": /*
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
	// Filter-module-dropdown View (base) 

    extendsFrom: 'FilterModuleDropdownView',

    /**
     * @inheritdoc
     */
    getModuleListForSubpanels: function() {
        var filters = [];
        filters.push({id: 'all_modules', text: app.lang.get('LBL_MODULE_ALL')});

        var subpanels = this.pullSubpanelRelationships(),
            subpanelsAcls = this._getSubpanelsAclsActions();

        subpanels = this._pruneHiddenModules(subpanels);
        _.each(subpanels, function(value, key) {
            var module = app.data.getRelatedModule(this.module, value),
                aclToCheck = !_.isUndefined(subpanelsAcls[value]) ? subpanelsAcls[value] : 'list';

            if (app.acl.hasAccess(aclToCheck, module)) {
                filters.push({id: value, text: app.lang.get(key, this.module)});
            }
        }, this);
        return filters;
    },

    /**
     * Returns acl actions for subpanels based on metadata.
     * @return {Object} Alcs for subpanels.
     * @private
     */
    _getSubpanelsAclsActions: function() {
        var subpanelsMeta = app.metadata.getModule(this.module).layouts.subpanels,
            subpanelsAclActions = {};

        if (subpanelsMeta && subpanelsMeta.meta && subpanelsMeta.meta.components) {
            _.each(subpanelsMeta.meta.components, function(comp) {
                if (comp.context && comp.context.link) {
                    subpanelsAclActions[comp.context.link] = comp.acl_action ?
                        comp.acl_action : 'list';
                }
            });
        }

        return subpanelsAclActions;
    }
}) },
"create": {"controller": /*
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
	// Create View (base) 

    extendsFrom: 'CreateView',

    /**
     * @inheritdoc
     *
     * Add KBContent plugin for view.
     */
    initialize: function(options) {
        this.plugins = _.union(this.plugins || [], [
            'KBContent',
            'KBNotify'
        ]);
        this._super('initialize', [options]);
    },

    /**
     * Using the model returned from the API call, build the success message.
     * @param {Data.Bean} model KBContents bean for record that was just created.
     * @return {string} The success message.
     */
    buildSuccessMessage: function(model) {
        var message = this._super('buildSuccessMessage', [model]);

        // If user has no access to view record - don't show record link for him
        if (!app.acl.hasAccessToModel('view', this.model)) {
            message = message.replace(/<\/?a[^>]+>/g, '');
        }

        return message;
    },

    /**
     * Overriding custom save options to trigger kb:collection:updated event when KB model saved.
     *
     * @override
     * @param {Object} options
     */
    getCustomSaveOptions: function(options) {
        var success = _.compose(options.success, _.bind(function(model) {
            this.notifyAll('kb:collection:updated', model);
            return model;
        }, this));
        return {'success': success};
    }
}) },
"filter-rows": {"controller": /*
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
	// Filter-rows View (base) 

    extendsFrom: 'FilterRowsView',

    /**
     * @inheritdoc
     *
     * Add 'kbdocument_body' filter field only on KBContents listView. This field is not present in filter's
     * metadata to avoid its appearance on KBContents subpanels - this is done due to technical inability to make
     * REST calls to specific module's RelateApi and thus to perform KB specific filtering logic.
     */
    loadFilterFields: function(module) {
        this._super('loadFilterFields', [module]);
        if (this.context.get('layout') === 'records') {
            var bodyField = this.model.fields['kbdocument_body'];
            this.fieldList[bodyField.name] = bodyField;
            this.filterFields[bodyField.name] = app.lang.get(bodyField.vname, this.module);
        }
    }
}) }
}}
,
"layouts": {
"base": {
"config-drawer-content": {"controller": /*
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
	// Config-drawer-content Layout (base) 

    extendsFrom: 'ConfigDrawerContentLayout',

    /**
     * @inheritdoc
     * @override
     */
    _switchHowToData: function(helpId) {
        switch (helpId) {
            case 'config-languages':
                this.currentHowToData.title = app.lang.get(
                    'LBL_CONFIG_LANGUAGES_TITLE',
                    this.module
                );
                this.currentHowToData.text = app.lang.get(
                    'LBL_CONFIG_LANGUAGES_TEXT',
                    this.module
                );
                break;
        }
    }
}) },
"records-search-tags": {"controller": /*
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
	// Records-search-tags Layout (base) 

    /**
     * @inheritdoc
     */
    initialize: function(options) {
        this._super('initialize', [options]);
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

        var chain = ['sidebar', 'main-pane', 'list', 'recordlist'];
        var recordList = _.reduce(chain, function(component, name) {
            if (!_.isUndefined(component)) {
                return component.getComponent(name);
            }
        }, this);

        if (!_.isUndefined(recordList)) {
            recordList.collection.filterDef = filterDef;
        }
    }
}) },
"subpanels": {"controller": /*
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
	// Subpanels Layout (base) 

    extendsFrom: 'SubpanelsLayout',

    /**
     * @inheritdoc
     */
    _pruneNoAccessComponents: function(components) {
        var prunedComponents = [];
        var layoutFromContext = this.context ? this.context.get('layout') || this.context.get('layoutName') : null;
        this.layoutType = layoutFromContext ? layoutFromContext : app.controller.context.get('layout');
        this.aclToCheck = this.aclToCheck || (this.layoutType === 'record') ? 'view' : 'list';
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
}) },
"config-drawer": {"controller": /*
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
	// Config-drawer Layout (base) 


    extendsFrom: 'ConfigDrawerLayout',

    /**
     * @inheritdoc
     */
    _checkModuleAccess: function() {
        var acls = app.user.getAcls().KBContents,
            isSysAdmin = (app.user.get('type') == 'admin'),
            isAdmin = (!_.has(acls, 'admin'));
        isDev = (!_.has(acls, 'developer'));
        return (isSysAdmin || isAdmin || isDev);
    }
}) }
}}
,
"datas": {}

},
		"KBArticles":{"fieldTemplates": {}
,
"views": {}
,
"layouts": {}
,
"datas": {}

},
		"KBContentTemplates":{"fieldTemplates": {
"base": {
"htmleditable_tinymce": {"controller": /*
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
	// Htmleditable_tinymce FieldTemplate (base) 

    extendsFrom: 'BaseKBContentsHtmleditable_tinymceField',

    /**
     * Override to load handlebar templates from `KBContents module
     * @inheritdoc
     */
    _loadTemplate: function() {
        var module = this.module;
        this.module = 'KBContents';
        this._super('_loadTemplate');
        this.module = module;
    }
}) }
}}
,
"views": {}
,
"layouts": {}
,
"datas": {}

},
		"EmbeddedFiles":{"fieldTemplates": {}
,
"views": {}
,
"layouts": {}
,
"datas": {}

},
		"Audit":{"fieldTemplates": {
"base": {
"currency": {"controller": /*
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
 * @class View.Fields.Base.Audit.CurrencyField
 * @alias SUGAR.App.view.fields.BaseAuditCurrencyField
 * @extends View.Fields.Base.CurrencyField
 */
({
	// Currency FieldTemplate (base) 

    /**
     * @inheritdoc
     */
    initialize: function(options) {
        this._super('initialize', [options]);

        //audit log is always in base currency. Make sure the currency def reflects that.
        this.def.is_base_currency = true;
    }
}) },
"htmleditable_tinymce": {"controller": /*
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
	// Htmleditable_tinymce FieldTemplate (base) 

    extendsFrom: 'Htmleditable_tinymceField',
    /**
     * Sets the content displayed in the non-editor view
     *
     * @param {String} value Sanitized HTML to be placed in view
     */
    setViewContent: function(value) {
        var editable = this._getHtmlEditableField();
        if (this.action == 'list') {
            // Strip HTML tags for ListView.
            value = $('<div/>').html(value).text();
        }
        if (!editable) {
            return;
        }
        if (!_.isUndefined(editable.get(0)) && !_.isEmpty(editable.get(0).contentDocument)) {
            if (editable.contents().find('body').length > 0) {
                editable.contents().find('body').html(value);
            }
        } else {
            editable.html(value);
        }
    }
}) },
"fieldtype": {"controller": /*
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
 * @class View.Fields.Base.Audit.FieldtypeField
 * @alias SUGAR.App.view.fields.BaseAuditFieldtypeField
 * @extends View.Fields.Base.BaseField
 */
({
	// Fieldtype FieldTemplate (base) 

    /**
     * @inheritdoc
     * Convert the raw field type name
     * into the label of the field of the parent model.
     */
    format: function(value) {
        if (this.context && this.context.parent) {
            var parentModel = this.context.parent.get('model'),
                field = parentModel.fields[value];
            if (field) {
                value = app.lang.get(field.label || field.vname, parentModel.module);
            }
        }
        return value;
    }
}) }
}}
,
"views": {}
,
"layouts": {}
,
"datas": {}

}
	}}})(SUGAR.App);