plemi.models.Date = Backbone.Model.extend({
    defaults: {
        hours: '',
        minutes: '',
        date: ''
    },
    validate: function(attributes) {
        //  Check given attributes, or current model attributes if not provided
        var attributes = (_.isEmpty(attributes)) ? this.attributes : attributes

        var violations = [];

        var validateTime = function (unit, min, max) {
            var timeRegex = /^\d{1,2}$/
            if (timeRegex.test(unit)) {
                var time = parseInt(unit)
                if ((time >= min) && (time < max)) {
                    return true;
                }
            }
            return false;
        }


        if (_.has(attributes, 'hours') && !validateTime(attributes.hours, 0, 24)) {
            violations.push(new plemi.models.Violation({message: 'Invalid hours', attribute: 'hours'}));
        }

        if (_.has(attributes, 'minutes') && !validateTime(attributes.minutes, 0, 60)) {
            violations.push(new plemi.models.Violation({message: 'Invalid minutes', attribute: 'minutes'}));
        }

        var dateRegex = /^\d{1,2}\/\d{1,2}\/\d{4}$/
        if (_.has(attributes, 'date') && !dateRegex.test(attributes.date)) {
            violations.push(new plemi.models.Violation({message: 'Invalid date', attribute: 'date'}));
        }

        //  Return violations if exists or null
        return _.isEmpty(violations) ? null : violations;
    }

})