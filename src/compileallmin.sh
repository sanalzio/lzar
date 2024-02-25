GOOS=linux GOARCH=amd64 go build -o lzar-linux-64 lzar.min.go
GOOS=linux GOARCH=386 go build -o lzar-linux-32 lzar.min.go
GOOS=windows GOARCH=386 go build -o lzar-win-32.exe lzar.min.go
go build -o lzar-win-64.exe lzar.min.go
GOOS=darwin GOARCH=amd64 go build -o lzar-mac-64 lzar.min.go
pkg -t node18-linux-x64,node18-macos-x64,node18-win-x64,node18-linux-arm64,node18-macos-arm64,node18-win-arm64 --out-path node lzar.min.js