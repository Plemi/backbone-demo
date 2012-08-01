plemi.utils.compileTemplate = function (url, data) {
    var result, compiled;
    $.ajax({
        url: url,
        dataType: 'html',
        async: false,
        success: function (source) {
            compiled = Handlebars.compile(source);
            result = compiled(data);
        },
        error: function (error) {
            result = '';
        }
    });

    return result;
};

plemi.utils.AttributeViolation = function(message, attribute) {
    this.name = "AttributeViolation";
    this.message = (message || "");
    this.attribute = (attribute || null);
}

plemi.utils.ViewError = function(message, view) {
    this.name = "ViewError";
    this.message = (message || "");
    this.view = view;
};

plemi.utils.ModelError = function(message, model) {
    this.name = "ModelError";
    this.message = (message || "");
    this.model = model;
};

plemi.utils.callParentMethod = function(obj, method) {
    var params = [];
    _.each(arguments, function(arg, index){
        if (index > 1) {
            params.push(arg);
        }
    }, this);

    obj.constructor.__super__[method].apply(obj, params);
};