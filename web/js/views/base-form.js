plemi.views.BaseForm = Backbone.View.extend({
    tagName: 'form',
    initialize: function(options) {
        console.log('BaseForm::initialize()', options);

        //  Template attribute
        if (options.template) {
            this.template = options.template;
        } else if(!this.template) {
            throw new plemi.utils.ViewError('Missing template', this);
        }

        //  Model attribute
        if(!this.model && !this.collection) {
            throw new plemi.utils.ViewError('Missing model and/or collection', this);
        // } else if(this.model && this.collection) {
        //     throw new plemi.utils.ViewError('Only one collection or one model must be provided', this);
        }

        //  Bind collection events if exists
        if (this.collection) {
            if (!this.renderCollection) {
                throw new plemi.utils.ViewError('Missing function renderCollection', this);
            }

            //  Bind the model changes on this view
            this.collection.bind('add', this.renderCollection, this);
            this.collection.bind('remove', this.renderCollection, this);
            this.collection.bind('reset', this.renderCollection, this);
        }

        //  Bind model events if exists
        if (this.model) {
            if (!this.updateModel) {
                throw new plemi.utils.ViewError('Missing function updateModel', this);
            }

            //  Bind the model changes on this view
            this.model.on('change', this.updateModel, this);
        }

        //  Violations
        if (options.violationCollection) {
            this.violationCollection = options.violationCollection;
        } else if (!this.violationCollection) {
            throw new plemi.utils.ViewError('Missing violation collection', this);
        }

        if (!this.updateViolations) {
            throw new plemi.utils.ViewError('Missing function updateViolations', this);
        }

        //  Bind the violation changes on this view
        this.violationCollection.bind('reset', this.updateViolations, this);

        //  Generate html from template
        this.$el.html(plemi.utils.compileTemplate(this.template));
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

        //  Remove previous attribute violations
        _.each(this.violationCollection.where({attribute: name}), function(violation) {
            this.remove(violation);
            // this.remove(violation, {silent: true});
        }, this.violationCollection);

        //  Validate data
        var violations = this.model.validate(attributes);
        violations = _.isEmpty(violations) ? [] : violations;

        //  Append current attribute violations
        violations = violations.concat(this.violationCollection.models);

        //  Replace collection content and trigger a "reset" event
        this.violationCollection.reset(violations);

        //  Trigger the change event
        this.model.change();
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