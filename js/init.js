
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