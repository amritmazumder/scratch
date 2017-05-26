var drawLayout = function() {
	
	//Store Window Dimensions
	var winWidth = $(window).width();
	var winHeight = $(window).height();

	//stock Yellow
	var yellow = '#FCCD16';

	//Set Top Menu Height
	$(".con-menu").height(winHeight/20);
	var contentMenuHeight = $(".con-menu").height();

	//Set Left Menu Height
	$(".val-menu").height(winHeight);
	var valueMenuHeight = $(".val-menu").height();
	//Set Right Menu Height
	$(".per-menu").height(winHeight);
	var personMenuHeight = $(".per-menu").height();

	//Set Left Menu Children Heights

	$(".val-menu .spacer").height(contentMenuHeight);

	var $valButtonGroup = $(".val-menu .btn-group");
	$valButtonGroup.height(winHeight - contentMenuHeight);
	var valMenuWidth = $valButtonGroup.width();
	var $buttonGroupHeight = $valButtonGroup.height();

	//Set Height of Individual Buttons
	var valueCount = 13;
	var $valButtons = $(".btn-group .val-btn");

	$valButtons.height($buttonGroupHeight/valueCount);

	var $valButtonHeight = $(".val-btn").height();

	var $valIcons = $(".val-btn img");


	//Set Right Menu Children Heights

	$(".per-menu .spacer").height(contentMenuHeight);

	var $perButtonGroup = $(".per-menu .per-btn-group");
	$perButtonGroup.height(winHeight - contentMenuHeight);
	var $perMenuWidth = $perButtonGroup.width();
	var $perButtonGroupHeight = $perButtonGroup.height();

	//Set Height of Individual Buttons
	var $perButtons = $(".per-btn-group .per-btn");

	$perButtons.height($perMenuWidth);

	var $perButtonHeight = $(".per-btn").height();

	var $perIcons = $(".per-btn img");

	
	//Set position for Icons
	$valIcons.css({
		top : $perButtonHeight/5,
		left : $perButtonHeight/4 
	});

	$perIcons.css({
		top : $perButtonHeight/5,
		right : $perButtonHeight/3 
	});

	//Set height of items

	var items = $(".item").toArray();

	
}

$(document).ready(function(){
	
	$("iframe").fitVids();

	var inputArray = $(".val-btn input").toArray();
	var titles = [];

	$.each(inputArray, function(i, elem){

		var caption = $(this).attr("value");
		titles.push(caption);
		titles.join(', ');
	});

	//console.log(titles);

	var inputIcons = $(".val-btn img").toArray();
	var icons = [];

	$.each(inputIcons, function(i, elem){
		var imgSrc = $(this).attr('src');
		icons.push(imgSrc);
		icons.join(', ');
	});

	//console.log(icons);

	$(".val-btn .hastip").tooltipsy({
		offset: [1,0]
	});

	$(".per-btn .hastip").tooltipsy({
		offset: [-1,0],
		css:{
			'margin-top':'-11%'
		}
	});
	

	drawLayout();

	//Hover States for Left Menu

	var $valueInput = $(".val-btn input");
	var $valButton = $(this).parent(".val-btn");
	
	$valueInput.hover(function(){
		var $currentButton = $(this).parent(".val-btn");
		var $currentIcon = $currentButton.children("img");

		
		$currentIcon.css({width: '50%'});
	
	}, function(){
		var $currentButton = $(this).parent(".val-btn");
		var $currentIcon = $currentButton.children("img");

		$currentIcon.css({width: '40%'});
	});

	//Hover States for Right Menu

	var $perInput = $(".per-btn input");
	var $perButton = $(this).parent(".per-btn");
	
	$perInput.hover(function(){
		var $currentButton = $(this).parent(".per-btn");
		var $currentIcon = $currentButton.children("img");

		
		$currentIcon.css({width: '50%'});
		//console.log($currentIcon.width());
	
	}, function(){
		var $currentButton = $(this).parent(".per-btn");
		var $currentIcon = $currentButton.children("img");

	
		$currentIcon.css({width: '40%'});
	});

	//-!-!-!-!-!-!-!-!-!-   Isotope   -!-!-!-!-!-!-!-!-!-

	var $container = $(".container");

	//Initialize

	$container.isotope({
		  // options
		  itemSelector: '.item',
		  layouMode: 'masonry',
		  masonry: {
		      columnWidth: 0
		    },
		    transitionDuration: '0.4s',
		    hiddenStyle: {
			    opacity: 0,
			    transform: 'scale(0.1)'
			  }
		});

	// Inclusive Filters & Exclusive Filters

	var $checkboxes = $('.val-btn input');
	var $mediacheck = $('.per-btn input');

	$checkboxes.add($mediacheck).change(function(){
		
		var exclusives = [];
		var inclusives = [];
		
		$mediacheck.each(function(i,elem){
			if (elem.checked) {
				exclusives.push(elem.value);
				var $currentButton = $(this).parent();
	        	$currentButton.addClass('clicked');
			} else {
				var $currentButton = $(this).parent();
		      	$currentButton.removeClass('clicked');
		        $currentButton.addClass('not-clicked');
			}
		});

		$checkboxes.each( function( i, elem ) {  
	      // if checkbox, use value if checked
	      if ( elem.checked ) {
	        inclusives.push( elem.value );
	        var $currentButton = $(this).parent();
	        $currentButton.addClass('clicked');
	      } else {
	      	var $currentButton = $(this).parent();
	      	$currentButton.removeClass('clicked');
	        $currentButton.addClass('not-clicked');
	      }
	    });

	    exclusives = exclusives.join(' ');

		var filterValue;
	    
	    if ( inclusives.length ) {
	      // map inclusives with exclusives for
	      filterValue = $.map( inclusives, function( value ) {
	        return value + exclusives;
	      });
	      filterValue = filterValue.join(', ');
	    } else  {
	      filterValue = exclusives;
	    }

	    //Update Context

	    var $context = $(".con-menu .context");
	    $context.text(filterValue);

	    if (filterValue === '') {
	    	$(".val-btn, .per-btn").addClass('clicked');
	     	$(".val-btn, .per-btn").removeClass('not-clicked');
	     	$(".con-menu .context").text('.values — A Catalog of Thougths in the Digital Arena — Vol. 1');
	    }

	    //console.log(filterValue);
	     $container.isotope({ filter: filterValue });
	});
	
	

});

// MAKE MEDIA ICONS
// MAKE MEDIA INTERACTIONS
// ISOTOPE