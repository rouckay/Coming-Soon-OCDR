(function ($) {

	$(window).on('load', function () {
		$('.fade-in').css({ position: 'relative', opacity: 0, top: -14 });
		setTimeout(function () {
			$('#preload-content').fadeOut(400, function () {
				$('#preload').fadeOut(800);
				setTimeout(function () {
					$('.fade-in').each(function (index) {
						$(this).delay(400 * index).animate({ top: 0, opacity: 1 }, 800);
					});
				}, 800);
			});
		}, 400);
	});

	$(document).ready(function () {

		// Create a countdown instance. Change the launchDay according to your needs.
		// The month ranges from 0 to 11. I specify the month from 1 to 12 and manually subtract the 1.
		// Thus the launchDay below denotes 7 October, 2017.
		var launchDay = new Date(2024, 7 - 1, 6);
		$('#timer').countdown({
			until: launchDay
		});



		// Invoke the Placeholder plugin
		$('input, textarea').placeholder();

		// Validate subscribe form
		$('<div class="loading"><span class="bounce1"></span><span class="bounce2"></span><span class="bounce3"></span></div>').hide().appendTo('.form-wrap');
		$('<div class="success"></div>').hide().appendTo('.form-wrap');
		$('#subscribe-form').validate({
			rules: {
				subscribe_email: { required: true, email: true }
			},
			messages: {
				subscribe_email: {
					required: 'Email address is required',
					email: 'Email address is not valid'
				}
			},
			errorElement: 'span',
			errorPlacement: function (error, element) {
				error.appendTo(element.parent());
			},
			submitHandler: function (form) {
				$(form).hide();
				$('#subscribe .loading').css({ opacity: 0 }).show().animate({ opacity: 1 });
				$.post($(form).attr('action'), $(form).serialize(), function (data) {
					$('#subscribe .loading').animate({ opacity: 0 }, function () {
						$(this).hide();
						$('#subscribe .success').show().html('<p>Thank you for subscribing!</p>').animate({ opacity: 1 });
					});
				});
				return false;
			}
		});

		// Open modal window on click
		$('#modal-open').on('click', function (e) {
			var mainInner = $('#main .inner'),
				modal = $('#modal');

			mainInner.animate({ opacity: 0 }, 400, function () {
				$('html,body').scrollTop(0);
				modal.addClass('modal-active').fadeIn(400);
			});
			e.preventDefault();

			$('#modal-close').on('click', function (e) {
				modal.removeClass('modal-active').fadeOut(400, function () {
					mainInner.animate({ opacity: 1 }, 400);
				});
				e.preventDefault();
			});
		});

	});

})(jQuery);