output/book.html: book/book.asc book/*/*.adoc book/*/*/*.adoc
	asciidoctor -o output/book.html book/book.asc
