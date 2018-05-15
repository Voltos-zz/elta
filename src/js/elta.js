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
        var colNumber = 0;
        $(this).find('.elta-table-row-col').each(function(key){
            var width = 0;
            var grow = 0;
            for(var i = 0; i < $(this).attr('data-colspan'); i++){
                width+= columnWidth[colNumber];
                grow+= columnWidthSum / columnWidth[colNumber];
                colNumber++;
            }
            width+= "px";
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
    var tableTitles = getTableTitles(table);
    var columnWidth = getColumnWidth(table);
    var tableClasses = table.attr('class').replace('elta', '');
    var elasticTable = '<div class="elta-table'+tableClasses+'" ';
    elasticTable+= 'style="margin-top:-'+table.outerHeight()+'px">';
    var tableRow = $(table).find('tr');
    tableRow.each(function(key){
        var rowClass = $(this).attr('class') ? ' '+$(this).attr('class') : '';
        if(tableTitles.length > 0 && key == 0){
            elasticTable+= '<div class="elta-table-row-title elta-tr'+rowClass+'">';
        }else{
            elasticTable+= '<div class="elta-table-row elta-tr'+rowClass+'">';
        }
        var tableCol = $(this).find('th, td');
        tableCol.each(function(key, val){
            var colClass = $(this).attr('class') ? ' '+$(this).attr('class') : '';
            var colspan = $(this).attr('colspan') ? $(this).attr('colspan') : 1 ;
            if($(this).is('th')){
                elasticTable+= '<div class="elta-table-row-col elta-tr-th'+colClass+'" ';
            }else{
                elasticTable+= '<div class="elta-table-row-col elta-tr-td'+colClass+'" ';
            }
            
            elasticTable+= 'data-colspan="'+colspan+'">';
            elasticTable+= $.trim($(this).html());
            elasticTable+= '</div>';
        });
        elasticTable+= '</div>';
    });
    elasticTable+= '</div>';
    return elasticTable
}
