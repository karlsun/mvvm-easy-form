/**
 * Created by karlsun on 15/5/5.
 */
define(function(){
    return  {
        ViewModel: function(defaultVals, formOptions){
            var self = this;

            self.current = ko.observable({ options: {} });
            $.each(formOptions, function(i, formOption){
                self.current().options[formOption.key] = ko.observable(formOption.value);
            });
            for(var key in defaultVals){
                self.current().options[key] = ko.observable(defaultVals[key]);
            }
            self.formOptions = ko.observableArray([]);

            self.existsInArray = function(value, arr){
                var _len = arr.length,
                    _exists = false
                _val = value.constructor == Function ? value() : value;
                for(var i = 0; i < _len; i++){
                    if(arr[i] == _val){
                        _exists = true;
                        break;
                    }
                }
                return _exists;
            }

            self.valid = function(){
                var _opts = self.current().options,
                    _flag = true;
                // 表单验证
                $.each(self.formOptions(), function(i, opt){
                    if(opt.valid){
                        opt.valid_status(true);
                        $.each(opt.valid, function(i, validGroup){
                            if(!validGroup.regexp.test(_opts[opt.key]())){
                                opt.valid_status(false);
                                opt.err_msg(validGroup.msg);
                                _flag = false;
                                return false;
                            }
                        });
                    }
                });
                return _flag;
            }

            var _len = formOptions.length;
            for(var i = 0; i < _len; i++){
                var _opt = $.extend(
                    {
                        valid_status: ko.observable(true),
                        err_msg: ko.observable("")
                    },
                    formOptions[i]
                );
                if(_opt.valid){
                    $.each(_opt.valid, function(i, validGroup){
                        validGroup.regexp = new RegExp(validGroup.regexp);
                    });
                }
                self.formOptions.push(_opt);
            }
        }
    }
});