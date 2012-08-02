plemi.collections.Violation = Backbone.Collection.extend({
    // idAttribute: 'attribute',
    model: plemi.models.Violation,
    updateModelViolationAttribute: function(model, attName) {
        var attributes = {};
        attributes[attName] = model.get(attName);

        //  Remove previous attribute violations
        _.each(this.where({attribute: attName}), function(violation) {
            this.remove(violation, {silent: true});
        }, this);

        //  Validate data
        var violations = model.validate(attributes);
        violations = _.isEmpty(violations) ? [] : violations;

        //  Append current attribute violations
        violations = violations.concat(this.models);

        //  Replace collection content and trigger a "reset" event
        this.reset(violations);
    }
});