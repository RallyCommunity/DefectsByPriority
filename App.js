// Copyright (c) 2002-2012  Rally Software Development Corp. All rights reserved.

Ext.define('CustomApp', {
    extend: 'Rally.app.App',
    componentCls: 'app',

    items: [
        {
            xtype: 'container',
            itemId: 'priorityFilter'
        },
        {
            xtype: 'container',
            itemId: 'grid'
        }
    ],

    launch: function() {

        this.down('#priorityFilter').add({
            xtype: 'rallyattributecombobox',
            itemId: 'priorityComboBox',
            model: 'Defect',
            field: 'Priority',
            storeConfig: {
                listeners: {
                    load: this._onLoad,
                    scope: this
                }
            },
            listeners: {
                select: this._onSelect,
                scope: this
            }
        });
    },

    _onLoad: function(comboBox) {
        this.attributeComboBox = this.down('#priorityComboBox');
        Rally.data.ModelFactory.getModel({
            type:'Defect',
            success:this._onModelRetrieved,
            scope: this
        });
    },

    _onSelect: function() {
        var filterConfig = {
            property:'Priority',
            operator: '=',
            value: this.down('#priorityComboBox').getValue()
        };

        this.grid.filter(filterConfig, true, true);
    },
    
    _onModelRetrieved: function(model) {
        this.grid = this.add({
              xtype:'rallygrid',
              model: model,
              columnCfgs:[
                  'FormattedID',
                  'Name',
                  'Priority',
                  'Severity'
              ],
              storeConfig:{
                  context: this.context.getDataContext(),
                  filters:[
                      {
                          property:'Priority',
                          operator: '=',
                          value: this.down('#priorityComboBox').getValue()
                      }
                  ]
              },
              showPagingToolbar: false
        });
    }
});
