$(function () {
	$("#output").hide();
	$(".refNotesIncl").hide();
	$(".refNotesLoc").hide();
    $(".right").hide();
    var r = $("input[type=radio]");
	r.filter(".refNotes.yes").on('click', function() {
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

	$("#next").on('click', function() {
        $(".left").toggle("slide");
        $(".right").css("display", "inline");
        $(".right").show("slide", { direction: "left" }, 'slow');
    });
	$(".submit").on('click', function() {

        var outputs = {
            title: $(".title").val(),
            DBC: $(".DBC").val(),
            authorFirst: $(".author.firstname").val(),
            authorLast: $(".author.lastname").val(),
            narratorFirst: $(".narrator.firstname").val(),
            narratorLast: $(".narrator.lastname").val(),
            reviewerFirst: $(".reviewer.firstname").val(),
            reviewerLast: $(".reviewer.lastname").val(),
            copyrightYear: $(".copyright.year").val(),
            copyrightHolder: $(".copyright.holder").val(),
            pages: $(".pages").val(),
            hours: $(".hours").val(),
            minutes: $(".minutes").val(),
            navMarkers: [],
            ToC: $("input[type=radio]:checked").filter(".ToC").val(),
            level: $(".level option").filter(":selected").val(),
            refNotes: $("input[name=notes]").filter(":checked").val(),
            refNotesIncl: $("input[name=notes2]").filter(":checked").val(),
            refNotesLoc: $(".refNotesLoc option").filter(":selected").val(),
            spellOutName: function spellOut(name) {
                var authorSpelled = "";
            name = name.toString();
            for(var j=0; j<(name.length-1); j++){
                authorSpelled += name.charAt(j).toUpperCase() + "-";
            }
            authorSpelled += name.charAt(name.length-1).toUpperCase() + "  ";
        },


        };
    $("input[type=checkbox]:checked").each(function() {
        outputs.navMarkers.push($(this).val());
    });
	var x = "";
    if(outputs.navMarkers.length > 0) {
        for (var i = 0; i < outputs.navMarkers.length; i++) {
            x = x + outputs.navMarkers[i] + ", "
        }
        x+="and";
    }
	if(outputs.ToC == "no") {$(".ToC span").hide()}
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

	$("#input").remove();
	$("#output").fadeIn('fast');
        var theTemplateScript = $("#myTemplate").html();
        var theTemplate = Handlebars.compile(theTemplateScript);
        $(document.body).append(theTemplate(outputs));
    });

});