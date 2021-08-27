/*
	Forty by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function ($) {

	var $window = $(window),
		$body = $('body'),
		$wrapper = $('#wrapper'),
		$header = $('#header'),
		$banner = $('#banner');

	// Breakpoints.
	breakpoints({
		xlarge: ['1281px', '1680px'],
		large: ['981px', '1280px'],
		medium: ['737px', '980px'],
		small: ['481px', '736px'],
		xsmall: ['361px', '480px'],
		xxsmall: [null, '360px']
	});

	/**
	 * Applies parallax scrolling to an element's background image.
	 * @return {jQuery} jQuery object.
	 */
	$.fn._parallax = (browser.name == 'ie' || browser.name == 'edge' || browser.mobile) ? function () {
		return $(this)
	} : function (intensity) {

		var $window = $(window),
			$this = $(this);

		if (this.length == 0 || intensity === 0)
			return $this;

		if (this.length > 1) {

			for (var i = 0; i < this.length; i++)
				$(this[i])._parallax(intensity);

			return $this;

		}

		if (!intensity)
			intensity = 0.25;

		$this.each(function () {

			var $t = $(this),
				on, off;

			on = function () {

				$t.css('background-position', 'center 100%, center 100%, center 0px');

				$window
					.on('scroll._parallax', function () {

						var pos = parseInt($window.scrollTop()) - parseInt($t.position().top);

						$t.css('background-position', 'center ' + (pos * (-1 * intensity)) + 'px');

					});

			};

			off = function () {

				$t
					.css('background-position', '');

				$window
					.off('scroll._parallax');

			};

			breakpoints.on('<=medium', off);
			breakpoints.on('>medium', on);

		});

		$window
			.off('load._parallax resize._parallax')
			.on('load._parallax resize._parallax', function () {
				$window.trigger('scroll');
			});

		return $(this);

	};

	// Play initial animations on page load.
	$window.on('load', function () {
		window.setTimeout(function () {
			$body.removeClass('is-preload');
		}, 100);
	});

	// Clear transitioning state on unload/hide.
	$window.on('unload pagehide', function () {
		window.setTimeout(function () {
			$('.is-transitioning').removeClass('is-transitioning');
		}, 250);
	});

	// Fix: Enable IE-only tweaks.
	if (browser.name == 'ie' || browser.name == 'edge')
		$body.addClass('is-ie');

	// Scrolly.
	$('.scrolly').scrolly({
		offset: function () {
			return $header.height() - 2;
		}
	});

	// Tiles.
	var $tiles = $('.tiles > article');

	$tiles.each(function () {

		var $this = $(this),
			$image = $this.find('.image'),
			$img = $image.find('img'),
			$link = $this.find('.link'),
			x;

		// Image.

		// Set image.
		$this.css('background-image', 'url(' + $img.attr('src') + ')');

		// Set position.
		if (x = $img.data('position'))
			$image.css('background-position', x);

		// Hide original.
		$image.hide();

		// Link.
		if ($link.length > 0) {

			$x = $link.clone()
				.text('')
				.addClass('primary')
				.appendTo($this);

			$link = $link.add($x);

			$link.on('click', function (event) {

				var href = $link.attr('href');

				// Prevent default.
				event.stopPropagation();
				event.preventDefault();

				// Target blank?
				if ($link.attr('target') == '_blank') {

					// Open in new tab.
					window.open(href);

				}

				// Otherwise ...
				else {

					// Start transitioning.
					$this.addClass('is-transitioning');
					$wrapper.addClass('is-transitioning');

					// Redirect.
					window.setTimeout(function () {
						location.href = href;
					}, 500);

				}

			});

		}

	});

	// Header.
	if ($banner.length > 0 &&
		$header.hasClass('alt')) {

		$window.on('resize', function () {
			$window.trigger('scroll');
		});

		$window.on('load', function () {

			$banner.scrollex({
				bottom: $header.height() + 10,
				terminate: function () {
					$header.removeClass('alt');
				},
				enter: function () {
					$header.addClass('alt');
				},
				leave: function () {
					$header.removeClass('alt');
					$header.addClass('reveal');
				}
			});

			window.setTimeout(function () {
				$window.triggerHandler('scroll');
			}, 100);

		});

	}

	// Banner.
	$banner.each(function () {

		var $this = $(this),
			$image = $this.find('.image'),
			$img = $image.find('img');

		// Parallax.
		$this._parallax(0.275);

		// Image.
		if ($image.length > 0) {

			// Set image.
			$this.css('background-image', 'url(' + $img.attr('src') + ')');

			// Hide original.
			$image.hide();

		}

	});

	// Menu.
	var $menu = $('#menu'),
		$menuInner;

	$menu.wrapInner('<div class="inner"></div>');
	$menuInner = $menu.children('.inner');
	$menu._locked = false;

	$menu._lock = function () {

		if ($menu._locked)
			return false;

		$menu._locked = true;

		window.setTimeout(function () {
			$menu._locked = false;
		}, 350);

		return true;

	};

	$menu._show = function () {

		if ($menu._lock())
			$body.addClass('is-menu-visible');

	};

	$menu._hide = function () {

		if ($menu._lock())
			$body.removeClass('is-menu-visible');

	};

	$menu._toggle = function () {

		if ($menu._lock())
			$body.toggleClass('is-menu-visible');

	};

	$menuInner
		.on('click', function (event) {
			event.stopPropagation();
		})
		.on('click', 'a', function (event) {

			var href = $(this).attr('href');

			event.preventDefault();
			event.stopPropagation();

			// Hide.
			$menu._hide();

			// Redirect.
			window.setTimeout(function () {
				window.location.href = href;
			}, 250);

		});

	$menu
		.appendTo($body)
		.on('click', function (event) {

			event.stopPropagation();
			event.preventDefault();

			$body.removeClass('is-menu-visible');

		})
		.append('<a class="close" href="#menu">Close</a>');

	$body
		.on('click', 'a[href="#menu"]', function (event) {

			event.stopPropagation();
			event.preventDefault();

			// Toggle.
			$menu._toggle();

		})
		.on('click', function (event) {

			// Hide.
			$menu._hide();

		})
		.on('keydown', function (event) {

			// Hide on escape.
			if (event.keyCode == 27)
				$menu._hide();

		});

})(jQuery);

