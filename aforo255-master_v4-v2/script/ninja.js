(function () {

    Window.prototype.context = "/lussome";

    Window.prototype.wideScreen = 1920;
    Window.prototype.extraScreen = 1440;
    Window.prototype.largeScreen = 1024;
    Window.prototype.mediunScreen = 768;
    Window.prototype.smallScreen = 425;

    Window.prototype.ready = function (action) {
        window.addEventListener("load", function (event) {
            action(event);
        }, false);
    }

    Window.prototype.get = function (selector) {
        var nodeList = document.querySelectorAll(selector);
        var quantity = selector.split(" ").length;
        var idSelector = selector.indexOf("#");
        if (nodeList.length == 1 && quantity == 1 && idSelector == 0) {
            return nodeList[0];
        } else {
            return nodeList;
        }
    }

    Window.prototype.extend = function (elementClass, parentClass) {
        for (k in parentClass) {
            elementClass.prototype[k] = parentClass[k];
        }
    }

    Window.prototype.loader = {
        start: function (message) {
            
        },
        stop: function () {

        }
    };

    Window.prototype.ajax = function (options) {
        if (options != null) {
            // setup the AJAX call
            var requestType = options.requestType != undefined ? options.requestType : "post";
            var url = options.url != undefined ? options.url : "";
            var async = options.async != undefined ? options.async : "true";
            var data = options.data != undefined ? options.data : "";
            var returnType = options.returnType != undefined ? options.returnType : "json";
            var contentType = options.contentType != undefined ? options.contentType : "application/x-www-formurlencoded; charset=UTF-8";
            // functions
            var success = options.success;
            var error = options.error;
            // make the call
            var xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function () {
                if (xhr.readyState < 4) {
                    loader.start();
                }
                if (xhr.status !== 200) {
                    // stop the loader...
                    if (error != undefined) {
                        error(xhr.status);
                    }
                }
                if (xhr.readyState === 4) {
                    var response = xhr.responseText;
                    if (success != undefined) {
                        if (returnType === "json") {
                            success(JSON.parse(decodeURI(response)));
                        } else {
                            success(decodeURI(response));
                        }
                    }
                    loader.stop();
                }
            };
            xhr.open(requestType, (context + url), async);
            xhr.setRequestHeader("Content-Type", contentType);
            xhr.send(data);
        }
    }

    Window.prototype.enter = function (elements, action) {
        elements.forEach(function (element) {
            element.addEventListener("keyup", function (event) {
                if (event.keyCode == 13) {
                    action(event);
                }
            }, false);
        });
    }

    Window.prototype.escape = function (elements, action) {
        elements.forEach(function (element) {
            element.addEventListener("keyup", function (event) {
                if (event.keyCode == 27) {
                    action(event);
                }
            }, false);
        });
    }

    Window.prototype.encode = function (source) {
        return source.constructor.name === "Object" || source.constructor.name === "Array" ? encodeURI(JSON.stringify(source)) : encodeURI(new String(source));
    }

    Window.prototype.maxZIndex = function () {
        // Checkout..
        var all = get("*");
        var mzi = 1;
        all.forEach(function (element) {
            var css = element.css("z-index");
            if (css.zIndex != "auto") {
                mzi = Number(css.zIndex) > mzi ? Number(css.zIndex) : mzi;
            }
        });
        return mzi;
    }

    Window.prototype.addEvent = function (eventName, action, useCapture) {
        var node = this;
        if (useCapture == undefined) {
            useCapture = false;
        }
        node.addEventListener(eventName, function (event) {
            action(node, event);
        }, useCapture);
    }

    Window.prototype.setFileName = function (node) {
        if (node != undefined) {
            var id = node.id;
            var parent = node.parentNode;
            var label = parent.get("label[for='" + id + "']")[0];
            var text = node.value.substring(node.value.lastIndexOf("\\") + 1);
            if (label != undefined) {
                label.textContent = text;
            }
        }
    }

    // --------------------------------------------------------------------------------

    Node.prototype.get = function (selector) {
        var node = this;
        var nodeList = node.querySelectorAll(selector);
        var quantity = selector.split(" ").length;
        var idSelector = selector.indexOf("#");
        if (nodeList.length == 1 && quantity == 1 && idSelector == 0) {
            return nodeList[0];
        } else {
            return nodeList;
        }
    }

    Node.prototype.addClass = function (className) {
        var node = this;
        node.classList.add(className);
        // var aux=className.split(" ");
        // aux.forEach(function(element){
        // if(node.classList!=undefined){
        // node.classList.add(element);
        // } else{
        // node.className+=' '+element;
        // }
        // });
    }

    Node.prototype.removeClass = function (className) {
        var node = this;
        node.classList.remove(className);
        // var aux=className.split(" ");
        // aux.forEach(function(element){
        // if(node.classList!=undefined){
        // node.classList.remove(element);
        // } else{
        // node.className=node.className.replace(new
        // RegExp('(^|\\b)'+element.split(' ').join('|')+'(\\b|k)','gi'),' ');
        // }
        // });
    }

    Node.prototype.toggleClass = function (className) {
        var node = this;
        node.classList.toggle(className);
    }

    Node.prototype.hasClass = function (className) {
        var node = this;
        return condition = node.classList.contains(className);
    }

    Node.prototype.getPosition = function () {
        var node = this;
        var position = {
            "left": node.offsetLeft,
            "top": node.offsetTop
        }
        return position;
    }

    Node.prototype.css = function (object) {
        var node = this;
        var css;
        if (object.constructor.name === "Object") {
            // Set css attributes
            for (k in object) {
                node.style[k] = object[k];
            }
            return null;
        } else if (object.constructor.name === "Array" || object.constructor.name === "String") {
            // Get css attributes
            if (object.constructor.name === "String") {
                css = window.getComputedStyle(node).getPropertyValue(object);
            } else if (object.constructor.name === "Array") {
                css = new Object();
                object.forEach(function (attribute) {
                    var aux = attribute.split("-");
                    var attributeName = "";
                    aux.forEach(function (name, pos) {
                        if (pos == 0) {
                            attributeName += name.substring(0, 1) + name.substring(1);
                        } else {
                            attributeName += name.substring(0, 1).toUpperCase() + name.substring(1);
                        }
                    });
                    css[attributeName] = window.getComputedStyle(node).getPropertyValue(attribute);
                })
            }
            return css;
        } else {
            return false;
        }
    }

    Node.prototype.fade = function (opacity, options) {
        var node = this;
        var opacity = opacity != undefined ? opacity : 1;
        var action = options != undefined && options.action != undefined ? options.action : null;
        var duration = options != undefined && options.duration != undefined ? options.duration : "0.64s";
        node.css({
            "opacity": opacity,
            "transition": "opacity " + duration
        });
        // ejecutando action si esta definida
        var t1 = setInterval(function () {
            if (node.css("opacity")) {
                clearInterval(t1);
                if (action != null) {
                    action();
                }
            }
        });
    }

    Node.prototype.show = function (options) {
        var node = this;
        var duration = "0.64s";
        var display = "block";
        var transition = "";
        var css = {
            "opacity": "1"
        }
        // verificando si existen estilos adicionales
        if (options != undefined && options.css != undefined) {
            for (k in options.css) {
                if (k == "display") {
                    display = options.css[k];
                } else {
                    var aux = options.css[k].split(">");
                    css[k] = aux[0];
                    if (aux[1] != null) {
                        transition += k + " " + aux[1].trim() + ",";
                    } else {
                        transition += k + " " + duration + ",";
                    }
                }
            }
            // colocando el efecto opacity por defecto
            css.transition = transition + " opacity " + duration;
        }
        // mostrando el node
        node.css({
            "display": display
        });
        var t1 = setInterval(function () {
            if (node.css("display") == display) {
                clearInterval(t1);
                // aplicando la animacion
                node.css(css);
                if (options != undefined && options.complete != undefined && options.complete != null) {
                    var t2 = setInterval(function () {
                        if (node.css("opacity") == "1") {
                            clearInterval(t2);
                            options.complete();
                        }
                    }, 100);
                }
            }
        }, 100);
    }

    Node.prototype.hide = function (options) {
        var node = this;
        var duration = "0.64s";
        var display = "none";
        var transition = "";
        var css = {
            "opacity": "0"
        }
        // verificando si existen estilos adicionales
        if (options != undefined && options.css != undefined) {
            for (k in options.css) {
                if (k != "display") {
                    var aux = options.css[k].split(">");
                    css[k] = aux[0];
                    if (aux[1] != null) {
                        transition += k + " " + aux[1].trim() + ",";
                    } else {
                        transition += k + " " + duration + ",";
                    }
                }
            }
            // colocando el efecto opacity por defecto
            css.transition = transition + " opacity " + duration;
        }
        // aplicando la animacion
        node.css(css);
        var t1 = setInterval(function () {
            if (node.css("opacity") == "1") {
                clearInterval(t1);
                // ocultando el node
                node.css({
                    "display": display
                });
                if (options != undefined && options.complete != undefined && options.complete != null) {
                    var t2 = setInterval(function () {
                        if (node.css("opacity") == "1") {
                            clearInterval(t2);
                            options.complete();
                        }
                    }, 100);
                }
            }
        }, 100);
    }

    Node.prototype.insert = function (element) {
        var node = this;
        if (element.constructor.name === "String") {
            node.insertAdjacentHTML("beforeend", element);
        } else {
            node.appendChild(element);
        }
    }

    Node.prototype.isFocused = function () {
        var node = this;
        if (document.activeElement === node) {
            return true;
        } else {
            return false;
        }
    }

    Node.prototype.addEvent = function (eventName, action, useCapture) {
        var node = this;
        if (useCapture == undefined) {
            useCapture = true;
        }
        node.addEventListener(eventName, function (event) {
            action(node, event);
        }, useCapture);
    }

    Node.prototype.load = function (url) {
        var node = this;
        ajax({
            url: url,
            requestType: "get",
            returnType: "text",
            async: false,
            contentType: "text/html",
            success: function (responseHTML) {
                node.innerHTML = responseHTML;

            }
        });

        if (options.target != undefined) {
            node.querySelectorAll("script").forEach(function (scriptElement) {
                var script = document.createscriptElement("script");
                node.removeChild(scriptElement);
                if (scriptElement.src != "" && scriptElement.innerHTML == "") {
                    ajax({
                        url: scriptElement.src,
                        returnType: "script",
                        method: "get",
                        success: function (responseScript) {
                            script.innerHTML = new String(responseScript);
                            node.appendChild(script);
                        }
                    });
                } else {
                    script.innerHTML = scriptElement.innerHTML;
                    node.appendChild(script);
                }
            });
        }
    }

    // --------------------------------------------------------------------------------

    NodeList.prototype.forEach = function (action) {
        var nodeList = this;
        for (var position = 0; position < nodeList.length; position++) {
            action(nodeList[position], position);
        }
    }

    NodeList.prototype.addEvent = function (eventName, action) {
        var nodeList = this;
        for (var i = 0; i < nodeList.length; i++) {
            var node = nodeList[i];
            node.addEvent(eventName, function () {
                action(node, i);
            });
        }
    }

    NodeList.prototype.randomElements = function () {
        var nodeList = this;
        var currentIndex = nodeList.length;
        var temporaryValue;
        var randomIndex;
        // While there remain elements to shuffle...
        while (0 !== currentIndex) {
            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
            // And swap it with the current element.
            temporaryValue = nodeList[currentIndex];
            nodeList[currentIndex] = nodeList[randomIndex];
            nodeList[randomIndex] = temporaryValue;
            return nodeList;
        }
    }

    // --------------------------------------------------------------------------------

    Array.prototype.setCombo = function (options) {

        // checkout...

        // if (options != undefined && options != null) {
        // var array = this;
        // var selected = "";
        // var element = options.target; // options.target es un NodeElement
        // if (options.className != undefined)
        // element.addClass(options.className);
        // var options = "<option></option>";
        // array.forEach(function (e) {
        // if (options.firstSelected != undefined && options.firstSelected && i
        // == 0) {
        // selected = "selected";
        // }
        // if (e.constructor.name === "Object") {
        // options += "<option " + selected + " value=\"" + e[options.value] +
        // "\">" + e[options.label] + "</option>";
        // }
        // else {
        // options += "<option " + selected + " value=\"" + e + "\">" + e +
        // "</option>";
        // }
        // });
        // if (element.constructor.name === "NodeList") {
        // element.forEach(function (e, i) {
        // e.innerHTML = options
        // });
        // } else {
        // element.innerHTML = options;
        // }
        // } else {
        // console.log("the options is undefined or null");
        // }
    }

    Array.prototype.get = function (filter) {
        var array = this;
        var object = null;
        if (filter.constructor.name === "Object") {
            // para obtener un objeto de un array de objetos
            var field;
            var value;
            for (k in filter) {
                field = k;
                value = filter[k];
            }
            for (var i = 0; i < array.length; i++) {
                var element = array[0];
                if (element[field] == value) {
                    object = element;
                    break;
                }
            }
        } else {
            // para obtener un valor de un array de un solo tipo
            for (var i = 0; i < array.length; i++) {
                var element = array[0];
                if (element == filter) {
                    object = element;
                    break;
                }
            }
        }
        return object;
    }

    Array.prototype.remove = function (filter) {
        var array = this;
        var object = null;
        if (filter.constructor.name === "Object") {
            // para remover un objeto de un array de objetos
            var field;
            var value;
            for (k in filter) {
                field = k;
                value = filter[k];
            }
            for (var i = 0; i < array.length; i++) {
                var element = array[0];
                if (element[field] == value) {
                    array.splice(position, 1);
                    break;
                }
            }
        } else {
            // para remover un valor de un array de un solo tipo
            var array = this;
            for (var i = 0; i < array.length; i++) {
                var element = array[0];
                if (element == filter) {
                    array.splice(position, 1);
                    break;
                }
            }
        }
    }

    // Array.prototype.randomElements = function () {
    // var array = this;
    // var currentIndex = array.length, temporaryValue, randomIndex;
    // // While there remain elements to shuffle...
    // while (0 !== currentIndex) {
    // // Pick a remaining element...
    // randomIndex = Math.floor(Math.random() * currentIndex);
    // currentIndex -= 1;
    // // And swap it with the current element.
    // temporaryValue = array[currentIndex];
    // array[currentIndex] = array[randomIndex];
    // array[randomIndex] = temporaryValue;
    // return array;
    // }
    // }

    // --------------------------------------------------------------------------------

    String.prototype.startWith = function (character) {
        var string = this;
        var condicion = new Boolean();
        if (string != "") {
            var aux = string.length > 1 ? aux = string.substring(0, 1) : string;
            condicion = character === aux ? true : false;
        }
        return condicion;
    }

    String.prototype.trim = function () {
        var string = this;
        return string.replace(/^\s+|\s+$/g, "");
    }

})();