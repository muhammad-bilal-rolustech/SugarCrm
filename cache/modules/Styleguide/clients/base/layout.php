<?php
$clientCache['Styleguide']['base']['layout'] = array (
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
                      'view' => 'list-headerpane',
                    ),
                    1 => 
                    array (
                      'layout' => 
                      array (
                        'type' => 'filterpanel',
                        'span' => 12,
                        'last_state' => 
                        array (
                          'id' => 'list-filterpanel',
                          'defaults' => 
                          array (
                            'toggle-view' => 'list',
                          ),
                        ),
                        'availableToggles' => 
                        array (
                          0 => 
                          array (
                            'name' => 'list',
                            'icon' => 'fa-table',
                            'label' => 'LBL_LISTVIEW',
                          ),
                          1 => 
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
                            'layout' => 'list',
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
                      'layout' => 'dashboard',
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
      'type' => 'records',
      'name' => 'base',
      'span' => 12,
    ),
  ),
  'field' => 
  array (
    'meta' => 
    array (
      'components' => 
      array (
        0 => 
        array (
          'view' => 'sg-headerpane',
        ),
        1 => 
        array (
          'view' => 'field',
        ),
        'type' => 'simple',
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
    plugins: [\'Prettify\'],
    className: \'row-fluid\',

    initialize: function(options) {
        this._super(\'initialize\', [options]);
        // load up the styleguide css if not already loaded
        //TODO: cleanup styleguide.css and add to main file
        if ($(\'head #styleguide_css\').length === 0) {
            $(\'<link>\')
                .attr({
                    rel: \'stylesheet\',
                    href: \'styleguide/assets/css/styleguide.css\',
                    id: \'styleguide_css\'
                })
                .appendTo(\'head\');
        }
    },

    _placeComponent: function(component) {
        this.$(\'.styleguide\').append(component.$el);
    }
})
',
    ),
    'templates' => 
    array (
      'field' => '
<div class="styleguide main-pane span12">
</div>
',
    ),
  ),
  'styleguide' => 
  array (
    'meta' => 
    array (
      'components' => 
      array (
        0 => 
        array (
          'view' => 'sg-headerpane',
        ),
        1 => 
        array (
          'view' => 'styleguide',
        ),
        'type' => 'simple',
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
    className: \'row-fluid\',

    initialize: function(options) {
        this._super(\'initialize\', [options]);
        // load up the styleguide css if not already loaded
        //TODO: cleanup styleguide.css and add to main file
        if ($(\'head #styleguide_css\').length === 0) {
            $(\'<link>\')
                .attr({
                    rel: \'stylesheet\',
                    href: \'styleguide/assets/css/styleguide.css\',
                    id: \'styleguide_css\'
                })
                .appendTo(\'head\');
        }

        document.title = $(\'<span/>\').html(\'Styleguide &#187; SugarCRM\').text();
    },

    _placeComponent: function(component) {
        this.$(\'.styleguide\').append(component.$el);
    }
})
',
    ),
    'templates' => 
    array (
      'styleguide' => '
<div class="styleguide main-pane span12">
</div>
',
    ),
  ),
  'docs' => 
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
                'view' => 'sg-headerpane',
              ),
            ),
            'type' => 'simple',
            'name' => 'main-pane',
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
                'layout' => 'dashlet-preview',
              ),
            ),
            'type' => 'simple',
            'name' => 'preview-pane',
          ),
        ),
        'type' => 'simple',
      ),
      'page_data' => 
      array (
        'home' => 
        array (
          'title' => 'Styleguide',
          'description' => 'Major components of Styleguide.',
          'index' => false,
        ),
        'index' => 
        array (
          'title' => 'Core Elements',
          'description' => 'Simple and flexible HTML, CSS, and Javascript for popular user interface components and interactions.',
          'index' => false,
        ),
        'field' => 
        array (
          'title' => 'Example Sugar7 Fields',
          'description' => 'Basic fields that support detail, record, and edit modes with error addons.',
          'index' => false,
        ),
        'base' => 
        array (
          'title' => 'Base CSS',
          'description' => 'Basic HTML elements styled and enhanced with extensible classes for a fresh, consistent look and feel.',
          'index' => true,
          'pages' => 
          array (
            'typography' => 
            array (
              'label' => 'Typography',
              'description' => 'Headings, paragraphs, lists, and other inline type elements.',
            ),
            'grid' => 
            array (
              'label' => 'Grid system',
              'description' => 'A responsive 12-column grid including fixed- and fluid-width layouts based on that system.',
            ),
            'icons' => 
            array (
              'label' => 'Icons',
              'description' => 'Font Awesome icon library for scalable font based icons and glyphs for a full array of web-related actions.',
            ),
            'mixins' => 
            array (
              'label' => 'Mixins',
              'description' => 'Include or generate snippets of CSS with parameters.',
            ),
            'responsive' => 
            array (
              'label' => 'Responsive design',
              'description' => 'Media queries for various devices and resolutions.',
            ),
            'variables' => 
            array (
              'label' => 'Variables',
              'description' => 'LESS variables, HTML values, and usage guidelines.',
            ),
            'labels' => 
            array (
              'label' => 'Labels',
              'description' => 'Label and annotate text.',
            ),
            'edit' => 
            array (
              'label' => 'Edit Documentation',
              'description' => 'Instructions for updating Styleguide documentation.',
            ),
            'theme' => 
            array (
              'label' => 'Custom Theme Variables',
              'description' => 'Instructions for modifying theme colors.',
            ),
          ),
        ),
        'forms' => 
        array (
          'title' => 'Form Elements',
          'description' => 'Basic form elements and layouts for a consistent editing experience.',
          'index' => true,
          'pages' => 
          array (
            'fields' => 
            array (
              'label' => 'Sugar7 fields',
              'url' => '#Styleguide/field/all',
              'description' => 'Basic fields that support detail, record, and edit modes with error addons.',
            ),
            'buttons' => 
            array (
              'label' => 'Buttons',
              'description' => 'Standard css only button styles.',
            ),
            'layouts' => 
            array (
              'label' => 'Form layouts',
              'description' => 'Customized layouts of field components.',
            ),
            'file' => 
            array (
              'label' => 'File uploader',
              'description' => 'Avatar file upload widget.',
            ),
            'datetime' => 
            array (
              'label' => 'Date-time picker',
              'description' => 'Lightweight date/time picker.',
            ),
            'select2' => 
            array (
              'label' => 'Select2',
              'description' => 'jQuery plugin replacement for select boxes. It supports searching, remote data sets, and infinite scrolling of results.',
            ),
            'jstree' => 
            array (
              'label' => 'jsTree',
              'description' => 'jQuery plugin cross browser tree component.',
            ),
            'range' => 
            array (
              'label' => 'Range Slider',
              'description' => 'jQuery plugin range picker.',
            ),
            'switch' => 
            array (
              'label' => 'Switch',
              'description' => 'jQuerty plugin turns check boxes into toggle switch.',
            ),
          ),
        ),
        'components' => 
        array (
          'title' => 'Components',
          'description' => 'Dozens of reusable components are built in to provide navigation, alerts, popovers, and much more.',
          'index' => true,
          'pages' => 
          array (
            'alerts' => 
            array (
              'label' => 'Alerts',
              'description' => 'Styles for success, warning, and error messages.',
            ),
            'collapse' => 
            array (
              'label' => 'Collapse',
              'description' => 'Get base styles and flexible support for collapsible components like accordions and navigation.',
            ),
            'dropdowns' => 
            array (
              'label' => 'Dropdowns',
              'description' => 'Add dropdown menus to nearly anything with this simple plugin. Features full dropdown menu support on in the navbar, tabs, and pills.',
            ),
            'popovers' => 
            array (
              'label' => 'Popovers',
              'description' => 'Add small overlays of content, like those on the iPad, to any element for housing secondary information.',
            ),
            'progress' => 
            array (
              'label' => 'Progress bars',
              'description' => 'For loading, redirecting, or action status.',
            ),
            'tooltips' => 
            array (
              'label' => 'Tooltips',
              'description' => 'A new take on the jQuery Tipsy plugin, Tooltips don\'t rely on images, uss CSS3 for animations, and data-attributes for local title storage.',
            ),
            'keybindings' => 
            array (
              'label' => 'Key bindings',
              'description' => ' ',
            ),
          ),
        ),
        'layouts' => 
        array (
          'title' => 'Layouts & Views',
          'description' => 'Modals, navbars, and other layout widgets.',
          'index' => true,
          'pages' => 
          array (
            'list' => 
            array (
              'label' => 'List Tables',
              'description' => 'For, you guessed it, tabular data.',
            ),
            'record' => 
            array (
              'label' => 'Record Views',
              'url' => '#Styleguide/create',
              'description' => 'Detail, edit and create views for records.',
            ),
            'drawer' => 
            array (
              'label' => 'Drawers',
              'description' => 'Drawer is a form of a modal that pushes main content down and expands from the top taking 100% of the screen width.',
            ),
            'navbar' => 
            array (
              'label' => 'Navbar',
              'description' => 'Top level navigation layout.',
            ),
            'tabs' => 
            array (
              'label' => 'Tab Navigation',
              'description' => 'Use this plugin to make tabs and pills more useful by allowing them to toggle through tabbable panes of local content.',
            ),
          ),
        ),
        'dashboards' => 
        array (
          'title' => 'Dashboards',
          'description' => 'Documentation and guidelines for dashboards within the app.',
          'index' => true,
          'pages' => 
          array (
            'home' => 
            array (
              'label' => 'Home Module Dashboard',
              'description' => 'A grid layout for arranging dashlets.',
            ),
            'intel' => 
            array (
              'label' => 'Intelligence Pane Dashboard',
              'description' => 'Special features of the content related right hand side dashboard.',
            ),
            'dashlets' => 
            array (
              'label' => 'Dashlets',
              'description' => 'Patterns, styles, and elements for creating dashlets.',
            ),
          ),
        ),
        'charts' => 
        array (
          'title' => 'Charting',
          'description' => 'Standard and custom SVG charts for Sugar7 using the D3 library and the NVD3 framework.',
          'index' => true,
          'pages' => 
          array (
            'circular' => 
            array (
              'label' => 'Circular',
              'description' => 'Used for comparing parts to a whole.',
            ),
            'line' => 
            array (
              'label' => 'Line',
              'description' => 'Used for comparing data series.',
            ),
            'horizontal' => 
            array (
              'label' => 'Horizontal Bar',
              'description' => 'Used for comparing many values in a single series.',
            ),
            'vertical' => 
            array (
              'label' => 'Vertical Bar',
              'description' => 'Used for comparing multiple series with a few values.',
            ),
            'custom' => 
            array (
              'label' => 'Custom',
              'description' => 'Used for comparing values in a process.',
            ),
            'implementation' => 
            array (
              'label' => 'Implementation',
              'description' => 'Patterns for inserting and configuring charts.',
            ),
            'colors' => 
            array (
              'label' => 'Colors',
              'description' => 'Flexible methods for assigning color maps and fill methods to D3 charts.',
            ),
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
    plugins: [\'Prettify\'],
    className: \'row-fluid\',

    initialize: function(options) {
        this._super(\'initialize\', [options]);

        // trigger initial close of side bar
        app.events.trigger(\'app:dashletPreview:close\');

        // load up the styleguide css if not already loaded
        //TODO: cleanup styleguide.css and add to main file
        if ($(\'head #styleguide_css\').length === 0) {
            $(\'<link>\')
                .attr({
                    rel: \'stylesheet\',
                    href: \'styleguide/assets/css/styleguide.css\',
                    id: \'styleguide_css\'
                })
                .appendTo(\'head\');
        }
    },

    /**
     * @inheritdoc
     */
    initComponents: function(components, context, module) {
        var self = this,
            request = {
                file: \'\',
                keys: [],
                page: {},
                page_data: {},
                parent_link: \'\',
                section: {},
                section_page: false
            },
            main;

        this._super(\'initComponents\', [components, context, module]);

        // load page_data index from metadata (defined in layout/docs.php)
        request.page_data = app.metadata.getLayout(this.module, \'docs\').page_data;
        // page_name defined in router
        request.file = this.context.get(\'page_name\');
        if (!_.isUndefined(request.file) && !_.isEmpty(request.file)) {
            request.keys = request.file.split(\'-\');
        }
        if (request.keys.length) {
            // get page content variables from page_data
            if (request.keys[0] === \'index\') {
                if (request.keys.length > 1) {
                    // this is a section index call
                    request.section = request.page_data[request.keys[1]];
                } else {
                    // this is the home index call
                    request.section = request.page_data[request.keys[0]];
                }
                request.section_page = true;
                request.file = \'index\';
            } else if (request.keys.length > 1) {
                // this is a section page call
                request.section = request.page_data[request.keys[0]];
                request.page = request.section.pages[request.keys[1]];
                request.parent_link = \'-\' + request.keys[0];
                window.prettyPrint && prettyPrint();
            } else {
                // this is a general page call
                request.section = request.page_data[request.keys[0]];
            }
        }

        // load up the page view into the component array
        main = this.getComponent(\'main-pane\');
        main._addComponentsFromDef([{
            view: \'docs-\' + request.file,
            context: {
                module: \'Styleguide\',
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
})
',
    ),
    'templates' => 
    array (
      'docs' => '
<div class="styleguide main-pane span12">
</div>
<div class="side sidebar-content span4" style="visibility:hidden;">
    <div class="preview-pane active"></div>
</div>
',
    ),
  ),
  'view' => 
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
    plugins: [\'Prettify\'],
    className: \'row-fluid\',
    data: [],
    page_name: \'\',
    page_doc: {},
    section: {},

    initialize: function(options) {
        this._super(\'initialize\', [options]);
        this.page_name = this.options.context.get(\'page_name\').split(\'_\')[1];
        this.section.title = \'Default Views\';
        // load up the styleguide css if not already loaded
        //TODO: cleanup styleguide.css and add to main file
        if ($(\'head #styleguide_css\').length === 0) {
            $(\'<link>\')
                .attr({
                    rel: \'stylesheet\',
                    href: \'styleguide/assets/css/styleguide.css\',
                    id: \'styleguide_css\'
                })
                .appendTo(\'head\');
        }
    },

    _render: function() {
        this._super(\'_render\');

        var page_content = app.template.getView( this.page_name + \'.\' + this.page_name + \'-doc\', \'Styleguide\');

        this.page_doc = app.view.createView({
                context: this.context,
                name: this.page_name,
                module: \'Styleguide\',
                layout: this,
                model: this.model,
                readonly: true
            });

        this.$(\'.styleguide .container-fluid\').append(page_content(this));
        this.$(\'#exampleView\').append(this.page_doc.el);

        this.page_doc.render();
    },

    _placeComponent: function(component) {
        this.$(\'.styleguide\').append(component.$el);
    }
})
',
    ),
    'templates' => 
    array (
      'view' => '
<div class="styleguide main-pane span12">
    <div class="container-fluid"></div>
</div>
',
    ),
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
                'view' => 'sg-headerpane',
              ),
            ),
            'type' => 'simple',
            'name' => 'main-pane',
          ),
        ),
      ),
      'type' => 'view',
    ),
  ),
  '_hash' => 'e7d8e5cc5c7666411c161274d33a5195',
);

