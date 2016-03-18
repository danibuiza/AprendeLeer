$(document).ready(function () {

    var langObj = $("[data-lang]");
    var lang = $(langObj).data('lang');
    var translations = null;

    if (!lang) {
        lang = "en_US";
    }

    $.getJSON('locale/' + lang + '.json', function (data) {
        translations = data;
        $.getJSON('config/learnReadConfig.json', function (data) {
            var config = data;

            createTabs(config);

            translate("cars");

            $('#tabs').tab();

            $("a").on('shown.bs.tab', function (e) {

                var img = $(e.target).data('img');
                var subTabId = $(e.target).data('alias');
                if (img) {
                    $('#contentCategoriesPane').html('<img width=640 height=480 id=' + img + ' src="pics/' + img + '.png"/>')
                } else {
                    $('#contentCategoriesPane').html('')
                    $('#' + subTabId + ' a:first').tab('show');
                }

            });
        });
    });


    function translate(key) {
        var value =  translations[key];
        if(!value){
            value = key;
        }
        return value;
    };

    function createTabs(config) {
        if (config) {
            var topEntries = "";
            var contentEntries = "";
            var i = 0;
            for (var topCategory in config) {
                var topCategoryData = config[topCategory].data;
                var topEntry = '<li><a href="#' + topCategory + '" data-toggle="tab" data-alias="' + topCategory + '" id="' + topCategory + 'Id">' + translate(topCategory) + '</a></li>';
                var contentEntry = '' +
                    '<div class="tab-pane" id=' + topCategory + '>' +
                    '<ul id="tabs"' + topCategory + ' class="nav nav-tabs" data-tabs="tabs"' + topCategory + '>';
                if (i === 0) {
                    topEntry = '<li class="active"><a href="#' + topCategory + '" data-toggle="tab" data-alias="' + topCategory + '" id="' + topCategory + 'Id">' + translate(topCategory) + '</a></li>';
                    contentEntry = '' +
                    '<div class="tab-pane active" id=' + topCategory + '>' +
                    '<ul id="tabs"' + topCategory + ' class="nav nav-tabs" data-tabs="tabs"' + topCategory + '>';
                }


                var j = 0;
                for (var entry in config[topCategory].data) {
                    var name = config[topCategory].data[j];
                    contentEntry += '<li><a href="#contentCategoriesPane" data-toggle="tab" data-img=' + name + ' id=' + name + '"Id">' + translate(name) + '</a></li>';
                    ++j;
                }
                contentEntry += '</ul></div>';
                topEntries += topEntry;
                contentEntries += contentEntry;
                ++i;
            }

            $('#tabs').html(topEntries);
            $('#tabs-categories').html(contentEntries);
        }

    }
});