/**
 * Sorts a HTML table.
 * 
 * @param {HTMLTableElement} table Tabla para ordenar
 * @param {number} column índice de la columna
 * @param {boolean} asc determina si el orden en ascendente o descendiente
 */
function sortTableByColumn(table, column, asc = true) {
	const dirModifier = asc ? 1 : -1;
	const tBody = table.tBodies[0];
	const rows = Array.from(tBody.querySelectorAll("tr"));

	// Sort each row
	const sortedRows = rows.sort((a, b) => {
		const aColText = a.querySelector(`td:nth-child(${column + 1})`).textContent.trim();
		const bColText = b.querySelector(`td:nth-child(${column + 1})`).textContent.trim();

		return aColText > bColText ? (1 * dirModifier) : (-1 * dirModifier);
	});

	// Remove all existing TRs from the table
	while (tBody.firstChild) {
		tBody.removeChild(tBody.firstChild);
	}

	// Re-add the newly sorted rows
	tBody.append(...sortedRows);

	// Remember how the column is currently sorted
	table.querySelectorAll("th").forEach(th => th.classList.remove("th-sort-asc", "th-sort-desc"));
	table.querySelector(`th:nth-child(${column + 1})`).classList.toggle("th-sort-asc", asc);
	table.querySelector(`th:nth-child(${column + 1})`).classList.toggle("th-sort-desc", !asc);
}

(function () {
	let YouTubeContainers = document.querySelectorAll(".embed-youtube");

	// Iterate over every YouTube container you may have
	for (let i = 0; i < YouTubeContainers.length; i++) {
		let container = YouTubeContainers[i];
		let imageSource = "https://img.youtube.com/vi/" + container.dataset.videoId + "/sddefault.jpg";

		// Load the Thumbnail Image asynchronously
		let image = new Image();
		image.src = imageSource;
		image.addEventListener("load", function () {
			container.appendChild(image);
		});

		// When the user clicks on the container, load the embedded YouTube video
		container.addEventListener("click", function () {
			let iframe = document.createElement("iframe");

			iframe.setAttribute("frameborder", "0");
			iframe.setAttribute("allowfullscreen", "");
			iframe.setAttribute("allow", "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture");
			// Important: add the autoplay GET parameter, otherwise the user would need to click over the YouTube video again to play it 
			iframe.setAttribute("src", "https://www.youtube.com/embed/" + this.dataset.videoId + "?rel=0&showinfo=0&autoplay=1");

			// Clear Thumbnail and load the YouTube iframe
			this.innerHTML = "";
			this.appendChild(iframe);
		});
	}
})();

document.querySelectorAll(".table-sortable th").forEach(headerCell => {
	headerCell.addEventListener("click", () => {
		const tableElement = headerCell.parentElement.parentElement.parentElement;
		const headerIndex = Array.prototype.indexOf.call(headerCell.parentElement.children, headerCell);
		const currentIsAscending = headerCell.classList.contains("th-sort-asc");

		sortTableByColumn(tableElement, headerIndex, !currentIsAscending);
	});
});