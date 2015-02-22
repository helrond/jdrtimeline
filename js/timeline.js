$(function () {

    // Global Variables
    var startYear = 1874;
    var endYear = 1960;
    var range = endYear-startYear;
    var offsetW = Math.floor($(window).width()/10);
    var offsetH = Math.floor($(window).height()/10);
    var ratioW = Math.floor(($(window).width()-offsetW)/range);
    var height = Math.floor($(window).height()-offsetH);
    var eventsOffset = 5;

    function getData() {
      var projects;
      $.ajax({
        url: '/projects.json', 
        async: false,
        success: function(data) {
          projects = data;
        }
      });
      return(projects);
    };

    function createGrid() {
        
        var parent = $('<div />', {
            class: 'grid', 
            width: ratioW  * range, 
            height: height
        }).css({"marginLeft":offsetW+"px"}).addClass('grid').appendTo('.timeline');

        for (var i = 0; i < range; i++) {
            var currentYear = startYear + i;
            var year = $('<div />', {class: 'year', 'data-year': currentYear, width: ratioW});
            var title = $('<div>'+currentYear+'</div>').addClass('title');
            var gridline = $('<div />', {class: 'gridline'});

            $(title).appendTo(year);
            $(gridline).appendTo(year);
            $(year).appendTo(parent);
        }

    };

    function sanitize(data) {
        if (data === null) {return '';} else {return data;}
    }

    function removeSpace(string) {
      var result = string.replace(/ +/g, "-");
      return(result);
    }

    function findEventType(event) {
        if(event){return('range');} else {return('event');}
    }

    function parseDate(date, format) {
      if(date) {
      function convertMonth(number) {
        var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        return(months[number-1]);
      }
      if(date.length > 7) {
        var year = date.slice(0, date.indexOf('-'));
        var month = date.slice(date.indexOf('-')+1, date.lastIndexOf('-'));
        var prettyMonth = convertMonth(month);
        var day = date.slice(date.lastIndexOf('-')+1, date.length);
      } else if(date.length > 4) {
        var year = date.slice(0, date.indexOf('-'));
        var month = date.slice(date.indexOf('-')+1, date.length);
        var prettyMonth = convertMonth(month);
        var day = 0;
      } else {
        var year = date;
        var month = 0;
        var day = 0;
      }

      if(format === 'year') {
        return(parseInt(year));
      } else if(format === 'month') {
        return(parseInt(month));
      } else if(format === 'pretty') {
        if(day) {
          return(prettyMonth + ' ' + day + ', ' + year);
        } else if(prettyMonth) {
            return(prettyMonth + ' ' + year);
        } else {
            return(year);
          }
        };
      } else {
        return 0;
      }
      }

    function updateDisplay() {
        createGrid();
        showHistoricGeneral();
        var projects = getData();
        $('#controls .list').hide();
        $(projects).each(function(){
            var id = removeSpace(this.project);
            var historicWrapper = $('<div />', {class:"historic"});
            var projectWrapper = $('<div />', {class:"project", id:id});
            var eventsWrapper = $('<div />', {class:"events"  });
            var projectType = this.type;
            var projectTitleOffset = offsetW-5
            var projectTitle = '<div class="projectTitle ' + projectType + '" style="width: '+projectTitleOffset+'px"><span>' + this.project + '</span></div>';
            var events = this.events;
            $('<div class="wrapper"><input type="checkbox" checked="checked" name="'+id+'"/><div class="project '+projectType+'">'+this.project+'</div></div>').appendTo('#controls .list');
            $(events).each(function(){
                var eventTitle = sanitize(this.title);
                var date = sanitize(this.date);
                var startDate = sanitize(this.dateStart);
                var endDate = sanitize(this.dateEnd);
                var type = sanitize(this.type);
                var involved = sanitize(this.involved);
                var eventType = findEventType(this.dateStart);
                var eventYear = parseDate(date, 'year');
                var eventMonth = parseDate(date, 'month');
                var eventPretty = parseDate(date, 'pretty');
                var eventYearStart = parseDate(startDate, 'year');
                var eventMonthStart = parseDate(startDate, 'month');
                var eventPrettyStart = parseDate(startDate, 'pretty');
                var eventPrettyEnd = parseDate(endDate, 'pretty');
                var eventYearEnd = parseDate(endDate, 'year');
                var eventMonthEnd = parseDate(endDate, 'month');
                var eventPosition = offsetW - eventsOffset + (eventYear+(eventMonth/12)-startYear)*ratioW;
                var rangeStart = offsetW + ((eventYearStart+(eventMonthStart/12)-startYear)*ratioW);
                var rangeEnd = $(window).width()-((offsetW + (eventYearEnd+(eventMonthEnd/12)-startYear)*ratioW));

                if(type === 'historic') {
                  if(eventType === "event") {
                    $('<div data-title="'+eventTitle+', '+eventPretty+'" class="'+eventType+'">&nbsp</div>').css({"marginLeft":eventPosition+'px'}).appendTo(historicWrapper);
                  } else if(eventType === "range") {
                    $('<div data-title="'+eventTitle+', '+eventPrettyStart+'-'+eventPrettyEnd+'" class="'+eventType+'">&nbsp</div>').css({"left":rangeStart+'px', "right":rangeEnd+'px'}).appendTo(historicWrapper);
                  }
                } else if(eventType === "event") {
                    $('<div data-title="'+eventTitle+', '+eventPretty+'" class="'+eventType+' '+involved+' '+type+'">&nbsp</div>').css({"marginLeft":eventPosition+'px'}).appendTo(eventsWrapper);
                } else if(eventType === "range") {
                    $('<div data-title="'+eventTitle+', '+eventPrettyStart+'-'+eventPrettyEnd+'" class="'+eventType+' '+involved+' '+type+'">&nbsp</div>').css({"left":rangeStart+'px', "right":rangeEnd+'px'}).appendTo(eventsWrapper);
                };

            });
            $(projectTitle).appendTo(projectWrapper);
            $(eventsWrapper).appendTo(projectWrapper);
            $('<div />', {class:"line"}).css({"marginLeft":offsetW+'px'}).appendTo(projectWrapper);
            $(historicWrapper).appendTo(projectWrapper);
            $(projectWrapper).appendTo('#projects');

        });
    };

    function setActiveProjects() {
      $('#controls button').on('click', function() {
        $('#controls .list').toggle();
      });
      $('#controls .list input[type="checkbox"]').on('click', function(){
        var id = $(this).attr("name");
        if($(this).is(':checked')) {
          $('#projects #'+id).removeClass('inactive');
        } else {
          $('#projects #'+id).addClass('inactive');
        }
      });
    };

    function showHistoric() {
      $('#projects .projectTitle').on('click', function() {
        // if($(this).siblings('.historic').is(':visible')) {
        //   $(this).siblings('.historic').hide();
        // } else {
        //   $('#projects .historic').hide();
        //   $(this).siblings('.historic').show();
        // }
        $(this).siblings('.historic').toggle();
        $(this).parent('.project').toggleClass('historicActive');
      });
    };

    function showDetail() {
      $('#projects .project .event, #projects .project .range').each(function(){
        var title = $(this).attr("data-title");
        $(this).after('<div class="tooltip">'+title+'</div>');
      });
      $('#projects .project .event, #projects .project .range').on('click', function(e){
        var location = e.pageX-offsetW-112;
        if($(this).next('.tooltip').is(':visible')) {
          $(this).next('.tooltip').hide();
        } else {
          $('.tooltip').hide();
          $(this).next('.tooltip').css({"left":location}).show();
        }
      });
    };

    function showHistoricGeneral() {
      $('#historic div').each(function(){
        if($(this).hasClass('ww1')) {
          var marginLeft = offsetW + (ratioW*40);
          var width = ratioW*5;
          $(this).css({"left":marginLeft, "width":width});
        } else if($(this).hasClass('ww2')) {
          var marginLeft = offsetW + (ratioW*65);
          var width = ratioW*6;
          $(this).css({"left":marginLeft, "width":width});
        } else if($(this).hasClass('depression')) {
          var marginLeft = offsetW + (ratioW*55);
          var width = ratioW*10;
          $(this).css({"left":marginLeft, "width":width});
        }
      });
    }

updateDisplay();
setActiveProjects();
showHistoric();
showDetail();

});