import { Controller } from "@hotwired/stimulus";
import $ from "jquery";

export default class extends Controller {
    static targets = ["header", "menuToggle", "menuContainer", "navBar","subMenu","toggleIcon","toggleMenu"];

    static values = {
        mainMenuOpen: { type: Boolean, default: false }
    };

    connect() {
        this.navItems = document.querySelectorAll(".nav-item.has-submenu");

        this.navItems.forEach(item => {
            item.addEventListener("mouseenter", this.expandHeader.bind(this));
            item.addEventListener("mouseleave", this.resetHeader.bind(this));
        });
    }
    expandHeader() {
        if (this.hasHeaderTarget) {
            this.headerTarget.classList.add('header-hover');
        }
    }
    resetHeader() {
        if (this.hasHeaderTarget) {
            this.headerTarget.classLi1drst.remove('header-hover');
        }
    }

    button() {
        this.mainMenuOpenValue = !this.mainMenuOpenValue;
        this.menuToggleTarget.classList.toggle('close-icon');
    }

    mainMenuOpenValueChanged() {
        this.mainMenuOpenValue
            ? $(this.element).addClass("menu-open")
            : $(this.element).removeClass("menu-open");
    }
    headline(event) {
        event.preventDefault();
        event.stopPropagation();

        this.subMenuTarget.classList.toggle('open-submenu');
        const parentItem = event.currentTarget.closest(".has-submenu");

        parentItem.classList.toggle("chevron-rotate");
    }
}