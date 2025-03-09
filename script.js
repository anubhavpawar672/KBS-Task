var equation = "";

function eq(str) {
    equation += str;
    document.getElementById("display").innerHTML = equation;
}

function AC() {
    equation = "";
    document.getElementById("display").innerHTML = equation;
}

function DEL() {
    equation = equation.slice(0, equation.length - 1);
    document.getElementById("display").innerHTML = equation;
}

function solve() {
    equation = '(' + equation + ')';
    var b_close = [];
    var b_open = [];
    var a = 0;
    var b = 0;
    for (var i = 0; i < equation.length; i++) {
        if (equation[i] == '(') {
            b_open[a] = i;
            a++;
        }
        if (equation[i] == ')') {
            b_close[b] = i;
            b++;
        }
    }
    
    if (a != b) {
        document.getElementById("display").innerHTML = "Syntax Error";
        return;
    }
    for (var i = 0; i < b; i++) {
        var left = correspond(b_open, b_close[i]);
        equation = equation.slice(0, left) + equate(left + 1, b_close[i]) + equation.slice(b_close[i] + 1);
    }
    
    document.getElementById("display").innerHTML = equation;
}

function correspond(a, b) {
    var max = 0;
    for (var i = 0; i < a.length; i++) {
        if (a[i] > b)
            break;
        max = a[i];
    }
    return max;
}

function equate(a, b) {
    var substr = equation.slice(a, b + 1);
    var ops = ['/', '*', '+', '-'];

    for (let i = 0; i < ops.length; i++) {
        let operator = ops[i];
        let opIndices = [];
        
        for (let j = 0; j < substr.length; j++) {
            if (ops.includes(substr[j])) {
                opIndices.push(j);
            }
        }
        for (let k = 0; k < opIndices.length; k++) {
            let idx = opIndices[k];
            if(substr[idx]==operator){
                let num1 = parseFloat(substr.slice(k > 0 ? opIndices[k - 1] + 1 : 0, idx));
                let num2 = parseFloat(substr.slice(idx + 1, opIndices[k + 1] || substr.length));
                let result;
                if (operator == '/') {
                    result = num1 / num2;
                } else if (operator == '*') {
                    result = num1 * num2;
                } else if (operator == '+') {
                    result = num1 + num2;
                } else if (operator == '-') {
                    result = num1 - num2;
                }

                substr = substr.slice(0, k > 0 ? opIndices[k - 1] + 1 : 0) + result + substr.slice(opIndices[k + 1] || substr.length);
            }
        }
    }

    return substr;
}
