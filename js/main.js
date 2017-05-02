'use strict'

$(function(){
  $(window).on('resize', autoresize).trigger('resize');
  // 提示框效果
  $('[data-toggle="tooltip"]').tooltip();

  $(".topbar a").mousedown(function(){
    $(this).css("outline","none");
  });

  // 为产品的tab栏添加自适应效果(大于宽度时变成滚动效果)
  tabFix();
  // 为轮播器添加触摸效果
  carouselTouch();
  // 点击新闻按钮时切换新闻标题
  changeNewsTitle();
});

function autoresize(){
  // 获得屏幕尺寸
  var width = $(window).width();
  //判断是大屏幕还是小屏幕
  var isSmallScreen = width < 768;

  //遍历轮播图每项
  $('#carousel-ad > .carousel-inner > .item').each(function(i,item){
    var $item = $(item);
    // 获得需要实用的图片
    var imgSrc = isSmallScreen ? $item.data('image-xs') : $(item).data('image-lg');

    //设置背景图片
    $item.css('backgroundImage', 'url("'+imgSrc+'")');

    //如果是小屏幕就使用img设置图片
    //否则清空
    if(isSmallScreen){
      $item.html('<img src="' + imgSrc + '" alt="" />');

    } else {
      $item.empty();
    }
  });
}

// 新闻标题切换
function changeNewsTitle() {
  $('.news-nav a').click(function(e){
    $('.news-title').text($(this).data('title'));
  });
}

// 轮播器触摸
function carouselTouch() {
  var OFFSET = 50;
  $('.carousel').each(function(i, item){
    var startX, endX;
    console.log(item);
    item.addEventListener('touchstart', function(e){
      startX = e.touches[0].clientX;
      e.preventDefault();
    });
    item.addEventListener('touchmove', function(e){
      endX = e.touches[0].clientX;
      e.preventDefault();
    });
    item.addEventListener('touchmove', function(e){
      var offsetX = endX - startX;
      if (offsetX > OFFSET) {
        $(this).carousel('prev');
      } else if (offsetX < -OFFSET) {
          $(this).carousel('next');
      }
      e.preventDefault();
    });
  })
}

// tab栏宽度适应
function tabFix() {
  // 导航条
  var $nav = $('.nav-tabs');
  // var el = document.getElementsByClassName('nav-tabs');
  // console.log(el);
  // console.log('------------------------------');
  $nav.each(function(i, item){
    // 导航条中每项
    var $tabs = $(this);
    var tabsWidth = 20;
    // console.log(i);
    // console.log(item);
    // console.log('-------------------------');
    $tabs.children().each(function(ci, citem){
      tabsWidth += $(citem).width();
      // console.log(ci);
      // console.log(citem);
    });
    if (tabsWidth > $tabs.parent().width()) {
      $tabs.css('width', tabsWidth);
      $nav.parent().css('overflow-x', 'scroll')
    } else {
      $tabs.css('width', 'auto');
      $nav.parent().css('overflow-x','hidden');
    }
  });
}
