plemi.views.StepLineupAdd = plemi.views.BaseForm.extend({
    events : {
        'change input, select': 'onFieldChanged'
    },
    template: '/js/templates/step-lineup-add.html',
    violationViews: {},
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

        return this;
    },
    render: function() {
        //  Generate html from template
        this.$el.append(plemi.utils.compileTemplate(this.template));

        //  Refresh the collection in view
        // this.refreshModel(this.model);

        return this;
    }
});