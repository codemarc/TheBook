# System Design Problem

## Problem
 A collaboration team using a software platform meet on a recurring basis to discuss important matters.  Each member will contribute by adding documents to the platform.  All documents mustbe compiled in real-time into a single PDF, known as the “Book”.  Provide an Architecture to support this functionality given the following requirements.

  1. Members can, and will, continuously update documents in preparation for a meeting.

  2. Members can use all Microsoft documents, pictures and other well accepted document types.

  3. Members need to embed audio/video presentations into the Book.

  4. Members will have differing permissions regarding what content they can see within the Book.

  5. Books should be re-compiled when a new document is added, or an existing document updated.

  6. Members should be notified with any update or change to the Book, with rich details.

  7. Transmission and storage of all documents must follow strict security guidelines.

  8. Books can contain hundreds of documents and thousands of pages

  9. System must support 100K+ Book compilation activities, across data centers, each day.

  10. Books must have a table of contents, and allow custom pages such as cover page.

  11. Books must support annotations.

  12. Books must be searchable.

  13. Books must be downloadable.

  14. There is no tolerance for Book compilation failures. The system must be fault tolerant, and highly instrumented.

