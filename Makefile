output/book.html: book/book.asc book/*/*.adoc book/*/*/*.adoc book/processes/*.svg
	asciidoctor -o output/book.html book/book.asc

%.svg: %.gv
	dot -Tsvg $< > $@
