plemi.views.BaseForm = Backbone.View.extend({
    tagName: 'form',
    initialize: function(options) {
        //  Model attribute
        if(!this.model && !this.collection) {
            throw new plemi.utils.ViewError('Missing model and/or collection', this);
        // } else if(this.model && this.collection) {
        //     throw new plemi.utils.ViewError('Only one collection or one model must be provided', this);
        }

        //  Bind collection events if exists
        if (this.collection) {
            if (!this.refreshCollection) {
                throw new plemi.utils.ViewError('Missing function refreshCollection', this);
            }

            //  Bind the model changes on this view
            this.collection.on('add', this.onAddRemoveCollection, this);
            this.collection.on('remove', this.onAddRemoveCollection, this);
            this.collection.on('reset', this.refreshCollection, this);
        }

        //  Bind model events if exists
        if (this.model) {
            if (!this.refreshModel) {
                throw new plemi.utils.ViewError('Missing function refreshModel', this);
            }

            //  Bind the model changes on this view
            this.model.on('change', this.refreshModel, this);
        }

        //  Violations
        if (options.violationCollection) {
            this.violationCollection = options.violationCollection;
        } else if (!this.violationCollection) {
            throw new plemi.utils.ViewError('Missing violation collection', this);
        }

        if (!this.violationCollection.updateModelViolationAttribute) {
            throw new plemi.utils.ViewError('Missing function updateModelViolationAttribute on violation collection', this);
        }

        if (!this.refreshViolations) {
            throw new plemi.utils.ViewError('Missing function refreshViolations', this);
        }

        //  Bind the violation changes on this view
        this.violationCollection.on('reset', this.refreshViolations, this);
    },
    changeModelAttribute: function(name, value) {
        //  Check attribute is known by model
        if (!this.model.has(name)) {
            plemi.utils.ViewError('Unknown model property "' + name + '"', this);
        }

        //  Define the new model attribute value
        var attributes = {};
        attributes[name] = value;

        //  Force values in model
        this.model.set(attributes, {silent: true});


        this.violationCollection.updateModelViolationAttribute(this.model, name);

        //  Trigger the change event
        this.model.change();
    },
    onAddRemoveCollection: function(model) {
        this.refreshCollection(this.collection);
    }
});