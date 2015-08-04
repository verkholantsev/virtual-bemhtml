all: bundle.js

bundle.js: template.js
	browserify index.js -o bundle.js

template.js: i-bem.bemhtml
	node buildTemplate.js

i-bem.bemhtml:
	curl https://raw.githubusercontent.com/bem/bem-core/v2.3.0/common.blocks/i-bem/i-bem.bemhtml -O

clean:
	rm -f bundle.js template.js
