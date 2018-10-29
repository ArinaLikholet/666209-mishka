var mainNav = document.querySelector(".main-nav");
var mainNavToggle = document.querySelector(".main-nav__toggle");

mainNav.classList.remove("main-nav--nojs");

mainNavToggle.addEventListener("click", function() {
  if (mainNav.classList.contains("main-nav--closed")) {
    mainNav.classList.remove("main-nav--closed");
    mainNav.classList.add("main-nav--opened");
  } else {
    mainNav.classList.add("main-nav--closed");
    mainNav.classList.remove("main-nav--opened");
  }
});

var modal = document.querySelector(".modal");
var overlay = document.querySelector(".overlay");
var btnProductWeek = document.querySelector(".product-week__btn");
var btnCatalogItems = document.querySelectorAll(".catalog-item__btn");

if (btnProductWeek != null) {
  btnProductWeek.addEventListener("click", function(event) {
    event.preventDefault();
    modal.classList.add("modal--show");
    overlay.classList.add("overlay--show");
  });
}

if (btnCatalogItems.length != 0) {
  for (var i = 0; i < btnCatalogItems.length; i++) {
    btnCatalogItems[i].addEventListener("click", function(event) {
      event.preventDefault();
      modal.classList.add("modal--show");
      overlay.classList.add("overlay--show");
    });
  }
}

if (overlay != null) {
  overlay.addEventListener("click", function () {
    if (overlay.classList.contains("overlay--show")) {
      modal.classList.remove("modal--show");
      overlay.classList.remove("overlay--show");
    }
  });
}

window.addEventListener("keydown", function(event) {
  if (event.keyCode === 27 && modal.classList.contains("modal--show")) {
    modal.classList.remove("modal--show");
    overlay.classList.remove("overlay--show");
  }
});
