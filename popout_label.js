

(function($) {

	$.fn.popoutLabel = function(options) {
		var element = $(this);
		var submitClicked = false;
		var settings = $.extend({
			targetForm : 'form',
			targetContainer : '.popout-container',
			targetInput : '.popout-container > .popout-input',
			unvalidated : '<span></span>',
			validated : '<span></span>',
			popoutOnLoad : true,
			inputOffset : 0,
			textareaOffset : 0,
			position : 'top',
			easing : 'bounce',
			animationDuration : 500,
			animationEffect : 'front',
			labelColor : 'default',
			labelFontSize : 'default',
			labelFontWeight : 'default',
			labelLetterSpacing : 'default',
			labelWordSpacing : 'default',
			labelTextShadow : 'default',
			labelColorTransition : [true, true],
			labelFontSizeTransition : [true, true],
			labelFontWeightTransition : [true, true],
			labelLetterSpacingTransition : [true, true],
			labelWordSpacingTransition : [true, true],
			labelTextShadowTransition : [true, true]
		}, options);

		function valueChecker(element, event) {
			if (event === "focus") {
				if (element.val().trim() === element.data("placeholder")) {
					addPopoutLabel(element);
				}
			} else if (event === "blur") {
				if (element.val().trim() === "" || element.val().trim() === element.data("placeholder")) {
					removePopoutLabel(element);
				} else {
					if (element.data("type") === "confirm-password") {
						validationChecker(element.val() === $(settings.targetForm).find("input[data-type='password']").val(), element);
					} else {
						var regex;
						switch (element.data("type")) {
							case "email":
								regex = (element.data("regex") !== undefined) ? new RegExp(element.data("regex")) : new RegExp("^[\\w!#$%&\\'*+\\/=?^`{|}~.-]+@(?:[a-z\\d][a-z\\d-]*(?:\\.[a-z\\d][a-z\\d-]*)?)+\\.(?:[a-z][a-z\\d-]+)$", "i");
								break;
							default:
								regex = (element.data("regex") !== undefined) ? new RegExp(element.data("regex")) : new RegExp(".{1,}");
								break;
						}
						validationChecker(regex.test(element.val()), element);

						if (element.data("type") === "password") {
							var confirm_password = $(settings.targetForm).find("input[data-type='confirm-password']");
							if (confirm_password.length) {
								if (confirm_password.prev(".popout-label").hasClass("popout-on")) {
									validationChecker(element.val() === confirm_password.val(), confirm_password);
								}
							}
						}
					}
				}
			}
		}

		function validationChecker(condition, element) {
			if (condition === true) {
				element.removeClass("not-validated");
				element.prev(".popout-label").find(".unvalidated").css("display", "none");
				element.prev(".popout-label").find(".validated").css("display", "inline-block");
			} else {
				element.addClass("not-validated");
				element.prev(".popout-label").find(".unvalidated").css("display", "inline-block");
				element.prev(".popout-label").find(".validated").css("display", "none");
			}
		}

		function addPopoutLabel(element) {
			var labelElement = element.prev(".popout-label"),
				height,
				easing,
				zIndex,
				labelColor,
				labelFontSize,
				labelFontWeight,
				labelLetterSpacing,
				labelWordSpacing,
				labelTextShadow;
				transitionProperty = ["transform"];

			if (element.data("type") === "textarea") {
				switch (settings.position) {
					case "top":
						height = -1 * (parseInt(element.css("line-height")) + parseInt(element.css("padding-top")) + parseInt(element.css("border-top-width")) + settings.textareaOffset);
						break;
					case "bottom":
						height = element.outerHeight(false) + settings.textareaOffset;
						break;
					default:
						height = -1 * (parseInt(element.css("line-height")) + parseInt(element.css("padding-top")) + parseInt(element.css("border-top-width")) + settings.textareaOffset);
						break;
				}
			} else {
				switch (settings.position) {
					case "top":
						height = -1 * (element.outerHeight(false) + settings.inputOffset);
						break;
					case "bottom":
						height = element.outerHeight(false) + settings.inputOffset;
						break;
					default:
						height = -1 * element.outerHeight(false) + settings.inputOffset;
						break;
				}
			}

			if (settings.easing === "bounce") easing = "cubic-bezier(.30, .40, .70, 1.80)";
			else easing = settings.easing;

			if (settings.animationEffect === "front") zIndex = 1;
			else if (settings.animationEffect === "behind") zIndex = 0;

			if (settings.labelColor === "default") labelColor = element.css("color");
			else labelColor = settings.labelColor;

			if (settings.labelFontSize === "default") labelFontSize = element.css("font-size");
			else labelFontSize = settings.labelFontSize;

			if (settings.labelFontWeight === "default") labelFontWeight = element.css("font-weight");
			else labelFontWeight = settings.labelFontWeight;

			if (settings.labelLetterSpacing === "default") labelLetterSpacing = element.css("letter-spacing");
			else labelLetterSpacing = settings.labelLetterSpacing;

			if (settings.labelWordSpacing === "default") labelWordSpacing = element.css("word-spacing");
			else labelWordSpacing = settings.labelWordSpacing;

			if (settings.labelTextShadow === "default") labelTextShadow = element.css("text-shadow");
			else labelTextShadow = settings.labelTextShadow;

			if (settings.labelColorTransition[0] === true) transitionProperty.push("color");
			if (settings.labelFontSizeTransition[0] === true) transitionProperty.push("font-size");
			if (settings.labelFontWeightTransition[0] === true) transitionProperty.push("font-weight");
			if (settings.labelLetterSpacingTransition[0] === true) transitionProperty.push("letter-spacing");
			if (settings.labelWordSpacingTransition[0] === true) transitionProperty.push("word-spacing");
			if (settings.labelTextShadowTransition[0] === true) transitionProperty.push("text-shadow");

			labelElement.addClass("popout-on").css({
				'transition-property' : transitionProperty.toString(),
				'transition-duration' : settings.animationDuration + 'ms',
				'transition-timing-function' : easing,
				'transform' : 'translateY(' + height + 'px)',
				'z-index' : zIndex,
				'color' : labelColor,
				'font-size' : labelFontSize,
				'font-weight' : labelFontWeight,
				'letter-spacing' : labelLetterSpacing,
				'word-spacing' : labelWordSpacing,
				'text-shadow' : labelTextShadow
			});

			if (element.data("type") === "password" || element.data("type") === "confirm-password") {
				element.attr("type", "password");
			}
			element.val("");

			if (element.data("type") === "textarea" && settings.animationEffect === "front") {
				setTimeout(function() {
					labelElement.css("z-index", 0);
				}, settings.animationDuration);
			}
		}

		function removePopoutLabel(element) {
			if (submitClicked === true) return false;

			var labelElement = element.prev(".popout-label"),
				easing,
				transitionProperty = ["transform"];

			if (settings.easing === "bounce") easing = "cubic-bezier(.30, -0.80, .80, .70)";
			else easing = settings.easing;

			if (settings.labelColorTransition[1] === true) transitionProperty.push("color");
			if (settings.labelFontSizeTransition[1] === true) transitionProperty.push("font-size");
			if (settings.labelFontWeightTransition[1] === true) transitionProperty.push("font-weight");
			if (settings.labelLetterSpacingTransition[1] === true) transitionProperty.push("letter-spacing");
			if (settings.labelWordSpacingTransition[1] === true) transitionProperty.push("word-spacing");
			if (settings.labelTextShadowTransition[1] === true) transitionProperty.push("text-shadow");

			element.addClass("not-validated");
			if (element.data("type") === "textarea" && settings.animationEffect === "front") labelElement.css("z-index", 1);
			labelElement.removeClass("popout-on").css({
				'transition-property' : transitionProperty.toString(),
				'transition-duration' : settings.animationDuration + 'ms',
				'transition-timing-function' : easing,
				'transform' : 'translateY(0)',
				'color' : element.css("color"),
				'font-size' : element.css("font-size"),
				'font-weight' : element.css("font-weight"),
				'letter-spacing' : element.css("letter-spacing"),
				'word-spacing' : element.css("word-spacing"),
				'text-shadow' : element.css("text-shadow")
			}).find(".unvalidated, .validated").css("display", "none");

			setTimeout(function() {
				labelElement.css("z-index", -1);
				if (element.data("type") === "password" || element.data("type") === "confirm-password") {
					element.attr("type", "text");
				}
				element.val(element.data("placeholder"));
			}, settings.animationDuration);
		}

		$(document).ready(function() {
			element.find(settings.targetContainer).css("position", "relative");
			element.find(settings.targetInput).addClass("not-validated").css({
				'position' : 'absolute',
				'top' : 0,
				'left' : 0,
				'width' : '100%',
				'height' : '100%',
				'z-index' : 0
			}).each(function() {
				var	el = $(this),
					id = el.attr("id"),
					placeholder = el.data("placeholder"),
					input_type = el.data("type"),
					label_element = $("<label class='popout-label'></label>"),
					validation_elements = [$(settings.unvalidated).addClass("unvalidated").css("display", "none"), $(settings.validated).addClass("validated").css("display", "none")];

				label_element.attr("for", id).text(placeholder).css({
					'position' : 'absolute',
					'top' : 0,
					'left' : 0,
					'width' : '100%',
					'height' : '100%',
					'padding' : el.css("padding-top") + " " + el.css("padding-right") + " " + el.css("padding-bottom") + " " + el.css("padding-left"),
					'border-width' : el.css("border-top-width") + " " + el.css("border-right-width") + " " + el.css("border-bottom-width") + " " + el.css("border-left-width"),
					'border-style' : el.css("border-top-style") + " " + el.css("border-right-style") + " " + el.css("border-bottom-style") + " " + el.css("border-left-style"),
					'border-color' : 'transparent',
					'border-radius' : el.css("border-top-left-radius") + " " + el.css("border-top-right-radius") + " " + el.css("border-bottom-right-radius") + " " + el.css("border-bottom-left-radius"),
					'margin' : 0,
					'background-color' : 'transparent',
					'color' : el.css("color"),
					'font' : el.css("font-style") + " " + el.css("font-variant") + " " + el.css("font-weight") + " " + el.css("font-size") + "/" + el.css("line-height") + " " + el.css("font-family"),
					'text-align' : el.css("text-align"),
					'letter-spacing' : el.css("letter-spacing"),
					'word-spacing' : el.css("word-spacing"),
					'text-shadow' : el.css("text-shadow"),
					'z-index' : -1,
					'cursor' : 'pointer',
				}).append(validation_elements).insertBefore(el);
				
				if (input_type === "password" || input_type === "confirm-password") {
					el.attr("type", "text");	
				}
				el.val(placeholder);

				el.on("focus blur", function(evt) {
					valueChecker(el, evt.type);
				});
			});

			if (settings.popoutOnLoad === true) {
				$(window).on("load", function() {
					element.find(settings.targetInput).each(function() {
						addPopoutLabel($(this));
					});
				});
			}

			$(".popout-label").click(function(evt) {
				if ($(this).next(".popout-input").val().trim().length < 1) {
					evt.preventDefault();
				}
			});

			$(settings.targetForm).find("input[type='submit']").mousedown(function() {
				submitClicked = true;
			}).mouseup(function() {
				submitClicked = false;
			});	

			$(settings.targetForm).submit(function(evt) {
				if ($(this).find(settings.targetInput).hasClass("not-validated")) {
					$(this).find(settings.targetInput).each(function() {
						if ($(this).hasClass("not-validated")) {
							addPopoutLabel($(this));
							$(this).prev(".popout-label").find(".unvalidated").css("display", "inline-block");
						}	
					});
					evt.preventDefault();
				} else {
					$(this).find("input[type='submit']").prop("disabled", true);
				}
			});
		});
	}
}(jQuery));