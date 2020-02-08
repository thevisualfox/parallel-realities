class Toggler {
    constructor(el) {
        this.DOM = { el: el };
        this.DOM.observeable = this.DOM.el.dataset.togglerObserve;
        this.DOM.target = document.querySelector(this.DOM.observeable);
        this.scope = document.querySelector(this.DOM.el.dataset.togglerScope) || document;
        this.event = this.DOM.el.dataset.event || "click";
        this.togglerClass = this.DOM.el.dataset.togglerClass || "is-open";
        this.observerClass = this.DOM.el.dataset.observerClass || "is-active";
        this.closeOnOutside = this.DOM.el.dataset.closeOnOutside || false;

        this.initEvents();
    }
    initEvents() {
        this.scope.addEventListener(this.event, () => this.toggle(event), false);
    }
    toggle(event) {
        if (!event.target) return;

        if (event.target.matches(this.DOM.observeable)) {
            this.DOM.el.classList.toggle(this.togglerClass);
            this.DOM.target.classList.toggle(this.observerClass);
        }

        if (this.closeOnOutside && event.target !== this.DOM.el && event.target !== this.DOM.target) {
            this.DOM.el.classList.remove(this.togglerClass);
            this.DOM.target.classList.remove(this.observerClass);
        }
    }
}

document.querySelectorAll("[data-toggler]").forEach(toggler => {
    new Toggler(toggler);
});
