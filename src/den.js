/* const con = process.stdout;
con.write("> a");con.cursorTo(2);con.write(" ");con.cursorTo(2); */

const con = process.stdout;
const stdin = process.stdin;
let inp = "";

stdin.setRawMode(true);
con.write("> ");
stdin.on('data', (data) => {
    switch (data[0]) {
        case 49:
            inp+="1";
            con.write("1");
            break;
        case 50:
            inp+="2";
            con.write("2");
            break;
        case 51:
            inp+="3";
            con.write("3");
            break;
        case 52:
            inp+="4";
            con.write("4");
            break;
        case 53:
            inp+="5";
            con.write("5");
            break;
        case 54:
            inp+="6";
            con.write("6");
            break;
        case 55:
            inp+="7";
            con.write("7");
            break;
        case 56:
            inp+="8";
            con.write("8");
            break;
        case 57:
            inp+="9";
            con.write("9");
            break;
        case 48:
            inp+="0";
            con.write("0");
            break;
        case 8:
            inp=inp.slice(0, -1);
            con.cursorTo(2+inp.length);
            con.write(" ");
            con.cursorTo(2+inp.length);
            break;
        case 33:
            inp+="!";
            con.write("!");
            break;
        case 94:
            inp+="^";
            con.write("^");
            break;
        case 43:
            inp+="+";
            con.write("+");
            break;
        case 45:
            inp+="-";
            con.write("-");
            break;
        case 42:
            inp+="*";
            con.write("*");
            break;
        case 47:
            inp+="/";
            con.write("/");
            break;
        case 112:
            inp+="p";
            con.write("p");
            break;
        case 80:
            inp+="p";
            con.write("P");
            break;
        case 105:
            inp+="i";
            con.write("i");
            break;
        case 196:
            inp+="i";
            con.write("I");
            break;
        case 73:
            inp+="i";
            con.write("I");
            break;
        case 3:
            process.exit(0);
            break;
        case 4:
            process.exit(0);
            break;
        case 13:
            con.write("\n"+calc(inp));
            con.write("> ");
            break;
        default:
            break;
    }
});

/* function readLine() {
    con.write("> ");
    listen = true;
    stdin.setRawMode(true);
    while(listen){
        continue;
    }
    return inp;
}

readLine(); */
// process.exit(0);