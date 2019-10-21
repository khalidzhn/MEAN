function product(num) {
    var arr = [];
    if (num <= 9 && num >0) {
        return "1"+num;
    }
    else if(num <= 600){

        while (num.toString().length > 1) {
            
            if (num % 2 == 0) {
                num = num / 2;
                arr.push(2);

            } else if (num % 7 == 0) {
                num = num / 7;
                arr.push(7);

            } else if (num % 5 == 0) {
                num = num / 5;
                arr.push(5);

            } else if (num % 3 == 0) {
                num = num / 3;
                arr.push(3);

            } else {
                return -1
            }
        }
        arr.push(num);
        return arr.sort().join("")
    }
    else{
        return "Too Big Number"
    }
}
console.log(product(450))