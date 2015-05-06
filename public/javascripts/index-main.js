/**
 * Created by karlsun on 15/5/5.
 */
require([
    'mvvm-easy-form'
], function(mef){
    $.getJSON("/javascripts/formOptions.json", function(formOptions){
        var _$form_example = $("#form-example");
        $.get("/javascripts/template.html", function(html){
            _$form_example.append(html);
            var formViewModel = new mef.ViewModel({
                name: "张三",
                age: 17,
                gender: "male",
                "age-range": "lt18"
            }, formOptions);

            var summaryViewModel = new function(){

            }

            summaryViewModel.valid = function(){
                formViewModel.valid();
            }

            summaryViewModel.formVal = formViewModel.current().options;

            ko.applyBindings(formViewModel, _$form_example[0]);
            ko.applyBindings(summaryViewModel, $("#summary")[0]);
        });
    })
})