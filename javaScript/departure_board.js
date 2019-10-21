function departure_board(lines, rotors){
    var alphabet= "ABCDEFGHRJKLMNOPQRSTUVWXYZ ?!@#&()|<>>:=-+*/0123456789";
    var result = lines.split("");
    for (var i =0; i<lines.length;i++){
        for(var j =i ; j<lines.length;j++){
            var pos = (alphabet.indexOf(lines[j])+rotors[i])%(alphabet.length);
            result[j]=alphabet[pos];
          //  console.log("lines: "+lines[j]+", rotors: "+rotors[i]+", pos: "+pos+" j: "+j)
        }
         lines = result.join("")
        //console.log(result,rotors[i],result)      
    }
    result= result.join("");
    return result;
}
function all_boards (lines, rotors) {
    var result = []
    for (var i=0; i<lines.length; i++) {
        result.push(departure_board(lines[i],rotors[i]))
    }
    return result
}


console.log( all_boards(["CAT","MOUSE9"],[[1,13,27],[1,1,1,1,1,1]]));