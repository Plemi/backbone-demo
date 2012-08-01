plemi.views.StepLineup = plemi.views.BaseForm.extend({
    events: {
        'click a' : 'onClickAdd'
    },
    template: '/js/templates/step-lineup.html',
    onClickAdd: function() {
        if (this.model.isValid()) {
            console.log('model valide');
            this.collection.push(this.model.clone());
            this.model.clear({silent: true});
            this.model.change();
        } else {
            alert('Invalid');
        }

        return false;
    },
    renderCollection: function(collection) {
        var liste = this.$el.find('ul');
        liste.html('');

        if (collection.length) {
            _.each(collection.models, function(model) {
                liste.append('<li>' + model.get('band_name') + '</li>');
            }, this);
        }
    },
    renderModel: function(model) {
        this.$el.find('input[name=band_name]').val(model.get('band_name'));
    }
});