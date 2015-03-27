function duration(number) {
  return number * 0.7;
}

var breakpoints = {};

breakpoints.hydration_start = duration(0);
breakpoints.hydration_end = breakpoints.hydration_start + duration(500);
breakpoints.aloe_start = breakpoints.hydration_end + duration(500);
breakpoints.aloe_end = breakpoints.aloe_start + duration(500);
breakpoints.aloe_text_end = breakpoints.aloe_end + duration(2000);
breakpoints.skeleton_start = breakpoints.aloe_text_end;
breakpoints.skeleton_end = breakpoints.skeleton_start + duration(500);

// skeleton section
var skeletonHold = 1500;
breakpoints.skeleton_animation_1_start = breakpoints.skeleton_end + duration(500);
breakpoints.skeleton_animation_1_end = breakpoints.skeleton_animation_1_start + duration(500);
breakpoints.skeleton_animation_2_start = breakpoints.skeleton_animation_1_end + duration(skeletonHold);
breakpoints.skeleton_animation_2_end = breakpoints.skeleton_animation_2_start + duration(500);
breakpoints.skeleton_animation_3_start = breakpoints.skeleton_animation_2_end + duration(skeletonHold);
breakpoints.skeleton_animation_3_end = breakpoints.skeleton_animation_3_start + duration(500);
breakpoints.skeleton_animation_4_start = breakpoints.skeleton_animation_3_end + duration(skeletonHold);
breakpoints.skeleton_animation_4_end = breakpoints.skeleton_animation_4_start + duration(500);
breakpoints.skeleton_animation_5_start = breakpoints.skeleton_animation_4_end + duration(skeletonHold);
breakpoints.skeleton_animation_5_end = breakpoints.skeleton_animation_5_start + duration(500);
breakpoints.skeleton_animation_6_start = breakpoints.skeleton_animation_5_end + duration(skeletonHold);
breakpoints.skeleton_animation_6_end = breakpoints.skeleton_animation_6_start + duration(500);
breakpoints.skeleton_animation_7_start = breakpoints.skeleton_animation_6_end + duration(skeletonHold);
breakpoints.skeleton_animation_7_end = breakpoints.skeleton_animation_7_start + duration(500);
breakpoints.skeleton_animation_8_start = breakpoints.skeleton_animation_7_end + duration(skeletonHold);
breakpoints.skeleton_animation_8_end = breakpoints.skeleton_animation_8_start + duration(500);
breakpoints.skeleton_animation_end = breakpoints.skeleton_animation_8_end;

//breakpoints.story_start = breakpoints.skeleton_animation_end + duration(500);
breakpoints.story_start = breakpoints.skeleton_end + duration(10);
breakpoints.story_end = breakpoints.story_start + duration(500);
breakpoints.story_text_end = breakpoints.story_end + duration(2000);
breakpoints.promise_start = breakpoints.story_text_end;
breakpoints.promise_end = breakpoints.promise_start  + duration(500);
breakpoints.team_start = breakpoints.promise_end + duration(500);
breakpoints.team_end = breakpoints.team_start + duration(500);
breakpoints.team_members_start = breakpoints.team_end + duration(10);
breakpoints.team_members_end = breakpoints.team_members_start + duration(1000);
breakpoints.team_members_start_2 = breakpoints.team_members_end + duration(200);
breakpoints.team_members_end_2 = breakpoints.team_members_start_2 + duration(1000);
breakpoints.contact_start = breakpoints.team_members_end_2 + duration(500);
breakpoints.contact_end = breakpoints.contact_start + duration(500);

var navpoints = {};

navpoints.top = 0;
navpoints.hydration = breakpoints.hydration_end + 1;
navpoints.aloe = breakpoints.aloe_end + 1;
navpoints.skeleton = breakpoints.skeleton_end + 1;
navpoints.story = breakpoints.story_end + 1;
navpoints.promise = breakpoints.promise_end + 1;
navpoints.team = breakpoints.team_end + 1;
navpoints.contact = breakpoints.contact_end + 1;

var s;
var isSkrollr;


function openNav() {
  $('body').addClass('nav-open');
}

function closeNav() {
  $('body').removeClass('nav-open');
}

function navigateTo(target) {

  closeNav();

  if(isSkrollr) {

    var val = navpoints[target];

    s.animateTo(val, {
      duration: 1000,
      easing: 'swing'
    });

  } else {

    var section = $('#section-' + target);

     $('html, body').animate({
      scrollTop: section.offset().top - 60
     }, 1000);

  }

}

function onWindowResize() {

  if(!isSkrollr && $(this).width() > 760) {
    s = skrollr.init({
      constants: breakpoints
    });
    isSkrollr = true;
  } else if(isSkrollr && $(this).width() <= 760) {
    s.destroy();
    isSkrollr = false;
  }

}

function init() {



  

  $('body').addClass('loaded').on('click', 'section', function() {
    closeNav();
  }).find('.open-nav').click(function() {
    if($('body').hasClass('nav-open')) {
      closeNav();
    } else {
      openNav();
    }
  });

  $('.btn-navigation').on('click', function() {
    navigateTo($(this).data('target'));
  });

  $(window).on('resize', onWindowResize).trigger('resize').trigger('scroll');

  $(document).on('keydown', function(e) {
 
    if(e.keyCode === 40 || e.keyCode === 32) {

      e.preventDefault();

      var scroll = $(window).scrollTop();
      var marked = false;

      for(var k in breakpoints) {

        if(scroll < breakpoints[k]) {
          marked = true;
        }

        if(marked && k.indexOf('end') > -1) {

          s.animateTo(breakpoints[k], {
            duration: 600,
            easing: 'swing'
          });

          break;
        }
      }
    }
  });

}


$(window).load(function() {
  setTimeout(init, 2000);
});





