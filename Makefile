.PHONY: all install clean

VERSION = 1.0.0

all: build mac linux win32 win64

install: package.json
	npm install

build: install
	npm run build

mac:
	npm run package:mac
	mv build/Roma-${VERSION}-mac.dmg build/Roma-${VERSION}-darwin-x64.dmg
	cd build; shasum -a 256 Roma-${VERSION}-darwin-x64.dmg >> sha256sum.txt

mas:
	npm run build:mas
	./appStore.sh

linux:
	npm run package:linux
	mv build/Roma-${VERSION}-linux-amd64.deb build/Roma-${VERSION}-linux-x64.deb
	mv build/Roma-${VERSION}-linux-x86_64.rpm build/Roma-${VERSION}-linux-x64.rpm
	mv build/Roma-${VERSION}-linux-i386.deb build/Roma-${VERSION}-linux-ia32.deb
	mv build/Roma-${VERSION}-linux-i686.rpm build/Roma-${VERSION}-linux-ia32.rpm
	mv build/Roma-${VERSION}-linux-x86_64.AppImage build/Roma-${VERSION}-linux-x64.AppImage
	cd build; shasum -a 256 Roma-${VERSION}-linux-arm64.tar.bz2 >> sha256sum.txt
	cd build; shasum -a 256 Roma-${VERSION}-linux-armv7l.tar.bz2 >> sha256sum.txt
	cd build; shasum -a 256 Roma-${VERSION}-linux-i686.pacman >> sha256sum.txt
	cd build; shasum -a 256 Roma-${VERSION}-linux-ia32.deb >> sha256sum.txt
	cd build; shasum -a 256 Roma-${VERSION}-linux-ia32.rpm >> sha256sum.txt
	cd build; shasum -a 256 Roma-${VERSION}-linux-x64.AppImage >> sha256sum.txt
	cd build; shasum -a 256 Roma-${VERSION}-linux-x64.deb >> sha256sum.txt
	cd build; shasum -a 256 Roma-${VERSION}-linux-x64.pacman >> sha256sum.txt
	cd build; shasum -a 256 Roma-${VERSION}-linux-x64.rpm >> sha256sum.txt
	cd build; shasum -a 256 Roma-${VERSION}-linux-x64.tar.bz2 >> sha256sum.txt

win32:
	npm run package:win32
	mv build/Roma-${VERSION}-win.exe build/Roma-${VERSION}-windows-ia32.exe
	cd build; shasum -a 256 Roma-${VERSION}-windows-ia32.exe >> sha256sum.txt

win64:
	npm run package:win64
	mv build/Roma-${VERSION}-win.exe build/Roma-${VERSION}-windows-x64.exe
	cd build; shasum -a 256 Roma-${VERSION}-windows-x64.exe >> sha256sum.txt

clean:
	npm run build:clean
