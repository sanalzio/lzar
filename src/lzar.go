package main

// import required packages
import (
	"fmt"
	"math"
	"math/big"
	"os"
	"regexp"
	"strconv"
	"strings"
)

// Clear input for calculating process
func clear(inpstr string) string {
	str := strings.ReplaceAll(strings.ToLower(inpstr), " ", "")
	str = strings.ReplaceAll(str, "�", "i")
	str = strings.ReplaceAll(str, "^^", "^")
	str = strings.ReplaceAll(str, "**", "^")
	str = strings.ReplaceAll(str, "[", "(")
	str = strings.ReplaceAll(str, "]", ")")
	str = strings.ReplaceAll(str, "pi", strconv.FormatFloat(math.Pi, 'f', -1, 64))
	// return cleared input
	return strings.ReplaceAll(str, ",", ".")
}

// *---------Main function---------* //
func main() {
	if len(os.Args) > 1 {
		fmt.Println("\033[33m" + calc(strings.Join(os.Args[1:], " ")) + "\033[0m")
	} else {
		for {
			fmt.Print("> ")
			var inpstr string
			fmt.Scanln(&inpstr)
			fmt.Println("\033[33m" + calc(inpstr) + "\033[0m\n")
		}
	}
}

// *---------Main function---------* //

// calculate factorial
func factorial(input string) string {
	num, err := strconv.Atoi(strings.ReplaceAll(input, ".0", ""))
	if err != nil {
		panic(err)
	}
	result := big.NewInt(1)
	for i := 2; i <= num; i++ {
		result = result.Mul(result, big.NewInt(int64(i)))
	}
	// return output
	return result.String()
}

// Clear input for fix calculating process
func clear2(str *string) {

	// regular expresion for fixing
	re := regexp.MustCompile(`\+\-`)
	// if input includes "+-"
	for re.FindString(*str) != "" {
		match := re.FindString(*str)
		// convert "+-" to "-"
		*str = strings.Replace(*str, match, "-", 1)
	}
	// regular expresion for fixing
	re = regexp.MustCompile(`\-\-`)
	// if input includes "--"
	for re.FindString(*str) != "" {
		match := re.FindString(*str)
		// convert "--" to "+"
		*str = strings.Replace(*str, match, "+", 1)
	}
}

// calculate function
func calc(inpstr string) string {
	// Clear input
	str := clear(inpstr)

	// Clear input for fix calculating process
	clear2(&str)

	// regular expresion for caclulating bracketed expressions
	re := regexp.MustCompile(`\([^\(,\)]{1,}\)`)
	// execute for all bracketed expressions
	for re.FindString(str) != "" {
		match := re.FindString(str)
		// calculate and replace output
		str = strings.Replace(str, match, calc(match[1:len(match)-1]), 1)
	}

	// Clear input for fix calculating process
	clear2(&str)

	//---- calculate simple math operations ----//
	// regular expresion for caclulating exponential numbers
	uslu := regexp.MustCompile(`[^-+*/\^\(\)]{1,}\^[^-+*/\^\(\)]{1,}`)
	// regular expresion for caclulating factorial numbers
	fact := regexp.MustCompile(`[^-+*/\^\(\)]{1,}!`)
	// regular expresions for caclulating simple math operations
	spre := regexp.MustCompile(`[^-+*/\^\(\)]{1,}[*/][^-+*/\^\(\)]{1,}`)
	spre2 := regexp.MustCompile(`[^-+*/\^\(\)]{1,}[-+][^-+*/\^\(\)]{1,}`)

	// if input includes exponential numbers
	for uslu.FindString(str) != "" {
		match := uslu.FindString(str)
		// calculate and replace output
		str = strings.Replace(str, match, simpleMath(match), 1)
	}

	// Clear input for fix calculating process
	clear2(&str)

	// if input includes factorial numbers
	for fact.FindString(str) != "" {
		match := fact.FindString(str)
		// calculate and replace output
		str = strings.Replace(str, match, factorial(match[:len(match)-1]), 1)
	}

	// Clear input for fix calculating process
	clear2(&str)

	// match all "/" and "*" operations
	for spre.FindString(str) != "" {
		match := spre.FindString(str)
		// calculate and replace output
		str = strings.Replace(str, match, simpleMath(match), 1)
	}

	// Clear input for fix calculating process
	clear2(&str)

	// match all "-" and "+" operations
	for spre2.FindString(str) != "" {
		match := spre2.FindString(str)
		// calculate and replace output
		str = strings.Replace(str, match, simpleMath(match), 1)
	}

	// Clear input for fix calculating process
	clear2(&str)

	//---- calculate simple math operations ----//

	// return output
	return str
}

// calculate simple math
func simpleMath(inpstr string) string {
	sep := ""
	if strings.Contains(inpstr, "^") {
		sep = "^"
	} else if strings.Contains(inpstr, "*") {
		sep = "*"
	} else if strings.Contains(inpstr, "/") {
		sep = "/"
	} else if strings.Contains(inpstr, "+") {
		sep = "+"
	} else if strings.Contains(inpstr, "-") {
		sep = "-"
	}

	numbers := strings.Split(inpstr, sep)
	// define num1 and num2 for numbers
	num1, _ := strconv.ParseFloat(numbers[0], 64)
	num2, _ := strconv.ParseFloat(numbers[1], 64)

	// calculate simple math
	switch sep {
	case "+":
		// return output
		return strconv.FormatFloat(num1+num2, 'f', -1, 64)
	case "-":
		// return output
		return strconv.FormatFloat(num1-num2, 'f', -1, 64)
	case "*":
		// return output
		return strconv.FormatFloat(num1*num2, 'f', -1, 64)
	case "/":
		// return output
		return strconv.FormatFloat(num1/num2, 'f', -1, 64)
	default:
		// return output
		return strconv.FormatFloat(math.Pow(num1, num2), 'f', -1, 64)
	}
}
