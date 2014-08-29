$(function () {
	$("#output").hide();
	$(".refNotesIncl").hide();
	$(".refNotesLoc").hide();
    $(".right").hide();
    var r = $("input[type=radio]");
	r.filter(".refNotes.yes").on('click', function() {
		$(".refNotesIncl").fadeIn('fast');
		});
	r.filter(".refNotes.no").on('click', function() {
		$(".refNotesIncl").fadeOut('fast');
		});
	r.filter(".a.yes").on('click', function() {
		$(".refNotesLoc").fadeIn('fast');
		});
	r.filter(".refNotesIncl.no").on('click', function() {
		$(".refNotesLoc").fadeOut('fast');
		});

	$("#next").on('click', function() {
        $(".left").toggle("slide");
        $(".right").css("display", "inline");
        $(".right").show("slide", { direction: "left" }, 'slow');
    });

	$(".submit").on('click', function() {
        function spellOut(name) {
            var authorSpelled = "";
            name = name.toString();
            for(var j=0; j<(name.length-1); j++){
                authorSpelled += name.charAt(j).toUpperCase() + "-";
            }
            authorSpelled += name.charAt(name.length-1).toUpperCase() + "  ";
            return authorSpelled;
        }


        var navMarkers = [];
        $("input[type=checkbox]:checked").each(function() {
            navMarkers.push($(this).val());
        });
        var x = "";
        if(navMarkers.length > 0) {
            for (var i = 0; i < navMarkers.length; i++) {
                x = x + navMarkers[i] + ", "
            }
            x+="and";
        }
        var outputs = {
            title: $(".title").val(),
            DBC: $(".DBC").val(),
            authorFirst: $(".author.firstname").val(),
            authorLast: $(".author.lastname").val(),
            aS:  spellOut( $(".author.firstname").val()) + spellOut($(".author.lastname").val()),
            narratorFirst: $(".narrator.firstname").val(),
            narratorLast: $(".narrator.lastname").val(),
            reviewerFirst: $(".reviewer.firstname").val(),
            reviewerLast: $(".reviewer.lastname").val(),
            copyrightYear: $(".copyright.year").val(),
            copyrightHolder: $(".copyright.holder").val(),
            nMs:x,
            pages: $(".pages").val(),
            hours: $(".hours").val(),
            minutes: $(".minutes").val(),
            level: $(".level option").filter(":selected").val(),
            refNotes: $("input[name=notes]").filter(":checked").val(),
            refNotesIncl: $("input[name=notes2]").filter(":checked").val(),
            refNotesLoc: $(".refNotesLoc option").filter(":selected").val()
        };


    $("#input").remove();
	$("#output").fadeIn('fast');
        var theTemplateScript = $("#myTemplate").html();
        var theTemplate = Handlebars.compile(theTemplateScript);
        $(document.body).append(theTemplate(outputs));
        if(outputs.refNotes=="no") {
            $(".incl").hide();
            $(".none").hide();
        }
        if(outputs.refNotes=="yes" && outputs.refNotesIncl && outputs.refNotesIncl == "no") {
            $(".incl").hide();
        }
        if(outputs.refNotesIncl == "yes"){
            $(".none").hide();
            $(".incl span").text(outputs.refNotesLoc);
        }

    });
});