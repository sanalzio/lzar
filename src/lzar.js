//*--------------global variables--------------*//

// define argv for get launch arguments
let argv = process.argv.slice(1);

//*--------------global variables--------------*//



//*--------------functions--------------*//

// Clear input for calculating process
function clear(inpstr) {
    let str = inpstr.replace("�", "i").toLowerCase(); // convert "İ" to "i"
    str = str.replaceAll(" ", ""); // remove spaces
    str = str.replaceAll("^^", "^");
    str = str.replaceAll("**", "^");
    str = str.replaceAll("[", "(");
    str = str.replaceAll("]", ")");
    str = str.replaceAll("pi", Math.PI.toString()); // for pi number
    // return cleared input
    return str.replaceAll(",", ".");
}

// Clear input for fix calculating process
function clear2(inpstr) {

    let str = inpstr;

    // regular expresion for fixing
    let re = /\+\-/;
    // if input includes "+-"
    while (str.match(re) != null) {
        let match = str.match(re);
        // convert "+-" to "-"
        str = str.replace(match, "-");
    }
    // regular expresion for fixing
    re = /\-\-/;
    // if input includes "--"
    while (str.match(re) != null) {
        let match = str.match(re);
        // convert "--" to "+"
        str = str.replace(match, "+");
    }

    // return cleared input
    return str;
}

// calculate function
function calc(inpstr) {
    // Clear input
    let str = clear(inpstr);

    // Clear input for fix calculating process
    str = clear2(str);

    // regular expresion for caclulating bracketed expressions
    let re = /\([^\(,\)]{1,}\)/;
    // execute for all bracketed expressions
    while (str.match(re) != null) {
        let match = str.match(re);
        // calculate and replace output
        str = str.replace(match, calc(match[0].slice(1, -1).toString()));
    }

    // Clear input for fix calculating process
    str = clear2(str);

    // calculate exponential numbers //
    // regular expresion for caclulating exponential numbers
    re = /[^-+*/\^]{1,}\^[^-+*/\^]{1,}/;
    // if input includes exponential numbers
    while (str.match(re) != null) {
        let match = str.match(re);
        // calculate and replace output
        str = str.replace(match, simpleMath(match[0]).toString());
    }
    // calculate exponential numbers //

    // Clear input for fix calculating process
    str = clear2(str);

    // calculate factorial numbers //
    // regular expresion for caclulating factorial numbers
    re = /[^-+*/\^]{1,}!/;
    // if input includes factorial numbers
    while (str.match(re) != null) {
        let match = str.match(re);
        // calculate and replace output
        str = str.replace(match, fact(match[0].slice(0, -1)).toString());
    }
    // calculate factorial numbers //

    // Clear input for fix calculating process
    str = clear2(str);

    // regular expresions for caclulating simple math operations
    let spre = /[^-+*/\^]{1,}[*/][^-+*/\^]{1,}/;
    let spre2 = /[^-+*/\^]{1,}[-+][^-+*/\^]{1,}/;

    //---- calculate simple math operations ----//
    // match all "/" and "*" operations
    while (str.match(spre) != null) {
        let match = str.match(spre);
        // calculate and replace output
        str = str.replace(match, simpleMath(match[0]).toString());
    }

    // Clear input for fix calculating process
    str = clear2(str);

    // match all "-" and "+" operations
    while (str.match(spre2) != null) {
        let match = str.match(spre2);
        // calculate and replace output
        str = str.replace(match, simpleMath(match[0]).toString());
    }
    //---- calculate simple math operations ----//

    // Clear input for fix calculating process
    str = clear2(str);

    // return output
    return str;
}

// calculate factorial
function fact(x) {
    if (x == 0) {
        return 1;
    }
    // return output
    return x * fact(x - 1);
}

// calculate simple math
function simpleMath(inpstr) {
    let sep;
    if (inpstr.includes("+")) {
        sep = "+";
    } else if (inpstr.includes("-")) {
        sep = "-";
    } else if (inpstr.includes("*")) {
        sep = "*";
    } else if (inpstr.includes("/")) {
        sep = "/";
    } else if (inpstr.includes("^")) {
        sep = "^";
    }
    let numbers = inpstr.split(sep);
    // define num1 and num2 for numbers
    let num1 = Number(numbers[0]);
    let num2 = Number(numbers[1]);

    // calculate simple math
    switch (sep) {
        case "+":
            // return output
            return num1 + num2;
        case "-":
            // return output
            return num1 - num2;
        case "*":
            // return output
            return num1 * num2;
        case "^":
            // return output
            return num1 ** num2;
        default:
            // return output
            return num1 / num2;
    }
}

//*--------------functions--------------*//



//*--------------main--------------*//

// if geted input form launch arguments then print output and exit
if (argv.length > 1) {
    console.log("\x1b[33m" + calc(argv.slice(1).join(" ")) + "\x1b[0m\n"); process.exit(0);
    // else
} else {
    // Import readline-sync library for get input form user syncronously
    const readline = require('readline-sync');
    while (true) { // Create loop for infinity
        // Print output
        console.log("\x1b[33m" + calc(readline.question("> ")) + "\x1b[0m\n");
    }
}

//*--------------main--------------*//
