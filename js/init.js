
	var html_settings = {
			skelJS: {
				prefix: 'css/style',
				resetCSS: true,
				boxModel: 'border',
				useOrientation: true,
				breakpoints: {
					'widest':	{ range: '1881-', hasStyleSheet: false, containers: 1400, grid: { gutters: 70 } },
					'wide':	{ range: '961-1880', containers: 1200, grid: { gutters: 40 } },
					'normal':	{ range: '961-1620', containers: 960, grid: { gutters: 40 } },
					'narrow':	{ range: '961-1320', containers: 'fluid', grid: { gutters: 30 } },
					'narrower':	{ range: '-960', containers: 'fluid', grid: { gutters: 30 } },
					'mobile':	{ range: '-640', containers: 'fluid', lockViewport: true, grid: { gutters: 30, collapse: true } }
				}
			},
			skelJSPlugins: {
				panels: {
					panels: {
						sidePanel: {
							breakpoints: 'narrower',
							position: 'left',
							size: 240,
							html: '<div data-action="moveElement" data-args="header"></div></div>'
						}
					},
					overlays: {
						sidePanelToggle: {
							breakpoints: 'narrower',
							position: 'top-left',
							width: '3.5em',
							height: '2.25em',
							html: '<div data-action="togglePanel" data-args="sidePanel" class="toggle"></div>'
						}
					}
				}
			}

	};

	skel.init(html_settings.skelJS, html_settings.skelJSPlugins);

	jQuery.fn.n33_formerize=function(){var _fakes=new Array(),_form = jQuery(this);_form.find('input[type=text],textarea').each(function() { var e = jQuery(this); if (e.val() == '' || e.val() == e.attr('placeholder')) { e.addClass('formerize-placeholder'); e.val(e.attr('placeholder')); } }).blur(function() { var e = jQuery(this); if (e.attr('name').match(/_fakeformerizefield$/)) return; if (e.val() == '') { e.addClass('formerize-placeholder'); e.val(e.attr('placeholder')); } }).focus(function() { var e = jQuery(this); if (e.attr('name').match(/_fakeformerizefield$/)) return; if (e.val() == e.attr('placeholder')) { e.removeClass('formerize-placeholder'); e.val(''); } }); _form.find('input[type=password]').each(function() { var e = jQuery(this); var x = jQuery(jQuery('<div>').append(e.clone()).remove().html().replace(/type="password"/i, 'type="text"').replace(/type=password/i, 'type=text')); if (e.attr('id') != '') x.attr('id', e.attr('id') + '_fakeformerizefield'); if (e.attr('name') != '') x.attr('name', e.attr('name') + '_fakeformerizefield'); x.addClass('formerize-placeholder').val(x.attr('placeholder')).insertAfter(e); if (e.val() == '') e.hide(); else x.hide(); e.blur(function(event) { event.preventDefault(); var e = jQuery(this); var x = e.parent().find('input[name=' + e.attr('name') + '_fakeformerizefield]'); if (e.val() == '') { e.hide(); x.show(); } }); x.focus(function(event) { event.preventDefault(); var x = jQuery(this); var e = x.parent().find('input[name=' + x.attr('name').replace('_fakeformerizefield', '') + ']'); x.hide(); e.show().focus(); }); x.keypress(function(event) { event.preventDefault(); x.val(''); }); });  _form.submit(function() { jQuery(this).find('input[type=text],input[type=password],textarea').each(function(event) { var e = jQuery(this); if (e.attr('name').match(/_fakeformerizefield$/)) e.attr('name', ''); if (e.val() == e.attr('placeholder')) { e.removeClass('formerize-placeholder'); e.val(''); } }); }).bind("reset", function(event) { event.preventDefault(); jQuery(this).find('select').val(jQuery('option:first').val()); jQuery(this).find('input,textarea').each(function() { var e = jQuery(this); var x; e.removeClass('formerize-placeholder'); switch (this.type) { case 'submit': case 'reset': break; case 'password': e.val(e.attr('defaultValue')); x = e.parent().find('input[name=' + e.attr('name') + '_fakeformerizefield]'); if (e.val() == '') { e.hide(); x.show(); } else { e.show(); x.hide(); } break; case 'checkbox': case 'radio': e.attr('checked', e.attr('defaultValue')); break; case 'text': case 'textarea': e.val(e.attr('defaultValue')); if (e.val() == '') { e.addClass('formerize-placeholder'); e.val(e.attr('placeholder')); } break; default: e.val(e.attr('defaultValue')); break; } }); window.setTimeout(function() { for (x in _fakes) _fakes[x].trigger('formerize_sync'); }, 10); }); return _form; };
	
		jQuery.fn.n33_scrolly = function() {			
			var bh = jQuery('body,html'), t = jQuery(this);

			t.click(function(e) {
				var h = jQuery(this).attr('href'), target;

				if (h.charAt(0) == '#' && h.length > 1 && (target = jQuery(h)).length > 0)
				{
					var pos = Math.max(target.offset().top, 0);
					e.preventDefault();
					bh
						.stop(true, true)
						.animate({ scrollTop: pos }, 'slow', 'swing');
				}
			});
			
			return t;
		};
		jQuery.n33_scrollzer = function(ids, userSettings) {

			var top = jQuery(window), doc = jQuery(document);
			
			top.load(function() {
					var settings = jQuery.extend({
						activeClassName:	'active',
						suffix:				'-link',
						pad:				50,
						firstHack:			false,
						lastHack:			false
					}, userSettings);
					var k, x, o, l, pos;
					var lastId, elements = [], links = jQuery();
					for (k in ids)
					{
						o = jQuery('#' + ids[k]);
						l = jQuery('#' + ids[k] + settings.suffix);
					
						if (o.length < 1
						||	l.length < 1)
							continue;
						
						x = {};
						x.link = l;
						x.object = o;
						elements[ids[k]] = x;
						links = links.add(l);
					}
					var resizeTimerId, resizeFunc = function() {
						var x;
						
						for (k in elements)
						{
							x = elements[k];
							x.start = Math.ceil(x.object.offset().top) - settings.pad;
							x.end = x.start + Math.ceil(x.object.innerHeight());
						}
						
						top.trigger('scroll');
					};
					
					top.resize(function() {
						window.clearTimeout(resizeTimerId);
						resizeTimerId = window.setTimeout(resizeFunc, 250);
					});
					var scrollTimerId, scrollFunc = function() {
						links.removeClass('scrollzer-locked');
					};
				
					top.scroll(function(e) {
						var i = 0, h, found = false;
						pos = top.scrollTop();

						window.clearTimeout(scrollTimerId);
						scrollTimerId = window.setTimeout(scrollFunc, 250);
							for (k in elements)
							{
								if (k != lastId
								&&	pos >= elements[k].start
								&&	pos <= elements[k].end)
								{
									lastId = k;
									found = true;
								}
								
								i++;
							}
							if (settings.lastHack
							&&	pos + top.height() >= doc.height())
							{
								lastId = k;
								found = true;
							}
							if (found
							&&	!links.hasClass('scrollzer-locked'))
							{
								links.removeClass(settings.activeClassName);
								elements[lastId].link.addClass(settings.activeClassName);
							}
					});
					top.trigger('resize');

			});

		};
	jQuery(function() {

		var $window = $(window),
			_IEVersion = (navigator.userAgent.match(/MSIE ([0-9]+)\./) ? parseInt(RegExp.$1) : 99);
				if (_IEVersion < 10)
					$('form').n33_formerize();
				jQuery('form .button.submit').click(function(e) {
					e.preventDefault();
					jQuery(this).closest('form').submit();
				});
				$window.load(function() {
			
					skel.onStateChange(function() {
					
						var fi = jQuery('.image.featured');
							if (skel.isActive('mobile'))
								fi.each(function() { var img = jQuery(this).children('img'); img.css('left', '50%').css('margin-left', -1 * (img.width() / 2)); });
							else
								fi.each(function() { jQuery(this).children('img').css('left', 0).css('margin-left', 0); });
					
					});

				});
			jQuery('.scrolly').n33_scrolly();
			var $nav_a = jQuery('#nav a');
				$nav_a
					.n33_scrolly()
					.click(function(e) {
						
						e.preventDefault();
							$nav_a
								.removeClass('active')
								.addClass('scrollzer-locked');
							jQuery(this).addClass('active');
					});
				var ids = [];
				
				$nav_a.each(function() {
					ids.push(jQuery(this).attr('href').substring(1));
				});
				
				jQuery.n33_scrollzer(ids, { pad: 200, lastHack: true });

	});