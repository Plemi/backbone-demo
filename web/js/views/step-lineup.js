plemi.views.StepLineup = plemi.views.BaseForm.extend({
    events : {
        'click a.remove': 'onClickRemoveLineup'
    },
    template: '/js/templates/step-lineup.html',
    violationViews: {},
    initialize: function(options) {
        this.addLineupView = new plemi.views.StepLineupAdd({
            model: new plemi.models.Lineup(),
            violationCollection: new plemi.collections.Violation(),
            lineupCollection: this.collection
        });

        plemi.utils.callParentMethod(this, 'initialize', options);
    },
    onClickRemoveLineup: function(event) {
        var lineup = this.collection.getByCid($(event.currentTarget).attr('data-lineup'))
        if (!lineup) {
            throw new ViewError('Failed to retrieve lineup in collection', this);
        }

        this.collection.remove(lineup);

        return false;
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
    refreshCollection: function(collection) {
        var list = this.$('ul');

        //  Remove lineups
        list.html('');

        //  Render lineups
        if (collection.length) {
            _.each(collection.models, function(model) {
                //  Append lineup with a remove link
                list.append('<li>' + model.get('name') + ' (<a class="remove" href="#" data-lineup="' + model.cid + '">Remove</a>)</li>');
            }, this);
        }
    },
    render: function() {
        //  Generate html from template
        this.$el.html(plemi.utils.compileTemplate(this.template));

        //  Render the add view
        this.$el.append(this.addLineupView.render().$el);

        //  Refresh the collection in view
        this.refreshCollection(this.collection);

        return this;
    }
});