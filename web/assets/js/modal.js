(function (w) {

    var $modalContainer = null;
    window.addEventListener("load", function () {
        $modalContainer = $("#modal-container");
    });

		
	var loadingId = 1;
	var modalId = 1;
	var last = null;

	function Modal(size, easyClose) {

		last = this;
		var $modalEl = $("#modal-template").clone();
		$modalEl.attr("id", "modal-" + (++modalId));
		$modalContainer.append($modalEl);
	
		this.el = $modalEl;

		$modalEl.modal({
			keyboard: easyClose,
			backdrop: easyClose || "static",
			show: false
		});

		$modalEl.on("hidden.bs.modal", function () {
			$modalEl.remove();
		});

		

		this.header = function (html) {
			if (typeof html == "undefined") return $(".modal-header", $modalEl).html();
			$(".modal-header", $modalEl).html(html);
		}

		this.content = function (html) {
			if (typeof html == "undefined") return $(".modal-body", $modalEl).html();
			$(".modal-body", $modalEl).html(html);
		}

		this.footer = function (html) {
			if (typeof html == "undefined") return $(".modal-footer", $modalEl).html();
			$(".modal-footer", $modalEl).html(html);
		}

	

		var cancel = 0;

		this.close = function () {
		    $modalEl.modal('hide');
			var opened = cancel;

		}


		this.show = function () {
			$modalEl.modal('show');
			cancel++;
		}

		this.title = function(string)
		{
		    if (typeof string == "undefined") return $(".modal-title", $modalEl).text('Alerta');
		    $('.modal-title', $modalEl).text(string);
		}

		this.toggle = function () {
			$modalEl.modal('toggle');
		}

		this.removeCloseButton = function () {
			$(".modal-footer .btn[data-dismiss='modal']", $modalEl).remove();
		}

		this.addButton = function (text, type, icon, position, container, action) {

			if (text instanceof Array) {
				var self = this;
				text.forEach(function (obj) {
					self.addButton(obj.text, obj.type, obj.icon, obj.position, obj.container, obj.action);
				});
				return;
			}
			var invertIcon = false;
			type = (type ? type : "");

			if (icon && ~icon.indexOf(":")) {
				var parts = icon.split(":");
				var icon = parts[0];
				if (parts[1] == "right") {
					invertIcon = true;
				}
			}


			/* btn = "<button ";
			btn += "class='btn ";

			btn += type;
			btn += " pull-" + (position ? position : "left");
			btn += "' >";
			if (icon) {
				btn += "<span class='glyphicon glyphicon-";
				btn += icon;
				btn += "' ></span>";
			}
			btn += text;
			btn += "</button>";*/


			var btn = $("<button></button>");
			btn.addClass("button");
			if (type) btn.addClass(type);
			if (position) btn.addClass("pull-" + position);
			btn.css("min-width","110px");
			if (invertIcon) btn.append(" " + text);
			
			if (icon) btn.append("<span class='glyphicon glyphicon-" + icon + "' ></span> ");
			if (invertIcon) $("span", btn).addClass("right");
			if( !invertIcon ) btn.append(" " + text);

			$(".modal-" + container, $modalEl).append(btn)
			btn.click(action);
			return btn;
		}
	}

	Modal.last = function () {
		return last;
	}

	Modal.loading = function (container, isLoading) {
		if (typeof container == "boolean") {
			isLoading = container;

			if (isLoading) {
				$("#loading").addClass("show");
			} else {
				$("#loading").removeClass("show");
			}
			return;
		}

		if (isLoading) {
			if ($(container).attr("data-id-loading")) return;
			var loading = $("#linear-loading").clone();
			
			$(container).before(loading);
			loading.addClass("show");
			loading.addClass("circle");
			loading.attr("id", "loading-linear-" + ++loadingId);
			$(container).attr("data-id-loading", loading.attr("id"));
		} else {
			var valor = $(container).attr("data-id-loading");
			if (valor) {
				$("#" + valor).remove();
				$(container).attr("data-id-loading", "");
			}
		}
	}

	Modal.show = function (size, easyClose) {

		return new Modal(size, easyClose);

	};

	Modal.title = function (html) {
		$(".modal-title").html(html);
	};

	Modal.alert = function (msg, caption, type, size) {
		caption = caption || "Aviso";
		var alert = new Modal;
		var h = size != "small" ? "h5" : "h2";

		type = type || 'info';

		alert.content("<div class='alert alert-" + type + "'><" + h + " class='text-center'>" + msg + "</"+h+"></div>");
		alert.header("<h4 >" + caption +"</h4>");
		alert.removeCloseButton();
		var btn = alert.addButton("Ok", "btn btn-primary", "ok", "right", "footer", function () {
			alert.close();
		});
		alert.show();
		setTimeout(function () {
			$(btn).focus();
		}, 1000);
	}

	Modal.confirm = function (msg, caption, okText, cancelText, size) {
		caption = caption || "Confirmação";
		var alert = new Modal;
		var h = size != "small" ? "h5" : "h2";
		okText = okText || "Sim";
		cancelText = cancelText || "Cancelar";

		var promise = new PromiseMe();

		alert.content("<" + h + " class='text-center'>" + msg + "</" + h + ">");
		alert.header("<h4>" + caption + "</h4>");
		alert.removeCloseButton();
		var btn = alert.addButton(okText, "btn btn-primary", "ok", "left", "footer", function () {
			alert.close();
			promise.done();
		});
		alert.addButton(cancelText, "btn btn-danger", "remove", "right", "footer", function () {
			alert.close();
			promise.fail();
		});
		alert.show();
		setTimeout(function () {
			$(btn).focus();
		}, 1000);

		return promise.getPromise();

	}

	Modal.sizes = {
		bigger: { w: "90%", h: "90%" },
		normal: { w: "1000px", h: "650px" },
		small: { w: "500px", h: "325px" },
		bigger: function (w, h) {
			return { w: w, h: h };
		}
	};

	w.Modal = Modal;

}(window));