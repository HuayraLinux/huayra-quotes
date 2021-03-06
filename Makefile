VERSION=0.1.15
NOMBRE="huayra-quotes"

N=[0m
G=[01;32m
Y=[01;33m
B=[01;34m


comandos:
	@echo ""
	@echo "${B}Comandos disponibles para ${G}huayra-quotes - ${N}${Y}${VERSION}${N}"
	@echo ""
	@echo "  ${Y}Para desarrolladores${N}"
	@echo ""
	@echo "    ${G}iniciar${N}         Instala dependencias."
	@echo "    ${G}compilar${N}        Genera los archivos compilados."
	@echo "    ${G}compilar_live${N}   Compila de forma contínua."
	@echo ""
	@echo "    ${G}ejecutar_linux${N}  Prueba la aplicacion sobre Huayra."
	@echo "    ${G}ejecutar_mac${N}    Prueba la aplicacion sobre OSX."
	@echo ""
	@echo "  ${Y}Para distribuir${N}"
	@echo ""
	@echo "    ${G}version_patch${N}   Genera una nueva versión."
	@echo "    ${G}version_minor${N}   Genera una nueva versión."
	@echo "    ${G}subir_version${N}   Sube version generada al servidor."
	@echo ""
	@echo "    ${G}publicar${N}        Publica el cambio para el paquete deb."
	@echo "    ${G}crear_deb${N}       Genera el paquete deb para huayra."
	@echo ""


iniciar:
	npm install
	./node_modules/bower/bin/bower install --allow-root
	wget https://raw.githubusercontent.com/lvm/miki.js/master/miki.js
	mv miki.js public/

dist: compilar

ejecutar_linux: 
	nw dist

ejecutar_mac: 
	/Applications/nwjs.app/Contents/MacOS/nwjs dist

test_mac: ejecutar_mac

build: compilar

publicar:
	dch -i

crear_deb:
	dpkg-buildpackage -us -uc

compilar:
	./node_modules/ember-cli/bin/ember build

compilar_live:
	./node_modules/ember-cli/bin/ember build --watch

version_patch:
	@bumpversion patch --current-version ${VERSION} public/package.json Makefile --list
	make build
	@echo "Es recomendable escribir el comando que genera los tags y sube todo a github:"
	@echo ""
	@echo "make subir_version"

version_minor:
	@bumpversion minor --current-version ${VERSION} public/package.json Makefile --list
	make build
	@echo "Es recomendable escribir el comando que genera los tags y sube todo a github:"
	@echo ""
	@echo "make subir_version"

subir_version:
	git commit -am 'release ${VERSION}'
	git tag '${VERSION}'
	git push
	git push --all
	git push --tags


.PHONY: dist
