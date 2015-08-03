all: bundle.js

bundle.js: template.js
	browserify index.js -o bundle.js

template.js:
	node buildTemplate.js
	sed -i.bak "s/.\/utils/bem-xjst\/lib\/bemhtml\/runtime\/utils/g" ./template.js
	sed -i.bak "s/.\/tree/bem-xjst\/lib\/bemhtml\/runtime\/tree/g" ./template.js
	sed -i.bak "s/.\/match/bem-xjst\/lib\/bemhtml\/runtime\/match/g" ./template.js
	sed -i.bak "s/.\/entity/bem-xjst\/lib\/bemhtml\/runtime\/entity/g" ./template.js
	sed -i.bak "s/.\/context/bem-xjst\/lib\/bemhtml\/runtime\/context/g" ./template.js
	sed -i.bak "s/require('inherits')/require('util').inherits/g" ./template.js
	rm ./template.js.bak

clean:
	rm bundle.js template.js
