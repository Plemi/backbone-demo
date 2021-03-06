plemi.views.StepDate = plemi.views.BaseForm.extend({
    events : {
        'change input, select': 'onFieldChanged'
    },
    template: '/js/templates/step-date.html',
    violationViews: {},
    onFieldChanged: function(event) {
        //  Retrieve changed field
        var field = $(event.currentTarget);

        //  Change model attribute
        this.changeModelAttribute(field.attr('name'), field.val());
    },
    refreshViolations: function(violationCollection) {
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
        if (violationCollection.length) {
            _.each(violationCollection.models, function(violationModel) {
                //  Create a violation view and keep it localy
                var violationView = new plemi.views.Violation({model: violationModel});
                this.violationViews[violationView.cid] = violationView;
                //  Display violation
                this.$el.prepend(violationView.render().$el);
            }, this);
        }
    },
    refreshModel: function(model) {
        //  Assign values to form view
        //  ... the date
        this.$el.find('input#date').val(model.get('date'));

        //  ... the time
        this.$el.find('select#hours option[value=' + model.get('hours') + ']').attr('selected', 'selected');

        this.$el.find('select#minutes option[value=' + model.get('minutes') + ']').attr('selected', 'selected');

        return this;
    },
    render: function() {
        //  Generate html from template
        this.$el.html(plemi.utils.compileTemplate(this.template));

        //  Refresh the model in view
        this.refreshModel(this.model);

        return this;
    }
});
