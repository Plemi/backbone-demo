Backbone implementation
=======================

## What usages ?

Provide a easy management of model or collection.

All events will be binded and you just have to define some required methods.


## When using model

Create the the view extending the BaseForm and customize the required methods

```javascript
<script type="text/javascript">
    plemi.views.ModelView = plemi.views.BaseForm.extend({
        refreshViolations: function(collection) {
            //  Refresh all violations with given violation collection
        },
        refreshModel: function(model) {
            //  Refresh the view with given model values
        }
    });
</script>
```

Now add your own rendering logic and field event handlers :

```javascript
<script type="text/javascript">
    plemi.views.ModelView = plemi.views.BaseForm.extend({
        template: '/js/templates/step-date.html',
        events : {
            'change input, select': 'onFieldChanged'
        },
        onFieldChanged: function(event) {
            //  In this method, have to call this.changeModelAttribute(attName, attValue)

            /*
            //  Retrieve changed field
            var field = $(event.currentTarget);

            //  Change model attribute
            this.changeModelAttribute(field.attr('name'), field.val());
            */
        },
        refreshViolations: function(collection) {
            //  Refresh all violations with given violation collection
        },
        refreshModel: function(model) {
            //  Refresh the view with given model values
        },
        render: function() {
            /*
            //  Generate html from template
            this.$el.html(plemi.utils.compileTemplate(this.template));

            //  Refresh the model in view
            this.refreshModel(this.model);

            return this;
            */
        }
    });
</script>
```

Create the instance and provide :
- the model
- the collection to own returned errors from model::validate()

See "About the violation collection" for further informations

```javascript
<script type="text/javascript">
    var myModelView = new plemi.views.ModelView({
        model: new plemi.models.MyModel({}),
        violationCollection: new plemi.collections.Violation()
    });
</script>
```


## About the violation collection

Violation collection must provide a updateModelViolationAttribute: function(model, attName) method.


