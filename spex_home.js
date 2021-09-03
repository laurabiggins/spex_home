// for getting the right cdn 
// https://datatables.net/download/ 

$(document).ready( function () {
    $('#table_id').DataTable();
} );

// function for shortening info shown in columns
$.fn.dataTable.render.ellipsis = function ( cutoff ) {
    return function ( data, type, row ) {
        return type === 'display' && data.length > cutoff ?
            data.substr( 0, cutoff ) +'…' :
            data;
    }
};

 var table = $('#example').DataTable( {
    ajax: {
        //url: 'https://raw.githubusercontent.com/laurabiggins/spex2/main/arrays.txt',
		url: 'https://raw.githubusercontent.com/laurabiggins/spex2/main/updated_arrays.txt',
        dataSrc: 'data'
    },
	select: true,
	paging: false,
    columns: [
        { data: 'dataset_name' },
        { data: 'citation' },
		{ data: 'summary_info' },
        { data: 'data_type' }
    ],
    columnDefs: [ {
        targets: 1,
        render: $.fn.dataTable.render.ellipsis(100)
    },
    {
        targets: 2,
        render: $.fn.dataTable.render.ellipsis(100)
    } ]
} );


$('#summary_title').hide();
$('#type_title').hide();
$('#exploreDatasetButton').hide();  

var shinyServer = 'http://127.0.0.1:3113/#'
var table = $('#example').DataTable();
var selected_row = "";

table.on( 'select', function ( e, dt, type, indexes ) {
    if ( type === 'row' ) {
        $('#summary_title').show();
        $('#type_title').show(); 
        $('#exploreDatasetButton').show();      
        var data = table.rows( indexes ).data()[0];
        $('#selected_name').text(data.dataset_name);
        $('#selected_citation').text(data.citation);
        $('#selected_summary_info').text(data.summary_info);
        $('#selected_data_type').text(data.data_type);
		$('#exploreDatasetButton')[0].href=shinyServer.concat(data.dataset_name)
    }
} );




// https://datatables.net/examples/api/select_row.html
/*$('#example tbody').on( 'click', 'tr', function () {
	$(this).toggleClass('selected');
} );
*/
