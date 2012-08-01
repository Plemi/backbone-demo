plemi.models.Lineup = Backbone.Model.extend({
    validate: function(attributes) {
        //  Check given attributes, or current model attributes if not provided
        var attributes = (_.isEmpty(attributes)) ? this.attributes : attributes

        var violations = [];

        console.log('validate', attributes);
        if (_.isEmpty(attributes.band_name)) {
            violations.push(new plemi.utils.AttributeViolation('You must choose a band', 'band_name'));
        }

        return violations.length ? violations : null;
    }
})