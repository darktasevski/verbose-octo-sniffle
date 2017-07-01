function flatUmdLinked(obj){
    var flatobj = obj;
    for(var i=0;i<flatobj['umedias'].length;i++){
        if(flatobj['umedias'][i]['linked']){
            var tagsarrtmp = [];
            for(var j=0;j<flatobj['umedias'][i]['linked'].length;j++){
                if(flatobj['umedias'][i]['linked'][j]['tags']){
                    tagsarrtmp = tagsarrtmp.concat(flatobj['umedias'][i]['linked'][j]['tags'])
                }
            }
            if(tagsarrtmp){
                flatobj['umedias'][i]['tags'].concat(tagsarrtmp);
            }
        }
    }
    return flatobj;
}


