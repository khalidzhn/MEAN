function Banana(input) {
    output=[];
    var b = "banana";
    console.log(b)
    for (var i = 0; i <= input.length; i++) {
        console.log("in for 1")
        var temp = input;
        var a = temp.split("");
        a[i] = "-";
        temp = a.join("");
        console.log(temp)

        for (var j = 0; j <= input.length; j++) {
            var temp1 = temp
            console.log("in for 2")
            var y = 0
            while (y <= 6) {
                console.log("in while")
                if (temp1.charAt(j) != b.charAt(y)) {
                    var a = temp1.split("");
                    a[j] = "-";
                    temp1 = a.join("");
                    console.log(temp1.charAt(j) , ",",b.charAt(y))
                    console.log(temp1)
                }
                y++;
            }
            console.log(temp)

        }
        output.push(temp)
    }
    return output
}
console.log(Banana("bbananana"));