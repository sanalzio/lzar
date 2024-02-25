GOOS=linux GOARCH=amd64 go build -o lzar-linux-64 lzar.go
GOOS=linux GOARCH=386 go build -o lzar-linux-32 lzar.go
GOOS=windows GOARCH=386 go build -o lzar-win-32.exe lzar.go
go build -o lzar-win-64.exe lzar.go
GOOS=darwin GOARCH=amd64 go build -o lzar-mac-64 lzar.go