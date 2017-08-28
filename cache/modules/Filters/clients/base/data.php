<?php
$clientCache['Filters']['base']['data'] = array (
  'model' => 
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
 * @class Data.Base.FiltersBean
 * @extends Data.Bean
 */
({
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
        \'datetime\': \'date\',
        \'datetimecombo\': \'date\'
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
        if (moduleName === \'all_modules\' || !searchTerm) {
            return [];
        }

        searchTerm = searchTerm.trim();

        var splitTermFilter;
        var filterList = [];
        var searchMeta = app.data.getBeanClass(\'Filters\').prototype.getModuleQuickSearchMeta(moduleName);
        var fieldNames = searchMeta.fieldNames;

        // Iterate through each field and check if the field is a simple
        // or complex field, and build the filter object accordingly
        _.each(fieldNames, function(name) {
            if (!_.isArray(name)) {
                var filter = this._buildFilterDef(name, \'$starts\', searchTerm);
                if (filter) {
                    // Simple filters are pushed to `filterList`
                    filterList.push(filter);
                }
                return;
            }

            if (splitTermFilter) {
                app.logger.error(\'Cannot have more than 1 split term filter\');
                return;
            }
            splitTermFilter = this._buildSplitTermFilterDef(name, \'$starts\', searchTerm);
        }, this);

        // Push the split term filter
        if (splitTermFilter) {
            filterList.push(splitTermFilter);
        }

        // If more than 1 filter was created, wrap them in `$or`
        if (filterList.length > 1) {
            var filter = this._joinFilterDefs(\'$or\', filterList);
            if (filter) {
                filterList = [filter];
            }
        }

        // FIXME [SC-3560]: This should be moved to the metadata
        if (moduleName === \'Users\' || moduleName === \'Employees\') {
            filterList = this._simplifyFilterDef(filterList);
            filterList = [{
                \'$and\': [
                    {\'status\': {\'$not_equals\': \'Inactive\'}},
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
                {\'$and\': baseFilter }
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
            delete fields[fieldName][\'readonly\'];
        });

        var validFields = {};
        _.each(fields, function(value, key) {
            // Check if we support this field type.
            var type = this.fieldTypeMap[value.type] || value.type;
            var hasAccess = app.acl.hasAccess(\'detail\', moduleName, null, key);
            // Predefined filters don\'t have operators defined.
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
        moduleName = moduleName || this.get(\'module_name\');

        var prototype = app.data.getBeanClass(\'Filters\').prototype;
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
                    filter = {\'$equals\': filter};
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
            app.logger.error(\'Cannot have more than 2 fields in a complex filter\');
            return;
        }

        // If the field is a split-term field, but only composed of single item
        // return the simple filter
        if (fieldNames.length === 1) {
            return this._buildFilterDef(fieldNames[0], operator, searchTerm);
        }

        var filterList = [];
        var tokens = searchTerm.split(\' \');

        // When the searchTerm is composed of at least 2 terms delimited by a space character,
        // Divide the searchTerm in 2 unique sets
        // e.g. For the name "Jean Paul Durand",
        // first = "Jean", rest = "Paul Durand" (1st iteration)
        // first = "Jean Paul", rest = "Durand" (2nd iteration)
        for (var i = 1; i < tokens.length; ++i) {
            var first = _.first(tokens, i).join(\' \');
            var rest = _.rest(tokens, i).join(\' \');

            // FIXME the order of the filters need to be reviewed (TY-547)
            var tokenFilter = [
                this._buildFilterDef(fieldNames[0], operator, first),
                this._buildFilterDef(fieldNames[1], operator, rest)
            ];
            filterList.push(this._joinFilterDefs(\'$and\', tokenFilter));
        }

        // Try with full search term in each field
        // e.g. `first_name: Sangyoun Kim` or `last_name: Sangyoun Kim`
        _.each(fieldNames, function(name) {
            filterList.push(this._buildFilterDef(name, operator, searchTerm));
        }, this);

        return this._joinFilterDefs(\'$or\', filterList);
    }
})
',
    ),
  ),
  'collection' => 
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
 * This `FiltersCollection` is designed to be used like:
 *
 *     filters = app.data.createBeanCollection(\'Filters\');
 *     filters.setModuleName(\'Accounts\');
 *     filters.setFilterOptions(filterOptions); // Optional
 *     filters.load({
 *         success: _.bind(function() {
 *             // You can start using `filters.collection`
 *         }, this)
 *     });
 *
 * Even though {@link #load} and {@link #collection} are the recommended way to
 * manipulate the filters of a module, you can still use this `BeanCollection`
 * in a more traditional way.
 *
 *     filters = app.data.createBeanCollection(\'Filters\');
 *     filters.fetch({
 *         filter: [
 *             {\'created_by\': app.user.id},
 *             {\'module_name\': module}
 *         ],
 *         success: _.bind(function() {
 *             // You can start using the collection
 *         }, this)
 *     });
 *
 * **Note** that in this case you\'re not taking advantage of the internal cache
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
     * User\'s filters will be positioned first in the collection, the
     * predefined filters will be positioned second.
     *
     * @param {Data.Bean} model1 The first model.
     * @param {Data.Bean} model2 The second model.
     * @return {Number} If `-1`, the first model goes before the second model,
     *   if `1`, the first model goes after the second model.
     */
    comparator: function(model1, model2) {
        if (model1.get(\'editable\') === false && model2.get(\'editable\') !== false) {
            return 1;
        }
        if (model1.get(\'editable\') !== false && model2.get(\'editable\') === false) {
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
     * the current user\'s filters.
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
            app.logger.error(\'This Filters collection has no module defined.\');
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
                {\'created_by\': app.user.id},
                {\'module_name\': module}
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
                    app.logger.error(\'Unable to get filters from the server.\');
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
     * order to get the user\'s filters.
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
     * The collection contains predefined filters and the current user\'s
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
            model: app.data.getBeanClass(\'Filters\'),
            _setInitialFilter: this._setInitialFilter,
            comparator: this.comparator,
            _getPrototype: this._getPrototype,
            _getTranslatedFilterName: this._getTranslatedFilterName,
            _cacheFilters: this._cacheFilters,
            _updateFilterCache: this._updateFilterCache,
            _removeFilterCache: this._removeFilterCache,
            initialize: function(models, options) {
                this.on(\'add\', this._cacheFilters, this);
                this.on(\'cache:update\', this._updateFilterCache, this);
                this.on(\'remove\', this._removeFilterCache, this);
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
        var name = model.get(\'name\') || \'\';

        if (model.get(\'editable\') !== false && !model.get(\'is_template\')) {
            return name;
        }
        var module = model.get(\'module_name\') || this.moduleName;

        var fallbackLangModules = model.langModules || [module, \'Filters\'];
        var moduleName = app.lang.getModuleName(module, {plural: true});
        var text = app.lang.get(name, fallbackLangModules) || \'\';
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
            app.logger.error(\'The module "\' + this.moduleName + \'" has no metadata.\');
            return;
        }

        var moduleFilterMeta = moduleMeta.filters;
        if (!moduleFilterMeta) {
            app.logger.error(\'The module "\' + this.moduleName + \'" has no filter metadata.\');
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

        if (filterId === \'$relate\') {
            var filterDef = {};
            _.each(this._filterOptions.filter_populate, function(value, key) {
                filterDef[key] = \'\';
            });
            this.add([
                {
                    \'id\': \'$relate\',
                    \'editable\': true,
                    \'is_template\': true,
                    \'filter_definition\': [filterDef]
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
        this.get(filterId).set(\'name\', this._filterOptions.initial_filter_label);
        this.get(filterId).langModules = this._filterOptions.initial_filter_lang_modules;
    },

    /**
     * Saves the list of filters in memory.
     *
     * Only user\'s filters are refreshed. We want to ignore changes to template
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
})
',
    ),
  ),
  '_hash' => '1a34e52700e4de7f64ec56f94ef6a260',
);

