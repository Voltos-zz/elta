$(document).ready(function() {
    recreateTable();
});

$(window).resize(function() {
    $('.elta').each(function(){
        if($(this).is('table')){
            reresizeElta($(this));
        }
    });
});

function recreateTable(){
    $('.elta').each(function(){
        if($(this).is('table')){
            $(this).after(createElta($(this)));
            reresizeElta($(this));
            $(this).addClass('elta-hide');
        }
    });
}

function reresizeElta(table){
    var columnWidth = getColumnWidth(table);
    var columnWidthSum = parseInt(eval(columnWidth.join("+")));
    if(columnWidthSum > $('.elta-table').outerWidth()) {
        $('.elta-table-row').css('flex-wrap','wrap');
    }else{
        $('.elta-table-row').css('flex-wrap','nowrap');
    }
    $('.elta-table-row').each(function(){
        $(this).find('.elta-table-row-col').each(function(key){
            var width = columnWidth[key]+"px";
            var grow = columnWidthSum / columnWidth[key];
            $(this).css({'flex-grow':grow,'flex-basis':width});
        });
    });
}

function getColumnWidth(table){
    var columnWidth = [];
    $(table).find('tr:last td').each(function(){
        columnWidth.push($(this).outerWidth());
    })
    return columnWidth;
}

function getTableTitles(table){
    var tableTitles = [];
    $(table).find('th').each(function(){
        var column = $(this);
        tableTitles.push($.trim(column.html()));
    });
    return tableTitles;
}

function createElta(table){
    var first = 1;
    var tableTitles = getTableTitles(table);
    var columnWidth = getColumnWidth(table);
    var tableCss = table.attr('class').replace('elta', '');
    var elasticTable = '<div class="elta-table'+tableCss+'">';
    var tableRow = $(table).find('tr');
    tableRow.each(function(){
        var rowClass = $(this).attr('class') ? ' '+$(this).attr('class') : '';
        elasticTable+= '<div class="elta-table-row'+rowClass+'">';
            if(tableTitles.length > 0 && first){
                $.each(tableTitles, function(key, val) {
                    elasticTable+= '<div class="elta-table-row-col title">';
                    elasticTable+= val;
                    elasticTable+= '</div>';
                });
                first = 0;
            }
            var tableCol = $(this).find('td');
            tableCol.each(function(key){
                var colClass = $(this).attr('class') ? ' '+$(this).attr('class') : '';
                elasticTable+= '<div class="elta-table-row-col'+colClass+'" ';
                elasticTable+= 'style="flex-basis:'+columnWidth[key]+'px;">';
                elasticTable+= $.trim($(this).html());
                elasticTable+= '</div>';
            });
        elasticTable+= '</div>';
    });
    elasticTable+= '</div>';
    return elasticTable
}