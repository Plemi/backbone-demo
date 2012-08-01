plemi.models.Prebooking = Backbone.Model.extend({

    validate: function() {
        if (_.isEmpty(this.attributes.title)) {
            return 'Invalid attribute title';
        }

        return null;
    }

})