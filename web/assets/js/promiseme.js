(function () {

    function PromiseMe() {
        var self = this;
        var _successListeners = [];
        var _failListeners = [];
        var _defined = [];

        var _promiseReturn = {
            done: function (cb) {
                _successListeners.push(cb);
                return this;
            },
            fail: function (cb) {
                _failListeners.push(cb);
                return this;
            },
            always: function (cb) {
                _successListeners.push(cb);
                _failListeners.push(cb);
                return this;
            },
            wait: function (cb) {

                var promise = new PromiseMe();

                _defined.forEach(function (def) {
                    promise.define(def.name, def.type, def.cb);
                });

                promise.getPromise().done(function () {
                    //self.done.apply(self, arguments);
                });

                promise.getPromise().fail(function () {
                    //self.fail.apply(self, arguments);
                });


                this.done(function () {
                    cb.apply(this, [function () {
                        promise.done.apply(promise, arguments);
                    }, function () {
                        promise.fail.apply(promise, arguments);
                    }].concat([].slice.call(arguments)));
                });

                this.fail(function () {
                    promise.fail.apply(promise, arguments);
                });

                return promise.getPromise();

            },
            then: function (cb) {

                var promise = new PromiseMe();

                promise.getPromise().done(function () {
                    //self.done.apply(self, arguments);
                });

                promise.getPromise().fail(function () {
                    //self.fail.apply(self, arguments);
                });

                this.done(function () {
                    var selfPromise = cb.apply(this, arguments);
                    selfPromise.done(function () { promise.done.apply(promise, arguments); });
                    selfPromise.fail(function () { promise.fail.apply(promise, arguments); });
                });

                this.fail(function () {
                    promise.fail.apply(promise, arguments);
                });

                _defined.forEach(function (def) {
                    promise.define(def.name, def.type, def.cb);
                });



                return promise.getPromise();;
            }
        }

        this.thisObj = {};

        this.doneWait = function (wait) {

            var params = arguments;
            if (params.length > 0) {
                params = [].slice(params, 1);
            } else {
                params = [];
            }
            var self = this;
            setTimeout(function () {
                self.done.call(self, params);
            }, wait || 10);
        };

        this.failWait = function (wait) {

            var params = arguments;
            if (params.length > 0) {
                params = [].slice(params, 1);
            } else {
                params = [];
            }
            var self = this;
            setTimeout(function () {
                self.fail.call(self, params);
            }, wait || 10);
        }

        this.done = function () {
            var args = [].slice.call(arguments);
            _successListeners.filter(function (x) {
                return typeof x == "function";
            }).forEach(function (f) {
                var r = f.apply(self.thisObj, args);
                if (typeof r !== "undefined") {
                    args = [r].concat(args);
                }
            });
            _successListeners = [];
            _failListeners = [];
        }

        this.fail = function () {
            var args = [].slice.call(arguments);
            _failListeners.filter(function (x) {
                return typeof x == "function";
            }).forEach(function (f) {
                var r = f.apply(self.thisObj, args);
                if (typeof r !== "undefined") {
                    args = [r].concat(args);
                }
            });
            _successListeners = [];
            _failListeners = [];

        }

        this.define = function (name, type, cb) {
            _defined.push({ name: name, type: type, cb: cb });
            _promiseReturn[name] = function () {
                var args = arguments;
                return _promiseReturn[type](function () {
                    return cb.apply({ parameters: [].slice.call(arguments, 0) }, args);
                });
            };

        }

        this.delay = function (w) {
            this.doneWait(w);
            return this.getPromise();
        }

        this.run = function (action) {
            return this.delay(100).done(action);
        };

        this.all = function (promises) {

            var promise = new PromiseMe();

            var itensToLoad = promises.length;
            var itensLoaded = 0;
            var results = promises.map(function () { return null; });

            promises.forEach(function (promiseToWait, i) {

                promiseToWait.always(function (result) {
                    results[i] = result;
                    itensLoaded++;
                    if (itensLoaded == itensToLoad) promise.done(results);
                });

            });

            return promise.getPromise();
        };

        this.getPromise = function () {
            return _promiseReturn;
        }

    }

    if (typeof define == "function") {
        define(function () {

            return PromiseMe;

        });
    } else if (typeof module == "object") {
        module.exports = PromiseMe;
    } else {
        window.PromiseMe = PromiseMe;
    }

}());