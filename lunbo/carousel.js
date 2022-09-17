!(function() {
    class Carousel {
        static defaultConfig = {
            width: null,
            height: null,
            animTime: 500,
            waitTime: 2500,
            animType: '',
            easing: 'linear',
            autoplay: false,
            current: 0,
            indicator: true,
            control: true,
            init: function(carousel) {},
            start: function(obj) {},
            progress: function(obj) {},
            end: function(obj) {},
        };
        constructor(config, that) {
            /** @type {JQuery<HTMLElement>} */
            this.that = that;
            this.config = config = $.extend({}, Carousel.defaultConfig, config);
            this.width = config.width || this.that.width();
            this.height = config.height || this.that.height();
            this.animTime = config.animTime;
            this.waitTime = config.waitTime;
            this.easing = config.easing;
            this.autoplay = config.autoplay;
            this.current = config.current;
            this.animType = config.animType;
            this.indicator = config.indicator;
            this.control = config.control;
            this.timer = null;
            this.animing = false;
            this.state = { carousel: this };
            this.init();
        }
        init() {
            this.createElement();
            this.$items.hide();
            this.$items.eq(this.current).show();
            this.resize();
            this.config.init(this);
            if (this.autoplay)
                this.play();
            $(window).on('resize', this.resize.bind(this));
            this.$indicators.on({
                    mouseenter: (e) => {
                        let index = $(e.target).index();
                        if (index == this.state.next) return;
                        this.stop(true);
                        if (index == this.current) return;
                        this._anim(this.current, index, index > this.current ? 1 : 0);
                    },
                    mouseleave: () => {
                        if (this.config.autoplay == 'always') {
                            this.resume();
                        }
                    },
                },
                'li'
            );
            this.$control.children('.carousel-control-left').click(() => {
                this._anim(this.current, this.current - 1, 0);
            });
            this.$control.children('.carousel-control-right').click(() => {
                this._anim();
            });
            this.that.hover(
                () => {
                    if (this.config.autoplay && this.config.autoplay != 'always') {
                        this.stop();
                    }
                },
                () => {
                    this.resume();
                }
            );
        }
        createElement() {
            let that = this.that;
            this.$items = that.children('.item');
            that.append($('<div class="carousel-items"></div>').append(this.$items));
            this.$indicators = $('<div class="carousel-indicators"></div>');
            this.$items.each(() => this.$indicators.append('<li></li>'));
            this.setIndicator(this.current);
            if (this.indicator) that.append(this.$indicators);
            this.$control = $(`	<div class="carousel-control">
									<span class="carousel-control-left"></span>
									<span class="carousel-control-right"></span>
								</div>`);
            if (this.control) that.append(this.$control);
        }
        setIndicator(index) {
            this.$indicators.children('.active').removeClass('active');
            this.$indicators.children().eq(index).addClass('active');
        }
        _anim(current = this.current, next = current + 1, direction = 1, animTime = this.animTime, animType = this.animType, easing = this.easing) {
            if (this.animing) return;
            this.animing = true;
            clearTimeout(this.timer);
            next = (next + this.$items.length) % this.$items.length;
            this.setIndicator(next);
            this.state.current = current;
            this.state.next = next;
            this.state.direction = direction;
            this.state.animTime = animTime;
            this.state.animType = animType;
            this.state.easing = easing;
            this.state.progress = 0;
            this.config.start(this.state);
            switch (animType) {
                case 'fade':
                    this.$items
                        .eq(current)
                        .show()
                        .css({ opacity: 1 })
                        .animate({ opacity: 0 }, animTime, easing)
                        .queue(function() {
                            $(this).hide().dequeue();
                        });
                    this.$items
                        .eq(next)
                        .show()
                        .css({ opacity: 0 })
                        .animate({ opacity: 1 }, {
                            duration: animTime,
                            easing: easing,
                            progress: (a, p) => {
                                this.state.progress = p;
                                this.config.progress(this.state);
                            },
                            complete: () => {
                                this.state.progress = 1;
                                this._animEnd();
                            },
                        });
                    break;
                case 'hSlice':
                    this.$items
                        .eq(current)
                        .show()
                        .css({ left: '0%' })
                        .animate({ left: direction ? '-100%' : '100%' }, animTime, easing);
                    this.$items
                        .eq(next)
                        .show()
                        .css({ left: direction ? '100%' : '-100%' })
                        .animate({ left: '0%' }, {
                            duration: animTime,
                            easing: easing,
                            progress: (a, p) => {
                                this.state.progress = p;
                                this.config.progress(this.state);
                            },
                            complete: () => {
                                this.state.progress = 1;
                                this._animEnd();
                            },
                        });
                    break;
                default:
                    this.$items.eq(current).animate({ display: 'none' }, { duration: animTime, complete: () => this.$items.eq(current).hide() });
                    this.$items.eq(next).animate({ display: 'block' }, {
                        duration: animTime,
                        progress: (a, p) => {
                            this.state.progress = p;
                            this.config.progress(this.state);
                        },
                        complete: () => {
                            this.$items.eq(next).show();
                            this.state.progress = 1;
                            this._animEnd();
                        },
                    });
            }
            if (this.height == 'auto')
                this.that.animate({ height: this.$items.eq(next).children().height() }, 400)
        }
        _animEnd() {
            this.config.end(this.state);
            this.animing = false;
            this.current = this.state.next;
            this.resize();
            if (this.autoplay) {
                this.play();
            }
        }
        play() {
            this.autoplay = true;
            this.timer = setTimeout(this._anim.bind(this), this.waitTime);
        }
        resume() {
            if (this.config.autoplay) {
                this.play();
            }
        }
        stop(jumpToEnd) {
            this.autoplay = false;
            clearTimeout(this.timer);
            if (jumpToEnd) this.$items.stop(true, true);
        }
        resize() {
            if (this.width == 'auto') {
                this.that.width(this.$items.eq(this.current).children().width());
            } else {
                this.that.width(this.width);
            }
            if (this.height == 'auto') {
                this.that.height(this.$items.eq(this.current).children().height());
            } else {
                this.that.height(this.height);
            }
        }
    }
    $.fn.extend({
        carousel: function(config) {
            return new Carousel(config, this);
        },
    });
})();