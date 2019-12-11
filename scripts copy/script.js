// This is a general function that could take functionality from many places.
// All it does is toggle a class on or off, like so:
// 01: Does "this" target HTML element have "that" class?
// 02: If it does, remove that class.
// 03: If it doesn't, add that class.
// 04: End function.
function toggleClass(targetElement, addedClass) {
  if (targetElement.classList.contains(addedClass)) {
    targetElement.classList.remove(addedClass);
  }
  else {
    targetElement.classList.add(addedClass);
  }
};



 $('.activate').on('click touch', function(e) {
     var self = $(this);
     if(!self.hasClass('loading')) {
         self.addClass('loading');
         setTimeout(function() {
             self.addClass('done');
             setTimeout(function() {
                 self.removeClass('loading done');
             }, 1600);
         }, 3200);
     }
 });
(function($) { // Begin jQuery
  $(function() { // DOM ready
    // If a link has a dropdown, add sub menu toggle.
    $('nav ul li a:not(:only-child)').click(function(e) {
      $(this).siblings('.nav-dropdown').toggle();
      // Close one dropdown when selecting another
      $('.nav-dropdown').not($(this).siblings()).hide();
      e.stopPropagation();
    });
    // Clicking away from dropdown will remove the dropdown class
    $('html').click(function() {
      $('.nav-dropdown').hide();
    });
    // Toggle open and close nav styles on click
    $('#nav-toggle').click(function() {
      $('nav ul').slideToggle();
    });
    // Hamburger to X toggle
    $('#nav-toggle').on('click', function() {
      this.classList.toggle('active');
    });
  }); // end DOM ready
})(jQuery); // end jQuery

