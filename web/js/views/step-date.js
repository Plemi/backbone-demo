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
    updateViolations: function(violationCollection) {
        //  Clear previous violations
        if (!_.isEmpty(this.violationViews)) {
            _.each(this.violationViews, function(violationView, index) {
                violationView.remove({silent: true});
                delete this.violationViews[index];
            }, this);
        }

        //  Append violations
        if (violationCollection.length) {
            _.each(violationCollection.models, function(violationModel) {
                var violationView = new plemi.views.Violation({model: violationModel});
                this.violationViews[violationView.cid] = violationView;
                this.$el.prepend(violationView.render().$el);
            }, this);
        }
    },
    updateModel: function(model) {
        //  Assign values to form view
        //  ... the date
        this.$el.find('input#date').val(model.get('date'));

        //  ... the time
        this.$el.find('select#hours option[value=' + model.get('hours') + ']').attr('selected', 'selected');

        this.$el.find('select#minutes option[value=' + model.get('minutes') + ']').attr('selected', 'selected');

        return this;
    },
    render: function() {
        if (this.collection) {
            this.renderCollection(this.collection);
        }

        if (this.model) {
            this.updateModel(this.model);
        }

        return this;
    }
});
