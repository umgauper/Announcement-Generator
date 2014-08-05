$(function () {
	$("#output").hide();
	$(".refNotesIncl").hide();
	$(".refNotesLoc").hide();
    $(".right").hide();
	$("input[type=radio]").filter(".refNotes.yes").on('click', function() {
		$(".refNotesIncl").fadeIn('fast');
		});
	$("input[type=radio]").filter(".refNotes.no").on('click', function() {
		$(".refNotesIncl").fadeOut('fast');
		});
	$("input[type=radio]").filter(".a.yes").on('click', function() {
		$(".refNotesLoc").fadeIn('fast');
		});
	$("input[type=radio]").filter(".refNotesIncl.no").on('click', function() {
		$(".refNotesLoc").fadeOut('fast');
		});
	var authorSpelled = "";
	function spellOut(name) { 
		name = name.toString();
		for(var j=0; j<(name.length-1); j++){
			authorSpelled += name.charAt(j).toUpperCase() + "-";
			}
		authorSpelled += name.charAt(name.length-1).toUpperCase() + "  ";
		}
	$("#next").on('click', function() {
        $(".left").toggle("slide");
        $(".right").css("display", "inline");
        $(".right").show("slide", { direction: "left" }, 'slow');
    });
	$(".submit").on('click', function() {
	/* stored values in variables even though some may be only used once, to make code more readable
	* there has to be a better way to do this....*/
	var title=$(".title").val();
	var DBC=$(".DBC").val();
	var authorFirst=$(".author.firstname").val();
	var authorLast=$(".author.lastname").val();
	var narratorFirst=$(".narrator.firstname").val();
	var narratorLast=$(".narrator.lastname").val();
	var reviewerFirst=$(".reviewer.firstname").val();
	var reviewerLast=$(".reviewer.lastname").val();
	var copyrightYear=$(".copyright.year").val();
	var copyrightPublisher=$(".copyright.publisher").val();
	var pages=$(".pages").val();
	var hours=$(".hours").val();
	var minutes=$(".minutes").val();
	var ToC=$("input[type=radio]:checked").filter(".ToC").val();
	var navMarkers = [];
		$("input[type=checkbox]:checked").each(function() {
			navMarkers.push($(this).val());
			});
	var level = $(".level option").filter(":selected").val();
	var refNotes = $("input[name=notes]").filter(":checked").val();
	var refNotesIncl = $("input[name=notes2]").filter(":checked").val();
	var refNotesLoc = $(".refNotesLoc option").filter(":selected").val();
	$("p.title").text(title + ", " + "DBC" + DBC);
	$("p.author").text("By " + authorFirst + " " + authorLast);
	$("p.copyright").text("Copyright " + copyrightYear + " " + "by " + copyrightPublisher);
	$("p.narrator").text("Narrated by " + narratorFirst + " " + narratorLast);
	$(".pages span").text(pages);
	$(".readingTime span").text(hours + " hours " + minutes + " minutes");
	var x = "";
    if(navMarkers.length > 0) {
        for (var i = 0; i < navMarkers.length; i++) {
            x = x + navMarkers[i] + ", "
        }
        x+="and";
    }
	$(".markers > span").text(x);
	$(".markers span:nth-child(2)").text(level);
	if(ToC == "no") {$(".ToC span").hide()}
	if(refNotes=="no") {
        $(".incl").hide();
        $(".none").hide();
    }
    if(refNotes=="yes" && refNotesIncl && refNotesIncl == "no") {
        $(".incl").hide();
    }
    if(refNotesIncl == "yes"){
        $(".none").hide();
        $(".incl span").text(refNotesLoc);
    }
	$("p.endof").text("End of " + title);
	spellOut(authorFirst);
	spellOut(authorLast);
	$(".closing p.author").text("By " + authorFirst + " " + authorLast + " " + authorSpelled);
	$("p.reviewer").text("Reviewed by " + reviewerFirst + " " + reviewerLast);
	$("#input").remove();
	$("#output").fadeIn('fast');
		});
})()