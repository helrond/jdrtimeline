$(function () {

    // Global Variables
    var startYear = 1874;
    var endYear = 1960;
    var range = endYear-startYear;
    var offsetW = Math.floor($(window).width()/10);
    var offsetH = Math.floor($(window).height()/10);
    var ratioW = Math.floor(($(window).width()-offsetW)/range);
    var height = Math.floor($(window).height()-offsetH);

    var projects = {
          "project" : "Notre-Dame de Reims",
          "type" : "restoration",
          "events" : [    {
              "title" : "Fire destroys original cathedral",
              "date" : "1211",
              "type" : "historic",
              "dateStart" : null,
              "dateEnd" : null,
              "involved" : null
            },
            {
              "title" : "Original Cathedral built",
              "date" : "496",
              "type" : "historic",
              "dateStart" : null,
              "dateEnd" : null,
              "involved" : null
            },
            {
              "title" : "Outbreak of First World War",
              "date" : "1914",
              "type" : "historic",
              "dateStart" : null,
              "dateEnd" : null,
              "involved" : null
            },
            {
              "title" : "Germans first shell Reims",
              "date" : "1914-11-14",
              "type" : "historic",
              "dateStart" : null,
              "dateEnd" : null,
              "involved" : null
            },
            {
              "title" : "The Architectural League of New York passes a resolution condemning desctruction of Reims Cathedral and calling for protection of monuments",
              "date" : "1914-11-17",
              "type" : "other",
              "dateStart" : null,
              "dateEnd" : null,
              "involved" : null
            },
            {
              "title" : "Ralph Adams Cram publishes Heart of Europe",
              "date" : "1915",
              "type" : "other",
              "dateStart" : null,
              "dateEnd" : null,
              "involved" : null
            },
            {
              "title" : "Metropolitan Museum of New York opens a new tapestry gallery",
              "date" : "1915",
              "type" : "historic",
              "dateStart" : null,
              "dateEnd" : null,
              "involved" : null
            },
            {
              "title" : "Proposal of war memorial for New York, inspired by Reims",
              "date" : "1919",
              "type" : "historic",
              "dateStart" : null,
              "dateEnd" : null,
              "involved" : null
            },
            {
              "title" : "Brooklyn Museum of Art exhibits enlarged photographs of Gothic churches",
              "date" : "1915",
              "type" : "other",
              "dateStart" : null,
              "dateEnd" : null,
              "involved" : null
            },
            {
              "title" : "French Restoration Fund announces that Reims will become a pantheon/ruin to Unknown Soldier, and will fly flags of all allied nations atop.",
              "date" : "1917",
              "type" : "other",
              "dateStart" : null,
              "dateEnd" : null,
              "involved" : null
            },
            {
              "title" : "WWI ends",
              "date" : "1918",
              "type" : "historic",
              "dateStart" : null,
              "dateEnd" : null,
              "involved" : null
            },
            {
              "title" : "JDR, Jr. pledges 1 million dollars to French government for restorations at Reims and elsewhere",
              "date" : "1924-5-25",
              "type" : "jdr",
              "dateStart" : null,
              "dateEnd" : null,
              "involved" : null
            },
            {
              "title" : "JDR, Jr. pledges additional 1.6 million dollars",
              "date" : "1927",
              "type" : "jdr",
              "dateStart" : null,
              "dateEnd" : null,
              "involved" : null
            },
            {
              "title" : "Medieval Academy founded",
              "date" : "1925",
              "type" : "historic",
              "dateStart" : null,
              "dateEnd" : null,
              "involved" : null
            },
            {
              "title" : "Cloisters project begins",
              "date" : "1935",
              "type" : "historic",
              "dateStart" : null,
              "dateEnd" : null,
              "involved" : null
            },
            {
              "title" : "Importation of twelfth-century Spanish church in Florida by William Randolph Hearst",
              "date" : "1925",
              "type" : "historic",
              "dateStart" : null,
              "dateEnd" : null,
              "involved" : null
            },
            {
              "title" : "Glass shards from Reims presented to Isabella Stewart Gardner",
              "date" : "1919",
              "type" : "other",
              "dateStart" : null,
              "dateEnd" : null,
              "involved" : null
            },
            {
              "title" : "Ralph Adams Cram hired to carry on design and construction on Cathedral of Saint John the Divine",
              "date" : "1911",
              "type" : "historic",
              "dateStart" : null,
              "dateEnd" : null,
              "involved" : null
            },
            {
              "title" : "The United States enters the war",
              "date" : "1917",
              "type" : "historic",
              "dateStart" : null,
              "dateEnd" : null,
              "involved" : null
            },
            {
              "title" : "Sustained German bombing of Reims Cathedral",
              "date" : null,
              "type" : "historic",
              "dateStart" : "1914-9-14",
              "dateEnd" : "1918-10",
              "involved" : "no"
            },
            {
              "title" : "JDR, Jr. finances restoration of Reims",
              "date" : null,
              "type" : "jdr",
              "dateStart" : "1924",
              "dateEnd" : "1936",
              "involved" : "yes "
            }
          ]
        };

    function getData() {
        
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

    function findEventType(event) {
        if(event){return('range');} else {return('event');}
    }

    function parseDate(date, format) {
      function convertMonth(number) {
        var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        return(months[number-1]);
      }
      if(date.length > 4) {
      var year = date.slice(0, date.indexOf('-'));
      var month = date.slice(date.indexOf('-')+1, date.lastIndexOf('-'));
      var prettyMonth = convertMonth(month);
      var day = date.slice(date.lastIndexOf('-'), date.indexOf(date.length));
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
      }

    function updateDisplay() {
        createGrid();
        // getData();
        var historicWrapper = $('<div />', {class:"historic"}).css({"marginLeft":offsetW+"px"});
        var projectWrapper = $('<div />', {class:"project"});
        var eventsWrapper = $('<div />', {class:"events"});
        $(projects).each(function(){
            var projectType = this.type;
            var projectTitle = '<div class="projectTitle ' + projectType + '">' + this.project + '</div>';
            var events = this.events;
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
                var eventYearEnd = parseDate(endDate, 'year');
                var eventMonthEnd = parseDate(endDate, 'month');
                var eventPosition = offsetW + (eventYear+(eventMonth/12)-startYear)*ratioW;
                var rangeStart = offsetW + ((eventYearStart+(eventMonthStart/12)-startYear)*ratioW);
                var rangeEnd = $(window).width()-((offsetW + (eventYearEnd+(eventMonthEnd/12)-startYear)*ratioW));

                if(type === 'historic') {
                    $('<div title="'+eventTitle+ '" class="'+eventType +' historic">'+eventTitle+'</div>').appendTo(historicWrapper);
                } else if(eventType === "event") {
                    $('<div title="'+eventTitle+'" class="'+eventType+' '+involved+' '+type+'">&nbsp</div>').css({"marginLeft":eventPosition+'px'}).appendTo(eventsWrapper);
                } else if(eventType === "range") {
                    $('<div title="'+eventTitle+'" class="'+eventType+' '+involved+' '+type+'">&nbsp</div>').css({"marginLeft":rangeStart+'px', "marginRight":rangeEnd+'px'}).appendTo(eventsWrapper);
                };

            });
            $(historicWrapper).appendTo(projectWrapper);
            $(projectTitle).appendTo(projectWrapper);
            $(eventsWrapper).appendTo(projectWrapper);
            $(projectWrapper).appendTo('#projects');
            $('.timeline > .historic').css({"marginLeft":offsetW+"px"})

        });
    };

    function setActive() {
        // on click, show dialog with checkboxes
        // on click, add inactive class to unselected projects
    };

    function showHistorical() {
        // on click on project title (toggle)
            //hide generic historical
            //show specific historical
    };

    function showDetail() {
        // on hover over event or range
        //show title and date
    };

updateDisplay();

});