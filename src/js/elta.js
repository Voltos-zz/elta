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
        $('.elta-table-row, .elta-table-row-title').css('flex-wrap','wrap');
    }else{
        $('.elta-table-row, .elta-table-row-title').css('flex-wrap','nowrap');
    }
    $('.elta-table-row, .elta-table-row-title').each(function(){
        $(this).find('.elta-table-row-col').each(function(key){
            var width = columnWidth[key]+"px";
            var grow = columnWidthSum / columnWidth[key];
            $(this).css({'flex-grow':grow,'flex-basis':width});
        });
    });
}

function getColumnWidth(table){
    var resArray = [];
    var columnWidth = [];
    $(table).find('tr').each(function(){
        $(this).find('td').each(function(){
            columnWidth.push($(this).outerWidth());
        });
        if(columnWidth.length > resArray.length ){
            resArray = columnWidth
        }
    });
    return resArray;
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
    var elasticTable = '<div class="elta-table'+tableCss+'" ';
    elasticTable+= 'style="margin-top:-'+table.outerHeight()+'px">';
    var tableRow = $(table).find('tr');
    tableRow.each(function(){
        var rowClass = $(this).attr('class') ? ' '+$(this).attr('class') : '';
        if(tableTitles.length > 0 && first){
            elasticTable+= '<div class="elta-table-row-title'+rowClass+'">';
            var tableCol = $(this).find('th');
            first = 0;
        }else{
            elasticTable+= '<div class="elta-table-row'+rowClass+'">';
            var tableCol = $(this).find('td');
        }
        tableCol.each(function(key, val){
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
