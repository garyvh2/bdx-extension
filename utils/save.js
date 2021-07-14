import { fileToBlob } from "./file.js"

export const saveFile = (inputFile, path) => {
  webkitRequestFileSystem(PERSISTENT, 1024, function(filesystem) {
    filesystem.root.getFile(path, { create: true }, function(file) {
     file.createWriter(function(writer) {
      writer.onwriteend = function(e) {
        window.requestFileSystem(window.TEMPORARY, 1024*1024, readFile, errorHandler);
      };
      writer.addEventListener("write", function(event) {
       location = path
      })
      writer.addEventListener("error", console.error)

      fileToBlob(inputFile, (blob) => writer.write(blob))
     }, console.error)
    }, console.error)
   }, console.error)
}