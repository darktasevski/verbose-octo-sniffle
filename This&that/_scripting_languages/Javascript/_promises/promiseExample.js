/** 
 * Promises, for async code!
 * https://www.youtube.com/watch?v=104J7_HyaG4
 */
function getData(){
    var defered = defered = Promise.defer();

    // make some API call (async code), then:
    dataFromApi = 123;
    defered.resolve(dataFromApi); 

    // OR...
    // dataFromApi = 'error';
    // defered.reject(dataFromApi);

    return defered.promise;
}


function loadData(){
    getData()
    .then(function(data){
        console.log('got: ' + data);
    })
    .catch(function(error){
        console.log('error: ' + error);
    });
}


loadData(); // got: 123
