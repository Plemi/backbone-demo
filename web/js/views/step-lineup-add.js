plemi.views.StepLineupAdd = plemi.views.BaseForm.extend({
    events : {
        'change input': 'onFieldChanged',
        'click a': 'onAddLineup'
    },
    template: '/js/templates/step-lineup-add.html',
    violationViews: {},
    initialize: function(options) {
        if (options.lineupCollection) {
            this.lineupCollection = options.lineupCollection;
        } else if(!this.lineupCollection) {
            throw new plemi.utils.ViewError('Missing collection "lineupCollection" to add new lineups', this);
        }

        plemi.utils.callParentMethod(this, 'initialize', options);
    },
    onAddLineup: function(event) {
        if (this.model.isValid()) {
            //  Append a clone of the model to collection
            this.lineupCollection.add(this.model.clone());

            //  Clear model
            this.model.clear();
        }
        return false;
    },
    onFieldChanged: function(event) {
        //  Retrieve changed field
        var field = $(event.currentTarget);

        //  Change model attribute
        this.changeModelAttribute(field.attr('name'), field.val());
    },
    refreshViolations: function(collection) {
        //  Clear previous violations
        if (!_.isEmpty(this.violationViews)) {
            _.each(this.violationViews, function(violationView, index) {
                //  Remove html
                violationView.remove({silent: true});
                //  Delete view localy
                delete this.violationViews[index];
            }, this);
        }

        //  Append violations
        if (collection.length) {
            _.each(collection.models, function(violationModel) {
                //  Create a violation view and keep it localy
                var violationView = new plemi.views.Violation({model: violationModel});
                this.violationViews[violationView.cid] = violationView;
                //  Display violation
                this.$el.prepend(violationView.render().$el);
            }, this);
        }
    },
    refreshModel: function(model) {
        this.$el.find('input').val(this.model.get('name'));

        return this;
    },
    render: function() {
        //  Generate html from template
        this.$el.append(plemi.utils.compileTemplate(this.template));

        //  Refresh the collection in view
        this.refreshModel(this.model);

        return this;
    }
});