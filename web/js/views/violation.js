plemi.views.Violation = Backbone.View.extend({
    tagName: 'p',
    className: 'error',
    attributes: {
        style: 'color: red'
    },
    render: function() {
        this.$el.attr('data-attribute', this.model.get('attribute'));
        this.$el.attr('data-view', this.cid);
        this.$el.html(this.model.get('message'));

        return this;
    }
});
