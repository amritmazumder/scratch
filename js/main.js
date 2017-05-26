$(document).ready(function(){
	var winWidth = $(window).width();
	var winHeight = $(window).height();

	//$(".container").height(winHeight/2);
	//$(".container").css({marginTop:winHeight/4});
	
	var $container = $('.container');
		// init
		$container.isotope({
		  // options
		  itemSelector: '.item',
		  masonry: {
		      columnWidth: 0
		    },
		  getSortData: {
		  	weight: '.weight parseInt',
		  	height: '.height parseInt',
		  	name: '.name'
		  }
		});

	$(".control").on('click','div', function(){
		var sortByValue = $(this).attr('data-sort-by');
		$container.isotope({
			sortBy: sortByValue
		});
		//$(".container").height(winHeight/2);
	});

	// $(".control-filter").on('click','div',function(){
	// 	var filterValue = $(this).attr('data-filter');
	// 	$(filterValue).addClass("show");
	// 	var active = $(filterValue).hasClass("show");
 //  		$container.isotope({ filter: '.show' });
	// });



	var $checkboxes = $('.control-filter input');
	$checkboxes.change(function(){
		var exclusives = [];
		var inclusives = [];
			 $checkboxes.each( function( i, elem ) {
	      // if checkbox, use value if checked
	      if ( elem.checked ) {
	        inclusives.push( elem.value );
	      }
	    });

		var filterValue;
	    if ( inclusives.length ) {
	      // map inclusives with exclusives for
	      filterValue = $.map( inclusives, function( value ) {
	        return value + exclusives;
	      });
	      filterValue = filterValue.join(', ');
	    } else {
	      filterValue = '*';
	    }
	    console.log(filterValue);
	     $container.isotope({ filter: filterValue });
	});
});