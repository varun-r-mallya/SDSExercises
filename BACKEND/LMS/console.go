package main
import (
	"fmt"
	"bufio"
	"strings"
	"os"
)

func monitorConsoleInput() {
	reader := bufio.NewReader(os.Stdin)
	for {
		text, _ := reader.ReadString('\n')
		text = strings.TrimSpace(text)
		switch text {
		case "clear":
			clearConsole()
		case "cls":
			clearConsole()
		case "exit":
			os.Exit(0)
		case "port":
			fmt.Println("The server is running on port 8080")
		case "db":
			fmt.Println("The database is running on port 3306")
		case "help":
			fmt.Println("  clear/cls - Clear the console \n exit - Exit the program \n help - Display this help message")
		default:
			fmt.Println("Unknown command. Type help to see the list of commands")
		}
	}
}

func clearConsole() {
	fmt.Print("\033[H\033[2J")
}