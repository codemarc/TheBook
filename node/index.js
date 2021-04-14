
// const main = async () => {
//     const doc = await PDFNet.PDFDoc.create()
//     const page = await doc.pageCreate()
//     doc.pagePushBack(page)
//     doc.save('blank.pdf',PDFNet.SDFDoc.SaveOptions.e_linearized)
// }

// PDFNet.runWithCleanup(main).catch((err) => {
//     console.log(err)
// }).then(() => {
//     PDFNet.shutdown()
// })

const { PDFNet } = require('@pdftron/pdfnet-node')

// Relative path to the folder containing test files.
const input_path = "test/in/";
const output_path = "test/out/";

const addPackage = async (doc, file, desc) => {
    const files = await PDFNet.NameTree.create(doc, "EmbeddedFiles");
    const fs = await PDFNet.FileSpec.create(doc, file, true);

    files.put(file, await fs.getSDFObj());
    fs.setDesc(desc);

      const root = await doc.getRoot();
      var collection = await root.findObj("Collection");
      if (!collection) collection = await root.putDict("Collection");

      // You could here manipulate any entry in the Collection dictionary. 
      // For example, the following line sets the tile mode for initial view mode
      // Please refer to section '2.3.5 Collections' in PDF Reference for details.
      collection.putName("View", "T");
}

    const addCoverPage = async (doc) => {
      // Here we dynamically generate cover page (please see ElementBuilder 
      // sample for more extensive coverage of PDF creation API).
      const page = await doc.pageCreate(await PDFNet.Rect.init(0, 0, 200, 200));

      const b = await PDFNet.ElementBuilder.create();
      const w = await PDFNet.ElementWriter.create();
      w.beginOnPage(page);
      const font = await PDFNet.Font.create(doc, PDFNet.Font.StandardType1Font.e_helvetica);
      w.writeElement(await b.createTextBeginWithFont(font, 12));
      const e = await b.createNewTextRun("My PDF Collection");
      e.setTextMatrixEntries(1, 0, 0, 1, 50, 96);
      const gstate = await e.getGState();
      gstate.setFillColorSpace(await PDFNet.ColorSpace.createDeviceRGB());
      gstate.setFillColorWithColorPt(await PDFNet.ColorPt.init(1, 0, 0));
      w.writeElement(e);
      w.writeElement(await b.createTextEnd());
      w.end();
      doc.pagePushBack(page);

      // Alternatively we could import a PDF page from a template PDF document
      // (for an example please see PDFPage sample project).
    }

    const main = async () => {

      // Create a PDF Package.
      try {
        const doc = await PDFNet.PDFDoc.create();
        await addPackage(doc, input_path + "numbered.pdf", "My File 1");
        await addPackage(doc, input_path + "newsletter.pdf", "My Newsletter...");
        await addPackage(doc, input_path + "peppers.jpg", "An image");
        await addCoverPage(doc);
        await doc.save(output_path + "package.pdf", PDFNet.SDFDoc.SaveOptions.e_linearized);
        console.log("Done.");
      } catch (err) {
        console.log(err);
      }

      try {
        const doc = await PDFNet.PDFDoc.createFromFilePath(output_path + "package.pdf");
        await doc.initSecurityHandler();

        const files = await PDFNet.NameTree.find(doc, "EmbeddedFiles");
        if (await files.isValid()) {
          // Traverse the list of embedded files.
          const i = await files.getIteratorBegin();
          for (var counter = 0; await i.hasNext(); await i.next(), ++counter) {
            const entry_name = await i.key().then(key => key.getAsPDFText());
            console.log("Part: " + entry_name);
            const file_spec = await PDFNet.FileSpec.createFromObj(await i.value());
            const stm = await file_spec.getFileData();
            if (stm) {
              stm.writeToFile(output_path + 'extract_' + counter + '.pdf', false);
            }
          }
        }

        console.log("Done.");
      } catch (err) {
        console.log(err);
      }
    }
    // add your own license key as the second parameter, e.g. PDFNet.runWithCleanup(main, 'YOUR_LICENSE_KEY')
    PDFNet.runWithCleanup(main, 0).then(function () { PDFNet.shutdown(); });
  