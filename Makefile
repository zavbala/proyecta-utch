build: 
	cd ./dist/ && zip -r ../Package.zip *

source:
	zip -r Source.zip . -x "*node_modules/*" "*.git/*" "*.DS_Store" "*.zip" "Makefile" "README.md" "LICENSE" "*.vscode/*" "*.github/*" "*dist/js/*" "pnpm-lock.yaml"