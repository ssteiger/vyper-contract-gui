// @flow
export default async function uploadVyperFile (file: File) {
  const fileContent = await fetch(file.path).then(response => response.text())

  file.addedOn = new Date()
  file.content = fileContent
  file.deployedAt = {
    addresses: [],
    selected: {},
  }
  return file
  /*
  // TODO: can't do this because 'file' is of type 'File' and not 'Object'
  return {
    ...file,
    addedOn: new Date(),
    content: fileContent,
    deployedAt: {
      addresses: [],
      selected: {},
    }
  }
  */
}
