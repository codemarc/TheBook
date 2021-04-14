const { PDFNet } = require('@pdftron/pdfnet-node')

const main = async () => {
    const doc = await PDFNet.PDFDoc.create()
    const page = await doc.pageCreate()
    doc.pagePushBack(page)
    doc.save('blank.pdf',PDFNet.SDFDoc.SaveOptions.e_linearized)
}

PDFNet.runWithCleanup(main).catch((err) => {
    console.log(err)
}).then(() => {
    PDFNet.shutdown()
})