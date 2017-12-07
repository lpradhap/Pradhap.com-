'use strict';

d.about = function () {
    var ui = {};

    ui.init = function () {
        $('body').removeClass('view-home view-talk view-stack view-showcase').addClass('view-about').attr('data-screen', 'about');
        ui.deviceInit();
        d.home.location.init();
    };

    ui.deviceInit = function () {
        //initliaze depends on previous page
        var _prevView = $('body').attr('data-prev-page');

        switch (_prevView) {
            case 'home':
                d.sys.layoutType(function () {
                    ui.proPic.init();
                    d.stack.setBg();
                }, 'all');
                d.sys.layoutType(function () {
                    ui.menu.d_init();
                    ui.contactInfo.d();
                    ui.social.d();
                    ui.infoTab.d_init();
                }, 'desktop');
                d.sys.layoutType(function () {}, 'tablet');
                d.sys.layoutType(function () {}, 'mobile');
                break;
            default:
                d.sys.layoutType(function () {
                    ui.proPic.init();
                    d.stack.setBg();
                }, 'all');
                d.sys.layoutType(function () {
                    ui.menu.d_init();
                    ui.contactInfo.d();
                    ui.social.d();
                    ui.infoTab.d_init();
                }, 'desktop');
                d.sys.layoutType(function () {}, 'tablet');
                d.sys.layoutType(function () {}, 'mobile');
        }
    };

    ui.proPic = {
        _panel: 'pro-panel',
        init: function init() {
            $(d.ref._siteHolder).append('<div class="' + ui.proPic._panel + '"></div>');
            $(d.sys.cssSelector(ui.proPic._panel)).delay(600).animate({
                left: 0
            });
        }
    };

    ui.menu = {
        d_init: function d_init() {
            ui.menu.create();

            $(d.sys.cssSelector(d.ref._menuPanel)).delay(400).animate({
                top: 50
            }, 300);
        },
        create: function create() {
            if (!$(d.sys.cssSelector(d.ref._menuPanel)).length) {
                $(d.ref._siteHolder).append(d.cms.menu);
            }
        }
    };

    ui.social = {
        _smPanel: 'social-panel',
        d: function (_d) {
            function d() {
                return _d.apply(this, arguments);
            }

            d.toString = function () {
                return _d.toString();
            };

            return d;
        }(function () {

            $(d.ref._siteHolder).append('<div class="' + ui.social._smPanel + '">' + d.cms.social_media_links + '</div>');

            $(d.sys.cssSelector(ui.social._smPanel)).children().each(function (i, el) {
                $(el).delay(d.sys.randomNo(2000)).animate({
                    opacity: 1
                });
            }, 300);
        })

    };

    ui.contactInfo = {
        _wrapper: 'about-info-wrapper',
        _cPanel: 'about-contact-panel',
        _namePanel: 'about-name-panel',
        d: function (_d2) {
            function d() {
                return _d2.apply(this, arguments);
            }

            d.toString = function () {
                return _d2.toString();
            };

            return d;
        }(function () {

            $(d.ref._siteHolder).append('<div class="' + ui.contactInfo._wrapper + '"><div class="' + ui.contactInfo._namePanel + '">' + d.cms.about_desc + '</div><div class="' + ui.contactInfo._cPanel + '">' + d.cms.contactPanel + '</div></div>');

            $(d.sys.cssSelector(ui.contactInfo._cPanel)).animate({
                left: '0'
            }, 200);
            $(d.sys.cssSelector(ui.contactInfo._namePanel)).animate({
                opacity: '1'
            }, 400);
        })
    };

    ui.infoTab = {
        _wrapper: 'info-tab',
        _qualification_panel: 'qual-panel',
        _experience_panel: 'exp-panel',
        _brands_panel: 'brands-panel',
        _hightlights_panel: 'hightlights-panel',
        d_init: function d_init() {
            ui.infoTab.create_wrapper();
            ui.infoTab.createTabs();
            ui.infoTab.bindNav();
        },
        createTabs: function createTabs() {
            $(d.sys.cssSelector(ui.infoTab._wrapper)).append('<div class="nav"><span class="active" data-panel="' + ui.infoTab._hightlights_panel + '">Highlights</span><span data-panel="' + ui.infoTab._experience_panel + '">Experience</span><span data-panel="' + ui.infoTab._qualification_panel + '">Qualification</span></div><div class="tab-content"><div class="' + ui.infoTab._experience_panel + '">' + d.cms.experience + '</div><div class="' + ui.infoTab._qualification_panel + '">' + d.cms.qualification + '</div><div class="' + ui.infoTab._hightlights_panel + ' active ">' + d.cms.hightlights + '</div></div>');
        },
        create_wrapper: function create_wrapper() {
            $(d.ref._siteHolder).append('<div class="' + ui.infoTab._wrapper + '"></div>');
            $(d.sys.cssSelector(ui.infoTab._wrapper)).animate({
                opacity: 1
            }, 400);
        },
        bindNav: function bindNav() {
            $(document).on('click touchstart', '.info-tab .nav span', function (el) {
                var activeEl = $(el.target).attr('data-panel');

                $('.info-tab .nav span').removeClass('active');
                $(el.target).addClass('active');

                $('.tab-content > div').removeClass('active');
                $('.tab-content').find(d.sys.cssSelector(activeEl)).addClass('active');
            });
        }
    };

    ui.closer = function () {
        var dfd = $.Deferred();
        var counter;

        d.sys.layoutType(function () {
            $(d.sys.cssSelector(ui.proPic._panel)).animate({
                left: '-100%'
            }, 400);

            $(d.sys.cssSelector(ui.infoTab._wrapper)).animate({
                opacity: 0
            }, 400);

            $(d.sys.cssSelector(ui.contactInfo._wrapper)).animate({
                opacity: 0
            }, 400);

            $(d.sys.cssSelector(ui.social._smPanel)).animate({
                bottom: '-100%'
            }, 400);

            $(d.sys.cssSelector(d.ref._menuPanel)).animate({
                top: '-100%'
            }, 400);

            $('#large-header').animate({
                right: '-100%'
            }, 400);
        }, 'all');

        d.sys.layoutType(function () {}, 'desktop');

        d.sys.layoutType(function () {}, 'tablet');
        d.sys.layoutType(function () {}, 'mobile');
        setTimeout(function () {
            $(d.sys.cssSelector(d.home.location._trigger)).remove();
            $(d.ref._siteHolder).empty();
            dfd.resolve();
        }, 1000);

        return dfd.promise();
    };
    return ui;
}();